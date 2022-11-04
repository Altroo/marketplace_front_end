import React from 'react';
import Styles from './topBarSaveClose.module.sass';
import PrimaryButton from '../../../../../htmlElements/buttons/primaryButton/primaryButton';
import CloseSVG from '../../../../../../public/assets/svgs/navigationIcons/close.svg';
import { Stack } from '@mui/material';
import Image from 'next/image';

type Props = {
	buttonText: string;
	handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
	handleClose: () => void;
	isValid: boolean;
	isSubmitting?: boolean;
	cssClasses?: string;
	children?: React.ReactNode;
};

const TopBarSaveClose: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" justifyContent="space-between" alignContent="flex-start" className={props.cssClasses}>
			<PrimaryButton
				buttonText={props.buttonText}
				active={props.isValid && !props.isSubmitting}
				onClick={props.handleSubmit}
				type="submit"
				cssClass={Styles.button}
			/>
			<Image
				src={CloseSVG}
				alt=""
				width="40"
				height="40"
				sizes="100vw"
				onClick={props.handleClose}
				style={{ cursor: 'pointer' }}
			/>
		</Stack>
	);
};

export default TopBarSaveClose;
