import React from 'react';
import Styles from './sideNavDrawer.module.sass';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="right" ref={ref} {...props}>{props.children}</Slide>;
});

type Props = {
	open: boolean;
	handleClose: () => void;
	keepMounted?: boolean;
	children?: React.ReactNode;
};

const SideNavDrawer: React.FC<Props> = (props: Props) => {
	const customTheme = createTheme({
		components: {
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiPaper-root': {
							overflowX: 'hidden',
						}
					}
				}
			}
		}
	});

	return (
		<ThemeProvider theme={customTheme}>
			<Dialog
				keepMounted={props.keepMounted}
				open={props.open}
				TransitionComponent={Transition}
				onClose={props.handleClose}
				aria-describedby="alert-dialog-slide-description"
				fullScreen={true}
				className={Styles.dialog}
			>
				{props.children}
			</Dialog>
		</ThemeProvider>
	);
};

export default SideNavDrawer;
