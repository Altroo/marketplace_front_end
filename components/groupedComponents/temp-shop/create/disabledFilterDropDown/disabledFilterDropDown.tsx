import React from 'react';
import Styles from './disabledFilterDropDown.module.sass';
import ArrowDownDisabledSVG from '../../../../../public/assets/svgs/navigationIcons/arrow-down-disabled.svg';
import Image from 'next/image';

type Props = {
	text: string;
	children?: React.ReactNode;
};

const DisabledFilterDropDown: React.FC<Props> = (props: Props) => {
	return (
		<div>
			<div className={Styles.filterDropDownWrapper}>
				<span className={Styles.filterDropDownItem}>{props.text}</span>
				<Image src={ArrowDownDisabledSVG} width={30.37} height={30.37} alt="" />
			</div>
		</div>
	);
};

export default DisabledFilterDropDown;
