import React, { useState, useEffect } from "react";
import Styles from "./radioCheckElement.module.sass";
import { Collapse, Stack, ThemeProvider, Grid, Box } from "@mui/material";
import IosSwitch from "../../../htmlElements/switches/iosSwitch";
import { getDefaultTheme, offerSwitchTheme } from "../../../../utils/themes";

type Props = {
	title: string;
	disabled?: boolean;
	emptyStates?: () => void;
	defaultValue?: boolean;
	children?: React.ReactNode;
}

const RadioCheckElement: React.FC<Props> = (props: Props) => {
	const [open, setOpen] = useState<boolean>(props.defaultValue ? props.defaultValue : false);
	const [showOptional, setShowOptional] = useState<boolean>(true);
	const defaultTheme = getDefaultTheme();
	const switchTheme = offerSwitchTheme();
	const [switchOpenHasRun, setSwitchOpenHasRun] = useState<boolean>(false);
	const {emptyStates, defaultValue, title} = props;

	useEffect(() => {
		if (title === 'Click & collect' || title === 'Livraison') {
			setShowOptional(false);
		}
		// if (!open) {
		// 	if (emptyStates) {
		// 		console.log('EMPTY STATES CALLED');
		// 		emptyStates();
		// 	}
		// }
		if(defaultValue && !switchOpenHasRun) {
			setOpen(defaultValue);
			setSwitchOpenHasRun(true);
		}
	}, [defaultValue, emptyStates, open, switchOpenHasRun, title]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<Stack direction="column" spacing={1}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" className={Styles.stackRootWrapper}>
						{/* sm={6} xs={6} */}
						<Grid item>
							<span className={Styles.title}>
								{props.title} {showOptional ? <span>(optionnel)</span> : null}
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
