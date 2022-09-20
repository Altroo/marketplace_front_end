import React, { ForwardedRef, forwardRef } from "react";
import Styles from './primaryAnchorButton.module.sass';
import Link from "next/link";

type Props = {
	buttonText: string
	active: boolean,
	nextPage?: string,
	onClick?: () => void,
	cssClass?: string,
	children?: React.ReactNode;
};

const PrimaryAnchorButton = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return props.nextPage ? (
		<Link href={props.nextPage} passHref>
			<a ref={ref}>
				<button
					className={`${Styles.primaryButtonDisabled} 
					${props.active ? `${Styles.primaryButtonActive}` : ''}
					${props.cssClass && `${props.cssClass}`}`}
					onClick={props.onClick}
					disabled={!props.active}>
					{props.buttonText}
				</button>
			</a>
		</Link>
	): <></>;
});
PrimaryAnchorButton.displayName = 'PrimaryAnchorButton';

export default PrimaryAnchorButton;
