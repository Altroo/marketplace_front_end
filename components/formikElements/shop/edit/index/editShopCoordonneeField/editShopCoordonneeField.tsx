import React from 'react';
import Styles from './editShopCoordonneeField.module.sass';
import Image from 'next/image';
import { TextField, Stack } from '@mui/material';
import theme from "../../../../../../utils/theme";
import { createTheme, ThemeProvider } from "@mui/material";

type Props = {
	icon: string;
	id: string;
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
	children?: React.ReactNode;
};

const EditShopCoordonneeField: React.FC<Props> = (props: Props) => {
	const blueColor = '#0274d7';
	const customTheme = theme(blueColor);
	const inputTheme = createTheme({
		...customTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '16px',
						}
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={inputTheme}>
			<Stack direction="row" spacing={1}>
				<Image src={props.icon} width={42} height={42} alt="" />
				<TextField
					sx={{
						'& fieldset': {
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
						},
					}}
					id={props.id}
					type={props.type}
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
			</Stack>
		</ThemeProvider>
	);
};

export default EditShopCoordonneeField;
