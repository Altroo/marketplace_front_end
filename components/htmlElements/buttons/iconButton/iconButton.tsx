import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './iconButton.module.sass';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material";

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
	let customTheme = theme();
	if (props.backgroundColor) {
		customTheme = theme(props.backgroundColor);
	}

	return props.nextPage ? (
		<ThemeProvider theme={customTheme}>
		<Link href={props.nextPage} passHref>
			<a ref={ref}>
				<Button
					color="primary"
					disabled={!props.active}
					className={`${Styles.iconButton} 
					${props.active ? Styles.active : ''}
					${props.cssClass && props.cssClass}
					`}
					style={{...cssStyle}}>
					<Image src={props.svgIcon} alt="" className={Styles.icon} />
					{props.buttonText}
				</Button>
			</a>
		</Link>
		</ThemeProvider>
	) : (
		<ThemeProvider theme={customTheme}>
		<Button
			color="primary"
			className={`${Styles.iconButton} ${props.active ? Styles.active : ''} 
			${props.cssClass && props.cssClass}`}
			disabled={!props.active}
			style={{...cssStyle}}>
			<Image src={props.svgIcon} alt="" className={Styles.icon} />
			{props.buttonText}
		</Button>
		</ThemeProvider>
	);
});
IconButton.displayName = 'IconButton';

export default IconButton;
