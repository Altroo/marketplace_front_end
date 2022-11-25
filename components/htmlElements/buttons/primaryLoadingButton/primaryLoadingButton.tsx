import React from 'react';
import { ThemeProvider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Styles from './primaryLoadingButton.module.sass';
import { getDefaultTheme } from "../../../../utils/themes";

type Props = {
	buttonText: string;
	loading: boolean;
	onClick?: () => void;
	active?: boolean;
	type?: 'submit' | 'reset' | 'button' | undefined;
	cssClass?: string;
	children?: React.ReactNode;
};



const PrimaryLoadingButton: React.FC<Props> = (props: Props) => {
	return (
		<ThemeProvider theme={getDefaultTheme()}>
			<LoadingButton
				onClick={props.onClick}
				loading={props.loading}
				className={`${Styles.primaryButtonDisabled} 
			${props.active ? `${Styles.primaryButtonActive}` : ''}
			${props.cssClass && `${props.cssClass}`}`}
				disabled={!props.active}
				type={props.type}
				color="primary"
			>
				{props.buttonText}
			</LoadingButton>
		</ThemeProvider>
	);
};

export default PrimaryLoadingButton;
