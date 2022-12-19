import React, { useEffect, useState, useCallback } from 'react';
import Styles from './getServiceCart.module.sass';
import { Grid, Stack, TextField, ThemeProvider } from '@mui/material';
import { getDefaultTheme, SolderPourcentageChipTheme } from '../../../../utils/themes';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { getDateFromNumber } from '../../../../utils/helpers';
import Chip from '@mui/material/Chip';

const defaultTheme = getDefaultTheme('#0D070B');
const chipTheme = SolderPourcentageChipTheme();

type Props = {
	availabilityDays: Array<string>;
	morningHourFrom: string | null;
	morningHourTo: string | null;
	afternoonHourFrom: string | null;
	afternoonHourTo: string | null;
	AddServiceToCartHandler: (picked_date: string, picked_hour: string) => void;
	children?: React.ReactNode;
};

const GetServiceCart: React.FC<Props> = (props: Props) => {
	const {
		availabilityDays,
		morningHourFrom,
		morningHourTo,
		afternoonHourFrom,
		afternoonHourTo,
		AddServiceToCartHandler,
	} = props;
	const [pickedDate, setPickedDate] = useState<Dayjs | null>(null);
	const [pickedDateValue, setPickedDateValue] = useState<string | null>(null);
	const [pickedHour, setPickedHour] = useState<string | null>(null);
	const [availableHoursArray, setAvailableHoursArray] = useState<Array<string>>([]);

	useEffect(() => {
		const getParsedHourMins = (value: string) => {
			return {
				hour: parseInt(value.split(':')[0]),
				mins: parseInt(value.split(':')[1]),
			};
		};

		const hoursFromArray: Array<string> = [];
		const hoursToArray: Array<string> = [];
		const generateHoursFrom = (from: string, to: string) => {
			const parsedFrom = getParsedHourMins(from);
			const parsedTo = getParsedHourMins(to);

			if (parsedFrom.hour < parsedTo.hour) {
				// correct
				let startingHour = parsedFrom.hour;
				let endingHour = parsedTo.hour;
				if (parsedTo.mins < 0) {
					endingHour -= 1;
				}
				if (parsedFrom.mins > 0) {
					startingHour += 1;
				}
				for (let i = startingHour; i <= endingHour; i++) {
					if (!hoursFromArray.includes(`${i}:00`)) {
						hoursFromArray.push(`${i}:00`);
					}
				}
			} else {
				// assume user reversed the hours
				let startingHour = parsedTo.hour;
				let endingHour = parsedFrom.hour;
				if (parsedTo.mins > 0) {
					endingHour -= 1;
				}
				if (parsedFrom.mins > 0) {
					startingHour += 1;
				}
				for (let i = startingHour; i <= endingHour; i++) {
					if (!hoursToArray.includes(`${i}:00`)) {
						hoursToArray.push(`${i}:00`);
					}
				}
			}
		};

		if (morningHourFrom && morningHourTo) {
			generateHoursFrom(morningHourFrom, morningHourTo);
			setAvailableHoursArray(hoursFromArray);
		}

		if (afternoonHourFrom && afternoonHourTo) {
			generateHoursFrom(afternoonHourFrom, afternoonHourTo);
			setAvailableHoursArray((prevState) => {
				return [...prevState, ...hoursToArray];
			});
		}
	}, [afternoonHourFrom, afternoonHourTo, morningHourFrom, morningHourTo]);

	const customDayRenderer = useCallback(
		(day: Dayjs, selectedDays: (Dayjs | null)[], pickersDayProps: PickersDayProps<Dayjs>) => {
			const weekDay = getDateFromNumber(day.day(), true);
			if (!availabilityDays.includes(weekDay)) {
				return <PickersDay {...pickersDayProps} disabled />;
			}
			return <PickersDay {...pickersDayProps} />;
		},
		[availabilityDays],
	);

	return (
		<ThemeProvider theme={defaultTheme}>
			<Stack
				direction="column"
				className={Styles.rootCartModalStack}
				justifyContent="space-between"
				spacing={{ xs: '40px', sm: '40px', md: '60px', lg: '60px', xl: '60px' }}
			>
				<Stack direction="column" spacing="18px">
					{availabilityDays.length > 0 && (
						<>
							<span className={Styles.cartTitles}>Choisissez une date de réservation</span>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
								<StaticDatePicker
									disablePast
									className={Styles.desktopOnly}
									css={{
										'& .MuiCalendarPicker-root': {
											width: '100%',
										},
										'& .MuiCalendarOrClockPicker-root > div': {
											margin: '0',
											width: '100%',
											border: '1px solid #D9D9DD',
											borderRadius: '20px',
										},
										'& .Mui-disabled': {
											margin: '2px 5px',
										},
										'& .MuiButtonBase-root': {
											margin: '2px 5px',
											fontFamily: 'Poppins',
											fontSize: '17px',
											fontWeight: '400',
										},
										'& .PrivatePickersSlideTransition-root': {
											minHeight: 'auto',
											paddingBottom: '10px',
										},
										'& .MuiDayPicker-monthContainer': {
											position: 'relative',
											overflow: 'scroll',
										},
										'& .Mui-selected': {
											backgroundColor: '#0D070B !important',
										},
										'& .MuiDayPicker-weekDayLabel': {
											margin: '0 5px',
											color: '#0D070B !important',
											fontSize: '17px',
											fontFamily: 'Poppins',
											fontWeight: '500',
										},
									}}
									displayStaticWrapperAs="desktop"
									openTo="day"
									inputFormat="DD/MM/YYYY"
									value={pickedDate}
									onChange={(newValue) => {
										setPickedDate(newValue);
										if (newValue) {
											setPickedDateValue(newValue.format('dddd D MMM'));
										} else {
											setPickedDateValue(null);
										}
									}}
									renderInput={(params: TextFieldProps) => <TextField {...params} />}
									renderDay={customDayRenderer}
									views={['month', 'day']}
									// disableHighlightToday
								/>
							</LocalizationProvider>
						</>
					)}
					<Stack direction="column" spacing="18px" className={Styles.rootHourStack}>
						{pickedDateValue && <span className={Styles.cartTitles}>{pickedDateValue}</span>}
						{availableHoursArray.length > 0 && (
							<Stack direction="row" flexWrap="wrap" alignItems="center" className={Styles.rootStack}>
								<ThemeProvider theme={chipTheme}>
									<Grid container className={Styles.rootGrid}>
										{availableHoursArray.map((value, index) => {
											return (
												<Grid item key={index}>
													<Chip
														label={value}
														variant={value === pickedHour ? 'filled' : 'outlined'}
														onClick={() => {
															setPickedHour(value);
														}}
													/>
												</Grid>
											);
										})}
									</Grid>
								</ThemeProvider>
							</Stack>
						)}
					</Stack>
				</Stack>
				<div className={`${Styles.primaryButtonWrapper} ${Styles.primaryButton}`}>
					<PrimaryButton
						buttonText="Choisir ce créneau"
						active={(!!pickedDate && !!pickedHour) || (!!pickedDate && availableHoursArray.length === 0)}
						onClick={() => AddServiceToCartHandler(pickedDate?.format('YYYY-MM-DD') as string, pickedHour as string)}
					/>
				</div>
			</Stack>
		</ThemeProvider>
	);
};

export default GetServiceCart;
