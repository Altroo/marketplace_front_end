import React from 'react';
import Styles from './primaryButton.module.sass';

type Props = {
	buttonText: string
	active: boolean,
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
			disabled={!props.active}>
			{props.buttonText}
		</button>
	);
};

export default PrimaryButton;
