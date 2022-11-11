import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Theme } from '@mui/material/styles/createTheme';
import { TextField, ThemeProvider } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';

type Props = {
	id: string;
	value: Dayjs | null;
	onChange: (e: Dayjs | null, keyboardInputValue?: string) => void;
	theme: Theme;
	cssClass?: string;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

const CustomTimeInput: React.FC<Props> = (props: Props) => {
	const { cssClass, theme, ...restOfProps } = props;

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
				<DesktopTimePicker
					{...restOfProps}
					className={cssClass}
					disabled={props.disabled}
					toolbarTitle={props.placeholder}
					label={props.label}
					inputFormat="HH:MM"
					value={props.value}
					onChange={props.onChange}
					renderInput={(params: TextFieldProps) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default CustomTimeInput;
