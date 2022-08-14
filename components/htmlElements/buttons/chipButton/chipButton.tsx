import React from 'react';
import Styles from './chipButton.module.sass';
import Chip from '@mui/material/Chip';
import { chipActionsType, chipVariantType } from '../../../../types/ui/uiTypes';

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

				return (
					<Chip
						key={index}
						style={{ ...cssStyle }}
						label={action.buttonText}
						disabled={action.disabled}
						variant={variant}
						onClick={action.onClick}
						className={Styles.chip}
					/>
				);
			})}
		</>
	);
};

export default ChipButtons;
