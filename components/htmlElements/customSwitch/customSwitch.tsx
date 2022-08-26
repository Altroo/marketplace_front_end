import React, {CSSProperties} from "react";
import Styles from "./customSwitch.module.sass";
import { styled, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { CustomTheme, getDefaultTheme } from "../../../utils/themes";

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
	children?: React.ReactNode;
};


const CustomSwitch: React.FC<Props> = (props: Props) => {
	let activeColor = props.activeColor;
	if (activeColor === '#FFFFFF') {
		activeColor = '#0D070B';
	}
	return (
		<FormGroup>
			<FormControlLabel
				style={{...props.labelcssStyles}}
				control={
					<IOSSwitchStyle
						sx={{ m: 1 }}
						activeColor={activeColor && activeColor}
						onChange={(e) => props.onChange && props.onChange(e.target.checked)}
						checked={props.checked}
					/>
				}
				label=""
				disabled={props.disabled}
			/>
		</FormGroup>
	);
};

export default CustomSwitch;
