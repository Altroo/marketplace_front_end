import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Styles from './desktopFilterSelect.module.sass';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	components: {
		MuiSelect: {
			styleOverrides: {
				standard: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
				nativeInput: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
				select: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
				iconStandard: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
				icon: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
				iconOpen: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				}
			},
		},
	},
});

type Props = {
	labelID: string;
	selectID: string;
	state: 'D' | 'T';
	setStateHandler: React.Dispatch<React.SetStateAction<'D' | 'T'>>;
	children?: React.ReactNode;
};

const DesktopFilterSelect: React.FC<Props> = (props: Props) => {
	const handleChange = (event: SelectChangeEvent) => {
		props.setStateHandler(event.target.value as 'D' | 'T');
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id={props.labelID}>Trier : </InputLabel>
				<ThemeProvider theme={theme}>
					<Select
						variant="standard"
						labelId={props.labelID}
						id={props.selectID}
						value={props.state}
						label="Trier"
						onChange={handleChange}>
						<MenuItem value='D'>Prix décroissant</MenuItem>
						<MenuItem value='C'>Prix croissant</MenuItem>
					</Select>
				</ThemeProvider>
			</FormControl>
		</Box>
	);
};

export default DesktopFilterSelect;
