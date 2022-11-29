import React, { useCallback } from 'react';
import Styles from './deliveryOptionElements.module.sass';
import { Box, Stack, ThemeProvider, Button } from '@mui/material';
import CustomTextInput from '../../../formikElements/customTextInput/customTextInput';
import { coordonneeTextInputTheme, getDefaultTheme, offerForWhomDropdownTheme } from '../../../../utils/themes';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { getAvailableCities } from '../../../../store/selectors';
import { emptyOfferDeliveries } from '../../../../store/actions/offer/offerActions';
import CustomAutoCompleteMultiSelect from '../../../htmlElements/inputs/customAutoCompleteMultiSelect/customAutoCompleteMultiSelect';

type Props = {
	citiesState: Array<string>;
	setCitiesState: React.Dispatch<React.SetStateAction<Array<string>>>;
	allCitiesState: boolean;
	setAllCitiesState: React.Dispatch<React.SetStateAction<boolean>>;
	deliveryPriceState: string;
	setDeliveryPriceState: React.Dispatch<React.SetStateAction<string>>;
	deliveryDaysState: string;
	setDeliveryDaysState: React.Dispatch<React.SetStateAction<string>>;
	setNextDeliveryState?: React.Dispatch<React.SetStateAction<boolean>>;
	option: '1' | '2' | '3';
	children?: React.ReactNode;
};

const citiesDropDownTheme = offerForWhomDropdownTheme();
const priceFieldTheme = coordonneeTextInputTheme();
const defaultTheme = getDefaultTheme();

const DeliveryOptionElements: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const availableCities: Array<string> = useAppSelector(getAvailableCities);
	const {
		citiesState,
		setCitiesState,
		setAllCitiesState,
		deliveryPriceState,
		setDeliveryPriceState,
		deliveryDaysState,
		setDeliveryDaysState,
	} = props;

	const citiesHandleAutoCompleteChange = useCallback(
		(value: Array<string>) => {
			setCitiesState(value);
		},
		[setCitiesState],
	);

	const DeleteDeliveryOptionElementHandler = useCallback(() => {
		if (props.setNextDeliveryState) {
			props.setNextDeliveryState(false);
		}
		setCitiesState([]);
		setAllCitiesState(false);
		setDeliveryPriceState('');
		setDeliveryDaysState('');
		dispatch(emptyOfferDeliveries(props.option));
	}, [dispatch, props, setAllCitiesState, setCitiesState, setDeliveryDaysState, setDeliveryPriceState]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<form style={{ height: '100%' }} onSubmit={(e) => e.preventDefault()}>
				<Stack direction="column" spacing={2} sx={{ margin: '12px 32px 12px !important' }}>
					<Stack direction="row" justifyContent="space-between">
						<p className={Styles.label}>Option {props.option}</p>
						{props.setNextDeliveryState && (
							<Button onClick={DeleteDeliveryOptionElementHandler} className={Styles.deleteButton}>
								Effacer
							</Button>
						)}
					</Stack>
					{/* CITIES DROP DOWN */}
					{availableCities && (
						<CustomAutoCompleteMultiSelect
							id={`delivery_city_${props.option}`}
							label="Villes"
							items={availableCities}
							theme={citiesDropDownTheme}
							onChange={(e: React.SyntheticEvent<Element, Event>, value: Array<string>) => {
								citiesHandleAutoCompleteChange(value);
							}}
							value={citiesState}
							cssClass={Styles.citiesInput}
						/>
					)}
					<Box sx={{ marginTop: '1rem !important' }}></Box>
					{/* PRICE */}
					<CustomTextInput
						id={`delivery_price_${props.option}`}
						label="Prix (en MAD)"
						value={deliveryPriceState}
						onChange={(e) => {
							setDeliveryPriceState(parseInt(e.target.value.replace(/\D/g, '') || '0').toString());
						}}
						theme={priceFieldTheme}
						fullWidth={false}
						size="medium"
						type="text"
						cssClass={Styles.inputFields}
						inputProps={{ pattern: '^(?:[1-9][0-9]*|0)$' }}
					/>
					<Box sx={{ marginTop: '1rem !important' }}></Box>
					{/* Days */}
					<CustomTextInput
						id={`delivery_days_${props.option}`}
						label="Délais de livraison (en jours)"
						onChange={(e) => {
							setDeliveryDaysState(e.target.value.replace(/^0+/, '').replace(/\D/g, ''));
						}}
						theme={priceFieldTheme}
						fullWidth={false}
						size="medium"
						type="text"
						cssClass={Styles.inputFields}
						value={deliveryDaysState}
						inputProps={{ pattern: '^(?:[1-9][0-9]*|0)$' }}
					/>
				</Stack>
			</form>
		</ThemeProvider>
	);
};

export default DeliveryOptionElements;
