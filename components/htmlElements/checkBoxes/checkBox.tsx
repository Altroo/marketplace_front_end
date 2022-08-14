import React from 'react';
import Styles from './checkBox.module.sass';
import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxActiveSVG from '../../../public/assets/svgs/checkbox-active.svg';
import CheckBoxDisabledSVG from '../../../public/assets/svgs/checkbox-disabled.svg';
import Image from "next/image";
import { checkBoxForWhomBaseType } from "../../../types/ui/uiTypes";

const CheckBox: React.FC<checkBoxForWhomBaseType> = (props: checkBoxForWhomBaseType) => {
	let checkboxIcon = CheckBoxActiveSVG;
	if (!props.active) {
		checkboxIcon = CheckBoxDisabledSVG;
	}
	return (
		<div>
			<Checkbox
				checked={props.checked}
				onChange={(e) => props.onChange && props.onChange(e.target.checked)}
				disabled={!props.active}
				icon={<RadioButtonUncheckedIcon />}
				checkedIcon={<Image src={checkboxIcon} width={20} height={20} alt="" />}
				size="small"
			/>
			<span className={Styles.checkboxText}>{props.text}</span>
		</div>
	);
};

export default CheckBox;
