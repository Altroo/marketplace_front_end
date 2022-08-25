import React from 'react';
import Styles from './defaultCardSection.module.sass';

type Props = {
	children?: React.ReactNode;
}

const DefaultCardSection: React.FC<Props> = (props: Props) => {

	return (
		<section className={Styles.card}>
			{props.children}
		</section>
	);
};

export default DefaultCardSection;
