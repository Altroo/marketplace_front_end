import React, { useState } from 'react';
import Styles from './shopNotIndexed.module.sass';
import { Stack } from '@mui/material';
import OutlineButton from '../../../htmlElements/buttons/outlineButton/outlineButton';
import Image from 'next/image';
import JumelleIlluSVG from '../../../../public/assets/images/jumelle-illu.svg';
import { useRouter } from 'next/router';
import { DASHBOARD_SUBSCRIPTION } from '../../../../utils/routes';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';

const ShopNotIndexed: React.FC = () => {
	const router = useRouter();
	const [close, setClose] = useState<boolean>(false);

	return !close ? (
		<Stack direction="row" justifyContent="space-between" className={Styles.rootStackWrapper}>
			<Stack direction="column" className={Styles.columnStackWrapper}>
				<span>Votre boutique n&apos;est pas référencée,</span>
				<p>abonnez-vous pour booster votre business</p>
				<OutlineButton
					buttonText="S'abonner"
					active={true}
					type="button"
					backgroundColor="#D5CEEE"
					cssClass={Styles.actionButton}
					onClick={() => router.push({
							query: {
								direct: true,
							},
							pathname: DASHBOARD_SUBSCRIPTION,
						}, DASHBOARD_SUBSCRIPTION).then()}
				/>
			</Stack>
			<Image src={JumelleIlluSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.avatar} />
			<Image
				src={CloseSVG}
				alt=""
				width="40"
				height="40"
				sizes="100vw"
				onClick={() => setClose(true)}
				className={Styles.closeButton}
			/>
		</Stack>
	) : (
		<></>
	);
};

export default ShopNotIndexed;
