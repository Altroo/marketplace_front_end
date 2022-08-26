import React, { useState } from "react";
import Styles from "./radioCheckElement.module.sass";
import { Collapse, Stack, ThemeProvider } from "@mui/material";
import IosSwitch from "../../../htmlElements/switches/iosSwitch";
import { getDefaultTheme, offerSwitchTheme } from "../../../../utils/themes";

type Props = {
	title: string;
	children?: React.ReactNode;
}

const RadioCheckElement: React.FC<Props> = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultTheme = getDefaultTheme();
	const switchTheme = offerSwitchTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<Stack direction="column">
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
					<span className={Styles.title}>
						{props.title} <span>(optionnel)</span>
					</span>
					<IosSwitch
						checked={open}
						disabled={false}
						onChange={setOpen}
						activeColor="#0274d7"
						theme={switchTheme}
					/>
				</Stack>
				<Collapse in={open} mountOnEnter={false}>
					{props.children}
				</Collapse>
			</Stack>
		</ThemeProvider>
	);
};

export default RadioCheckElement;
