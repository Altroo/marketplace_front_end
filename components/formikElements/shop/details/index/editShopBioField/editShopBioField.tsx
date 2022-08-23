import React from "react";
import Styles from "./editShopBioField.module.sass";
import theme from "../../../../../../utils/theme";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";

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

const EditShopBioField: React.FC<Props> = (props: Props) => {
	const blueColor = '#0274d7';
	const customTheme = theme(blueColor);
	const inputTheme = createTheme({
		...customTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						padding: '10px',
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '17px',
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
						}
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
				multiline={true}
				minRows={4}
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
			<Stack direction="row" justifyContent="flex-end">
				<span className={Styles.span}>{props.value.length}/300</span>
			</Stack>
		</ThemeProvider>
	);
};

export default EditShopBioField;
