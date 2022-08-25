import React from 'react';
import Styles from './editShopCoordonneeField.module.sass';
import Image from 'next/image';
import { TextField, Stack } from '@mui/material';
import {CustomTheme} from "../../../../../../utils/themes";
import { createTheme, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles/createTheme";

type Props = {
	icon: string;
	id: string;
	type: React.HTMLInputTypeAttribute;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	theme: Theme;
	cssClass?: string;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
	size?: "small" | "medium";
};

const EditShopCoordonneeField: React.FC<Props> = (props: Props) => {
	const blueColor = '#0274d7';
	const customTheme = CustomTheme(blueColor);
	const inputTheme = createTheme({
		...customTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
						},
					},
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
		<ThemeProvider theme={props.theme}>
			<Stack direction="row" spacing={1}>
				<Image src={props.icon} width={42} height={42} alt="" />
				<TextField
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
					className={props.cssClass}
					size={props.size}
					color="primary"
				/>
			</Stack>
		</ThemeProvider>
	);
};

export default EditShopCoordonneeField;
