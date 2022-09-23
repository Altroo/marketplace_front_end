import React, { useEffect, useState, useRef, useMemo } from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
import Styles from '../../../styles/temp-shop/edit/editIndex.module.sass';
import SharedStyles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import DismissMessageModal from '../../../components/htmlElements/modals/dismissMessageModal/dismissMessageModal';
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
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import MobilePublishEditNavbar from '../../../components/mobile/navbars/mobilePublishEditNavbar/mobilePublishEditNavbar';
import Image from 'next/image';
import BlackStarSVG from '../../../public/assets/svgs/globalIcons/black-star.svg';
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
import {
	getShopAvatar,
	getShopBgColorCode,
	getShopBorder,
	getShopColorCode,
	getShopContactMode,
	getShopFontName,
	getShopIconColor,
	getShopName,
	getShopPhoneContactCode,
	getShopWhatsappContactCode,
	getShopPhoneContact,
	getShopWhatsappContact,
	getShopBio,
	getShopOpeningDays,
	getShopPhone,
	getShopContactEmail,
	getShopWebsiteLink,
	getShopFacebookLink,
	getShopTwitterLink,
	getShopInstagramLink,
	getShopWhatsapp,
	getShopAddressName,
	getMyOffersList,
	getOfferOfferApi,
} from '../../../store/selectors';
import IconButton from '../../../components/htmlElements/buttons/iconButton/iconButton';
import InfoIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-info.svg';
import AvatarIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-avatar.svg';
import ColorIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-color.svg';
import FontIconSVG from '../../../public/assets/svgs/globalIcons/drop-down-font.svg';
import { Backdrop, Stack } from '@mui/material';
import AjouterMesInfosStack from '../../../components/groupedComponents/temp-shop/edit/ajouterMesInfos-Stack/ajouterMesInfosStack';
import DesktopColorPicker from '../../../components/desktop/modals/desktopColorPicker/desktopColorPicker';
import { colors } from '../create/color';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import { IconColorType } from '../../../types/_init/_initTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation, Pagination } from 'swiper';
import MobileColorPicker from '../../../components/mobile/modals/mobileColorPicker/mobileColorPicker';
import { availableFonts } from '../create/font';
import FontPicker from '../../../components/groupedComponents/temp-shop/create/fontPicker/fontPicker';
import { AUTH_REGISTER, TEMP_SHOP_ADD_SHOP_NAME, TEMP_SHOP_EDIT_INDEX } from "../../../utils/routes";
import { offerGetMyOffersFirstPageAction } from '../../../store/actions/offer/offerActions';
import ApiLoadingResponseOrError from '../../../components/formikElements/apiLoadingResponseOrError/apiLoadingResponseOrError';
import { getCookie } from "cookies-next";

const Index: NextPage = () => {
	const router = useRouter();
	const { created } = router.query;
	const dispatch = useAppDispatch();
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const [modalDismissed, setModalDismissed] = useState(false);
	const offerApi = useAppSelector(getOfferOfferApi);

	const shopName = useAppSelector(getShopName);
	const bio = useAppSelector(getShopBio);
	const opening_days = useAppSelector(getShopOpeningDays);
	const phone = useAppSelector(getShopPhone);
	const contact_email = useAppSelector(getShopContactEmail);
	const website_link = useAppSelector(getShopWebsiteLink);
	const facebook_link = useAppSelector(getShopFacebookLink);
	const twitter_link = useAppSelector(getShopTwitterLink);
	const instagram_link = useAppSelector(getShopInstagramLink);
	const whatsapp = useAppSelector(getShopWhatsapp);
	const address_name = useAppSelector(getShopAddressName);

	const shopAvatar = useAppSelector(getShopAvatar);
	const shopColorCode = useAppSelector(getShopColorCode);
	const shopBgColorCode = useAppSelector(getShopBgColorCode);
	const shopFontName = useAppSelector(getShopFontName);
	const shopBorder = useAppSelector(getShopBorder);
	const shopIconColor = useAppSelector(getShopIconColor);
	const shopPhoneContactCode = useAppSelector(getShopPhoneContactCode);
	const shopPhoneContact = useAppSelector(getShopPhoneContact);
	const shopWhatsappContactCode = useAppSelector(getShopWhatsappContactCode);
	const shopWhatsappContact = useAppSelector(getShopWhatsappContact);
	const shopContactMode = useAppSelector(getShopContactMode);
	// avatar preview
	const [preview, setPreview] = useState<string | null>(shopAvatar);
	// colors
	const [colorCode, setColorCode] = useState<string>(shopColorCode);
	const [bgColorCode, setBgColorCode] = useState<string>(shopBgColorCode);
	// border
	const [border, setborder] = useState<string>(shopBorder);
	// font
	const [fontName, setFontName] = useState<ShopFontNameType>(shopFontName);
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	const [contactIcon, setContactIcon] = useState<string>(ContactIconBlackSVG);
	// Promo states
	const [promoCheck, setPromoCheck] = useState(false);
	// For whom states
	const [enfantCheck, setEnfantCheck] = useState(false);
	const [femmeCheck, setFemmeCheck] = useState(false);
	const [hommeCheck, setHommeCheck] = useState(false);
	// modals
	const [openContacterModal, setContacterModalOpen] = useState<boolean>(false);
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
	const [openColorModal, setOpenColorModal] = useState<boolean>(false);
	const [openFontModal, setOpenFontModal] = useState<boolean>(false);

	let phoneContactMode = true;
	let whatsappContactMode = false;
	if (shopContactMode === 'W') {
		phoneContactMode = false;
		whatsappContactMode = true;
	}
	const [phoneSwitch, setPhoneSwitch] = useState(phoneContactMode);
	const [wtspSwitch, setWtspSwitch] = useState(whatsappContactMode);

	let phoneContactCodeInitial = '+212';
	if (shopPhoneContactCode) {
		phoneContactCodeInitial = shopPhoneContactCode;
	}
	let phoneContactInitial = '';
	if (shopPhoneContact) {
		phoneContactInitial = shopPhoneContact;
	}
	let whatsappContactCodeInitial = '+212';
	if (shopWhatsappContactCode) {
		whatsappContactCodeInitial = shopWhatsappContactCode;
	}
	let whatsappContactInitial = '';
	if (shopWhatsappContact) {
		whatsappContactInitial = shopWhatsappContact;
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
	// categories action
	const chipCategoriesAction: chipActionsType = [
		{
			buttonText: 'Bien-être',
			selected: false,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {
				return;
			},
		},
		{
			buttonText: 'Service',
			selected: false,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {
				return;
			},
		},
		{
			buttonText: 'Sport',
			selected: false,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {
				return;
			},
		},
	];
	// promo check action
	const promoCheckAction: switchActionType = {
		activeColor: bgColorCode,
		checked: promoCheck,
		onChange: setPromoCheck,
	};
	// for whom action
	const checkBoxesForWhomAction: Array<checkBoxesForWhomActionType> = [
		{
			text: 'Enfant',
			checked: enfantCheck,
			active: true,
			onChange: setEnfantCheck,
			activeColor: bgColorCode,
		},
		{
			text: 'Femme',
			checked: femmeCheck,
			active: true,
			onChange: setFemmeCheck,
			activeColor: bgColorCode,
		},
		{
			text: 'Homme',
			checked: hommeCheck,
			active: true,
			onChange: setHommeCheck,
			activeColor: bgColorCode,
		},
	];
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
		{
			icon: InfoIconSVG,
			text: 'Mes infos',
			onClick: setOpenInfoModal,
		},
		{
			icon: AvatarIconSVG,
			text: 'Photo de profil',
			onClick: avatarInputOnClickHandler,
		},
		{
			icon: ColorIconSVG,
			text: 'Couleur de la boutique',
			onClick: setOpenColorModal,
		},
		{
			icon: FontIconSVG,
			text: 'Police du titre',
			onClick: setOpenFontModal,
		},
	];

	// check horaire added
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
			content: shopName,
			added: !!shopName,
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

	const userOffersList = useAppSelector(getMyOffersList);
	const [hideAsideNav, setHideAsideNav] = useState<boolean>(userOffersList.length > 0);
	const [userOffersFetched, setUserOffersFetched] = useState<boolean>(userOffersList.length > 0);

	useEffect(() => {
		if (!userOffersFetched) {
			dispatch(offerGetMyOffersFirstPageAction());
		}
		// if (offerApi.fetchPromiseStatus === 'RESOLVED') {
		// 	setUserOffersFetched(true);
		// }
		if (userOffersList) {
			setHideAsideNav(false);
		}
		// avatar
		if (shopAvatar) {
			setPreview(shopAvatar);
		}
		// color code
		if (shopBgColorCode) {
			setBgColorCode(shopBgColorCode);
		}
		// bg color code
		if (shopColorCode) {
			setColorCode(shopColorCode);
		}
		// border
		if (shopBorder) {
			setborder(shopBorder);
		}
		// icon color
		if (shopIconColor === 'white') {
			setMessageIcon(MessageIconWhiteSVG);
			setContactIcon(ContactIconWhiteSVG);
		} else if (shopIconColor === 'black') {
			setMessageIcon(MessageIconBlackSVG);
			setContactIcon(ContactIconBlackSVG);
		}
		if (shopFontName) {
			setFontName(shopFontName);
		}
		// set phone & whatsapp value
		if (shopPhoneContact) {
			setPhoneValue(shopPhoneContact);
		}
		if (shopWhatsappContact) {
			setwhatsappValue(shopWhatsappContact);
		}
		if (shopWhatsappContactCode) {
			setwhatsappCode(shopWhatsappContactCode);
		}
		if (shopPhoneContactCode) {
			setPhoneCode(shopPhoneContactCode);
		}
		if (shopContactMode) {
			if (shopContactMode === 'W') {
				setWhatsappSwitchHandler(true);
			} else if (shopContactMode === 'P') {
				setPhoneSwitchHandler(true);
			}
		}
		return () => {
			if (offerApi.fetchPromiseStatus === 'RESOLVED') {
				setUserOffersFetched(true);
			}
			if (userOffersList) {
				setHideAsideNav(true);
			}
		}
	}, [
		dispatch,
		offerApi.fetchPromiseStatus,
		shopAvatar,
		shopBgColorCode,
		shopBorder,
		shopColorCode,
		shopContactMode,
		shopFontName,
		shopIconColor,
		shopPhoneContact,
		shopPhoneContactCode,
		shopWhatsappContact,
		shopWhatsappContactCode,
		userOffersFetched,
		userOffersList,
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
	// const [border, setborder] = useState<string>('');

	const colorClickHandler = (color: string) => {
		// If picked color is white => apply border + white text + black bg
		if (color === whiteText) {
			setBgColorCode(color);
			setColorCode(whiteText);
			setborder('1px solid #0D070B');
			// Else other colors than white.
		} else {
			setBgColorCode(color);
			setborder('0px solid transparent');
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
		cookiesPoster('/cookies', { color_code: 1 }).then();
	};
	const editColorHandler = (_bgColorCode: string | null, _colorCode: string | null) => {
		if (_colorCode && _bgColorCode) {
			cookiesPoster('/cookies', { border: border }).then(() => {
				cookiesPoster('/cookies', { icon_color: iconColor }).then();
			});
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
		},
		[dispatch],
	);

	return (
		<>
			{/* Show shop created modal */}
			{created && !modalDismissed && (
				<DismissMessageModal
					title="Voilà le résultat !"
					body="Vous pouvez désormais publier votre boutique ou continuer à la peaufiner."
					visible={!modalDismissed}
					buttonText="Compris !"
					dismissHandler={() => {
						setModalDismissed(true);
						router.replace(TEMP_SHOP_EDIT_INDEX, undefined, { shallow: true }).then();
					}}
				/>
			)}
			<main className={Styles.main}>
				{/* TOP BAR */}
				<div className={Styles.desktopTopBarWrapper}>
					<DesktopPublishEditNavbar
						dropDownText="Éditer"
						buttonTitle="Publier"
						actions={dropDownActions}
						onClick={() => {
							router.push(AUTH_REGISTER).then();
						}}
						menuID="desktop-edit-menu"
						buttonID="desktop-edit-menu-btn"
					/>
				</div>
				<div className={Styles.mobileTopBarWrapper}>
					<MobilePublishEditNavbar
						actions={dropDownActions}
						onPublish={() => {
							console.log('Clicked');
						}}
						menuID="mobile-edit-menu"
						buttonID="mobile-edit-menu-btn"
					/>
				</div>
				<div className={Styles.pageContent}>
					<div className={Styles.avatarActionsWrapper}>
						<div className={Styles.avatarWrapper}>
							<div>
								<CircularAvatar imageSrc={preview} />
								<input
									type="file"
									className={Styles.hiddenFile}
									ref={avatarInputRef}
									accept="image/*"
									onChange={(e) => avatarInputOnChangeUploadHandler(e)}
								/>
							</div>
							<div className={Styles.shopNameContainer}>
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
									{shopName}
								</h2>
								<div className={Styles.ratingContainer}>
									<Image src={BlackStarSVG} width={20} height={20} alt="" />
									<span>4.2 (2 notes)</span>
								</div>
							</div>
						</div>
						<div className={Styles.actionsWrapper}>
							<IconAnchorButton
								buttonText="Message"
								svgIcon={messageIcon}
								backgroundColor={bgColorCode}
								textColor={colorCode}
								border={border}
								onClick={() => {
									console.log('clicked');
								}}
								active={true}
								cssClass={Styles.iconButton}
							/>
							{/* show outline icon button if no phone or whatsapp added yet, else show normal icon button */}
							{(phoneValue || whatsappValue) !== '' ? (
								<IconButton
									buttonText="Contacter"
									svgIcon={contactIcon}
									onClick={handleContactModalOpen}
									backgroundColor={bgColorCode}
									textColor={colorCode}
									border={border}
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
										<Image
											src={CloseSVG}
											width={40}
											height={40}
											alt=""
											onClick={handleContactModalClose}
										/>
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
						</div>
					</div>
					<div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<ShopInfoTabs
									shopContent={
										<BoutiqueTabContent
											chipCategoriesAction={chipCategoriesAction}
											promoCheckAction={promoCheckAction}
											checkBoxForWhomAction={checkBoxesForWhomAction}
											activeColor={bgColorCode}
											hidden={hideAsideNav}
										/>
									}
									InfoContent={
										<InfoTabContent
											setOpenInfoModal={setOpenInfoModal}
											openInfoModal={openInfoModal}
											setOpenEditBioModal={setOpenEditBioModal}
											setOpenEditHoraireModal={setOpenEditHoraireModal}
											setOpenEditCoordoneeModal={setOpenEditCoordoneeModal}
											setOpenEditAdressModal={setOpenEditAdressModal}
											backgroundColor={bgColorCode}
										/>
									}
									color={bgColorCode}
									borderColor={bgColorCode}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Edit info modal */}
				<RightSwipeModal open={openInfoModal} handleClose={() => setOpenInfoModal(false)}>
					<div className={Styles.modalContentWrapper}>
						<div className={Styles.topBar}>
							<Image
								src={CloseSVG}
								width={40}
								height={40}
								alt=""
								onClick={() => setOpenInfoModal(false)}
							/>
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
							<div
								className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}
							>
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
							<div
								className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}
							>
								<PrimaryButton
									buttonText="Continuer"
									active={fontName !== undefined}
									onClick={() => editFontHandler(fontName)}
								/>
							</div>
							<div>
								<div className={SharedStyles.mobileFontWrapper}>
									<div className={SharedStyles.mobileFontContainerModal}>
										{availableFonts.map(
											(font: { name: string; code: ShopFontNameType }, index: number) => {
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
											},
										)}
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
				<ApiLoadingResponseOrError
					inProgress={offerApi.isFetchInProgress}
					promiseStatus={offerApi.fetchPromiseStatus}
					error={offerApi.error}
				/>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
	return {
		props: {},
	}
}

export default Index;
