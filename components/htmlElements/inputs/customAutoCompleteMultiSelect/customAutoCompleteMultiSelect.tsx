import React from "react";
import Styles from "./customAutoCompleteMultiSelect.module.sass";
import {
	ThemeProvider,
	FormControl,
	Autocomplete,
	Chip
} from "@mui/material";
import { Theme } from "@mui/material/styles/createTheme";
import Image from 'next/image';
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../../../utils/hooks";
import closeWhiteSVG from "../../../../public/assets/svgs/navigationIcons/close-white.svg";
import { placesGetCitiesAction } from "../../../../store/actions/places/placesActions";

type Props = {
	id: string;
	label: string;
	items: Array<string>;
	theme: Theme;
	value: Array<string>;
	onChange?: (event: React.SyntheticEvent<Element, Event>, value: Array<string>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	helperText?: string;
	error?: boolean;
	disabled?: boolean;
	cssClass?: string;
	children?: React.ReactNode;
}

const CustomAutoCompleteMultiSelect: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();

	return (
		<ThemeProvider theme={props.theme}>
			<FormControl className={`${Styles.formControl} ${props.cssClass}`} disabled={props.disabled}>
				<Autocomplete
					id={props.id}
					value={props.value ? props.value : []}
					onChange={props.onChange}
					onBlur={props.onBlur}
					disableClearable
					multiple
					options={props.items ? props.items : []}
					getOptionLabel={(option) => {
						return option;
					}}
					noOptionsText="Ville introuvable."
					renderTags={(values: Array<string> | readonly string[], getTagProps) =>
						values.map((option, index: number) => {
							return (
								<Chip
									color="primary"
									variant="outlined"
									label={option}
									sx={{
										fontFamily: 'Poppins',
										fontSize: '19px',
										borderRadius: '40px',
										backgroundColor: '#0D070B',
										color: '#FFFFFF',
										height: '37px',
										'& fieldset': { borderRadius: '16px 0px 0px 16px' },
									}}
									{...getTagProps({ index })}
									deleteIcon={<Image src={closeWhiteSVG} alt="" width="25" height="25" sizes="100vw" />}
									key={index}
								/>
							);
						})
					}
					sx={{
						borderRadius: '16px',
					}}
					color="primary"
					renderInput={(params) => (
						<TextField
							{...params}
							color="primary"
							label={props.label}
							placeholder={props.label}
							sx={{
								'& fieldset': { borderRadius: '16px 0px 0px 16px' },
							}}
							onChange={(e) => {
								dispatch(placesGetCitiesAction('MA', e.target.value));
							}}
							onKeyDown={(e) => {
								if (e.code === 'Enter') {
									e.preventDefault();
								}
							}}
						/>
					)}
				/>
			</FormControl>
		</ThemeProvider>
	);
};

export default CustomAutoCompleteMultiSelect;
