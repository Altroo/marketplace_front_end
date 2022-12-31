import React, { useState, useEffect, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './description.module.sass';
import LeftSideBar from '../../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import { Box, ClickAwayListener, Grid, Stack, ThemeProvider } from '@mui/material';
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
import { useFormik } from 'formik';
import CustomTextInput from '../../../../../components/formikElements/customTextInput/customTextInput';
import {
	coordonneeTextInputTheme,
	offerForWhomDropdownTheme,
	offerTitleTooltipTheme,
	SizesChipTheme,
} from '../../../../../utils/themes';
import CustomToolTip from '../../../../../components/htmlElements/toolTip/customToolTip';
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';
import CustomSquareImageUploading from '../../../../../components/formikElements/customSquareImageUploading/customSquareImageUploading';
import CustomTextArea from '../../../../../components/formikElements/customTextArea/customTextArea';
import CustomDropDownChoices from '../../../../../components/formikElements/customDropDownChoices/customDropDownChoices';
import { SelectChangeEvent } from '@mui/material/Select';
import { addOfferServiceSchema } from '../../../../../utils/formValidationSchemas';
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { useRouter } from 'next/router';
import {
	getLocalOfferServiceAddress,
	getLocalOfferServiceAfternoonHourFrom,
	getLocalOfferServiceAfternoonHourto,
	getLocalOfferServiceAvailabilityDays, getLocalOfferServiceCategories,
	getLocalOfferServiceDescription,
	getLocalOfferServiceForwhom,
	getLocalOfferServiceKmRadius,
	getLocalOfferServiceLatitude,
	getLocalOfferServiceLongitude,
	getLocalOfferServiceMorningHourFrom,
	getLocalOfferServiceMorningHourTo,
	getLocalOfferServicePictures, getLocalOfferServiceThumbnails,
	getLocalOfferServiceTitle,
	getLocalOfferServiceZoneBy
} from "../../../../../store/selectors";
import { constructDate, forWhomItemsList, getForWhomDataArray } from '../../../../../utils/rawData';
import { OfferForWhomType } from '../../../../../types/offer/offerTypes';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../../../types/account/accountTypes';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import HorairesRadioCheckContent from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/horairesRadioCheckContent/horairesRadioCheckContent';
import TextButton from '../../../../../components/htmlElements/buttons/textButton/textButton';
import CustomSwipeModal from '../../../../../components/desktop/modals/rightSwipeModal/customSwipeModal';
import ServiceLocalisation from '../../../../../components/groupedComponents/temp-offer/services/serviceLocalisation/serviceLocalisation';
import { setOfferServiceDescriptionPage } from '../../../../../store/actions/offer/offerActions';
import { ApiErrorResponseType } from '../../../../../types/_init/_initTypes';
import ServiceMiniMap from '../../../../../components/groupedComponents/temp-offer/services/serviceMiniMap/serviceMiniMap';
import CustomTimeInput from '../../../../../components/formikElements/customTimeInput/customTimeInput';
import dayjs from 'dayjs';
import Chip from '@mui/material/Chip';
import RadioCheckElement from '../../../../../components/groupedComponents/temp-offer/radioCheckElement/radioCheckElement';
import { __spreadArrays } from "tslib";

// themes
const titleFieldTheme = coordonneeTextInputTheme();
const titleTooltipTheme = offerTitleTooltipTheme();
const descriptionFieldTheme = coordonneeTextInputTheme();
const forWhomFieldTheme = offerForWhomDropdownTheme();
const chipTheme = SizesChipTheme();

type submitDataType = {
	title: string;
	description: string;
	images: ImageUploadingType | [];
	thumbnails: Array<string>;
	service_availability_days: string;
	service_morning_hour_from: string | null;
	service_morning_hour_to: string | null;
	service_afternoon_hour_from: string | null;
	service_afternoon_hour_to: string | null;
	// tags: Array<string>;
};

const Description: NextPage = () => {
	const activeStep = '2';
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [titleTooltip, setTitleTooltip] = useState<boolean>(false);
	const [forWhomChoice, setForWhomChoice] = useState<Array<string>>([]);
	// local states
	const pickedCategories = useAppSelector(getLocalOfferServiceCategories);
	const pickedTitle = useAppSelector(getLocalOfferServiceTitle);
	const pickedPictures = useAppSelector(getLocalOfferServicePictures);
	const pickedThumbnails = useAppSelector(getLocalOfferServiceThumbnails);
	const pickedForWhom = useAppSelector(getLocalOfferServiceForwhom);
	const pickedDescription = useAppSelector(getLocalOfferServiceDescription);
	const availabilityDays = useAppSelector(getLocalOfferServiceAvailabilityDays);
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

	const [localisationModalOpen, setLocalisationModalOpen] = useState<boolean>(false);

	// // submit handler
	const addDescriptionSubmitHandler = useCallback(
		(values: submitDataType) => {
			const forWhomCodeArray: Array<string> = [];
			if (forWhomChoice.length >= 1) {
				forWhomChoice.map((forWhom) => {
					forWhomCodeArray.push(forWhom[0]);
				});
			}
			const forWhomStr = forWhomCodeArray.join(',');
			const service_morning_hour_from = values.service_morning_hour_from
				? dayjs(new Date(values.service_morning_hour_from)).format('HH:mm')
				: null;
			const service_morning_hour_to = values.service_morning_hour_to
				? dayjs(new Date(values.service_morning_hour_to)).format('HH:mm')
				: null;
			const service_afternoon_hour_from = values.service_afternoon_hour_from
				? dayjs(new Date(values.service_afternoon_hour_from)).format('HH:mm')
				: null;
			const service_afternoon_hour_to = values.service_afternoon_hour_to
				? dayjs(new Date(values.service_afternoon_hour_to)).format('HH:mm')
				: null;
			const action = setOfferServiceDescriptionPage(
				values.title,
				values.images,
				values.thumbnails,
				values.description,
				forWhomStr,
				values.service_availability_days,
				service_morning_hour_from,
				service_morning_hour_to,
				service_afternoon_hour_from,
				service_afternoon_hour_to,
			);
			dispatch({
				...action,
				onComplete: ({
					error,
					cancelled,
					data,
				}: {
					error: ApiErrorResponseType;
					cancelled: boolean;
					data: boolean;
				}) => {
					if (!error && !cancelled && data) {
						router.push(REAL_OFFER_ADD_SERVICE_PRICE(router.query.shop_link as string)).then();
					}
				},
			});
		},
		[dispatch, forWhomChoice, router],
	);

	// on change for whom
	const forWhomHandleChange = useCallback((event: SelectChangeEvent<Array<string>>) => {
		const {
			target: { value },
		} = event;
		setForWhomChoice(typeof value === 'string' ? value.split(',') : value);
	}, []);

	const { setFieldValue, values, handleChange, handleBlur, touched, errors, handleSubmit, isValid, isSubmitting } =
		useFormik({
			initialValues: {
				title: pickedTitle ? pickedTitle : '',
				images: pickedPictures.length > 0 ? pickedPictures : [],
				thumbnails: pickedThumbnails.length > 0 ? pickedThumbnails : [],
				description: pickedDescription ? pickedDescription : '',
				al_day: false,
				mo_day: false,
				tu_day: false,
				we_day: false,
				th_day: false,
				fr_day: false,
				sa_day: false,
				su_day: false,
				service_morning_hour_from: morningHourFrom ? dayjs(new Date(constructDate(morningHourFrom))) : null,
				service_morning_hour_to: morningHourTo ? dayjs(new Date(constructDate(morningHourTo))) : null,
				service_afternoon_hour_from: afternoonHourFrom ? dayjs(new Date(constructDate(afternoonHourFrom))) : null,
				service_afternoon_hour_to: afternoonHourTo ? dayjs(new Date(constructDate(afternoonHourTo))) : null,
			},
			validationSchema: addOfferServiceSchema,
			onSubmit: async (values, { setSubmitting }) => {
				let availabilityDaysString = '';
				if (values.al_day) {
					availabilityDaysString = availabilityDaysString + 'AL,';
				}
				if (values.mo_day) {
					availabilityDaysString = availabilityDaysString + 'MO,';
				}
				if (values.tu_day) {
					availabilityDaysString = availabilityDaysString + 'TU,';
				}
				if (values.we_day) {
					availabilityDaysString = availabilityDaysString + 'WE,';
				}
				if (values.th_day) {
					availabilityDaysString = availabilityDaysString + 'TH,';
				}
				if (values.fr_day) {
					availabilityDaysString = availabilityDaysString + 'FR,';
				}
				if (values.sa_day) {
					availabilityDaysString = availabilityDaysString + 'SA,';
				}
				if (values.su_day) {
					availabilityDaysString = availabilityDaysString + 'SU,';
				}
				if (
					values.title &&
					values.service_morning_hour_from &&
					values.service_morning_hour_to &&
					values.images.length > 0 &&
					address_name
				) {
					addDescriptionSubmitHandler({
						title: values.title,
						description: values.description,
						images: values.images,
						thumbnails: values.thumbnails,
						service_availability_days: availabilityDaysString,
						service_morning_hour_from: values.service_morning_hour_from
							? dayjs(new Date(values.service_morning_hour_from.toString())).toString()
							: null,
						service_morning_hour_to: values.service_morning_hour_to
							? dayjs(new Date(values.service_morning_hour_to.toString())).toString()
							: null,
						service_afternoon_hour_from: values.service_afternoon_hour_from
							? dayjs(new Date(values.service_afternoon_hour_from.toString())).toString()
							: null,
						service_afternoon_hour_to: values.service_afternoon_hour_to
							? dayjs(new Date(values.service_afternoon_hour_to.toString())).toString()
							: null,
					});
				}
				setSubmitting(false);
			},
		});

	useEffect(() => {
		if (pickedCategories.length === 0) {
			router.replace(REAL_OFFER_ADD_SERVICE_CATEGORIES(router.query.shop_link as string)).then();
		}
		if (availabilityDays) {
			availabilityDays.map((day) => {
				switch (day.code_day) {
					case 'AL':
						setFieldValue('al_day', true);
						setFieldValue('mo_day', true);
						setFieldValue('tu_day', true);
						setFieldValue('we_day', true);
						setFieldValue('th_day', true);
						setFieldValue('fr_day', true);
						setFieldValue('sa_day', true);
						setFieldValue('su_day', true);
						break;
					case 'MO':
						setFieldValue('mo_day', true);
						break;
					case 'TU':
						setFieldValue('tu_day', true);
						break;
					case 'WE':
						setFieldValue('we_day', true);
						break;
					case 'TH':
						setFieldValue('th_day', true);
						break;
					case 'FR':
						setFieldValue('fr_day', true);
						break;
					case 'SA':
						setFieldValue('sa_day', true);
						break;
					case 'SU':
						setFieldValue('su_day', true);
						break;
				}
			});
		}

		if (typeof pickedForWhom === 'string') {
			setForWhomChoice(getForWhomDataArray(pickedForWhom.split(',') as Array<OfferForWhomType>));
		}
	}, [availabilityDays, pickedForWhom, setFieldValue, pickedPictures, pickedCategories.length, router]);

	return (
		<>
			<main className={Styles.main}>
				<LeftSideBar step={activeStep} which="SERVICE" />
				<Box className={Styles.rootBox}>
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
					<Stack direction="column" spacing={{ xs: '36px', sm: '36px', md: '60px', lg: '60px', xl: '60px' }}>
						<Box className={Styles.marginLeft}>
							<HelperDescriptionHeader
								header="Décrivez votre offre"
								description="Commencez par lui donnez un titre, une description et ajoutez quelques photos."
							/>
						</Box>
						<form
							style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
							className={Styles.stackWrapper}
							onSubmit={(e) => e.preventDefault()}
						>
							<Stack direction="column" spacing={{ xs: '40px', sm: '40px', md: '48px', lg: '48px', xl: '48px' }}>
								<Stack direction="column" spacing="18px">
									<Stack direction="column" spacing="48px">
										<ClickAwayListener onClickAway={() => setTitleTooltip(false)}>
											<div>
												<CustomToolTip
													title="Soyez court et précis."
													onClose={() => setTitleTooltip(false)}
													open={titleTooltip}
													theme={titleTooltipTheme}
												>
													<CustomTextInput
														id="title"
														label="Titre"
														value={values.title}
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
											images={values.images}
											onChange={(e) => {
												setFieldValue('images', e);
											}}
											onCrop={(data, index) => {
												if (data) {
													setFieldValue(`thumbnails.${index}`, data);
												} else {
													const updatedList = __spreadArrays(values.thumbnails);
													updatedList.splice(index, 1);
													setFieldValue("thumbnails", updatedList);
												}
											}}
											maxNumber={4}
										/>
										<Stack direction="column" spacing="18px">
											<span className={Styles.spanTitle}>Description</span>
											<CustomTextArea
												type="text"
												id="description"
												label="Description"
												value={values.description}
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
								<Stack
									direction="column"
									spacing={{ xs: 0, sm: 0, md: '20px', lg: '20px', xl: '20px' }}
									alignItems="flex-end"
								>
									<Grid
										container
										columnSpacing={{ md: '120px', lg: '120px', xl: '120px' }}
										rowSpacing={{ xs: '40px', sm: '40px' }}
									>
										<Grid item md={6} sm={12} xs={12}>
											<RadioCheckElement title="Disponibilités" defaultValue={true}>
												<Stack
													direction="row"
													flexWrap="wrap"
													justifyContent="space-between"
													alignItems="center"
													className={Styles.rootStack}
												>
													<ThemeProvider theme={chipTheme}>
														<Grid container spacing={2}>
															<Grid item xs="auto">
																<Chip
																	id="al_day"
																	label="Tous les jours"
																	variant={values.al_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		if (values.al_day) {
																			setFieldValue('al_day', false);
																			setFieldValue('mo_day', false);
																			setFieldValue('tu_day', false);
																			setFieldValue('we_day', false);
																			setFieldValue('th_day', false);
																			setFieldValue('fr_day', false);
																			setFieldValue('sa_day', false);
																			setFieldValue('su_day', false);
																		} else {
																			setFieldValue('al_day', true);
																			setFieldValue('mo_day', true);
																			setFieldValue('tu_day', true);
																			setFieldValue('we_day', true);
																			setFieldValue('th_day', true);
																			setFieldValue('fr_day', true);
																			setFieldValue('sa_day', true);
																			setFieldValue('su_day', true);
																		}
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="mo_day"
																	label="Lundi"
																	variant={values.mo_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('mo_day', !values.mo_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="tu_day"
																	label="Mardi"
																	variant={values.tu_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('tu_day', !values.tu_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="we_day"
																	label="Mercredi"
																	variant={values.we_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('we_day', !values.we_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="th_day"
																	label="Jeudi"
																	variant={values.th_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('th_day', !values.th_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="fr_day"
																	label="Vendredi"
																	variant={values.fr_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('fr_day', !values.fr_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="sa_day"
																	label="Samedi"
																	variant={values.sa_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('sa_day', !values.sa_day);
																	}}
																/>
															</Grid>
															<Grid item xs="auto">
																<Chip
																	id="su_day"
																	label="Dimanche"
																	variant={values.su_day ? 'filled' : 'outlined'}
																	onClick={() => {
																		setFieldValue('su_day', !values.su_day);
																	}}
																/>
															</Grid>
														</Grid>
													</ThemeProvider>
												</Stack>
											</RadioCheckElement>
										</Grid>
										<Grid item md={6} sm={12} xs={12}>
											<HorairesRadioCheckContent switchOpen={true}>
												<Stack
													direction="column"
													flexWrap="wrap"
													justifyContent="flex-start"
													justifyItems="flex-start"
													className={Styles.rootStackHoraireContent}
												>
													<Stack direction="row" justifyContent="space-between" className={Styles.rootTimeInput}>
														<CustomTimeInput
															id="service_morning_hour_from"
															label="De"
															placeholder="De"
															onChange={(e) => {
																if (e) {
																	handleChange('service_morning_hour_from')(new Date(e.toString()).toString());
																} else {
																	handleChange('service_morning_hour_from')('');
																}
															}}
															value={values.service_morning_hour_from}
															theme={titleFieldTheme}
														/>
														<CustomTimeInput
															id="service_morning_hour_to"
															label="A"
															placeholder="A"
															onChange={(e) => {
																if (e) {
																	handleChange('service_morning_hour_to')(new Date(e.toString()).toString());
																} else {
																	handleChange('service_morning_hour_to')('');
																}
															}}
															value={values.service_morning_hour_to}
															theme={titleFieldTheme}
														/>
													</Stack>
													<div className={Styles.grayTitle}>
														<p>Horaire de l&apos;après-midi</p>
													</div>
													<Stack direction="row" justifyContent="space-between" className={Styles.rootTimeInput}>
														<CustomTimeInput
															id="service_afternoon_hour_from"
															label="De"
															placeholder="De"
															onChange={(e) => {
																if (e) {
																	handleChange('service_afternoon_hour_from')(new Date(e.toString()).toString());
																} else {
																	handleChange('service_afternoon_hour_from')('');
																}
															}}
															value={values.service_afternoon_hour_from}
															theme={titleFieldTheme}
														/>
														<CustomTimeInput
															id="service_afternoon_hour_to"
															label="A"
															placeholder="A"
															onChange={(e) => {
																if (e) {
																	handleChange('service_afternoon_hour_to')(new Date(e.toString()).toString());
																} else {
																	handleChange('service_afternoon_hour_to')('');
																}
															}}
															value={values.service_afternoon_hour_to}
															theme={titleFieldTheme}
														/>
													</Stack>
												</Stack>
											</HorairesRadioCheckContent>
										</Grid>
									</Grid>
								</Stack>
								<Stack direction="column" spacing="6px">
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
										<Grid container rowSpacing="26px">
											<Grid item md={6} sm={12} xs={12}>
												<ServiceMiniMap
													address_name={address_name}
													longitude={longitude}
													latitude={latitude}
													zone_by={zone_by}
													km_radius={km_radius}
													onClick={() => setLocalisationModalOpen(true)}
												/>
											</Grid>
										</Grid>
									) : (
										<span className={Styles.noAdresseFound}>Vous n&apos;avez pas encore renseigné votre adresse.</span>
									)}
								</Stack>
							</Stack>
							<div className={Styles.primaryButtonWrapper}>
								<PrimaryButton
									buttonText="Continuer"
									active={
										isValid && !isSubmitting && !!address_name && !!longitude && !!latitude && !!zone_by && !!km_radius
									}
									onClick={handleSubmit}
									type="submit"
								/>
							</div>
							{localisationModalOpen && (
								<CustomSwipeModal transition open={localisationModalOpen} handleClose={() => setLocalisationModalOpen(false)}>
									<Box sx={{ marginTop: '24px', height: '100%' }}>
										<ServiceLocalisation handleClose={() => setLocalisationModalOpen(false)} />
									</Box>
								</CustomSwipeModal>
							)}
						</form>
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
		} else {
			// user not authenticated
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
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
