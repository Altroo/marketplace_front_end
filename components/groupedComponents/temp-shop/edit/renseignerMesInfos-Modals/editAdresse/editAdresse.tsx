import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getLocalisationName,
	getNewShopApiError,
	getNewShopEditPromiseStatus,
	getNewShopIsEditInProgress,
	getShopAddressName,
	getShopKmRadius,
	getShopLatitude,
	getShopLongitude,
	getShopZoneBy,
} from '../../../../../../store/selectors';
import { shopPatchAddressAction } from '../../../../../../store/actions/shop/shopActions';
import { ShopZoneByType } from '../../../../../../types/shop/shopTypes';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import ApiProgress from '../../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import ApiAlert from '../../../../../formikElements/apiLoadingResponseOrError/apiAlert/apiAlert';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import Styles from './editAdresse.module.sass';
import ZoneByNav from '../../../../../map/zoneByNav/zoneByNav';
import { PositionType } from '../../../../../map/customMap';
import { shopAddressSchema } from '../../../../../../utils/formValidationSchemas';
import { offerGetAvailableFiltersByShopID } from '../../../../../../store/actions/offer/offerActions';
import { ApiErrorResponseType, SagaCallBackOnCompleteBoolType } from '../../../../../../types/_init/_initTypes';
import { OfferGetAvailableShopFiltersType } from '../../../../../../types/offer/offerTypes';
import { useRouter } from 'next/router';

const CustomMap = dynamic(() => import('../../../../../map/customMap'), {
	ssr: false,
});

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditAdresse: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	let CENTER = {
		lat: 34.023827,
		lng: -6.833022,
	};
	// get previously selected from database
	const address_name = useAppSelector(getShopAddressName);
	const longitude = useAppSelector(getShopLongitude);
	const latitude = useAppSelector(getShopLatitude);
	const zone_by = useAppSelector(getShopZoneBy);
	const km_radius = useAppSelector(getShopKmRadius);
	const localisationName = useAppSelector(getLocalisationName);

	if (latitude && longitude) {
		CENTER = {
			lat: latitude,
			lng: longitude,
		};
	}
	// states
	const [position, setPosition] = useState<PositionType>({ lat: CENTER.lat, lng: CENTER.lng });
	const [kmRadiusState, setKmRadiusState] = useState<number>(km_radius ? km_radius : 13);
	const [zoneByState, setZoneByState] = useState<ShopZoneByType>(zone_by);
	// refs
	const zoneByRef = useRef<HTMLInputElement>(null);
	const longitudeRef = useRef<HTMLInputElement>(null);
	const latitudeRef = useRef<HTMLInputElement>(null);
	const addressNameRef = useRef<HTMLInputElement>(null);
	const kmRadiusRef = useRef<HTMLInputElement>(null);

	// selectors
	const isEditInProgress = useAppSelector(getNewShopIsEditInProgress);
	const editPromiseStatus = useAppSelector(getNewShopEditPromiseStatus);
	const apiError = useAppSelector(getNewShopApiError);

	type adressValues = {
		zone_by: ShopZoneByType;
		longitude: number | null;
		latitude: number | null;
		address_name: string | null;
		km_radius: number | null;
	};

	const editAdresseHandler = (values: adressValues) => {
		const action = shopPatchAddressAction(
			values.zone_by,
			values.longitude,
			values.latitude,
			values.address_name,
			values.km_radius,
		);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
				if (!error && !cancelled && data) {
					props.handleClose();
				}
			},
		});
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
					zone_by: zoneByState ? zoneByState : zone_by,
					longitude: position.lng ? position.lng : CENTER.lng,
					latitude: position.lat ? position.lat : CENTER.lat,
					address_name: localisationName ? localisationName : address_name,
					km_radius: kmRadiusState ? kmRadiusState : km_radius,
				}}
				validateOnMount={true}
				onSubmit={(values) => {
					editAdresseHandler(values);
				}}
				validationSchema={shopAddressSchema}
			>
				{({ handleChange, handleSubmit, values, isValid, isSubmitting }) => (
					<Form style={{ height: '100%' }}>
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
								HelpText="Pourquoi définir une adresse"
								headerClasses={Styles.header}
								descriptionClasses={Styles.description}
								cssClasses={Styles.topContainer}
							/>
							<input
								type="hidden"
								id="zone_by"
								ref={zoneByRef}
								value={values.zone_by}
								onChange={handleChange('zone_by')}
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
							<input
								type="hidden"
								id="km_radius"
								ref={kmRadiusRef}
								value={values.km_radius ? values.km_radius : ''}
								onChange={handleChange('km_radius')}
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
			{isEditInProgress && editPromiseStatus === 'PENDING' && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '45%', left: '45%' }}
					backdropColor="#FFFFFF"
					circularColor="#FFFFFF"
				/>
			)}
			{!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError && (
				<ApiAlert
					errorDetails={apiError.details}
					cssStyle={{ position: 'absolute', left: '0', top: '50%', margin: '0 -60px -60px -60px' }}
				/>
			)}
		</Stack>
	);
};

export default EditAdresse;
