import React from "react";
import Styles from './helperDescriptionHeader.module.sass';

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
			{props.description && (
				<div className={`${Styles.descriptionWrapper} ${props.descriptionClasses && props.descriptionClasses}`}>
					<p>{props.description}</p>
				</div>
			)}
			{props.HelpText && (
				<div className={Styles.helpTextWrapper}>
					{/*<Image*/}
					{/*	src={QuestionMarkSVG}*/}
					{/*	alt=""*/}
					{/*	width="18"*/}
					{/*	height="18"*/}
					{/*	sizes="100vw"*/}
					{/*/>*/}
					{props.HelpText}
				</div>
			)}
		</div>
	);
};

export default HelperDescriptionHeader;
