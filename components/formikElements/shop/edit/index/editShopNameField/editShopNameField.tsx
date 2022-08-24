import React from 'react';
import Styles from './editShopNameField.module.sass';
import TextField from '@mui/material/TextField';
import theme from '../../../../../../utils/theme';
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

const EditShopNameField: React.FC<Props> = (props: Props) => {
	const blueColor = '#0274d7';
	const customTheme = theme(blueColor);

	const inputTheme = createTheme({
		...customTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						height: '82px',
						padding: '10px',
					},
					input: {
						fontFamily: 'Poppins-SemiBold',
						fontSize: '28px',
						caretColor: blueColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '14px',
							// top: '15%',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							top: '0%',
						},
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={inputTheme}>
			<TextField
				sx={{
					'& fieldset': {
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

export default EditShopNameField;
