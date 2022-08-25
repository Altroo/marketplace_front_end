import React from 'react';
import { NextPage } from 'next';
import Styles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, Stack } from '@mui/material';
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { OFFER_ADD_PRODUCT_CATEGORIES } from '../../../../utils/routes';
import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import PrimaryAnchorButton from '../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import HelperDescriptionHeader from '../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import { Form, Formik } from 'formik';
// import ApiProgress from '../../../../components/formikElements/apiResponse/apiProgress/apiProgress';
// import ApiAlert from '../../../../components/formikElements/apiResponse/apiAlert/apiAlert';
import CustomTextInput from "../../../../components/formikElements/customTextInput/customTextInput";
import { offerTitleTextInputTheme } from "../../../../utils/themes";

const Description: NextPage = () => {
	const activeStep = '2';

	const addDescriptionSubmitHandler = (values: unknown) => {
			console.log('');
	};

	const titleFieldTheme = offerTitleTextInputTheme();
	return (
		<>
			<LeftSideBar step={activeStep} which="PRODUCT" />
			<main className={SharedStyles.main}>
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar backHref={OFFER_ADD_PRODUCT_CATEGORIES} returnButton />
					<MobileTopNavigationBar backHref={OFFER_ADD_PRODUCT_CATEGORIES} returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperDescriptionHeader
						header="Décrivez votre offre"
						description="Commencez par lui donnez un titre, une description et ajoutez quelques photos."
						HelpText="Apprendre à créer une offre"
					/>
					<Stack direction="column" justifyContent="space-between">
						<Formik
							enableReinitialize={true}
							initialValues={{
								title: '',

							}}
							validateOnMount={true}
							// validationSchema={shopBioSchema}
							onSubmit={(values) => addDescriptionSubmitHandler(values)}
						>
							{({
								handleChange,
								handleBlur,
								handleSubmit,
								values,
								touched,
								errors,
								isValid,
								isSubmitting,
							}) => (
								<Form>
									<Stack
										direction="column"
										spacing={1}>
										<CustomTextInput
											id="title"
											label="Titre"
											value={values.title ? values.title: ''}
											onChange={handleChange('title')}
											onBlur={handleBlur('title')}
											helperText={touched.title ? errors.title : ''}
											error={touched.title && Boolean(errors.title)}
											theme={titleFieldTheme}
											fullWidth={false}
											size="medium"
											type="text"
											cssClass={Styles.titleTextField}
										/>
									</Stack>
								</Form>
							)}
						</Formik>
					</Stack>
					<div className={SharedStyles.primaryButtonWrapper}>
						<PrimaryAnchorButton buttonText="Continuer" active={true} nextPage="#" />
					</div>
				</Box>
			</main>
		</>
	);
};

export default Description;
