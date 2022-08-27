import React from 'react';
import Styles from './colorsRadioCheckContent.module.sass';
import { Stack, Button, ThemeProvider, Grid} from '@mui/material';
import { OfferColorsListType } from '../../../../../types/ui/uiTypes';
import { getDefaultTheme } from '../../../../../utils/themes';
import RadioCheckElement from "../radioCheckElement";

type Props = {
	children?: React.ReactNode;
};

const ColorsRadioCheckContent: React.FC<Props> = (props: Props) => {

	const testOnClick = (color: string) => {
		console.log('clicked : ', color);
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
			<RadioCheckElement title="Couleurs">
					<Grid container>
					{availableColorsList.map((color, index) => {
						return (
							<Grid item md={3} sm={3} xs={4} key={index}>
								<Stack direction="column" key={index} alignItems="center">
									<Button className={Styles.colorButton}
										sx={{ border: color.code === 'WT' ? '1px solid #A3A3AD' : '0',
											background: color.hex,
										}}
										size="small"
										onClick={() => testOnClick(color.code)}
										color="primary"
									/>
									<span className={Styles.colorValue}>{color.value}</span>
								</Stack>
							</Grid>
						);
					})}
					</Grid>
				</RadioCheckElement>
		</ThemeProvider>
	);
};

export default ColorsRadioCheckContent;
