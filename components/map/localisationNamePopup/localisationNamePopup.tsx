import React, { useState, useEffect } from 'react';
import Styles from './localisationNamePopup.module.sass';
import { Stack } from '@mui/material';
import Image from 'next/image';
import MarkerBlueSVG from '../../../public/assets/svgs/marker-blue.svg';
import {
	getLocalisationName,
	getPlacesApiError,
	getPlacesApiFetchPromiseStatus, getShopAddressName,
} from "../../../store/selectors";
import { useAppSelector } from '../../../utils/hooks';

type Props = {
	children?: React.ReactNode;
};

const LocalisationNamePopup: React.FC<Props> = (props: Props) => {
	const selectedLocalisationName = useAppSelector(getLocalisationName);
	const address_name = useAppSelector(getShopAddressName);
	const apiError = useAppSelector(getPlacesApiError);
	const apiFetchPromiseStatus = useAppSelector(getPlacesApiFetchPromiseStatus);
	const [errorMessage, setErrorMessage] = useState<Array<string> | null>(null);
	const [localisationName, setLocalisationName] = useState<string | null>(address_name);

	useEffect(() => {
		if (apiError.details) {
			if (apiError.details.error) {
				setErrorMessage(apiError.details.error);
			}
		}
		if (selectedLocalisationName) {
			setLocalisationName(selectedLocalisationName);
		}
	}, [apiError, selectedLocalisationName]);

	return (
		<div className={Styles.localisationNamePopupWrapper}>
			{localisationName && apiFetchPromiseStatus !== 'REJECTED' ? (
				<Stack direction="row" justifyContent="space-around">
					<div className={Styles.localisationIconWrapper}>
						<Image src={MarkerBlueSVG} width={20} height={20} alt="" />
					</div>
					<p className={Styles.localisationName}>{localisationName}</p>
				</Stack>
			) : (
				errorMessage !== null &&
				errorMessage.map((error, index) => {
					return (
						<p key={index} className={Styles.localisationError}>
							{error}
						</p>
					);
				})
			)}
		</div>
	);
};

export default LocalisationNamePopup;
