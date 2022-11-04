import React from 'react';
import Styles from './tagChips.module.sass';
import { Chip, Autocomplete, TextField, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { bioTextAreaTheme } from '../../../../utils/themes';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { getOfferTags } from '../../../../store/selectors';
import { offerGetTagsAction } from '../../../../store/actions/offer/offerActions';
import closeWhiteSVG from '../../../../public/assets/svgs/navigationIcons/close-white.svg';
import Image from 'next/image';

type Props = {
	pickedTags: Array<string>;
	onChange: (event: React.SyntheticEvent<Element, Event>, values: Array<string>) => void;
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
				<span className={Styles.tagDesc}>Ajouter quelques tags afin d&apos;apparaître dans nos collections.</span>
				<Autocomplete
					value={props.pickedTags ? props.pickedTags : []}
					onChange={props.onChange}
					multiple
					id="tags-filled"
					options={availableTags ? availableTags : []}
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
							label="Tags"
							placeholder="Sport, cocozen, sexy..."
							sx={{
								'& fieldset': { borderRadius: '16px 0px 0px 16px' },
							}}
							onChange={(e) => {
								dispatch(offerGetTagsAction(e.target.value));
							}}
							onKeyDown={(e) => {
								if (e.code === 'Enter') {
									e.preventDefault();
								}
							}}
						/>
					)}
				/>
			</Stack>
		</ThemeProvider>
	);
};

export default TagChips;
