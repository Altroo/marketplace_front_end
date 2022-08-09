import React, { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowLeft from '../../public/assets/svgs/arrow-left.svg';
import Styles from './topBar.module.sass';
import Close from '../../public/assets/svgs/close.svg';

type Props = {
	backHref: string;
	desktopSize?: boolean;
	children?: React.ReactNode;
};

const TopBar = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return props.backHref ? (
		<div className={Styles.topBar}>
			{props.desktopSize ? (
				<Link href={props.backHref} passHref prefetch={false}>
					<a className={Styles.backLink} ref={ref}>
						Retour
					</a>
				</Link>
			) : (
				<Link href={props.backHref} ref={ref}>
					<a ref={ref}>
						<Image
							className={Styles.displayNone}
							alt=""
							src={ArrowLeft}
							width={40}
							height={40}
							style={{ cursor: 'pointer' }}
						/>
					</a>
				</Link>
			)}
			<Link href="/">
				<a>
					<Image src={Close} width={40} height={40} alt="" />
				</a>
			</Link>
		</div>
	) : (
		<></>
	);
});
TopBar.displayName = 'TopBar';

export default TopBar;
