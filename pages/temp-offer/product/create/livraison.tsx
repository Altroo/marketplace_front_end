import React, { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
import OfferStyles from '../../../../styles/temp-offer/create/offerCreateShared.module.sass';
import ShopStyles from '../../../../styles/temp-shop/create/shopCreateShared.module.sass';
import Styles from '../../../../styles/temp-offer/create/livraison.module.sass';
import { useRouter } from 'next/router';
import { Box, Stack, ThemeProvider, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../../components/headers/helperH1Header/helperH1Header';
import RadioCheckElement from '../../../../components/groupedComponents/temp-offer/radioCheckElement/radioCheckElement';
import ClickCollectSVG from '../../../../public/assets/svgs/globalIcons/click-and-collect-icon.svg';
import BlueAddSVG from '../../../../public/assets/svgs/globalIcons/blue-add.svg';
import DeliverySVG from '../../../../public/assets/svgs/globalIcons/delivery-icon.svg';
import Image from 'next/image';
import { getDefaultTheme } from '../../../../utils/themes';
import RightSwipeModal from '../../../../components/desktop/modals/rightSwipeModal/rightSwipeModal';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {
	getLocalisationName,
	getShopAddressName,
	getShopLatitude,
	getShopLongitude,
	getLocalOfferDeliveryCity1,
	getLocalOfferDeliveryAllCities1,
	getLocalOfferDeliveryPrice1,
	getLocalOfferDeliveryCity2,
	getLocalOfferDeliveryAllCities2,
	getLocalOfferDeliveryPrice2,
	getLocalOfferDeliveryCity3,
	getLocalOfferDeliveryAllCities3,
	getLocalOfferDeliveryPrice3,
	getLocalOfferAddressName,
	getLocalOfferLongitude,
	getLocalOfferLatitude,
	getLocalOfferDeliveryDays1,
	getLocalOfferDeliveryDays3,
	getLocalOfferDeliveryDays2,
	getLocalOfferCategories,
	getLocalOfferTitle,
	getLocalOfferPictures,
	getLocalOfferDescription,
	getLocalOfferForwhom,
	getLocalOfferColors,
	getLocalOfferSizes,
	getLocalOfferQuantity,
	getLocalOfferPrice,
	getLocalOfferPriceBy,
	getLocalOfferTags,
	getUserLocalOfferEditPK, getOfferOfferApi
} from "../../../../store/selectors";
import { PositionType } from '../../../../components/map/customMap';
import TopBarSaveClose from '../../../../components/groupedComponents/temp-shop/edit/renseignerMesInfos-Modals/topBar-Save-Close/topBarSaveClose';
import { clickAndCollectSchema } from '../../../../utils/formValidationSchemas';
import { Formik, Form } from 'formik';
import HelperDescriptionHeader from '../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import {
	emptyOfferDeliveries,
	offerPostRootProductAction,
	offerPutRootProductAction,
	setOfferDeliveries,
	setOfferDeliveryClickAndCollect,
} from '../../../../store/actions/offer/offerActions';
import DeliveryOptionElements from '../../../../components/groupedComponents/temp-offer/deliveryOptionElements/deliveryOptionElements';
import SharedStyles from '../../../../styles/temp-shop/create/shopCreateShared.module.sass';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { TEMP_OFFER_ADD_PRODUCT_PRICE, TEMP_SHOP_ADD_SHOP_NAME, TEMP_SHOP_EDIT_INDEX } from "../../../../utils/routes";
import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import ApiLoadingResponseOrError
	from "../../../../components/formikElements/apiLoadingResponseOrError/apiLoadingResponseOrError";
import { getCookie } from "cookies-next";

const CustomMap = dynamic(() => import('../../../../components/map/customMap'), {
	ssr: false,
});

const Livraison: NextPage = () => {
	const offer_pk = useAppSelector(getUserLocalOfferEditPK);
	const activeStep = '4';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [submitActive, setSubmitActive] = useState<boolean>(offer_pk !== null);
	const [openClick, setOpenClick] = useState<boolean>(false);
	const [openDelivery, setOpenDelivery] = useState<boolean>(false);
	let CENTER = {
		lat: 34.023827,
		lng: -6.833022,
	};
	// get previously selected from database
	const address_name = useAppSelector(getShopAddressName);
	const longitude = useAppSelector(getShopLongitude);
	const latitude = useAppSelector(getShopLatitude);
	const localisationName = useAppSelector(getLocalisationName);
	const pickedLocalisationName = useAppSelector(getLocalOfferAddressName);
	const pickedLongitude = useAppSelector(getLocalOfferLongitude);
	const pickedLatitude = useAppSelector(getLocalOfferLatitude);
	const deliveryCity1 = useAppSelector(getLocalOfferDeliveryCity1);
	const deliveryAllCity1 = useAppSelector(getLocalOfferDeliveryAllCities1);
	const deliveryPrice1 = useAppSelector(getLocalOfferDeliveryPrice1);
	const deliveryDays1 = useAppSelector(getLocalOfferDeliveryDays1);
	const deliveryCity2 = useAppSelector(getLocalOfferDeliveryCity2);
	const deliveryAllCity2 = useAppSelector(getLocalOfferDeliveryAllCities2);
	const deliveryPrice2 = useAppSelector(getLocalOfferDeliveryPrice2);
	const deliveryDays2 = useAppSelector(getLocalOfferDeliveryDays2);
	const deliveryCity3 = useAppSelector(getLocalOfferDeliveryCity3);
	const deliveryAllCity3 = useAppSelector(getLocalOfferDeliveryAllCities3);
	const deliveryPrice3 = useAppSelector(getLocalOfferDeliveryPrice3);
	const deliveryDays3 = useAppSelector(getLocalOfferDeliveryDays3);

	// selectors from previous pages
	const pickedCategories = useAppSelector(getLocalOfferCategories);
	const pickedTitle = useAppSelector(getLocalOfferTitle);
	const pickedPictures = useAppSelector(getLocalOfferPictures);
	const pickedDescription = useAppSelector(getLocalOfferDescription);
	const pickedForWhom = useAppSelector(getLocalOfferForwhom);
	const pickedColors = useAppSelector(getLocalOfferColors);
	const pickedSizes = useAppSelector(getLocalOfferSizes);
	const pickedQuantity = useAppSelector(getLocalOfferQuantity);
	const pickedPrice = useAppSelector(getLocalOfferPrice);
	const pickedPriceBy = useAppSelector(getLocalOfferPriceBy);
	const pickedTags = useAppSelector(getLocalOfferTags);
	const pickedAddressName = useAppSelector(getLocalOfferAddressName);

	// Api selectors
	const offerApi = useAppSelector(getOfferOfferApi);

	if (latitude && longitude) {
		CENTER = {
			lat: latitude,
			lng: longitude,
		};
	}

	// states
	const [position, setPosition] = useState<PositionType>({ lat: CENTER.lat, lng: CENTER.lng });
	// refs
	const longitudeRef = useRef<HTMLInputElement>(null);
	const latitudeRef = useRef<HTMLInputElement>(null);
	const addressNameRef = useRef<HTMLInputElement>(null);

	const positionHandler = (position: PositionType) => {
		setPosition((prevState) => {
			return { ...prevState, lat: position.lat, lng: position.lng };
		});
		if (
			longitudeRef.current !== null &&
			latitudeRef.current !== null &&
			addressNameRef.current !== null &&
			localisationName !== null
		) {
			longitudeRef.current.value = position.lng.toString();
			latitudeRef.current.value = position.lat.toString();
			addressNameRef.current.value = localisationName;
		}
	};

	type ClickAndCollectValues = {
		longitude: number;
		latitude: number;
		address_name: string | null;
	};

	// Override for edit
	let defaultClickAndCollectValues = null;
	if (offer_pk && pickedLongitude && pickedLatitude && pickedAddressName) {
		defaultClickAndCollectValues = {
			longitude: pickedLongitude,
			latitude: pickedLatitude,
			address_name: pickedAddressName,
		};
	}
	const [selectedClickAndCollect, setSelectedClickAndCollect] = useState<ClickAndCollectValues | null>(
		defaultClickAndCollectValues,
	);

	const editClickCollectHandler = (values: ClickAndCollectValues) => {
		dispatch(setOfferDeliveryClickAndCollect(values.longitude, values.latitude, values.address_name));
		setSelectedClickAndCollect(values);
		setOpenClick(false);
		setSubmitActive(true);
	};

	const [isFormOptionOneValid, setIsFormOptionOneValid] = useState<boolean>(false);
	const [isFormOptionTwoValid, setIsFormOptionTwoValid] = useState<boolean>(true);
	const [isFormOptionThreeValid, setIsFormOptionThreeValid] = useState<boolean>(true);

	const [secondDeliveryState, setSecondDeliveryState] = useState<boolean>(
		deliveryCity2 !== null && deliveryAllCity2 !== null,
	);
	const [thirdDeliveryState, setThirdDeliveryState] = useState<boolean>(
		deliveryCity3 !== null && deliveryAllCity3 !== null,
	);
	const [optionTwoNumber, setOptionTwoNumber] = useState<'2' | '3'>('2');
	const [optionThreeNumber, setOptionThreeNumber] = useState<'2' | '3'>('3');
	const [showEmptyDeliveriesMessage, setShowEmptyDeliveriesMessage] = useState<boolean>(true);

	const addNewDelivery = () => {
		if (!secondDeliveryState && !thirdDeliveryState) {
			setSecondDeliveryState(true);
			setThirdDeliveryState(false);
			setIsFormOptionTwoValid(false);
			setIsFormOptionThreeValid(true);
		} else if (secondDeliveryState && !thirdDeliveryState) {
			setSecondDeliveryState(true);
			setThirdDeliveryState(true);
			setIsFormOptionTwoValid(false);
			setIsFormOptionThreeValid(false);
		} else if (!secondDeliveryState && thirdDeliveryState) {
			setSecondDeliveryState(true);
			setIsFormOptionTwoValid(false);
		}
	};

	// Option 1
	const [cities1State, setCities1State] = useState<Array<string>>(deliveryCity1 ? deliveryCity1.split(',') : []);
	const [allCities1State, setAllCities1State] = useState<boolean>(deliveryAllCity1 ? deliveryAllCity1 : false);
	const [deliveryPrice1State, setDeliveryPrice1State] = useState<string>(deliveryPrice1 ? deliveryPrice1 : '');
	const [deliveryDays1State, setDeliveryDays1State] = useState<string>(deliveryDays1 ? deliveryDays1 : '');
	// Option 2
	const [cities2State, setCities2State] = useState<Array<string>>(deliveryCity2 ? deliveryCity2.split(',') : []);
	const [allCities2State, setAllCities2State] = useState<boolean>(deliveryAllCity2 ? deliveryAllCity2 : false);
	const [deliveryPrice2State, setDeliveryPrice2State] = useState<string>(deliveryPrice2 ? deliveryPrice2 : '');
	const [deliveryDays2State, setDeliveryDays2State] = useState<string>(deliveryDays2 ? deliveryDays2 : '');
	// Option 3
	const [cities3State, setCities3State] = useState<Array<string>>(deliveryCity3 ? deliveryCity3.split(',') : []);
	const [allCities3State, setAllCities3State] = useState<boolean>(deliveryAllCity3 ? deliveryAllCity3 : false);
	const [deliveryPrice3State, setDeliveryPrice3State] = useState<string>(deliveryPrice3 ? deliveryPrice3 : '');
	const [deliveryDays3State, setDeliveryDays3State] = useState<string>(deliveryDays3 ? deliveryDays3 : '');

	const [localisationSwitchOpen, setLocalisationSwitchOpen] = useState<boolean>(false);
	const [deliveriesSwitchOpen, setDeliveriesSwitchOpen] = useState<boolean>(false);

	useEffect(() => {
		if (localisationName && addressNameRef.current !== null) {
			addressNameRef.current.value = localisationName;
		}
		if (position.lng && longitudeRef.current !== null) {
			longitudeRef.current.value = position.lng.toString();
		}
		if (position.lat && latitudeRef.current !== null) {
			latitudeRef.current.value = position.lat.toString();
		}
		if (!secondDeliveryState && thirdDeliveryState) {
			setOptionThreeNumber('2');
		} else if (secondDeliveryState && thirdDeliveryState) {
			setOptionTwoNumber('2');
			setOptionThreeNumber('3');
		}
		if (deliveryCity1 !== null && deliveryAllCity1 !== null) {
			if (deliveryCity1.length > 0 || deliveryAllCity1) {
				setDeliveriesSwitchOpen(true);
				setShowEmptyDeliveriesMessage(false);
			}
		}
		if (pickedLocalisationName && pickedLongitude && pickedLatitude) {
			setLocalisationSwitchOpen(true);
		}
	}, [
		showEmptyDeliveriesMessage,
		deliveryAllCity1,
		deliveryCity1,
		localisationName,
		pickedLatitude,
		pickedLocalisationName,
		pickedLongitude,
		position.lat,
		position.lng,
		secondDeliveryState,
		thirdDeliveryState,
	]);

	const addDeliveriesHandler = () => {
		// Option 1 by default
		const data = {
			delivery_city_1: cities1State.join(','),
			all_cities_1: allCities1State,
			delivery_price_1: deliveryPrice1State,
			delivery_days_1: deliveryDays1State,
			delivery_city_2: '',
			all_cities_2: false,
			delivery_price_2: '',
			delivery_days_2: '',
			delivery_city_3: '',
			all_cities_3: false,
			delivery_price_3: '',
			delivery_days_3: '',
		};
		// Option 2
		if (secondDeliveryState) {
			data.delivery_city_2 = cities2State.join(',');
			data.all_cities_2 = allCities2State;
			data.delivery_price_2 = deliveryPrice2State;
			data.delivery_days_2 = deliveryDays2State;
		}
		// Option 3
		if (thirdDeliveryState) {
			data.delivery_city_3 = cities3State.join(',');
			data.all_cities_3 = allCities3State;
			data.delivery_price_3 = deliveryPrice3State;
			data.delivery_days_3 = deliveryDays3State;
		}
		dispatch(
			setOfferDeliveries(
				data.delivery_city_1,
				data.all_cities_1,
				data.delivery_price_1,
				data.delivery_days_1,
				data.delivery_city_2,
				data.all_cities_2,
				data.delivery_price_2,
				data.delivery_days_2,
				data.delivery_city_3,
				data.all_cities_3,
				data.delivery_price_3,
				data.delivery_days_3,
			),
		);
		setShowEmptyDeliveriesMessage(false);
		setOpenDelivery(false);
		setSubmitActive(true);
	};
	// const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(false);

	const handleSubmit = () => {
		// dispatch create
		if (!offer_pk) {
			dispatch(
				offerPostRootProductAction(
					'V',
					pickedCategories.join(','),
					pickedTitle,
					pickedPictures,
					pickedDescription,
					pickedForWhom,
					pickedColors,
					pickedSizes,
					pickedQuantity,
					pickedPrice,
					pickedPriceBy,
					pickedAddressName,
					pickedLongitude,
					pickedLatitude,
					deliveryCity1,
					deliveryAllCity1,
					deliveryPrice1,
					deliveryDays1,
					deliveryCity2,
					deliveryAllCity2,
					deliveryPrice2,
					deliveryDays2,
					deliveryCity3,
					deliveryAllCity3,
					deliveryPrice3,
					deliveryDays3,
					pickedTags,
					router,
				),
			);
		} else {
			// dispatch edit
			dispatch(
				offerPutRootProductAction(
					offer_pk,
					pickedCategories.join(','),
					pickedTitle,
					pickedPictures,
					pickedDescription,
					pickedForWhom,
					pickedColors,
					pickedSizes,
					pickedQuantity,
					pickedPrice,
					pickedPriceBy,
					pickedAddressName,
					pickedLongitude,
					pickedLatitude,
					deliveryCity1,
					deliveryAllCity1,
					deliveryPrice1,
					deliveryDays1,
					deliveryCity2,
					deliveryAllCity2,
					deliveryPrice2,
					deliveryDays2,
					deliveryCity3,
					deliveryAllCity3,
					deliveryPrice3,
					deliveryDays3,
					pickedTags,
					router,
				),
			);
		}
	};

	const emptyClickAndCollect = () => {
		setSelectedClickAndCollect(null);
	};

	const emptyDeliveries = () => {
		setCities1State([]);
		setAllCities1State(false);
		setDeliveryPrice1State('');
		setDeliveryDays1State('');
		setCities2State([]);
		setAllCities2State(false);
		setDeliveryPrice2State('');
		setDeliveryDays2State('');
		setCities3State([]);
		setAllCities3State(false);
		setDeliveryPrice3State('');
		setDeliveryDays3State('');
		setIsFormOptionThreeValid(false);
		setIsFormOptionTwoValid(false);
		dispatch(emptyOfferDeliveries('1'));
		dispatch(emptyOfferDeliveries('2'));
		dispatch(emptyOfferDeliveries('3'));
		setShowEmptyDeliveriesMessage(true);
	};

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<LeftSideBar step={activeStep} which="PRODUCT" />
			<main className={ShopStyles.main}>
				<Box className={Styles.boxWrapper}>
					<DesktopTopNavigationBar
						backHref={TEMP_OFFER_ADD_PRODUCT_PRICE}
						returnButton
						closeButtonHref={TEMP_SHOP_EDIT_INDEX}
					/>
					<MobileTopNavigationBar
						backHref={TEMP_OFFER_ADD_PRODUCT_PRICE}
						returnButton
						closeButtonHref={TEMP_SHOP_EDIT_INDEX}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Choisir des modes de livraison"
						HelpText="Quelle différence entre livraison et Click & Collect"
						headerClasses={OfferStyles.topHeader}
					/>
					<Stack direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
						<Stack direction="column" spacing={5} className={Styles.buttonCardWrapper}>
							<RadioCheckElement
								title="Click & collect"
								defaultValue={localisationSwitchOpen}
								emptyStates={emptyClickAndCollect}
							>
								<Button
									color="primary"
									onClick={() => setOpenClick(true)}
									className={Styles.buttonCard}
								>
									<Stack
										direction="row"
										spacing={1}
										sx={{ width: '320px', height: '161px' }}
										justifyContent="center"
										alignItems="center"
									>
										<Image src={ClickCollectSVG} width={70} height={70} alt="" />
										{/* eslint-disable-next-line react/no-unescaped-entities */}
										<p
											className={`${Styles.defaultLocalisationName} ${
												selectedClickAndCollect &&
												selectedClickAndCollect.address_name &&
												Styles.activeCardValue
											}`}
										>
											{selectedClickAndCollect && selectedClickAndCollect.address_name
												? selectedClickAndCollect.address_name
												: "Renseignez l'adresse de votre boutique"}
										</p>
									</Stack>
								</Button>
								<RightSwipeModal open={openClick} handleClose={() => setOpenClick(false)}>
									<Stack direction="column" spacing={4} sx={{ height: '100%' }}>
										<Formik
											enableReinitialize={true}
											initialValues={{
												longitude: position.lng ? position.lng : CENTER.lng,
												latitude: position.lat ? position.lat : CENTER.lat,
												address_name: localisationName ? localisationName : address_name,
											}}
											validateOnMount={true}
											onSubmit={(values) => {
												editClickCollectHandler(values);
											}}
											validationSchema={clickAndCollectSchema}
										>
											{({ handleChange, handleSubmit, values, isValid, isSubmitting }) => (
												<Form style={{ height: '100%' }}>
													<Stack
														direction="column"
														justifyContent="space-between"
														alignContent="space-between"
														sx={{ height: '100%' }}
													>
														<TopBarSaveClose
															buttonText="Enregistrer"
															handleClose={() => setOpenClick(false)}
															handleSubmit={handleSubmit}
															isValid={isValid}
															isSubmitting={isSubmitting}
															cssClasses={Styles.topContainer}
														/>
														<HelperDescriptionHeader
															header="Click'n collect"
															description="Renseignez l'adresse de votre point de collect"
															headerClasses={Styles.header}
															descriptionClasses={Styles.description}
															cssClasses={Styles.topContainer}
														/>
														<input
															type="hidden"
															id="longitude"
															ref={longitudeRef}
															value={values.longitude ? values.longitude : ''}
															onChange={handleChange('longitude')}
														/>
														<input
															type="hidden"
															id="latitude"
															ref={latitudeRef}
															value={values.latitude ? values.latitude : ''}
															onChange={handleChange('latitude')}
														/>
														<input
															type="hidden"
															id="address_name"
															ref={addressNameRef}
															value={values.address_name ? values.address_name : ''}
															onChange={handleChange('address_name')}
														/>
														<CustomMap
															readOnly={false}
															position={position}
															positionHandler={positionHandler}
															zoneBy="A"
															kmRadius={13}
														/>
													</Stack>
												</Form>
											)}
										</Formik>
									</Stack>
								</RightSwipeModal>
							</RadioCheckElement>
							<RadioCheckElement
								title="Livraison"
								defaultValue={deliveriesSwitchOpen}
								emptyStates={emptyDeliveries}
							>
								<Button
									color="primary"
									onClick={() => setOpenDelivery(true)}
									className={Styles.buttonCard}
								>
									<Stack
										direction="row"
										spacing={1}
										sx={{ width: '320px', height: '161px' }}
										justifyContent="center"
										alignItems="center"
									>
										<Image src={DeliverySVG} width={70} height={70} alt="" />
										<div
											className={`${Styles.defaultLocalisationName} ${
												(deliveryCity1 ||
													deliveryCity2 ||
													deliveryCity3 ||
													deliveryAllCity1 ||
													deliveryAllCity2 ||
													deliveryAllCity3) &&
												Styles.activeCardValue
											}`}
										>
											{(deliveryCity1 || deliveryAllCity1) && (
												<Stack direction="row" justifyContent="space-between">
													<span>
														{deliveryCity1
															? deliveryCity1.substring(0, 14) + '...'
															: deliveryAllCity1
															? 'Tout le maroc'
															: null}
													</span>
													<span>
														{deliveryPrice1 !== '0' ? deliveryPrice1 + 'DH' : 'Gratuite'}
													</span>
												</Stack>
											)}
											{(deliveryCity2 || deliveryAllCity2) && (
												<Stack direction="row" justifyContent="space-between">
													<span>
														{deliveryCity2
															? deliveryCity2.substring(0, 14) + '...'
															: deliveryAllCity2
															? 'Tout le maroc'
															: null}
													</span>
													<span>
														{deliveryPrice2 !== '0' ? deliveryPrice2 + 'DH' : 'Gratuite'}
													</span>
												</Stack>
											)}
											{(deliveryCity3 || deliveryAllCity3) && (
												<Stack direction="row" justifyContent="space-between">
													<span>
														{deliveryCity3
															? deliveryCity3.substring(0, 14) + '...'
															: deliveryAllCity3
															? 'Tout le maroc'
															: null}
													</span>
													<span>
														{deliveryPrice3 !== '0' ? deliveryPrice3 + 'DH' : 'Gratuite'}
													</span>
												</Stack>
											)}
											{/* eslint-disable-next-line react/no-unescaped-entities */}
											{showEmptyDeliveriesMessage
												? "Définissez jusqu'à 3 types de livraison différentes"
												: null}
										</div>
									</Stack>
								</Button>
								<RightSwipeModal open={openDelivery} handleClose={() => setOpenDelivery(false)}>
									<Stack direction="column" spacing={2} justifyContent="flex-start">
										<Stack direction="column" sx={{ height: '100%' }}>
											<TopBarSaveClose
												buttonText="Enregistrer"
												handleClose={() => setOpenDelivery(false)}
												handleSubmit={addDeliveriesHandler}
												isValid={
													isFormOptionOneValid ||
													isFormOptionTwoValid ||
													isFormOptionThreeValid
												}
												cssClasses={Styles.topContainer}
											/>
											<HelperDescriptionHeader
												header="Définir un prix de livraison"
												HelpText="Pourquoi définir une adresse"
												headerClasses={Styles.header}
												descriptionClasses={Styles.description}
												cssClasses={Styles.topContainer}
											/>
										</Stack>
										<DeliveryOptionElements
											setIsFormValidState={setIsFormOptionOneValid}
											option="1"
											citiesState={cities1State}
											setCitiesState={setCities1State}
											allCitiesState={allCities1State}
											setAllCitiesState={setAllCities1State}
											deliveryPriceState={deliveryPrice1State}
											setDeliveryPriceState={setDeliveryPrice1State}
											deliveryDaysState={deliveryDays1State}
											setDeliveryDaysState={setDeliveryDays1State}
										/>
										{secondDeliveryState ? (
											<DeliveryOptionElements
												setIsFormValidState={setIsFormOptionTwoValid}
												option={optionTwoNumber}
												setNextDeliveryState={setSecondDeliveryState}
												citiesState={cities2State}
												setCitiesState={setCities2State}
												allCitiesState={allCities2State}
												setAllCitiesState={setAllCities2State}
												deliveryPriceState={deliveryPrice2State}
												setDeliveryPriceState={setDeliveryPrice2State}
												deliveryDaysState={deliveryDays2State}
												setDeliveryDaysState={setDeliveryDays2State}
											/>
										) : null}
										{thirdDeliveryState ? (
											<DeliveryOptionElements
												setIsFormValidState={setIsFormOptionThreeValid}
												option={optionThreeNumber}
												setNextDeliveryState={setThirdDeliveryState}
												citiesState={cities3State}
												setCitiesState={setCities3State}
												allCitiesState={allCities3State}
												setAllCitiesState={setAllCities3State}
												deliveryPriceState={deliveryPrice3State}
												setDeliveryPriceState={setDeliveryPrice3State}
												deliveryDaysState={deliveryDays3State}
												setDeliveryDaysState={setDeliveryDays3State}
											/>
										) : null}
										{/* Add new delivery */}
										{!secondDeliveryState || !thirdDeliveryState ? (
											<Button
												onClick={() => {
													addNewDelivery();
												}}
												className={Styles.addDeliveryButton}
												color="primary"
											>
												<Image src={BlueAddSVG} width={20} height={20} alt="" />
												<span>Ajouter une livraison</span>
											</Button>
										) : null}
									</Stack>
								</RightSwipeModal>
							</RadioCheckElement>
						</Stack>
					</Stack>
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
						<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
							<PrimaryButton
								buttonText={offer_pk ? "Modifier" : "Publier"}
								active={submitActive}
								onClick={handleSubmit}
								type="submit"
							/>
						</div>
					</Stack>
				</Box>
				<ApiLoadingResponseOrError
					inProgress={offer_pk ? offerApi.isEditInProgress : offerApi.isAddInProgress}
					promiseStatus={offer_pk ? offerApi.editPromiseStatus : offerApi.addPromiseStatus}
					error={offerApi.error}
				/>
			</main>
		</ThemeProvider>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
	return {
		props: {},
	}
}

export default Livraison;
