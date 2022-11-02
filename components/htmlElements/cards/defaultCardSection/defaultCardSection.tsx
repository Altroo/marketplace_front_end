import React from 'react';
import Styles from './defaultCardSection.module.sass';

type Props = {
	cssClass?: string;
	children?: React.ReactNode;
}

const DefaultCardSection: React.FC<Props> = (props: Props) => {

	return (
		<section className={`${Styles.card} ${props.cssClass}`}>
			{props.children}
		</section>
	);
};

export default DefaultCardSection;
