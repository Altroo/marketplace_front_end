import { NextPage } from 'next';
import LeftSideBar from '../../../components/shop/add/leftSideBar/leftSideBar';
import DesktopTopNavigationBar from '../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import Styles from '../../../styles/shop/add/shopAddShared.module.sass';
import MobileStepsBar from '../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../components/headers/helperH1Header/helperH1Header';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import React, { useEffect, useState } from 'react';
import { setShopNameAction } from '../../../store/actions/shop/shopActions';
import { cookiesPoster } from '../../../store/services/_init/_initAPI';
import MobileTopNavigationBar from '../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import { getNewShopName } from '../../../store/selectors';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ShopNameField from '../../../components/formikElements/shop/add/index/shopNameField/shopNameField';
import { Box } from '@mui/material';
import { useRouter } from "next/router";
import PrimaryButton from "../../../components/htmlElements/buttons/primaryButton/primaryButton";
import { INPUT_REQUIRED, INPUT_MIN, INPUT_MAX } from "../../../utils/formValidationErrors";

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
		router.replace('/shop/add/avatar').then();
	};

	const shopNameSchema = Yup.object().shape({
		shop_name: Yup.string()
			.min(2, INPUT_MIN(2))
			.max(50, INPUT_MAX(50))
			.required(INPUT_REQUIRED),
	});

	return (
		<>
			<LeftSideBar step={activeStep} />
			<main className={Styles.main}>
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref="/shop/add" />
					<MobileTopNavigationBar backHref="/shop/add" />
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
								<ShopNameField
									id="shop_name"
									placeholder="Ma boutique"
									value={values.shop_name}
									onChange={handleChange('shop_name')}
									onBlur={handleBlur('shop_name')}
									helperText={touched.shop_name ? errors.shop_name : ''}
									error={touched.shop_name && Boolean(errors.shop_name)}
									type="text"
									fullWidth={true}
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
