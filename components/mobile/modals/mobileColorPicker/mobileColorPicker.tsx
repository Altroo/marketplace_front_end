import React from 'react';
import Styles from './mobileColorPicker.module.sass';

type Props = {
	color: string;
	onClick: (color: string) => void;
	selectedColor?: string | null;
	children?: React.ReactNode;
};

const MobileColorPicker: React.FC<Props> = (props: Props) => {
	return (
		<div className={`${Styles.colorWrapper} ${props.color === props.selectedColor ? Styles.colorActive : ''}`}>
			<div
				className={`${Styles.color} ${props.color === '#FFFFFF' ? Styles.applyBorder : ''}`}
				style={{ backgroundColor: props.color }}
				onClick={() => {
					props.onClick(props.color);
				}}
			></div>
		</div>
	);
};

export default MobileColorPicker;
