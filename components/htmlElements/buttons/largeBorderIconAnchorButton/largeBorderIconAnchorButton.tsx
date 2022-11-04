import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './largeBorderIconAnchorButton.module.sass';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {CustomTheme} from '../../../../utils/themes';
import { ThemeProvider, Stack } from '@mui/material';
import Image from 'next/image';

type Props = {
	buttonText: string;
	svgIcon: string;
	active: boolean;
	nextPage: string;
	backgroundColor?: string;
	onClick?: () => void;
	children?: React.ReactNode;
};

const LargeBorderIconAnchorButton = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		const customTheme = CustomTheme(props.backgroundColor);

		return (
			<ThemeProvider theme={customTheme}>
				<Link href={props.nextPage} ref={ref} className={Styles.anchor}>
					<Button disabled={!props.active} className={`${Styles.button} ${Styles.activated}`} onClick={props.onClick}>
						<Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className={Styles.buttonIconTextWrapper}>
							<Image
								src={props.svgIcon}
								alt=""
								width="25"
								height="25"
								sizes="100vw"
							/>
							<span className={`${Styles.textActivated}`}>{props.buttonText}</span>
						</Stack>
					</Button>
				</Link>
			</ThemeProvider>
		);
	},
);

LargeBorderIconAnchorButton.displayName = 'LargeBorderIconAnchorButton';

export default LargeBorderIconAnchorButton;
