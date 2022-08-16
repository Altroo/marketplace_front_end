import React from 'react';
import Styles from './rightSwipeModal.module.sass';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

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
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
			aria-describedby="alert-dialog-slide-description"
			fullScreen={true}
			className={Styles.dialog}
		>
			{props.children}
		</Dialog>
	);
};

export default RightSwipeModal;
