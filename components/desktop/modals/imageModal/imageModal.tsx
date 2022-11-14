import React, { useState, useEffect } from 'react';
import Styles from './imageModal.module.sass';
import { Dialog, Box, Slide, ThemeProvider, Theme } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { useAppSelector } from '../../../../utils/hooks';
import { getShopObj } from '../../../../store/selectors';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';
import Image from 'next/image';

// left
const DefaultTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return (
		<Slide direction="left" ref={ref} {...props}>
			{props.children}
		</Slide>
	);
});

// Up
const UpTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return (
		<Slide direction="up" ref={ref} {...props}>
			{props.children}
		</Slide>
	);
});

// Down
const DownTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return (
		<Slide direction="down" ref={ref} {...props}>
			{props.children}
		</Slide>
	);
});

// Right
const RightTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return (
		<Slide direction="right" ref={ref} {...props}>
			{props.children}
		</Slide>
	);
});

type Props = {
	open: boolean;
	handleClose: () => void;
	fullScreen?: boolean;
	keepMounted?: boolean;
	direction?: 'left' | 'right' | 'up' | 'down';
	cssClasse?: string;
	onBackdrop?: () => void;
	theme: Theme;
	children?: React.ReactNode;
};

const ImageModal: React.FC<Props> = (props: Props) => {
	const { keepMounted, direction, handleClose, theme, open, fullScreen,
		cssClasse, onBackdrop } = props;
	const [mountDialog, setMountDialog] = useState<boolean>(false);
	const shopObj = useAppSelector(getShopObj);
	// let customTheme: Theme = customImageModalTheme();
	// if (mobile) {
	// 	customTheme = customMobileImageModalTheme();
	// }
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
	}, [shopObj, keepMounted]);

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				keepMounted={mountDialog}
				open={open}
				TransitionComponent={Transition}
				onClose={(e, reason) => {
					if (onBackdrop) {
						if (reason) {
							onBackdrop();
						}
					} else {
						handleClose();
					}
				}}
				fullScreen={fullScreen}
				className={`${Styles.dialog} ${cssClasse && cssClasse}`}
			>
				<Box className={Styles.closeButtonWrapper}>
					<Image
						src={CloseSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
						onClick={handleClose}
						style={{ cursor: 'pointer' }}
					/>
				</Box>
				{props.children}
			</Dialog>
		</ThemeProvider>
	);
};

export default ImageModal;
