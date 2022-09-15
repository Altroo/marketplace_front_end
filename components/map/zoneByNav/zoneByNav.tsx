import React from 'react';
import Styles from './zoneByNav.module.sass';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { createTheme, ThemeProvider } from '@mui/material';
import { CustomTheme, doubleTabNavigationTheme } from "../../../utils/themes";
import { ShopZoneByType } from "../../../types/shop/shopTypes";

type Props = {
	zoneByHandler: (zoneBy: ShopZoneByType) => void;
	zoneBy: ShopZoneByType;
	children?: React.ReactNode;
};

const ZoneByNav: React.FC<Props> = (props: Props) => {
	const handleChange = (event: React.SyntheticEvent, newValue: ShopZoneByType) => {
		props.zoneByHandler(newValue);
	};

	const navigationTheme = doubleTabNavigationTheme();

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
