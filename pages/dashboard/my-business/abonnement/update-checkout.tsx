import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getServerSideCookieTokens, isAuthenticatedInstance, setFormikAutoErrors } from '../../../../utils/helpers';
import { AUTH_LOGIN, DASHBOARD_SUBSCRIPTION, NOT_FOUND_404 } from '../../../../utils/routes';
import { AccountGetCheckAccountResponseType } from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import {
	availableSubscriptionPlanType,
	SagaCallBackOnCompleteCheckPromoCodeType,
	SagaCallBackOnCompleteSubscriptionByNbrArticleType,
	subscriptionGetUserSubscriptionResponseType,
} from '../../../../types/subscription/subscriptionTypes';
import { Stack, Box, AlertColor } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import SharedStyles from '../../../../styles/dashboard/dashboard.module.sass';
import Styles from '../../../../styles/dashboard/subscription.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { useFormik } from 'formik';
import { promoCodeSchema, subscriptionSchema } from '../../../../utils/formValidationSchemas';
import { getAvailableCountries } from '../../../../store/selectors';
import { coordonneeTextInputTheme, offerForWhomDropdownTheme, promoCodeTextInputTheme } from '../../../../utils/themes';
import { placesGetCountriesAction } from '../../../../store/actions/places/placesActions';
import CustomTextInput from '../../../../components/formikElements/customTextInput/customTextInput';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomSingleCountrySelect from '../../../../components/groupedComponents/offer/customSingleCountrySelect/customSingleCountrySelect';
import CustomTextMaskInput from '../../../../components/formikElements/customTextMaskInput/customTextMaskInput';
import RadioCheckButton from '../../../../components/htmlElements/buttons/radioCheckButton/radioCheckButton';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import CustomToast from '../../../../components/portals/customToast/customToast';
import Portal from '../../../../contexts/Portal';
import Divider from '@mui/material/Divider';
import {
	subscriptionGetSubscriptionByNbrArticle, subscriptionPatchRootAction,
	subscriptionPostCheckPromoCode,
	subscriptionPostRootAction
} from "../../../../store/actions/subscription/subscriptionActions";
import { useRouter } from 'next/router';
import { ApiErrorResponseType, SagaCallBackOnCompleteBoolType } from '../../../../types/_init/_initTypes';

type PackArticlesCardContentType = {
	is_subscribed: boolean;
	nbr_article: number;
	prix_unitaire_ttc: number;
	pourcentage: number;
};

const PackArticlesCardContent: React.FC<PackArticlesCardContentType> = (props: PackArticlesCardContentType) => {
	const { nbr_article, pourcentage, prix_unitaire_ttc, is_subscribed } = props;
	const articlesLabel = nbr_article === 1 ? 'article' : 'articles';

	return (
		<Box className={Styles.articlesPackBox} sx={{ backgroundColor: `${!is_subscribed ? '#FFD9A2' : '#F3D8E1'}` }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Stack direction="column" spacing="5px">
					<span className={Styles.articlesPackSpan}>
						Pack {nbr_article} {articlesLabel}
					</span>
					<Box className={Styles.pourcentageBox}>
						<span>Save {pourcentage}%</span>
					</Box>
				</Stack>
				<Stack direction="row" spacing="5px" alignItems="center">
					<span className={Styles.pricePerArticleTTC}>{prix_unitaire_ttc}</span>
					<Box>
						<span className={`${Styles.desktopOnly} ${Styles.pricePerArticleValue}`}>DH /article</span>
						<span className={`${Styles.mobileOnly} ${Styles.pricePerArticleValue}`}>DH /art</span>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

type UpdateCheckoutProps = {
	pageProps: {
		pickedSubscription: Omit<availableSubscriptionPlanType, 'pk'>;
		is_subscribed: boolean;
		first_name: string;
		last_name: string;
		city: string | null;
		country: string | null;
		company: string;
		ice: string;
		adresse: string;
		code_postal: string;
	};
};

const UpdateCheckout: NextPage<UpdateCheckoutProps> = (props: UpdateCheckoutProps) => {
	const {
		pickedSubscription,
		is_subscribed,
		first_name,
		last_name,
		country,
		city,
		company,
		ice,
		adresse,
		code_postal,
	} = props.pageProps;
	const { nbr_article, prix_ttc, prix_unitaire_ttc, pourcentage } = pickedSubscription;

	const [nbrArticleState, setNbrArticleState] = useState<number>(nbr_article);
	const [prixTTCState, setPrixTTCState] = useState<number>(prix_ttc);
	const [prixUnitaireTTCState, setPrixUnitaireTTCState] = useState<number>(prix_unitaire_ttc);
	const [pourcentageState, setPourcentageState] = useState<number>(pourcentage);

	const router = useRouter();
	const dispatch = useAppDispatch();
	const availableCountries = useAppSelector(getAvailableCountries);
	const [reductionState, setReductionState] = useState<number | undefined>(undefined);

	const [pickedCountry, setPickedCountry] = useState<string>(country ? country : '');
	const [paymentParCarte, setPaymentParCarte] = useState<boolean>(false);
	const [paymentParVirement, setPaymentParVirement] = useState<boolean>(false);
	const [showPromoCodeApplied, setShowPromoCodeApplied] = useState<boolean>(false);
	const [showPromoCodeMessage, setShowPromoCodeMessage] = useState<AlertColor | null>(null);
	const [globalApiError, setGlobalApiError] = useState<string | null>(null);
	/* formik promo code */
	const formikPromoCode = useFormik({
		initialValues: {
			promo_code: '',
		},
		validateOnMount: true,
		validationSchema: promoCodeSchema,
		onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
			setSubmitting(false);
			const action = subscriptionPostCheckPromoCode(values.promo_code);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteCheckPromoCodeType) => {
					setShowPromoCodeApplied(true);
					if (!error && !cancelled && data) {
						if (data.validity && data.type && data.value) {
							if (data.type === 'S') {
								if (nbrArticleState === data.value) {
									setReductionState(prixTTCState);
									return;
								} else if (nbrArticleState > data.value) {
									setNbrArticleState(nbrArticleState - data.value);
									setReductionState(prix_ttc);
								} else {
									const action = subscriptionGetSubscriptionByNbrArticle(data.value);
									dispatch({
										...action,
										onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteSubscriptionByNbrArticleType) => {
											if (!error && !cancelled && data) {
												setNbrArticleState(data.nbr_article);
												setPrixTTCState(data.prix_ttc);
												setPrixUnitaireTTCState(data.prix_unitaire_ttc);
												setPourcentageState(data.pourcentage);
												setReductionState(data.prix_ttc);
											}
										},
									});
								}
								// setNbrArticleState(prevState => prevState - data.value);
							} else if (data.type === 'P' && data.value) {
								// setPrixTTCState(prevState => prevState - data.value);
								const pourcentagePrice = Math.round((prixTTCState * data.value) / 100);
								setReductionState(pourcentagePrice);
							}
							setShowPromoCodeMessage('success');
						} else {
							setShowPromoCodeMessage('error');
							setFieldError('promo_code', 'Promo code expirer.');
							resetForm();
						}
					}
				},
			});
			setSubmitting(true);
		},
	});

	const codePromoOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		formikPromoCode.handleChange('promo_code')(e);
		if (e.target.value.length >= 6) {
			formikPromoCode.submitForm().then();
		} else {
			setNbrArticleState(nbr_article);
			setPrixTTCState(prix_ttc);
			setPrixUnitaireTTCState(prix_unitaire_ttc);
			setPourcentageState(pourcentage);
			setReductionState(undefined);
			setGlobalApiError(null);
		}
	};

	// C = carte | V = virement
	const paymentParCheckHandler = (type: 'C' | 'V') => {
		if (type === 'C') {
			setPaymentParCarte(true);
			setPaymentParVirement(false);
		} else {
			setPaymentParCarte(false);
			setPaymentParVirement(true);
		}
	};

	const formik = useFormik({
		initialValues: {
			company: company ? company : '',
			ice: ice ? ice : '',
			first_name: first_name ? first_name : '',
			last_name: last_name ? last_name : '',
			adresse: adresse ? adresse : '',
			city: city ? city : '',
			code_postal: code_postal ? code_postal : '',
			country: pickedCountry ? pickedCountry : '',
		},
		validateOnMount: true,
		validationSchema: subscriptionSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(false);
			let paymentPar: string | boolean = '';
			if (paymentParVirement) {
				paymentPar = 'V';
			} else if (paymentParCarte) {
				paymentPar = 'C';
			}
			const promo_code = formikPromoCode.values.promo_code;
			const action = subscriptionPatchRootAction(
				nbrArticleState,
				values.company,
				values.ice.replace(/\D/g, ''),
				values.first_name,
				values.last_name,
				values.adresse,
				values.city,
				values.code_postal,
				values.country,
				promo_code,
				paymentPar,
			);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
					if (!error && !cancelled && data) {
						router.replace(DASHBOARD_SUBSCRIPTION).then();
					} else {
						if (error.error.details) {
							setGlobalApiError(error.error.details.error[0]);
						}
					}
				},
			});
			setSubmitting(true);
		},
	});

	useEffect(() => {
		if (availableCountries.length === 0) {
			dispatch(placesGetCountriesAction());
		}
	}, [availableCountries.length, dispatch]);

	const inputTheme = coordonneeTextInputTheme();
	const promoCodeTheme = promoCodeTextInputTheme();

	const TotalPriceDetailContent = () => {
		return (
			<Stack direction="column" spacing="55px">
				<Stack direction="column" spacing="18px">
					<Stack direction="row" justifyContent="space-between" className={Styles.priceDetails}>
						<span>Abonnement</span>
						<span>{prixTTCState} DH</span>
					</Stack>
					{reductionState && (
						<Stack direction="row" justifyContent="space-between" mb="18px" className={Styles.priceDetails}>
							<span>Réduction</span>
							<span className={Styles.reducedPrice}>-{reductionState} DH</span>
						</Stack>
					)}
					<Divider orientation="horizontal" flexItem className={Styles.divider} />
					<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.totalPrice}>
						<span>Total</span>
						<span>{reductionState ? prixTTCState - reductionState : prixTTCState} DH</span>
					</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="center">
					<PrimaryButton
						buttonText="Payer"
						active={formik.isValid && !formik.isSubmitting} //  && formikPromoCode.isValid && !formikPromoCode.isSubmitting
						onClick={formik.handleSubmit}
						type="submit"
					/>
				</Stack>
			</Stack>
		);
	};

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${SharedStyles.fixMobile}`}>
				<form>
					<Stack direction="row" justifyContent="space-between" className={Styles.mobileStack}>
						<Stack direction="column" spacing="48px" className={Styles.desktopStack}>
							<Stack direction="column" spacing="30px">
								{!is_subscribed ? (
									<h1 className={Styles.hOneHeader}>Let&apos;s finish powering you up</h1>
								) : (
									<h1 className={Styles.hOneHeader}>Upgrade de l&apos;abonnement</h1>
								)}
								<PackArticlesCardContent
									nbr_article={nbrArticleState}
									pourcentage={pourcentageState}
									prix_unitaire_ttc={prixUnitaireTTCState}
									is_subscribed={is_subscribed}
								/>
							</Stack>
							<Stack direction="column" spacing="32px" className={Styles.mobileHeaderStack}>
								<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
									<CustomTextInput
										id="company"
										type="text"
										value={formik.values.company}
										onChange={formik.handleChange('company')}
										onBlur={formik.handleBlur('company')}
										helperText={formik.touched.company ? formik.errors.company : ''}
										error={formik.touched.company && Boolean(formik.errors.company)}
										fullWidth={false}
										size="medium"
										label="Société"
										placeholder="Société"
										theme={inputTheme}
									/>
									<CustomTextMaskInput
										id="ice"
										type="tel"
										value={formik.values.ice}
										onChange={formik.handleChange('ice')}
										onBlur={formik.handleBlur('ice')}
										helperText={formik.touched.ice ? formik.errors.ice : ''}
										error={formik.touched.ice && Boolean(formik.errors.ice)}
										fullWidth={false}
										size="medium"
										label="ICE"
										placeholder="ICE"
										theme={inputTheme}
										mask="99999 99999 99999"
										alwaysShowMask={false}
										maskPlaceholder=" "
									/>
								</Stack>
								<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
									<CustomTextInput
										id="first_name"
										type="text"
										value={formik.values.first_name}
										onChange={formik.handleChange('first_name')}
										onBlur={formik.handleBlur('first_name')}
										helperText={formik.touched.first_name ? formik.errors.first_name : ''}
										error={formik.touched.first_name && Boolean(formik.errors.first_name)}
										fullWidth={false}
										size="medium"
										label="Nom"
										placeholder="Nom"
										theme={inputTheme}
									/>
									<CustomTextInput
										id="last_name"
										type="text"
										value={formik.values.last_name}
										onChange={formik.handleChange('last_name')}
										onBlur={formik.handleBlur('last_name')}
										helperText={formik.touched.last_name ? formik.errors.last_name : ''}
										error={formik.touched.last_name && Boolean(formik.errors.last_name)}
										fullWidth={false}
										size="medium"
										label="Prénom"
										placeholder="Prénom"
										theme={inputTheme}
									/>
									<CustomTextInput
										id="adresse"
										type="text"
										value={formik.values.adresse}
										onChange={formik.handleChange('adresse')}
										onBlur={formik.handleBlur('adresse')}
										helperText={formik.touched.adresse ? formik.errors.adresse : ''}
										error={formik.touched.adresse && Boolean(formik.errors.adresse)}
										fullWidth={false}
										size="medium"
										label="Adresse"
										placeholder="Adresse"
										theme={inputTheme}
									/>
									<Stack direction="row" spacing="18px">
										<CustomTextInput
											id="city"
											type="text"
											value={formik.values.city}
											onChange={formik.handleChange('city')}
											onBlur={formik.handleBlur('city')}
											helperText={formik.touched.city ? formik.errors.city : ''}
											error={formik.touched.city && Boolean(formik.errors.city)}
											fullWidth={true}
											size="medium"
											label="Ville"
											placeholder="Ville"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="code_postal"
											type="tel"
											value={formik.values.code_postal}
											onChange={formik.handleChange('code_postal')}
											onBlur={formik.handleBlur('code_postal')}
											helperText={formik.touched.code_postal ? formik.errors.code_postal : ''}
											error={formik.touched.code_postal && Boolean(formik.errors.code_postal)}
											fullWidth={false}
											size="medium"
											label="Code Postal"
											placeholder="Code Postal"
											theme={inputTheme}
										/>
									</Stack>
									<CustomSingleCountrySelect
										onChange={(e: SelectChangeEvent) => {
											setPickedCountry(e.target.value);
										}}
										value={pickedCountry}
										id="country"
										label="Pays"
										items={availableCountries}
										theme={offerForWhomDropdownTheme()}
										disabled={false}
										cssClass={Styles.maxWidth}
									/>
								</Stack>
							</Stack>
						</Stack>
						<Divider orientation="horizontal" flexItem className={Styles.mobileDivider} />
						<Box className={Styles.promoBox}>
							<Stack direction="column" spacing="55px">
								<Stack direction="column" spacing="12px">
									<span className={Styles.rightFieldLabel}>Code promo</span>
									<CustomTextInput
										id="promo_code"
										type="text"
										value={formikPromoCode.values.promo_code}
										onChange={(e) => codePromoOnchangeHandler(e)}
										onBlur={formikPromoCode.handleBlur('promo_code')}
										helperText={formikPromoCode.touched.promo_code ? formikPromoCode.errors.promo_code : ''}
										error={formikPromoCode.touched.promo_code && Boolean(formikPromoCode.errors.promo_code)}
										fullWidth={false}
										size="medium"
										theme={promoCodeTheme}
									/>
									{globalApiError && <span className={Styles.errorMessage}>{globalApiError}</span>}
								</Stack>
								<Stack direction="column" spacing="12px" className={Styles.mobilePromoStack}>
									<span className={Styles.rightFieldLabel}>Paiement par</span>
									<RadioCheckButton
										checked={paymentParCarte}
										active={true}
										text="Carte bancaire"
										onClick={() => {
											paymentParCheckHandler('C');
										}}
									/>
									<RadioCheckButton
										checked={paymentParVirement}
										active={true}
										text="Virement bancaire"
										onClick={() => {
											paymentParCheckHandler('V');
										}}
									/>
								</Stack>
								<TotalPriceDetailContent />
							</Stack>
						</Box>
					</Stack>
				</form>
				<Portal id="snackbar_portal">
					{showPromoCodeMessage && (
						<CustomToast
							type={showPromoCodeMessage}
							message={showPromoCodeMessage === 'success' ? 'Promo code appliquer.' : 'Promo code expirer.'}
							setShow={setShowPromoCodeApplied}
							show={showPromoCodeApplied}
						/>
					)}
				</Portal>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	const { prix_ttc, pourcentage, prix_unitaire_ttc, nbr_article, prix_ht, prix_unitaire_ht } = context.query;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200 && response.data.has_shop) {
				if (response.data.is_subscribed) {
					const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_USER_SUBSCRIPTION}`;
					const response: subscriptionGetUserSubscriptionResponseType = await getApi(url, instance);
					if (response.status === 200 && response.data) {
						// not subscribed check for params - proceed
						if (prix_ttc && pourcentage && prix_unitaire_ttc && nbr_article && prix_ht && prix_unitaire_ht) {
							const pickedSubscription: Omit<availableSubscriptionPlanType, 'pk'> = {
								prix_ttc: parseInt(prix_ttc as string),
								pourcentage: parseInt(pourcentage as string),
								prix_unitaire_ttc: parseInt(prix_unitaire_ttc as string),
								nbr_article: parseInt(nbr_article as string),
								prix_ht: parseInt(prix_ht as string),
								prix_unitaire_ht: parseInt(prix_unitaire_ht as string),
							};
							return {
								props: {
									pickedSubscription: pickedSubscription,
									is_subscribed: true,
									company: response.data.company,
									ice: response.data.ice,
									first_name: response.data.first_name,
									last_name: response.data.last_name,
									adresse: response.data.adresse,
									city: response.data.city,
									code_postal: response.data.code_postal,
									country: response.data.country,
								},
							};
						} else {
							// params not found redirect back
							return {
								redirect: {
									permanent: false,
									destination: DASHBOARD_SUBSCRIPTION,
								},
							};
						}
					} else {
						// user doesn't have a subscription
						return {
							redirect: {
								permanent: false,
								destination: DASHBOARD_SUBSCRIPTION,
							},
						};
					}
				} else {
					// user doesn't have a subscription
					return {
						redirect: {
							permanent: false,
							destination: DASHBOARD_SUBSCRIPTION,
						},
					};
				}
			} else {
				// online but doesn't own a shop or not subscribed
				return {
					redirect: {
						permanent: false,
						destination: NOT_FOUND_404,
					},
				};
			}
			// user not logged in
		} else {
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		// fallback error
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default UpdateCheckout;
