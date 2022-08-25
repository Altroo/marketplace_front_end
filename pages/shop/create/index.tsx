import { NextPage } from 'next';
import LeftSideBar from '../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import Styles from '../../../styles/shop/create/shopCreateShared.module.sass';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import React, { useEffect, useState } from 'react';
import { setShopNameAction } from '../../../store/actions/shop/shopActions';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { getNewShopName } from '../../../store/selectors';
import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import { useRouter } from "next/router";
import PrimaryButton from "../../../components/htmlElements/buttons/primaryButton/primaryButton";
import { shopNameSchema } from "../../../utils/formValidationSchemas";
import { SHOP_ADD_AVATAR, SHOP_ADD_SHOP_NAME } from "../../../utils/routes";
import { shopNameTextInputTheme } from "../../../utils/themes";
import CustomTextInput from "../../../components/formikElements/customTextInput/customTextInput";

const ShopName: NextPage = () => {
	const activeStep = '1';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const shopName = useAppSelector(getNewShopName);
	// redux states
	// page states
	const [inputShopName, setInputShopName] = useState<string>('');

	useEffect(() => {
		if (shopName) {
			setInputShopName(shopName);
		}
	}, [shopName]);

	const shopNameSubmitHandler = (value: string) => {
		cookiesPoster('/cookies', { shop_name: 1 }).then();
		dispatch(setShopNameAction(value));
		router.replace(SHOP_ADD_AVATAR).then();
	};
	const inputTheme = shopNameTextInputTheme();

	return (
		<>
			<LeftSideBar step={activeStep} which="SHOP" />
			<main className={Styles.main}>
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref={SHOP_ADD_SHOP_NAME} />
					<MobileTopNavigationBar backHref={SHOP_ADD_SHOP_NAME} />
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header header="Nommez votre boutique" HelpText="Comment choisir son nom ?" />
					<Formik
						enableReinitialize={true}
						initialValues={{
							shop_name: inputShopName,
						}}
						validateOnMount={true}
						validationSchema={shopNameSchema}
						onSubmit={(values) => shopNameSubmitHandler(values.shop_name)}>
						{({ handleChange,
								handleBlur,
								handleSubmit,
								values,
								touched,
								errors,
								isValid,
								isSubmitting}) => (
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
								<div className={Styles.primaryButtonWrapper}>
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

export default ShopName;
