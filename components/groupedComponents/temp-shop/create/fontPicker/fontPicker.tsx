import React from 'react';
import Styles from './fontPicker.module.sass';
import { ShopFontNameType } from "../../../../../types/shop/shopTypes";
import {Divider, Stack} from '@mui/material';

type Props = {
	pickedFontName: ShopFontNameType | undefined;
	font: { name: string; code: ShopFontNameType };
	onClick: (font: ShopFontNameType | undefined) => void;
	children?: React.ReactNode;
};

const FontPicker: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="column" justifyContent="space-between">
			<div
				className={Styles.fontContainerUnselected}
				style={{
					fontFamily:
						props.font.code === 'L'
							? 'Poppins-Light'
							: props.font.code === 'B'
							? 'Poppins-ExtraBold'
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
			{props.pickedFontName === props.font.code && (
				<Divider orientation="horizontal" sx={{
					color: '#0D070B',
					width: '70px',
					height: '4px',
					alignSelf: 'center',
					border: 'unset',
					backgroundColor: '#0D070B',
				}} />
			)}
		</Stack>
	);
};

export default FontPicker;
