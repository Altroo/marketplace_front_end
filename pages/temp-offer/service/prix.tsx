import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import OfferStyles from '../../../styles/temp-offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import Styles from '../../../styles/temp-offer/create/price.module.sass';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import {
	TEMP_SHOP_EDIT_ROUTE,
	TEMP_OFFER_ADD_SERVICE_DESCRIPTION,
	TEMP_OFFER_ROUTE,
	TEMP_SHOP_ADD_SHOP_NAME,
} from '../../../utils/routes';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import { Box, Stack, ThemeProvider } from '@mui/material';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import Chip from '@mui/material/Chip';
import { OfferChipTheme } from '../../../utils/themes';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import CurrencyInput from 'react-currency-input-field';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
	offerPostRootServiceAction,
	offerPutRootServiceAction,
	setOfferServicePricePage,
} from '../../../store/actions/offer/offerActions';
import { useRouter } from 'next/router';
import {
	getLocalOfferServiceEditPK,
	getLocalOfferServiceObj,
	getLocalOfferServicePrice,
	getLocalOfferServicePriceBy,
} from '../../../store/selectors';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import {
	OfferPostRootServiceResponseType,
	OfferPutRootServiceResponseType,
} from '../../../types/offer/offerTypes';

const Prix: NextPage = () => {
	const offer_pk = useAppSelector(getLocalOfferServiceEditPK);
	const localServiceObj = useAppSelector(getLocalOfferServiceObj);
	const {
		categoriesList,
		title,
		pictures,
		description,
		forWhom,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		service_zone_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius,
		tags,
	} = localServiceObj;
	const activeStep = '3';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [submitActive, setSubmitActive] = useState<boolean>(false);
	const pickedPriceBy = useAppSelector(getLocalOfferServicePriceBy);
	const pickedPrice = useAppSelector(getLocalOfferServicePrice);
	const [price, setPrice] = useState<string | number>(pickedPrice ? pickedPrice : '');
	const [heur, setHeur] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'H'));
	const [jour, setJour] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'J'));
	const [semaine, setSemaine] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'S'));
	const [mois, setMois] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'M'));
	const [prestation, setPrestation] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'P'));

	const handleSubmit = () => {
		let price_by: 'H' | 'J' | 'S' | 'M' | 'P' = 'P';
		if (heur) {
			price_by = 'H';
		}
		if (jour) {
			price_by = 'J';
		}
		if (semaine) {
			price_by = 'S';
		}
		if (mois) {
			price_by = 'M';
		}
		if (prestation) {
			price_by = 'P';
		}
		const availabilityCodeDaysArray: Array<string> = [];
		service_availability_days.map((day) => {
			availabilityCodeDaysArray.push(day.code_day);
		});
		const priceAction = setOfferServicePricePage(price as string, price_by);
		dispatch({
			...priceAction,
			onComplete: ({ error, cancelled, data }: { error: ApiErrorResponseType; cancelled: boolean; data: boolean }) => {
				if (!error && !cancelled && data) {
					if (!offer_pk) {
						// dispatch set price
						// add service
						const action = offerPostRootServiceAction(
							'S',
							categoriesList.join(','),
							title,
							pictures,
							description,
							forWhom,
							availabilityCodeDaysArray.join(','),
							service_morning_hour_from,
							service_morning_hour_to,
							service_afternoon_hour_from,
							service_afternoon_hour_to,
							service_zone_by,
							service_longitude,
							service_latitude,
							service_address,
							service_km_radius,
							price as string,
							price_by,
							tags,
						);
						dispatch({
							...action,
							onComplete: ({
								error,
								cancelled,
								data,
							}: {
								error: ApiErrorResponseType;
								cancelled: boolean;
								data: OfferPostRootServiceResponseType;
							}) => {
								if (!error && !cancelled && data.data) {
									router.replace(TEMP_SHOP_EDIT_ROUTE).then();
								}
							},
						});
					} else {
						// edit service
						const action = offerPutRootServiceAction(
							offer_pk,
							categoriesList.join(','),
							title,
							pictures,
							description,
							forWhom,
							availabilityCodeDaysArray.join(','),
							service_morning_hour_from,
							service_morning_hour_to,
							service_afternoon_hour_from,
							service_afternoon_hour_to,
							service_zone_by,
							service_longitude,
							service_latitude,
							service_address,
							service_km_radius,
							price as string,
							price_by,
							tags,
						);
						dispatch({
							...action,
							onComplete: ({
								error,
								cancelled,
								data,
							}: {
								error: ApiErrorResponseType;
								cancelled: boolean;
								data: OfferPutRootServiceResponseType;
							}) => {
								if (!error && !cancelled && data.data) {
									router.replace(TEMP_OFFER_ROUTE(offer_pk.toString())).then();
								}
							},
						});
					}
				}
			},
		});
	};

	useEffect(() => {
		if (price === '' && (!heur || !jour || !semaine || !mois || !prestation)) {
			setSubmitActive(false);
		} else {
			if (typeof price === 'string') {
				if (parseFloat(price) !== 0 && (heur || jour || semaine || mois || prestation)) {
					setSubmitActive(true);
				} else {
					setSubmitActive(false);
				}
			} else {
				if (price !== 0 && (heur || jour || semaine || mois || prestation)) {
					setSubmitActive(true);
				} else {
					setSubmitActive(false);
				}
			}
		}
	}, [heur, jour, mois, prestation, price, semaine]);

	const chipTheme = OfferChipTheme();
	return (
		<>
			<main className={SharedStyles.fullPageMain}>
				<LeftSideBar step={activeStep} which="SERVICE" />
				<Box className={Styles.boxWrapper}>
					<DesktopTopNavigationBar
						backHref={TEMP_OFFER_ADD_SERVICE_DESCRIPTION}
						returnButton
						closeButtonHref={TEMP_SHOP_EDIT_ROUTE}
					/>
					<MobileTopNavigationBar
						backHref={TEMP_OFFER_ADD_SERVICE_DESCRIPTION}
						returnButton
						closeButtonHref={TEMP_SHOP_EDIT_ROUTE}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Fixer un prix"
						HelpText="Apprendre à définir son prix"
						headerClasses={OfferStyles.topHeader}
					/>
					<Stack direction="column" justifyContent="space-between" sx={{ height: '90%' }}>
						<Stack direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '2rem' }}>
							<CurrencyInput
								className={Styles.priceInputField}
								id="prix-input"
								name="prix-input"
								placeholder="0.00"
								value={price}
								decimalsLimit={2}
								onValueChange={(value) => {
									if (value) {
										setPrice(value);
									} else {
										setPrice('');
									}
								}}
							/>
							<Stack direction="row">
								<ThemeProvider theme={chipTheme}>
									<Stack
										direction="row"
										flexWrap="wrap"
										gap={2}
										alignItems="center"
										sx={{ marginTop: '6px' }}
										className={Styles.stackRow}
									>
										<span className={Styles.priceLabel}>DH par</span>
										<Chip
											label="Heure"
											variant={heur ? 'filled' : 'outlined'}
											onClick={() => {
												setHeur(!heur);
												setJour(false);
												setSemaine(false);
												setMois(false);
												setPrestation(false);
											}}
										/>
										<Chip
											label="Jour"
											variant={jour ? 'filled' : 'outlined'}
											onClick={() => {
												setJour(!jour);
												setHeur(false);
												setSemaine(false);
												setMois(false);
												setPrestation(false);
											}}
										/>
										<Chip
											label="Semaine"
											variant={semaine ? 'filled' : 'outlined'}
											onClick={() => {
												setSemaine(!semaine);
												setJour(false);
												setHeur(false);
												setMois(false);
												setPrestation(false);
											}}
										/>
										<Chip
											label="Mois"
											variant={mois ? 'filled' : 'outlined'}
											onClick={() => {
												setMois(!mois);
												setSemaine(false);
												setJour(false);
												setHeur(false);
												setPrestation(false);
											}}
										/>
										<Chip
											label="Prestation"
											variant={prestation ? 'filled' : 'outlined'}
											onClick={() => {
												setPrestation(!prestation);
												setMois(false);
												setSemaine(false);
												setJour(false);
												setHeur(false);
											}}
										/>
									</Stack>
								</ThemeProvider>
							</Stack>
						</Stack>
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
							<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
								<PrimaryButton
									buttonText={offer_pk ? 'Modifier' : 'Publier'}
									active={submitActive}
									onClick={handleSubmit}
									type="submit"
								/>
							</div>
						</Stack>
					</Stack>
				</Box>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				// user has shop - proceed to add offer
				if (response.data.has_shop) {
					return {
						props: {},
					};
				} else {
					// user don't own a shop - proceed to create one.
					return {
						redirect: {
							permanent: false,
							destination: TEMP_SHOP_ADD_SHOP_NAME,
						},
					};
				}
			} else {
				// user not authenticated
				return {
					redirect: {
						permanent: false,
						destination: TEMP_SHOP_ADD_SHOP_NAME,
					},
				};
			}
		}
	} catch (e) {
		// fall back error
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
}

export default Prix;
