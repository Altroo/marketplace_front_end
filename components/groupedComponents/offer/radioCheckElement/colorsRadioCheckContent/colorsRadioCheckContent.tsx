import React from 'react';
import Styles from './colorsRadioCheckContent.module.sass';
import { Stack, Button, ThemeProvider} from '@mui/material';
import { OfferColorsListType } from '../../../../../types/ui/uiTypes';
import { getDefaultTheme } from '../../../../../utils/themes';
import RadioCheckElement from "../radioCheckElement";

type Props = {
	colors: Array<OfferColorsListType>;
	children?: React.ReactNode;
};

const ColorsRadioCheckContent: React.FC<Props> = (props: Props) => {

	const testOnClick = (color: string) => {
		console.log('clicked : ', color);
	};

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Couleurs">
				<Stack
					className={Styles.stackWrapper}
					direction="row"
					flexWrap="wrap"
					gap={5}
					justifyContent="space-between"
					alignItems="center"
				>
					{props.colors.map((color, index) => {
						return (
							<Stack direction="column" key={index} alignItems="center" sx={{width: '100px'}}>
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
						);
					})}
				</Stack>
				</RadioCheckElement>
		</ThemeProvider>
	);
};

export default ColorsRadioCheckContent;
