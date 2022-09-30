import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../styles/shop/shopIndex.module.sass';
import SharedStyles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import ShopInfoTabs from '../../../components/htmlElements/tabs/tab';
import MessageIconWhiteSVG from '../../../public/assets/svgs/globalIcons/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/globalIcons/message-black.svg';
import ContactIconBlueSVG from '../../../public/assets/svgs/globalIcons/call-blue.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/globalIcons/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/globalIcons/call-black.svg';
import CircularAvatar from '../../../components/htmlElements/images/circularAvatar/circularAvatar';
import {
	OpeningDaysArray,
	ShopFontNameType,
	ShopGetRootTokenResponseType,
	ShopGetRootTokenType,
	ShopZoneByType,
} from '../../../types/shop/shopTypes';
import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import MobilePublishEditNavbar from '../../../components/mobile/navbars/mobilePublishEditNavbar/mobilePublishEditNavbar';
import Image from 'next/image';
import BlackStarSVG from '../../../public/assets/svgs/globalIcons/black-star.svg';
import EditBlueSVG from '../../../public/assets/svgs/globalIcons/edit-blue.svg';
import CloseSVG from '../../../public/assets/svgs/navigationIcons/close.svg';
import PhoneSVG from '../../../public/assets/svgs/globalIcons/contact-phone.svg';
import WtspSVG from '../../../public/assets/svgs/globalIcons/whatsapp-circular.svg';
import BorderIconButton from '../../../components/htmlElements/buttons/borderIconButton/borderIconButton';
import {
	addMyInfosStackType,
	checkBoxesForWhomActionType,
	chipActionsType,
	contacterPhoneInputType,
	DropDownActionType,
	switchActionType,
} from '../../../types/ui/uiTypes';
import InfoTabContent from '../../../components/groupedComponents/temp-shop/edit/info-Tab_Content/InfoTabContent';
import BoutiqueTabContent from '../../../components/groupedComponents/temp-shop/edit/boutique-Tab_Content/boutiqueTabContent';
import HelperDescriptionHeader from '../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import RightSwipeModal from '../../../components/desktop/modals/rightSwipeModal/rightSwipeModal';
import ContacterPhoneInput from '../../../components/groupedComponents/temp-shop/edit/contacterPhoneInput/contacterPhoneInput';
import {
	shopPatchAvatarAction,
	shopPatchColorAction,
	shopPatchFontAction,
	shopPatchPhoneContactAction,
} from '../../../store/actions/shop/shopActions';
import { getMyOffersList, getOfferOfferApi } from '../../../store/selectors';
import IconButton from '../../../components/htmlElements/buttons/iconButton/iconButton';
import InfoIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-info.svg';
import AvatarIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-avatar.svg';
import ColorIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-color.svg';
import FontIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-font.svg';
import { Backdrop, Box, Stack } from '@mui/material';
import AjouterMesInfosStack from '../../../components/groupedComponents/temp-shop/edit/ajouterMesInfos-Stack/ajouterMesInfosStack';
import DesktopColorPicker from '../../../components/desktop/modals/desktopColorPicker/desktopColorPicker';
import { colors } from '../../temp-shop/create/color';
import { cookiesPoster, getApi } from '../../../store/services/_init/_initAPI';
import {
	ApiErrorResponseType,
	IconColorType,
	PaginationResponseType,
	SagaCallBackOnCompleteBoolType,
} from '../../../types/_init/_initTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation, Pagination } from 'swiper';
import MobileColorPicker from '../../../components/mobile/modals/mobileColorPicker/mobileColorPicker';
import { availableFonts } from '../../temp-shop/create/font';
import FontPicker from '../../../components/groupedComponents/temp-shop/create/fontPicker/fontPicker';
import { AUTH_LOGIN, AUTH_REGISTER, NOT_FOUND_404 } from '../../../utils/routes';
import {
	offerGetMyOffersFirstPageAction,
	offerGetOffersByShopIDAction,
} from '../../../store/actions/offer/offerActions';
import {
	defaultInstance,
	getBackendNextPageNumber,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
} from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import {
	OfferGetAvailableShopFiltersType,
	OfferGetMyOffersProductInterface,
	OfferGetMyOffersServiceInterface,
} from '../../../types/offer/offerTypes';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import { default as ImageFuture } from 'next/future/image';
// import ShopTabContent from '../../../components/groupedComponents/shop/get/shopTabContent/shopTabContent';
import ShopTabContent from '../../../components/groupedComponents/shop/get/shopTabContent/shopTabContent';
import ShopInfoTabContent from '../../../components/groupedComponents/shop/get/shopInfoTabContent/shopInfoTabContent';
import ShopNotVerified from '../../../components/groupedComponents/shop/get/shopNotVerified/shopNotVerified';
import ShopVerified from '../../../components/groupedComponents/shop/get/shopVerified/shopVerified';
import ShareSVG from '../../../public/assets/svgs/globalIcons/share-blue.svg';
import { paginationInitial } from '../../../store/slices/_init/_initSlice';
import MobileFilterWhiteSVG from '../../../public/assets/svgs/globalIcons/mobile-filter-white.svg';
import MobileOffersFilterButton from '../../../components/mobile/buttons/mobileOffersFilterButton/mobileOffersFilterButton';
import AccordionFilter from '../../../components/layouts/accordionFilter/accordionFilter';

type ViewShopType = {
	data: ShopGetRootTokenType;
	// offersData: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
};

// ability to edit
const ViewShopAsOwner = (props: ViewShopType) => {
	const { data } = props;
	const pk = data.pk;
	const shop_name = data.shop_name as string;
	const avatar = data.avatar as string;
	const color_code = data.color_code as string;
	const bg_color_code = data.bg_color_code as string;
	const border = data.border as string;
	const icon_color = data.icon_color;
	const font_name = data.font_name as ShopFontNameType;
	const bio = data.bio as string;
	const opening_days = data.opening_days as OpeningDaysArray;
	const morning_hour_from = data.morning_hour_from;
	const morning_hour_to = data.morning_hour_to;
	const afternoon_hour_from = data.afternoon_hour_from;
	const afternoon_hour_to = data.afternoon_hour_to;
	const contact_phone_code = data.contact_phone_code;
	const contact_phone = data.contact_phone;
	const contact_whatsapp_code = data.contact_whatsapp_code;
	const contact_whatsapp = data.contact_whatsapp;
	const contact_mode = data.contact_mode;
	const phone = data.phone;
	const contact_email = data.contact_email;
	const website_link = data.website_link;
	const facebook_link = data.facebook_link;
	const twitter_link = data.twitter_link;
	const instagram_link = data.instagram_link;
	const whatsapp = data.whatsapp;
	const zone_by = data.zone_by;
	const longitude = data.longitude;
	const latitude = data.latitude;
	const address_name = data.address_name;
	const km_radius = data.km_radius;
	const creator = data.creator;

	useEffect(() => {}, []);

	return (
		<>
			{/* Edit shop button */}
			{/*<Stack direction="row" spacing={1} justifyContent="flex-start" alignSelf="flex-start" alignItems="center">*/}
			{/*	<h2*/}
			{/*		className={Styles.shopName}*/}
			{/*		style={{*/}
			{/*			fontFamily:*/}
			{/*				font_name === 'L'*/}
			{/*					? 'Poppins-Light'*/}
			{/*					: font_name === 'B'*/}
			{/*					? 'Poppins-ExtraBold'*/}
			{/*					: font_name === 'S'*/}
			{/*					? 'Poppins-SemiBold'*/}
			{/*					: 'Poppins',*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		{shop_name}*/}
			{/*	</h2>*/}
			{/*	<ImageFuture src={EditBlueSVG} alt="" width="32" height="32" />*/}
			{/*</Stack>*/}
			<h1>OWNER</h1>
		</>
	);
};

export type ShopInfoDataType = {
	shop_name: string;
	bio: string;
	opening_days: OpeningDaysArray;
	morning_hour_from: string | null;
	morning_hour_to: string | null;
	afternoon_hour_from: string | null;
	afternoon_hour_to: string | null;
	phone: string | null;
	contact_email: string | null;
	website_link: string | null;
	facebook_link: string | null;
	twitter_link: string | null;
	instagram_link: string | null;
	whatsapp: string | null;
	zone_by: ShopZoneByType;
	longitude: number | null;
	latitude: number | null;
	address_name: string | null;
	km_radius: number | null;
};

// not able to edit.
const ViewShopAsNotOwner = (props: ViewShopType) => {
	// inits
	const { data } = props;
	// from db
	const pk = data.pk;
	const is_subscribed = data.is_subscribed;
	const shop_name = data.shop_name as string;
	const avatar = data.avatar as string;
	const color_code = data.color_code as string;
	const bg_color_code = data.bg_color_code as string;
	const border = data.border as string;
	const icon_color = data.icon_color;
	const font_name = data.font_name as ShopFontNameType;
	// ShopInfoDataType
	const shopInfoData: ShopInfoDataType = {
		shop_name: shop_name,
		bio: data.bio as string,
		opening_days: data.opening_days as OpeningDaysArray,
		morning_hour_from: data.morning_hour_from,
		morning_hour_to: data.morning_hour_to,
		afternoon_hour_from: data.afternoon_hour_from,
		afternoon_hour_to: data.afternoon_hour_to,
		phone: data.phone,
		contact_email: data.contact_email,
		website_link: data.website_link,
		facebook_link: data.facebook_link,
		twitter_link: data.twitter_link,
		instagram_link: data.instagram_link,
		whatsapp: data.whatsapp,
		zone_by: data.zone_by as ShopZoneByType,
		longitude: data.longitude,
		latitude: data.latitude,
		address_name: data.address_name,
		km_radius: data.km_radius,
	};
	const contact_phone_code = data.contact_phone_code;
	const contact_phone = data.contact_phone;
	const contact_whatsapp_code = data.contact_whatsapp_code;
	const contact_whatsapp = data.contact_whatsapp;
	const contact_mode = data.contact_mode;

	// states
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	const [contactIcon, setContactIcon] = useState<string>(ContactIconBlackSVG);
	const [contacterLink, setContacterLink] = useState<string | undefined>(undefined);

	useEffect(() => {
		// set icon colors
		if (icon_color === 'white') {
			setMessageIcon(MessageIconWhiteSVG);
			setContactIcon(ContactIconWhiteSVG);
		} else if (icon_color === 'black') {
			setMessageIcon(MessageIconBlackSVG);
			setContactIcon(ContactIconBlackSVG);
		}
		// construct contacter link
		if (contact_mode === 'P') {
			setContacterLink('tel:' + contact_phone_code + contact_phone);
		} else if (contact_mode === 'W') {
			setContacterLink('https://web.whatsapp.com/send?phone=' + contact_whatsapp_code + contact_whatsapp);
		}
	}, [contact_mode, contact_phone, contact_phone_code, contact_whatsapp, contact_whatsapp_code, icon_color]);

	const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			{!is_subscribed && <ShopNotVerified />}
			<main className={Styles.main}>
				<Stack
					justifyContent="space-between"
					alignItems="center"
					className={Styles.avatarActionsWrapper}
					direction="row"
				>
					<Stack
						className={Styles.avatarWrapper}
						justifyContent="flex-start"
						alignSelf="flex-start"
						alignItems="center"
						direction="row"
					>
						<Box>
							{is_subscribed ? (
								<ShopVerified shop_name={shop_name} avatar={avatar} />
							) : (
								<div className={Styles.avatarSubWrapper}>
									<ImageFuture
										src={avatar}
										alt={shop_name}
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.avatar}
										loading="eager"
									/>
								</div>
							)}
						</Box>
						<Stack
							className={Styles.shopNameContainer}
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
						>
							<h2
								className={Styles.shopName}
								style={{
									fontFamily:
										font_name === 'L'
											? 'Poppins-Light'
											: font_name === 'B'
											? 'Poppins-ExtraBold'
											: font_name === 'S'
											? 'Poppins-SemiBold'
											: 'Poppins',
								}}
							>
								{shop_name}
							</h2>
							<Stack direction="row" alignItems="center">
								<ImageFuture src={BlackStarSVG} width={20} height={20} alt="" />
								{/* TODO : link rating when backend is done */}
								<span>4.2 (2 notes)</span>
							</Stack>
						</Stack>
					</Stack>
					<Stack direction="row" justifyContent="space-evenly" flexWrap="wrap">
						<IconAnchorButton
							buttonText="Message"
							svgIcon={messageIcon}
							backgroundColor={bg_color_code}
							textColor={color_code}
							border={border}
							nextPage={AUTH_LOGIN}
							active={true}
							cssClass={Styles.iconButton}
						/>
						{contact_mode === ('P' || 'W') ? (
							<IconAnchorButton
								buttonText="Contacter"
								svgIcon={contactIcon}
								backgroundColor={bg_color_code}
								textColor={color_code}
								border={border}
								nextPage={contacterLink}
								active={contacterLink === undefined}
								cssClass={Styles.iconButton}
							/>
						) : null}
					</Stack>
				</Stack>
				<Box>
					<Stack className={Styles.shopDetailsWrapper} direction="column">
						<Stack className={Styles.shopTabs} direction="row">
							<MobileOffersFilterButton
								buttonText="Filtrer"
								svgIcon={MobileFilterWhiteSVG}
								textColor="#FFFFFF"
								backgroundColor="#0D070B"
								onClick={() => setOpenFilterModal(true)}
							/>
							<ShopInfoTabs
								color={bg_color_code}
								borderColor={bg_color_code}
								shopContent={<ShopTabContent
									activeColor={bg_color_code}
									shop_pk={pk}
									openFilterModal={openFilterModal}
									setOpenFilterModal={setOpenFilterModal}
								/>}
								InfoContent={<ShopInfoTabContent shopInfoData={shopInfoData} />}
							/>
						</Stack>
					</Stack>
				</Box>
			</main>
			<CustomFooter />
		</Stack>
	);
};

type Props = {
	pageProps: {
		permission: 'OWNER' | 'NOT_OWNER';
		data: ShopGetRootTokenType;
	};
	children?: React.ReactNode;
};

export type GetOffersSagaCallBackOnCompleteDataType = {
	error: ApiErrorResponseType;
	cancelled: boolean;
	data: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
};

const Index: NextPage<Props> = (props: Props) => {
	const { permission, data } = props.pageProps;
	if (permission === 'OWNER') {
		return (
			<>
				<ViewShopAsOwner data={data} />
			</>
		);
	} else {
		// visiter
		return (
			<>
				<ViewShopAsNotOwner data={data} />
			</>
		);
	}
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const shop_link = context.params?.shop_link;
	const not_found_redirect = {
		redirect: {
			permanent: false,
			destination: NOT_FOUND_404,
		},
	};
	if (shop_link) {
		const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
		const appToken = getServerSideCookieTokens(context);
		try {
			if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
				const instance = isAuthenticatedInstance(appToken.initStateToken);
				const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
				if (response.status === 200) {
					// user is online.
					const shop_url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/${shop_link}/`;
					try {
						const shop_response: ShopGetRootTokenResponseType = await getApi(shop_url, instance);
						if (shop_response.status === 200) {
							if (shop_response.data.user === response.data.pk) {
								return {
									// owner
									props: {
										permission: 'OWNER',
										data: shop_response.data,
									},
								};
							} else {
								// not owner
								return {
									props: {
										permission: 'NOT_OWNER',
										data: shop_response.data,
									},
								};
							}
						} else {
							// shop link not found
							return not_found_redirect;
						}
					} catch (e) {
						return not_found_redirect;
					}
				}
			} else {
				// user not online.
				// return props with read only.
				// else redirect not found.
				const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
				const shop_url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/${shop_link}/`;
				const instance = defaultInstance(base_url);
				try {
					const shop_response: ShopGetRootTokenResponseType = await getApi(shop_url, instance);
					if (shop_response.status === 200) {
						return {
							props: {
								permission: 'NOT_OWNER',
								data: shop_response.data,
							},
						};
					} else {
						return not_found_redirect;
					}
				} catch (e) {
					return not_found_redirect;
				}
			}
		} catch (e) {
			return {
				redirect: not_found_redirect,
			};
		}
		// shop link not found
		return {
			redirect: not_found_redirect,
		};
	}
}

export default Index;
