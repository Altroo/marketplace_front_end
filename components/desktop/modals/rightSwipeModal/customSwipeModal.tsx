import React, {useState, useEffect} from 'react';
import Styles from './customSwipeModal.module.sass';
import {Dialog, Box, Slide, ThemeProvider} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppSelector } from "../../../../utils/hooks";
import { getShopObj } from "../../../../store/selectors";
import CloseSVG from "../../../../public/assets/svgs/navigationIcons/close.svg";
import { default as ImageFuture } from "next/future/image";
import { customModalTheme } from "../../../../utils/themes";

// left
const DefaultTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="left" ref={ref} {...props}>{props.children}</Slide>;
});

// Up
const UpTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props}>{props.children}</Slide>;
});

// Down
const DownTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="down" ref={ref} {...props}>{props.children}</Slide>;
});

// Right
const RightTransition = React.forwardRef(function Transition(
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
	fullScreen?: boolean;
	keepMounted?: boolean;
	waitShopSelector?: boolean;
	direction?: 'left' | 'right' | 'up' | 'down';
	showCloseIcon?: boolean;
	cssClasse?: string;
	children?: React.ReactNode;
};

const CustomSwipeModal: React.FC<Props> = (props: Props) => {
	const {
		keepMounted,
		waitShopSelector,
		direction,
		showCloseIcon,
		handleClose,
		open,
		fullScreen,
		cssClasse
	} = props;
	const [mountDialog, setMountDialog] = useState<boolean>(false);
	const shopObj = useAppSelector(getShopObj);

	let Transition = DefaultTransition;
	if (direction === 'up') {
		Transition = UpTransition;
	} else if (direction === 'down') {
		Transition = DownTransition;
	} else if (direction === 'right') {
		Transition = RightTransition;
	}

		useEffect(() => {
			if (typeof keepMounted === 'boolean') {
				setMountDialog(keepMounted);
			}
			if (waitShopSelector && shopObj) {
				setMountDialog(true);
			}
	}, [shopObj, keepMounted, waitShopSelector]);

	return (
		<ThemeProvider theme={customModalTheme()}>
			<Dialog
				keepMounted={mountDialog}
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				fullScreen={typeof fullScreen !== 'undefined' ? fullScreen : true}
				className={`${Styles.dialog} ${cssClasse && cssClasse}`}
			>
				{showCloseIcon && <Box className={Styles.closeButtonWrapper}>
					<ImageFuture
						src={CloseSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
						onClick={handleClose}
						style={{ cursor: 'pointer' }}
						/>
				</Box>}
      {props.children}
			</Dialog>
		</ThemeProvider>
	);
};

export default CustomSwipeModal;