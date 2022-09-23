import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
import Styles from '../../../../styles/temp-offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../styles/temp-shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../../components/headers/helperH1Header/helperH1Header';
import CategoriesList from '../../../../components/groupedComponents/temp-offer/categoriesList/categoriesList';
import { Stack, Box } from '@mui/material';
import { useAppSelector } from '../../../../utils/hooks';
import { getLocalOfferCategories } from '../../../../store/selectors';
import PrimaryAnchorButton from "../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton";
import {
	TEMP_OFFER_ADD_INDEX,
	TEMP_OFFER_ADD_PRODUCT_DESCRIPTION,
	TEMP_SHOP_ADD_SHOP_NAME,
	TEMP_SHOP_EDIT_INDEX
} from "../../../../utils/routes";
import { getCookie } from "cookies-next";

const Index: NextPage = () => {
	const pickedCategories = useAppSelector(getLocalOfferCategories);
	const activeStep = '1';
	const [isValid, setIsValid] = useState<boolean>(false);

	useEffect(() => {
		if (pickedCategories.length > 0) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [pickedCategories.length]);

	return (
		<>
			<LeftSideBar step={activeStep} which="PRODUCT" />
			<main className={SharedStyles.main}>
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref={TEMP_OFFER_ADD_INDEX} returnButton closeButtonHref={TEMP_SHOP_EDIT_INDEX} />
					<MobileTopNavigationBar backHref={TEMP_OFFER_ADD_INDEX} returnButton closeButtonHref={TEMP_SHOP_EDIT_INDEX} />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Choisissez une ou plusieurs catégories"
						HelpText="Bien choisir ses catégories"
						headerClasses={Styles.topHeader}
					/>
					<Stack direction="column" className={Styles.stackWrapper} justifyContent="space-between">
						<CategoriesList />
					</Stack>
					<div className={SharedStyles.primaryButtonWrapper}>
						<PrimaryAnchorButton buttonText="Continuer" active={isValid} nextPage={TEMP_OFFER_ADD_PRODUCT_DESCRIPTION} />
					</div>
				</Box>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
	return {
		props: {},
	}
}

export default Index;
