import React from 'react';
import Styles from './fontPicker.module.sass';
import { ShopFontNameType } from "../../../../types/shop/shopTypes";

type Props = {
	pickedFontName: ShopFontNameType | undefined;
	font: { name: string; code: ShopFontNameType };
	onClick: (font: ShopFontNameType | undefined) => void;
	children?: React.ReactNode;
};

const FontPicker: React.FC<Props> = (props: Props) => {
	return (
		<div
			className={`${props.pickedFontName === props.font.code ? Styles.fontContainerSelected : Styles.fontContainerUnselected}`}
			style={{
				fontFamily:
					props.font.code === 'L'
						? 'Poppins-Light'
						: props.font.code === 'B'
						? 'Poppins-Black'
						: props.font.code === 'S'
						? 'Poppins-SemiBold'
						: 'Poppins',
			}}
			onClick={() => props.onClick(props.font.code)}
		>
			<span className={Styles.fontTitle} style={{ color: props.pickedFontName === props.font.code ? 'black' : 'inherit' }}>
				{props.font.name}
			</span>
		</div>
	);
};

export default FontPicker;
