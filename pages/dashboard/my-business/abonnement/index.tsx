import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../utils/routes';
import { Stack, Box } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import { default as ImageFuture } from 'next/future/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import JumelleIlluSVG from '../../../../public/assets/images/jumelle-illu.svg';
import Link from 'next/link';
import IosSwitch from '../../../../components/htmlElements/switches/iosSwitch';
import TextButton from '../../../../components/htmlElements/buttons/textButton/textButton';
import CustomSlider from '../../../../components/htmlElements/customSlider/customSlider';
import PrimaryAnchorButton from '../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import SubscriptionCheckSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/subscription-check.svg';
import { getSliderData } from '../../../../utils/rawData';
import { useAppSelector } from '../../../../utils/hooks';
import { getAvailableSubscriptions } from '../../../../store/selectors';
import { useDispatch } from 'react-redux';
import { subscriptionGetAvailableSubscriptionAction } from '../../../../store/actions/subscription/subscriptionActions';
import { availableSubscriptionPlanType } from "../../../../types/subscription/subscriptionTypes";

type AbonnementAvantageItemProps = {
	text: string;
};
const AbonnementAvantageItem: React.FC<AbonnementAvantageItemProps> = (props: AbonnementAvantageItemProps) => {
	return (
		<Stack direction="row" spacing="6px">
			<ImageFuture src={SubscriptionCheckSVG} alt="" width="24" height="24" sizes="100vw" />
			<span className={Styles.dashboardNotSubscribedAvantageItem}>{props.text}</span>
		</Stack>
	);
};

type PageContentType = {
	data: AccountGetDashboardType;
};

const initialSubscriptionPlan = {
  nbr_article: 1,
  prix_ht: 799,
  prix_ttc: 959,
  prix_unitaire_ht: 799,
  prix_unitaire_ttc: 959,
  pourcentage: 0
}

const PageContent: React.FC<PageContentType> = (props: PageContentType) => {
	const { data } = props;
	const availableSubscriptions = useAppSelector(getAvailableSubscriptions);
	const dispatch = useDispatch();
	// true = TTC - false = HT
	const [togglePriceType, setTogglePriceType] = useState<boolean>(false);
	const [illimiteState, setIllimiteState] = useState<boolean>(false);
	const [articlesValue, setArticlesValue] = useState<number>(1);
	const [articlesState, setArticlesState] = useState<string>(`${articlesValue} articles`);
	const [pickedArticle, setPickedArticle] = useState<number>(1);
	const [selectedSlideValues, setSelectedSlideValues] = useState<Omit<availableSubscriptionPlanType, 'pk'>>(initialSubscriptionPlan);

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
			setPickedArticle(value as number);
			setIllimiteState(false);
		}
	};

	// const marks = [
	// 	{
	// 		value: 1,
	// 	},
	// 	{
	// 		value: 2,
	// 	},
	// 	{
	// 		value: 3,
	// 	},
	// 	{
	// 		value: 4,
	// 	},
	// 	{
	// 		value: 5,
	// 	},
	// 	{
	// 		value: 6,
	// 	},
	// 	{
	// 		value: 7,
	// 	},
	// 	{
	// 		value: 8,
	// 	},
	// 	{
	// 		value: 9,
	// 	},
	// 	{
	// 		value: 10,
	// 	},
	// 	{
	// 		value: 20,
	// 	},
	// 	{
	// 		value: 30,
	// 	},
	// 	{
	// 		value: 40,
	// 	},
	// 	{
	// 		value: 50,
	// 	},
	// 	{
	// 		value: 60,
	// 	},
	// 	{
	// 		value: 70,
	// 	},
	// 	{
	// 		value: 80,
	// 	},
	// 	{
	// 		value: 90,
	// 	},
	// 	{
	// 		value: 100,
	// 	},
	// 	{
	// 		value: 120,
	// 	},
	// ];
	const marks = [
		{
			value: 10,
		},
		{
			value: 20,
		},
		{
			value: 30,
		},
		{
			value: 40,
		},
		{
			value: 50,
		},
		{
			value: 60,
		},
		{
			value: 70,
		},
		{
			value: 80,
		},
		{
			value: 90,
		},
		{
			value: 100,
		},
		{
			value: 110,
		},
		{
			value: 120,
		},
		{
			value: 130,
		},
		{
			value: 140,
		},
		{
			value: 150,
		},
		{
			value: 160,
		},
		{
			value: 170,
		},
		{
			value: 180,
		},
		{
			value: 190,
		},
		{
			value: 200,
		},
	];

	useEffect(() => {
		// dispatch get available subscriptions
		if (availableSubscriptions.length === 0) {
			dispatch(subscriptionGetAvailableSubscriptionAction());
		} else {
			availableSubscriptions.filter(item => item.nbr_article === pickedArticle).map((item) => {
				setSelectedSlideValues(item);
			})
		}
	}, [availableSubscriptions, availableSubscriptions.length, dispatch, pickedArticle]);

	return (
		<>
			{!data.is_subscribed ? (
				<Stack direction="column" className={Styles.dashboardNotSubscribedRootStack}>
					<Stack direction="column" spacing="24px">
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							className={Styles.dashboardNotSubscribedSubRootStack}
						>
							<Stack direction="column" className={Styles.dashboardNotSubscribedHeaderWrapper}>
								<span className={Styles.dashboardNotSubscribedSpanHeaderOne}>
									Vos clients sont sur les moteurs de recherche.
								</span>
								<span className={Styles.dashboardNotSubscribedSpanHeaderTwo}>Et vous ?</span>
							</Stack>
							<ImageFuture src={JumelleIlluSVG} alt="" width="281" height="178" sizes="100vw" />
						</Stack>
						<Box className={Styles.dashboardNotSubscribedMobileMain}>
							<Stack direction="column" spacing="24px">
								<p className={Styles.dashboardNotSubscribedParagraphe}>
									L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien
									référencé, abonnez vous pour toucher plus de gens.
								</p>
								<Stack direction="column" alignItems="center" className={Styles.dashboardNotSubscribedHeadline}>
									<span>Combien d’articles désirez-vous référencer ?</span>
									<Link href="/" passHref>
										<a>En savoir plus sur les articles référencés</a>
									</Link>
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
													onClick={() => {}}
													cssClass={Styles.dashboardNotSubscribedNousContacter}
												/>
											</Stack>
										) : (
											<Stack direction="column" alignItems="center" spacing={2} mt="4px">
												<span className={Styles.dashboardNotSubscribedPriceBy}>
													{togglePriceType ? (
														<span>
															{selectedSlideValues.prix_unitaire_ttc}
														</span>
													) : (
														<span>
															{selectedSlideValues.prix_unitaire_ht}
														</span>
													)} / article
												</span>
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
												marks={marks}
												// max={1}
												// min={120}
												onChange={onSliderValueChangeHandler}
											/>
										</Box>
										<Box className={Styles.dashboardNotSubscribedArticlesBox}>
											<span>{articlesState}</span>
										</Box>
									</Stack>
									<Stack direction="row" justifyContent="center" alignItems="center">
										<PrimaryAnchorButton
											buttonText="Continuer"
											active={true}
											nextPage="/"
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
			) : (
				<p>SUBSCRIBED CONTENT</p>
			)}
		</>
	);
};

type IndexProps = {
	pageProps: {
		data: AccountGetDashboardType;
		first_name: string;
		last_name: string;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(true);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.noPaddingMain} ${Styles.noPaddingFixMobile}`}>
				<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
					<DesktopMyBusinessSideNav backText="My business" data={data} />
					<Box sx={{ width: '100%' }}>
						<PageContent data={data} />
					</Box>
				</Stack>
				<Stack className={Styles.mobileOnly}>
					{!mobileElementClicked ? (
						<MobileMyBusinessNav setContent={setMobileElementClicked} backText="My business" data={data} addMobilePadding={true} />
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
										<ImageFuture
											src={MiniBackSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.backIcon}
										/>
										<span className={Styles.backText}>Retour</span>
									</Stack>
								</Stack>
							</Stack>
							<PageContent data={data} />
						</Box>
					)}
				</Stack>
			</main>
			<CustomFooter />
		</Stack>
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
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// has shop proceed to audience page
					return {
						props: {
							data: response_shop.data,
							first_name: appToken.initStateToken.user.first_name,
							last_name: appToken.initStateToken.user.last_name,
						},
					};
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
