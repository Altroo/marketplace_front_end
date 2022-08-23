import React from 'react';
import Styles from './showAdresse.module.sass';
import MapEditSVG from '../../../../../public/assets/svgs/map-edit-blue.svg';
import { Stack } from '@mui/material';
import { useAppSelector } from '../../../../../utils/hooks';
import { getShopObj } from '../../../../../store/selectors';
import { default as ImageFuture } from 'next/future/image';
import dynamic from "next/dynamic";

const CustomMap = dynamic(() => import('../../../../map/customMap'), {
	ssr: false,
});

type Props = {
	onClick: () => void;
	children?: React.ReactNode;
};

const ShowAdresse: React.FC<Props> = (props: Props) => {
	const { address_name, longitude, latitude, zone_by, km_radius } = useAppSelector(getShopObj);
	return longitude && latitude && address_name && km_radius ? (
		<Stack direction="column" spacing={1} sx={{ height: '100%', width: '100%' }}>
			<div className={Styles.miniMapWrapper}>
				<ImageFuture
					className={Styles.editButton}
					onClick={props.onClick}
					src={MapEditSVG}
					width={40}
					height={40}
					alt=""
				/>
				<CustomMap
					readOnly={true}
					position={{ lat: latitude, lng: longitude }}
					zoneBy={zone_by}
					kmRadius={km_radius}
				/>
			</div>
		</Stack>
	) : null;
};

export default ShowAdresse;
