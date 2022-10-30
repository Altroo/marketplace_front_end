import React from "react";
import Styles from "./horairesRadioCheckContent.module.sass";
import { Stack, ThemeProvider } from "@mui/material";
import RadioCheckElement from "../radioCheckElement";
import { horairesInputTheme } from "../../../../../utils/themes";

type Props = {
	switchOpen: boolean;
	children?: React.ReactNode;
}

const HorairesRadioCheckContent: React.FC<Props> = (props: Props) => {

	const horaireTheme = horairesInputTheme('#0274d7')
	return (
		<RadioCheckElement title="Horaires" defaultValue={props.switchOpen}>
			<Stack
				direction="row"
				flexWrap="wrap"
				gap={5}
				justifyContent="space-between"
				alignItems="center"
				className={Styles.rootStack}
			>
				<ThemeProvider theme={horaireTheme}>
						{props.children}
				</ThemeProvider>
			</Stack>
		</RadioCheckElement>
	);
};

export default HorairesRadioCheckContent;
