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
// import EditBlueSVG from "../../../public/assets/svgs/globalIcons/edit-blue.svg";
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
// import InfoIconSVG from "../../../public/assets/svgs/globalIcons/drop-down-info.svg";
import AvatarIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-avatar.svg';
import ColorIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-color.svg';
import FontIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-font.svg';
import ContactIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-contact.svg';
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
import {
	AUTH_LOGIN,
	AUTH_REGISTER,
	NOT_FOUND_404,
	TEMP_SHOP_ADD_SHOP_NAME,
	TEMP_SHOP_EDIT_INDEX,
} from '../../../utils/routes';
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
import ShopNotIndexed from '../../../components/groupedComponents/shop/edit/shopNotIndexed/shopNotIndexed';
import EditShopInfoTabContent from '../../../components/groupedComponents/shop/edit/editShopInfoTabContent/editShopInfoTabContent';
import EditShopTabContent from '../../../components/groupedComponents/shop/edit/editShopTabContent/editShopTabContent';
import EditIconSVG from '../../../public/assets/svgs/globalIcons/blue-pencil.svg';
import DropDownMenu from '../../../components/htmlElements/buttons/dropDownMenu/dropDownMenu';
import IconDropDownMenu from '../../../components/htmlElements/buttons/IconDropDownMenu/iconDropDownMenu';
// import EditShopTabContent from '../../../components/groupedComponents/shop/edit/editShopTabContent/editShopTabContent';

type ViewShopType = {
	data: ShopGetRootTokenType;
	// offersData: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
};

// ability to edit
const ViewShopAsOwner = (props: ViewShopType) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data } = props;
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
	// refs
	const avatarInputRef = useRef<HTMLInputElement>(null);
	// avatar preview
	const [preview, setPreview] = useState<string | null>(avatar);
	// colors
	const [colorCode, setColorCode] = useState<string>(color_code);
	const [bgColorCode, setBgColorCode] = useState<string>(bg_color_code);
	// border
	const [borderState, setborderState] = useState<string>(border);
	// font
	const [fontName, setFontName] = useState<ShopFontNameType>(font_name);
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	const [contactIcon, setContactIcon] = useState<string>(ContactIconBlackSVG);

	let phoneContactMode = true;
	let whatsappContactMode = false;
	if (contact_mode === 'W') {
		phoneContactMode = false;
		whatsappContactMode = true;
	}
	const [phoneSwitch, setPhoneSwitch] = useState(phoneContactMode);
	const [wtspSwitch, setWtspSwitch] = useState(whatsappContactMode);

	let phoneContactCodeInitial = '+212';
	if (contact_phone_code) {
		phoneContactCodeInitial = contact_phone_code;
	}
	let phoneContactInitial = '';
	if (contact_phone) {
		phoneContactInitial = contact_phone;
	}
	let whatsappContactCodeInitial = '+212';
	if (contact_whatsapp_code) {
		whatsappContactCodeInitial = contact_whatsapp_code;
	}
	let whatsappContactInitial = '';
	if (contact_whatsapp) {
		whatsappContactInitial = contact_whatsapp;
	}

	const [phoneCode, setPhoneCode] = useState<string>(phoneContactCodeInitial);
	const [whatsappCode, setwhatsappCode] = useState<string>(whatsappContactCodeInitial);
	const [whatsappValue, setwhatsappValue] = useState<string>(whatsappContactInitial);
	const [phoneValue, setPhoneValue] = useState<string>(phoneContactInitial);

	const handleContactModalOpen = () => {
		setContacterModalOpen(true);
	};
	const handleContactModalClose = () => {
		setContacterModalOpen(false);
	};
	const setWhatsappSwitchHandler = (value: boolean) => {
		setWtspSwitch(value);
		setPhoneSwitch(!value);
	};

	const setPhoneSwitchHandler = (value: boolean) => {
		setPhoneSwitch(value);
		setWtspSwitch(!value);
	};

	// contacter action
	const contacterAction: Array<contacterPhoneInputType> = [
		{
			checked: phoneSwitch,
			setStateHandler: setPhoneSwitchHandler,
			label: 'Par téléphone',
			backgroundColor: bgColorCode,
			icon: PhoneSVG,
			code: phoneCode,
			setCode: setPhoneCode,
			value: phoneValue,
			setValue: setPhoneValue,
		},
		{
			checked: wtspSwitch,
			setStateHandler: setWhatsappSwitchHandler,
			label: 'Par WhatsApp',
			backgroundColor: bgColorCode,
			icon: WtspSVG,
			code: whatsappCode,
			setCode: setwhatsappCode,
			value: whatsappValue,
			setValue: setwhatsappValue,
		},
	];

	// check horaire added
	const {
		opening_days,
		bio,
		address_name,
		phone,
		twitter_link,
		website_link,
		instagram_link,
		facebook_link,
		whatsapp,
		contact_email,
	} = shopInfoData;
	let horaireAdded = false;
	if (opening_days) {
		if (opening_days.length > 0) {
			horaireAdded = true;
		}
	}
	// check coordonées added
	let coordoneesAdded = false;
	if (phone || twitter_link || website_link || instagram_link || facebook_link || whatsapp || contact_email) {
		coordoneesAdded = true;
	}
	const [openEditShopNameModal, setOpenEditShopNameModal] = useState<boolean>(false);
	const [openEditBioModal, setOpenEditBioModal] = useState<boolean>(false);
	const [openEditHoraireModal, setOpenEditHoraireModal] = useState<boolean>(false);
	const [openEditCoordoneeModal, setOpenEditCoordoneeModal] = useState<boolean>(false);
	const [openEditAdressModal, setOpenEditAdressModal] = useState<boolean>(false);

	// Infos stack actions
	const infosStackActions: Array<addMyInfosStackType> = [
		{
			title: 'Nom',
			content: shop_name,
			added: !!shop_name,
			openEditModal: openEditShopNameModal,
			setOpenEditModal: setOpenEditShopNameModal,
		},
		{
			title: 'Bio',
			content: bio,
			added: !!bio,
			openEditModal: openEditBioModal,
			setOpenEditModal: setOpenEditBioModal,
		},
		{
			title: 'Horaire',
			added: horaireAdded,
			openEditModal: openEditHoraireModal,
			setOpenEditModal: setOpenEditHoraireModal,
		},
		{
			title: 'Coordonées',
			added: coordoneesAdded,
			openEditModal: openEditCoordoneeModal,
			setOpenEditModal: setOpenEditCoordoneeModal,
		},
		{
			title: 'Adresse',
			added: !!address_name,
			openEditModal: openEditAdressModal,
			setOpenEditModal: setOpenEditAdressModal,
		},
	];

	const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);

	// Modals
	const [openContacterModal, setContacterModalOpen] = useState<boolean>(false);
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
	const [openColorModal, setOpenColorModal] = useState<boolean>(false);
	const [openFontModal, setOpenFontModal] = useState<boolean>(false);

	// opens hidden avatar input
	const avatarInputOnClickHandler = () => {
		// e.preventDefault();
		if (!avatarInputRef.current) {
			return;
		}
		avatarInputRef.current.click();
	};

	// drop down menu actions
	const dropDownActions: DropDownActionType = [
		// {
		// 	icon: InfoIconSVG,
		// 	text: "Mes infos",
		// 	onClick: setOpenInfoModal
		// },
		{
			icon: ContactIconSVG,
			text: 'Coordonnées',
			onClick: setContacterModalOpen,
		},
		{
			icon: AvatarIconSVG,
			text: 'Image de la boutique',
			onClick: avatarInputOnClickHandler,
		},
		{
			icon: ColorIconSVG,
			text: 'Couleur de la boutique',
			onClick: setOpenColorModal,
		},
		{
			icon: FontIconSVG,
			text: 'Style du titre',
			onClick: setOpenFontModal,
		},
	];

	useEffect(() => {
		console.log(is_subscribed);
		// avatar
		if (avatar) {
			setPreview(avatar);
		}
		// color code
		if (bg_color_code) {
			setBgColorCode(bg_color_code);
		}
		// bg color code
		if (color_code) {
			setColorCode(color_code);
		}
		// border
		if (border) {
			setborderState(border);
		}
		// set icon colors
		if (icon_color === 'white') {
			setMessageIcon(MessageIconWhiteSVG);
			setContactIcon(ContactIconWhiteSVG);
		} else if (icon_color === 'black') {
			setMessageIcon(MessageIconBlackSVG);
			setContactIcon(ContactIconBlackSVG);
		}
		// construct contacter link
		if (font_name) {
			setFontName(font_name);
		}
		// set phone & whatsapp value
		if (contact_phone) {
			setPhoneValue(contact_phone);
		}
		if (contact_whatsapp) {
			setwhatsappValue(contact_whatsapp);
		}
		if (contact_whatsapp_code) {
			setwhatsappCode(contact_whatsapp_code);
		}
		if (contact_phone_code) {
			setPhoneCode(contact_phone_code);
		}
		if (contact_mode) {
			if (contact_mode === 'W') {
				setWhatsappSwitchHandler(true);
			} else if (contact_mode === 'P') {
				setPhoneSwitchHandler(true);
			}
		}
	}, [
		is_subscribed,
		avatar,
		bg_color_code,
		border,
		color_code,
		contact_mode,
		contact_phone,
		contact_phone_code,
		contact_whatsapp,
		contact_whatsapp_code,
		font_name,
		icon_color,
	]);

	// save phone contact modal button
	const contacterSaveHandler = () => {
		if (phoneSwitch) {
			if (phoneCode) {
				if (!phoneValue.match(/[^0-9]/)) {
					dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'P'));
					setContacterModalOpen(false);
				}
			}
			// wtsp switch active => validate inputs & save
		} else if (wtspSwitch) {
			if (whatsappCode) {
				if (!whatsappValue.match(/[^0-9]/)) {
					dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'W'));
					setContacterModalOpen(false);
				}
			}
		}
	};

	// duplicated
	const whiteTextColors = ['#FF5D6B', '#0274D7', '#8669FB', '#878E88', '#0D070B'];
	const whiteText = '#FFFFFF';
	const blackText = '#0D070B';
	const [iconColor, setIconColor] = useState<IconColorType>('black');

	const colorClickHandler = (color: string) => {
		// If picked color is white => apply border + white text + black bg
		if (color === whiteText) {
			setBgColorCode(color);
			setColorCode(whiteText);
			setborderState('1px solid #0D070B');
			// Else other colors than white.
		} else {
			setBgColorCode(color);
			setborderState('0px solid transparent');
		}
		// if picked color fall into those white text colors => apply white text color
		if (whiteTextColors.includes(color)) {
			setColorCode(whiteText);
			setContactIcon(ContactIconWhiteSVG);
			setMessageIcon(MessageIconWhiteSVG);
			setIconColor('white');
			if (color === blackText) {
				setColorCode(whiteText);
			}
			// else apply black text color
		} else {
			setContactIcon(ContactIconBlackSVG);
			setMessageIcon(MessageIconBlackSVG);
			setIconColor('black');
			setColorCode(blackText);
		}
	};
	const editColorHandler = (_bgColorCode: string | null, _colorCode: string | null) => {
		if (_colorCode && _bgColorCode) {
			// _bgColorCode & _colorCode are reversed for this action.
			dispatch(shopPatchColorAction(_colorCode, _bgColorCode, border, iconColor));
			setOpenColorModal(false);
		}
	};

	const editFontHandler = (font: ShopFontNameType) => {
		if (font) {
			dispatch(shopPatchFontAction(font));
			setOpenFontModal(false);
		}
	};

	const fontPicker = (font: ShopFontNameType) => {
		if (font) {
			setFontName(font);
		}
	};

	const avatarInputOnChangeUploadHandler = useMemo(
		() => (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!e.target.files) {
				return;
			}
			const file = e.target.files[0];
			if (file && file.type.substring(0, 5) === 'image') {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					dispatch(shopPatchAvatarAction(reader.result as string));
				};
			}
			router.replace(router.asPath).then();
		},
		[dispatch, router],
	);

	return (
		<>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					{!is_subscribed && <ShopNotIndexed />}
					<Stack direction="row" justifyContent="flex-end" alignItems="flex-end" className={Styles.mobileOnly}>
						<IconDropDownMenu actions={dropDownActions} menuID="desktop-edit-menu" buttonID="desktop-edit-menu-btn" />
					</Stack>
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
									<ShopVerified shop_name={shop_name} avatar={preview as string} />
								) : (
									<div className={Styles.avatarSubWrapper}>
										<ImageFuture
											src={preview as string}
											alt={shop_name}
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.avatar}
											loading="eager"
											priority={true}
										/>
									</div>
								)}
								<input
									type="file"
									className={Styles.hiddenFile}
									ref={avatarInputRef}
									accept="image/*"
									onChange={(e) => avatarInputOnChangeUploadHandler(e)}
								/>
							</Box>
							<Stack
								className={Styles.shopNameContainer}
								direction="column"
								justifyContent="center"
								alignItems="flex-start"
							>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="flex-start"
									alignSelf="flex-start"
									alignItems="center"
									className={Styles.rootShopNameStack}
								>
									<h2
										className={Styles.shopName}
										style={{
											fontFamily:
												fontName === 'L'
													? 'Poppins-Light'
													: fontName === 'B'
													? 'Poppins-ExtraBold'
													: fontName === 'S'
													? 'Poppins-SemiBold'
													: 'Poppins',
										}}
									>
										{shop_name}
									</h2>
									<div className={Styles.desktopOnly}>
										<IconDropDownMenu
											actions={dropDownActions}
											menuID="desktop-edit-menu"
											buttonID="desktop-edit-menu-btn"
										/>
									</div>
								</Stack>
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
								backgroundColor={bgColorCode}
								textColor={colorCode}
								border={borderState}
								// nextPage={AUTH_LOGIN}
								active={true}
								cssClass={Styles.iconButton}
							/>
							{(phoneValue || whatsappValue) !== '' ? (
								<IconButton
									buttonText="Contacter"
									svgIcon={contactIcon}
									onClick={handleContactModalOpen}
									backgroundColor={bgColorCode}
									textColor={colorCode}
									border={borderState}
									cssClass={Styles.iconButton}
								/>
							) : (
								<BorderIconButton
									buttonText="Contacter"
									svgIcon={ContactIconBlueSVG}
									onClick={handleContactModalOpen}
									cssClass={Styles.iconButton}
								/>
							)}
							{/* START right side contact modal */}
							<RightSwipeModal open={openContacterModal} handleClose={handleContactModalClose}>
								<div className={Styles.modalContentWrapper}>
									<div className={Styles.topBar}>
										<Image src={CloseSVG} width={40} height={40} alt="" onClick={handleContactModalClose} />
									</div>
									<HelperDescriptionHeader
										header="Ajouter un moyen de contact"
										description="Choississez comment vos client peuvent vous contacter"
									/>
									{contacterAction.map((action, index) => {
										return (
											<ContacterPhoneInput
												key={index}
												checked={action.checked}
												setStateHandler={action.setStateHandler}
												label={action.label}
												backgroundColor={action.backgroundColor}
												icon={action.icon}
												code={action.code}
												setCode={action.setCode}
												value={action.value}
												setValue={action.setValue}
											/>
										);
									})}
								</div>
								<div className={Styles.actionButtonWrapper}>
									<PrimaryButton
										buttonText="Enregistrer"
										active={true}
										onClick={contacterSaveHandler}
										cssClass={Styles.actionButtonWidth}
									/>
								</div>
							</RightSwipeModal>
							{/* END right side contact modal */}
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
								{/*<ShopInfoTabContent shopInfoData={shopInfoData} />*/}
								{/*<EditShopTabContent*/}
								{/*			shop_pk={pk}*/}
								{/*			openFilterModal={openFilterModal}*/}
								{/*			setOpenFilterModal={setOpenFilterModal}*/}
								{/*			activeColor={bgColorCode}*/}
								{/*		/>*/}
								<ShopInfoTabs
									color={bgColorCode}
									borderColor={bgColorCode}
									shopContent={
										<EditShopTabContent
											shop_type="AUTH_SHOP"
											activeColor={bgColorCode}
											shop_pk={pk}
											openFilterModal={openFilterModal}
											setOpenFilterModal={setOpenFilterModal}
										/>
									}
									InfoContent={
										<EditShopInfoTabContent
											setOpenInfoModal={setOpenInfoModal}
											openInfoModal={openInfoModal}
											setOpenEditBioModal={setOpenEditBioModal}
											setOpenEditHoraireModal={setOpenEditHoraireModal}
											setOpenEditCoordoneeModal={setOpenEditCoordoneeModal}
											setOpenEditAdressModal={setOpenEditAdressModal}
											backgroundColor={bgColorCode}
										/>
									}
								/>
							</Stack>
						</Stack>
					</Box>
					{/* Edit info modal */}
					<RightSwipeModal open={openInfoModal} handleClose={() => setOpenInfoModal(false)}>
						<div className={Styles.modalContentWrapper}>
							<div className={Styles.topBar}>
								<Image src={CloseSVG} width={40} height={40} alt="" onClick={() => setOpenInfoModal(false)} />
							</div>
							<HelperDescriptionHeader header="Ajouter mes infos" />
							<Stack direction="column" spacing={4}>
								{infosStackActions.map((stack, index) => {
									return (
										<AjouterMesInfosStack
											key={index}
											title={stack.title}
											added={stack.added}
											content={stack.content}
											openEditModal={stack.openEditModal}
											setOpenEditModal={stack.setOpenEditModal}
										/>
									);
								})}
							</Stack>
						</div>
					</RightSwipeModal>
					{/* Edit color modal */}
					{openColorModal && (
						<>
							<Backdrop
								sx={{
									color: '#fff',
									zIndex: (theme) => theme.zIndex.drawer + 1,
									backgroundColor: 'rgba(0, 0, 0, 0.1)',
								}}
								open={openColorModal}
								// onClick={() => setOpenColorModal(false)}
							>
								<div className={SharedStyles.desktopContainerModal}>
									{colors.map((color: string, index: number) => {
										return (
											<DesktopColorPicker
												color={color}
												onClick={() => colorClickHandler(color)}
												selectedColor={bgColorCode}
												key={index}
											/>
										);
									})}
								</div>
								<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
									<PrimaryButton
										buttonText="Enregistrer"
										active={colorCode !== undefined && bgColorCode !== undefined}
										onClick={() => editColorHandler(bgColorCode, colorCode)}
									/>
								</div>
								<div>
									<div className={SharedStyles.mobileContainerModal}>
										<Swiper
											pagination={{
												clickable: true,
												enabled: true,
												bulletActiveClass: 'activekBullet',
												clickableClass: 'paginationBullet',
											}}
											modules={[Navigation, Pagination, Lazy]}
											scrollbar={{ enabled: false }}
											className={SharedStyles.mobileSwiper}
										>
											<SwiperSlide className={SharedStyles.swiperSlide}>
												{colors.slice(0, 10).map((color: string, index: number) => {
													return (
														<MobileColorPicker
															color={color}
															onClick={() => colorClickHandler(color)}
															selectedColor={bgColorCode}
															key={index}
														/>
													);
												})}
											</SwiperSlide>
											<SwiperSlide className={SharedStyles.swiperSlide}>
												{colors.slice(10, 20).map((color: string, index: number) => {
													return (
														<MobileColorPicker
															color={color}
															onClick={() => colorClickHandler(color)}
															selectedColor={bgColorCode}
															key={index}
														/>
													);
												})}
											</SwiperSlide>
										</Swiper>
										<div
											className={`${SharedStyles.primaryButtonMobileWrapper} ${SharedStyles.primaryButtonZindexWrapper}`}
										>
											<PrimaryButton
												buttonText="Enregistrer"
												active={colorCode !== undefined && bgColorCode !== undefined}
												onClick={() => editColorHandler(bgColorCode, colorCode)}
											/>
										</div>
									</div>
								</div>
							</Backdrop>
						</>
					)}
					{/* Edit font modal */}
					{openFontModal && (
						<>
							<Backdrop
								sx={{
									color: '#fff',
									zIndex: (theme) => theme.zIndex.drawer + 1,
									backgroundColor: 'rgba(0, 0, 0, 0.1)',
								}}
								open={openFontModal}
								// onClick={() => setOpenFontModal(false)}
							>
								<div className={Styles.desktopFontWrapper}>
									{availableFonts.map((font: { name: string; code: ShopFontNameType }, index: number) => {
										return (
											<FontPicker
												key={index}
												pickedFontName={fontName}
												font={font}
												onClick={() => {
													fontPicker(font.code);
												}}
											/>
										);
									})}
								</div>
								<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
									<PrimaryButton
										buttonText="Continuer"
										active={fontName !== undefined}
										onClick={() => editFontHandler(fontName)}
									/>
								</div>
								<div>
									<div className={SharedStyles.mobileFontWrapper}>
										<div className={SharedStyles.mobileFontContainerModal}>
											{availableFonts.map((font: { name: string; code: ShopFontNameType }, index: number) => {
												return (
													<FontPicker
														key={index}
														pickedFontName={fontName}
														font={font}
														onClick={() => {
															fontPicker(font.code);
														}}
													/>
												);
											})}
										</div>
										<div
											className={`${SharedStyles.primaryButtonMobileWrapper} ${SharedStyles.primaryButtonZindexWrapper}`}
										>
											<PrimaryButton
												buttonText="Enregistrer"
												active={fontName !== undefined}
												onClick={() => editFontHandler(fontName)}
											/>
										</div>
									</div>
								</div>
							</Backdrop>
						</>
					)}
				</main>
				<CustomFooter />
			</Stack>
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
										priority={true}
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
								shopContent={
									<ShopTabContent
										activeColor={bg_color_code}
										shop_pk={pk}
										openFilterModal={openFilterModal}
										setOpenFilterModal={setOpenFilterModal}
									/>
								}
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
									// redirect: {
									// 	permanent: false,
									// 	destination: TEMP_SHOP_EDIT_INDEX,
									// },
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
