import React from "react";
import Styles from "./mobileOffersFilterButton.module.sass";
import { CustomTheme } from "../../../../utils/themes";
import { Fab, ThemeProvider, Box } from "@mui/material";
import Image from "next/image";

type Props = {
	buttonText: string;
	svgIcon: string;
	onClick?: () => void;
	backgroundColor?: string | null;
	textColor?: string | null;
	border?: string | null;
	disabled?: boolean;
	cssClass?: string;
	children?: React.ReactNode;
}

const MobileOffersFilterButton: React.FC<Props> = (props: Props) => {
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
			<Box sx={{position: 'relative'}}>
				<Fab
					variant="extended"
					size="small"
					color="primary"
					onClick={props.onClick}
					className={`${Styles.iconRightButton} ${!props.disabled ? Styles.active : ''} 
					${props.cssClass && props.cssClass}`}
					disabled={props.disabled}
					style={{...cssStyle}}>
					{props.buttonText}
					<Image src={props.svgIcon} alt="" className={Styles.icon} />
				</Fab>
			</Box>
		</ThemeProvider>

	);
};

export default MobileOffersFilterButton;