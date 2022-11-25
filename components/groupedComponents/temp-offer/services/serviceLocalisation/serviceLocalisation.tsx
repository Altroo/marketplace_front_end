import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import {
	getLocalisationName,
	getLocalOfferServiceAddress,
	getLocalOfferServiceKmRadius,
	getLocalOfferServiceLatitude,
	getLocalOfferServiceLongitude,
	getLocalOfferServiceZoneBy,
} from "../../../../../store/selectors";
import { ShopZoneByType } from '../../../../../types/shop/shopTypes';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import TopBarSaveClose from '../../../../groupedComponents/temp-shop/edit/renseignerMesInfos-Modals/topBar-Save-Close/topBarSaveClose';
import HelperDescriptionHeader from '../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import Styles from './serviceLocalisation.module.sass';
import ZoneByNav from '../../../../map/zoneByNav/zoneByNav';
import { PositionType } from '../../../../map/customMap';
import { serviceAddressSchema } from "../../../../../utils/formValidationSchemas";
import { setOfferServiceLocalisation } from "../../../../../store/actions/offer/offerActions";

const CustomMap = dynamic(() => import('../../../../map/customMap'), {
	ssr: false,
});

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const ServiceLocalisation: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	let CENTER = {
		lat: 34.023827,
		lng: -6.833022,
	};
	// get previously selected from database
	const address_name = useAppSelector(getLocalOfferServiceAddress);
	const longitude = useAppSelector(getLocalOfferServiceLongitude);
	const latitude = useAppSelector(getLocalOfferServiceLatitude);
	const zone_by = useAppSelector(getLocalOfferServiceZoneBy);
	const km_radius = useAppSelector(getLocalOfferServiceKmRadius);
	// will remain
	const localisationName = useAppSelector(getLocalisationName);

	if (latitude && longitude) {
		CENTER = {
			lat: latitude,
			lng: longitude,
		};
	}
	// states
	const [position, setPosition] = useState<PositionType>({ lat: CENTER.lat, lng: CENTER.lng });
	const [kmRadiusState, setKmRadiusState] = useState<number>(13);
	const [zoneByState, setZoneByState] = useState<ShopZoneByType>('A');
	// refs
	const zoneByRef = useRef<HTMLInputElement>(null);
	const longitudeRef = useRef<HTMLInputElement>(null);
	const latitudeRef = useRef<HTMLInputElement>(null);
	const addressNameRef = useRef<HTMLInputElement>(null);
	const kmRadiusRef = useRef<HTMLInputElement>(null);

	type serviceAdressValues = {
		service_zone_by: ShopZoneByType | null;
		service_longitude: number | null;
		service_latitude: number | null;
		service_address: string | null;
		service_km_radius: number | null;
	};

	const localisationHandler = (values: serviceAdressValues) => {
		dispatch(
			setOfferServiceLocalisation(
				values.service_zone_by,
				values.service_longitude,
				values.service_latitude,
				values.service_address,
				values.service_km_radius,
			),
		);
		props.handleClose();
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
		if (zoneByState && zoneByRef.current !== null) {
			zoneByRef.current.value = zoneByState;
		}
		if (kmRadiusState && kmRadiusRef.current !== null) {
			kmRadiusRef.current.value = kmRadiusState.toString();
		}
	}, [kmRadiusState, localisationName, position.lat, position.lng, zoneByState]);

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

	const zoneByHandler = (zoneBy: ShopZoneByType) => {
		setZoneByState(zoneBy);
		if (zoneByRef.current !== null) {
			zoneByRef.current.value = zoneBy;
		}
	};

	const kmRadiusHandler = (kmRadius: number) => {
		setKmRadiusState(kmRadius);
		if (kmRadiusRef.current !== null) {
			kmRadiusRef.current.value = kmRadius.toString();
		}
	};
	return (
		<Stack direction="column" spacing={4} style={{ height: '100%' }}>
			<Formik
				enableReinitialize={true}
				initialValues={{
					service_zone_by: zoneByState ? zoneByState : zone_by,
					service_longitude: position.lng ? position.lng : CENTER.lng,
					service_latitude: position.lat ? position.lat : CENTER.lat,
					service_address : localisationName ? localisationName : address_name,
					service_km_radius: kmRadiusState ? kmRadiusState : km_radius,
				}}
				validateOnMount={true}
				onSubmit={(values) => {
					localisationHandler(values);
				}}
				validationSchema={serviceAddressSchema}
			>
				{({
					handleChange,
					handleSubmit,
					values,
					isValid,
					isSubmitting,
				}) => (
					<Form style={{ height: '100%' }} onSubmit={(e) => e.preventDefault()}>
						<Stack
							direction="column"
							justifyContent="space-between"
							alignContent="space-between"
							style={{ height: '100%' }}
						>
							<TopBarSaveClose
								buttonText="Enregistrer"
								handleClose={props.handleClose}
								handleSubmit={handleSubmit}
								isSubmitting={isSubmitting}
								isValid={isValid}
								cssClasses={Styles.topContainer}
							/>
							<HelperDescriptionHeader
								header="Définir une zone"
								description="Pour que vos clients vous trouve"
								// HelpText="Pourquoi définir une adresse"
								headerClasses={Styles.header}
								descriptionClasses={Styles.description}
								cssClasses={Styles.topContainer}
							/>
							<input
								type="hidden"
								id="service_zone_by"
								ref={zoneByRef}
								value={values.service_zone_by as ShopZoneByType}
								onChange={handleChange('service_zone_by')}
							/>
							<input
								type="hidden"
								id="service_longitude"
								ref={longitudeRef}
								value={values.service_longitude ? values.service_longitude : ''}
								onChange={handleChange('service_longitude')}
							/>
							<input
								type="hidden"
								id="service_latitude"
								ref={latitudeRef}
								value={values.service_latitude ? values.service_latitude : ''}
								onChange={handleChange('service_latitude')}
							/>
							<input
								type="hidden"
								id="service_address"
								ref={addressNameRef}
								value={values.service_address ? values.service_address : ''}
								onChange={handleChange('service_address')}
							/>
							<input
								type="hidden"
								id="service_km_radius"
								ref={kmRadiusRef}
								value={values.service_km_radius ? values.service_km_radius : ''}
								onChange={handleChange('service_km_radius')}
							/>

							<Stack direction="column" justifyContent="space-around">
								<ZoneByNav zoneBy={zoneByState} zoneByHandler={zoneByHandler} />
							</Stack>

							<CustomMap
								readOnly={false}
								position={position}
								positionHandler={positionHandler}
								zoneBy={zoneByState}
								kmRadiusHandler={kmRadiusHandler}
								kmRadius={kmRadiusState}
							/>
						</Stack>
					</Form>
				)}
			</Formik>
		</Stack>
	);
};

export default ServiceLocalisation;
