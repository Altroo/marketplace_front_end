import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './borderIconAnchorButton.module.sass';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	buttonText: string;
	svgIcon: string;
	active: boolean;
	nextPage?: string;
	onClick?: () => void;
	children?: React.ReactNode;
};

const BorderIconAnchorButton = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		return props.nextPage ? (
			<Link href={props.nextPage} passHref>
				<a ref={ref} className={Styles.anchor}>
					<button disabled={!props.active} className={`${Styles.button} ${Styles.activated}`}>
						<div className={Styles.container}>
							<Image src={props.svgIcon} alt="" width={18.67} height={18.67} />
							<span className={`${Styles.textActivated}`}>{props.buttonText}</span>
						</div>
					</button>
				</a>
			</Link>
		) : (
			<button disabled className={`${Styles.button} ${Styles.desactivatedButton}`}>
				<div className={Styles.container}>
					<Image src={props.svgIcon} alt="" width={18.67} height={18.67} />
					<span>{props.buttonText}</span>
				</div>
			</button>
		);
	},
);
BorderIconAnchorButton.displayName = 'BorderIconAnchorButton';

export default BorderIconAnchorButton;
