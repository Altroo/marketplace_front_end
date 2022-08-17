import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Styles from '../../../styles/shop/add/shopAddShared.module.sass';
import LeftSideBar from '../../../components/shop/add/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import CardSection from '../../../components/htmlElements/cards/cardSection/cardSection';
import { setShopFontAction, shopPostRootAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/shop/add/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import MessageIconSVG from '../../../public/assets/svgs/message.svg';
import MessageIconWhiteSVG from '../../../public/assets/svgs/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/message-black.svg';
import ContactIconSVG from '../../../public/assets/svgs/call.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/call-black.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import DisabledFilterDropDown from '../../../components/shop/add/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/shop/add/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import FontPicker from '../../../components/shop/add/fontPicker/fontPicker';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import DismissMessageModal from '../../../components/htmlElements/modals/dismissMessageModal/dismissMessageModal';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { deleteCookieStorageNewShopData } from '../../../utils/helpers';
import { IconColorType, TokenChoices } from '../../../types/_init/_initTypes';
import ChipButtons from '../../../components/htmlElements/buttons/chipButton/chipButton';
import { chipActionsType } from '../../../types/ui/uiTypes';

const Font: NextPage = () => {
	const activeStep = '4';
	const dispatch = useAppDispatch();
	const router = useRouter();
	// redux states
	const shopName = useAppSelector((state) => state.shop.newShop.shop_name as string);
	const shopAvatar = useAppSelector((state) => state.shop.newShop.avatar as ArrayBuffer);
	const shopColorCode = useAppSelector((state) => state.shop.newShop.color_code as string);
	const shopBgColorCode = useAppSelector((state) => state.shop.newShop.bg_color_code as string);
	const shopBorder = useAppSelector((state) => state.shop.newShop.border as string);
	const shopIconColor = useAppSelector((state) => state.shop.newShop.icon_color as IconColorType);
	const shopFontName = useAppSelector((state) => state.shop.newShop.font_name as ShopFontNameType);
	const uniqueID = useAppSelector((state) => state._init.tokenType as TokenChoices);
	// page states
	const [preview, setPreview] = useState<ArrayBuffer | null>(null);
	const [colorCode, setColorCode] = useState<string>('');
	const [bgColorCode, setBgColorCode] = useState<string>('');
	// Border
	const [border, setborder] = useState<string | undefined>(undefined);
	const [fontName, setFontName] = useState<ShopFontNameType>('R');
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconSVG);
	// Gray contact Icon
	const [contactIcon, setContactIcon] = useState<string>(ContactIconSVG);
	const [backendError, setBackendError] = useState<boolean>(false);
	const chipCategoriesAction: chipActionsType = [
		{
			buttonText: 'Bien-être',
			selected: true,
			disabled: true,
		},
		{
			buttonText: 'Service',
			selected: false,
			disabled: true,
		},
		{
			buttonText: 'Sport',
			selected: true,
			disabled: true,
		},
	];
	// const whiteText = '#FFFFFF';
	const blackText = '#0D070B';

	useEffect(() => {
		// avatar
		if (shopAvatar) {
			setPreview(shopAvatar);
		}
		// color code
		if (shopBgColorCode) {
			setBgColorCode(shopColorCode);
		}
		// bg color code
		if (shopColorCode) {
			setColorCode(shopBgColorCode);
		}
		// border
		if (shopBorder) {
			setborder(shopBorder);
		}
		// icon color
		if (shopIconColor === 'white') {
			setContactIcon(ContactIconWhiteSVG);
			setMessageIcon(MessageIconWhiteSVG);
		} else if (shopIconColor === 'black') {
			setContactIcon(ContactIconBlackSVG);
			setMessageIcon(MessageIconBlackSVG);
		}
		// font
		if (shopFontName) {
			setFontName(shopFontName);
		}
	}, [
		dispatch,
		router,
		shopAvatar,
		shopBgColorCode,
		shopBorder,
		shopColorCode,
		shopFontName,
		shopIconColor,
		uniqueID,
	]);

	const availableFonts: Array<{ name: string; code: ShopFontNameType }> = [
		{
			name: 'light',
			code: 'L',
		},
		{
			name: 'regular',
			code: 'R',
		},
		{
			name: 'semi Bold',
			code: 'S',
		},
		{
			name: 'black',
			code: 'B',
		},
	];

	const fontPicker = (font: ShopFontNameType | undefined) => {
		if (font) {
			setFontName(font);
			cookiesPoster('/cookies', { font_name: 1 }).then();
		}
	};

	const fontHandler = async (font: ShopFontNameType | undefined) => {
		if (font) {
			dispatch(setShopFontAction(font));
			dispatch(shopPostRootAction(shopName, shopAvatar, shopBgColorCode, shopColorCode, shopBorder, shopIconColor, font));
			if (uniqueID === 'UNIQUE_ID') {
				deleteCookieStorageNewShopData();
				router.push('/shop/details?created=true').then();
			} else {
				setBackendError(true);
			}
		}
	};
	return !backendError ? (
		<>
			<LeftSideBar step={activeStep} />
			<main className={Styles.main}>
				<div>
					<DesktopTopNavigationBar backHref="/shop/add/color" returnButton />
					<MobileTopNavigationBar backHref="/shop/add/color" returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Choisir une police" HelpText="L'importance d'un type de police" />
					<CardSection>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating
								shopName={shopName}
								preview={preview}
								font={fontName}
								active={false}
							/>
							<div className={Styles.actionsWrapper}>
								<IconAnchorButton
									buttonText="Message"
									svgIcon={messageIcon}
									backgroundColor={bgColorCode}
									textColor={colorCode}
									border={border}
								/>
								<IconAnchorButton
									buttonText="Contacter"
									svgIcon={contactIcon}
									backgroundColor={bgColorCode}
									textColor={colorCode}
									border={border}
								/>
							</div>
						</div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<DisactivatedTab
									active
									text="BOUTIQUE"
									selected={false}
									borderColor={bgColorCode}
									color={blackText}
								/>
								<DisactivatedTab
									active={false}
									text="INFOS"
									borderColor={bgColorCode}
									color={blackText}
								/>
							</div>
						</div>
						<div className={Styles.filterWrapper}>
							<span className={Styles.filterText}>Filtrer</span>
							<DisabledFilterDropDown text="Trier : Prix décroissant" />
						</div>
						<div className={Styles.shopDetailsAside}>
							<div className={Styles.shopFilterWrapper}>
								<IconTextInput active={false} placeholder="Rechercher" />
								<div className={Styles.shopFilterContainer}>
									<span className={Styles.subHeader}>Catégories</span>
									<div className={Styles.categoriesWrapper}>
										<ChipButtons actions={chipCategoriesAction} />
									</div>
									<div className={Styles.promoWrapper}>
										<span className={Styles.subHeader}>En Promo</span>
										<IosSwitch disabled checked={false} />
									</div>
									<div className={Styles.forWhomWrapper}>
										<span className={Styles.subHeader}>Pour qui</span>
										<div>
											<div>
												<CheckBox checked={false} active={false} text="Enfant" />
												<CheckBox checked active={false} text="Femme" />
												<CheckBox checked active={false} text="Homme" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.shopAddOfferWrapper}>
								<div className={Styles.addOfferContainer}>
									<div className={Styles.centeredInfoActionWrapper}>
										<CenteredInfoAction
											header="Démarrer votre boutique"
											subHeader="Ajoutez votre premier article !"
										/>
										<BorderIconAnchorButton
											buttonText="Ajouter un article"
											svgIcon={DisactivatedAddIconSVG}
											active={false}
										/>
									</div>
								</div>
							</div>
						</div>
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
						<div>
							<div className={Styles.mobileFontWrapper}>
								<div className={Styles.mobileFontContainerModal}>
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
									className={`${Styles.primaryButtonMobileWrapper} ${Styles.primaryButtonZindexWrapper}`}
								>
									<PrimaryButton
										buttonText="Continuer"
										active={fontName !== undefined}
										onClick={() => fontHandler(fontName)}
									/>
								</div>
							</div>
						</div>
					</CardSection>
					<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
						<PrimaryButton
							buttonText="Continuer"
							active={fontName !== undefined}
							onClick={() => fontHandler(fontName)}
						/>
					</div>
				</div>
			</main>
		</>
	) : (
		<DismissMessageModal
			title="Erreur"
			body="Try again later."
			visible={true}
			buttonText="Ok !"
			dismissHandler={() => {
				setBackendError(false);
			}}
		/>
	);
};

export default Font;
