import React from 'react';
import Styles from './categorieChip.module.sass';

type Props = {
	text: string;
	selected: boolean;
	backgroundColor?: string | null;
	textColor?: string | null;
	border?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

const CategorieBadge: React.FC<Props> = (props: Props) => {
	let cssStyle = {};
	if (props.backgroundColor) {
		cssStyle = {...cssStyle, backgroundColor: props.backgroundColor};
	}
	if (props.textColor) {
		cssStyle = {...cssStyle, color: props.textColor};
	}
	if (props.border) {
		cssStyle = {...cssStyle, border: props.border};
	}
	// cases :
	// selected but disabled.
	// Inactive but enabled
	return props.disabled ? (
		<div className={`${props.selected ? Styles.checked : Styles.unchecked}`}
			style={{...cssStyle}}>
			{props.text}
		</div>
	) : (<div className={`${props.selected ? Styles.checked : Styles.unchecked}`}
			style={{...cssStyle}}>
			{props.text}
		</div>);
};

export default CategorieBadge;
