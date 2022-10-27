import React, { ForwardedRef, forwardRef } from 'react';
import InputMask from 'react-input-mask';
import { Theme } from '@mui/material/styles/createTheme';
import { InputBaseComponentProps, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Props {
	type: React.HTMLInputTypeAttribute;
	id: string;
	value: string;
	mask: string;
	maskPlaceholder: string;
	alwaysShowMask: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	theme: Theme;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	cssClass?: string;
	helperText?: string;
	error?: boolean;
	placeholder?: string;
	label?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	disabled?: boolean;
	variant?: 'filled' | 'standard' | 'outlined';
	onClick?: () => void;
	inputProps?: InputBaseComponentProps;
}

const CustomTextMaskInput = forwardRef<HTMLInputElement, Props>((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
	const { cssClass, theme, onChange, onBlur, value, mask, maskPlaceholder, alwaysShowMask, ...other } = props;
	return (
		<ThemeProvider theme={theme}>
			<InputMask
				mask={mask}
				inputRef={ref}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				maskPlaceholder={maskPlaceholder}
				alwaysShowMask={alwaysShowMask}
			>
				<TextField
					{...other}
					ref={ref}
					variant={props.variant}
					type={props.type}
					id={props.id}
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
					inputProps={props.inputProps}
				/>
			</InputMask>
		</ThemeProvider>
	);
});

CustomTextMaskInput.displayName = 'CustomTextMaskInput';
export default CustomTextMaskInput;
