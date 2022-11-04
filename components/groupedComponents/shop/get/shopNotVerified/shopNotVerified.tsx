import React from 'react';
import Styles from './shopNotVerified.module.sass';
import { Stack } from "@mui/material";
import AlertSVG from '../../../../../public/assets/svgs/globalIcons/alert.svg';
import Image from 'next/image';

const ShopNotVerified: React.FC = () => {
	return (
		<Stack className={Styles.stackWrapper} direction="column" justifyContent="center">
			<Stack direction="row" spacing={1} className={Styles.stackAlert}>
				<Image src={AlertSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.icon} />
				<span className={Styles.message}>Cette boutique n&apos;est pas vérifiée</span>
			</Stack>
		</Stack>
	);
};

export default ShopNotVerified;
