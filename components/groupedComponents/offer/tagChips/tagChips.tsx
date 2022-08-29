import React, { useEffect } from 'react';
import Styles from './tagChips.module.sass';
import { Chip, Autocomplete, TextField, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { bioTextAreaTheme } from '../../../../utils/themes';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { getOfferTags } from '../../../../store/selectors';
import { offerGetTagsAction } from '../../../../store/actions/offer/offerActions';
import closeWhiteSVG from '../../../../public/assets/svgs/navigationIcons/close-white.svg';
import Image from 'next/image';
import { filter } from "dom7";

// type tagOptions = {
// 	pk: number;
// 	name_tag: string;
// };

type Props = {
	setPickedTags: React.Dispatch<React.SetStateAction<Array<string>>>;
	children?: React.ReactNode;
};

const TagChips: React.FC<Props> = (props: Props) => {
	const customTheme = bioTextAreaTheme();
	const availableTags: Array<string> = useAppSelector(getOfferTags);
	const dispatch = useAppDispatch();

	return (
		<ThemeProvider theme={customTheme}>
			<Stack direction="column" spacing={1}>
				<span className={Styles.tagLabel}>Tags</span>
				<span className={Styles.tagDesc}>
					Ajouter quelques tags afin d&apos;apparaître dans nos collections.
				</span>
				<Autocomplete
					onChange={(event, values: Array<string>) => {
							props.setPickedTags(values);
						}
					}
					multiple
					id="tags-filled"
					options={ availableTags ? availableTags : []}
					freeSolo
					disableClearable
					getOptionLabel={(option) => {
						return option;
					}}
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
									deleteIcon={<Image src={closeWhiteSVG} width={25} height={25} alt="" />}
									key={index}
								/>
							);
						})
					}
					sx={{
						borderRadius: '16px',
					}}
					color="primary"
					// isOptionEqualToValue={(option: tagOptions, value: tagOptions) => {
					//
					// 	return false;
					// 	// return option === value;
					// }}
					// isOptionEqualToValue={(option: tagOptions | string, value: tagOptions | string) => {
					// 	if (typeof option === 'object') {
					// 		if (typeof value === 'object'){
					// 			return option.name_tag === value.name_tag;
					// 		} else {
					// 			return option.name_tag === value;
					// 		}
					// 	} else {
					// 		if (typeof value === 'object'){
					// 			console.log('VALUE is string');
					// 			console.log(option);
					// 			console.log(value);
					// 			return option === value.name_tag;
					// 		} else {
					// 			return option === value;
					// 		}
					// 	}
					// }}
					renderInput={(params) => (
						<TextField
							{...params}
							color="primary"
							label="Tags"
							placeholder="Sport, cocozen, sexy..."
							sx={{
								'& fieldset': { borderRadius: '16px 0px 0px 16px' },
							}}
							onChange={(e) => {
								dispatch(offerGetTagsAction(e.target.value));
							}}
						/>
					)}
				/>
			</Stack>
		</ThemeProvider>
	);
};

export default TagChips;
