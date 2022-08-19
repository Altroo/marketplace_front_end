import React from 'react';
import Styles from './primaryButton.module.sass';

type Props = {
	buttonText: string
	active: boolean,
	type?: 'submit' | 'reset' | 'button' | undefined;
	onClick?: () => void,
	cssClass?: string,
	children?: React.ReactNode;
};

const PrimaryButton: React.FC<Props> = (props: Props) => {
	return (
		<button
			className={`${Styles.primaryButtonDisabled} 
			${props.active ? `${Styles.primaryButtonActive}` : ''}
			${props.cssClass && `${props.cssClass}`}`}
			onClick={props.onClick}
			disabled={!props.active}
			type={props.type}
		>
			{props.buttonText}
		</button>
	);
};

export default PrimaryButton;
