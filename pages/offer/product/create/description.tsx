// Altroo :
// 1) Missing two way binding for back button
// 2) Missing images validation & error message
// 3) Missing state selectors for formik initial values
// 4) Missing loading t'ill dispatch

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
// import Image from "next/image";
// import { default as ImageFuture } from "next/future/image";
import Styles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Grid, Stack } from '@mui/material';
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { OFFER_ADD_PRODUCT_CATEGORIES } from '../../../../utils/routes';
import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
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
import CustomTextArea from '../../../../components/formikElements/customTextArea/customTextArea';
import CustomDropDownChoices from '../../../../components/formikElements/customDropDownChoices/customDropDownChoices';
import { SelectChangeEvent } from '@mui/material/Select';
import ColorsRadioCheckContent from '../../../../components/groupedComponents/offer/radioCheckElement/colorsRadioCheckContent/colorsRadioCheckContent';
// import { OfferColorsListType, OfferSizesListType } from "../../../../types/ui/uiTypes";
import CreatorRadioCheckContent from '../../../../components/groupedComponents/offer/radioCheckElement/creatorRadioCheckContent/creatorRadioCheckContent';
import SizesRadioCheckContent from '../../../../components/groupedComponents/offer/radioCheckElement/sizesRadioCheckContent/sizesRadioCheckContent';
import QuantityRadioCheckContent from '../../../../components/groupedComponents/offer/radioCheckElement/QuantityRadioCheckContent/quantityRadioCheckContent';
// import Divider from "@mui/material/Divider";
import { addOfferProductSchema } from '../../../../utils/formValidationSchemas';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import TagChips from '../../../../components/groupedComponents/offer/tagChips/tagChips';
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { setOfferDescriptionPage } from '../../../../store/actions/offer/offerActions';
import { useRouter } from "next/router";
// import {
// 	getLocalOfferColors, getLocalOfferDescription,
// 	getLocalOfferQuantity,
// 	getLocalOfferSizes,
// 	getLocalOfferTags, getLocalOfferTitle,
// } from "../../../../store/selectors";
// import { useAppSelector } from "../../../../utils/hooks";
// import {
// 	getLocalOfferColors,
// 	getLocalOfferQuantity,
// 	getLocalOfferSizes,
// 	getLocalOfferTags
// } from "../../../../store/selectors";

const Description: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [titleTooltip, setTitleTooltip] = useState<boolean>(false);
	const [selectedColorsList, setselectedColorsList] = useState<Array<string>>([]);
	const [offerTitle, setOfferTitle] = useState<string>('');
	const [offerDescription, setOfferDescription] = useState<string>('');
	const [offerImageOne, setOfferImageOne] = useState<string>('');
	const [offerImageTwo, setOfferImageTwo] = useState<string | null>(null);
	const [offerImageThree, setOfferImageThree] = useState<string | null>(null);
	const [offerImageFour, setOfferImageFour] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);
	const [images, setImages] = useState<ImageListType>([]);
	const forWhom = ['Tout le monde', 'Enfant', 'Femme', 'Homme'];
	const [forWhomChoice, setForWhomChoice] = useState<Array<string>>([]);
	const [xsState, setXsState] = useState<boolean>(false);
	const [sState, setSState] = useState<boolean>(false);
	const [mState, setMState] = useState<boolean>(false);
	const [lState, setLState] = useState<boolean>(false);
	const [xState, setXState] = useState<boolean>(false);
	const [xlState, setXlState] = useState<boolean>(false);
	const sizesStates = {
		xsState,
		sState,
		mState,
		lState,
		xState,
		xlState,
	};
	const setSizesStates = {
		setXsState,
		setSState,
		setMState,
		setLState,
		setXState,
		setXlState,
	};
	const [quantity, setQuantity] = useState<number>(0);
	const [pickedTags, setPickedTags] = useState<Array<string>>([]);
	// const pickedTitle = useAppSelector(getLocalOfferTitle);
	// const pickedDescription = useAppSelector(getLocalOfferDescription);
	// const colorsList = useAppSelector(getLocalOfferColors);
	// const sizesList = useAppSelector(getLocalOfferSizes);
	// const productQuantity = useAppSelector(getLocalOfferQuantity);
	// const tags = useAppSelector(getLocalOfferTags);

	// on change images
	const imagesOnChangeHandler = (imageList: ImageListType, addUpdateIndex?: Array<number>) => {
		setImages(imageList);
	};

	type submitDataType = {
		title: string;
		description: string;
		// images: boolean;
		tags: Array<string>;
	};

	useEffect(() => {
		if (images.length >= 1 && pickedTags.length >= 1 && offerTitle.length >= 2 && offerDescription.length >= 1) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [images.length, offerDescription.length, offerTitle.length, pickedTags.length]);

	// submit handler
	const addDescriptionSubmitHandler = (values: submitDataType) => {
		if (images.length >= 1) {
			if (images[0].dataURL) {
				setOfferImageOne(images[0].dataURL);
			}
		}
		if (images.length >= 2) {
			if (images[1].dataURL) {
				setOfferImageTwo(images[1].dataURL);
			}
		}
		if (images.length >= 3) {
			if (images[2].dataURL) {
				setOfferImageThree(images[2].dataURL);
			}
		}
		if (images.length === 4) {
			if (images[3].dataURL) {
				setOfferImageFour(images[3].dataURL);
			}
		}
		const forWhomCodeArray: Array<string> = [];
		if (forWhomChoice.length >= 1) {
			forWhomChoice.map((forWhom) => {
				forWhomCodeArray.push(forWhom[0]);
			})
		}
		const forWhomStr = forWhomCodeArray.join(',');
		const productColorsStr: string = selectedColorsList.join(',');
		const productSizesArray: Array<string> = [];
		const {xsState, sState, mState, lState, xState, xlState} = sizesStates;
		if (xsState) {
			productSizesArray.push('XS');
		}
		if (sState) {
			productSizesArray.push('S');
		}
		if (mState) {
			productSizesArray.push('M');
		}
		if (lState) {
			productSizesArray.push('L');
		}
		if (xState) {
			productSizesArray.push('X');
		}
		if (xlState) {
			productSizesArray.push('XL');
		}
		const productSizesStr = productSizesArray.join(',');

		dispatch(
			setOfferDescriptionPage(
				values.title,
				offerImageOne,
				offerImageTwo,
				offerImageThree,
				offerImageFour,
				values.description,
				forWhomStr,
				productColorsStr,
				productSizesStr,
				quantity,
				values.tags.join(','),
				router
			),
		);
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
					<Stack direction="column" justifyContent="space-between" spacing={2} sx={{ height: '80%' }}>
						<Formik
							enableReinitialize={true}
							initialValues={{
								title: offerTitle,
								description: offerDescription,
								tags: pickedTags,
							}}
							validateOnMount={true}
							validationSchema={addOfferProductSchema}
							onSubmit={(values) => {
								addDescriptionSubmitHandler(values);
							}}
						>
							{({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
								<Form className={Styles.formStyle}>
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
														value={offerTitle ? offerTitle : ''}
														onChange={(e) => {
															// handleChange('title');
															setOfferTitle(e.target.value);
														}}
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
										<CustomTextArea
											type="text"
											id="description"
											label="Description"
											value={offerDescription ? offerDescription : ''}
											onChange={(e) => {
												// handleChange('description');
												setOfferDescription(e.target.value);
											}}
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
											multiple={true}
										/>
										<Grid container columnSpacing={1}>
											<Grid item md={6} sm={12} xs={12}>
												<ColorsRadioCheckContent
													selectedColorsList={selectedColorsList}
													setselectedColorsList={setselectedColorsList}
												/>
											</Grid>
											{/*<Divider variant="fullWidth" orientation="vertical" flexItem />*/}
											<Grid item md={6} sm={12} xs={12}>
												<CreatorRadioCheckContent />
											</Grid>
										</Grid>
										<Grid container columnSpacing={1}>
											<Grid item md={6} sm={12} xs={12}>
												<SizesRadioCheckContent
													sizesStates={sizesStates}
													setSizesStates={setSizesStates}
												/>
											</Grid>
											<Grid item md={6} sm={12} xs={12}>
												<QuantityRadioCheckContent
													quantity={quantity}
													setQuantity={setQuantity}
												/>
											</Grid>
										</Grid>
										<TagChips setPickedTags={setPickedTags} />
									</Stack>
									<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
										<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
											<PrimaryButton
												buttonText="Continuer"
												active={isValid && !isSubmitting}
												onClick={handleSubmit}
												type="submit"
											/>
										</div>
									</Stack>
								</Form>
							)}
						</Formik>
					</Stack>
				</Box>
			</main>
		</>
	);
};

export default Description;
