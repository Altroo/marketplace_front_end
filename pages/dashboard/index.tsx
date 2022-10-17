import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../utils/helpers';
import { AccountGetDashboardResponseType, AccountGetDashboardType } from '../../types/account/accountTypes';
import { getApi } from '../../store/services/_init/_initAPI';
import {
	AUTH_LOGIN,
	DASHBOARD_AUDIENCES,
	DASHBOARD_CHIFFRE_DAFFAIRE,
	DASHBOARD_EDIT_PROFILE,
	DASHBOARD_INDEXED_OFFERS,
	DASHBOARD_SUBSCRIPTION,
	NOT_FOUND_404,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	TEMP_SHOP_ADD_SHOP_NAME,
	USER_VIEW_PROFILE_BY_ID,
} from '../../utils/routes';
import { Stack, Box, Skeleton } from '@mui/material';
import UserMainNavigationBar from '../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import Styles from '../../styles/dashboard/dashboard.module.sass';
import { default as ImageFuture } from 'next/future/image';
import MobileNewMessageSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mobile-new-message.svg';
import MobileMessageSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mobile-message.svg';
import MobileNotificationSVG from '../../public/assets/svgs/mainNavBarIcons/notification.svg';
import MobileNewNotificationSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mobile-new-notification.svg';
import RatingBlackStarSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/rating-black-star.svg';
import MiniArticlesTotalCountSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mini-articles-total-count.svg';
import MiniArticlesVueCountSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mini-articles-vue-count.svg';
import MiniUSDSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mini-usd.svg';
import MyBusinessSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/my-business.svg';
import DisabledMyBusinessSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/disabled-my-business.svg';
import GrayArrowSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/gray-arrow-right.svg';
import DesktopIndexedSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/desktop-indexed-articles.svg';
import DesktopSubscribedSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/desktop-abonnement.svg';
import DesktopArticlesTotalCountSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/desktop-articles-total-count.svg';
import DesktopUSDSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/desktop-usd.svg';
import DesktopMessageSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/desktop-message.svg';
import DesktopOrdersSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/orders.svg';
import DesktopMonCompteSVG from '../../public/assets/svgs/dashboardIcons/mainIcons/mon-compte.svg';
import EmptyMessagesIlluSVG from '../../public/assets/images/dashboard_illu/empty-messages.svg';
import EmptyOrdersIlluSVG from '../../public/assets/images/dashboard_illu/empty-orders.svg';
import CreateShopIlluSVG from '../../public/assets/images/cards_illu/create-shop.svg';
import MobileDashboardMessagesNotifications from '../../components/mobile/navbars/mobileDashboardMessagesNotifications/mobileDashboardMessagesNotifications';
import ShopVerified from '../../components/groupedComponents/shop/get/shopVerified/shopVerified';
import Link from 'next/link';
import { fullMonthItemsList } from '../../utils/rawData';
import CustomFooter from '../../components/layouts/footer/customFooter';
import ActivateYourAccount from '../../components/layouts/callToActionCards/activateYourAccount/activateYourAccount';
import { useRouter } from 'next/router';
import CustomSwipeModal from '../../components/desktop/modals/rightSwipeModal/customSwipeModal';
import { EnterCodePageContent } from '../auth/reset-password/enter-code';
import { SxProps, ThemeProvider } from '@mui/system';
import { getDefaultTheme } from '../../utils/themes';
import OutlineButton from '../../components/htmlElements/buttons/outlineButton/outlineButton';
import { Theme } from '@mui/material/styles/createTheme';
import { accountPostResendActivationAction } from '../../store/actions/account/accountActions';
import { useAppDispatch } from '../../utils/hooks';

type ShopInfoContentType = {
	shop_name: string;
	shop_avatar: string;
	is_subscribed: boolean;
	global_rating: number;
	total_offers_count: number;
	total_offers_vue_count: number;
	total_sells_count: number;
	shop_url: string;
};

export const ShopInfoContent: React.FC<ShopInfoContentType> = (props: ShopInfoContentType) => {
	const {
		is_subscribed,
		shop_avatar,
		shop_name,
		shop_url,
		total_offers_vue_count,
		total_sells_count,
		total_offers_count,
		global_rating,
	} = props;

	return (
		<Stack direction="column" className={Styles.dashboardShopCardStack} spacing={1}>
			<Stack direction="column" justifyContent="center" alignItems="center">
				<Stack direction="column" mb="12px" justifyContent="center" alignItems="center">
					<Box>
						{is_subscribed ? (
							<ShopVerified shop_name={shop_name} avatar={shop_avatar} />
						) : (
							<div className={Styles.dashboardAvatarSubWrapper}>
								{!shop_avatar ? (
									<Skeleton variant="circular" width={98} height={98} />
								) : (
									<ImageFuture
										src={shop_avatar}
										alt={shop_name}
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.dashboardAvatar}
										loading="eager"
										priority={true}
									/>
								)}
							</div>
						)}
					</Box>
					<span className={Styles.dashboardShopName}>{shop_name}</span>
					<Box>
						<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
							<ImageFuture src={RatingBlackStarSVG} alt="" width="13" height="13" sizes="100vw" />
							<span className={Styles.dashboardRatingText}>{global_rating} sur 5</span>
						</Stack>
					</Box>
				</Stack>
				<Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
					<Stack direction="row" spacing={1} alignItems="center">
						<ImageFuture src={MiniArticlesTotalCountSVG} alt="" width="15" height="15" sizes="100vw" />
						<span className={Styles.dashboardValuesCount}>{total_offers_count}</span>
						<span className={Styles.dashboardValuesCount}>articles</span>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<ImageFuture src={MiniArticlesVueCountSVG} alt="" width="15" height="10.5" sizes="100vw" />
						<span className={Styles.dashboardValuesCount}>{total_offers_vue_count}</span>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<ImageFuture src={MiniUSDSVG} alt="" width="9" height="15" sizes="100vw" />
						<span className={Styles.dashboardValuesCount}>{total_sells_count}</span>
					</Stack>
				</Stack>
			</Stack>
			<Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
				<Link passHref href={REAL_SHOP_BY_SHOP_LINK_ROUTE(shop_url)}>
					<a className={Styles.dashboardAnchorLink}>Gérer ma boutique</a>
				</Link>
			</Stack>
		</Stack>
	);
};

type UserInfoContentType = {
	user_id: number;
	first_name: string;
	last_name: string;
	global_rating: number;
	avatar: string;
};

const UserInfoContent: React.FC<UserInfoContentType> = (props: UserInfoContentType) => {
	const { first_name, last_name, global_rating, avatar, user_id } = props;

	return (
		<Stack direction="column" className={Styles.dashboardShopCardStack} spacing={1}>
			<Stack direction="column" justifyContent="center" alignItems="center">
				<Stack direction="column" mb="12px" justifyContent="center" alignItems="center">
					<Box>
						<div className={Styles.dashboardAvatarSubWrapper}>
							<ImageFuture
								src={avatar}
								alt={`${first_name} ${last_name}`}
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.dashboardAvatar}
								loading="eager"
								priority={true}
							/>
						</div>
					</Box>
					<span className={Styles.dashboardShopName}>
						{first_name} {last_name}
					</span>
					<Box>
						<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
							<ImageFuture src={RatingBlackStarSVG} alt="" width="13" height="13" sizes="100vw" />
							<span className={Styles.dashboardRatingText}>{global_rating} sur 5</span>
						</Stack>
					</Box>
				</Stack>
			</Stack>
			<Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
				<Link passHref href={USER_VIEW_PROFILE_BY_ID(user_id)}>
					<a className={Styles.dashboardAnchorLink}>Voir mon profil</a>
				</Link>
			</Stack>
		</Stack>
	);
};

type ShopMyBusinessCardContentType = {
	indexed_articles_count: number;
	slots_available_count: number;
	total_offers_vue_count: number;
	total_vue_month: number;
	total_vue_pourcentage: string;
	total_sells_count: number;
	total_sells_month: number;
	total_sells_pourcentage: string;
	totalVuePourcentageCSS: string;
	totalSellsPourcentageCSS: string;
};

const ShopMyBusinessCardContent: React.FC<ShopMyBusinessCardContentType> = (props: ShopMyBusinessCardContentType) => {
	const {
		indexed_articles_count,
		slots_available_count,
		total_offers_vue_count,
		total_vue_month,
		total_vue_pourcentage,
		total_sells_count,
		total_sells_month,
		total_sells_pourcentage,
		totalVuePourcentageCSS,
		totalSellsPourcentageCSS,
	} = props;

	return (
		<Stack direction="column" spacing={2} className={Styles.dashboardMyBusinessCardStack}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Stack direction="row" spacing="18px" alignItems="center">
					<ImageFuture src={MyBusinessSVG} alt="" width="54" height="54" sizes="100vw" />
					<span className={Styles.dashboardCardIconText}>My business</span>
				</Stack>
				<ImageFuture src={GrayArrowSVG} alt="" width="14" height="14" sizes="100vw" />
			</Stack>
			<Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
				<Link passHref href={DASHBOARD_INDEXED_OFFERS}>
					<a>
						<Stack
							direction="row"
							spacing={1}
							justifyContent="center"
							alignItems="center"
							className={Styles.dashboardIndexedMiniCard}
						>
							<ImageFuture src={DesktopIndexedSVG} alt="" width="40" height="40" sizes="100vw" />
							<Stack direction="column" alignSelf="flex-start">
								<span className={Styles.dashboardMiniCardCounter}>{indexed_articles_count}</span>
								<span className={Styles.dashboardMiniCardSubHeader}>Référencés</span>
							</Stack>
						</Stack>
					</a>
				</Link>
				<Link passHref href={DASHBOARD_SUBSCRIPTION}>
					<a>
						<Stack
							direction="row"
							spacing={1}
							justifyContent="center"
							alignItems="center"
							className={Styles.dashboardSubscribedMiniCard}
						>
							<ImageFuture src={DesktopSubscribedSVG} alt="" width="40" height="40" sizes="100vw" />
							<Stack direction="column">
								<span className={Styles.dashboardMiniCardCounter}>{slots_available_count}</span>
								<span className={Styles.dashboardMiniCardSubHeader}>S&apos;abonner</span>
							</Stack>
						</Stack>
					</a>
				</Link>
			</Stack>
			<Link href={DASHBOARD_AUDIENCES} passHref>
				<a>
					<Stack direction="row" spacing={1} alignItems="center" className={Styles.dashboardVuesMiniCard}>
						<ImageFuture src={DesktopArticlesTotalCountSVG} alt="" width="40" height="40" sizes="100vw" />
						<Stack direction="column" sx={{ width: '100%' }}>
							<span className={Styles.dashboardMiniCardCounter}>{`${total_offers_vue_count} vues`}</span>
							<Stack direction="row" justifyContent="space-between">
								<span className={Styles.dashboardMiniCardSubHeader}>{fullMonthItemsList[total_vue_month]}</span>
								<span className={`${Styles.dashboardMiniCardPourcentage} ${totalVuePourcentageCSS}`}>
									{total_vue_pourcentage}
								</span>
							</Stack>
						</Stack>
					</Stack>
				</a>
			</Link>
			<Link href={DASHBOARD_CHIFFRE_DAFFAIRE} passHref>
				<a>
					<Stack direction="row" spacing={1} alignItems="center" className={Styles.dashboardSellsMiniCard}>
						<ImageFuture src={DesktopUSDSVG} alt="" width="40" height="40" sizes="100vw" />
						<Stack direction="column" sx={{ width: '100%' }}>
							<span className={Styles.dashboardMiniCardCounter}>{total_sells_count} DH</span>
							<Stack direction="row" justifyContent="space-between">
								<span className={Styles.dashboardMiniCardSubHeader}>{fullMonthItemsList[total_sells_month]}</span>
								<span className={`${Styles.dashboardMiniCardPourcentage} ${totalSellsPourcentageCSS}`}>
									{total_sells_pourcentage}
								</span>
							</Stack>
						</Stack>
					</Stack>
				</a>
			</Link>
		</Stack>
	);
};

type UserMyBusinessCardContentType = {
	rootSX: SxProps<Theme>;
};

const UserMyBusinessCardContent: React.FC<UserMyBusinessCardContentType> = (props: UserMyBusinessCardContentType) => {
	const router = useRouter();
	return (
		<Stack direction="column" spacing={2} className={Styles.dashboardMyBusinessCardStack} sx={props.rootSX}>
			<Stack direction="row" spacing="18px" alignItems="center">
				<ImageFuture src={DisabledMyBusinessSVG} alt="" width="54" height="54" sizes="100vw" />
				<span className={Styles.dashboardCardIconText}>My business</span>
			</Stack>
			<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
				<ImageFuture src={CreateShopIlluSVG} alt="" width="137" height="127" sizes="100vw" />
				<Stack direction="column" justifyContent="center" alignItems="center">
					<span className={Styles.dashboardShopName}>Créez votre boutique</span>
					<span className={Styles.dashboardCreateShopSubTitle}>Vous aussi vendez sur Qaryb!</span>
				</Stack>
				<OutlineButton
					buttonText="C'est parti !"
					active={true}
					type="button"
					backgroundColor="#FFFFFF"
					cssClass={Styles.dashboardCreateShopButton}
					onClick={() => router.push(TEMP_SHOP_ADD_SHOP_NAME).then()}
				/>
			</Stack>
		</Stack>
	);
};

type MobileDashboardCardsType = {
	icon: string;
	title: string;
	link: string;
};

const MobileDashboardCards: React.FC<MobileDashboardCardsType> = (props: MobileDashboardCardsType) => {
	const { icon, title, link } = props;
	return (
		<Stack className={Styles.dashboardCardBox} justifyContent="center" sx={{ height: '110px !important' }}>
			<Link href={link} passHref>
				<a>
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Stack direction="row" spacing="18px" alignItems="center">
							<ImageFuture src={icon} alt="" width="54" height="54" sizes="100vw" />
							<span className={Styles.dashboardCardIconText}>{title}</span>
						</Stack>
						<ImageFuture src={GrayArrowSVG} alt="" width="14" height="14" sizes="100vw" />
					</Stack>
				</a>
			</Link>
		</Stack>
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
	const { data, first_name, last_name } = props.pageProps;
	const dispatch = useAppDispatch();
	const [mobileMessagesIconState, setMobileMessagesIconState] = useState<string>(MobileMessageSVG);
	const [mobileNotificationsIconState, setMobileNotificationsIconState] = useState<string>(MobileNotificationSVG);
	const [showActivateNowModal, setShowActivateNowModal] = useState<boolean>(false);

	const {
		has_messages,
		has_notifications,
		is_subscribed,
		shop_name,
		shop_avatar,
		global_rating,
		email,
		has_shop,
		indexed_articles_count,
		has_orders,
		is_creator,
		is_verified,
		shop_url,
		slots_available_count,
		total_offers_count,
		total_offers_vue_count,
		total_sells_count,
		total_sells_pourcentage,
		total_sells_month,
		total_vue_month,
		total_vue_pourcentage,
		avatar,
		pk,
	} = data;

	const [totalSellsPourcentageCSS, setTotalSellsPourcentageCSS] = useState<string>(Styles.dashboardNeutralePourcentage);
	const [totalVuePourcentageCSS, setTotalVuePourcentageCSS] = useState<string>(Styles.dashboardNeutralePourcentage);

	useEffect(() => {
		if (has_messages) {
			setMobileMessagesIconState(MobileNewMessageSVG);
		}
		if (has_notifications) {
			setMobileNotificationsIconState(MobileNewNotificationSVG);
		}
		if (total_vue_pourcentage.startsWith('+')) {
			setTotalVuePourcentageCSS(Styles.dashboardPositivePourcentage);
		} else if (total_vue_pourcentage.startsWith('-')) {
			setTotalVuePourcentageCSS(Styles.dashboardNegativePourcentage);
		}

		if (total_sells_pourcentage.startsWith('+')) {
			setTotalSellsPourcentageCSS(Styles.dashboardPositivePourcentage);
		} else if (total_sells_pourcentage.startsWith('-')) {
			setTotalSellsPourcentageCSS(Styles.dashboardNegativePourcentage);
		}
	}, [has_messages, has_notifications, total_sells_pourcentage, total_vue_pourcentage]);

	return (
		<ThemeProvider theme={getDefaultTheme()}>
			<Stack direction="column">
				<UserMainNavigationBar />
				{/* TODO - Altroo : apply case has messages - has notifications */}
				<MobileDashboardMessagesNotifications
					// messageIcon={mobileMessagesIconState}
					// notificationIcon={mobileNotificationsIconState}
					messageIcon={MobileMessageSVG}
					notificationIcon={MobileNotificationSVG}
				/>
				<main className={`${Styles.dashboardIndexMain} ${Styles.fixMobile}`}>
					<Stack direction="row" spacing="24px" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
						<Stack direction="column" spacing="18px">
							{has_shop ? (
								<ShopInfoContent
									total_sells_count={total_sells_count}
									total_offers_vue_count={total_offers_vue_count}
									shop_name={shop_name}
									is_subscribed={is_subscribed}
									shop_avatar={shop_avatar}
									shop_url={shop_url}
									global_rating={global_rating}
									total_offers_count={total_offers_count}
								/>
							) : (
								<UserInfoContent
									first_name={first_name}
									last_name={last_name}
									global_rating={global_rating}
									avatar={avatar}
									user_id={pk}
								/>
							)}
							{/* second column card */}
							{has_shop ? (
								<ShopMyBusinessCardContent
									total_offers_vue_count={total_offers_vue_count}
									total_sells_count={total_sells_count}
									indexed_articles_count={indexed_articles_count}
									slots_available_count={slots_available_count}
									total_sells_pourcentage={total_sells_pourcentage}
									total_vue_month={total_vue_month}
									total_vue_pourcentage={total_vue_pourcentage}
									totalVuePourcentageCSS={totalVuePourcentageCSS}
									total_sells_month={total_sells_month}
									totalSellsPourcentageCSS={totalSellsPourcentageCSS}
								/>
							) : (
								<UserMyBusinessCardContent rootSX={{ width: '379px' }} />
							)}
							<Stack className={Styles.dashboardCardBox} justifyContent="center" sx={{ height: '110px !important' }}>
								<Link href={DASHBOARD_EDIT_PROFILE} passHref>
									<a>
										<Stack direction="row" justifyContent="space-between" alignItems="center">
											<Stack direction="row" spacing="18px" alignItems="center">
												<ImageFuture src={DesktopMonCompteSVG} alt="" width="54" height="54" sizes="100vw" />
												<span className={Styles.dashboardCardIconText}>Mon compte</span>
											</Stack>
											<ImageFuture src={GrayArrowSVG} alt="" width="14" height="14" sizes="100vw" />
										</Stack>
									</a>
								</Link>
							</Stack>
						</Stack>
						{/* second row card on first column */}
						<Stack direction="column" spacing="24px" className={Styles.maxWidth}>
							{!is_verified && (
								<ActivateYourAccount
									onClick={() => {
										setShowActivateNowModal(true);
										dispatch(accountPostResendActivationAction(email));
									}}
								/>
							)}
							<Stack
								direction="row"
								spacing={2}
								justifyContent="space-between"
								className={`${Styles.maxWidth} ${Styles.maxHeight}`}
							>
								<Box className={Styles.dashboardSizedBox}>
									<Stack direction="column" spacing="12px" className={Styles.maxHeight}>
										<Stack direction="row" spacing="18px" alignItems="center">
											<ImageFuture src={DesktopMessageSVG} alt="" width="54" height="54" sizes="100vw" />
											<span className={Styles.dashboardCardIconText}>Messages</span>
										</Stack>
										<Stack
											direction="column"
											spacing="12px"
											className={Styles.maxHeight}
											justifyContent="center"
											textAlign="center"
										>
											{/* TODO - Altroo : apply case has messages */}
											<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
												<ImageFuture src={EmptyMessagesIlluSVG} alt="" width="123" height="83" sizes="100vw" />
											</Box>
											<span className={Styles.dashboardNoContentHeader}>Aucun message</span>
											<span className={Styles.dashboardNoContentText}>
												Lorsque quelqu&apos;un vous envoie un
												<br /> message, il apparaît ici
											</span>
										</Stack>
									</Stack>
								</Box>
								<Box className={Styles.dashboardSizedBox}>
									<Stack direction="column" spacing="12px" className={Styles.maxHeight}>
										<Stack direction="row" spacing="18px" alignItems="center">
											<ImageFuture src={DesktopOrdersSVG} alt="" width="54" height="54" sizes="100vw" />
											<span className={Styles.dashboardCardIconText}>Mes commandes</span>
										</Stack>
										<Stack
											direction="column"
											spacing="12px"
											className={Styles.maxHeight}
											justifyContent="center"
											textAlign="center"
										>
											{/* TODO - Altroo : apply case has orders */}
											<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
												<ImageFuture src={EmptyOrdersIlluSVG} alt="" width="123" height="83" sizes="100vw" />
											</Box>
											<span className={Styles.dashboardNoContentHeader}>Aucune commande</span>
											<span className={Styles.dashboardNoContentText}>
												C&apos;est ici qu&apos;apparaîtront vos futurs
												<br /> commandes
											</span>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Stack>
					</Stack>
					<Stack className={Styles.mobileOnly}>
						<Stack direction="column" spacing="12px">
							{has_shop ? (
								<ShopInfoContent
									total_sells_count={total_sells_count}
									total_offers_vue_count={total_offers_vue_count}
									shop_name={shop_name}
									is_subscribed={is_subscribed}
									shop_avatar={shop_avatar}
									shop_url={shop_url}
									global_rating={global_rating}
									total_offers_count={total_offers_count}
								/>
							) : (
								<UserInfoContent
									first_name={first_name}
									last_name={last_name}
									global_rating={global_rating}
									avatar={avatar}
									user_id={pk}
								/>
							)}
							{!is_verified && (
								<ActivateYourAccount
									onClick={() => {
										setShowActivateNowModal(true);
										dispatch(accountPostResendActivationAction(email));
									}}
								/>
							)}
							{has_shop ? (
								<MobileDashboardCards icon={MyBusinessSVG} link={DASHBOARD_SUBSCRIPTION} title="My business" />
							) : (
								<UserMyBusinessCardContent rootSX={{ width: '100%' }} />
							)}
							<MobileDashboardCards icon={DesktopOrdersSVG} link="/" title="Mes commandes" />
							<MobileDashboardCards icon={DesktopMonCompteSVG} link={DASHBOARD_EDIT_PROFILE} title="Mon compte" />
						</Stack>
					</Stack>
				</main>
				<div className={Styles.desktopOnly}>
					{showActivateNowModal && (
						<CustomSwipeModal
							keepMounted={false}
							direction="up"
							fullScreen={false}
							open={showActivateNowModal}
							handleClose={() => setShowActivateNowModal(false)}
							cssClasse={Styles.dashboardActivationModal}
							showCloseIcon={true}
						>
							<EnterCodePageContent
								email={email}
								cssClass={Styles.enterCodePageContentRoot}
								whichCode="ACCOUNT_VERIFICATION"
							/>
						</CustomSwipeModal>
					)}
				</div>
				<CustomFooter />
			</Stack>
		</ThemeProvider>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// redirect if user already logged in
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
	const appToken = getServerSideCookieTokens(context);

	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetDashboardResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
						first_name: appToken.initStateToken.user.first_name,
						last_name: appToken.initStateToken.user.last_name,
					},
				};
			}
		} else {
			// redirect to login page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
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
