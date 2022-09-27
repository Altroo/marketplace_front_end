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
import { OfferGetMyOffersProductInterface, OfferGetMyOffersServiceInterface } from '../../../types/offer/offerTypes';
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
import { paginationInitial } from "../../../store/slices/_init/_initSlice";

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
	const router = useRouter();
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
	// const bio = data.bio as string;
	// const opening_days = data.opening_days as OpeningDaysArray;
	// const morning_hour_from = data.morning_hour_from;
	// const morning_hour_to = data.morning_hour_to;
	// const afternoon_hour_from = data.afternoon_hour_from;
	// const afternoon_hour_to = data.afternoon_hour_to;
	const contact_phone_code = data.contact_phone_code;
	const contact_phone = data.contact_phone;
	const contact_whatsapp_code = data.contact_whatsapp_code;
	const contact_whatsapp = data.contact_whatsapp;
	const contact_mode = data.contact_mode;
	// const phone = data.phone;
	// const contact_email = data.contact_email;
	// const website_link = data.website_link;
	// const facebook_link = data.facebook_link;
	// const twitter_link = data.twitter_link;
	// const instagram_link = data.instagram_link;
	// const whatsapp = data.whatsapp;
	// const zone_by = data.zone_by;
	// const longitude = data.longitude;
	// const latitude = data.latitude;
	// const address_name = data.address_name;
	// const km_radius = data.km_radius;
	// const creator = data.creator;

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
							<ShopInfoTabs
								color={bg_color_code}
								borderColor={bg_color_code}
								shopContent={<ShopTabContent activeColor={bg_color_code} shop_pk={pk} />}
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
	// const { pk } = data;
	// const dispatch = useAppDispatch();
	// const router = useRouter();
	// const page = router.query?.page;
	// const sort_by = router.query?.sort_by;
	// const [loading, setLoading] = useState<boolean>(false);
	// const [loadingMore, setLoadingMore] = useState<boolean>(false);
	// const [offersData, setOffersData] = useState<
	// 	PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>
	// >(paginationInitial);
	// const [firstPageDispatched, setFirstPageDispatched] = useState<boolean>(false);
	// const [nextPageDispatched, setNextPageDispatched] = useState<boolean>(false);
	//
	// const dispatchLoadMore = useCallback(
	// 	(action: { type: string; pk: number; next_page: string; sort_by: string | undefined }) => {
	// 		dispatch({
	// 			...action,
	// 			onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
	// 				if (!error && !cancelled && data) {
	// 					setOffersData((prevState) => {
	// 						if (prevState !== null) {
	// 							// merging previous page with new page.
	// 							console.log('Previous data : ');
	// 							console.log(prevState);
	// 							console.log('New data : ');
	// 							console.log(data);
	// 							const newResult = [...prevState.results, ...data.results];
	// 							console.log('After merge');
	// 							console.log(newResult);
	// 							return {
	// 								results: newResult,
	// 								next: data.next,
	// 								previous: data.previous,
	// 								count: data.count,
	// 							};
	// 						} else {
	// 							// no previous page, adding the new requested page only.
	// 							return data;
	// 						}
	// 					});
	// 				}
	// 				// setLoading(false);
	// 			},
	// 		});
	// 	},
	// 	[dispatch],
	// );

	// useEffect(() => {
	// 	setLoading(true);
	// 	const { results, previous, next, count } = offersData;
	// 	if (!firstPageDispatched) {
	// 		// dispatch first page on page init with price filter default décroissant
	// 		const action = offerGetOffersByShopIDAction(pk, '1', '-price');
	// 		dispatchLoadMore(action);
	// 		setFirstPageDispatched(true);
	// 	}
	// 	// on first page
	// 	if (!previous && !page) {
	// 		console.log('on first page');
	// 		console.log(previous);
	// 		// INFINITE LOOP
	// 		// checking if sort param exist & not page param
	// 		if (sort_by) {
	// 			if (results) {
	// 				const localOffers = results;
	// 				if (sort_by === '-price') {
	// 					localOffers.sort((a, b) => b.price - a.price);
	// 				} else if (sort_by === 'price') {
	// 					localOffers.sort((a, b) => a.price - b.price);
	// 				}
	// 				const sortedResult = {
	// 					results: localOffers,
	// 					next: next,
	// 					previous: previous,
	// 					count: count,
	// 				};
	// 				setOffersData(sortedResult);
	// 			}
	// 		}
	// 		setLoading(false);
	// 	} else {
	// 		// second page and more
	// 		// let action = offerGetOffersByShopIDAction(pk, '1');
	// 		// INFINITE LOOP
	// 		// if next page number exist
	// 		if (next && !nextPageDispatched) {
	// 			const nextPage = getBackendNextPageNumber(next);
	// 			console.log('INFINITE LOOP');
	// 			console.log(page);
	// 			console.log(nextPage);
	// 			if (page && nextPage) {
	// 				// if (parseInt(page as string) === parseInt(nextPage)) {
	// 				if (sort_by) {
	// 					const action = offerGetOffersByShopIDAction(pk, page as string, sort_by as string);
	// 					dispatchLoadMore(action);
	// 				} else {
	// 					const action = offerGetOffersByShopIDAction(pk, page as string);
	// 					dispatchLoadMore(action);
	// 				}
	// 				// }
	// 			}
	// 			// setNextPageDispatched(true);
	// 		}
	// 		// dispatchLoadMore(action);
	// 	}
	// 	// setLoading(false);
	//
	// 	return () => {
	// 		setNextPageDispatched(false);
	// 		setLoading(false);
	// 	}
	// }, [dispatchLoadMore, firstPageDispatched, nextPageDispatched, offersData, page, pk, sort_by]);

	// useEffect(() => {
	// 	setLoading(true);
	// 	let action = offerGetOffersByShopIDAction(pk, '1');
	// 	if (page && sort_by) {
	// 		action = offerGetOffersByShopIDAction(pk, page as string, sort_by as string);
	// 	}
	// 	if (page && !sort_by) {
	// 		action = offerGetOffersByShopIDAction(pk, page as string);
	// 	}
	// 	// Todo check if !page dispatch local sort action
	// 	// Todo else dispatch server sort action.
	// 	if (sort_by && !page) {
	// 		// action = offerGetOffersByShopIDAction(pk, '1', sort_by as string);
	// 		if (offersData.results) {
	// 			const localOffers = offersData.results;
	// 			localOffers.sort((a, b) => Number(b.price) - Number(a.price));
	// 			const sortedResult = {
	// 				results: localOffers,
	// 				next: offersData.next,
	// 				previous: offersData.previous,
	// 				count: offersData.count,
	// 			};
	// 			setOffersData(sortedResult);
	// 		}
	// 	}
	// 	dispatch({
	// 		...action,
	// 		onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
	// 			if (!error && !cancelled && data) {
	// 				setOffersData((prevState) => {
	// 					if (prevState !== null) {
	// 						// merging previous page with new page.
	// 						const newResult = [...prevState.results, ...data.results];
	// 						return {
	// 							results: newResult,
	// 							next: data.next,
	// 							previous: data.previous,
	// 							count: data.count,
	// 						};
	// 					} else {
	// 						// no previous page, adding the new requested page only.
	// 						return data;
	// 					}
	// 				});
	// 			}
	// 			setLoading(false);
	// 		},
	// 	});
	// }, [dispatch, offersData.count, offersData.next, offersData.previous, offersData.results, page, pk, sort_by]);

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

	// const router = useRouter();
	// // const dispatch = useAppDispatch();
	// const avatarInputRef = useRef<HTMLInputElement>(null);
	// const offerApi = useAppSelector(getOfferOfferApi);

	// const shopName = data.shop_name;
	// let bio = `${shopName} n'a pas encore renseigné sa bio`;
	// console.log(data.bio);
	// if (data.bio !== null) {
	// 	if (data.bio.length > 0) {
	// 		console.log(data.bio?.length);
	//
	// 	}
	// }
	// const bio = data.bio;
	// const opening_days = data.opening_days;
	// const phone = data.phone;
	// const contact_email = data.contact_email;
	// const website_link = data.website_link;
	// const facebook_link = data.facebook_link;
	// const twitter_link = data.twitter_link;
	// const instagram_link = data.instagram_link;
	// const whatsapp = data.whatsapp;
	// const address_name = data.address_name;
	//
	// const shopAvatar = data.avatar as string;
	// const shopColorCode = data.color_code as string;
	// const shopBgColorCode = data.bg_color_code as string;
	// const shopFontName = data.font_name as ShopFontNameType;
	// const shopBorder = data.border as string;
	// const shopIconColor = data.icon_color;
	// const shopPhoneContactCode = data.contact_phone_code;
	// const shopPhoneContact = data.contact_phone;
	// const shopWhatsappContactCode = data.contact_whatsapp_code;
	// const shopWhatsappContact = data.contact_whatsapp;
	// const shopContactMode = data.contact_mode;
	// avatar preview

	// const [preview, setPreview] = useState<string | null>(shopAvatar);
	// // colors
	// const [colorCode, setColorCode] = useState<string>(shopColorCode);
	// const [bgColorCode, setBgColorCode] = useState<string>(shopBgColorCode);
	// // border
	// const [border, setborder] = useState<string>(shopBorder);
	// // font
	// const [fontName, setFontName] = useState<ShopFontNameType>(shopFontName);
	// // Gray Message Icon
	// const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	// const [contactIcon, setContactIcon] = useState<string>(ContactIconBlackSVG);
	// // Promo states
	// const [promoCheck, setPromoCheck] = useState(false);
	// // For whom states
	// const [enfantCheck, setEnfantCheck] = useState(false);
	// const [femmeCheck, setFemmeCheck] = useState(false);
	// const [hommeCheck, setHommeCheck] = useState(false);
	// // modals
	// const [openContacterModal, setContacterModalOpen] = useState<boolean>(false);
	// const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
	// const [openColorModal, setOpenColorModal] = useState<boolean>(false);
	// const [openFontModal, setOpenFontModal] = useState<boolean>(false);
	//
	// let phoneContactMode = true;
	// let whatsappContactMode = false;
	// if (shopContactMode === 'W') {
	// 	phoneContactMode = false;
	// 	whatsappContactMode = true;
	// }
	//
	// const [phoneSwitch, setPhoneSwitch] = useState(phoneContactMode);
	// const [wtspSwitch, setWtspSwitch] = useState(whatsappContactMode);
	//
	// let phoneContactCodeInitial = '+212';
	// if (shopPhoneContactCode) {
	// 	phoneContactCodeInitial = shopPhoneContactCode;
	// }
	//
	// let phoneContactInitial = '';
	// if (shopPhoneContact) {
	// 	phoneContactInitial = shopPhoneContact;
	// }
	//
	// let whatsappContactCodeInitial = '+212';
	// if (shopWhatsappContactCode) {
	// 	whatsappContactCodeInitial = shopWhatsappContactCode;
	// }
	//
	// let whatsappContactInitial = '';
	// if (shopWhatsappContact) {
	// 	whatsappContactInitial = shopWhatsappContact;
	// }
	//
	// const [phoneCode, setPhoneCode] = useState<string>(phoneContactCodeInitial);
	// const [whatsappCode, setwhatsappCode] = useState<string>(whatsappContactCodeInitial);
	// const [whatsappValue, setwhatsappValue] = useState<string>(whatsappContactInitial);
	// const [phoneValue, setPhoneValue] = useState<string>(phoneContactInitial);
	//
	// const handleContactModalOpen = () => {
	// 	setContacterModalOpen(true);
	// };
	//
	// const handleContactModalClose = () => {
	// 	setContacterModalOpen(false);
	// };
	//
	// const setWhatsappSwitchHandler = (value: boolean) => {
	// 	setWtspSwitch(value);
	// 	setPhoneSwitch(!value);
	// };
	//
	// const setPhoneSwitchHandler = (value: boolean) => {
	// 	setPhoneSwitch(value);
	// 	setWtspSwitch(!value);
	// };
	//
	// // categories action
	// const chipCategoriesAction: chipActionsType = [
	// 	{
	// 		buttonText: 'Bien-être',
	// 		selected: false,
	// 		border: border,
	// 		textColor: colorCode,
	// 		backgroundColor: bgColorCode,
	// 		onClick: () => {
	// 			return;
	// 		},
	// 	},
	// 	{
	// 		buttonText: 'Service',
	// 		selected: false,
	// 		border: border,
	// 		textColor: colorCode,
	// 		backgroundColor: bgColorCode,
	// 		onClick: () => {
	// 			return;
	// 		},
	// 	},
	// 	{
	// 		buttonText: 'Sport',
	// 		selected: false,
	// 		border: border,
	// 		textColor: colorCode,
	// 		backgroundColor: bgColorCode,
	// 		onClick: () => {
	// 			return;
	// 		},
	// 	},
	// ];
	//
	// // promo check action
	// const promoCheckAction: switchActionType = {
	// 	activeColor: bgColorCode,
	// 	checked: promoCheck,
	// 	onChange: setPromoCheck,
	// };
	//
	// // for whom action
	// const checkBoxesForWhomAction: Array<checkBoxesForWhomActionType> = [
	// 	{
	// 		text: 'Enfant',
	// 		checked: enfantCheck,
	// 		active: true,
	// 		onChange: setEnfantCheck,
	// 		activeColor: bgColorCode,
	// 	},
	// 	{
	// 		text: 'Femme',
	// 		checked: femmeCheck,
	// 		active: true,
	// 		onChange: setFemmeCheck,
	// 		activeColor: bgColorCode,
	// 	},
	// 	{
	// 		text: 'Homme',
	// 		checked: hommeCheck,
	// 		active: true,
	// 		onChange: setHommeCheck,
	// 		activeColor: bgColorCode,
	// 	},
	// ];
	//
	// // contacter action
	// const contacterAction: Array<contacterPhoneInputType> = [
	// 	{
	// 		checked: phoneSwitch,
	// 		setStateHandler: setPhoneSwitchHandler,
	// 		label: 'Par téléphone',
	// 		backgroundColor: bgColorCode,
	// 		icon: PhoneSVG,
	// 		code: phoneCode,
	// 		setCode: setPhoneCode,
	// 		value: phoneValue,
	// 		setValue: setPhoneValue,
	// 	},
	// 	{
	// 		checked: wtspSwitch,
	// 		setStateHandler: setWhatsappSwitchHandler,
	// 		label: 'Par WhatsApp',
	// 		backgroundColor: bgColorCode,
	// 		icon: WtspSVG,
	// 		code: whatsappCode,
	// 		setCode: setwhatsappCode,
	// 		value: whatsappValue,
	// 		setValue: setwhatsappValue,
	// 	},
	// ];
	//
	// // opens hidden avatar input
	// const avatarInputOnClickHandler = () => {
	// 	// e.preventDefault();
	// 	if (!avatarInputRef.current) {
	// 		return;
	// 	}
	// 	avatarInputRef.current.click();
	// };
	//
	// // drop down menu actions
	// const dropDownActions: DropDownActionType = [
	// 	{
	// 		icon: InfoIconSVG,
	// 		text: 'Mes infos',
	// 		onClick: setOpenInfoModal,
	// 	},
	// 	{
	// 		icon: AvatarIconSVG,
	// 		text: 'Photo de profil',
	// 		onClick: avatarInputOnClickHandler,
	// 	},
	// 	{
	// 		icon: ColorIconSVG,
	// 		text: 'Couleur de la boutique',
	// 		onClick: setOpenColorModal,
	// 	},
	// 	{
	// 		icon: FontIconSVG,
	// 		text: 'Police du titre',
	// 		onClick: setOpenFontModal,
	// 	},
	// ];
	//
	// // check horaire added
	// let horaireAdded = false;
	// if (opening_days) {
	// 	if (opening_days.length > 0) {
	// 		horaireAdded = true;
	// 	}
	// }
	//
	// // check coordonées added
	// let coordoneesAdded = false;
	// if (phone || twitter_link || website_link || instagram_link || facebook_link || whatsapp || contact_email) {
	// 	coordoneesAdded = true;
	// }
	//
	// const [openEditShopNameModal, setOpenEditShopNameModal] = useState<boolean>(false);
	// const [openEditBioModal, setOpenEditBioModal] = useState<boolean>(false);
	// const [openEditHoraireModal, setOpenEditHoraireModal] = useState<boolean>(false);
	// const [openEditCoordoneeModal, setOpenEditCoordoneeModal] = useState<boolean>(false);
	// const [openEditAdressModal, setOpenEditAdressModal] = useState<boolean>(false);
	//
	// // Infos stack actions
	// const infosStackActions: Array<addMyInfosStackType> = [
	// 	{
	// 		title: 'Nom',
	// 		content: shopName,
	// 		added: !!shopName,
	// 		openEditModal: openEditShopNameModal,
	// 		setOpenEditModal: setOpenEditShopNameModal,
	// 	},
	// 	{
	// 		title: 'Bio',
	// 		content: bio,
	// 		added: !!bio,
	// 		openEditModal: openEditBioModal,
	// 		setOpenEditModal: setOpenEditBioModal,
	// 	},
	// 	{
	// 		title: 'Horaire',
	// 		added: horaireAdded,
	// 		openEditModal: openEditHoraireModal,
	// 		setOpenEditModal: setOpenEditHoraireModal,
	// 	},
	// 	{
	// 		title: 'Coordonées',
	// 		added: coordoneesAdded,
	// 		openEditModal: openEditCoordoneeModal,
	// 		setOpenEditModal: setOpenEditCoordoneeModal,
	// 	},
	// 	{
	// 		title: 'Adresse',
	// 		added: !!address_name,
	// 		openEditModal: openEditAdressModal,
	// 		setOpenEditModal: setOpenEditAdressModal,
	// 	},
	// ];
	//
	// const userOffersList = useAppSelector(getMyOffersList);
	// const [hideAsideNav, setHideAsideNav] = useState<boolean>(userOffersList.length > 0);
	// const [userOffersFetched, setUserOffersFetched] = useState<boolean>(userOffersList.length > 0);
	//
	// useEffect(() => {
	// 	if (!userOffersFetched) {
	// 		dispatch(offerGetMyOffersFirstPageAction());
	// 	}
	// 	if (userOffersList) {
	// 		setHideAsideNav(false);
	// 	}
	// 	// avatar
	// 	if (shopAvatar) {
	// 		setPreview(shopAvatar);
	// 	}
	// 	// color code
	// 	if (shopBgColorCode) {
	// 		setBgColorCode(shopBgColorCode);
	// 	}
	// 	// bg color code
	// 	if (shopColorCode) {
	// 		setColorCode(shopColorCode);
	// 	}
	// 	// border
	// 	if (shopBorder) {
	// 		setborder(shopBorder);
	// 	}
	// 	// icon color
	// 	if (shopIconColor === 'white') {
	// 		setMessageIcon(MessageIconWhiteSVG);
	// 		setContactIcon(ContactIconWhiteSVG);
	// 	} else if (shopIconColor === 'black') {
	// 		setMessageIcon(MessageIconBlackSVG);
	// 		setContactIcon(ContactIconBlackSVG);
	// 	}
	// 	if (shopFontName) {
	// 		setFontName(shopFontName);
	// 	}
	// 	// set phone & whatsapp value
	// 	if (shopPhoneContact) {
	// 		setPhoneValue(shopPhoneContact);
	// 	}
	// 	if (shopWhatsappContact) {
	// 		setwhatsappValue(shopWhatsappContact);
	// 	}
	// 	if (shopWhatsappContactCode) {
	// 		setwhatsappCode(shopWhatsappContactCode);
	// 	}
	// 	if (shopPhoneContactCode) {
	// 		setPhoneCode(shopPhoneContactCode);
	// 	}
	// 	if (shopContactMode) {
	// 		if (shopContactMode === 'W') {
	// 			setWhatsappSwitchHandler(true);
	// 		} else if (shopContactMode === 'P') {
	// 			setPhoneSwitchHandler(true);
	// 		}
	// 	}
	// 	return () => {
	// 		if (offerApi.fetchPromiseStatus === 'RESOLVED') {
	// 			setUserOffersFetched(true);
	// 		}
	// 		if (userOffersList) {
	// 			setHideAsideNav(true);
	// 		}
	// 	};
	// }, [
	// 	dispatch,
	// 	offerApi.fetchPromiseStatus,
	// 	shopAvatar,
	// 	shopBgColorCode,
	// 	shopBorder,
	// 	shopColorCode,
	// 	shopContactMode,
	// 	shopFontName,
	// 	shopIconColor,
	// 	shopPhoneContact,
	// 	shopPhoneContactCode,
	// 	shopWhatsappContact,
	// 	shopWhatsappContactCode,
	// 	userOffersFetched,
	// 	userOffersList,
	// ]);
	//
	// // save phone contact modal button
	// const contacterSaveHandler = () => {
	// 	if (phoneSwitch) {
	// 		if (phoneCode) {
	// 			if (!phoneValue.match(/[^0-9]/)) {
	// 				dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'P'));
	// 				setContacterModalOpen(false);
	// 			}
	// 		}
	// 		// wtsp switch active => validate inputs & save
	// 	} else if (wtspSwitch) {
	// 		if (whatsappCode) {
	// 			if (!whatsappValue.match(/[^0-9]/)) {
	// 				dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'W'));
	// 				setContacterModalOpen(false);
	// 			}
	// 		}
	// 	}
	// };
	//
	// // duplicated
	// const whiteTextColors = ['#FF5D6B', '#0274D7', '#8669FB', '#878E88', '#0D070B'];
	// const whiteText = '#FFFFFF';
	// const blackText = '#0D070B';
	// const [iconColor, setIconColor] = useState<IconColorType>('black');
	//
	// const colorClickHandler = (color: string) => {
	// 	// If picked color is white => apply border + white text + black bg
	// 	if (color === whiteText) {
	// 		setBgColorCode(color);
	// 		setColorCode(whiteText);
	// 		setborder('1px solid #0D070B');
	// 		// Else other colors than white.
	// 	} else {
	// 		setBgColorCode(color);
	// 		setborder('0px solid transparent');
	// 	}
	// 	// if picked color fall into those white text colors => apply white text color
	// 	if (whiteTextColors.includes(color)) {
	// 		setColorCode(whiteText);
	// 		setContactIcon(ContactIconWhiteSVG);
	// 		setMessageIcon(MessageIconWhiteSVG);
	// 		setIconColor('white');
	// 		if (color === blackText) {
	// 			setColorCode(whiteText);
	// 		}
	// 		// else apply black text color
	// 	} else {
	// 		setContactIcon(ContactIconBlackSVG);
	// 		setMessageIcon(MessageIconBlackSVG);
	// 		setIconColor('black');
	// 		setColorCode(blackText);
	// 	}
	// 	cookiesPoster('/cookies', { color_code: 1 }).then();
	// };
	//
	// const editColorHandler = (_bgColorCode: string | null, _colorCode: string | null) => {
	// 	if (_colorCode && _bgColorCode) {
	// 		cookiesPoster('/cookies', { border: border }).then(() => {
	// 			cookiesPoster('/cookies', { icon_color: iconColor }).then();
	// 		});
	// 		// _bgColorCode & _colorCode are reversed for this action.
	// 		dispatch(shopPatchColorAction(_colorCode, _bgColorCode, border, iconColor));
	// 		setOpenColorModal(false);
	// 	}
	// };
	//
	// const editFontHandler = (font: ShopFontNameType) => {
	// 	if (font) {
	// 		dispatch(shopPatchFontAction(font));
	// 		setOpenFontModal(false);
	// 	}
	// };
	//
	// const fontPicker = (font: ShopFontNameType) => {
	// 	if (font) {
	// 		setFontName(font);
	// 	}
	// };
	//
	// const avatarInputOnChangeUploadHandler = useMemo(
	// 	() => (e: React.ChangeEvent<HTMLInputElement>) => {
	// 		if (!e.target.files) {
	// 			return;
	// 		}
	// 		const file = e.target.files[0];
	// 		if (file && file.type.substring(0, 5) === 'image') {
	// 			const reader = new FileReader();
	// 			reader.readAsDataURL(file);
	// 			reader.onloadend = () => {
	// 				dispatch(shopPatchAvatarAction(reader.result as string));
	// 			};
	// 		}
	// 	},
	// 	[dispatch],
	// );

	// return (
	// 	<>
	// 		<main className={Styles.main}>
	// 			{/* TOP BAR */}
	// 			<div className={Styles.desktopTopBarWrapper}>
	// 				<DesktopPublishEditNavbar
	// 					dropDownText="Éditer"
	// 					buttonTitle="Publier"
	// 					actions={dropDownActions}
	// 					onClick={() => {
	// 						router.push(AUTH_REGISTER).then();
	// 					}}
	// 					menuID="desktop-edit-menu"
	// 					buttonID="desktop-edit-menu-btn"
	// 				/>
	// 			</div>
	// 			<div className={Styles.mobileTopBarWrapper}>
	// 				<MobilePublishEditNavbar
	// 					actions={dropDownActions}
	// 					onPublish={() => {
	// 						console.log('Clicked');
	// 					}}
	// 					menuID="mobile-edit-menu"
	// 					buttonID="mobile-edit-menu-btn"
	// 				/>
	// 			</div>
	// 			<div className={Styles.pageContent}>
	// 				<div className={Styles.avatarActionsWrapper}>
	// 					<div className={Styles.avatarWrapper}>
	// 						<div>
	// 							<CircularAvatar imageSrc={preview} />
	// 							<input
	// 								type="file"
	// 								className={Styles.hiddenFile}
	// 								ref={avatarInputRef}
	// 								accept="image/*"
	// 								onChange={(e) => avatarInputOnChangeUploadHandler(e)}
	// 							/>
	// 						</div>
	// 						<div className={Styles.shopNameContainer}>
	// 							<h2
	// 								className={Styles.shopName}
	// 								style={{
	// 									fontFamily:
	// 										fontName === 'L'
	// 											? 'Poppins-Light'
	// 											: fontName === 'B'
	// 											? 'Poppins-ExtraBold'
	// 											: fontName === 'S'
	// 											? 'Poppins-SemiBold'
	// 											: 'Poppins',
	// 								}}
	// 							>
	// 								{shopName}
	// 							</h2>
	// 							<div className={Styles.ratingContainer}>
	// 								<Image src={BlackStarSVG} width={20} height={20} alt="" />
	// 								<span>4.2 (2 notes)</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div className={Styles.actionsWrapper}>
	// 						<IconAnchorButton
	// 							buttonText="Message"
	// 							svgIcon={messageIcon}
	// 							backgroundColor={bgColorCode}
	// 							textColor={colorCode}
	// 							border={border}
	// 							onClick={() => {
	// 								console.log('clicked');
	// 							}}
	// 							active={true}
	// 							cssClass={Styles.iconButton}
	// 						/>
	// 						{/* show outline icon button if no phone or whatsapp added yet, else show normal icon button */}
	// 						{(phoneValue || whatsappValue) !== '' ? (
	// 							<IconButton
	// 								buttonText="Contacter"
	// 								svgIcon={contactIcon}
	// 								onClick={handleContactModalOpen}
	// 								backgroundColor={bgColorCode}
	// 								textColor={colorCode}
	// 								border={border}
	// 								cssClass={Styles.iconButton}
	// 							/>
	// 						) : (
	// 							<BorderIconButton
	// 								buttonText="Contacter"
	// 								svgIcon={ContactIconBlueSVG}
	// 								onClick={handleContactModalOpen}
	// 								cssClass={Styles.iconButton}
	// 							/>
	// 						)}
	//
	// 						{/* START right side contact modal */}
	// 						<RightSwipeModal open={openContacterModal} handleClose={handleContactModalClose}>
	// 							<div className={Styles.modalContentWrapper}>
	// 								<div className={Styles.topBar}>
	// 									<Image src={CloseSVG} width={40} height={40} alt="" onClick={handleContactModalClose} />
	// 								</div>
	// 								<HelperDescriptionHeader
	// 									header="Ajouter un moyen de contact"
	// 									description="Choississez comment vos client peuvent vous contacter"
	// 								/>
	// 								{contacterAction.map((action, index) => {
	// 									return (
	// 										<ContacterPhoneInput
	// 											key={index}
	// 											checked={action.checked}
	// 											setStateHandler={action.setStateHandler}
	// 											label={action.label}
	// 											backgroundColor={action.backgroundColor}
	// 											icon={action.icon}
	// 											code={action.code}
	// 											setCode={action.setCode}
	// 											value={action.value}
	// 											setValue={action.setValue}
	// 										/>
	// 									);
	// 								})}
	// 							</div>
	// 							<div className={Styles.actionButtonWrapper}>
	// 								<PrimaryButton
	// 									buttonText="Enregistrer"
	// 									active={true}
	// 									onClick={contacterSaveHandler}
	// 									cssClass={Styles.actionButtonWidth}
	// 								/>
	// 							</div>
	// 						</RightSwipeModal>
	// 						{/* END right side contact modal */}
	// 					</div>
	// 				</div>
	// 				<div>
	// 					<div className={Styles.shopDetailsWrapper}>
	// 						<div className={Styles.shopTabs}>
	// 							<ShopInfoTabs
	// 								shopContent={
	// 									<BoutiqueTabContent
	// 										chipCategoriesAction={chipCategoriesAction}
	// 										promoCheckAction={promoCheckAction}
	// 										checkBoxForWhomAction={checkBoxesForWhomAction}
	// 										activeColor={bgColorCode}
	// 										hidden={hideAsideNav}
	// 									/>
	// 								}
	// 								InfoContent={
	// 									<InfoTabContent
	// 										setOpenInfoModal={setOpenInfoModal}
	// 										openInfoModal={openInfoModal}
	// 										setOpenEditBioModal={setOpenEditBioModal}
	// 										setOpenEditHoraireModal={setOpenEditHoraireModal}
	// 										setOpenEditCoordoneeModal={setOpenEditCoordoneeModal}
	// 										setOpenEditAdressModal={setOpenEditAdressModal}
	// 										backgroundColor={bgColorCode}
	// 									/>
	// 								}
	// 								color={bgColorCode}
	// 								borderColor={bgColorCode}
	// 							/>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			{/* Edit info modal */}
	// 			<RightSwipeModal open={openInfoModal} handleClose={() => setOpenInfoModal(false)}>
	// 				<div className={Styles.modalContentWrapper}>
	// 					<div className={Styles.topBar}>
	// 						<Image src={CloseSVG} width={40} height={40} alt="" onClick={() => setOpenInfoModal(false)} />
	// 					</div>
	// 					<HelperDescriptionHeader header="Ajouter mes infos" />
	// 					<Stack direction="column" spacing={4}>
	// 						{infosStackActions.map((stack, index) => {
	// 							return (
	// 								<AjouterMesInfosStack
	// 									key={index}
	// 									title={stack.title}
	// 									added={stack.added}
	// 									content={stack.content}
	// 									openEditModal={stack.openEditModal}
	// 									setOpenEditModal={stack.setOpenEditModal}
	// 								/>
	// 							);
	// 						})}
	// 					</Stack>
	// 				</div>
	// 			</RightSwipeModal>
	// 			{/* Edit color modal */}
	// 			{openColorModal && (
	// 				<>
	// 					<Backdrop
	// 						sx={{
	// 							color: '#fff',
	// 							zIndex: (theme) => theme.zIndex.drawer + 1,
	// 							backgroundColor: 'rgba(0, 0, 0, 0.1)',
	// 						}}
	// 						open={openColorModal}
	// 						// onClick={() => setOpenColorModal(false)}
	// 					>
	// 						<div className={SharedStyles.desktopContainerModal}>
	// 							{colors.map((color: string, index: number) => {
	// 								return (
	// 									<DesktopColorPicker
	// 										color={color}
	// 										onClick={() => colorClickHandler(color)}
	// 										selectedColor={bgColorCode}
	// 										key={index}
	// 									/>
	// 								);
	// 							})}
	// 						</div>
	// 						<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
	// 							<PrimaryButton
	// 								buttonText="Enregistrer"
	// 								active={colorCode !== undefined && bgColorCode !== undefined}
	// 								onClick={() => editColorHandler(bgColorCode, colorCode)}
	// 							/>
	// 						</div>
	// 						<div>
	// 							<div className={SharedStyles.mobileContainerModal}>
	// 								<Swiper
	// 									pagination={{
	// 										clickable: true,
	// 										enabled: true,
	// 										bulletActiveClass: 'activekBullet',
	// 										clickableClass: 'paginationBullet',
	// 									}}
	// 									modules={[Navigation, Pagination, Lazy]}
	// 									scrollbar={{ enabled: false }}
	// 									className={SharedStyles.mobileSwiper}
	// 								>
	// 									<SwiperSlide className={SharedStyles.swiperSlide}>
	// 										{colors.slice(0, 10).map((color: string, index: number) => {
	// 											return (
	// 												<MobileColorPicker
	// 													color={color}
	// 													onClick={() => colorClickHandler(color)}
	// 													selectedColor={bgColorCode}
	// 													key={index}
	// 												/>
	// 											);
	// 										})}
	// 									</SwiperSlide>
	// 									<SwiperSlide className={SharedStyles.swiperSlide}>
	// 										{colors.slice(10, 20).map((color: string, index: number) => {
	// 											return (
	// 												<MobileColorPicker
	// 													color={color}
	// 													onClick={() => colorClickHandler(color)}
	// 													selectedColor={bgColorCode}
	// 													key={index}
	// 												/>
	// 											);
	// 										})}
	// 									</SwiperSlide>
	// 								</Swiper>
	// 								<div
	// 									className={`${SharedStyles.primaryButtonMobileWrapper} ${SharedStyles.primaryButtonZindexWrapper}`}
	// 								>
	// 									<PrimaryButton
	// 										buttonText="Enregistrer"
	// 										active={colorCode !== undefined && bgColorCode !== undefined}
	// 										onClick={() => editColorHandler(bgColorCode, colorCode)}
	// 									/>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</Backdrop>
	// 				</>
	// 			)}
	// 			{/* Edit font modal */}
	// 			{openFontModal && (
	// 				<>
	// 					<Backdrop
	// 						sx={{
	// 							color: '#fff',
	// 							zIndex: (theme) => theme.zIndex.drawer + 1,
	// 							backgroundColor: 'rgba(0, 0, 0, 0.1)',
	// 						}}
	// 						open={openFontModal}
	// 						// onClick={() => setOpenFontModal(false)}
	// 					>
	// 						<div className={Styles.desktopFontWrapper}>
	// 							{availableFonts.map((font: { name: string; code: ShopFontNameType }, index: number) => {
	// 								return (
	// 									<FontPicker
	// 										key={index}
	// 										pickedFontName={fontName}
	// 										font={font}
	// 										onClick={() => {
	// 											fontPicker(font.code);
	// 										}}
	// 									/>
	// 								);
	// 							})}
	// 						</div>
	// 						<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
	// 							<PrimaryButton
	// 								buttonText="Continuer"
	// 								active={fontName !== undefined}
	// 								onClick={() => editFontHandler(fontName)}
	// 							/>
	// 						</div>
	// 						<div>
	// 							<div className={SharedStyles.mobileFontWrapper}>
	// 								<div className={SharedStyles.mobileFontContainerModal}>
	// 									{availableFonts.map((font: { name: string; code: ShopFontNameType }, index: number) => {
	// 										return (
	// 											<FontPicker
	// 												key={index}
	// 												pickedFontName={fontName}
	// 												font={font}
	// 												onClick={() => {
	// 													fontPicker(font.code);
	// 												}}
	// 											/>
	// 										);
	// 									})}
	// 								</div>
	// 								<div
	// 									className={`${SharedStyles.primaryButtonMobileWrapper} ${SharedStyles.primaryButtonZindexWrapper}`}
	// 								>
	// 									<PrimaryButton
	// 										buttonText="Enregistrer"
	// 										active={fontName !== undefined}
	// 										onClick={() => editFontHandler(fontName)}
	// 									/>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</Backdrop>
	// 				</>
	// 			)}
	// 		</main>
	// 	</>
	// );
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
