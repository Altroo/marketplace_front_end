import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './borderIconAnchorButton.module.sass';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import theme from '../../../../theme';
import { ThemeProvider } from '@mui/material';

type Props = {
	buttonText: string;
	svgIcon: string;
	active: boolean;
	nextPage?: string;
	onClick?: () => void;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const BorderIconAnchorButton = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		const customTheme = theme(props.backgroundColor);
		return props.nextPage ? (
			<ThemeProvider theme={customTheme}>
				<Link href={props.nextPage} passHref>
					<a ref={ref} className={Styles.anchor}>
						<Button disabled={!props.active} className={`${Styles.button} ${Styles.activated}`}>
							<div className={Styles.container}>
								<Image src={props.svgIcon} alt="" width={18.67} height={18.67} />
								<span className={`${Styles.textActivated}`}>{props.buttonText}</span>
							</div>
						</Button>
					</a>
				</Link>
			</ThemeProvider>
		) : (
			<ThemeProvider theme={customTheme}>
				<Button disabled className={`${Styles.button} ${Styles.desactivatedButton}`}>
					<div className={Styles.container}>
						<Image src={props.svgIcon} alt="" width={18.67} height={18.67} />
						<span>{props.buttonText}</span>
					</div>
				</Button>
			</ThemeProvider>
		);
	},
);
BorderIconAnchorButton.displayName = 'BorderIconAnchorButton';

export default BorderIconAnchorButton;
