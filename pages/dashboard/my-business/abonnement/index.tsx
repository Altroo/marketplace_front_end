import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import SubscribedStyles from '../../../../styles/dashboard/subscribed.module.sass';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import {
	AUTH_LOGIN,
	DASHBOARD_INDEXED_OFFERS,
	DASHBOARD_NEW_SUBSCRIPTION,
	DASHBOARD_UPGRADE_SUBSCRIPTION,
	NOT_FOUND_404,
} from '../../../../utils/routes';
import { Stack, Box } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import Image from 'next/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import JumelleIlluSVG from '../../../../public/assets/images/jumelle-illu.svg';
import IosSwitch from '../../../../components/htmlElements/switches/iosSwitch';
import TextButton from '../../../../components/htmlElements/buttons/textButton/textButton';
import CustomSlider from '../../../../components/htmlElements/customSlider/customSlider';
import SubscriptionCheckSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/subscription-check.svg';
import BlackStarSVG from '../../../../public/assets/svgs/globalIcons/black-star.svg';
import ArticlesIndexedSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/indexed-articles.svg';
import USDBlackSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/usd-black.svg';
import { getSliderData } from '../../../../utils/rawData';
import { useAppSelector } from '../../../../utils/hooks';
import { getAvailableSubscriptions } from '../../../../store/selectors';
import { useDispatch } from 'react-redux';
import { subscriptionGetAvailableSubscriptionAction } from '../../../../store/actions/subscription/subscriptionActions';
import {
	availableSubscriptionPlanType,
	subscriptionGetUserCurrentSubscriptionType,
	subscriptionGetUserSubscriptionResponseType,
} from '../../../../types/subscription/subscriptionTypes';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import TextAnchorButton, {
	MobileTextAnchorButton,
} from '../../../../components/htmlElements/buttons/textAnchorButton/textAnchorButton';

type AbonnementAvantageItemProps = {
	text: string;
};
const AbonnementAvantageItem: React.FC<AbonnementAvantageItemProps> = (props: AbonnementAvantageItemProps) => {
	return (
		<Stack direction="row" spacing="6px">
			<Image src={SubscriptionCheckSVG} alt="" width="24" height="24" sizes="100vw" />
			<span className={Styles.dashboardNotSubscribedAvantageItem}>{props.text}</span>
		</Stack>
	);
};

type SubscribeSliderContentType = {
	data: AccountGetDashboardType;
};

const initialSubscriptionPlan = {
	nbr_article: 7,
	prix_ht: 3353,
	prix_ttc: 4024,
	prix_unitaire_ht: 479,
	prix_unitaire_ttc: 505,
	pourcentage: 40,
};

const SubscribeSliderContent: React.FC<SubscribeSliderContentType> = (props: SubscribeSliderContentType) => {
	const { data } = props;
	const dispatch = useDispatch();
	const router = useRouter();
	const { renderBack } = router.query;
	const availableSubscriptions = useAppSelector(getAvailableSubscriptions);
	// true = TTC - false = HT
	const [togglePriceType, setTogglePriceType] = useState<boolean>(true);
	const [illimiteState, setIllimiteState] = useState<boolean>(false);
	const [articlesValue, setArticlesValue] = useState<number>(70);
	const [pickedArticle, setPickedArticle] = useState<number>(7);
	const [articlesState, setArticlesState] = useState<string>(`${pickedArticle} articles`);
	const [selectedSlideValues, setSelectedSlideValues] =
		useState<Omit<availableSubscriptionPlanType, 'pk'>>(initialSubscriptionPlan);

	const onSliderValueChangeHandler = (e: Event, newValue: number | Array<number>) => {
		const value = getSliderData(newValue as number);
		setArticlesValue(newValue as number);
		if (value === 110) {
			setIllimiteState(true);
			setArticlesState(`Illimité`);
		} else {
			if (value === 1) {
				setArticlesState(`${value} article`);
			} else {
				setArticlesState(`${value} articles`);
			}
			setIllimiteState(false);
		}
		setPickedArticle(value as number);
	};

	const subscribingClickHandler = () => {
		// safety check for illimité
		const query = {
			nbr_article: selectedSlideValues.nbr_article,
			prix_ht: selectedSlideValues.prix_ht,
			prix_ttc: selectedSlideValues.prix_ttc,
			prix_unitaire_ht: selectedSlideValues.prix_unitaire_ht,
			prix_unitaire_ttc: selectedSlideValues.prix_unitaire_ttc,
			pourcentage: selectedSlideValues.pourcentage,
		};
		if (pickedArticle < 110) {
			if (!renderBack) {
				router
					.push(
						{
							pathname: DASHBOARD_NEW_SUBSCRIPTION,
							query: { ...query },
						},
						DASHBOARD_NEW_SUBSCRIPTION,
					) // using "as" to hide the query params
					.then();
			} else {
				router
					.push(
						{
							pathname: DASHBOARD_UPGRADE_SUBSCRIPTION,
							query: { ...query },
						},
						DASHBOARD_UPGRADE_SUBSCRIPTION,
					)
					.then();
			}
		}
	};

	useEffect(() => {
		// dispatch get available subscriptions
		if (availableSubscriptions.length === 0) {
			dispatch(subscriptionGetAvailableSubscriptionAction());
		} else {
			availableSubscriptions
				.filter((item) => item.nbr_article === pickedArticle)
				.map((item) => {
					setSelectedSlideValues(item);
				});
		}
	}, [availableSubscriptions, availableSubscriptions.length, dispatch, pickedArticle]);

	return (
		<>
			{!data.is_subscribed || renderBack ? (
				<Stack direction="column" className={Styles.dashboardNotSubscribedRootStack}>
					<Stack direction="column" spacing="24px">
						{/*<Stack*/}
						{/*	direction="row"*/}
						{/*	justifyContent="space-between"*/}
						{/*	alignItems="center"*/}
						{/*	className={Styles.dashboardNotSubscribedSubRootStack}*/}
						{/*>*/}
						{/*	<Stack direction="column" className={Styles.dashboardNotSubscribedHeaderWrapper}>*/}
						{/*		<span className={Styles.dashboardNotSubscribedSpanHeaderOne}>*/}
						{/*			Vos clients sont sur les moteurs de recherche.*/}
						{/*		</span>*/}
						{/*		<span className={Styles.dashboardNotSubscribedSpanHeaderTwo}>Et vous ?</span>*/}
						{/*	</Stack>*/}
						{/*	<Image src={JumelleIlluSVG} alt="" width="281" height="178" sizes="100vw" />*/}
						{/*</Stack>*/}
						<Box className={Styles.dashboardNotSubscribedMobileMain}>
							<Stack direction="column" spacing="24px">
								{/*<p className={Styles.dashboardNotSubscribedParagraphe}>*/}
								{/*	L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien*/}
								{/*	référencé, abonnez vous pour toucher plus de gens.*/}
								{/*</p>*/}
								<Stack direction="column" alignItems="center" className={Styles.dashboardNotSubscribedHeadline}>
									<span>Combien d’articles désirez-vous référencer ?</span>
									{/*<Link href="/">*/}
									{/*	En savoir plus sur les articles référencés*/}
									{/*</Link>*/}
								</Stack>
								<Stack direction="column" pt="48px" className={Styles.dashboardNotSubscribedPopulaireBannerWrapper}>
									{articlesValue === 70 && (
										<Box className={Styles.dashboardNotSubscribedPopulaireBanner}>
											<span>Populaire</span>
										</Box>
									)}
									<Stack direction="column" spacing={1} mt={2}>
										<Stack direction="row" justifyContent="flex-end" spacing={1}>
											<span className={Styles.dashboardNotSubscribedPriceType}>
												<span className={`${!togglePriceType && Styles.dashboardNotSubscribedPriceToggleActive}`}>
													HT{' '}
												</span>
												/
												<span className={`${togglePriceType && Styles.dashboardNotSubscribedPriceToggleActive}`}>
													{' '}
													TTC
												</span>
											</span>
											<IosSwitch
												checked={togglePriceType}
												onChange={() => setTogglePriceType((prevState) => !prevState)}
												activeColor="#0D070B"
												labelcssStyles={{ marginLeft: '18px', marginRight: '0px' }}
											/>
										</Stack>
										<Stack direction="row" justifyContent="flex-end">
											<span className={Styles.dashboardNotSubscribedPriceMessage}>
												Tous nos forfaits sont facturés annuellement
											</span>
										</Stack>
									</Stack>
									<Stack direction="column" alignItems="center" spacing={1} pt="20px">
										{illimiteState ? (
											<Stack direction="column" alignItems="center" spacing={1}>
												<Stack
													direction="column"
													spacing={1}
													alignItems="center"
													className={Styles.dashboardNotSubscribedNousContacterBox}
												>
													<span>Un besoin particulier ?</span>
													<span>N’hésitez pas à nous contacter !</span>
												</Stack>
												<TextButton
													buttonText="Nous contacter"
													onClick={() => {
														router.push(`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`).then();
													}}
													cssClass={Styles.dashboardNotSubscribedNousContacter}
												/>
											</Stack>
										) : (
											<Stack direction="column" alignItems="center" spacing={2} mt="4px">
												<Box className={Styles.dashboardNotSubscribedArticlesBox}>
													<span>{articlesState}</span>
												</Box>

												<Stack direction="row" spacing={2} alignItems="center">
													{togglePriceType ? (
														<span className={Styles.dashboardNotSubscribedPriceByDescription}>
															{`soit ${selectedSlideValues.prix_ttc} Dh par an`}
														</span>
													) : (
														<span className={Styles.dashboardNotSubscribedPriceByDescription}>
															{`soit ${selectedSlideValues.prix_ht} Dh par an`}
														</span>
													)}
													<Box className={Styles.dashboardNotSubscribedSaveWrapper}>
														<span className={Styles.dashboardNotSubscribedSave}>
															{`Save ${selectedSlideValues.pourcentage}%`}
														</span>
													</Box>
												</Stack>
											</Stack>
										)}
									</Stack>
								</Stack>
								<Stack direction="column" spacing={3} pb="60px">
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
										spacing="32px"
										className={Styles.dashboardNotSubscribedSliderRoot}
									>
										<Box className={Styles.dashboardNotSubscribedSliderBox}>
											<CustomSlider
												value={articlesValue}
												defaultValue={70} // populaire - 7 articles
												onChange={onSliderValueChangeHandler}
											/>
										</Box>
										<span className={Styles.dashboardNotSubscribedPriceBy}>
											{togglePriceType ? (
												<span>{selectedSlideValues.prix_unitaire_ttc}</span>
											) : (
												<span>{selectedSlideValues.prix_unitaire_ht}</span>
											)}{' DH '}
											/ article
										</span>
									</Stack>
									<Stack direction="row" justifyContent="center" alignItems="center">
										<PrimaryButton
											buttonText="Continuer"
											active={pickedArticle < 110} // disable button on illimité
											onClick={subscribingClickHandler}
											cssClass={Styles.dashboardNotSubscribedActionButton}
										/>
									</Stack>
								</Stack>
							</Stack>
						</Box>
					</Stack>
					<Box mt="0px" mb="0px" className={Styles.dashboardNotSubscribedAvantageBox}>
						<Stack direction="column" spacing="30px" className={Styles.dashboardNotSubscribedAvantageMobile}>
							<Box className={Styles.dashboardNotSubscribedAvantage}>Les avatantages de nos abonnements:</Box>
							<Stack
								direction="row"
								justifyContent="space-around"
								className={Styles.dashboardNotSubscribedAvantageMobileStack}
							>
								<Stack direction="column" spacing="24px">
									<AbonnementAvantageItem text="Promotion de vos articles sur Google" />
									<AbonnementAvantageItem text="Promotion de la marketplace Qaryb" />
								</Stack>
								<Stack direction="column" spacing="24px">
									<AbonnementAvantageItem text="Mise à disposition de notre plugin livraison" />
									<AbonnementAvantageItem text="Valorisation de vos articles grâce à notre Label Creator" />
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			) : null}
		</>
	);
};

type AlreadySubscribedContentType = {
	subscriptionData: subscriptionGetUserCurrentSubscriptionType;
};

const AlreadySubscribedContent: React.FC<AlreadySubscribedContentType> = (props: AlreadySubscribedContentType) => {
	const { expiration_date, facture, pourcentage, prix_unitaire_ttc, prix_ttc, used_slots, nbr_article } =
		props.subscriptionData;
	const router = useRouter();

	const UpdateClickHandler = () => {
		router
			.replace(
				{
					query: {
						renderBack: true,
					},
				},
				router.asPath,
			)
			.then();
	};

	return (
		<Stack direction="column" spacing={3} className={Styles.dashboardRightContentMarginLeft}>
			<h2 className={Styles.userShopTitle}>Votre abonnement</h2>
			<Stack direction="column" spacing="24px">
				<Stack direction="row" spacing="12px" className={SubscribedStyles.subscribedMobileRootStack}>
					<Box className={SubscribedStyles.subscribedIndexedArticlesBox}>
						<Stack direction="column" spacing="12px">
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								// className={SubscribedStyles.subscribedIndexedArticlesMiniBoxWrapper}
							>
								<Stack
									direction="row"
									spacing="7px"
									alignItems="center"
									className={SubscribedStyles.subscribedIndexedArticlesMiniBox}
								>
									<Image src={ArticlesIndexedSVG} alt="" width="18" height="18" sizes="100vw" />
									<span>Articles référencés</span>
								</Stack>
								<span className={SubscribedStyles.subscribedValableDate}>Valable jusqu&apos;au {expiration_date}</span>
							</Stack>
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								className={SubscribedStyles.subscribedArticlesCount}
								spacing="10px"
							>
								<span>{used_slots}</span>
								<span>/{nbr_article} articles</span>
							</Stack>
							<Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
								<Box className={Styles.desktopOnly}>
									<TextAnchorButton buttonText="Articles référencés" nextPage={DASHBOARD_INDEXED_OFFERS} />
								</Box>
								<Box className={Styles.mobileOnly}>
									<MobileTextAnchorButton
										buttonText="Articles référencés"
										onClick={() => {
											router
												.replace(
													{
														query: {
															direct: true,
														},
														pathname: DASHBOARD_INDEXED_OFFERS,
													},
													DASHBOARD_INDEXED_OFFERS,
												)
												.then();
										}}
									/>
								</Box>
							</Stack>
						</Stack>
					</Box>
					<Box className={SubscribedStyles.subscribedTarifBox}>
						<Stack direction="column" spacing="24px" justifyContent="space-between">
							<Stack direction="row" spacing="7px" className={SubscribedStyles.subscribedIndexedTarifMiniBox}>
								<Image src={USDBlackSVG} alt="" width="18" height="18" sizes="100vw" />
								<span>Tarif</span>
							</Stack>
							<Stack direction="column" spacing="15px">
								<Stack
									direction="row"
									className={SubscribedStyles.subscribedPrixParArticle}
									alignItems="center"
								>
									<span>{prix_unitaire_ttc} DH</span>
									<span>/ article</span>
								</Stack>
								<Stack
									direction="row"
									className={SubscribedStyles.subscribedPrixParAn}
									spacing="18px"
									alignItems="center"
								>
									<span>soit {prix_ttc} Dh par an</span>
									<Box>
										<span>You save {pourcentage}%</span>
									</Box>
								</Stack>
							</Stack>
							<Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
								<TextAnchorButton
									buttonText="Voir ma dernière facture"
									nextPage={facture}
									target="_blank"
									rel="noreferrer"
								/>
							</Stack>
						</Stack>
					</Box>
				</Stack>
				<Box className={SubscribedStyles.subscribedAvantageBox}>
					<Stack direction="column" spacing="32px">
						<Stack direction="row" spacing="7px" className={SubscribedStyles.subscribedIndexedTarifMiniBox}>
							<Image src={BlackStarSVG} alt="" width="18" height="18" sizes="100vw" />
							<span>Vos avantages</span>
						</Stack>
						<Stack direction="column" spacing="24px" pb="12px">
							<AbonnementAvantageItem text="Promotion de vos articles sur Google" />
							<AbonnementAvantageItem text="Promotion sur la marketplace Qaryb" />
							<AbonnementAvantageItem text="Mise à disposition de notre plugin livraison" />
							<AbonnementAvantageItem text="Valorisation de vos articles grâce à notre Label Creator" />
						</Stack>
					</Stack>
				</Box>
				<Box className={SubscribedStyles.subscribedAvantageActionBox}>
					<Stack direction="column" spacing="24px" alignItems="center" justifyContent="center">
						<Stack direction="column" spacing="4px" alignItems="center" justifyContent="center">
							<span>Vous en voulez plus ?</span>
							<span>Changer votre abonnement en quelques clics</span>
						</Stack>
						<PrimaryButton buttonText="Modifier" active={true} onClick={UpdateClickHandler} />
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: AccountGetDashboardType;
		subscriptionData: subscriptionGetUserCurrentSubscriptionType | null;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, subscriptionData } = props.pageProps;
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			{subscriptionData !== null ? (
				<main className={`${Styles.main} ${Styles.fixMobile}`}>
					<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
						<DesktopMyBusinessSideNav backText="My business" data={data} />
						<Box sx={{ width: '100%' }}>
							<AlreadySubscribedContent subscriptionData={subscriptionData} />
						</Box>
					</Stack>
					<Stack className={Styles.mobileOnly}>
						{!mobileElementClicked ? (
							<MobileMyBusinessNav
								setContent={setMobileElementClicked}
								backText="My business"
								data={data}
								addMobilePadding={true}
							/>
						) : (
							<Box sx={{ width: '100%', height: '100%' }}>
								<Stack direction="column">
									<Stack direction="row" justifyContent="space-between">
										<Stack
											className={Styles.topBackNavigationStack}
											direction="row"
											spacing={1}
											onClick={() => setMobileElementClicked(false)}
											alignItems="center"
										>
											<Image src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
											<span className={Styles.backText}>Retour</span>
										</Stack>
									</Stack>
								</Stack>
								<AlreadySubscribedContent subscriptionData={subscriptionData} />
							</Box>
						)}
					</Stack>
				</main>
			) : (
				<main className={`${Styles.main} ${Styles.noPaddingFixMobile}`}>
					<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
						<DesktopMyBusinessSideNav backText="My business" data={data} />
						<Box sx={{ width: '100%' }}>
							<SubscribeSliderContent data={data} />
						</Box>
					</Stack>
					<Stack className={Styles.mobileOnly}>
						{!mobileElementClicked ? (
							<MobileMyBusinessNav
								setContent={setMobileElementClicked}
								backText="My business"
								data={data}
								addMobilePadding={true}
							/>
						) : (
							<Box sx={{ width: '100%', height: '100%' }}>
								<Stack direction="column">
									<Stack direction="row" justifyContent="space-between" className={Styles.marginLeft}>
										<Stack
											className={Styles.topBackNavigationStack}
											direction="row"
											spacing={1}
											onClick={() => setMobileElementClicked(false)}
											alignItems="center"
										>
											<Image src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
											<span className={Styles.backText}>Retour</span>
										</Stack>
									</Stack>
								</Stack>
								<SubscribeSliderContent data={data} />
							</Box>
						)}
					</Stack>
				</main>
			)}
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	const { renderBack } = context.query;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// using render back to re render this page again
					if (!response.data.is_subscribed || renderBack) {
						// show subscribe now content
						return {
							props: {
								data: response_shop.data,
								subscriptionData: null,
							},
						};
					} else {
						// show already subscribed data
						const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_USER_SUBSCRIPTION}`;
						const response: subscriptionGetUserSubscriptionResponseType = await getApi(url, instance);
						if (response.status === 200) {
							return {
								props: {
									data: response_shop.data,
									subscriptionData: {
										expiration_date: response.data.expiration_date,
										used_slots: response.data.used_slots,
										nbr_article: response.data.nbr_article,
										prix_ttc: response.data.prix_ttc,
										prix_unitaire_ttc: response.data.prix_unitaire_ttc,
										pourcentage: response.data.pourcentage,
										facture: response.data.facture,
									},
								},
							};
						} else {
							// show subscribe now content
							return {
								props: {
									data: response_shop.data,
									subscriptionData: null,
								},
							};
						}
					}
					// doesn't own a shop
				} else {
					return {
						redirect: {
							permanent: false,
							destination: NOT_FOUND_404,
						},
					};
				}
				// fall back error
			} else {
				return {
					redirect: {
						permanent: false,
						destination: NOT_FOUND_404,
					},
				};
			}
		} else {
			// redirect to login page
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
		// redirect to 404
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default Index;
