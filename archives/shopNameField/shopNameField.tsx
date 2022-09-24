import React from 'react';
import Styles from './shopNameField.module.sass';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material';
import { Theme } from "@mui/material/styles/createTheme";

type Props = {
	type: React.HTMLInputTypeAttribute;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	theme: Theme;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
};

const ShopNameField: React.FC<Props> = (props: Props) => {

	return (
		<ThemeProvider theme={props.theme}>
			<TextField
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

export default ShopNameField;
