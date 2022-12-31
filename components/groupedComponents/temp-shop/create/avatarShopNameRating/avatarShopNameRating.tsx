import React from 'react';
import Styles from './avatarShopNameRating.module.sass';
import CircularAvatarInputFile from '../../../../htmlElements/buttons/circularAvatarInputFile/circularAvatarInputFile';
import { ShopFontNameType } from '../../../../../types/shop/shopTypes';

type Props = {
	shopName: string | undefined;
	preview: string | ArrayBuffer | null;
	active: boolean;
	font?: ShopFontNameType;
	setAvatar?: (file: File | null) => void;
	children?: React.ReactNode;
};

const AvatarShopNameRating: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.avatarWrapper}>
			<div>
				<CircularAvatarInputFile setAvatar={props.setAvatar} preview={props.preview} active={props.active}/>
			</div>
			<h2
				className={Styles.shopName}
				style={{
					fontFamily:
						props.font === 'L'
							? 'Poppins-Light'
							: props.font === 'B'
							? 'Poppins-ExtraBold'
							: props.font === 'S'
							? 'Poppins-SemiBold'
							: 'Poppins',
				}}>
				{props.shopName}
			</h2>
		</div>
	);
};

export default AvatarShopNameRating;
