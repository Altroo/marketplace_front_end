import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Theme } from '@mui/material/styles/createTheme';
import { TextField, ThemeProvider } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Dayjs } from "dayjs";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

type Props = {
	id: string;
	value: Dayjs | string | null;
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
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
				<TimePicker
					{...restOfProps}
					label={props.label}
					value={props.value}
					onChange={props.onChange}
					renderInput={(params: TextFieldProps) => <TextField {...params} />}
					className={cssClass}
					disabled={props.disabled}
					toolbarTitle={props.placeholder}
					inputFormat="HH:mm"
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default CustomTimeInput;
