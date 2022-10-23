import React, { ForwardedRef, forwardRef, HTMLAttributeAnchorTarget } from "react";
import Styles from "./textAnchorButton.module.sass";
import Link from "next/link";
import { UrlObject } from "url";
import { Button } from "@mui/material";

type Props = {
	buttonText: string;
	nextPage: string | UrlObject,
	onClick?: () => void;
	cssClass?: string;
	scroll?:boolean,
	shallow?: boolean,
	replace?: boolean,
	disabled?: boolean;
	rel?: string;
	target?: HTMLAttributeAnchorTarget;
	children?: React.ReactNode;
}

const TextAnchorButton = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return (
		<Link href={props.nextPage} rel={props.rel} target={props.target} passHref scroll={props.scroll} shallow={props.shallow} replace={props.replace}>
			<a ref={ref} rel={props.rel} target={props.target}>
				<Button className={`${Styles.textAnchorButton} ${props.cssClass && `${props.cssClass}`}`}
					disabled={props.disabled} onClick={props.onClick} variant="text">
					{props.buttonText}
				</Button>
			</a>
		</Link>
	);
});

TextAnchorButton.displayName = 'TextAnchorButton';

export default TextAnchorButton;
