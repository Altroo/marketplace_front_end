import React from 'react';
import Styles from './quantityRadioCheckContent.module.sass';
import { OfferQuantityFieldTheme } from '../../../../../utils/themes';
import { ThemeProvider, Stack, IconButton, TextField } from '@mui/material';
import RadioCheckElement from '../radioCheckElement';
import MinusSVG from '../../../../../public/assets/svgs/globalIcons/minus-circular.svg';
import PlusSVG from '../../../../../public/assets/svgs/globalIcons/plus-circular.svg';
import Image from 'next/image';
import RightArrowSVG from "../../../../../public/assets/svgs/navigationIcons/right-arrow-long.svg";
import { default as ImageFuture } from "next/future/image";

type Props = {
	switchOpen: boolean;
	quantity: number;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	children?: React.ReactNode;
};

const QuantityRadioCheckContent: React.FC<Props> = (props: Props) => {
	const quantityTheme = OfferQuantityFieldTheme();

	return (
		<RadioCheckElement title="Quantité" defaultValue={props.switchOpen}>
			<Stack direction="row" flexWrap="wrap" gap={5}>
				<IconButton
					onClick={() =>
						props.setQuantity((prevState) => {
							if (prevState === 0) {
								return 0;
							} else {
								return prevState - 1;
							}
						})
					}
				>
					<ImageFuture
						src={MinusSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
					/>
				</IconButton>
				<ThemeProvider theme={quantityTheme}>
					<TextField variant="outlined" value={props.quantity} color="primary" />
				</ThemeProvider>
				<IconButton onClick={() => props.setQuantity((prevState) => prevState + 1)}>
					<ImageFuture
						src={PlusSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
					/>
				</IconButton>
			</Stack>
		</RadioCheckElement>
	);
};

export default QuantityRadioCheckContent;
