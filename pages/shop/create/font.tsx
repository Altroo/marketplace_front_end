import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Styles from '../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DefaultCardSection from '../../../components/htmlElements/cards/defaultCardSection/defaultCardSection';
import { setShopFontAction, shopPostRootAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/groupedComponents/temp-shop/create/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import MessageIconSVG from '../../../public/assets/svgs/globalIcons/message.svg';
import MessageIconWhiteSVG from '../../../public/assets/svgs/globalIcons/message-white.svg';
import MessageIconBlackSVG from '../../../public/assets/svgs/globalIcons/message-black.svg';
import ContactIconSVG from '../../../public/assets/svgs/globalIcons/call.svg';
import ContactIconWhiteSVG from '../../../public/assets/svgs/globalIcons/call-white.svg';
import ContactIconBlackSVG from '../../../public/assets/svgs/globalIcons/call-black.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/globalIcons/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import DisabledFilterDropDown from '../../../components/groupedComponents/temp-shop/create/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/groupedComponents/temp-shop/create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { ShopFontNameType } from '../../../types/shop/shopTypes';
import FontPicker from '../../../components/groupedComponents/temp-shop/create/fontPicker/fontPicker';
import { cookiesPoster, getApi } from '../../../store/services/_init/_initAPI';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import ChipButtons from '../../../components/htmlElements/buttons/chipButtons/chipButtons';
import { chipActionsType } from '../../../types/ui/uiTypes';
import {
	getNewShopName,
	getNewShopAvatar,
	getNewShopColorCode,
	getNewShopBgColorCode,
	getNewShopFontName,
	getNewShopBorder,
	getNewShopIconColor,
} from '../../../store/selectors';
import { REAL_SHOP_ADD_COLOR, SITE_ROOT, REAL_SHOP_BY_SHOP_LINK_ROUTE, AUTH_LOGIN } from '../../../utils/routes';
import { getCookie } from 'cookies-next';
import { Box } from '@mui/material';
import { SagaCallBackOnCompleteStrType } from '../../../types/_init/_initTypes';
import { getServerSideCookieTokens, isAuthenticatedInstance, setFormikAutoErrors } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';

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
	const [isApiCallInProgress, setIsApiCallInProgress] = useState<boolean>(false);

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
			setIsApiCallInProgress(true);
			dispatch(setShopFontAction(font));
			const action = shopPostRootAction(
				shopName,
				shopAvatar,
				shopBgColorCode,
				shopColorCode,
				shopBorder,
				shopIconColor,
				font,
			);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteStrType) => {
					if (!error && !cancelled && data) {
						const url: string = REAL_SHOP_BY_SHOP_LINK_ROUTE(data as string);
						router
							.replace({ query: { created: 'true' }, pathname: url }, undefined)
							.then(() => {
								setIsApiCallInProgress(false);
							});
					}
				},
			});
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
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref={REAL_SHOP_ADD_COLOR} returnButton closeButtonHref={SITE_ROOT} />
					<MobileTopNavigationBar backHref={REAL_SHOP_ADD_COLOR} returnButton closeButtonHref={SITE_ROOT} />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Choisir une police" HelpText="L'importance d'un type de police" />
					<DefaultCardSection>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} preview={preview} font={fontName} active={false} />
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
								<DisactivatedTab active text="BOUTIQUE" selected={false} borderColor={bgColorCode} color={blackText} />
								<DisactivatedTab active={false} text="INFOS" borderColor={bgColorCode} color={blackText} />
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
							<div className={Styles.shopAddOfferWrapper}>
								<div className={Styles.addOfferContainer}>
									<div className={Styles.centeredInfoActionWrapper}>
										<CenteredInfoAction header="Démarrer votre boutique" subHeader="Ajoutez votre premier article !" />
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
								<div className={`${Styles.primaryButtonMobileWrapper} ${Styles.primaryButtonZindexWrapper}`}>
									<PrimaryButton
										buttonText="Continuer"
										active={fontName !== undefined}
										onClick={() => fontHandler(fontName)}
									/>
								</div>
							</div>
						</div>
					</DefaultCardSection>
					<div
						className={`${Styles.primaryButtonDesktopWrapper} ${Styles.miniMarginButtonBottom} ${Styles.primaryButtonZindexWrapper}`}
					>
						<PrimaryButton
							buttonText="Continuer"
							active={fontName !== undefined}
							onClick={() => fontHandler(fontName)}
						/>
					</div>
				</Box>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const color_code = getCookie('@color_code', { req: context.req, res: context.res });
	const bg_color_code = getCookie('@bg_color_code', { req: context.req, res: context.res });
	// redirect if user already logged in
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
				// connected no shop created yet - proceed to create.
				if (!color_code && !bg_color_code) {
					return {
						redirect: {
							permanent: false,
							destination: REAL_SHOP_ADD_COLOR,
						},
					};
				}
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

export default Font;
