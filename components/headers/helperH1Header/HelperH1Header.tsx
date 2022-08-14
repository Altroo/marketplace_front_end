import React from 'react';
import Styles from './helperH1Header.module.sass';
import Image from 'next/image';
import QuestionMarkSVG from "../../../public/assets/svgs/question-mark.svg";

type Props = {
	header: string,
	HelpText: string,
	children?: React.ReactNode;
};

const HelperH1Header: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.headerWrapper}>
			<h1 className={Styles.header}>{props.header}</h1>
			<div className={Styles.helpTextWrapper}>
				<Image src={QuestionMarkSVG} width={18} height={18} alt="" />
				<p>{props.HelpText}</p>
			</div>
		</div>
	);
};

export default HelperH1Header;
