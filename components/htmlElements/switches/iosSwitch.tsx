import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CSSProperties } from "react";
import { Theme } from "@mui/material/styles/createTheme";
import { getDefaultTheme } from "../../../utils/themes";
import { ThemeProvider } from "@mui/material";

type IOSSwitchProps = {
	checked: boolean;
	activeColor?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const IOSSwitchStyle = styled((props: IOSSwitchProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { activeColor, ...remainingProps } = props;
	return (
		<Switch
			focusVisibleClassName=".Mui-focusVisible"
			onChange={(e) => props.onChange && props.onChange(e)}
			disableRipple
			{...remainingProps}
		/>
	);
})(({ theme, activeColor }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: activeColor ? activeColor : '#0D070B',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: activeColor ? activeColor : '#0D070B',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.grey[100],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.9,
			backgroundColor: '#D9D9DD',
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: '#E9E9EA',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

type Props = {
	checked: boolean;
	activeColor?: string;
	disabled?: boolean;
	onChange?: (value: boolean) => void;
	labelcssStyles?: CSSProperties;
	theme?: Theme;
	children?: React.ReactNode;
};

const IosSwitch: React.FC<Props> = (props: Props) => {
	let activeColor = props.activeColor;
	if (activeColor === '#FFFFFF') {
		activeColor = '#0D070B';
	}
	let defaultTheme = getDefaultTheme(activeColor);

	if (props.theme) {
		defaultTheme = props.theme;
	}
	return (
		<ThemeProvider theme={defaultTheme}>
			<FormGroup>
				<FormControlLabel
					style={{...props.labelcssStyles}}
					control={
						<IOSSwitchStyle
							activeColor={activeColor && activeColor}
							onChange={(e) => props.onChange && props.onChange(e.target.checked)}
							checked={props.checked}
						/>
					}
					label=""
					disabled={props.disabled}
				/>
			</FormGroup>
		</ThemeProvider>
	);
};

export default IosSwitch;
