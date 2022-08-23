import React, { CSSProperties } from 'react';
// import Styles from "./apiProgress.module.sass";
import { Box, CircularProgress, Backdrop } from '@mui/material';

type Props = {
	cssStyle?: CSSProperties;
	children?: React.ReactNode;
};

const ApiProgress: React.FC<Props> = (props: Props) => {
	return (
		<Box sx={props.cssStyle}>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
				<CircularProgress />
			</Backdrop>
		</Box>
	);
};

export default ApiProgress;
