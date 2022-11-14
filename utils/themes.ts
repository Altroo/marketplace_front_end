import { createTheme } from '@mui/material/styles';
import { hexToRGB } from './helpers';

export const CustomTheme = (primaryColor: string | undefined = undefined) => {
	let rippleColor = '#0D070B';
	if (primaryColor) {
		if (primaryColor !== '#FFFFFF') {
			rippleColor = hexToRGB(primaryColor, 0.5);
		} else {
			rippleColor = hexToRGB(rippleColor, 0.5);
		}
	}
	/*
	$mobile : (max-width: 767px)'
	$tablette : (min-width: 768px) and (max-width: 991px)'
	$tablette : (max-width: 991px)'
	$desktop : (min-width: 992px)'
	$large : (min-width: 1200px) and (max-width: 1919px)'
	$wide : (min-width: 1920px)'
	 */
	return createTheme({
		palette: {
			primary: {
				main: rippleColor,
			},
			// secondary: {
			// 	main: '#E12D3D'
			// }
			/*secondary: {
				light: '#0066ff',
				main: '#0044ff',
				contrastText: '#ffcc00',
			},*/
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 767,
				md: 991,
				lg: 1200,
				xl: 1920,
			},
		},
		typography: {
			fontFamily: 'Poppins',
		},
	});
};

export const getDefaultTheme = (primaryColor: string | undefined = undefined) => {
	const defaultColor = '#0274D7';
	if (primaryColor) {
		return CustomTheme(primaryColor);
	} else {
		return CustomTheme(defaultColor);
	}
};

export const getDropDownMenuTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		...defaultTheme,
		components: {
			MuiMenu: {
				styleOverrides: {
					paper: {
						boxShadow: '0 2.80058px 11.2023px rgba(13, 7, 11, 0.2) !important',
						borderRadius: '30px !important',
						padding: '10px',
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins',
						fontSize: '17px',
						color: '#0D070B',
						margin: '0',
					},
				},
			},
		},
	});
};

// Shop name text input
export const shopNameTextInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					// input wrapper (div)
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						height: '68px',
						padding: '10px',
						'& fieldset': {
							padding: '10px 18px',
							// height: '59px',
							fontFamily: 'Poppins',
							fontSize: '19px',
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						width: '100%',
						height: '100%',
					},
				},
			},
		},
	});
};
// Edit Shop name text input
export const editShopNameTextInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';
	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						height: '82px',
						padding: '10px',
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
					},
					input: {
						fontFamily: 'Poppins-SemiBold',
						fontSize: '28px',
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
							color: '#A3A3AD',
							// top: '15%',
						},
						// '& .MuiFormLabel-root.Mui-focused': {
						// 	top: '0%',
						// 	color: blueColor,
						// },
						'& .MuiFormLabel-root.Mui-focused': {
							top: '0%',
							fontFamily: 'Poppins',
							fontSize: '14px',
							color: blueColor,
						},
					},
				},
			},
		},
	});
};
// Offer title text input
export const offerTitleTextInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					// input wrapper (div)
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						height: '55px',
						padding: '10px',
						width: '100%',
						'& fieldset': {
							padding: '10px 18px',
							height: '59px',
							fontFamily: 'Poppins',
							fontSize: '19px',
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						width: 'auto',
						height: '100%',
					},
				},
			},
		},
	});
};
// Shop bio text area
export const bioTextAreaTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						padding: '10px',
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '12px',
						},
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
							color: '#A3A3AD',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							fontFamily: 'Poppins',
							fontSize: '14px',
							color: blueColor,
						},
					},
				},
			},
		},
	});
};
// Shop coordonées text input
export const coordonneeTextInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: '#A3A3AD',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: blueColor,
						},
					},
				},
			},
		},
	});
};
// Offer title tooltip
export const offerTitleTooltipTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';

	return createTheme({
		...defaultTheme,
		components: {
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						fontFamily: 'Poppins',
						fontSize: '13px',
						backgroundColor: blueColor,
					},
				},
			},
		},
	});
};
// Offer for whom dropdown
export const offerForWhomDropdownTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '16px',
							color: '#A3A3AD',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: blueColor,
						},
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					gutters: {
						fontFamily: 'Poppins',
						fontSize: '16px',
						paddingTop: '10px',
						paddingBottom: '10px',
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						border: `1px solid ${blueColor}`,
						borderBottomLeftRadius: '21px',
						borderBottomRightRadius: '21px',
					},
				},
			},
		},
	});
};

// Offer switch button
export const offerSwitchTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		...defaultTheme,
		components: {
			MuiFormControlLabel: {
				styleOverrides: {
					root: {
						marginRight: '0px',
					},
				},
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						marginRight: '0px !important',
						marginLeft: '0px !important',
					},
				},
			},
		},
	});
};
// Offer chip buttons
export const OfferChipTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						paddingTop: '10px',
						paddingBottom: '10px',
						height: '37px',
						border: '1px solid #0D070B',
						borderRadius: '40px',
					},
					outlined: {
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.17)',
						},
					},
					filled: {
						backgroundColor: '#0D070B',
						color: 'white',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
						},
					},
				},
			},
		},
	});
};

// Offer quantity field
export const OfferQuantityFieldTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';
	return createTheme({
		components: {
			...defaultTheme,
			MuiInputBase: {
				styleOverrides: {
					root: {
						width: '64px',
						height: '49px',
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
							width: '64px',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
						textAlign: 'center',
					},
				},
			},
		},
	});
};

export const doubleTabNavigationTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		...defaultTheme,
		components: {
			MuiBottomNavigation: {
				styleOverrides: {
					root: {
						width: '300px',
						margin: '0 auto',
						backgroundColor: '#F2F2F3',
						borderRadius: '30px',
						marginBottom: '10px',
					},
				},
			},
			MuiBottomNavigationAction: {
				styleOverrides: {
					root: {
						'&.MuiBottomNavigationAction-label.Mui-selected': {
							color: '#0D070B',
							fontFamily: 'Poppins-Medium',
							fontSize: '19px',
						},
						'&.Mui-selected': {
							backgroundColor: '#FFFFFF',
							borderRadius: '40px',
							margin: '5px',
						},
						'&:not(Mui-selected)': {
							backgroundColor: '#f2f2f3',
							borderRadius: '40px',
							margin: '5px',
						},
					},
					label: {
						color: '#0D070B',
						fontFamily: 'Poppins-Medium',
						fontSize: '17px',
						'&.MuiBottomNavigationAction-label.Mui-selected': {
							color: '#0D070B',
							fontFamily: 'Poppins-Medium',
							fontSize: '19px',
						},
					},
				},
			},
		},
	});
};

export const SolderPourcentageChipTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						paddingTop: '10px',
						paddingBottom: '10px',
						height: '43px',
						width: '102px',
						border: '1px solid #0D070B',
						borderRadius: '40px',
					},
					outlined: {
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.17)',
						},
					},
					filled: {
						backgroundColor: '#0D070B',
						color: 'white',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
						},
					},
				},
			},
		},
	});
};

export const codeTextInputTheme = (error: boolean | undefined) => {
	const validColor = '#07CBAD';
	const defaultTheme = getDefaultTheme(validColor);
	let borderColor = '#D9D9DD';
	if (error) {
		borderColor = '#E12D3D';
	}
	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderTop: '2px solid',
							borderRight: '2px solid',
							borderLeft: '2px solid',
							borderBottom: `2px solid ${borderColor}`,
						},
					},
					input: {
						textAlign: 'center',
						fontFamily: 'Poppins',
						fontSize: '42px',
						caretColor: validColor,
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderRadius: '0px !important',
						borderTop: '2px solid transparent !important',
						borderRight: '2px solid transparent !important',
						borderLeft: '2px solid transparent !important',
						borderBottom: `2px solid ${borderColor}`,
					},
				},
			},
		},
	});
};

export const userMainNavigationBarTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		...defaultTheme,
		components: {
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: 'white',
						color: '#0D070B',
						boxShadow: 'none',
					},
				},
			},
		},
	});
};

export const OfferReadOnlyTheme = () => {
	return createTheme({
		components: {
			MuiImageList: {
				styleOverrides: {
					root: {
						marginTop: '0px',
						marginBottom: '0px',
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins-SemiBold',
						fontSize: '16px',
						borderRadius: '40px',
					},
					filled: {
						backgroundColor: '#0D070B',
						color: '#FFFFFF',
					},
				},
			},
		},
	});
};

export const FilterAccordionTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		...defaultTheme,
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: 'transparent !important',
						'&::before': {
							backgroundColor: 'transparent !important',
						},
					},
				},
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						// color: 'transparent !important',
						boxShadow: '0 0 0 0 transparent',
					},
				},
			},
			MuiAccordionSummary: {
				styleOverrides: {
					root: {
						paddingLeft: '0',
						paddingRight: '0',
						marginBottom: '15px',
					},
				},
			},
			MuiAccordionDetails: {
				styleOverrides: {
					root: {
						padding: '0',
					},
				},
			},
		},
	});
};

export const FilterChipTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins-Medium',
						fontSize: '14px',
						paddingTop: '13px',
						paddingBottom: '13px',
						height: '21px',
						border: '1.5px solid #0D070B',
						borderRadius: '13px',
						lineHeight: '21px',
						letterSpacing: '-0,03em',
						fontWeight: '500',
					},
					outlined: {
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.17)',
						},
					},
					filled: {
						backgroundColor: '#0D070B',
						color: 'white',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
						},
					},
				},
			},
		},
	});
};

export const horairesInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						height: '50px',
						border: '1px solid #0D070B',
						borderRadius: '40px',
					},
					outlined: {
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.17)',
						},
					},
					filled: {
						backgroundColor: '#0D070B',
						color: 'white',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
						},
					},
				},
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						padding: '10px',
						'& fieldset': {
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '17px',
						caretColor: primaryColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
				},
			},
		},
	});
};

export const customToastTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiSnackbar: {
				styleOverrides: {
					root: {
						backgroundColor: 'white',
						borderRadius: '20px',
						position: 'absolute',
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: '20px',
						boxShadow: '0px 0px 24px rgba(13, 7, 11, 0.1)',
						'&.MuiAlert-outlinedWarning': {
							border: '1px solid rgba(255, 45, 61, 0.2)',
						},
						'&.MuiAlert-outlinedSuccess': {
							border: '1px solid rgba(7, 203, 173, 0.2)',
						},
						'&.MuiAlert-outlinedError': {
							border: '1px solid rgba(255, 45, 61, 0.2)',
						},
						'&.MuiAlert-outlinedInfo': {
							border: '1px solid rgba(2, 116, 215, 0.2)',
						},
					},
				},
			},
		},
	});
};

export const customModalTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiPaper-root': {
							overflowX: 'hidden',
						},
					},
				},
			},
		},
	});
};

export const customImageModalTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiPaper-root': {
							overflowX: 'hidden',
							height: 'auto'
						},
					},
				},
			},
		},
	});
};

export const customMobileImageModalTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiPaper-root': {
							overflowX: 'hidden',
						},
					},
					container: {
						width: '100%',
					},
				},
			},
		},
	});
};

export const customSliderTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiSlider: {
				styleOverrides: {
					root: {
						color: primaryColor,
						height: '12px',
						padding: '15px 0',
					},
					thumb: {
						height: 32,
						width: 32,
						backgroundColor: '#FFFFFF',
						border: '1px solid #F2F2F3',
						boxShadow: '0 4px 4px rgba(13,7,11,0.22)',
						borderRadius: '40px',
						'&:focus, &:hover, &.Mui-active': {
							boxShadow: '0 3px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.02)',
							'@media (hover: none)': {
								boxShadow: '0 3px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.02)',
							},
						},
					},
					track: {
						border: 'none',
						opacity: 1,
						backgroundColor: primaryColor,
					},
					rail: {
						opacity: 1,
						backgroundColor: '#F2F2F3',
					},
					mark: {
						backgroundColor: 'transparent',
						height: 8,
						width: 1,
						'&.MuiSlider-markActive': {
							opacity: 1,
							backgroundColor: 'transparent',
						},
					},
				},
			},
		},
	});
};

// Shop coordonées text input
export const promoCodeTextInputTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	const blueColor = '#0274d7';

	return createTheme({
		...defaultTheme,
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
						textTransform: 'uppercase',
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: '#A3A3AD',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: blueColor,
						},
					},
				},
			},
		},
	});
};

export const checkBoxTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);

	return createTheme({
		...defaultTheme,
		components: {
			MuiCheckbox: {
				styleOverrides: {
					root: {
						'&.Mui-checked': {
							color: primaryColor,
						},
						color: '#A3A3AD',
					},
				},
			},
		},
	});
}

export const newsLetterEmailInputTheme = () => {
	const whiteColor = '#FFFFFF';

	return createTheme({
		palette: {
			primary: {
				main: whiteColor,
			},
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 767,
				md: 991,
				lg: 1200,
				xl: 1920,
			},
		},
		typography: {
			fontFamily: 'Poppins',
		},
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						},
						'& fieldset > legend': {
							// size of red error line (label) (input size - 5px)
							fontFamily: 'Poppins',
							fontSize: '14px',
						},
						'&:hover': {
							borderRadius: '16px',
							border: '1px solid #A3A3AD',
						}
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: whiteColor,
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: '#A3A3AD',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							fontFamily: 'Poppins',
							fontSize: '19px',
							color: whiteColor,
						},
						'& .MuiInputBase-root': {
							color: whiteColor,
						},

					},
				},
			},
		},
	});
};

export const SizesChipTheme = (primaryColor: string | undefined = undefined) => {
	const defaultTheme = getDefaultTheme(primaryColor);
	return createTheme({
		components: {
			...defaultTheme,
			MuiChip: {
				styleOverrides: {
					root: {
						fontFamily: 'Poppins',
						fontSize: '15px',
						paddingTop: '10px',
						paddingBottom: '10px',
						height: '37px',
						border: '1.5px solid #0D070B',
						borderRadius: '40px',
					},
					outlined: {
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.17)',
						},
					},
					filled: {
						backgroundColor: '#0D070B',
						color: 'white',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
						},
					},
				},
			},
		},
	});
};