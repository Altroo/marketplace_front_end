import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
// import Image from "next/image";
// import { default as ImageFuture } from "next/future/image";
import Styles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Grid, Stack } from '@mui/material';
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import { OFFER_ADD_PRODUCT_CATEGORIES, SHOP_ADD_SHOP_NAME, SHOP_EDIT_INDEX } from "../../../../utils/routes";
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
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';
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
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { setOfferDescriptionPage } from '../../../../store/actions/offer/offerActions';
import { useRouter } from 'next/router';
import {
	getLocalOfferColors,
	getLocalOfferDescription,
	getLocalOfferForwhom,
	getLocalOfferPictures,
	// getLocalOfferPicture1,
	// getLocalOfferPicture2,
	// getLocalOfferPicture3,
	// getLocalOfferPicture4,
	getLocalOfferQuantity,
	getLocalOfferSizes,
	getLocalOfferTags,
	getLocalOfferTitle,
} from '../../../../store/selectors';
// import { setSelectedOfferTags } from '../../../../store/slices/offer/offerSlice';
import { forWhomData, getForWhomDataArray } from '../../../../utils/rawData';
import { OfferForWhomType } from '../../../../types/offer/offerTypes';
import { getCookie } from "cookies-next";
// import { OfferForWhomType, OfferProductColors } from '../../../../types/offer/offerTypes';
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
	const [typingTitle, setTypingTitle] = useState<boolean>(false);
	const [typingDescription, setTypingDescription] = useState<boolean>(false);
	const [pickingImages, setPickingImages] = useState<boolean>(false);
	const [pickingTags, setPickingTags] = useState<boolean>(false);
	const [offerTags, setOfferTags] = useState<Array<string>>([]);
	// const [offerImageOne, setOfferImageOne] = useState<string>('');
	// const [offerImageTwo, setOfferImageTwo] = useState<string | null>(null);
	// const [offerImageThree, setOfferImageThree] = useState<string | null>(null);
	// const [offerImageFour, setOfferImageFour] = useState<string | null>(null);
	// const [isValid, setIsValid] = useState<boolean>(false);
	const [images, setImages] = useState<ImageUploadingType>([]);
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
	// const [pickedTags, setPickedTags] = useState<Array<string>>([]);
	const pickedTitle = useAppSelector(getLocalOfferTitle);
	const pickedPictures = useAppSelector(getLocalOfferPictures);
	// const pickedPicture1 = useAppSelector(getLocalOfferPicture1);
	// const pickedPicture2 = useAppSelector(getLocalOfferPicture2);
	// const pickedPicture3 = useAppSelector(getLocalOfferPicture3);
	// const pickedPicture4 = useAppSelector(getLocalOfferPicture4);
	const pickedForWhom = useAppSelector(getLocalOfferForwhom);
	const pickedDescription = useAppSelector(getLocalOfferDescription);
	const pickedColorsList = useAppSelector(getLocalOfferColors);
	const pickedSizesList = useAppSelector(getLocalOfferSizes);
	const pickedQuantity = useAppSelector(getLocalOfferQuantity);
	const pickedTags = useAppSelector(getLocalOfferTags);

	// on change images
	const imagesOnChangeHandler = (imageList: ImageUploadingType, addUpdateIndex?: Array<number>) => {
		setImages(imageList);
		// if (imageList.length === 1) {
		// 	if (imageList[0].dataURL) {
		// 		setOfferImageOne(imageList[0].dataURL);
		// 	}
		// }
		// else if (imageList.length === 2) {
		// 	if (imageList[0].dataURL) {
		// 		setOfferImageOne(imageList[0].dataURL);
		// 	}
		// 	if (imageList[1].dataURL) {
		// 		setOfferImageTwo(imageList[1].dataURL);
		// 	}
		// }
		// else if (imageList.length === 3) {
		// 	if (imageList[0].dataURL) {
		// 		setOfferImageOne(imageList[0].dataURL);
		// 	}
		// 	if (imageList[1].dataURL) {
		// 		setOfferImageTwo(imageList[1].dataURL);
		// 	}
		// 	if (imageList[2].dataURL) {
		// 		setOfferImageThree(imageList[2].dataURL);
		// 	}
		// }
		// else {
		// 	if (imageList[0].dataURL) {
		// 		setOfferImageOne(imageList[0].dataURL);
		// 	}
		// 	if (imageList[1].dataURL) {
		// 		setOfferImageTwo(imageList[1].dataURL);
		// 	}
		// 	if (imageList[2].dataURL) {
		// 		setOfferImageThree(imageList[2].dataURL);
		// 	}
		// 	if (imageList[3].dataURL) {
		// 		setOfferImageFour(imageList[3].dataURL);
		// 	}
		// }
	};

	type submitDataType = {
		title: string;
		description: string;
		tags: Array<string>;
	};
	const [colorSwitchOpen, setColorSwitchOpen] = useState<boolean>(false);
	const [sizesSwitchOpen, setSizesSwitchOpen] = useState<boolean>(false);
	const [quantitySwitchOpen, setQuantitySwitchOpen] = useState<boolean>(false);

	useEffect(() => {
		if (pickedTitle && !typingTitle) {
			setOfferTitle(pickedTitle);
		}
		if (pickedPictures.length > 0 && !pickingImages) {
			setImages(pickedPictures);
		}
		if (pickedDescription && !typingDescription) {
			setOfferDescription(pickedDescription);
		}
		if (typeof pickedTags === 'string' && !pickingTags) {
			setOfferTags(pickedTags.split(','));
		}
		if (typeof pickedForWhom === 'string') {
			setForWhomChoice(getForWhomDataArray(pickedForWhom.split(',') as Array<OfferForWhomType>));
		}
		if (pickedColorsList) {
			setselectedColorsList(pickedColorsList.split(','));
			setColorSwitchOpen(true);
		}
		if (typeof pickedSizesList === 'string') {
			const sizesArray = pickedSizesList.split(',');
			if (sizesArray.length > 0) {
				sizesArray.map((size) => {
					switch (size) {
						case 'XS':
							setXsState(true);
							break;
						case 'S':
							setSState(true);
							break;
						case 'M':
							setMState(true);
							break;
						case 'L':
							setLState(true);
							break;
						case 'X':
							setXState(true);
							break;
						case 'XL':
							setXlState(true);
							break;
					}
					setSizesSwitchOpen(true);
				});
			}
		}
		if (pickedQuantity) {
			setQuantity(pickedQuantity);
			setQuantitySwitchOpen(true);
		}
		// if (images.length > 0 && pickedTags.length > 0 && offerTitle.length > 1 && offerDescription.length > 0) {
		// 	setIsValid(true);
		// } else {
		// 	setIsValid(false);
		// }
	}, [
		pickedQuantity,
		pickedColorsList,
		offerTitle,
		pickedDescription,
		pickedForWhom,
		pickedPictures,
		pickedTags,
		pickedTitle,
		pickedSizesList,
		typingTitle,
		pickingImages,
		typingDescription,
		pickingTags,
	]);

	// submit handler
	const addDescriptionSubmitHandler = (values: submitDataType) => {
		const forWhomCodeArray: Array<string> = [];
		if (forWhomChoice.length >= 1) {
			forWhomChoice.map((forWhom) => {
				forWhomCodeArray.push(forWhom[0]);
			});
		}
		const forWhomStr = forWhomCodeArray.join(',');
		const productColorsStr: string = selectedColorsList.join(',');
		const productSizesArray: Array<string> = [];
		const { xsState, sState, mState, lState, xState, xlState } = sizesStates;
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
				images,
				values.description,
				forWhomStr,
				productColorsStr,
				productSizesStr,
				quantity,
				values.tags.join(','),
				router,
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
					<DesktopTopNavigationBar
						backHref={OFFER_ADD_PRODUCT_CATEGORIES}
						returnButton
						closeButtonHref={SHOP_EDIT_INDEX}
					/>
					<MobileTopNavigationBar
						backHref={OFFER_ADD_PRODUCT_CATEGORIES}
						returnButton
						closeButtonHref={SHOP_EDIT_INDEX}
					/>
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
								images: images,
								description: offerDescription,
								tags: offerTags,
							}}
							validateOnMount={true}
							onSubmit={(values) => {
								addDescriptionSubmitHandler(values);
							}}
							validationSchema={addOfferProductSchema}
						>
							{({
								handleBlur,
								handleChange,
								values,
								handleSubmit,
								setFieldValue,
								touched,
								errors,
								isSubmitting,
								isValid,
							}) => (
								<Form
									className={Styles.formStyle}
									onKeyDown={(e) => {
										if (e.code === 'enter') e.preventDefault();
									}}
								>
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
														onChange={(e) => {
															setTypingTitle(true);
															handleChange('title')(e);
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
											onChange={(e) => {
												setPickingImages(true);
												imagesOnChangeHandler(e);
												setFieldValue('images', e);
											}}
											maxNumber={4}
										/>
										<CustomTextArea
											type="text"
											id="description"
											label="Description"
											value={values.description ? values.description : ''}
											onChange={(e) => {
												setTypingDescription(true);
												handleChange('description')(e);
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
											items={forWhomData}
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
													switchOpen={colorSwitchOpen}
												/>
											</Grid>
											<Grid item md={6} sm={12} xs={12}>
												<CreatorRadioCheckContent />
											</Grid>
										</Grid>
										<Grid container columnSpacing={1}>
											<Grid item md={6} sm={12} xs={12}>
												<SizesRadioCheckContent
													switchOpen={sizesSwitchOpen}
													sizesStates={sizesStates}
													setSizesStates={setSizesStates}
												/>
											</Grid>
											<Grid item md={6} sm={12} xs={12}>
												<QuantityRadioCheckContent
													switchOpen={quantitySwitchOpen}
													quantity={quantity}
													setQuantity={setQuantity}
												/>
											</Grid>
										</Grid>
										<TagChips pickedTags={offerTags} onChange={(e, values) => {
											setPickingTags(true);
											setOfferTags(values);
										}} />
									</Stack>
									<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
										<div
											className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton} 
										${Styles.marginBottom}`}
										>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: SHOP_ADD_SHOP_NAME,
			},
		};
	}
	return {
		props: {},
	}
}

export default Description;
