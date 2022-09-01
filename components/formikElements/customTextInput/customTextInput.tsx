import React, { ForwardedRef, forwardRef } from "react";
import { Theme } from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";

type Props = {
	type: React.HTMLInputTypeAttribute;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	theme: Theme;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	cssClass?: string;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
	size?: "small" | "medium";
	disabled?: boolean;
	onClick?: () => void;
};

const CustomTextInput = forwardRef<HTMLInputElement, Props>((props:Props, ref: ForwardedRef<HTMLInputElement>) => {
	const { cssClass, theme, ...restOfProps } = props;
	// const {cssClass, theme} = props;

	return (
		<ThemeProvider theme={theme}>
			<TextField
				ref={ref}
				{...restOfProps}
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
				className={cssClass}
				size={props.size}
				onClick={props.onClick}
				color="primary"
				disabled={props.disabled}
			/>
		</ThemeProvider>
	);
});

CustomTextInput.displayName = 'CustomTextInput';
export default CustomTextInput;
