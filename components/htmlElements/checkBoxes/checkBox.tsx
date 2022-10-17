import React from 'react';
import Styles from './checkBox.module.sass';
import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { checkBoxForWhomBaseType } from '../../../types/ui/uiTypes';
import { createTheme, ThemeProvider } from '@mui/material';
import { hexToRGB } from '../../../utils/helpers';


const CheckBoxSVG = (fill: string) => {
	return (
		<svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.9052 6.15525L7.15525 9.90525C7.00975 10.0507 6.817 10.125 6.625 10.125C6.45175 10.125 6.27775 10.065 6.13675 9.94425L3.51175 7.69425C3.1975 7.42425 3.16075 6.95175 3.43075 6.6375C3.70075 6.32175 4.174 6.28575 4.48825 6.55575L6.586 8.3535L9.84475 5.09475C10.138 4.8015 10.612 4.8015 10.9052 5.09475C11.1985 5.388 11.1985 5.862 10.9052 6.15525ZM7 0.75C3.27175 0.75 0.25 3.77175 0.25 7.5C0.25 11.2283 3.27175 14.25 7 14.25C10.7283 14.25 13.75 11.2283 13.75 7.5C13.75 3.77175 10.7283 0.75 7 0.75Z"
			fill={fill}
		/>
	</svg>
	);
}

const CheckBox: React.FC<checkBoxForWhomBaseType> = (props: checkBoxForWhomBaseType) => {
	let CheckboxIcon = CheckBoxSVG('#0D070B');
	if (!props.active) {
		CheckboxIcon = CheckBoxSVG('#84848A');
	}
	let alphaColor = 'rgba(25, 118, 210, 0.04)';
	let activeColor = '#0D070B';
	if (props.activeColor) {
		if (props.activeColor === '#FFFFFF') {
			alphaColor = hexToRGB('#0D070B', 0.04);
			CheckboxIcon = CheckBoxSVG('#0D070B');
		} else {
			alphaColor = hexToRGB(props.activeColor, 0.04);
			activeColor = props.activeColor;
			CheckboxIcon = CheckBoxSVG(props.activeColor);
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
						color: activeColor,
					},
				},
			},
		},
	});

	return (
		<div>
			<ThemeProvider theme={colorTheme}>
				<Checkbox
					sx={{ '&:hover': { bgcolor: alphaColor } }}
					style={{...props.labelcssStyles}}
					checked={props.checked}
					onChange={(e) => props.onChange && props.onChange(e.target.checked)}
					disabled={!props.active}
					icon={<RadioButtonUncheckedIcon />}
					checkedIcon={CheckboxIcon}
					size="small"
				/>
				<span className={Styles.checkboxText}>{props.text}</span>
			</ThemeProvider>
		</div>
	);
};

export default CheckBox;
