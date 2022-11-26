import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './primaryAnchorButton.module.sass';
import { ThemeProvider, Button } from '@mui/material';
import Link from 'next/link';
import { UrlObject } from 'url';
import { getDefaultTheme } from '../../../../utils/themes';

type Props = {
	buttonText: string;
	active: boolean;
	nextPage: string | UrlObject;
	onClick?: () => void;
	cssClass?: string;
	scroll?: boolean;
	shallow?: boolean;
	replace?: boolean;
	type?: 'submit' | 'reset' | 'button' | undefined;
	children?: React.ReactNode;
};

const PrimaryAnchorButton = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		return (
			<Link href={props.nextPage} scroll={props.scroll} shallow={props.shallow} replace={props.replace} ref={ref}>
				{/*<button*/}
				{/*	className={`${Styles.primaryButtonDisabled} */}
				{/*	${props.active ? `${Styles.primaryButtonActive}` : ''}*/}
				{/*	${props.cssClass && `${props.cssClass}`}`}*/}
				{/*	onClick={props.onClick}*/}
				{/*	disabled={!props.active}>*/}
				<ThemeProvider theme={getDefaultTheme()}>
					<Button
						onClick={props.onClick}
						className={`${Styles.primaryButtonDisabled} 
				${props.active ? `${Styles.primaryButtonActive}` : ''}
				${props.cssClass && `${props.cssClass}`}`}
						disabled={!props.active}
						type={props.type}
						color="primary"
					>
						{props.buttonText}
					</Button>
				</ThemeProvider>
			</Link>
		);
	},
);
PrimaryAnchorButton.displayName = 'PrimaryAnchorButton';

export default PrimaryAnchorButton;
