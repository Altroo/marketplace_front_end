import React, { ForwardedRef, forwardRef } from "react";
import Styles from './primaryAnchorButton.module.sass';
import Link from "next/link";
import { UrlObject } from "url";

type Props = {
	buttonText: string
	active: boolean,
	nextPage?: string | UrlObject,
	onClick?: () => void,
	cssClass?: string,
	scroll?:boolean,
	shallow?: boolean,
	replace?: boolean,
	children?: React.ReactNode;
};

const PrimaryAnchorButton = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return props.nextPage ? (
		<Link href={props.nextPage} passHref scroll={props.scroll} shallow={props.shallow} replace={props.replace}>
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
