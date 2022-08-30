import React, { useRef } from 'react';
import Styles from './customMap.module.sass';
import { useAppDispatch } from '../../utils/hooks';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { placesGetGeolocalisationAction } from '../../store/actions/places/placesActions';
import { MarkerProps } from 'react-leaflet/lib/Marker';
import { ShopZoneByType } from '../../types/shop/shopTypes';
import LocalisationNamePopup from './localisationNamePopup/localisationNamePopup';

export type PositionType = { lat: number; lng: number };
type Props = {
	position: PositionType;
	readOnly: boolean;
	zoneBy: ShopZoneByType;
	kmRadius: number;
	kmRadiusHandler?: (kmRadius: number) => void;
	positionHandler?: (position: PositionType) => void;
	children?: React.ReactNode;
};
const CustomMap: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const markerRef = useRef<L.Marker>(null);
	const mapRef = useRef<L.Map>(null);

	const adresseSVG =
		'<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>';
	const adresseSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(adresseSVG).toString('base64');

	const adresseIcon = new L.Icon({
		iconUrl: adresseSVGURL,
		iconRetinaUrl: adresseSVGURL,
		iconSize: [46, 56],
		iconAnchor: [18, 50],
		popupAnchor: [0, -32],
	});

	const secteurSVG =
		'<svg width="394" height="394" viewBox="0 0 394 394" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.11" cx="197" cy="197" r="197" fill="#0274D7"/><circle cx="197" cy="197" r="11" fill="#0D070B"/></svg>';
	const secteurSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(secteurSVG).toString('base64');
	const secteurIcon = new L.Icon({
		iconUrl: secteurSVGURL,
		iconRetinaUrl: secteurSVGURL,
		iconSize: [394, 394],
		iconAnchor: [394 / 2, 394 / 2],
		popupAnchor: [0, 0],
	});

	const AdresseMarker = (props: MarkerProps) => {
		const position = props.position as [number, number];
		return <Marker autoPan={true} draggable={false} position={position} ref={markerRef} icon={props.icon}></Marker>;
	};

	const SecteurMarker = (props: MarkerProps) => {
		const position = props.position as [number, number];
		return <Marker autoPan={true} draggable={false} position={position} ref={markerRef} icon={props.icon}></Marker>;
	};

	function MapMoveStart() {
		const map = useMapEvent('move', () => {
			const marker = markerRef.current;
			const centerOfMap = map.getCenter();
			if (marker !== null && props.positionHandler) {
				marker.setLatLng(centerOfMap);
				props.positionHandler({ lat: centerOfMap.lat, lng: centerOfMap.lng });
			}
		});
		return null;
	}

	function MapMoveEnd() {
		useMapEvent('moveend', () => {
			const map = mapRef.current;
			if (map && props.kmRadiusHandler){
				props.kmRadiusHandler(map.getZoom());
			}
			dispatch(placesGetGeolocalisationAction(props.position.lng, props.position.lat));
		});
		return null;
	}

	return (
		<div className={Styles.mapContainer}>
			<MapContainer
				center={[props.position.lat, props.position.lng]}
				zoom={props.kmRadius}
				scrollWheelZoom={false}
				style={{ height: '100%' }}
				ref={mapRef}
			>
				<MapMoveStart />
				<MapMoveEnd />
				<TileLayer
					url={`${process.env.NEXT_PUBLIC_MAP_URL}`}
					accessToken={`Basic ${process.env.MAP_ACCESS_TOOKEN}`}
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{props.zoneBy === 'A' ? (
					<AdresseMarker icon={adresseIcon} position={[props.position.lat, props.position.lng]} />
				) : (
					<SecteurMarker icon={secteurIcon} position={[props.position.lat, props.position.lng]} />
				)}
				<LocalisationNamePopup />
			</MapContainer>
		</div>
	);
};

export default CustomMap;
