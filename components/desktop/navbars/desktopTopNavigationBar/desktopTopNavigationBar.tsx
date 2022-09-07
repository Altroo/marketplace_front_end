import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Styles from './desktopTopNavigationBar.module.sass';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';

type Props = {
	backHref?: string;
	returnButton?: boolean;
	closeButtonHref: string;
	children?: React.ReactNode;
};

const DesktopTopNavigationBar = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return props.backHref ? (
		<nav className={Styles.topBar}>
			{props.returnButton ? (
				<Link href={props.backHref} passHref prefetch={false}>
					<a className={Styles.backLink} ref={ref}>
						Retour
					</a>
				</Link>
			) : (
				<div className={Styles.backLink}></div>
			)}
			<Link href={props.closeButtonHref}>
				<a>
					<Image src={CloseSVG} width={40} height={40} alt="" />
				</a>
			</Link>
		</nav>
	) : (
		<></>
	);
});
DesktopTopNavigationBar.displayName = 'TopBar';

export default DesktopTopNavigationBar;
