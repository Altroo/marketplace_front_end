import React from "react";
import Styles from "./customIconButton.module.sass";
import {CustomTheme} from "../../../../utils/themes";
import Image from 'next/image';
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

const CustomIconButton: React.FC<Props> = (props: Props) => {
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
	let customTheme = CustomTheme();
	if (props.backgroundColor) {
		customTheme = CustomTheme(props.backgroundColor);
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
				<Image src={props.svgIcon} width={20} height={20} alt="" className={Styles.icon} />
				{props.buttonText}
			</Button>
		</ThemeProvider>
	);
};

export default CustomIconButton;
