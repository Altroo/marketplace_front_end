import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../../styles/offers/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Grid, Stack } from '@mui/material';
import DesktopTopNavigationBar from '../../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import {
	AUTH_LOGIN,
	REAL_OFFER_ADD_INDEX,
	REAL_OFFER_ADD_PRODUCT_CATEGORIES,
	REAL_OFFER_ADD_PRODUCT_PRICE,
	REAL_SHOP_ADD_SHOP_NAME
} from "../../../../../utils/routes";
import MobileTopNavigationBar from '../../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperDescriptionHeader from '../../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import { Form, Formik } from 'formik';
import CustomTextInput from '../../../../../components/formikElements/customTextInput/customTextInput';
import {
	coordonneeTextInputTheme,
	offerForWhomDropdownTheme,
	offerTitleTooltipTheme,
} from '../../../../../utils/themes';
import CustomToolTip from '../../../../../components/htmlElements/toolTip/customToolTip';
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';
import CustomSquareImageUploading from '../../../../../components/formikElements/customSquareImageUploading/customSquareImageUploading';
import CustomTextArea from '../../../../../components/formikElements/customTextArea/customTextArea';
import CustomDropDownChoices from '../../../../../components/formikElements/customDropDownChoices/customDropDownChoices';
import { SelectChangeEvent } from '@mui/material/Select';
import ColorsRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/colorsRadioCheckContent/colorsRadioCheckContent';
import SizesRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/sizesRadioCheckContent/sizesRadioCheckContent';
import QuantityRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/quantityRadioCheckContent/quantityRadioCheckContent';
import { addOfferProductSchema } from '../../../../../utils/formValidationSchemas';
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
// import TagChips from '../../../../../components/groupedComponents/temp-offer/tagChips/tagChips';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { setOfferProductDescriptionPage } from '../../../../../store/actions/offer/offerActions';
import { useRouter } from 'next/router';
import {
	getAvailableCountries,
	getLocalOfferProductColors,
	getLocalOfferProductCreator,
	getLocalOfferProductDescription,
	getLocalOfferProductForwhom,
	getLocalOfferProductMadeIn,
	getLocalOfferProductPictures,
	getLocalOfferProductQuantity,
	getLocalOfferProductSizes,
	// getLocalOfferProductTags,
	getLocalOfferProductTitle,
} from '../../../../../store/selectors';
import { forWhomItemsList, getForWhomDataArray } from '../../../../../utils/rawData';
import { OfferForWhomType } from '../../../../../types/offer/offerTypes';
import { placesGetCountriesAction } from '../../../../../store/actions/places/placesActions';
import OfferCreatorRadioCheckContent from '../../../../../components/groupedComponents/offer/creatorRadioCheckContent/offerCreatorRadioCheckContent';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../../../types/account/accountTypes';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import { ApiErrorResponseType } from '../../../../../types/_init/_initTypes';

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
	// const [pickingTags, setPickingTags] = useState<boolean>(false);
	// const [offerTags, setOfferTags] = useState<Array<string>>([]);
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
	const pickedTitle = useAppSelector(getLocalOfferProductTitle);
	const pickedPictures = useAppSelector(getLocalOfferProductPictures);
	const pickedForWhom = useAppSelector(getLocalOfferProductForwhom);
	const pickedDescription = useAppSelector(getLocalOfferProductDescription);
	const pickedColorsList = useAppSelector(getLocalOfferProductColors);
	const pickedSizesList = useAppSelector(getLocalOfferProductSizes);
	const pickedQuantity = useAppSelector(getLocalOfferProductQuantity);
	const pickedMadeIn = useAppSelector(getLocalOfferProductMadeIn);
	const pickedCreator = useAppSelector(getLocalOfferProductCreator);
	// const pickedTags = useAppSelector(getLocalOfferProductTags);
	const availableCountries = useAppSelector(getAvailableCountries);
	// on change images
	const imagesOnChangeHandler = (imageList: ImageUploadingType) => {
		setImages(imageList);
	};

	type submitDataType = {
		title: string;
		description: string;
		// tags: Array<string>;
	};
	const [colorSwitchOpen, setColorSwitchOpen] = useState<boolean>(false);
	const [labelsSwitchOpen, setLabelsSwitchOpen] = useState<boolean>(false);
	const [sizesSwitchOpen, setSizesSwitchOpen] = useState<boolean>(false);
	const [quantitySwitchOpen, setQuantitySwitchOpen] = useState<boolean>(false);

	// Labels
	const [madeIn, setMadeIn] = useState<string>('Maroc');
	const [togglePickedCreator, setTogglePickedCreator] = useState<boolean>(false);

	useEffect(() => {
		if (availableCountries.length === 0) {
			dispatch(placesGetCountriesAction());
		}
		if (typeof pickedCreator === 'boolean') {
			setTogglePickedCreator(pickedCreator);
			if (pickedCreator) {
				setLabelsSwitchOpen(true);
			}
		}
		if (pickedMadeIn) {
			setMadeIn(pickedMadeIn);
			setLabelsSwitchOpen(true);
		}
		if (pickedTitle && !typingTitle) {
			setOfferTitle(pickedTitle);
		}
		if (pickedPictures.length > 0 && !pickingImages) {
			setImages(pickedPictures);
		}
		if (pickedDescription && !typingDescription) {
			setOfferDescription(pickedDescription);
		}
		// if (typeof pickedTags === 'string' && !pickingTags) {
		// 	setOfferTags(pickedTags.split(','));
		// }
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
	}, [
		availableCountries.length,
		pickedQuantity,
		pickedColorsList,
		offerTitle,
		pickedDescription,
		pickedForWhom,
		pickedPictures,
		// pickedTags,
		pickedTitle,
		pickedSizesList,
		typingTitle,
		pickingImages,
		typingDescription,
		dispatch,
		pickedCreator,
		pickedMadeIn,
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
		const action = setOfferProductDescriptionPage(
			values.title,
			images,
			values.description,
			forWhomStr,
			productColorsStr,
			productSizesStr,
			quantity,
			madeIn,
			togglePickedCreator,
			// values.tags.join(','),
		);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: { error: ApiErrorResponseType; cancelled: boolean; data: boolean }) => {
				if (!error && !cancelled && data) {
					router.push(REAL_OFFER_ADD_PRODUCT_PRICE(router.query.shop_link as string)).then();
				}
			},
		});
	};

	// on change for whom
	const forWhomHandleChange = (event: SelectChangeEvent<Array<string>>) => {
		const {
			target: { value },
		} = event;
		setForWhomChoice(typeof value === 'string' ? value.split(',') : value);
	};

	// themes
	const titleFieldTheme = coordonneeTextInputTheme();
	const titleTooltipTheme = offerTitleTooltipTheme();
	const descriptionFieldTheme = coordonneeTextInputTheme();
	const forWhomFieldTheme = offerForWhomDropdownTheme();

	return (
		<>
			<main className={SharedStyles.fullPageMain}>
				<LeftSideBar step={activeStep} which="PRODUCT" />
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar
						backHref={REAL_OFFER_ADD_PRODUCT_CATEGORIES(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_OFFER_ADD_INDEX(router.query.shop_link as string)}
					/>
					<MobileTopNavigationBar
						backHref={REAL_OFFER_ADD_PRODUCT_CATEGORIES(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_OFFER_ADD_INDEX(router.query.shop_link as string)}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<Stack direction="column" spacing={4}>
						<HelperDescriptionHeader
							header="Décrivez votre offre"
							description="Commencez par lui donnez un titre, une description et ajoutez quelques photos."
							HelpText="Apprendre à créer une offre"
						/>
						<Stack direction="column">
							<Formik
								enableReinitialize={true}
								initialValues={{
									title: offerTitle,
									images: images,
									description: offerDescription,
									made_in: madeIn,
									// tags: offerTags,
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
										<Stack direction="column" spacing={4}>
											<Stack direction="column" spacing={2}>
												<Stack direction="column" spacing={4}>
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
													<Stack direction="column" spacing={2}>
														<span className={Styles.spanTitle}>Description</span>
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
													</Stack>
												</Stack>
												<CustomDropDownChoices
													id="forWhom"
													label="Pour qui (optionnel)"
													items={forWhomItemsList}
													theme={forWhomFieldTheme}
													onChange={forWhomHandleChange}
													value={forWhomChoice}
													multiple={true}
												/>
											</Stack>
											<Stack direction="column" spacing={2} alignItems="flex-end">
												<Grid container columnSpacing={1}>
													<Grid item md={6} sm={12} xs={12}>
														<ColorsRadioCheckContent
															selectedColorsList={selectedColorsList}
															setselectedColorsList={setselectedColorsList}
															switchOpen={colorSwitchOpen}
														/>
													</Grid>
													<Grid item md={6} sm={12} xs={12}>
														<OfferCreatorRadioCheckContent
															pickedCountry={madeIn}
															setPickedCountry={setMadeIn}
															pickedCreator={togglePickedCreator}
															togglePickedCreator={setTogglePickedCreator}
															switchOpen={labelsSwitchOpen}/>
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
											</Stack>
											{/*<TagChips*/}
											{/*	pickedTags={offerTags}*/}
											{/*	onChange={(e, values) => {*/}
											{/*		setPickingTags(true);*/}
											{/*		setOfferTags(values);*/}
											{/*	}}*/}
											{/*/>*/}
										</Stack>
										<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
											<div
												className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton} 
											${Styles.marginBottom}`}
											>
												<PrimaryButton
													buttonText="Continuer"
													active={
														isValid &&
														!isSubmitting
														// && offerTags.length > 0
													}
													onClick={handleSubmit}
													type="submit"
												/>
											</div>
										</Stack>
									</Form>
								)}
							</Formik>
						</Stack>
					</Stack>
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
							destination: REAL_SHOP_ADD_SHOP_NAME,
						},
					};
				}
			} else {
				// user not authenticated
				return {
					redirect: {
						permanent: false,
						destination: AUTH_LOGIN,
					},
				};
			}
		}
	} catch (e) {
		// fall back error
		return {
			redirect: {
				permanent: false,
				destination: AUTH_LOGIN,
			},
		};
	}
}

export default Description;
