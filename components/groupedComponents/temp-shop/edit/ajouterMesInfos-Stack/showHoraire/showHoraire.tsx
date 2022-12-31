import React, { useEffect, useState } from 'react';
import Styles from './showHoraire.module.sass';
import { useAppSelector } from '../../../../../../utils/hooks';
import { getShopObj } from '../../../../../../store/selectors';
import { Stack, Box } from '@mui/material';
import ClockSVG from '../../../../../../public/assets/svgs/globalIcons/clock-gray.svg';
import Image from 'next/image';

const ShowHoraire: React.FC = () => {
	const { opening_days, morning_hour_from, morning_hour_to, afternoon_hour_from, afternoon_hour_to } =
		useAppSelector(getShopObj);
	const [horaireAllContent, setHoraireAllContent] = useState<string>('');
	const [openingDaysArray, setOpeningDaysArray] = useState<Array<string>>([]);

	useEffect(() => {
		if (opening_days) {
			if (opening_days.length > 0) {
				opening_days.map((day) => {
					switch (day.code_day) {
						case 'AL':
							setHoraireAllContent('Tous les jours');
							break;
						case 'MO':
							if (!openingDaysArray.includes('lundi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'lundi'];
								});
							setHoraireAllContent('');
							break;
						case 'TU':
							if (!openingDaysArray.includes('mardi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'mardi'];
								});
							setHoraireAllContent('');
							break;
						case 'WE':
							if (!openingDaysArray.includes('mercredi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'mercredi'];
								});
							setHoraireAllContent('');
							break;
						case 'TH':
							if (!openingDaysArray.includes('jeudi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'jeudi'];
								});
							setHoraireAllContent('');
							break;
						case 'FR':
							if (!openingDaysArray.includes('vendredi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'vendredi'];
								});
							setHoraireAllContent('');
							break;
						case 'SA':
							if (!openingDaysArray.includes('samedi'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'samedi'];
								});
							setHoraireAllContent('');
							break;
						case 'SU':
							if (!openingDaysArray.includes('dimanche'))
								setOpeningDaysArray((prevState) => {
									return [...prevState, 'dimanche'];
								});
							setHoraireAllContent('');
							break;
					}
				});
			}
		}
	}, [opening_days, openingDaysArray]);

	return (
		<>
			<Stack direction="row" spacing={1} sx={{ wordWrap: 'break-word' }} className={Styles.wrapper}>
				<Image src={ClockSVG} alt="" width="24" height="24" sizes="100vw" />
				<Box component="p" sx={{ wordWrap: 'break-word', width: '100%' }}>
					{horaireAllContent !== '' ? horaireAllContent : openingDaysArray.join(', ')}
				</Box>
			</Stack>
			<Stack direction="column" spacing={1}>
				<p style={{ marginLeft: '32px', fontFamily: 'Poppins', fontSize: '17px' }}>
					{morning_hour_from ? morning_hour_from.slice(0, 5) : ''} -{' '}
					{morning_hour_to ? morning_hour_to.slice(0, 5) : ''}
				</p>
				<p style={{ marginLeft: '32px', fontFamily: 'Poppins', fontSize: '17px' }}>
					{afternoon_hour_from ? afternoon_hour_from.slice(0, 5) : ''} -{' '}
					{afternoon_hour_to ? afternoon_hour_to.slice(0, 5) : ''}
				</p>
			</Stack>
		</>
	);
};

export default ShowHoraire;
