import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import Styles from './authPageLayout.module.sass';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import QarybSVG from '../../../public/assets/images/logo.svg';
import Link from 'next/link';
import BurgerSVG from '../../../public/assets/images/auth_illu/burger.svg';
import TeeshirtSVG from '../../../public/assets/images/auth_illu/teeshirt.svg';
import WatchSVG from '../../../public/assets/images/auth_illu/watch.svg';
import WeddingSVG from '../../../public/assets/images/auth_illu/wedding.svg';
import MessagesSVG from '../../../public/assets/images/auth_illu/messages.svg';
import UnderPantsSVG from '../../../public/assets/images/auth_illu/underpants.svg';
import MaintenanceSVG from '../../../public/assets/images/auth_illu/maintenance.svg';

type Props = {
	topBarText?: 'CONNECT' | 'CREATE';
	href?: string;
	children?: React.ReactNode;
};

export type svgImageType = {
	src: string;
	height: number;
	width: number;
};

const AuthPageLayout = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	const [authIlluRandom, setAuthIlluRandom] = useState<{ image: svgImageType; color: string } | null>(null);

	useEffect(() => {
		if (authIlluRandom === null) {
			const availableAuthBgImages: Array<{ image: svgImageType; color: string }> = [
				{
					image: BurgerSVG.src,
					color: '#FFD9A2',
				},
				{
					image: TeeshirtSVG.src,
					color: '#DBF4EA',
				},
				{
					image: WatchSVG.src,
					color: '#DBE8F4',
				},
				{
					image: WeddingSVG.src,
					color: '#D5CEEE',
				},
				{
					image: MessagesSVG.src,
					color: '#F3DCDC',
				},
				{
					image: UnderPantsSVG.src,
					color: '#F3DCDC',
				},
				{
					image: MaintenanceSVG.src,
					color: '#EBD2AD',
				},
			];
			const randomElement = availableAuthBgImages[Math.floor(Math.random() * availableAuthBgImages.length)];
			setAuthIlluRandom(randomElement);
		}
	}, [authIlluRandom]);

	return (
		<main className={Styles.main}>
			<Stack direction="row">
				{/* Left side */}
				<Box
					className={Styles.leftBox}
					sx={{
						background: `url(${authIlluRandom ? authIlluRandom.image : ''}) bottom left no-repeat scroll ${
							authIlluRandom && authIlluRandom.color
						}`,
						msFilter: `progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${
							authIlluRandom ? authIlluRandom.image : ''
						}', sizingMethod='scale')`,
						backgroundSize: 'contain',
					}}
				>
					<Image src={QarybSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
				</Box>
				{/* Right side */}
				<Box className={Styles.rightBox}>
					{(props.topBarText && props.href) && (
						<Stack direction="row" justifyContent="flex-end">
							{props.topBarText === 'CONNECT' ? (
								<p className={Styles.topBarTitle}>
									Vous avez déjà un compte ?{' '}
									<Link href={props.href} ref={ref}>
										Connectez-vous
									</Link>
								</p>
							) : (
								<p className={Styles.topBarTitle}>
									Pas encore de compte ?{' '}
									<Link href={props.href} ref={ref}>
										Inscrivez-vous
									</Link>
								</p>
							)}
						</Stack>
					)}
					{/* Children content */}
					{props.children}
				</Box>
			</Stack>
		</main>
	);
});
AuthPageLayout.displayName = 'AuthPageLayout';

export default AuthPageLayout;
