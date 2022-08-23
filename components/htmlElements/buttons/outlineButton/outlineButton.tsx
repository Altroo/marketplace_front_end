import React from 'react';
import Styles from './outlineButton.module.sass';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import theme from '../../../../utils/theme';

type Props = {
	buttonText: string;
	onClick?: () => void;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const OutlineButton: React.FC<Props> = (props: Props) => {
	const customTheme = theme(props.backgroundColor);
	return (
		<ThemeProvider theme={customTheme}>
			<Button
				color="primary"
				variant="outlined"
				size="medium"
				onClick={props.onClick}
				className={Styles.outlineButton}>
				{props.buttonText}
			</Button>
		</ThemeProvider>
	);
};

export default OutlineButton;
