import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Styles from './mobileTopNavigationBar.module.sass';
import ArrowLeftSVG from '../../../../public/assets/svgs/navigationIcons/arrow-left.svg';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';
import { default as ImageFuture } from 'next/future/image';

type Props = {
	backHref?: string;
	returnButton?: boolean;
	closeButtonHref: string;
	children?: React.ReactNode;
};

const MobileTopNavigationBar = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		return props.backHref ? (
			<nav className={Styles.topBar}>
				{props.returnButton ? (
					<Link href={props.backHref} passHref prefetch={false}>
						<a ref={ref} className={Styles.backLink}>
							<ImageFuture
								src={ArrowLeftSVG}
								alt=""
								width="40"
								height="40"
								sizes="100vw"
								style={{ cursor: 'pointer' }}
							/>
						</a>
					</Link>
				) : (
					<div className={Styles.backLink}></div>
				)}
				<Link href={props.closeButtonHref}>
					<a>
						<ImageFuture src={CloseSVG} alt="" width="40" height="40" sizes="100vw" />
					</a>
				</Link>
			</nav>
		) : (
			<></>
		);
	},
);
MobileTopNavigationBar.displayName = 'TopBar';

export default MobileTopNavigationBar;
