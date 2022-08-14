import React from 'react';
import Styles from './tab.module.sass';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material';

type OldTabProps = {
	active: boolean;
	text: string;
	borderColor?: string | null;
	color?: string | null;
	selected?: boolean;
	children?: React.ReactNode;
};

export const DisactivatedTab: React.FC<OldTabProps> = (props: OldTabProps) => {
	let cssDivStyle = {};
	let cssPStyle = {};
	if (props.borderColor !== '#FFFFFF') {
		cssDivStyle = { ...cssDivStyle, borderColor: props.borderColor };
	}
	if (props.active && props.color) {
		cssPStyle = { ...cssPStyle, color: props.color };
	}
	return (
		<div
			className={`${Styles.tabHeaderContainer}
		${props.active ? `${Styles.tabActive}` : ''}
		${props.selected ? `${Styles.tabSelected}` : ''}
		${props.active && props.borderColor === '#FFFFFF' ? `${Styles.tabBlackColor}` : ''}
		`}
			style={{ ...cssDivStyle }}
		>
			<p className={Styles.tabHeader} style={{ ...cssPStyle }}>
				{props.text}
			</p>
		</div>
	);
};

interface TabPanelProps {
	dir: string;
	index: number;
	value: number;
	children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const tabIDS = (index: number) => {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
};

type BasicTabsProps = {
	// active: boolean;
	// text: string;
	borderColor: string;
	color: string;
	shopContent: React.ReactNode;
	InfoContent: React.ReactNode;
	disabled?: boolean;
	children?: React.ReactNode;
};

const ShopInfoTabs: React.FC<BasicTabsProps> = (props: BasicTabsProps) => {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
	// Check if white color
	let newColor = props.color;
	let newBorderColor = props.borderColor;
	if (newColor === '#FFFFFF') {
		newColor = '#0D070B';
	}
	if (newBorderColor === '#FFFFFF') {
		newBorderColor = '#0D070B';
	}
	const colorTheme = createTheme({
		palette: {
			background: {
				paper: '#FFFFFF', // background color default
			},
			text: {
				primary: '#84848A',
			},
		},
		components: {
			MuiTab: {
				styleOverrides: {
					root: {
						'&.Mui-selected': {
							fontFamily: 'poppins',
							fontSize: '17px',
							color: newColor, // active tab text color along with ripple color
						},
					},
					fullWidth: {
						fontFamily: 'poppins',
						color: '#84848A', // inactive tab text color
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					indicator: {
						backgroundColor: newColor, // active tab bottom border
					},
				},
			},
		},
	});

	return (
		<Box sx={{ width: '100%' }}>
			<ThemeProvider theme={colorTheme}>
				<Box
					sx={{
						borderBottom: 2,
						borderColor: newBorderColor, // inactive tab bottom border
						bgcolor: 'background.paper',
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						variant="fullWidth"
						className={Styles.realTabHeaderContainer}
					>
						<Tab label="BOUTIQUE" disabled={props.disabled} {...tabIDS(0)} />
						<Tab label="INFOS" disabled={props.disabled} {...tabIDS(1)} />
					</Tabs>
				</Box>
			</ThemeProvider>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					{props.shopContent}
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					{props.InfoContent}
				</TabPanel>
			</SwipeableViews>
		</Box>
	);
};

export default ShopInfoTabs;
