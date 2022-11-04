import React from 'react';
import Styles from './borderIconButton.module.sass';
import Button from '@mui/material/Button';
import {CustomTheme} from "../../../../utils/themes";
import { ThemeProvider } from "@mui/material";
import Image from 'next/image';

type Props = {
	buttonText: string;
	svgIcon: string;
	onClick?: () => void;
	cssClass?: string,
	disabled?: boolean,
	backgroundColor?: string,
	children?: React.ReactNode;
};

const BorderIconButton: React.FC<Props> = (props: Props) => {
	const customTheme = CustomTheme(props.backgroundColor);
	return (
		<ThemeProvider theme={customTheme}>
			<Button className={`${Styles.button} ${props.cssClass && `${props.cssClass}`}`}
							disabled={props.disabled} onClick={props.onClick}>
				<div className={Styles.container}>
					<Image
						src={props.svgIcon}
						alt=""
						width="18.67"
						height="18.67"
						sizes="100vw"
					/>
					<span className={Styles.blueText}>{props.buttonText}</span>
				</div>
			</Button>
		</ThemeProvider>
	);
};
export default BorderIconButton;
