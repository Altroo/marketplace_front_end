import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Styles from './desktopTopNavigationBar.module.sass';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';
import Image from 'next/image';

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
				<Link href={props.backHref} prefetch={false} className={Styles.backLink} ref={ref}>
					Retour
				</Link>
			) : (
				<div className={Styles.backLink}></div>
			)}
			<Link href={props.closeButtonHref}>
				<Image
					src={CloseSVG}
					alt=""
					width="40"
					height="40"
					sizes="100vw"
					/>
			</Link>
		</nav>
	) : (
		<></>
	);
});
DesktopTopNavigationBar.displayName = 'TopBar';

export default DesktopTopNavigationBar;
