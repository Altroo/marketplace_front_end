import React, { useEffect, useState } from 'react';
import Styles from '../../../styles/shop/add/avatar.module.sass';
import LeftSideBar from '../../../components/shop/add/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/HelperH1Header';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import PrimaryAnchorButton from '../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import CardSection from '../../../components/htmlElements/cards/cardSection/cardSection';
import { setShopAvatarAction } from '../../../store/actions/shop/shopActions';
import AvatarShopNameRating from '../../../components/shop/add/avatarShopNameRating/avatarShopNameRating';
import IconButton from '../../../components/htmlElements/buttons/iconButton/IconButton';
import MessageIconSVG from '../../../public/assets/svgs/message.svg';
import CallIconSVG from '../../../public/assets/svgs/call.svg';
import DisactivatedAddIconSVG from '../../../public/assets/svgs/gray-add.svg';
import { DisactivatedTab } from '../../../components/htmlElements/tabs/tab';
import { NextPage } from 'next';
import DisabledFilterDropDown from '../../../components/shop/add/disabledFilterDropDown/disabledFilterDropDown';
import IconTextInput from '../../../components/htmlElements/iconTextInput/iconTextInput';
import IosSwitch from '../../../components/htmlElements/switches/IosSwitch';
import CheckBox from '../../../components/htmlElements/checkBoxes/checkBox';
import CenteredInfoAction from '../../../components/shop/add/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../components/htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import ChipButtons from '../../../components/htmlElements/buttons/chipButton/chipButton';
import { chipActionsType } from '../../../types/ui/uiTypes';

const Avatar: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const shopName = useAppSelector((state) => state.shop.newShop.shop_name as string);
	const shopAvatar = useAppSelector((state) => state.shop.newShop.avatar as ArrayBuffer);

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
	}, [avatarInitial, dispatch, avatar]);

	const avatarHandler = (avatar: string | ArrayBuffer | null) => {
		if (avatar) {
			dispatch(setShopAvatarAction(avatar));
		}
	};

	return (
		<>
			<LeftSideBar step={activeStep} />
			<main className={Styles.main}>
				<div>
					<DesktopTopNavigationBar backHref="/shop/add" returnButton />
					<MobileTopNavigationBar backHref="/shop/add" returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Ajouter un avatar" HelpText="Bien choisir sa photo de profil" />
					<CardSection>
						<div className={Styles.avatarActionsWrapper}>
							<AvatarShopNameRating shopName={shopName} setAvatar={setAvatar} preview={preview} active />
							<div className={Styles.actionsWrapper}>
								<IconButton buttonText="Message" svgIcon={MessageIconSVG} />
								<IconButton buttonText="Contacter" svgIcon={CallIconSVG} />
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
										<IosSwitch disabled />
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
					</CardSection>
				</div>
				<div className={Styles.primaryButtonWrapper}>
					<PrimaryAnchorButton
						buttonText="Continuer"
						active={preview !== null}
						onClick={() => avatarHandler(preview)}
						nextPage="/shop/add/color"
					/>
				</div>
			</main>
		</>
	);
};

export default Avatar;
