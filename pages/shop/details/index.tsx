import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Styles from '../../../styles/shop/details/detailsIndex.module.sass';
import DismissMessageModal from '../../../components/htmlElements/modals/dismissMessageModal/dismissMessageModal';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import IconButton from '../../../components/htmlElements/buttons/iconButton/iconButton';
import ShopInfoTabs from '../../../components/htmlElements/tabs/tab';
import MessageIconWhiteSVG from '../../../public/assets/svgs/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/message-black.svg';
import ContactIconBlueSVG from '../../../public/assets/svgs/call-blue.svg';
import CircularAvatar from '../../../components/htmlElements/images/circularAvatar/circularAvatar';
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import MobilePublishEditNavbar from '../../../components/mobile/navbars/mobilePublishEditNavbar/mobilePublishEditNavbar';
import Image from 'next/image';
import BlackStarSVG from '../../../public/assets/svgs/black-star.svg';
import BorderIconButton from '../../../components/htmlElements/buttons/borderIconButton/borderIconButton';
import {
	checkBoxesForWhomActionType,
	chipActionsType,
	contacterPhoneInputType,
	switchActionType,
} from '../../../types/ui/uiTypes';
import InfoTabContent from '../../../components/shop/details/infoTabContent/InfoTabContent';
import ShopTabContent from '../../../components/shop/details/shopTabContent/shopTabContent';
import CloseSVG from '../../../public/assets/svgs/close.svg';
import HelperDescriptionHeader from '../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import PhoneSVG from '../../../public/assets/svgs/contact-phone.svg';
import WtspSVG from '../../../public/assets/svgs/whatsapp-icon.svg';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import RightSwipeModal from '../../../components/desktop/modals/rightSwipeModal/rightSwipeModal';
import ContacterPhoneInput from '../../../components/shop/details/contacterPhoneInput/contacterPhoneInput';
import {
	shopPatchPhoneContactAction,
} from "../../../store/actions/shop/shopActions";
import {
	getShopAvatar,
	getShopBgColorCode, getShopBorder,
	getShopColorCode, getShopContactMode,
	getShopFontName, getShopIconColor,
	getShopName, getShopPhoneContactCode,
	getShopWhatsappContactCode, getShopPhoneContact,
	getShopWhatsappContact
} from "../../../store/selectors";

const Index: NextPage = () => {
	const router = useRouter();
	const { created } = router.query;
	const dispatch = useAppDispatch();
	const [modalDismissed, setModalDismissed] = useState(false);
	const shopName = useAppSelector(getShopName);
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

	// const shopPhone
	// avatar preview
	const [preview, setPreview] = useState<string | null>(null);
	// colors
	const [colorCode, setColorCode] = useState<string>(shopColorCode);
	const [bgColorCode, setBgColorCode] = useState<string>(shopBgColorCode);
	// border
	const [border, setborder] = useState<string | undefined>(shopBorder);
	// font
	const [fontName, setFontName] = useState<ShopFontNameType>(shopFontName);
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	// Promo states
	const [promoCheck, setPromoCheck] = useState(false);
	// For whom states
	const [enfantCheck, setEnfantCheck] = useState(false);
	const [femmeCheck, setFemmeCheck] = useState(true);
	const [hommeCheck, setHommeCheck] = useState(true);
	const [openContacterModal, setContacterModalOpen] = useState(false);
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

	const handleOpen = () => {
		setContacterModalOpen(true);
	};
	const handleClose = () => {
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
			selected: true,
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
			selected: true,
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

	useEffect(() => {
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
		} else if (shopIconColor === 'black') {
			setMessageIcon(MessageIconBlackSVG);
		}
		if (shopFontName) {
			setFontName(shopFontName);
		}
	}, [shopAvatar, shopBgColorCode, shopColorCode, shopBorder, shopIconColor, shopFontName, dispatch, whatsappCode]);

	const contacterSaveHandler = () => {
		if (phoneSwitch) {
			if (phoneCode) {
				if (!phoneValue.match(/[^0-9]/)) {
					dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'P'));
					// dispatch(shopPatchWhatsappAction(null, null));
					setContacterModalOpen(false);
				}
			}
			// wtsp switch active => validate inputs & save
		} else if (wtspSwitch) {
			if (whatsappCode) {
				if (!whatsappValue.match(/[^0-9]/)) {
					dispatch(shopPatchPhoneContactAction(phoneCode, phoneValue, whatsappCode, whatsappValue, 'W'));
					// dispatch(shopPatchPhoneAction(null, null));
					setContacterModalOpen(false);
				}
			}
		}
	};

	return (
		<>
			{created && !modalDismissed && (
				<DismissMessageModal
					title="Voilà le résultat !"
					body="Vous pouvez désormais publier votre boutique ou continuer à la peaufiner."
					visible={!modalDismissed}
					buttonText="Compris !"
					dismissHandler={() => setModalDismissed(true)}
				/>
			)}
			<main className={Styles.main}>
				<div className={Styles.desktopTopBarWrapper}>
					<DesktopPublishEditNavbar
						onClick={() => {
							console.log('Clicked');
						}}
						menuID="desktop-edit-menu"
						buttonID="desktop-edit-menu-btn"
					/>
				</div>
				<div className={Styles.mobileTopBarWrapper}>
					<MobilePublishEditNavbar
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
							</div>
							<div className={Styles.shopNameContainer}>
								<h2
									className={Styles.shopName}
									style={{
										fontFamily:
											fontName === 'L'
												? 'Poppins-Light'
												: fontName === 'B'
												? 'Poppins-Black'
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
							<IconButton
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
							<BorderIconButton
								buttonText="Contacter"
								svgIcon={ContactIconBlueSVG}
								onClick={handleOpen}
								cssClass={Styles.iconButton}
							/>
							{/* START right side contact modal */}
							<RightSwipeModal open={openContacterModal} handleClose={handleClose}>
								<div className={Styles.modalContentWrapper}>
									<div className={Styles.topBar}>
										<Image src={CloseSVG} width={40} height={40} alt="" onClick={handleClose} />
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
										<ShopTabContent
											chipCategoriesAction={chipCategoriesAction}
											promoCheckAction={promoCheckAction}
											checkBoxForWhomAction={checkBoxesForWhomAction}
											activeColor={bgColorCode}
										/>
									}
									InfoContent={<InfoTabContent backgroundColor={bgColorCode} />}
									color={bgColorCode}
									borderColor={bgColorCode}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Index;
