import * as React from 'react';
import { Slider, ThemeProvider } from '@mui/material';
import { customSliderTheme } from '../../../utils/themes';

type Props = {
	defaultValue: number;
	value: number;
	onChange: (e: Event, newValue: number | Array<number>) => void;
	children?: React.ReactNode;
};

const CustomSlider: React.FC<Props> = (props: Props) => {

	return (
		<ThemeProvider theme={customSliderTheme('#0D070B')}>
			<Slider
				color="primary"
				defaultValue={props.defaultValue}
				valueLabelDisplay="off"
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
