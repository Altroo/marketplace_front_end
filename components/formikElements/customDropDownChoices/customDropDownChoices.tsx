import React from 'react';
import Styles from './customDropDownChoices.module.sass';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, MenuItem, FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { Theme } from "@mui/material/styles/createTheme";
import ActiveCheckBlue from '../../../public/assets/svgs/globalIcons/active-check-blue.svg';
import { default as ImageFuture } from "next/future/image";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

type Props = {
	id: string;
	label: string;
	items: Array<string>;
	value: Array<string>;
	onChange: (event: SelectChangeEvent<Array<string>>) => void;
	theme: Theme;
	children?: React.ReactNode;
};

const CustomDropDownChoices: React.FC<Props> = (props: Props) => {

	return (
		<ThemeProvider theme={props.theme}>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
				<Select
					labelId={`${props.id}-label`}
					id={props.id}
					multiple
					value={props.value}
					onChange={props.onChange}
					input={<OutlinedInput label={props.label} />}
					MenuProps={MenuProps}
					renderValue={(selected) => selected.join(', ')}
				>
					{props.items.map((item, index) => (
						<MenuItem key={index} value={item}>
							<Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
								{item}
								{props.value.indexOf(item) > -1 && <ImageFuture src={ActiveCheckBlue} alt="" />}
							</Stack>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</ThemeProvider>
	);
};

export default CustomDropDownChoices;
