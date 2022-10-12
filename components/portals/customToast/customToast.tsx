import React from 'react';
import { Stack, Snackbar, ThemeProvider, Slide, SlideProps } from '@mui/material';
import Styles from './customToast.module.sass';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { customToastTheme } from '../../../utils/themes';
import ErrorIconSVG from '../../../public/assets/svgs/portals/error.svg';
import WarningIconSVG from '../../../public/assets/svgs/portals/warning.svg';
import InfoIconSVG from '../../../public/assets/svgs/portals/info.svg';
import SuccessIconSVG from '../../../public/assets/svgs/portals/success.svg';
import { default as ImageFuture } from 'next/future/image';
import { TransitionProps } from "@mui/material/transitions";

type Props = {
	type: AlertColor;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	children?: React.ReactNode;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props}>{props.children}</Slide>;
});


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

const CustomToast: React.FC<Props> = (props: Props) => {
	const { type } = props;

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		props.setShow(false);
	};

	return (
		<ThemeProvider theme={customToastTheme()}>
			<Stack spacing={2} className={Styles.rootStack}>
				<Snackbar
					open={props.show}
					autoHideDuration={3000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					TransitionComponent={Transition}
				>
					<Alert
						onClose={handleClose}
						severity={type}
						className={Styles.alert}
						iconMapping={{
							success: (
								<ImageFuture
									src={SuccessIconSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.alertIcon}
								/>
							),
							error: (
								<ImageFuture
									src={ErrorIconSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.alertIcon}
								/>
							),
							info: (
								<ImageFuture src={InfoIconSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.alertIcon} />
							),
							warning: (
								<ImageFuture
									src={WarningIconSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.alertIcon}
								/>
							),
						}}
					>
						{props.message}
					</Alert>
				</Snackbar>
			</Stack>
		</ThemeProvider>
	);
};

export default CustomToast;
