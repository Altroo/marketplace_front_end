import React from "react";
import Styles from './helperDescriptionHeader.module.sass';
import Image from 'next/image';
import QuestionMarkSVG from '../../../public/assets/svgs/globalIcons/question-mark.svg';

type Props = {
	header: string;
	description?: string;
	HelpText?: string;
	headerClasses?: string;
	descriptionClasses?: string;
	cssClasses?: string;
	children?: React.ReactNode;
};

const HelperDescriptionHeader: React.FC<Props> = (props: Props) => {
	return (
		<div className={`${Styles.headerWrapper} ${props.cssClasses}`}>
			<h3 className={`${Styles.header} ${props.headerClasses}`}>{props.header}</h3>
			<div className={`${Styles.descriptionWrapper} ${props.descriptionClasses}`}>
				<p>{props.description}</p>
			</div>
			{props.HelpText && (
				<div className={Styles.helpTextWrapper}>
					<Image src={QuestionMarkSVG} width={18} height={18} alt="" />
					<p>{props.HelpText}</p>
				</div>
			)}
		</div>
	);
};

export default HelperDescriptionHeader;
