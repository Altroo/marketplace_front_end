import React from 'react';
import Styles from './googleSignInButton.module.sass';
import { Button, Stack, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import GoogleSVG from '../../../../public/assets/svgs/authIcons/google.svg';
import { getDefaultTheme } from '../../../../utils/themes';

type Props = {
	onClick: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
};

const GoogleSignInButton: React.FC<Props> = (props: Props) => {
	const defaultTheme = getDefaultTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<Button
				color="primary"
				onClick={props.onClick}
				className={Styles.button}
				disabled={props.disabled}
				sx={{
					opacity: `${props.disabled ? '0.5 !important' : '1 !important'}`,
				}}
			>
				<Stack direction="row" alignItems="center">
					<Image src={GoogleSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.icon} />
					<span className={Styles.text}>avec Google</span>
				</Stack>
			</Button>
		</ThemeProvider>
	);
};

export default GoogleSignInButton;
