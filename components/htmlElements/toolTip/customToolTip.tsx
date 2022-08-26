import React from 'react';
import Styles from './customToolTip.module.sass';
import { ThemeProvider, Tooltip } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import { Theme } from "@mui/material/styles/createTheme";

type Props = {
	title: string;
	open: boolean;
	onClose: () => void;
	theme: Theme;
	// eslint-disable-next-line
	children: React.ReactElement<any, any>;
};

const CustomToolTip: React.FC<Props> = (props: Props) => {
	return (
		<ThemeProvider theme={props.theme}>
			<Tooltip
				arrow
				placement="bottom-end"
				TransitionComponent={Zoom}
				PopperProps={{
					disablePortal: true,
				}}
				onClose={props.onClose}
				open={props.open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title={props.title}>
				{props.children}
			</Tooltip>
		</ThemeProvider>
	);
};

export default CustomToolTip;
