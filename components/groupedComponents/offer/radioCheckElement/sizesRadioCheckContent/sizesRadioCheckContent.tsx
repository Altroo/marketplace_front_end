import React, { useState, useRef } from 'react';
import Styles from './sizesRadioCheckContent.module.sass';
import { getDefaultTheme, OfferChipTheme, offerSwitchTheme } from '../../../../../utils/themes';
import { ThemeProvider, Stack, Grid } from '@mui/material';
import RadioCheckElement from '../radioCheckElement';
import { OfferSizesListType } from '../../../../../types/ui/uiTypes';
import Chip from '@mui/material/Chip';

type Props = {
	sizesStates: Record<string, boolean>;
	setSizesStates: Record<string, React.Dispatch<React.SetStateAction<boolean>>>;
	children?: React.ReactNode;
};

const SizesRadioCheckContent: React.FC<Props> = (props: Props) => {
	const sizesRef = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const sizeOnClickHandler = (
		setState: React.Dispatch<React.SetStateAction<boolean>>,
		state: boolean,
		ref: React.RefObject<HTMLInputElement>,
		code: string,
	) => {
		setState(state);
		if (ref.current !== null) {
			if (state) {
				ref.current.value = code;
				// dispatch state add here
			} else {
				ref.current.value = '';
				// dispatch state remove here
			}
		}
	};

	const availableSizesList: Array<OfferSizesListType> = [
		{
			code: 'XS',
			value: 'XSmall',
			state: props.sizesStates.xsState,
			setState: props.setSizesStates.setXsState,
		},
		{
			code: 'S',
			value: 'Small',
			state: props.sizesStates.sState,
			setState: props.setSizesStates.setSState,
		},
		{
			code: 'M',
			value: 'Medium',
			state: props.sizesStates.mState,
			setState: props.setSizesStates.setMState,
		},
		{
			code: 'L',
			value: 'Large',
			state: props.sizesStates.lState,
			setState: props.setSizesStates.setLState,
		},
		{
			code: 'X',
			value: 'XLarge',
			state: props.sizesStates.xState,
			setState: props.setSizesStates.setXState,
		},
		{
			code: 'XL',
			value: 'XXLarge',
			state: props.sizesStates.xlState,
			setState: props.setSizesStates.setXlState,
		},
	];

	const chipTheme = OfferChipTheme();
	return (
		<RadioCheckElement title="Tailles">
			<Stack
				direction="row"
				flexWrap="wrap"
				gap={5}
				justifyContent="space-between"
				alignItems="center"
			>
				<ThemeProvider theme={chipTheme}>
					<Grid container spacing={2}>
						{availableSizesList.map((size, index) => {
							return (
								<Grid item md={5} sm={3} xs={5} lg={3} xl={4} key={index}>
									<Chip
										label={size.value}
										variant={size.state ? 'filled' : 'outlined'}
										onClick={() =>
											sizeOnClickHandler(size.setState, !size.state, sizesRef[index], size.code)
										}
									/>
									<input
										type="hidden"
										id={size.code}
										ref={sizesRef[index]}
										value={size.state ? size.code : ''}
									/>
								</Grid>
							);
						})}
					</Grid>
				</ThemeProvider>
			</Stack>
		</RadioCheckElement>
	);
};

export default SizesRadioCheckContent;
