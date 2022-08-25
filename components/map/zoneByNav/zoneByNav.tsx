import React from 'react';
import Styles from './zoneByNav.module.sass';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { createTheme, ThemeProvider } from '@mui/material';
import {CustomTheme} from '../../../utils/themes';
import { ShopZoneByType } from "../../../types/shop/shopTypes";

type Props = {
	zoneByHandler: (zoneBy: ShopZoneByType) => void;
	zoneBy: ShopZoneByType;
	children?: React.ReactNode;
};

const ZoneByNav: React.FC<Props> = (props: Props) => {
	const blueColor = '#0274d7';
	const customTheme = CustomTheme(blueColor);

	const navigationTheme = createTheme({
		...customTheme,
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

	const handleChange = (event: React.SyntheticEvent, newValue: ShopZoneByType) => {
		props.zoneByHandler(newValue);
	};

	return (
		<ThemeProvider theme={navigationTheme}>
			<BottomNavigation value={props.zoneBy} onChange={handleChange} showLabels>
				<BottomNavigationAction label="Adresse" value="A" />
				<BottomNavigationAction label="Secteur" value="S" />
			</BottomNavigation>
		</ThemeProvider>
	);
};

export default ZoneByNav;
