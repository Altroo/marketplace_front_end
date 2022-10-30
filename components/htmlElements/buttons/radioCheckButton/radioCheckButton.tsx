import { Checkbox, createTheme, ThemeProvider, Stack } from "@mui/material";
import React, { CSSProperties } from "react";
import Styles from "./radioCheckButton.module.sass";
import { CheckBoxSVG } from "../../checkBoxes/checkBox";
import { hexToRGB } from "../../../../utils/helpers";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";


type Props = {
	text: string;
	checked: boolean;
	active: boolean;
	onClick: () => void;
	disabled?: boolean;
	activeColor?: string;
	labelcssStyles?: CSSProperties;
	children?: React.ReactNode;
}

const RadioCheckButton: React.FC<Props> = (props: Props) => {
	let CheckboxIcon = CheckBoxSVG('#0274D7', 24, 24);
	if (!props.active) {
		CheckboxIcon = CheckBoxSVG('#84848A', 24, 24);
	}
	let alphaColor = 'rgba(25, 118, 210, 0.04)';
	let activeColor = '#0274D7';
	if (props.activeColor) {
		if (props.activeColor === '#FFFFFF') {
			alphaColor = hexToRGB('#0274D7', 0.04);
			CheckboxIcon = CheckBoxSVG('#0274D7', 24, 24);
		} else {
			alphaColor = hexToRGB(props.activeColor, 0.04);
			activeColor = props.activeColor;
			CheckboxIcon = CheckBoxSVG(props.activeColor, 24, 24);
		}
	}

	const colorTheme = createTheme({
		components: {
			MuiCheckbox: {
				styleOverrides: {
					root: {
						'&.Mui-checked': {
							color: activeColor,
						},
						color: '#A3A3AD',
					},
				},
			},
		},
	});

	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{
			padding: '12px 18px',
			border: `1px solid ${props.checked ? activeColor : '#D9D9DD'}`,
			borderRadius: '20px',
			cursor: `${props.disabled ? 'default' : 'pointer'}`,
			opacity: `${props.disabled ? '.5' : '1'}`,
			'&:hover': { bgcolor: alphaColor },
		}} onClick={() => {
			if (!props.disabled) {
				props.onClick();
			}
		}}>
			<span className={Styles.radioCheckbuttonText}>{props.text}</span>
			<ThemeProvider theme={colorTheme}>
				<Checkbox
					style={{...props.labelcssStyles}}
					checked={props.checked}
					disabled={props.disabled}
					icon={<RadioButtonUncheckedIcon />}
					checkedIcon={CheckboxIcon}
					size="medium"
				/>
			</ThemeProvider>
		</Stack>
	);
};

export default RadioCheckButton;
