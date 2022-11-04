import React from 'react';
import Styles from './iconTextInput.module.sass';
import Image from 'next/image';
import SearchIconSVG from '../../../../public/assets/svgs/globalIcons/search.svg';
import { Stack } from "@mui/material";

type Props = {
	placeholder: string;
	active: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string,
	children?: React.ReactNode;
};

const IconTextInput: React.FC<Props> = (props: Props) => {
	return (
		<Stack alignItems="center" direction="row" className={Styles.searchWrapper}>
			<Image
				src={SearchIconSVG}
				alt=""
				className={Styles.searchIcon}
				width={24}
				height={24}
			/>
			<input
				onChange={props.onChange}
				type="text"
				placeholder={props.placeholder}
				className={Styles.searchInput}
				disabled={!props.active}
				value={props.value}
			/>
		</Stack>
	);
};

export default IconTextInput;
