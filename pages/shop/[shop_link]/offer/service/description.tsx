import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../../styles/offers/create/offerCreateShared.module.sass';
import SharedStyles from '../../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Stack, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import DesktopTopNavigationBar from '../../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import {
	AUTH_LOGIN,
	REAL_OFFER_ADD_INDEX,
	REAL_OFFER_ADD_SERVICE_CATEGORIES,
	REAL_OFFER_ADD_SERVICE_PRICE,
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
import { addOfferServiceSchema } from '../../../../../utils/formValidationSchemas';
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import TagChips from '../../../../../components/groupedComponents/temp-offer/tagChips/tagChips';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { useRouter } from 'next/router';
import {
	getLocalOfferServiceAddress,
	getLocalOfferServiceAfternoonHourFrom,
	getLocalOfferServiceAfternoonHourto,
	getLocalOfferServiceDescription,
	getLocalOfferServiceForwhom,
	getLocalOfferServiceKmRadius,
	getLocalOfferServiceLatitude,
	getLocalOfferServiceLongitude,
	getLocalOfferServiceMorningHourFrom,
	getLocalOfferServiceMorningHourTo,
	getLocalOfferServicePictures,
	getLocalOfferServiceTags,
	getLocalOfferServiceTitle,
	getLocalOfferServiceZoneBy,
} from '../../../../../store/selectors';
import { forWhomItemsList, getForWhomDataArray } from '../../../../../utils/rawData';
import { OfferForWhomType } from '../../../../../types/offer/offerTypes';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../../../types/account/accountTypes';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import DisponibilitiesRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/disponibilitiesRadioCheckContent/disponibilitiesRadioCheckContent';
import HorairesRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/horairesRadioCheckContent/horairesRadioCheckContent';
import TextButton from '../../../../../components/htmlElements/buttons/textButton/textButton';
import CustomSwipeModal from '../../../../../components/desktop/modals/rightSwipeModal/customSwipeModal';
import ServiceLocalisation from '../../../../../components/groupedComponents/temp-offer/services/serviceLocalisation/serviceLocalisation';
import { setOfferServiceDescriptionPage } from '../../../../../store/actions/offer/offerActions';
import { ApiErrorResponseType } from '../../../../../types/_init/_initTypes';
import ServiceMiniMap from '../../../../../components/groupedComponents/temp-offer/services/serviceMiniMap/serviceMiniMap';

const Description: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [titleTooltip, setTitleTooltip] = useState<boolean>(false);
	const [offerTitle, setOfferTitle] = useState<string>('');
	const [offerDescription, setOfferDescription] = useState<string>('');
	const [typingTitle, setTypingTitle] = useState<boolean>(false);
	const [typingDescription, setTypingDescription] = useState<boolean>(false);
	const [pickingImages, setPickingImages] = useState<boolean>(false);
	const [pickingTags, setPickingTags] = useState<boolean>(false);
	const [offerTags, setOfferTags] = useState<Array<string>>([]);
	const [images, setImages] = useState<ImageUploadingType>([]);
	const [forWhomChoice, setForWhomChoice] = useState<Array<string>>([]);
	// local states
	const pickedTitle = useAppSelector(getLocalOfferServiceTitle);
	const pickedPictures = useAppSelector(getLocalOfferServicePictures);
	const pickedForWhom = useAppSelector(getLocalOfferServiceForwhom);
	const pickedDescription = useAppSelector(getLocalOfferServiceDescription);
	const pickedTags = useAppSelector(getLocalOfferServiceTags);
	const morningHourFrom = useAppSelector(getLocalOfferServiceMorningHourFrom);
	const morningHourTo = useAppSelector(getLocalOfferServiceMorningHourTo);
	const afternoonHourFrom = useAppSelector(getLocalOfferServiceAfternoonHourFrom);
	const afternoonHourTo = useAppSelector(getLocalOfferServiceAfternoonHourto);

	// get previously selected from database
	const address_name = useAppSelector(getLocalOfferServiceAddress);
	const longitude = useAppSelector(getLocalOfferServiceLongitude);
	const latitude = useAppSelector(getLocalOfferServiceLatitude);
	const zone_by = useAppSelector(getLocalOfferServiceZoneBy);
	const km_radius = useAppSelector(getLocalOfferServiceKmRadius);

	const imagesOnChangeHandler = (imageList: ImageUploadingType) => {
		setImages(imageList);
	};

	type submitDataType = {
		title: string;
		description: string;
		service_availability_days: string;
		service_morning_hour_from: string | null;
		service_morning_hour_to: string | null;
		service_afternoon_hour_from: string | null;
		service_afternoon_hour_to: string | null;
		tags: Array<string>;
	};
	const [morningHourFromState, setMorningHourFromState] = useState<string>('');
	const [morningHourToState, setMorningHourToState] = useState<string>('');
	const [afternoonHourFromState, setAfternoonHourFromState] = useState<string>('');
	const [afternoonHourToState, setAfternoonHourToState] = useState<string>('');
	const [localisationModalOpen, setLocalisationModalOpen] = useState<boolean>(false);
	// disponibilities state
	const [alState, setAlState] = useState<boolean>(false);
	const [moState, setMoState] = useState<boolean>(false);
	const [tuState, setTuState] = useState<boolean>(false);
	const [weState, setWeState] = useState<boolean>(false);
	const [thState, setThState] = useState<boolean>(false);
	const [frState, setFrState] = useState<boolean>(false);
	const [saState, setSaState] = useState<boolean>(false);
	const [suState, setSuState] = useState<boolean>(false);
	const selectedDisponibilities = {
		alState,
		moState,
		tuState,
		weState,
		thState,
		frState,
		saState,
		suState,
	};
	const setSelectedDisponibilities = {
		setAlState,
		setMoState,
		setTuState,
		setWeState,
		setThState,
		setFrState,
		setSaState,
		setSuState,
	};
	/*
	selectedDisponibilitiesList={selectedDisponibilitiesList}
	setselectedDisponibilitiesList={setSelectedDisponibilitiesList}
	 */

	useEffect(() => {
		if (morningHourFrom) {
			setMorningHourFromState(morningHourFrom);
		}
		if (morningHourTo) {
			setMorningHourToState(morningHourTo);
		}
		if (afternoonHourFrom) {
			setAfternoonHourFromState(afternoonHourFrom);
		}
		if (afternoonHourTo) {
			setAfternoonHourToState(afternoonHourTo);
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
		if (typeof pickedTags === 'string' && !pickingTags) {
			setOfferTags(pickedTags.split(','));
		}
		if (typeof pickedForWhom === 'string') {
			setForWhomChoice(getForWhomDataArray(pickedForWhom.split(',') as Array<OfferForWhomType>));
		}
	}, [
		afternoonHourFrom,
		afternoonHourTo,
		morningHourFrom,
		morningHourTo,
		pickedDescription,
		pickedForWhom,
		pickedPictures,
		pickedTags,
		pickedTitle,
		pickingImages,
		pickingTags,
		typingDescription,
		typingTitle,
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
		const action = setOfferServiceDescriptionPage(
			values.title,
			images,
			values.description,
			forWhomStr,
			values.service_availability_days,
			values.service_morning_hour_from,
			values.service_morning_hour_to,
			values.service_afternoon_hour_from,
			values.service_afternoon_hour_to,
			values.tags.join(','),
		);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: { error: ApiErrorResponseType; cancelled: boolean; data: boolean }) => {
				if (!error && !cancelled && data) {
					router.push(REAL_OFFER_ADD_SERVICE_PRICE(router.query.shop_link as string)).then();
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
			<main className={SharedStyles.main}>
				<LeftSideBar step={activeStep} which="SERVICE" />
				<Box sx={{ width: '100%', height: '100%' }}>
					<DesktopTopNavigationBar
						backHref={REAL_OFFER_ADD_SERVICE_CATEGORIES(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_OFFER_ADD_INDEX(router.query.shop_link as string)}
					/>
					<MobileTopNavigationBar
						backHref={REAL_OFFER_ADD_SERVICE_CATEGORIES(router.query.shop_link as string)}
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
									al_day: alState ? 'AL' : '',
									mo_day: moState ? 'MO' : '',
									tu_day: tuState ? 'TU' : '',
									we_day: weState ? 'WE' : '',
									th_day: thState ? 'TH' : '',
									fr_day: frState ? 'FR' : '',
									sa_day: saState ? 'SA' : '',
									su_day: suState ? 'SU' : '',
									service_morning_hour_from: morningHourFromState,
									service_morning_hour_to: morningHourToState,
									service_afternoon_hour_from: afternoonHourFromState,
									service_afternoon_hour_to: afternoonHourToState,
									tags: offerTags,
								}}
								validateOnMount={true}
								onSubmit={(values, { setSubmitting }) => {
									setSubmitting(false);
									let availabilityDaysString = '';
									if (values.al_day !== '') {
										availabilityDaysString = availabilityDaysString + values.al_day + ',';
									}
									if (values.mo_day !== '') {
										availabilityDaysString = availabilityDaysString + values.mo_day + ',';
									}
									if (values.tu_day !== '') {
										availabilityDaysString = availabilityDaysString + values.tu_day + ',';
									}
									if (values.we_day !== '') {
										availabilityDaysString = availabilityDaysString + values.we_day + ',';
									}
									if (values.th_day !== '') {
										availabilityDaysString = availabilityDaysString + values.th_day + ',';
									}
									if (values.fr_day !== '') {
										availabilityDaysString = availabilityDaysString + values.fr_day + ',';
									}
									if (values.sa_day !== '') {
										availabilityDaysString = availabilityDaysString + values.sa_day + ',';
									}
									if (values.su_day !== '') {
										availabilityDaysString = availabilityDaysString + values.su_day + ',';
									}
									if (
										values.title &&
										availabilityDaysString.length > 0 &&
										values.service_morning_hour_from &&
										values.service_morning_hour_to &&
										values.tags.length > 0 &&
										images.length > 0 &&
										address_name
									) {
										setSubmitting(true);
										addDescriptionSubmitHandler({
											title: values.title,
											description: values.description,
											service_availability_days: availabilityDaysString,
											service_morning_hour_from: values.service_morning_hour_from
												? values.service_morning_hour_from.slice(0, 5)
												: null,
											service_morning_hour_to: values.service_morning_hour_to
												? values.service_morning_hour_to.slice(0, 5)
												: null,
											service_afternoon_hour_from: values.service_afternoon_hour_from
												? values.service_afternoon_hour_from.slice(0, 5)
												: null,
											service_afternoon_hour_to: values.service_afternoon_hour_to
												? values.service_afternoon_hour_to.slice(0, 5)
												: null,
											tags: values.tags,
										});
									}
								}}
								validationSchema={addOfferServiceSchema}
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
												<Grid2 container columnSpacing={6}>
													<Grid2 md={6} sm={6} xs={12}>
														<DisponibilitiesRadioCheckContent
															selectedDisponibilities={selectedDisponibilities}
															setSelectedDisponibilities={setSelectedDisponibilities}
															switchOpen={true}
														/>
													</Grid2>
													<Grid2 md={6} sm={6} xs={12}>
														<HorairesRadioCheckContent switchOpen={true}>
															<Stack
																direction="column"
																flexWrap="wrap"
																justifyContent="flex-start"
																rowGap={0}
																justifyItems="flex-start"
																sx={{ width: '100%' }}
															>
																<div className={Styles.grayTitle}>
																	<p>Horaire du matin</p>
																</div>
																<Stack
																	direction="row"
																	columnGap={4}
																	justifyContent="space-between"
																	sx={{ width: '100%' }}
																>
																	<TextField
																		fullWidth={true}
																		type="time"
																		id="service_morning_hour_from"
																		label="De"
																		value={
																			values.service_morning_hour_from
																				? values.service_morning_hour_from.slice(0, 5)
																				: ''
																		}
																		onBlur={handleBlur('service_morning_hour_from')}
																		onChange={(e) => {
																			handleChange('service_morning_hour_from')(e);
																			setMorningHourFromState(e.target.value);
																		}}
																		helperText={
																			touched.service_morning_hour_from ? errors.service_morning_hour_from : ''
																		}
																		error={
																			touched.service_morning_hour_from && Boolean(errors.service_morning_hour_from)
																		}
																	/>
																	<TextField
																		fullWidth={true}
																		type="time"
																		id="service_morning_hour_to"
																		label="A"
																		value={
																			values.service_morning_hour_to ? values.service_morning_hour_to.slice(0, 5) : ''
																		}
																		onBlur={handleBlur('service_morning_hour_to')}
																		onChange={(e) => {
																			handleChange('service_morning_hour_to')(e);
																			setMorningHourToState(e.target.value);
																		}}
																		helperText={touched.service_morning_hour_to ? errors.service_morning_hour_to : ''}
																		error={touched.service_morning_hour_to && Boolean(errors.service_morning_hour_to)}
																	/>
																</Stack>
																<div className={Styles.grayTitle}>
																	<p>Horaire de l&apos;après-midi</p>
																</div>
																<Stack
																	direction="row"
																	columnGap={4}
																	justifyContent="space-between"
																	sx={{ width: '100%' }}
																>
																	<TextField
																		fullWidth={true}
																		size="medium"
																		label="De"
																		type="time"
																		id="service_afternoon_hour_from"
																		value={
																			values.service_afternoon_hour_from
																				? values.service_afternoon_hour_from.slice(0, 5)
																				: ''
																		}
																		onBlur={handleBlur('service_afternoon_hour_from')}
																		onChange={(e) => {
																			handleChange('service_afternoon_hour_from')(e);
																			setAfternoonHourFromState(e.target.value);
																		}}
																		helperText={
																			touched.service_afternoon_hour_from ? errors.service_afternoon_hour_from : ''
																		}
																		error={
																			touched.service_afternoon_hour_from && Boolean(errors.service_afternoon_hour_from)
																		}
																	/>
																	<TextField
																		fullWidth={true}
																		label="A"
																		type="time"
																		id="service_afternoon_hour_to"
																		value={
																			values.service_afternoon_hour_to
																				? values.service_afternoon_hour_to.slice(0, 5)
																				: ''
																		}
																		onBlur={handleBlur('service_afternoon_hour_to')}
																		onChange={(e) => {
																			handleChange('service_afternoon_hour_to')(e);
																			setAfternoonHourToState(e.target.value);
																		}}
																		helperText={
																			touched.service_afternoon_hour_to ? errors.service_afternoon_hour_to : ''
																		}
																		error={
																			touched.service_afternoon_hour_to && Boolean(errors.service_afternoon_hour_to)
																		}
																	/>
																</Stack>
															</Stack>
														</HorairesRadioCheckContent>
													</Grid2>
												</Grid2>
											</Stack>
											<Stack direction="column" spacing={1}>
												<Stack direction="row" justifyContent="space-between">
													<span className={Styles.spanTitle}>Localisation</span>
													{address_name && longitude && latitude && km_radius && zone_by ? null : (
														<TextButton
															buttonText="Ajouter"
															onClick={() => setLocalisationModalOpen(true)}
															cssClass={Styles.addAdresseButton}
														/>
													)}
												</Stack>
												{address_name && longitude && latitude && km_radius && zone_by ? (
													<Grid2 container>
														<Grid2 md={6} sm={6} xs={12}>
															<ServiceMiniMap
																address_name={address_name}
																longitude={longitude}
																latitude={latitude}
																zone_by={zone_by}
																km_radius={km_radius}
																onClick={() => setLocalisationModalOpen(true)}
															/>
														</Grid2>
													</Grid2>
												) : (
													<span className={Styles.noAdresseFound}>
														Vous n&apos;avez pas encore renseigné votre adresse.
													</span>
												)}
											</Stack>
											<TagChips
												pickedTags={offerTags}
												onChange={(e, values) => {
													setPickingTags(true);
													setOfferTags(values);
												}}
											/>
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
														!isSubmitting &&
														offerTags.length > 0 &&
														!!address_name &&
														!!longitude &&
														!!latitude &&
														!!zone_by &&
														!!km_radius
													}
													onClick={handleSubmit}
													type="submit"
												/>
											</div>
										</Stack>
										{localisationModalOpen && (
											<CustomSwipeModal open={localisationModalOpen} handleClose={() => setLocalisationModalOpen(false)}>
												<Box sx={{ marginTop: '24px', height: '100%' }}>
													<ServiceLocalisation handleClose={() => setLocalisationModalOpen(false)} />
												</Box>
											</CustomSwipeModal>
										)}
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
