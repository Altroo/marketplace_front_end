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
}

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
						height: '55px',
						padding: '10px',
						'& fieldset': {
							padding: '10px 18px',
							height: '59px',
							fontFamily: 'Poppins',
							fontSize: '19px',
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
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
							border: '2px solid #A3A3AD',
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
							// top: '15%',
						},
						'& .MuiFormLabel-root.Mui-focused': {
							top: '0%',
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
							border: '2px solid #A3A3AD',
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
							border: '2px solid #A3A3AD',
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
							border: '2px solid #A3A3AD',
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
							border: '2px solid #A3A3AD',
							// borderTopLeftRadius: '21px',
							// borderTopRightRadius: '21px',
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
						},
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					gutters: {
						fontFamily: 'Poppins',
						fontSize: '16px',
					}
				}
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						border: `1px solid ${blueColor}`,
						borderBottomLeftRadius: '21px',
						borderBottomRightRadius: '21px'
					}
				}
			}
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
					}
				}
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						marginRight: '0px !important',
						marginLeft: '0px !important',
					}
				}
			}
		}
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
						width: '65px',
						'& fieldset': {
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
							width: '65px'
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
					},
				},
			},
		}
	});
};

// Offer thumbnails overview
export const OfferThumbnailsTheme = (backgroundColor: string, textColor: string, border: string) => {
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
						fontFamily: 'Poppins',
						fontSize: '15px',
						border: border,
						borderRadius: '40px',
					},
					filled: {
						backgroundColor: backgroundColor,
						color: textColor,
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
					}
				}
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
						}
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

export const solderPourcentageInputTheme = (primaryColor: string | undefined = undefined) => {
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
							border: '2px solid #A3A3AD',
						},
					},
					input: {
						fontFamily: 'Poppins',
						fontSize: '19px',
						caretColor: blueColor,
						width: '100%',
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						width: '50%',
						'& .MuiFormLabel-root': {
							fontFamily: 'Poppins',
							fontSize: '16px',
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

export const solderPourcentageCustomInputTheme = (primaryColor: string | undefined = undefined) => {
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
						// padding: '10px',
						width: '100%',
						'& fieldset': {
							// padding: '10px 18px',
							height: '59px',
							fontFamily: 'Poppins',
							fontSize: '19px',
							borderRadius: '16px',
							border: '2px solid #A3A3AD',
						},
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						width: '50%',
						height: '100%',
					},
				},
			},
		},
	});
};