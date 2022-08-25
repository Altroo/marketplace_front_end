import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Styles from '../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DefaultCardSection from '../../../components/htmlElements/cards/defaultCardSection/defaultCardSection';
import { setShopFontAction, shopPostRootAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/groupedComponents/shop/create/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import MessageIconSVG from '../../../public/assets/svgs/globalIcons/message.svg';
import MessageIconWhiteSVG from '../../../public/assets/svgs/globalIcons/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/globalIcons/message-black.svg';
import ContactIconSVG from '../../../public/assets/svgs/globalIcons/call.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/globalIcons/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/globalIcons/call-black.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/globalIcons/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import DisabledFilterDropDown from '../../../components/groupedComponents/shop/create/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/groupedComponents/shop/create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import FontPicker from '../../../components/groupedComponents/shop/create/fontPicker/fontPicker';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import ChipButtons from '../../../components/htmlElements/buttons/chipButton/chipButton';
import { chipActionsType } from '../../../types/ui/uiTypes';
import {
	getNewShopName,
	getNewShopAvatar,
	getNewShopColorCode,
	getNewShopBgColorCode,
	getNewShopFontName,
	getNewShopBorder,
	getNewShopIconColor,
	getNewShopIsAddInProgress,
	getNewShopApiError,
	getNewShopAddPromiseStatus,
} from '../../../store/selectors';
import ApiAlert from '../../../components/formikElements/apiResponse/apiAlert/apiAlert';
import ApiProgress from '../../../components/formikElements/apiResponse/apiProgress/apiProgress';
import { SHOP_ADD_COLOR } from "../../../utils/routes";

export const availableFonts: Array<{ name: string; code: ShopFontNameType }> = [
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

const Font: NextPage = () => {
	const activeStep = '4';
	const dispatch = useAppDispatch();
	const router = useRouter();
	// redux states
	const shopName = useAppSelector(getNewShopName);
	const shopAvatar = useAppSelector(getNewShopAvatar);
	const shopColorCode = useAppSelector(getNewShopColorCode);
	const shopBgColorCode = useAppSelector(getNewShopBgColorCode);
	const shopBorder = useAppSelector(getNewShopBorder);
	const shopIconColor = useAppSelector(getNewShopIconColor);
	const shopFontName = useAppSelector(getNewShopFontName);
	// const uniqueID = useAppSelector(getTokenType);
	const isAddInProgressSelector = useAppSelector(getNewShopIsAddInProgress);
	const isAddErrorSelector = useAppSelector(getNewShopApiError);
	const isAddPromiseStatusSelector = useAppSelector(getNewShopAddPromiseStatus);

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
	}, [shopAvatar, shopBgColorCode, shopBorder, shopColorCode, shopFontName, shopIconColor]);

	const fontPicker = (font: ShopFontNameType | undefined) => {
		if (font) {
			setFontName(font);
			cookiesPoster('/cookies', { font_name: 1 }).then();
		}
	};

	const fontHandler = (font: ShopFontNameType | undefined) => {
		if (font) {
			dispatch(setShopFontAction(font));
			dispatch(
				shopPostRootAction(
					shopName,
					shopAvatar,
					shopBgColorCode,
					shopColorCode,
					shopBorder,
					shopIconColor,
					font,
					router,
				),
			);
		}
	};

	return (
		<>
			<LeftSideBar step={activeStep} which="SHOP" />
			<main className={Styles.main}>
				<div>
					<DesktopTopNavigationBar backHref={SHOP_ADD_COLOR} returnButton />
					<MobileTopNavigationBar backHref={SHOP_ADD_COLOR} returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Choisir une police" HelpText="L'importance d'un type de police" />
					<DefaultCardSection>
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
					</DefaultCardSection>
					<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
						<PrimaryButton
							buttonText="Continuer"
							active={fontName !== undefined}
							onClick={() => fontHandler(fontName)}
						/>
					</div>
				</div>
				{isAddInProgressSelector && isAddPromiseStatusSelector === 'PENDING' && (
					<ApiProgress cssStyle={{ position: 'absolute', top: '50%', left: '50%' }} />
				)}
				{!isAddInProgressSelector && isAddPromiseStatusSelector === 'REJECTED' && isAddErrorSelector && (
					<ApiAlert
						errorDetails={isAddErrorSelector.details}
						cssStyle={{ position: 'absolute', left: '50%', top: '50%', margin: '0 -60px -60px -60px' }}
					/>
				)}
			</main>
		</>
	);
};

export default Font;
