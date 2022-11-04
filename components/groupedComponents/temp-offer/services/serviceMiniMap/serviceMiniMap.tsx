import React from 'react';
import Styles from './serviceMiniMap.module.sass';
import MapEditSVG from '../../../../../public/assets/svgs/globalIcons/edit-blue.svg';
import { Stack } from '@mui/material';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { ShopZoneByType } from "../../../../../types/shop/shopTypes";

const CustomMap = dynamic(() => import('../../../../map/customMap'), {
	ssr: false,
});

type Props = {
	address_name: string;
	longitude: number;
	latitude: number;
	zone_by: ShopZoneByType;
	km_radius: number;
	onClick: () => void;
	children?: React.ReactNode;
};

const ServiceMiniMap: React.FC<Props> = (props: Props) => {
	const { address_name, longitude, latitude, zone_by, km_radius } = props;

	return (
		<Stack direction="column" spacing={1} sx={{ height: '100%', width: '100%' }}>
			<div className={Styles.miniMapWrapper}>
				<Image
					className={Styles.editButton}
					onClick={props.onClick}
					src={MapEditSVG}
					width="0"
					height="0"
					sizes="100vw"
					alt=""
				/>
				<CustomMap
					readOnly={true}
					position={{ lat: latitude, lng: longitude }}
					zoneBy={zone_by}
					kmRadius={km_radius}
					address_name={address_name}
				/>
			</div>
		</Stack>
	);
};

export default ServiceMiniMap;
