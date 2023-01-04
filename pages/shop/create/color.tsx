import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './color.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DefaultCardSection from '../../../components/htmlElements/cards/defaultCardSection/defaultCardSection';
import { setShopColorAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/groupedComponents/temp-shop/create/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
// import MessageIconSVG from '../../../public/assets/svgs/globalIcons/message.svg';
// import MessageIconWhiteSVG from '../../../public/assets/svgs/globalIcons/message-white.svg';
// import MessageIconBlackSVG from '../../../public/assets/svgs/globalIcons/message-black.svg';
import ContactIconSVG from '../../../public/assets/svgs/globalIcons/call.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/globalIcons/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/globalIcons/call-black.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/globalIcons/gray-add.svg';
import { IconColorType, SagaCallBackOnCompleteBoolType } from '../../../types/_init/_initTypes';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import DisabledFilterDropDown from '../../../components/groupedComponents/temp-shop/create/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/groupedComponents/temp-shop/create/centeredInfoAction/centeredInfoAction';
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
import { getApi } from '../../../store/services/_init/_initAPI';
import { chipActionsType } from '../../../types/ui/uiTypes';
import ChipButtons from '../../../components/htmlElements/buttons/chipButtons/chipButtons';
import { getNewShopName, getNewShopAvatar } from '../../../store/selectors';
import {
	DASHBOARD,
	REAL_SHOP_ADD_AVATAR,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	AUTH_LOGIN,
	REAL_SHOP_ADD_FONT,
} from '../../../utils/routes';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { Desktop, getServerSideCookieTokens, isAuthenticatedInstance, TabletAndMobile } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';

export const colors = [
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

const Color: NextPage = () => {
	const activeStep = '3';
	const dispatch = useAppDispatch();
	const router = useRouter();
	// Redux states
	const shopName = useAppSelector(getNewShopName);
	const shopAvatar = useAppSelector(getNewShopAvatar);
	const [isApiCallInProgress, setIsApiCallInProgress] = useState<boolean>(false);
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
	// const [messageIcon, setMessageIcon] = useState<string>(MessageIconSVG);
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
		} else {
			router.replace(REAL_SHOP_ADD_AVATAR).then();
		}
	}, [shopAvatar, router]);

	const colorHandler = (_bgColorCode: string | null, _colorCode: string | null) => {
			if (_colorCode && _bgColorCode) {
				setIsApiCallInProgress(true);
				// _bgColorCode & _colorCode are reversed for this action.
				const action = setShopColorAction(_bgColorCode, _colorCode, border, iconColor);
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
						if (!error && !cancelled && data) {
							router.push(REAL_SHOP_ADD_FONT).then(() => {
								setIsApiCallInProgress(false);
							});
						}
					},
				});
			}
		};

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
				// setMessageIcon(MessageIconWhiteSVG);
				setIconColor('white');
				if (color === blackText) {
					setColorCode(whiteText);
				}
				// else apply black text color
			} else {
				setContactIcon(ContactIconBlackSVG);
				// setMessageIcon(MessageIconBlackSVG);
				setIconColor('black');
				setColorCode(blackText);
			}
		};

	return (
		<>
			{isApiCallInProgress && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			<main className={Styles.main}>
				<LeftSideBar step={activeStep} which="SHOP" />
				<Box className={Styles.rootBox}>
					<DesktopTopNavigationBar backHref={REAL_SHOP_ADD_AVATAR} returnButton closeButtonHref={DASHBOARD} />
					<MobileTopNavigationBar backHref={REAL_SHOP_ADD_AVATAR} returnButton closeButtonHref={DASHBOARD} />
					<MobileStepsBar activeStep={activeStep} />
					<Box className={Styles.marginLeft}>
						<HelperH1Header
							header="Choisissez une couleur"
							HelpText="Choisissez une couleur selon l'univers de votre marque"
						/>
					</Box>
					<DefaultCardSection cssClass={Styles.cardSection}>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} preview={preview} active={false} />
							<div className={Styles.actionsWrapper}>
								<IconAnchorButton
									buttonText="Contacter"
									svgIcon={contactIcon}
									backgroundColor={bgColorCode}
									textColor={colorCode}
									border={border}
									cssClass={Styles.contacterButton}
								/>
							</div>
						</div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<DisactivatedTab active text="BOUTIQUE" selected={false} borderColor={bgColorCode} color={blackText} />
								<DisactivatedTab active={false} text="INFOS" borderColor={bgColorCode} color={blackText} />
							</div>
						</div>
						<Desktop>
							<div className={Styles.filterWrapper}>
								<span className={Styles.filterText}>Filtrer</span>
								<DisabledFilterDropDown text="Trier : Prix décroissant" />
							</div>
						</Desktop>

						<div className={Styles.shopDetailsAside}>
							<Desktop>
								<div className={Styles.shopFilterWrapper}>
									<IconTextInput active={false} placeholder="Rechercher" />
									<div className={Styles.shopFilterContainer}>
										<span className={Styles.subHeader}>Catégories</span>
										<div className={Styles.categoriesWrapper}>
											<ChipButtons actions={chipCategoriesAction} />
										</div>
										<div className={Styles.promoWrapper}>
											<span className={Styles.subHeader}>En Promo</span>
											<IosSwitch disabled checked={false} labelcssStyles={{ paddingLeft: '10px' }} />
										</div>
										<div className={Styles.forWhomWrapper}>
											<span className={Styles.subHeader}>Pour qui</span>
											<div>
												<div>
													<CheckBox checked={false} active={false} text="Enfant" labelcssStyles={{ paddingLeft: 0 }} />
													<CheckBox checked active={false} text="Femme" labelcssStyles={{ paddingLeft: 0 }} />
													<CheckBox checked active={false} text="Homme" labelcssStyles={{ paddingLeft: 0 }} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</Desktop>

							<div className={Styles.shopAddOfferWrapper}>
								<div className={Styles.addOfferContainer}>
									<div className={Styles.centeredInfoActionWrapper}>
										<CenteredInfoAction
											header="Démarrer votre boutique"
											subHeader="Ajoutez votre premier article !"
											cssHeaderClass={Styles.disabled}
											cssSubHeaderClass={Styles.disabled}
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
						<Desktop>
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
						</Desktop>
						<div>
							<TabletAndMobile>
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
									<TabletAndMobile>
										<div className={Styles.primaryButtonCreateZindexWrapper}>
											<PrimaryButton
												cssClass={Styles.primaryButton}
												buttonText="Continuer"
												active={colorCode !== undefined && bgColorCode !== undefined}
												onClick={() => colorHandler(bgColorCode, colorCode)}
											/>
										</div>
									</TabletAndMobile>
								</div>
							</TabletAndMobile>
						</div>
					</DefaultCardSection>
					<div
						className={`${Styles.primaryButtonWrapper} ${Styles.marginButtonBottom} ${Styles.primaryButtonCreateZindexWrapper}`}
					>
						<PrimaryButton
							buttonText="Continuer"
							active={colorCode !== undefined && bgColorCode !== undefined}
							onClick={() => colorHandler(bgColorCode, colorCode)}
						/>
					</div>
				</Box>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200 && typeof response.data.shop_url === 'string') {
				return {
					// connected already has shop.
					redirect: {
						permanent: false,
						destination: REAL_SHOP_BY_SHOP_LINK_ROUTE(response.data.shop_url),
					},
				};
			} else {
				return {
					props: {},
				};
			}
		} else {
			// not connected, status unknown
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		// fallback case.
		return {
			redirect: {
				permanent: false,
				destination: AUTH_LOGIN,
			},
		};
	}
}

export default Color;
