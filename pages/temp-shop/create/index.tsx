import { GetServerSidePropsContext, NextPage } from 'next';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import Styles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import React, { useEffect, useState } from 'react';
import { setShopNameAction } from '../../../store/actions/shop/shopActions';
import { cookiesPoster, getApi } from '../../../store/services/_init/_initAPI';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { getNewShopName } from '../../../store/selectors';
import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { shopNameSchema } from '../../../utils/formValidationSchemas';
import {
	TEMP_SHOP_ADD_SHOP_NAME,
	SITE_ROOT,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	AUTH_LOGIN,
	NOT_FOUND_404,
} from '../../../utils/routes';
import { shopNameTextInputTheme } from '../../../utils/themes';
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';

const ShopName: NextPage = () => {
	const activeStep = '1';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const shopName = useAppSelector(getNewShopName);
	// const userHasShop = useAppSelector(getCheckUserHasShop);
	// const userShopUrl = useAppSelector(getUserShopUrl);
	// redux states
	// page states
	const [inputShopName, setInputShopName] = useState<string>('');

	useEffect(() => {
		// if (userHasShop && userShopUrl) {
		// 	router.replace(REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string), undefined, { shallow: true }).then();
		// }
		if (shopName) {
			setInputShopName(shopName);
		}
	}, [router, shopName]);

	const shopNameSubmitHandler = (value: string) => {
		cookiesPoster('/cookies', { shop_name: 1 }).then(() => {
			dispatch(setShopNameAction(value, router));
		});
	};
	const inputTheme = shopNameTextInputTheme();

	return (
		<>
			<main className={Styles.fullPageNoOverflowMain}>
				<LeftSideBar step={activeStep} which="SHOP" />
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref={TEMP_SHOP_ADD_SHOP_NAME} closeButtonHref={SITE_ROOT} />
					<MobileTopNavigationBar backHref={TEMP_SHOP_ADD_SHOP_NAME} closeButtonHref={SITE_ROOT} />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Nommez votre boutique" HelpText="Comment choisir son nom ?" />
					<Formik
						enableReinitialize={true}
						initialValues={{
							shop_name: inputShopName,
						}}
						validateOnMount={true}
						validationSchema={shopNameSchema}
						onSubmit={(values) => shopNameSubmitHandler(values.shop_name)}
					>
						{({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, isSubmitting }) => (
							<Form className={Styles.shopNameForm}>
								<CustomTextInput
									id="shop_name"
									placeholder="Ma boutique"
									value={values.shop_name}
									onChange={handleChange('shop_name')}
									onBlur={handleBlur('shop_name')}
									helperText={touched.shop_name ? errors.shop_name : ''}
									error={touched.shop_name && Boolean(errors.shop_name)}
									type="text"
									fullWidth={true}
									theme={inputTheme}
									size="medium"
									cssClass={Styles.customTextField}
								/>
								<div className={`${Styles.primaryButtonWrapper} ${Styles.marginButtonBottom}`}>
									<PrimaryButton
										buttonText="Continuer"
										active={isValid && !isSubmitting}
										onClick={handleSubmit}
										type="submit"
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Box>
			</main>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
				return {
					props: {},
				};
			}
		} else {
			// not connected, status unknown
			return {
				props: {},
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

export default ShopName;
