import React from 'react';
import Styles from './iconTextInput.module.sass';
import { default as ImageFuture } from 'next/future/image';
import SearchIconSVG from '../../../../public/assets/svgs/search.svg';

type Props = {
	placeholder: string;
	active: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
};

const IconTextInput: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.searchWrapper}>
			<ImageFuture src={SearchIconSVG} alt="" className={Styles.searchIcon} />
			<input
				onChange={props.onChange}
				type="text"
				placeholder={props.placeholder}
				className={Styles.searchInput}
				disabled={!props.active}
			/>
		</div>
	);
};

export default IconTextInput;
