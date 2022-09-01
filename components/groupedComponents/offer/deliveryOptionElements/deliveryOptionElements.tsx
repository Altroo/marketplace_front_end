import React, { useState, useEffect } from 'react';
import Styles from './deliveryOptionElements.module.sass';
import { Box, Chip, Stack, ThemeProvider, Button } from '@mui/material';
import CustomDropDownChoices from '../../../formikElements/customDropDownChoices/customDropDownChoices';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomTextInput from '../../../formikElements/customTextInput/customTextInput';
import {
	getDefaultTheme,
	OfferChipTheme,
	offerForWhomDropdownTheme,
	offerTitleTextInputTheme,
} from '../../../../utils/themes';
import { useAppSelector } from '../../../../utils/hooks';
import { getAvailableCities } from '../../../../store/selectors';

type Props = {
	citiesState: Array<string>;
	setCitiesState: React.Dispatch<React.SetStateAction<Array<string>>>;
	allCitiesState: boolean;
	setAllCitiesState: React.Dispatch<React.SetStateAction<boolean>>;
	deliveryPriceState: string;
	setDeliveryPriceState: React.Dispatch<React.SetStateAction<string>>;
	deliveryDaysState: string;
	setDeliveryDaysState: React.Dispatch<React.SetStateAction<string>>;
	setIsFormValidState: React.Dispatch<React.SetStateAction<boolean>>;
	setNextDeliveryState?: React.Dispatch<React.SetStateAction<boolean>>;
	option: '1' | '2' | '3';
	children?: React.ReactNode;
};

const DeliveryOptionElements: React.FC<Props> = (props: Props) => {
	const availableCities: Array<string> = useAppSelector(getAvailableCities);
	const {
		citiesState,
		setCitiesState,
		allCitiesState,
		setAllCitiesState,
		deliveryPriceState,
		setDeliveryPriceState,
		deliveryDaysState,
		setDeliveryDaysState,
	} = props;

	const [gratuitState, setGratuitState] = useState<boolean>(false);
	const [fiveDHState, setFiveDHState] = useState<boolean>(false);
	const [tenDHState, setTenDHState] = useState<boolean>(false);
	const [oneDayState, setOneDayState] = useState<boolean>(false);
	const [twoDayState, setTwoDayState] = useState<boolean>(false);
	const [fourDayState, setFourDayState] = useState<boolean>(false);

	const citiesHandleChange = (event: SelectChangeEvent<Array<string>>) => {
		const {
			target: { value },
		} = event;
		const value_ = typeof value === 'string' ? value.split(',') : value;
		setCitiesState(value_);
	};

	useEffect(() => {
		props.setIsFormValidState(
			!!((citiesState.length > 0 || allCitiesState) && deliveryPriceState && deliveryDaysState),
		);
	}, [allCitiesState, citiesState.length, deliveryDaysState, deliveryPriceState, props]);

	const citiesDropDownTheme = offerForWhomDropdownTheme();
	const priceFieldTheme = offerTitleTextInputTheme();
	const chipTheme = OfferChipTheme();

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<form style={{ height: '100%' }}>
				<Stack direction="column" spacing={2} sx={{ margin: '12px 32px 12px !important' }}>
					<Stack direction="row" justifyContent="space-between">
						<p className={Styles.label}>Option {props.option}</p>
						{props.setNextDeliveryState ? (
							<Button
								onClick={() => (props.setNextDeliveryState ? props.setNextDeliveryState(false) : {})}
								className={Styles.deleteButton}
							>
								Effacer
							</Button>
						) : null}
					</Stack>
					{/* CITIES DROP DOWN */}
					{availableCities ? (
						<CustomDropDownChoices
							id="delivery_city_1"
							label="Villes"
							items={availableCities}
							theme={citiesDropDownTheme}
							onChange={(e: SelectChangeEvent<string[]>) => {
								citiesHandleChange(e);
							}}
							value={citiesState}
							multiple={true}
							cssClass={Styles.citiesInput}
							disabled={allCitiesState}
						/>
					) : null}
					<span className={Styles.quickAdd}>Ajouts rapides</span>
					<ThemeProvider theme={chipTheme}>
						{/* Tout le maroc */}
						<Chip
							sx={{ width: '200px' }}
							label="Tout le Maroc"
							variant={allCitiesState ? 'filled' : 'outlined'}
							onClick={() => {
								setAllCitiesState((prevState) => {
									setCitiesState([]);
									return !prevState;
								});
							}}
						/>
					</ThemeProvider>
					<Box sx={{ marginTop: '1rem !important' }}></Box>
					{/* PRICE */}
					<CustomTextInput
						id="delivery_price_1"
						label="Prix"
						value={deliveryPriceState}
						onChange={(e) => {
							setDeliveryPriceState(e.target.value);
						}}
						theme={priceFieldTheme}
						fullWidth={false}
						size="medium"
						type="tel"
						cssClass={Styles.inputFields}
						disabled={gratuitState || fiveDHState || tenDHState}
					/>
					<span className={Styles.quickAdd}>Ajouts rapides</span>
					<ThemeProvider theme={chipTheme}>
						<Stack direction="row" spacing={1}>
							{/* Gratuit */}
							<Chip
								label="Gratuit"
								variant={gratuitState ? 'filled' : 'outlined'}
								onClick={() => {
									setGratuitState((prevState) => {
										setDeliveryPriceState('0');
										return !prevState;
									});
									setFiveDHState(false);
									setTenDHState(false);
								}}
							/>
							{/* 5 DH */}
							<Chip
								label="5 DH"
								variant={fiveDHState ? 'filled' : 'outlined'}
								onClick={() => {
									setFiveDHState((prevState) => {
										setDeliveryPriceState('5');
										return !prevState;
									});
									setGratuitState(false);
									setTenDHState(false);
								}}
							/>
							{/* 10 DH */}
							<Chip
								label="10 DH"
								variant={tenDHState ? 'filled' : 'outlined'}
								onClick={() => {
									setTenDHState((prevState) => {
										setDeliveryPriceState('10');
										return !prevState;
									});
									setGratuitState(false);
									setFiveDHState(false);
								}}
							/>
						</Stack>
					</ThemeProvider>
					<Box sx={{ marginTop: '1rem !important' }}></Box>
					{/* Days */}
					<CustomTextInput
						id="delivery_days_1"
						label="Délais"
						onChange={(e) => {
							setDeliveryDaysState(e.target.value);
						}}
						theme={priceFieldTheme}
						fullWidth={false}
						size="medium"
						type="tel"
						cssClass={Styles.inputFields}
						disabled={oneDayState || twoDayState || fourDayState}
						value={deliveryDaysState}
					/>
					<span className={Styles.quickAdd}>Ajouts rapides</span>
					<ThemeProvider theme={chipTheme}>
						{/* 1 day */}
						<Stack direction="row" spacing={1}>
							<Chip
								label="1 jour"
								variant={oneDayState ? 'filled' : 'outlined'}
								onClick={() => {
									setOneDayState((prevState) => {
										setDeliveryDaysState('1');
										return !prevState;
									});
									setTwoDayState(false);
									setFourDayState(false);
								}}
							/>
							{/* 2 days */}
							<Chip
								label="2 jours"
								variant={twoDayState ? 'filled' : 'outlined'}
								onClick={() => {
									setTwoDayState((prevState) => {
										setDeliveryDaysState('2');
										return !prevState;
									});
									setOneDayState(false);
									setFourDayState(false);
								}}
							/>
							{/* 4 days */}
							<Chip
								label="4 jours"
								variant={fourDayState ? 'filled' : 'outlined'}
								onClick={() => {
									setFourDayState((prevState) => {
										setDeliveryDaysState('4');
										return !prevState;
									});
									setOneDayState(false);
									setTwoDayState(false);
								}}
							/>
						</Stack>
					</ThemeProvider>
				</Stack>
			</form>
		</ThemeProvider>
	);
};

export default DeliveryOptionElements;
