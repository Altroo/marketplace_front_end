import React from "react";
import Styles from "./creatorRadioCheckContent.module.sass";
import { getDefaultTheme } from "../../../../../utils/themes";
import { ThemeProvider } from "@mui/material";
import RadioCheckElement from "../radioCheckElement";

type Props = {
	children?: React.ReactNode;
}

const CreatorRadioCheckContent: React.FC<Props> = (props: Props) => {

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Labels">
				<div>Labels</div>
			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default CreatorRadioCheckContent;
