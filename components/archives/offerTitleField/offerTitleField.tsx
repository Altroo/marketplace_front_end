import React from 'react';
import Styles from './offerTitleField.module.sass';
import TextField from '@mui/material/TextField';
import {CustomTheme} from '../../../utils/themes';
import { createTheme, ThemeProvider } from '@mui/material';

type Props = {
	type: React.HTMLInputTypeAttribute;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
};

const OfferTitleField: React.FC<Props> = (props: Props) => {
	const customTheme = CustomTheme('#0274d7');

	const inputTheme = createTheme({
		...customTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					// input wrapper (div)
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						height: '55px',
						padding: '10px',
						width: 'max-content',
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						width: '100%',
						height: '100%'
					}
				}
			}
		},
	});

	return (
		<ThemeProvider theme={inputTheme}>
			<TextField
				sx={{
					'& fieldset': {
						padding: '10px 18px',
						height: '59px',
						fontFamily: 'Poppins',
						fontSize: '19px',
						borderRadius: '16px',
						border: '2px solid #A3A3AD',
					},
				}}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				helperText={props.helperText}
				error={props.error}
				placeholder={props.placeholder}
				label={props.label}
				fullWidth={props.fullWidth}
				className={Styles.textField}
				size="medium"
				color="primary"
			/>
		</ThemeProvider>
	);
};

export default OfferTitleField;
