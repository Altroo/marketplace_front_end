import React from "react";
import Styles from "./sizesRadioCheckContent.module.sass";
import { getDefaultTheme } from "../../../../../utils/themes";
import { ThemeProvider } from "@mui/material";
import RadioCheckElement from "../radioCheckElement";

type Props = {
	children?: React.ReactNode;
}

const SizesRadioCheckContent: React.FC<Props> = (props: Props) => {

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Tailles">
				<div>Tailles</div>
			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default SizesRadioCheckContent;
