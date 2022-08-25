import React from 'react';
import Styles from './topBarSaveClose.module.sass';
import PrimaryButton from '../../../../../htmlElements/buttons/primaryButton/primaryButton';
import Image from 'next/image';
import CloseSVG from '../../../../../../public/assets/svgs/navigationIcons/close.svg';
import { Stack } from "@mui/material";

type Props = {
	handleSubmit: (e?: (React.FormEvent<HTMLFormElement> | undefined)) => void;
	handleClose: () => void;
	isValid: boolean;
	isSubmitting: boolean;
	cssClasses?: string;
	children?: React.ReactNode;
};

const TopBarSaveClose: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" justifyContent="space-between" alignContent="flex-start" className={props.cssClasses}>
			<PrimaryButton
				buttonText="Enregistrer"
				active={props.isValid && !props.isSubmitting}
				onClick={props.handleSubmit}
				type="submit"
				cssClass={Styles.button}
			/>
			<Image
				src={CloseSVG}
				width={40}
				height={40}
				alt=""
				onClick={props.handleClose}
				style={{ cursor: 'pointer' }}
			/>
		</Stack>
	);
};

export default TopBarSaveClose;
