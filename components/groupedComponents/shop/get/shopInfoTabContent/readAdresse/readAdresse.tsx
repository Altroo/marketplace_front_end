import React, { CSSProperties } from "react";
import Styles from './readAdresse.module.sass';
import { Stack } from '@mui/material';
import dynamic from "next/dynamic";
import { ShopZoneByType } from "../../../../../../types/shop/shopTypes";
import 'leaflet/dist/leaflet.css';

const CustomMap = dynamic(() => import('../../../../../map/customMap'), {
	ssr: false,
});

type Props = {
	address_name: string;
	longitude: number;
	latitude: number;
	zone_by: ShopZoneByType;
	km_radius: number;
	children?: React.ReactNode;
};

const ReadAdresse: React.FC<Props> = (props: Props) => {
	const { longitude, latitude, zone_by, km_radius } = props;
	return (
		<Stack direction="column" spacing={1} sx={{ height: '100%', width: '100%' }}>
			<div className={Styles.miniMapWrapper}>
				<CustomMap
					readOnly={true}
					position={{ lat: latitude, lng: longitude }}
					zoneBy={zone_by}
					kmRadius={km_radius}
					address_name={props.address_name}
				/>
			</div>
		</Stack>
	);
};

export default ReadAdresse;
