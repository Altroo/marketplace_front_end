import React, { ForwardedRef, forwardRef, useState, useCallback } from "react";
import {
	ThemeProvider,
	TextField,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Props = {
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
	size?: 'small' | 'medium';
	disabled?: boolean;
	onClick?: () => void;
};

const CustomPasswordInput = forwardRef<HTMLInputElement, Props>((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
	const { cssClass, theme, ...restOfProps } = props;
	const [showpassword, setshowpassword] = useState<boolean>(false);

	const handleClickShowPassword = useCallback(() => {
		setshowpassword(prevState => !prevState);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<TextField
				ref={ref}
				{...restOfProps}
				type={showpassword ? 'text' : 'password'}
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
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={(e) => e.preventDefault()}
								edge="end"
							>
								{showpassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
					</InputAdornment>
					),
				}}
			/>
		</ThemeProvider>
	);
});

CustomPasswordInput.displayName = 'CustomPasswordInput';

export default CustomPasswordInput;