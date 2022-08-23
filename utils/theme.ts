import { createTheme } from '@mui/material/styles';
import { hexToRGB } from './helpers';

const theme = (primaryColor: string | undefined = undefined) => {
	let rippleColor = '#0D070B';
	if (primaryColor) {
		if (primaryColor !== '#FFFFFF') {
			rippleColor = hexToRGB(primaryColor, 0.5);
		} else {
			rippleColor = hexToRGB(rippleColor, 0.5);
		}
	}
	return createTheme({
		palette: {
			primary: {
				main: rippleColor,
			},
			/*secondary: {
				light: '#0066ff',
				main: '#0044ff',
				contrastText: '#ffcc00',
			},*/
		},
	});
};
export default theme;
