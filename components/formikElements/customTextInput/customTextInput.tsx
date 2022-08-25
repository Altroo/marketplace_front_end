import React from "react";
import { Theme } from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";

type Props = {
	type: React.HTMLInputTypeAttribute;
	id: string;
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

const CustomTextInput: React.FC<Props> = (props: Props) => {

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
				className={props.cssClass}
				size={props.size}
				color="primary"
			/>
		</ThemeProvider>
	);
};

export default CustomTextInput;
