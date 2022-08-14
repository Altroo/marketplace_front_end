import React from 'react';
import Styles from './cardSection.module.sass';

type Props = {
	children?: React.ReactNode;
}

const CardSection: React.FC<Props> = (props: Props) => {

	return (
		<section className={Styles.card}>
			{props.children}
		</section>
	);
};

export default CardSection;
