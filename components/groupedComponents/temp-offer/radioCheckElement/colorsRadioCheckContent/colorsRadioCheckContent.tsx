import React from 'react';
import Styles from './colorsRadioCheckContent.module.sass';
import { Stack, Button, ThemeProvider, Grid, Box } from '@mui/material';
import { OfferColorsListType } from '../../../../../types/ui/uiTypes';
import { getDefaultTheme } from '../../../../../utils/themes';
import RadioCheckElement from '../radioCheckElement';
import { hexToRGB } from '../../../../../utils/helpers';

type Props = {
	switchOpen: boolean;
	selectedColorsList: Array<string>;
	setselectedColorsList: React.Dispatch<React.SetStateAction<Array<string>>>;
	children?: React.ReactNode;
};

const ColorsRadioCheckContent: React.FC<Props> = (props: Props) => {
	const colorOnClickHandler = (color: string) => {
		if (!props.selectedColorsList.includes(color)) {
			props.setselectedColorsList((prevState) => {
				return [...prevState, color];
			});
		} else {
			const colorsList = [...props.selectedColorsList];
			const index = props.selectedColorsList.indexOf(color);
			if (index > -1) {
				colorsList.splice(index, 1);
				props.setselectedColorsList(colorsList);
			}
		}
	};

	const defaultTheme = getDefaultTheme();

	const availableColorsList: Array<OfferColorsListType> = [
		{
			code: 'BK',
			value: 'Noir',
			hex: '#0D070B',
		},
		{
			code: 'WT',
			value: 'Blanc',
			hex: '#FFFFFF',
		},
		{
			code: 'BR',
			value: 'Marron',
			hex: '#CEB186',
		},
		{
			code: 'BL',
			value: 'Bleu',
			hex: '#0274D7',
		},
		{
			code: 'GN',
			value: 'Vert',
			hex: '#07CBAD',
		},
		{
			code: 'PR',
			value: 'Violet',
			hex: '#8669FB',
		},
		{
			code: 'OR',
			value: 'Orange',
			hex: '#FFA826',
		},
		{
			code: 'PI',
			value: 'Rose',
			hex: '#FF9DBF',
		},
		{
			code: 'YE',
			value: 'Jaune',
			hex: '#FED301',
		},
		{
			code: 'GR',
			value: 'Gris',
			hex: '#D9D9DD',
		},
		{
			code: 'MC',
			value: 'Multicolore',
			hex: 'conic-gradient(from 70.34deg at 51.34% 50%, #9557FF -67.34deg, #FF5364 21.53deg, #FFFB45 108.58deg, #70FA67 180deg, #48C3FF 228.18deg, #9557FF 292.66deg, #FF5364 381.53deg)',
		},
		{
			code: 'RD',
			value: 'Rouge',
			hex: '#E12D3D',
		},
	];

	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Couleurs" defaultValue={props.switchOpen}>
				<Box mb={4}>
					<Grid container>
					{availableColorsList.map((color, index) => {
						const rippleColor = hexToRGB(color.hex, 0.5);
						return (
							<Grid item md={3} sm={3} xs={4} key={index}>
								<Stack direction="column" key={index} alignItems="center">
									<Box
										className={`${Styles.colorWrapper} ${
											props.selectedColorsList.includes(color.code) ? Styles.colorActive : ''
										}`}
									>
										<Button
											className={Styles.colorButton}
											sx={{
												border: color.code === 'WT' ? '1px solid #A3A3AD' : '0',
												background: color.hex,
												'&:hover': {
													backgroundColor: `${rippleColor} !important`,
												},
											}}
											size="small"
											onClick={() => colorOnClickHandler(color.code)}
											color="primary"
										/>
									</Box>
									<span className={Styles.colorValue}>{color.value}</span>
								</Stack>
							</Grid>
						);
					})}
				</Grid>
				</Box>

			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default ColorsRadioCheckContent;
