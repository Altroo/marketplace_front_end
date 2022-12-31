import React from "react";
import Styles from "./facebookSignInButton.module.sass";
import { Button, Stack, ThemeProvider } from "@mui/material";
import Image from 'next/image';
import FacebookSVG from "../../../../public/assets/svgs/authIcons/facebook.svg";
import { getDefaultTheme } from "../../../../utils/themes";

const defaultTheme = getDefaultTheme();

type Props = {
	onClick: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
}

const FacebookSignInButton: React.FC<Props> = (props: Props) => {

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
					<Image
						src={FacebookSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon}
					/>
					<span className={Styles.text}>avec Facebook</span>
				</Stack>
			</Button>
		</ThemeProvider>
	);
};

export default FacebookSignInButton;
