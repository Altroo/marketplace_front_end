import React from 'react';
import Styles from './customSingleCountrySelect.module.sass';
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Stack, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles/createTheme';
import { default as ImageFuture } from 'next/future/image';
import ActiveCheckBlue from '../../../../public/assets/svgs/globalIcons/active-check-blue.svg';
import ReactCountryFlag from 'react-country-flag';
import { CountriesType } from '../../../../types/places/placesTypes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

type Props = {
	id: string;
	label: string;
	items: Array<CountriesType>;
	theme: Theme;
	value: string;
	onChange?: (event: SelectChangeEvent) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	helperText?: string;
	error?: boolean;
	disabled?: boolean;
	cssClass?: string;
	children?: React.ReactNode;
};

const CustomSingleCountrySelect: React.FC<Props> = (props: Props) => {
	return (
		<ThemeProvider theme={props.theme}>
			<FormControl className={`${Styles.formControl} ${props.cssClass}`} disabled={props.disabled}>
				<InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
				<Select
					labelId={`${props.id}-label`}
					id={props.id}
					value={props.value}
					onChange={props.onChange}
					input={<OutlinedInput label={props.label} />}
					MenuProps={MenuProps}
					renderValue={(selected) => selected}
					onBlur={props.onBlur}
					error={props.error}
				>
					{props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : null}
					{props.items.length > 0 &&
						props.items.map((item) => (
							<MenuItem key={item.pk} value={item.name}>
								<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
									<Stack direction="row" spacing={2} sx={{ width: '100%' }}>
										<ReactCountryFlag
											svg
											aria-label={item.name}
											className={Styles.madeInFlag}
											countryCode={item.code}
										/>
										<span>{item.name}</span>
									</Stack>
									{props.value.indexOf(item.name) > -1 && <ImageFuture src={ActiveCheckBlue} alt="" />}
								</Stack>
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</ThemeProvider>
	);
};

export default CustomSingleCountrySelect;
