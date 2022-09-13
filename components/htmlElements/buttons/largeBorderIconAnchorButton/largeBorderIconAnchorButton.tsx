import React, { ForwardedRef, forwardRef } from 'react';
import Styles from './largeBorderIconAnchorButton.module.sass';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import {CustomTheme} from '../../../../utils/themes';
import { ThemeProvider, Stack } from '@mui/material';

type Props = {
	buttonText: string;
	svgIcon: string;
	active: boolean;
	nextPage: string;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const LargeBorderIconAnchorButton = forwardRef<HTMLAnchorElement, Props>(
	(props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
		const customTheme = CustomTheme(props.backgroundColor);

		return (
			<ThemeProvider theme={customTheme}>
				<Link href={props.nextPage} passHref>
					<a ref={ref} className={Styles.anchor}>
						<Button disabled={!props.active} className={`${Styles.button} ${Styles.activated}`}>
							<Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className={Styles.buttonIconTextWrapper}>
								<Image src={props.svgIcon} alt="" width={25} height={25} />
								<span className={`${Styles.textActivated}`}>{props.buttonText}</span>
							</Stack>
						</Button>
					</a>
				</Link>
			</ThemeProvider>
		);
	},
);

LargeBorderIconAnchorButton.displayName = 'LargeBorderIconAnchorButton';

export default LargeBorderIconAnchorButton;