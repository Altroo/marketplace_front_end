import React from "react";
import Styles from "./facebookSignInButton.module.sass";
import { Button, Stack, ThemeProvider } from "@mui/material";
import { default as ImageFuture } from "next/future/image";
import FacebookSVG from "../../../../public/assets/svgs/authIcons/facebook.svg";
import { getDefaultTheme } from "../../../../utils/themes";

type Props = {
	onClick: () => void;
	children?: React.ReactNode;
}

const FacebookSignInButton: React.FC<Props> = (props: Props) => {

	const defaultTheme = getDefaultTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<Button
				color="primary"
				onClick={props.onClick}
				className={Styles.button}>
				<Stack direction="row" alignItems="center">
					<ImageFuture
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
