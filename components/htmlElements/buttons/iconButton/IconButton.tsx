import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './IconButton.module.sass';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	buttonText: string;
	svgIcon: string;
	nextPage?: string;
	onClick?: () => void;
	backgroundColor?: string | null;
	textColor?: string | null;
	border?: string;
	active?: boolean;
	cssClass?: string;
	children?: React.ReactNode;
};

const IconButton = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	// nextPage IconButton that opens a link
	let cssStyle = {};
	if (props.backgroundColor) {
		cssStyle = {...cssStyle, backgroundColor: props.backgroundColor};
	}
	if (props.textColor) {
		cssStyle = {...cssStyle, color: props.textColor};
	}
	if (props.border) {
		cssStyle = {...cssStyle, border: props.border};
	}
	return props.nextPage ? (
		<Link href={props.nextPage} passHref>
			<a ref={ref}>
				<button
					disabled={!props.active}
					className={`${Styles.iconButton} 
					${props.active ? Styles.active : ''}
					${props.cssClass && props.cssClass}
					`}
					style={{...cssStyle}}>
					<Image src={props.svgIcon} alt="" className={Styles.icon} />
					{props.buttonText}
				</button>
			</a>
		</Link>
	) : (
		<button
			className={`${Styles.iconButton} ${props.active ? Styles.active : ''} 
			${props.cssClass && props.cssClass}`}
			disabled={!props.active}
			style={{...cssStyle}}>
			<Image src={props.svgIcon} alt="" className={Styles.icon} />
			{props.buttonText}
		</button>
	);
});
IconButton.displayName = 'IconButton';

export default IconButton;
