import React from 'react';
import Styles from './shopNotIndexed.module.sass';
import { Stack } from '@mui/material';
import OutlineButton from '../../../../htmlElements/buttons/outlineButton/outlineButton';
import { default as ImageFuture } from 'next/future/image';
import JumelleIlluSVG from '../../../../../public/assets/images/jumelle-illu.svg';

type Props = {
	children?: React.ReactNode;
};

const ShopNotIndexed: React.FC<Props> = (props: Props) => {
	return (
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
				/>
			</Stack>
			<ImageFuture
				src={JumelleIlluSVG}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.avatar}
				loading="eager"
			/>
		</Stack>
	);
};

export default ShopNotIndexed;
