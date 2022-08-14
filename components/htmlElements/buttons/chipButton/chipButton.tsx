import React from 'react';
import Styles from './chipButton.module.sass';
import Chip from '@mui/material/Chip';
import { chipActionsType, chipVariantType } from '../../../../types/ui/uiTypes';
import { createTheme, ThemeProvider } from '@mui/material';
import { hexToRGB } from "../../../../utils/helpers";

type Props = {
	actions: chipActionsType;
	children?: React.ReactNode;
};
const ChipButtons: React.FC<Props> = (props: Props) => {
	return (
		<>
			{props.actions.map((action, index: number) => {
				let variant: chipVariantType = 'outlined';
				if (action.selected) {
					variant = 'filled';
				}
				let cssStyle = {};
				if (action.selected && action.backgroundColor) {
					cssStyle = { ...cssStyle, backgroundColor: action.backgroundColor };
				}
				if (action.selected && action.textColor) {
					cssStyle = { ...cssStyle, color: action.textColor };
				}
				if (!action.selected) {
					cssStyle = { border: `2px solid ` + action.backgroundColor, ...cssStyle };
				}
				if (action.selected && action.border) {
					cssStyle = { border: action.border, ...cssStyle };
				}
				let rippleColor = '#0D070B';
				if (action.backgroundColor) {
					if (action.backgroundColor !== '#FFFFFF') {
						rippleColor = hexToRGB(action.backgroundColor, 1);
					} else {
						rippleColor = hexToRGB(rippleColor, 1);
					}
				}
				const colorTheme = createTheme({
					components: {
						MuiChip: {
							styleOverrides: {
								root: {
									color: rippleColor
								},
							},
						},
					},
				});

				return (
					<ThemeProvider theme={colorTheme} key={index}>
						<Chip
							style={{ ...cssStyle }}
							label={action.buttonText}
							disabled={action.disabled}
							variant={variant}
							onClick={action.onClick}
							className={Styles.chip}
						/>
					</ThemeProvider>
				);
			})}
		</>
	);
};

export default ChipButtons;