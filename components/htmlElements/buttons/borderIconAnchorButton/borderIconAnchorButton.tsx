import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './borderIconAnchorButton.module.sass';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { CustomTheme } from '../../../../utils/themes';
import { ThemeProvider } from '@mui/material';
import Image from 'next/image';

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
		const customTheme = CustomTheme(props.backgroundColor);
		return props.nextPage ? (
			<ThemeProvider theme={customTheme}>
				<Link href={props.nextPage} ref={ref} className={Styles.anchor}>
					<Button disabled={!props.active} className={`${Styles.button} ${Styles.activated}`}>
						<div className={Styles.container}>
							<Image src={props.svgIcon} alt="" width="18.67" height="18.67" sizes="100vw" className={Styles.svgIcon} />
							<span className={`${Styles.textActivated}`}>{props.buttonText}</span>
						</div>
					</Button>
				</Link>
			</ThemeProvider>
		) : (
			<button disabled className={`${Styles.button} ${Styles.desactivatedButton}`}>
				<div className={Styles.container}>
					<Image src={props.svgIcon} alt="" width="18.67" height="18.67" sizes="100vw" className={Styles.svgIcon} />
					<span>{props.buttonText}</span>
				</div>
			</button>
		);
	},
);
BorderIconAnchorButton.displayName = 'BorderIconAnchorButton';

export default BorderIconAnchorButton;
