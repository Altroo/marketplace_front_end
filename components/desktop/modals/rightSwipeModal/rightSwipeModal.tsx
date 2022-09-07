import React, {useState, useEffect} from 'react';
import Styles from './rightSwipeModal.module.sass';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppSelector } from "../../../../utils/hooks";
import { getShopObj } from "../../../../store/selectors";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="left" ref={ref} {...props}>{props.children}</Slide>;
});

type Props = {
	open: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
};

const RightSwipeModal: React.FC<Props> = (props: Props) => {
	const [mountDialog, setMountDialog] = useState<boolean>(false);
	const shopObj = useAppSelector(getShopObj);

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

	useEffect(() => {
		if (shopObj) {
			setMountDialog(true);
		}
	}, [shopObj]);

	return (
		<ThemeProvider theme={customTheme}>
			<Dialog
				keepMounted={mountDialog}
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

export default RightSwipeModal;
