import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Styles from './mobileTopNavigationBar.module.sass';
import ArrowLeftSVG from '../../../../public/assets/svgs/navigationIcons/arrow-left.svg';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';
import Image from 'next/image';
import { TabletAndMobile } from "../../../../utils/helpers";

type Props = {
	backHref?: string;
	returnButton?: boolean;
	closeButtonHref: string;
	children?: React.ReactNode;
};

const MobileTopNavigationBar = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		return props.backHref ? (
			<TabletAndMobile>
				<nav className={Styles.topBar}>
				{props.returnButton ? (
					<Link href={props.backHref} ref={ref} className={Styles.backLink}>
						<Image
							src={ArrowLeftSVG}
							alt=""
							width="40"
							height="40"
							sizes="100vw"
							style={{ cursor: 'pointer' }}
						/>
					</Link>
				) : (
					<div className={Styles.backLink}></div>
				)}
				<Link href={props.closeButtonHref}>
					<Image src={CloseSVG} alt="" width="40" height="40" sizes="100vw" />
				</Link>
			</nav>
			</TabletAndMobile>
		) : (
			<></>
		);
	},
);
MobileTopNavigationBar.displayName = 'TopBar';

export default MobileTopNavigationBar;
