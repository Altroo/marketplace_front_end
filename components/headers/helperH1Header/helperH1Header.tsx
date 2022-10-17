import React from 'react';
import Styles from './helperH1Header.module.sass';
import QuestionMarkSVG from "../../../public/assets/svgs/globalIcons/question-mark.svg";
import { default as ImageFuture } from "next/future/image";

type Props = {
	header: string,
	HelpText: string,
	headerClasses?: string;
	children?: React.ReactNode;
};

const HelperH1Header: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.headerWrapper}>
			<h1 className={`${Styles.header} ${props.headerClasses}`}>{props.header}</h1>
			<div className={Styles.helpTextWrapper}>
				<ImageFuture
						src={QuestionMarkSVG}
						alt=""
						width="18"
						height="18"
						sizes="100vw"
					/>
				<span>{props.HelpText}</span>
			</div>
		</div>
	);
};

export default HelperH1Header;
