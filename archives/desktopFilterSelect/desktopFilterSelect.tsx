import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Styles from './desktopFilterSelect.module.sass';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	components: {
		MuiSelect: {
			styleOverrides: {
				select: {
					border: '0px solid transparent !important',
					boxShadow: '0px !important',
					color: '#0D070B !important',
					fontFamily: 'Poppins',
					backgroundColor: 'white',
					borderBottom: '0px solid transparent !important'
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					'&::before': {
						borderBottom: '0px solid transparent',
					},
					'&::after': {
						borderBottom: '2px solid red',
					}
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: 'red'
				},
				filled: {
					color: 'red'
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: 'red'
					}
				}
			}
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: 'red'
					}
				}
			}
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
	return (
		<FormControl>
			<InputLabel id={props.labelID} sx={{color: 'red', '&:focused': {color: 'red'}}}>Trier : </InputLabel>
			<ThemeProvider theme={theme}>
				<Select
					autoWidth
					variant="filled"
					labelId={props.labelID}
					id={props.selectID}
					value={props.state}
					label="Trier"
					onChange={(e: SelectChangeEvent) => props.setStateHandler(e.target.value as 'D' | 'T')}>
					<MenuItem value='D'>Prix décroissant</MenuItem>
					<MenuItem value='C'>Prix croissant</MenuItem>
				</Select>
			</ThemeProvider>
		</FormControl>
	);
};

export default DesktopFilterSelect;
