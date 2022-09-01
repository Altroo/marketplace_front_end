// Altroo
// 1) Created without components
// 2) Animation doesn't match parent (checkboxes)
// 3) missing get last used address & deliveries
// 4)
import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import OfferStyles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import ShopStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import Styles from '../../../../styles/offer/create/livraison.module.sass';
import { useRouter } from 'next/router';
import { Box, Stack, ThemeProvider, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import HelperH1Header from '../../../../components/headers/helperH1Header/helperH1Header';
import RadioCheckElement from '../../../../components/groupedComponents/offer/radioCheckElement/radioCheckElement';
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
} from '../../../../store/selectors';
import { PositionType } from '../../../../components/map/customMap';
import TopBarSaveClose from '../../../../components/groupedComponents/shop/edit/renseignerMesInfos-Modals/topBar-Save-Close/topBarSaveClose';
import { clickAndCollectSchema } from '../../../../utils/formValidationSchemas';
import { Formik, Form } from 'formik';
import HelperDescriptionHeader from '../../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import { setOfferDeliveries, setOfferDeliveryClickAndCollect } from '../../../../store/actions/offer/offerActions';
import DeliveryOptionElements from '../../../../components/groupedComponents/offer/deliveryOptionElements/deliveryOptionElements';

const CustomMap = dynamic(() => import('../../../../components/map/customMap'), {
	ssr: false,
});

const Livraison: NextPage = () => {
	const activeStep = '4';
	// const router = useRouter();
	const dispatch = useAppDispatch();
	// const [submitActive, setSubmitActive] = useState<boolean>(false);
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

	const deliveryCity1 = useAppSelector(getLocalOfferDeliveryCity1);
	const deliveryAllCity1 = useAppSelector(getLocalOfferDeliveryAllCities1);
	const deliveryPrice1 = useAppSelector(getLocalOfferDeliveryPrice1);
	const deliveryCity2 = useAppSelector(getLocalOfferDeliveryCity2);
	const deliveryAllCity2 = useAppSelector(getLocalOfferDeliveryAllCities2);
	const deliveryPrice2 = useAppSelector(getLocalOfferDeliveryPrice2);
	const deliveryCity3 = useAppSelector(getLocalOfferDeliveryCity3);
	const deliveryAllCity3 = useAppSelector(getLocalOfferDeliveryAllCities3);
	const deliveryPrice3 = useAppSelector(getLocalOfferDeliveryPrice3);



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

	const editClickCollectHandler = (values: ClickAndCollectValues) => {
		dispatch(setOfferDeliveryClickAndCollect(values.longitude, values.latitude, values.address_name));
		setOpenClick(false);
	};

	const [isFormOptionOneValid, setIsFormOptionOneValid] = useState<boolean>(false);
	const [isFormOptionTwoValid, setIsFormOptionTwoValid] = useState<boolean>(true);
	const [isFormOptionThreeValid, setIsFormOptionThreeValid] = useState<boolean>(true);

	const [secondDeliveryState, setSecondDeliveryState] = useState<boolean>(false);
	const [thirdDeliveryState, setThirdDeliveryState] = useState<boolean>(false);
	const [optionTwoNumber, setOptionTwoNumber] = useState<'2' | '3'>('2');
	const [optionThreeNumber, setOptionThreeNumber] = useState<'2' | '3'>('3');

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
	}, [localisationName, position.lat, position.lng, secondDeliveryState, thirdDeliveryState]);

	// Option 1
	const [cities1State, setCities1State] = useState<Array<string>>([]);
	const [allCities1State, setAllCities1State] = useState<boolean>(false);
	const [deliveryPrice1State, setDeliveryPrice1State] = useState<string>('');
	const [deliveryDays1State, setDeliveryDays1State] = useState<string>('');
	// Option 2
	const [cities2State, setCities2State] = useState<Array<string>>([]);
	const [allCities2State, setAllCities2State] = useState<boolean>(false);
	const [deliveryPrice2State, setDeliveryPrice2State] = useState<string>('');
	const [deliveryDays2State, setDeliveryDays2State] = useState<string>('');
	// Option 3
	const [cities3State, setCities3State] = useState<Array<string>>([]);
	const [allCities3State, setAllCities3State] = useState<boolean>(false);
	const [deliveryPrice3State, setDeliveryPrice3State] = useState<string>('');
	const [deliveryDays3State, setDeliveryDays3State] = useState<string>('');

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
		// close the modal
		setOpenClick(false);
	};

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<LeftSideBar step={activeStep} which="PRODUCT" />
			<main className={ShopStyles.main}>
				<Box sx={{ width: '100%', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
					{/*<DesktopTopNavigationBar backHref={OFFER_ADD_PRODUCT_DESCRIPTION} returnButton />*/}
					{/*<MobileTopNavigationBar backHref={OFFER_ADD_PRODUCT_DESCRIPTION} returnButton />*/}
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Choisir des modes de livraison"
						HelpText="Quelle différence entre livraison et Click & Collect"
						headerClasses={OfferStyles.topHeader}
					/>

					<Stack direction="column" spacing={5} sx={{ width: '360px', marginTop: '2rem' }}>
						<RadioCheckElement title="Click & collect">
							<Button color="primary" onClick={() => setOpenClick(true)} className={Styles.buttonCard}>
								<Stack
									direction="row"
									spacing={1}
									sx={{ width: '320px', height: '161px' }}
									justifyContent="center"
									alignItems="center"
								>
									<Image src={ClickCollectSVG} width={70} height={70} alt="" />
									{/* eslint-disable-next-line react/no-unescaped-entities */}
									<p className={`${Styles.defaultLocalisationName} ${localisationName && Styles.activeCardValue}`}>{localisationName ? localisationName : "Renseignez l'adresse de votre boutique"}</p>
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
						<RadioCheckElement title="Livraison">
							<Button color="primary" onClick={() => setOpenDelivery(true)} className={Styles.buttonCard}>
								<Stack
									direction="row"
									spacing={1}
									sx={{ width: '320px', height: '161px' }}
									justifyContent="center"
									alignItems="center"
								>
									<Image src={DeliverySVG} width={70} height={70} alt="" />
									<div className={`${Styles.defaultLocalisationName} ${(deliveryCity1 || deliveryCity2 || deliveryCity3 || deliveryAllCity1 || deliveryAllCity2 || deliveryAllCity3)  && Styles.activeCardValue}`}>
										{
											(deliveryCity1 || deliveryAllCity1) && (
												<Stack direction="row" justifyContent="space-between">
													<span>{deliveryCity1 ? deliveryCity1.substring(0, 14) + '...' : deliveryAllCity1 ? "Tout le maroc" : null}</span>
													<span>{deliveryPrice1 !== "0" ? deliveryPrice1 : "Gratuite"}</span>
												</Stack>
											)
										}
										{
											(deliveryCity2 || deliveryAllCity2) && (
												<Stack direction="row" justifyContent="space-between">
													<span>{deliveryCity2 ? deliveryCity2.substring(0, 14) + '...' : deliveryAllCity2 ? "Tout le maroc" : null}</span>
													<span>{deliveryPrice2 !== "0" ? deliveryPrice2 : "Gratuite"}</span>
												</Stack>
											)
										}
										{
											(deliveryCity3 || deliveryAllCity3) && (
												<Stack direction="row" justifyContent="space-between">
													<span>{deliveryCity3 ? deliveryCity3.substring(0, 14) + '...' : deliveryAllCity3 ? "Tout le maroc" : null}</span>
													<span>{deliveryPrice3 !== "0" ? deliveryPrice3 : "Gratuite"}</span>
												</Stack>
											)
										}
										{/* eslint-disable-next-line react/no-unescaped-entities */}
										{(deliveryCity1 !== '' || deliveryAllCity1) ? null : "Définissez jusqu'à 3 types de livraison différentes"}
									</div>
								</Stack>
							</Button>
							<RightSwipeModal open={openDelivery} handleClose={() => setOpenDelivery(false)}>
								<Stack direction="column" spacing={2} justifyContent="flex-start">
									<Stack direction="column" sx={{ height: '100%' }}>
										<TopBarSaveClose
											handleClose={() => setOpenDelivery(false)}
											handleSubmit={addDeliveriesHandler}
											isValid={
												isFormOptionOneValid && isFormOptionTwoValid && isFormOptionThreeValid
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
				</Box>
			</main>
		</ThemeProvider>
	);
};

export default Livraison;
