import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Styles from '../../../styles/shop/details/detailsIndex.module.sass';
import DismissMessageModal from '../../../components/htmlElements/modals/dismissMessageModal/dismissMessageModal';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import IconButton from '../../../components/htmlElements/buttons/iconButton/IconButton';
import ShopInfoTabs from '../../../components/htmlElements/tabs/tab';
import MessageIconWhiteSVG from '../../../public/assets/svgs/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/message-black.svg';
import ContactIconBlueSVG from '../../../public/assets/svgs/call-blue.svg';
import CircularAvatar from '../../../components/htmlElements/images/circularAvatar/circularAvatar';
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import { IconColorType } from '../../../types/_init/_initTypes';
import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import MobilePublishEditNavbar from '../../../components/mobile/navbars/mobilePublishEditNavbar/mobilePublishEditNavbar';
import Image from 'next/image';
import BlackStarSVG from '../../../public/assets/svgs/black-star.svg';
import BorderIconButton from '../../../components/htmlElements/buttons/borderIconButton/borderIconButton';
import { checkBoxesForWhomActionType, chipActionsType, switchActionType } from "../../../types/ui/uiTypes";
import InfoTabContent from "../../../components/shop/details/infoTabContent/InfoTabContent";
import ShopTabContent from "../../../components/shop/details/shopTabContent/shopTabContent";

const Index: NextPage = () => {
	const router = useRouter();
	const { created } = router.query;
	const dispatch = useAppDispatch();
	const [modalDismissed, setModalDismissed] = useState(false);
	const shopName = useAppSelector((state) => state.shop.userShop.shop_name as string);
	const shopAvatar = useAppSelector((state) => state.shop.userShop.avatar as string);
	const shopColorCode = useAppSelector((state) => state.shop.userShop.color_code as string);
	const shopBgColorCode = useAppSelector((state) => state.shop.userShop.bg_color_code as string);
	const shopFontName = useAppSelector((state) => state.shop.userShop.font_name as ShopFontNameType);
	const shopBorder = useAppSelector((state) => state.shop.userShop.border as string);
	const shopIconColor = useAppSelector((state) => state.shop.userShop.icon_color as IconColorType);
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
	const chipCategoriesAction: chipActionsType = [
		{
			buttonText: 'Bien-être',
			selected: true,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {return;},
		},
		{
			buttonText: 'Service',
			selected: false,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {return;},
		},
		{
			buttonText: 'Sport',
			selected: true,
			border: border,
			textColor: colorCode,
			backgroundColor: bgColorCode,
			onClick: () => {return;},
		},
	];
	// promo check action
	const promoCheckAction: switchActionType = {
			activeColor: bgColorCode,
			checked: promoCheck,
			onChange: setPromoCheck,
		};

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

	useEffect(() => {
		// avatar
		if (shopAvatar) {
			setPreview(shopAvatar);
		}
		// color code
		if (shopBgColorCode) {
			console.log('shopBgColorCode: ', shopBgColorCode);
			setBgColorCode(shopBgColorCode);
		}
		// bg color code
		if (shopColorCode) {
			console.log('shopColorCode: ', shopColorCode);
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
	}, [shopBorder, shopIconColor, shopAvatar, shopColorCode, shopBgColorCode, shopFontName]);


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
								cssClass={Styles.iconButton}
							/>
							<BorderIconButton
								buttonText="Contacter"
								svgIcon={ContactIconBlueSVG}
								onClick={() => {
									console.log('clicked');
								}}
								cssClass={Styles.iconButton}
							/>
						</div>
					</div>
					<div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<ShopInfoTabs
									InfoContent={<InfoTabContent />}
									shopContent={
										<ShopTabContent
											chipCategoriesAction={chipCategoriesAction}
											promoCheckAction={promoCheckAction}
											checkBoxForWhomAction={checkBoxesForWhomAction}
										/>
									}
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
