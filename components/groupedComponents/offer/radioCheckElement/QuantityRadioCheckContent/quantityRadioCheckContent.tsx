import React from "react";
import Styles from "./quantityRadioCheckContent.module.sass";
import { getDefaultTheme } from "../../../../../utils/themes";
import { ThemeProvider } from "@mui/material";
import RadioCheckElement from "../radioCheckElement";

type Props = {
	children?: React.ReactNode;
}

const QuantityRadioCheckContent: React.FC<Props> = (props: Props) => {

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Quantité disponible">
				<div>Quantities</div>
			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default QuantityRadioCheckContent;
