import React from "react";
import Styles from "./iconButton.module.sass";
import theme from "../../../../utils/theme";
import Image from "next/image";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
	buttonText: string;
	svgIcon: string;
	onClick?: () => void;
	backgroundColor?: string | null;
	textColor?: string | null;
	border?: string;
	disabled?: boolean;
	cssClass?: string;
	children?: React.ReactNode;
};

const IconButton: React.FC<Props> = (props: Props) => {
	let cssStyle = {};
	if (props.backgroundColor) {
		cssStyle = {...cssStyle, backgroundColor: props.backgroundColor};
	}
	if (props.textColor) {
		cssStyle = {...cssStyle, color: props.textColor};
	}
	if (props.border) {
		cssStyle = {...cssStyle, border: props.border};
	}
	let customTheme = theme();
	if (props.backgroundColor) {
		customTheme = theme(props.backgroundColor);
	}
	return (
		<ThemeProvider theme={customTheme}>
			<Button
				onClick={props.onClick}
				color="primary"
				className={`${Styles.iconButton} ${!props.disabled ? Styles.active : ''} 
				${props.cssClass && props.cssClass}`}
				disabled={props.disabled}
				style={{...cssStyle}}>
				<Image src={props.svgIcon} alt="" className={Styles.icon} />
				{props.buttonText}
			</Button>
		</ThemeProvider>
	);
};

export default IconButton;
