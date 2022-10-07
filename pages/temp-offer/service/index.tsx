import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../styles/temp-offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import CategoriesList from '../../../components/groupedComponents/temp-offer/categoriesList/categoriesList';
import { Stack, Box } from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { getLocalOfferServiceCategories } from "../../../store/selectors";
import PrimaryAnchorButton from '../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import {
	TEMP_OFFER_ADD_SERVICE_DESCRIPTION,
	TEMP_OFFER_ADD_INDEX,
	TEMP_SHOP_ADD_SHOP_NAME,
	TEMP_SHOP_LINK_ROUTE
} from "../../../utils/routes";
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';

const Index: NextPage = () => {
	const pickedCategories = useAppSelector(getLocalOfferServiceCategories);
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
			<main className={SharedStyles.fullPageNoOverflowMain}>
				<LeftSideBar step={activeStep} which="SERVICE" />
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar
						backHref={TEMP_OFFER_ADD_INDEX}
						returnButton
						closeButtonHref={TEMP_SHOP_LINK_ROUTE}
					/>
					<MobileTopNavigationBar
						backHref={TEMP_OFFER_ADD_INDEX}
						returnButton
						closeButtonHref={TEMP_SHOP_LINK_ROUTE}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Choisissez une ou plusieurs catégories"
						HelpText="Bien choisir ses catégories"
						headerClasses={Styles.topHeader}
					/>
					<Stack direction="column" className={Styles.stackWrapper} justifyContent="space-between">
						<CategoriesList offerType="S"/>
					</Stack>
					<div className={SharedStyles.primaryButtonWrapper}>
						<PrimaryAnchorButton
							buttonText="Continuer"
							active={isValid}
							nextPage={TEMP_OFFER_ADD_SERVICE_DESCRIPTION}
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
			if (response.status === 200) {
				// user has shop - proceed to add service
				if (response.data.has_shop) {
					return {
						props: {},
					};
				} else {
					// user don't own a shop - proceed to create one.
					return {
						redirect: {
							permanent: false,
							destination: TEMP_SHOP_ADD_SHOP_NAME,
						},
					};
				}
			} else {
				// user not authenticated
				return {
					redirect: {
						permanent: false,
						destination: TEMP_SHOP_ADD_SHOP_NAME,
					},
				};
			}
		}
	} catch (e) {
		// fall back error
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
}

export default Index;
