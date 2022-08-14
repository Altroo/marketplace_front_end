import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Styles from './mobileTopNavigationBar.module.sass';
import ArrowLeftSVG from '../../../../public/assets/svgs/arrow-left.svg';
import CloseSVG from '../../../../public/assets/svgs/close.svg';

type Props = {
	backHref?: string;
	returnButton?: boolean;
	children?: React.ReactNode;
};

const MobileTopNavigationBar = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return props.backHref ? (
		<nav className={Styles.topBar}>
			{props.returnButton ? (
				<Link href={props.backHref} passHref prefetch={false}>
					<a ref={ref} className={Styles.backLink}>
						<Image alt="" src={ArrowLeftSVG} width={40} height={40} style={{ cursor: 'pointer' }} />
					</a>
				</Link>
			) : (
				<div className={Styles.backLink}></div>
			)}
			<Link href="/pages">
				<a>
					<Image src={CloseSVG} width={40} height={40} alt="" />
				</a>
			</Link>
		</nav>
	) : (
		<></>
	);
});
MobileTopNavigationBar.displayName = 'TopBar';

export default MobileTopNavigationBar;
