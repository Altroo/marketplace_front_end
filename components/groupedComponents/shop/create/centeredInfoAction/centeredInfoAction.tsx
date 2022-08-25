import React from 'react';
import Styles from './centeredInfoAction.module.sass';

type Props = {
	header: string;
	subHeader: string;
	cssHeaderClass?: string;
	cssSubHeaderClass?: string;
	children?: React.ReactNode;
};

const CenteredInfoAction: React.FC<Props> = (props: Props) => {
	return (
		<>
			<span className={`${Styles.header} ${props.cssHeaderClass && props.cssHeaderClass}`}>{props.header}</span>
			<span className={`${Styles.subHeader} ${props.cssHeaderClass && props.cssHeaderClass}`}>{props.subHeader}</span>
		</>
	);
};

export default CenteredInfoAction;
