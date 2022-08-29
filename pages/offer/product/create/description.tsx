import React, { useState } from "react";
import { NextPage } from "next";
// import Image from "next/image";
// import { default as ImageFuture } from "next/future/image";
import Styles from "../../../../styles/offer/create/offerCreateShared.module.sass";
import SharedStyles from "../../../../styles/shop/create/shopCreateShared.module.sass";
import LeftSideBar from "../../../../components/groupedComponents/shared/leftSideBar/leftSideBar";
import { Box, ClickAwayListener, Grid, Stack } from "@mui/material";
import DesktopTopNavigationBar
	from "../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar";
import { OFFER_ADD_PRODUCT_CATEGORIES } from "../../../../utils/routes";
import MobileTopNavigationBar
	from "../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar";
import MobileStepsBar from "../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar";
import HelperDescriptionHeader from "../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader";
import { Form, Formik } from "formik";
// import ApiProgress from '../../../../components/formikElements/apiResponse/apiProgress/apiProgress';
// import ApiAlert from '../../../../components/formikElements/apiResponse/apiAlert/apiAlert';
import CustomTextInput from "../../../../components/formikElements/customTextInput/customTextInput";
import {
	bioTextAreaTheme,
	offerForWhomDropdownTheme,
	offerTitleTextInputTheme,
	offerTitleTooltipTheme
} from "../../../../utils/themes";
import CustomToolTip from "../../../../components/htmlElements/toolTip/customToolTip";
import { ImageListType } from "react-images-uploading/dist/typings";
import CustomSquareImageUploading
	from "../../../../components/formikElements/customSquareImageUploading/customSquareImageUploading";
import CustomTextArea from "../../../../components/formikElements/customTextArea/customTextArea";
import CustomDropDownChoices from "../../../../components/formikElements/customDropDownChoices/customDropDownChoices";
import { SelectChangeEvent } from "@mui/material/Select";
import ColorsRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/colorsRadioCheckContent/colorsRadioCheckContent";
// import { OfferColorsListType, OfferSizesListType } from "../../../../types/ui/uiTypes";
import CreatorRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/creatorRadioCheckContent/creatorRadioCheckContent";
import SizesRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/sizesRadioCheckContent/sizesRadioCheckContent";
import QuantityRadioCheckContent
	from "../../../../components/groupedComponents/offer/radioCheckElement/QuantityRadioCheckContent/quantityRadioCheckContent";
// import Divider from "@mui/material/Divider";
import { addOfferProductSchema } from "../../../../utils/formValidationSchemas";
import PrimaryButton from "../../../../components/htmlElements/buttons/primaryButton/primaryButton";
import TagChips from "../../../../components/groupedComponents/offer/tagChips/tagChips";
// import { useAppSelector } from "../../../../utils/hooks";
// import {
// 	getLocalOfferColors,
// 	getLocalOfferQuantity,
// 	getLocalOfferSizes,
// 	getLocalOfferTags
// } from "../../../../store/selectors";
import { INPUT_REQUIRED } from "../../../../utils/formValidationErrorMessages";

const Description: NextPage = () => {
	const activeStep = "2";
	const [titleTooltip, setTitleTooltip] = useState<boolean>(false);
	const [selectedColorsList, setselectedColorsList] = useState<Array<string>>([]);
	const [images, setImages] = useState<ImageListType>([]);
	const forWhom = ["Tout le monde", "Enfant", "Femme", "Homme"];
	const [forWhomChoice, setForWhomChoice] = React.useState<Array<string>>([]);
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
		xlState
	};
	const setSizesStates = {
		setXsState,
		setSState,
		setMState,
		setLState,
		setXState,
		setXlState
	};
	const [quantity, setQuantity] = useState<number>(0);
	const [pickedTags, setPickedTags] = useState<Array<string>>([]);
	// const colorsList = useAppSelector(getLocalOfferColors);
	// const sizesList = useAppSelector(getLocalOfferSizes);
	// const quantity = useAppSelector(getLocalOfferQuantity);
	// const tags = useAppSelector(getLocalOfferTags);

	// on change images
	const imagesOnChangeHandler = (imageList: ImageListType, addUpdateIndex?: Array<number>) => {
		setImages(imageList);
	};

	type submitDataType = {
		title: string;
		description: string;
		images: ImageListType | [];
		tags: Array<string>
	}

	// submit handler
	const addDescriptionSubmitHandler = (values: submitDataType) => {
		console.log("TITLE & DESCRIPTION & images & tags : ");
		console.log(values); // {title: str, description: str, images: [], tags: []}
		console.log("FOR WHOM CHOICES : ");
		console.log(forWhomChoice); // ["Enfant", "Femme"...]
		console.log("COLORS LIST : ");
		console.log(selectedColorsList); // ["PI", "QR"] // color codes
		console.log("SIZES LIST : ");
		console.log(sizesStates); // {xsState: false, lState: true...} // boolean states
		console.log("QUANTITY : ");
		console.log(quantity); // 4 : number
	};

	// on change for whom
	const forWhomHandleChange = (event: SelectChangeEvent<Array<string>>) => {
		const {
			target: { value }
		} = event;
		setForWhomChoice(typeof value === "string" ? value.split(",") : value);
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
				<Box sx={{ width: "100%", height: "100%" }}>
					<DesktopTopNavigationBar backHref={OFFER_ADD_PRODUCT_CATEGORIES} returnButton />
					<MobileTopNavigationBar backHref={OFFER_ADD_PRODUCT_CATEGORIES} returnButton />
					<MobileStepsBar activeStep={activeStep} />
					<HelperDescriptionHeader
						header="Décrivez votre offre"
						description="Commencez par lui donnez un titre, une description et ajoutez quelques photos."
						HelpText="Apprendre à créer une offre"
					/>
					<Stack direction="column" justifyContent="space-between" spacing={2} sx={{ height: "80%" }}>
						<Formik
							enableReinitialize={true}
							initialValues={{
								title: "",
								description: "",
								images: [],
								tags: []
							}}
							/*
							Array :
								initialValues={{
									 images: ['jared', 'ian'],
								 }}
								 <Field name="images[0]" />
							 Object :
								 initialValues={{
									 'owner.fullname': '',
								 }}
								 <Field name="['owner.fullname']" />
							 */
							validateOnMount={true}
							validationSchema={addOfferProductSchema}
							onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
								setSubmitting(false);
								if (images.length >= 1 && pickedTags.length >= 1) {
									setFieldValue("images", images);
									setFieldValue("tags", pickedTags);
									addDescriptionSubmitHandler(values);
								} else {
									setErrors({ images: INPUT_REQUIRED });
								}
								setSubmitting(true);
							}}
						>
							{({
									handleChange,
									handleBlur,
									handleSubmit,
									values,
									touched,
									errors,
									isValid,
									isSubmitting
								}) => (
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
														value={values.title ? values.title : ""}
														onChange={handleChange("title")}
														onBlur={handleBlur("title")}
														helperText={touched.title ? errors.title : ""}
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
										<span>{errors.images}</span>
										<CustomTextArea
											type="text"
											id="description"
											label="Description"
											value={values.description ? values.description : ""}
											onChange={handleChange("description")}
											onBlur={handleBlur("description")}
											helperText={touched.description ? errors.description : ""}
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
												<SizesRadioCheckContent sizesStates={sizesStates} setSizesStates={setSizesStates} />
											</Grid>
											<Grid item md={6} sm={12} xs={12}>
												<QuantityRadioCheckContent quantity={quantity} setQuantity={setQuantity} />
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
