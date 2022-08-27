import React, { useState } from "react";
import Styles from "./radioCheckElement.module.sass";
import { Collapse, Stack, ThemeProvider, Grid, Box } from "@mui/material";
import IosSwitch from "../../../htmlElements/switches/iosSwitch";
import { getDefaultTheme, offerSwitchTheme } from "../../../../utils/themes";

type Props = {
	title: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

const RadioCheckElement: React.FC<Props> = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultTheme = getDefaultTheme();
	const switchTheme = offerSwitchTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<Stack direction="column" spacing={1}>
				<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" className={Styles.stackRootWrapper}>
					{/* sm={6} xs={6} */}
					<Grid item>
						<span className={Styles.title}>
							{props.title} <span>(optionnel)</span>
						</span>
					</Grid>
					{/* md={3} sm={6} xs={6} */}
					<Grid item>
						<IosSwitch
							checked={open}
							disabled={props.disabled}
							onChange={setOpen}
							activeColor="#0274d7"
							theme={switchTheme}
						/>
					</Grid>
				</Grid>
				</Box>
				<Collapse in={open} mountOnEnter={false}>
					{props.children}
				</Collapse>
			</Stack>
		</ThemeProvider>
	);
};

export default RadioCheckElement;
