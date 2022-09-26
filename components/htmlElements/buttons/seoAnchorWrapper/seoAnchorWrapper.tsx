import React, { ForwardedRef, forwardRef } from "react";
import Link from "next/link";
import { UrlObject } from "url";

type Props = {
	href: string | UrlObject,
	anchorCssClass?: string,
	scroll?:boolean,
	shallow?: boolean,
	replace?: boolean,
	children?: React.ReactNode;
};

const SeoAnchorWrapper = forwardRef<HTMLAnchorElement, Props>((props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
	return (
		<Link
			href={props.href}
			passHref
			scroll={props.scroll}
			shallow={props.shallow}
			replace={props.replace}
		>
			<a ref={ref} className={props.anchorCssClass}>
				{props.children}
			</a>
		</Link>
	);
});
SeoAnchorWrapper.displayName = 'SeoAnchorWrapper';

export default SeoAnchorWrapper;
