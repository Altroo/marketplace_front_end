import React from 'react';
import { OfferQuantityFieldTheme } from '../../../../../utils/themes';
import { ThemeProvider, Stack, IconButton, TextField } from '@mui/material';
import RadioCheckElement from '../radioCheckElement';
import MinusSVG from '../../../../../public/assets/svgs/globalIcons/minus-circular.svg';
import PlusSVG from '../../../../../public/assets/svgs/globalIcons/plus-circular.svg';
import Image from 'next/image';
import Styles from './quantityRadioCheckContent.module.sass';

const quantityTheme = OfferQuantityFieldTheme();

type Props = {
	switchOpen: boolean;
	quantity: number;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	children?: React.ReactNode;
};

const QuantityRadioCheckContent: React.FC<Props> = (props: Props) => {

	return (
		<RadioCheckElement title="Quantité" defaultValue={props.switchOpen}>
			<Stack direction="row" flexWrap="wrap" spacing="40px" sx={{marginTop: '20px'}}>
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
					className={Styles.iconButton}
				>
					<Image
						src={MinusSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
					/>
				</IconButton>
				<ThemeProvider theme={quantityTheme}>
					<TextField variant="outlined" value={props.quantity} onChange={(e) => {
						if (e.target.value) {
							props.setQuantity(parseInt(e.target.value));
						} else {
							props.setQuantity(0);
						}
					}} color="primary" />
				</ThemeProvider>
				<IconButton onClick={() => props.setQuantity((prevState) => prevState + 1)} className={Styles.iconButton}>
					<Image
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
