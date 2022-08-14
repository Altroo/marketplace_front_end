import React from 'react';
import Styles from './borderIconButton.module.sass';
import Image from 'next/image';

type Props = {
	buttonText: string;
	svgIcon: string;
	onClick?: () => void;
	cssClass?: string,
	children?: React.ReactNode;
};

const BorderIconButton: React.FC<Props> = (props: Props) => {
	return (
		<button className={`${Styles.button} ${props.cssClass && `${props.cssClass}`}`}>
			<div className={Styles.container}>
				<Image src={props.svgIcon} alt="" width={18.67} height={18.67} />
				<span className={Styles.blueText}>{props.buttonText}</span>
			</div>
		</button>
	);
};
export default BorderIconButton;
