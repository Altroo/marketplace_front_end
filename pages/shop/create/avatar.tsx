import React, { useEffect, useState } from 'react';
import Styles from './avatar.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DefaultCardSection from '../../../components/htmlElements/cards/defaultCardSection/defaultCardSection';
import { setShopAvatarAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/groupedComponents/temp-shop/create/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import CallIconSVG from '../../../public/assets/svgs/globalIcons/call.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/globalIcons/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import { GetServerSidePropsContext, NextPage } from 'next';
import DisabledFilterDropDown from '../../../components/groupedComponents/temp-shop/create/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/groupedComponents/temp-shop/create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { getApi } from '../../../store/services/_init/_initAPI';
import ChipButtons from '../../../components/htmlElements/buttons/chipButtons/chipButtons';
import { chipActionsType } from '../../../types/ui/uiTypes';
import { getNewShopName, getNewShopAvatar } from '../../../store/selectors';
import {
	REAL_SHOP_ADD_SHOP_NAME,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	AUTH_LOGIN,
	DASHBOARD,
	REAL_SHOP_ADD_COLOR
} from "../../../utils/routes";
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { Desktop, getServerSideCookieTokens, isAuthenticatedInstance } from "../../../utils/helpers";
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import ApiProgress from "../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress";
import { SagaCallBackOnCompleteBoolType } from "../../../types/_init/_initTypes";

const Avatar: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const router = useRouter();
	const shopName = useAppSelector(getNewShopName);
	const shopAvatar = useAppSelector(getNewShopAvatar);
	const [isApiCallInProgress, setIsApiCallInProgress] = useState<boolean>(false);

	let avatarInitial: string | ArrayBuffer | null = null;
	if (shopAvatar) {
		avatarInitial = shopAvatar;
	}

	const [preview, setPreview] = useState<string | ArrayBuffer | null>(avatarInitial);
	const [avatar, setAvatar] = useState<File | null>(null);
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
		if (!shopName) {
			router.replace(REAL_SHOP_ADD_SHOP_NAME).then();
		}
		const reader = new FileReader();
		if (avatar) {
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(avatar);
		} else {
			setPreview(avatarInitial);
		}
	}, [avatarInitial, avatar, shopName, router]);

	const avatarHandler = (avatar: string | ArrayBuffer | null) => {
		if (avatar) {
			setIsApiCallInProgress(true);
			const action = setShopAvatarAction(avatar);
			dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
				if (!error && !cancelled && data) {
					router.push(REAL_SHOP_ADD_COLOR).then(() => {
						setIsApiCallInProgress(false);
					})
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
				<Box className={Styles.rootBox}>
					<DesktopTopNavigationBar backHref={REAL_SHOP_ADD_SHOP_NAME} returnButton closeButtonHref={DASHBOARD} />
					<MobileTopNavigationBar backHref={REAL_SHOP_ADD_SHOP_NAME} returnButton closeButtonHref={DASHBOARD} />
					<MobileStepsBar activeStep={activeStep} />
					<Box className={Styles.marginLeft}>
						<HelperH1Header
							header="Ajoutez un avatar"
							HelpText="Ajoutez le logo de votre marque ou une photo de vous"
						/>
					</Box>
					<DefaultCardSection cssClass={Styles.cardSection}>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} setAvatar={setAvatar} preview={preview} active />
							<div className={Styles.actionsWrapper}>
								<IconAnchorButton buttonText="Contacter" svgIcon={CallIconSVG} cssClass={Styles.contacterButton} />
							</div>
						</div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<DisactivatedTab active text="BOUTIQUE" selected={false} />
								<DisactivatedTab active={false} text="INFOS" />
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
					</DefaultCardSection>
					<div className={`${Styles.primaryButtonWrapper} ${Styles.marginButtonBottom}`}>
						<PrimaryButton
							buttonText="Continuer"
							active={preview !== null}
							onClick={() => avatarHandler(preview)}
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

export default Avatar;
