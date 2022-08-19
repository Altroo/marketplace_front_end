import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Styles from '../../../styles/shop/add/shopAddShared.module.sass';
import LeftSideBar from '../../../components/shop/add/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import PrimaryAnchorButton from '../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import CardSection from '../../../components/htmlElements/cards/cardSection/cardSection';
import { setShopColorAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/shop/add/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import MessageIconSVG from '../../../public/assets/svgs/message.svg';
import MessageIconWhiteSVG from '../../../public/assets/svgs/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/message-black.svg';
import ContactIconSVG from '../../../public/assets/svgs/call.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/call-black.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/gray-add.svg';
import { IconColorType } from '../../../types/_init/_initTypes';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import DisabledFilterDropDown from '../../../components/shop/add/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/shop/add/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import DesktopColorPicker from '../../../components/desktop/modals/desktopColorPicker/desktopColorPicker';
import { Pagination, Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import MobileColorPicker from '../../../components/mobile/modals/mobileColorPicker/mobileColorPicker';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import { chipActionsType } from '../../../types/ui/uiTypes';
import ChipButtons from '../../../components/htmlElements/buttons/chipButton/chipButton';
import { getNewShopName, getNewShopAvatar } from "../../../store/selectors";

const Color: NextPage = () => {
	const activeStep = '3';
	const dispatch = useAppDispatch();
	// Redux states
	const shopName = useAppSelector(getNewShopName);
	const shopAvatar = useAppSelector(getNewShopAvatar);

	const [preview, setPreview] = useState<ArrayBuffer | null>(null);

	// Load color code
	// let colorCodeInitial: string | undefined = undefined;
	const [colorCode, setColorCode] = useState<string | null>(null);

	// Load bg color code
	// let bgcolorCodeInitial: string | undefined = undefined;
	const [bgColorCode, setBgColorCode] = useState<string | null>(null);
	// Border
	const [border, setborder] = useState<string>('');
	// Gray Message Icon
	const [messageIcon, setMessageIcon] = useState<string>(MessageIconSVG);
	// Gray contact Icon
	const [contactIcon, setContactIcon] = useState<string>(ContactIconSVG);
	// Icon color
	// type IconColorType = 'gray' | 'black' | 'white';
	const [iconColor, setIconColor] = useState<IconColorType>('black');
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
	useEffect(() => {
		if (shopAvatar) {
			setPreview(shopAvatar);
		}
	}, [shopAvatar]);

	const colorHandler = (_bgColorCode: string | null, _colorCode: string | null) => {
		if (_colorCode && _bgColorCode) {
			cookiesPoster('/cookies', { border: border }).then(() => {
				cookiesPoster('/cookies', { icon_color: iconColor }).then();
			});
			// _bgColorCode & _colorCode are reversed for this action.
			dispatch(setShopColorAction(_bgColorCode, _colorCode, border, iconColor));
		}
	};

	const colors = [
		'#FF5D6B',
		'#FFA826',
		'#FED301',
		'#07CBAD',
		'#0274D7',
		'#8669FB',
		'#FF9DBF',
		'#CEB186',
		'#878E88',
		'#0D070B',
		'#F3DCDC',
		'#FFD9A2',
		'#F8F2DA',
		'#DBF4EA',
		'#DBE8F4',
		'#D5CEEE',
		'#F3D8E1',
		'#EBD2AD',
		'#E2E4E2',
		'#FFFFFF',
	];
	const whiteTextColors = ['#FF5D6B', '#0274D7', '#8669FB', '#878E88', '#0D070B'];
	const whiteText = '#FFFFFF';
	const blackText = '#0D070B';

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

	return (
		<>
			<LeftSideBar step={activeStep} />
			<main className={Styles.main}>
				<div>
					<DesktopTopNavigationBar backHref="/shop/add/avatar" returnButton />
					<MobileTopNavigationBar backHref="/shop/add/avatar" returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Choisir une couleur" HelpText="Les couleurs et leurs valeurs" />
					<CardSection>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} preview={preview} active={false} />
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
						<div className={Styles.desktopContainerModal}>
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
						<div>
							<div className={Styles.mobileContainerModal}>
								<Swiper
									pagination={{
										clickable: true,
										enabled: true,
										bulletActiveClass: 'activekBullet',
										clickableClass: 'paginationBullet',
									}}
									modules={[Navigation, Pagination, Lazy]}
									scrollbar={{ enabled: false }}
									className={Styles.mobileSwiper}
								>
									<SwiperSlide className={Styles.swiperSlide}>
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
									<SwiperSlide className={Styles.swiperSlide}>
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
								<div className={`${Styles.primaryButtonMobileWrapper} ${Styles.primaryButtonZindexWrapper}`}>
									<PrimaryAnchorButton
										buttonText="Continuer"
										active={colorCode !== undefined && bgColorCode !== undefined}
										onClick={() => colorHandler(bgColorCode, colorCode)}
										nextPage="/shop/add/font"
									/>
								</div>
							</div>
						</div>
					</CardSection>
					<div className={`${Styles.primaryButtonDesktopWrapper} ${Styles.primaryButtonZindexWrapper}`}>
						<PrimaryAnchorButton
							buttonText="Continuer"
							active={colorCode !== undefined && bgColorCode !== undefined}
							onClick={() => colorHandler(bgColorCode, colorCode)}
							nextPage="/shop/add/font"
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Color;
