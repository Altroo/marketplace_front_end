import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { default as ImageFuture } from 'next/future/image';
import Styles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Stack } from '@mui/material';
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { OFFER_ADD_PRODUCT_CATEGORIES } from '../../../../utils/routes';
import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import PrimaryAnchorButton from '../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import HelperDescriptionHeader from '../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import { Form, Formik } from 'formik';
// import ApiProgress from '../../../../components/formikElements/apiResponse/apiProgress/apiProgress';
// import ApiAlert from '../../../../components/formikElements/apiResponse/apiAlert/apiAlert';
import CustomTextInput from '../../../../components/formikElements/customTextInput/customTextInput';
import {
	bioTextAreaTheme,
	offerForWhomDropdownTheme,
	offerTitleTextInputTheme,
	offerTitleTooltipTheme,
} from '../../../../utils/themes';
import CustomToolTip from '../../../../components/htmlElements/toolTip/customToolTip';
import { ImageListType } from 'react-images-uploading/dist/typings';
import CustomSquareImageUploading from '../../../../components/formikElements/customSquareImageUploading/customSquareImageUploading';
import CustomCounterTextArea from '../../../../components/formikElements/customTextArea/customCounterTextArea';
import CustomDropDownChoices from '../../../../components/formikElements/customDropDownChoices/customDropDownChoices';
import { SelectChangeEvent } from '@mui/material/Select';
import ColorsRadioCheckContent from '../../../../components/groupedComponents/offer/radioCheckElement/colorsRadioCheckContent/colorsRadioCheckContent';
import { OfferColorsListType } from "../../../../types/ui/uiTypes";
import CreatorRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/creatorRadioCheckContent/creatorRadioCheckContent";
import SizesRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/sizesRadioCheckContent/sizesRadioCheckContent";
import QuantityRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/QuantityRadioCheckContent/quantityRadioCheckContent";

const Description: NextPage = () => {
	const activeStep = '2';
	const [titleTooltip, setTitleTooltip] = useState<boolean>(false);
	const [images, setImages] = useState<ImageListType>([]);
	const forWhom = ['Tout le monde', 'Enfant', 'Femme', 'Homme'];
	const [forWhomChoice, setForWhomChoice] = React.useState<Array<string>>([]);

	const availableColorsList: Array<OfferColorsListType> = [
		{
			code: 'BK',
			value: 'Noir',
			hex: '#0D070B',
		},
		{
			code: 'WT',
			value: 'Blanc',
			hex: '#FFFFFF',
		},
		{
			code: 'BR',
			value: 'Marron',
			hex: '#CEB186',
		},
		{
			code: 'BL',
			value: 'Bleu',
			hex: '#0274D7',
		},
		{
			code: 'GN',
			value: 'Vert',
			hex: '#07CBAD',
		},
		{
			code: 'PR',
			value: 'Violet',
			hex: '#8669FB',
		},
		{
			code: 'OR',
			value: 'Orange',
			hex: '#FFA826',
		},
		{
			code: 'PI',
			value: 'Rose',
			hex: '#FF9DBF',
		},
		{
			code: 'YE',
			value: 'Jaune',
			hex: '#FED301',
		},
		{
			code: 'GR',
			value: 'Gris',
			hex: '#D9D9DD',
		},
		{
			code: 'MC',
			value: 'Multicolore',
			hex: 'conic-gradient(from 70.34deg at 51.34% 50%, #9557FF -67.34deg, #FF5364 21.53deg, #FFFB45 108.58deg, #70FA67 180deg, #48C3FF 228.18deg, #9557FF 292.66deg, #FF5364 381.53deg)',
		},
		{
			code: 'RD',
			value: 'Rouge',
			hex: '#E12D3D',
		},
	];

	// on change images
	const imagesOnChangeHandler = (imageList: ImageListType, addUpdateIndex?: Array<number>) => {
		console.log(imageList);
		setImages(imageList);
	};

	// submit handler
	const addDescriptionSubmitHandler = (values: unknown) => {
		console.log('');
	};

	// on change for whom
	const forWhomHandleChange = (event: SelectChangeEvent<Array<string>>) => {
		const {
			target: { value },
		} = event;
		setForWhomChoice(typeof value === 'string' ? value.split(',') : value);
	};

	// themes
	const titleFieldTheme = offerTitleTextInputTheme();
	const titleTooltipTheme = offerTitleTooltipTheme();
	const descriptionFieldTheme = bioTextAreaTheme();
	const forWhomFieldTheme = offerForWhomDropdownTheme();
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
								description: '',
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
									<Stack direction="column" spacing={2}>
										<ClickAwayListener onClickAway={() => setTitleTooltip(false)}>
											<div>
												<CustomToolTip
													title="Soyez court et précis ! Comment écrire un titre ? En savoir plus"
													onClose={() => setTitleTooltip(false)}
													open={titleTooltip}
													theme={titleTooltipTheme}
												>
													<CustomTextInput
														id="title"
														label="Titre"
														value={values.title ? values.title : ''}
														onChange={handleChange('title')}
														onBlur={handleBlur('title')}
														helperText={touched.title ? errors.title : ''}
														error={touched.title && Boolean(errors.title)}
														theme={titleFieldTheme}
														fullWidth={false}
														size="medium"
														type="text"
														cssClass={Styles.titleTextField}
														onClick={() => setTitleTooltip(true)}
													/>
												</CustomToolTip>
											</div>
										</ClickAwayListener>
										<CustomSquareImageUploading
											images={images}
											onChange={imagesOnChangeHandler}
											maxNumber={4}
										/>
										<CustomCounterTextArea
											type="text"
											id="description"
											label="Description"
											value={values.description ? values.description : ''}
											onChange={handleChange('description')}
											onBlur={handleBlur('description')}
											helperText={touched.description ? errors.description : ''}
											error={touched.description && Boolean(errors.description)}
											minRows={4}
											multiline={true}
											theme={descriptionFieldTheme}
											fullWidth={true}
											size="medium"
										/>
										<CustomDropDownChoices
											id="forWhom"
											label="Pour qui (optionnel)"
											items={forWhom}
											theme={forWhomFieldTheme}
											onChange={forWhomHandleChange}
											value={forWhomChoice}
										/>
										<Stack direction="row">
											<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
												<Stack direction="column" justifyContent="space-between" alignItems="flex-end" spacing={2}>
													<ColorsRadioCheckContent colors={availableColorsList} />
													{/*<CreatorRadioCheckContent/>*/}
												</Stack>
											</div>
											<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
												<Stack direction="column" justifyContent="space-between" alignItems="flex-end" spacing={2}>
													{/*<SizesRadioCheckContent/>*/}
													{/*<QuantityRadioCheckContent/>*/}
												</Stack>
											</div>
										</Stack>
										
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
