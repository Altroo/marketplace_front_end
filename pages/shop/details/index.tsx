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
import { checkBoxesForWhomActionType, chipActionsType } from "../../../types/ui/uiTypes";
import InfoTabContent from "../../../components/shop/details/infoTabContent/InfoTabContent";
import ShopTabContent from "../../../components/shop/details/shopTabContent/shopTabContent";

const Index: NextPage = () => {
	const router = useRouter();
	const { created } = router.query;
	const dispatch = useAppDispatch();
	const [modalDismissed, setModalDismissed] = useState(false);
	const shop_name = useAppSelector((state) => state.shop.userShop.shop_name as string);
	const shop_avatar = useAppSelector((state) => state.shop.userShop.avatar as string);
	const color_code = useAppSelector((state) => state.shop.userShop.color_code as string);
	const bg_color_code = useAppSelector((state) => state.shop.userShop.bg_color_code as string);
	const font_name = useAppSelector((state) => state.shop.userShop.font_name as ShopFontNameType);
	const shopBorder = useAppSelector((state) => state.shop.border as string);
	const shopIconColor = useAppSelector((state) => state.shop.iconColor as IconColorType);
	// avatar preview
	const [preview, setPreview] = useState<string | null>(null);
	// border
	const [border, setborder] = useState<string | undefined>(undefined);
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconBlackSVG);
	// For whom states
	const [enfantCheck, setEnfantCheck] = useState(false);
	const [femmeCheck, setFemmeCheck] = useState(true);
	const [hommeCheck, setHommeCheck] = useState(true);
	const chipCategoriesAction: chipActionsType = [
		{
			buttonText: 'Bien-être',
			selected: true,
			onClick: () => {return;},
			border: border,
			textColor: color_code,
			backgroundColor: bg_color_code,
		},
		{
			buttonText: 'Service',
			selected: false,
			border: border,
			textColor: color_code,
			// backgroundColor: bg_color_code,
			onClick: () => {return;},
		},
		{
			buttonText: 'Sport',
			selected: true,
			onClick: () => {return;},
			border: border,
			textColor: color_code,
			backgroundColor: bg_color_code,
		},
	];

	const checkBoxesForWhomAction: Array<checkBoxesForWhomActionType> = [
		{
			text: 'Enfant',
			checked: enfantCheck,
			active: true,
			onChange: setEnfantCheck,
		},
		{
			text: 'Femme',
			checked: femmeCheck,
			active: true,
			onChange: setFemmeCheck,
		},
		{
			text: 'Homme',
			checked: hommeCheck,
			active: true,
			onChange: setHommeCheck,
		},
	];

	useEffect(() => {
		if (shop_avatar) {
			setPreview(shop_avatar);
		}
		if (shopBorder) {
			setborder(shopBorder);
		}
		if (shopIconColor === 'white') {
			setMessageIcon(MessageIconWhiteSVG);
		} else if (shopIconColor === 'black') {
			setMessageIcon(MessageIconBlackSVG);
		}
	}, [shopBorder, shopIconColor, shop_avatar]);


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
											font_name === 'L'
												? 'Poppins-Light'
												: font_name === 'B'
												? 'Poppins-Black'
												: font_name === 'S'
												? 'Poppins-SemiBold'
												: 'Poppins',
									}}
								>
									{shop_name}
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
								backgroundColor={bg_color_code}
								textColor={color_code}
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
											checkBoxAction={checkBoxesForWhomAction}
										/>
									}
									color={bg_color_code}
									borderColor={bg_color_code}
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
