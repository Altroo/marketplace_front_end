import React, { useEffect, useState } from 'react';
import Styles from '../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DefaultCardSection from '../../../components/htmlElements/cards/defaultCardSection/defaultCardSection';
import { setShopAvatarAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/groupedComponents/shop/create/avatarShopNameRating/avatarShopNameRating';
import IconAnchorButton from '../../../components/htmlElements/buttons/iconAnchorButton/iconAnchorButton';
import MessageIconSVG from '../../../public/assets/svgs/globalIcons/message.svg';
import CallIconSVG from '../../../public/assets/svgs/globalIcons/call.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/globalIcons/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import { NextPage } from 'next';
import DisabledFilterDropDown from '../../../components/groupedComponents/shop/create/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/inputs/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/iosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/groupedComponents/shop/create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import ChipButtons from '../../../components/htmlElements/buttons/chipButton/chipButton';
import { chipActionsType } from '../../../types/ui/uiTypes';
import { getNewShopName, getNewShopAvatar } from "../../../store/selectors";
import { SHOP_ADD_SHOP_NAME, SITE_ROOT } from "../../../utils/routes";
import PrimaryButton from "../../../components/htmlElements/buttons/primaryButton/primaryButton";
import { useRouter } from "next/router";

const Avatar: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const router = useRouter();
	const shopName = useAppSelector(getNewShopName);
	const shopAvatar = useAppSelector(getNewShopAvatar);

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
		const reader = new FileReader();
		if (avatar) {
			reader.onloadend = () => {
				setPreview(reader.result);
				cookiesPoster('/cookies', { avatar: 1 }).then();
			};
			reader.readAsDataURL(avatar);
		} else {
			setPreview(avatarInitial);
		}
	}, [avatarInitial, avatar]);

	const avatarHandler = (avatar: string | ArrayBuffer | null) => {
		if (avatar) {
			dispatch(setShopAvatarAction(avatar, router));
		}
	};

	return (
		<>
			<LeftSideBar step={activeStep} which="SHOP" />
			<main className={Styles.main}>
				<div>
					<DesktopTopNavigationBar backHref={SHOP_ADD_SHOP_NAME} returnButton closeButtonHref={SITE_ROOT}/>
					<MobileTopNavigationBar backHref={SHOP_ADD_SHOP_NAME} returnButton closeButtonHref={SITE_ROOT} />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Ajouter un avatar" HelpText="Bien choisir sa photo de profil" />
					<DefaultCardSection>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} setAvatar={setAvatar} preview={preview} active />
							<div className={Styles.actionsWrapper}>
								<IconAnchorButton buttonText="Message" svgIcon={MessageIconSVG} />
								<IconAnchorButton buttonText="Contacter" svgIcon={CallIconSVG} />
							</div>
						</div>
						<div className={Styles.shopDetailsWrapper}>
							<div className={Styles.shopTabs}>
								<DisactivatedTab active text="BOUTIQUE" selected={false} />
								<DisactivatedTab active={false} text="INFOS" />
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
										<IosSwitch disabled checked={false}/>
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
					</DefaultCardSection>
				</div>
				<div className={Styles.primaryButtonWrapper}>
					<PrimaryButton
						buttonText="Continuer"
						active={preview !== null}
						onClick={() => avatarHandler(preview)}
						type="submit"
					/>
				</div>
			</main>
		</>
	);
};

export default Avatar;
