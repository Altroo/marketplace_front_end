import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Theme } from '@mui/material/styles/createTheme';
import { TextField, ThemeProvider } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';

type Props = {
	value: Dayjs | null;
	onChange: (e: Dayjs | null, keyboardInputValue?: string) => void;
	theme: Theme;
	cssClass?: string;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

const CustomDateInput: React.FC<Props> = (props: Props) => {
	const { cssClass, theme, ...restOfProps } = props;

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
				<DesktopDatePicker
					{...restOfProps}
					className={cssClass}
					disabled={props.disabled}
					toolbarPlaceholder={props.placeholder}
					label={props.label}
					inputFormat="DD/MM/YYYY"
					value={props.value}
					onChange={props.onChange}
					renderInput={(params: TextFieldProps) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default CustomDateInput;
