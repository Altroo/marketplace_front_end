import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../../styles/temp-offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../../styles/temp-shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import MobileTopNavigationBar from '../../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../../../components/headers/helperH1Header/helperH1Header';
import CategoriesList from '../../../../../components/groupedComponents/temp-offer/categoriesList/categoriesList';
import { Stack, Box } from '@mui/material';
import { useAppSelector } from '../../../../../utils/hooks';
import { getLocalOfferProductCategories } from '../../../../../store/selectors';
import PrimaryAnchorButton from '../../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import {
	REAL_SHOP_LINK_ROUTE,
	REAL_OFFER_ADD_INDEX,
	REAL_OFFER_ADD_PRODUCT_DESCRIPTION,
	TEMP_SHOP_ADD_SHOP_NAME,
} from '../../../../../utils/routes';
import { useRouter } from 'next/router';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../../../types/account/accountTypes';
import { getApi } from '../../../../../store/services/_init/_initAPI';

const Index: NextPage = () => {
	const router = useRouter();
	const pickedCategories = useAppSelector(getLocalOfferProductCategories);
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
				<LeftSideBar step={activeStep} which="PRODUCT" />
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar
						backHref={REAL_OFFER_ADD_INDEX(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_SHOP_LINK_ROUTE(router.query.shop_link as string)}
					/>
					<MobileTopNavigationBar
						backHref={REAL_OFFER_ADD_INDEX(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_SHOP_LINK_ROUTE(router.query.shop_link as string)}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Choisissez une ou plusieurs catégories"
						HelpText="Bien choisir ses catégories"
						headerClasses={Styles.topHeader}
					/>
					<Stack direction="column" className={Styles.stackWrapper} justifyContent="space-between">
						<CategoriesList offerType="V" />
					</Stack>
					<div className={SharedStyles.primaryButtonWrapper}>
						<PrimaryAnchorButton
							buttonText="Continuer"
							active={isValid}
							nextPage={REAL_OFFER_ADD_PRODUCT_DESCRIPTION(router.query.shop_link as string)}
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
				// user has shop - proceed to add offer
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
