import React from 'react';
import Styles from './shopNotVerified.module.sass';
import { Stack } from "@mui/material";
import AlertSVG from '../../../../../public/assets/svgs/globalIcons/alert.svg';
import { default as ImageFuture } from 'next/future/image';

type Props = {
	children?: React.ReactNode;
};

const ShopNotVerified: React.FC<Props> = (props: Props) => {
	return (
		<Stack className={Styles.stackWrapper} direction="column" justifyContent="center">
			<Stack direction="row" spacing={1} className={Styles.stackAlert}>
				<ImageFuture src={AlertSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.icon} />
				<span className={Styles.message}>Cette boutique n&apos;est pas vérifiée</span>
			</Stack>
		</Stack>
	);
};

export default ShopNotVerified;
