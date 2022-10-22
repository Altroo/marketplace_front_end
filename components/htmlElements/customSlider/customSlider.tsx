import * as React from 'react';
import { Slider, ThemeProvider } from '@mui/material';
import Styles from './customSlider.module.sass';
import { Mark } from '@mui/base/SliderUnstyled/useSlider.types';
import { customSliderTheme } from '../../../utils/themes';

// const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.02)';

// const IOSSlider = styled(Slider)(() => ({
// 	color: '#0D070B',
// 	height: '12px',
// 	padding: '15px 0',
// 	'& .MuiSlider-thumb': {
// 		height: 28,
// 		width: 28,
// 		// backgroundColor: '#0D070B',
// 		backgroundColor: '#fff',
// 		boxShadow: iOSBoxShadow,
// 		'&:focus, &:hover, &.Mui-active': {
// 			boxShadow: '0 3px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.02)',
// 			// Reset on touch devices, it doesn't add specificity
// 			'@media (hover: none)': {
// 				boxShadow: iOSBoxShadow,
// 			},
// 		},
// 	},
// 	// '& .MuiSlider-valueLabel': {
// 	//   fontSize: 12,
// 	//   fontWeight: 'normal',
// 	//   top: -6,
// 	//   backgroundColor: 'unset',
// 	//   color: theme.palette.text.primary,
// 	//   '&:before': {
// 	//     display: 'none',
// 	//   },
// 	//   '& *': {
// 	//     background: 'transparent',
// 	//     // color: theme.palette.mode === 'dark' ? '#fff' : '#0D070B',
// 	//     // color: '#fff',
// 	//     color: '#0D070B',
// 	//   },
// 	// },
// 	'& .MuiSlider-track': {
// 		border: 'none',
// 	},
// 	'& .MuiSlider-rail': {
// 		opacity: 1,
// 		backgroundColor: '#0D070B',
// 	},
// 	'& .MuiSlider-mark': {
// 		backgroundColor: 'transparent',
// 		height: 8,
// 		width: 1,
// 		'&.MuiSlider-markActive': {
// 			opacity: 1,
// 			backgroundColor: '#FFF',
// 		},
// 	},
// }));

type Props = {
	defaultValue: number;
	// marks: Array<Mark>;
	value: number;
	onChange: (e: Event, newValue: number | Array<number>) => void;
	children?: React.ReactNode;
};

const CustomSlider: React.FC<Props> = (props: Props) => {
	// function valuetext(value: number) {
	// 	return `${value}`;
	// }
	//
	// function valueLabelFormat(value: number) {
	// 	if (value === 1) {
	// 		return `${value} article`;
	// 	} else if (value === 120) {
	// 		return `Illimité`;
	// 	}
	// 	return `${value} articles`;
	// }

	// const scale = (value: number) => {
	// 	const previousMarkIndex = Math.floor(value / 25);
	// 	const previousMark = props.marks[previousMarkIndex];
	// 	const remainder = value % 25;
	// 	if (remainder === 0) {
	// 		return previousMark.value;
	// 	}
	// 	const nextMark = props.marks[previousMarkIndex + 1];
	// 	const increment = (nextMark.value - previousMark.value) / 25;
	// 	return remainder * increment + previousMark.value;
	// };

	// const scale_ = (value: undefined | number) => {
	// 	if (value === undefined) {
	// 		return undefined;
	// 	}
	// 	const previousMarkIndex = Math.floor(value / 25);
	// 	const previousMark = props.marks[previousMarkIndex - 1];
	// 	const remainder = value % 25;
	// 	if (remainder === 0) {
	// 		return previousMark.value;
	// 	}
	// 	const nextMark = props.marks[previousMarkIndex + 1];
	// 	const increment = (nextMark.value - previousMark.value) / 25;
	// 	return remainder * increment + previousMark.value;
	// };
	//
	// const scaleValues = (valueArray: Array<number>) => {
	// 	return [scale_(valueArray[0]), scale_(valueArray[1])];
	// };

	return (
		<ThemeProvider theme={customSliderTheme('#0D070B')}>
			<Slider
				color="primary"
				defaultValue={props.defaultValue}
				// valueLabelFormat={valueLabelFormat}
				// getAriaValueText={valuetext}
				valueLabelDisplay="off"
				// scale={scaleValues}
				// marks={props.marks}
				min={10}
				max={200}
				step={10}
				onChange={props.onChange}
				value={props.value}
			/>
		</ThemeProvider>
	);
};

export default CustomSlider;
