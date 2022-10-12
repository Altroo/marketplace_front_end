import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Styles from './successAlert.module.sass';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	children?: React.ReactNode;
};
const SuccessAlert: React.FC<Props> = (props: Props) => {

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		props.setShow(false);
	};

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar open={props.show} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} className={Styles.alert}>
					{props.message}
				</Alert>
			</Snackbar>
		</Stack>
	);
};

export default SuccessAlert;
