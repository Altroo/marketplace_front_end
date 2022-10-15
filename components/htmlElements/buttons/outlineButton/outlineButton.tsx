import React from 'react';
import Styles from './outlineButton.module.sass';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import {CustomTheme} from '../../../../utils/themes';

type Props = {
	buttonText: string;
	onClick?: () => void;
	backgroundColor?: string;
	active?: boolean,
	type?: 'submit' | 'reset' | 'button' | undefined;
	cssClass?: string;
	children?: React.ReactNode;
};

const OutlineButton: React.FC<Props> = (props: Props) => {
	const customTheme = CustomTheme(props.backgroundColor);
	return (
		<ThemeProvider theme={customTheme}>
			<Button
				color="primary"
				variant="outlined"
				size="medium"
				onClick={props.onClick}
				type={props.type}
				disabled={!props.active}
				className={`${Styles.outlineButton} 
					${props.cssClass && `${props.cssClass}`}`}>
				{props.buttonText}
			</Button>
		</ThemeProvider>
	);
};

export default OutlineButton;
