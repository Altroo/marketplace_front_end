import React, { useState } from 'react';
import Styles from './quantityRadioCheckContent.module.sass';
import { OfferQuantityFieldTheme } from '../../../../../utils/themes';
import { ThemeProvider, Stack, IconButton, TextField } from '@mui/material';
import RadioCheckElement from '../radioCheckElement';
import MinusSVG from '../../../../../public/assets/svgs/globalIcons/minus-circular.svg';
import PlusSVG from '../../../../../public/assets/svgs/globalIcons/plus-circular.svg';
import Image from 'next/image';

type Props = {
	children?: React.ReactNode;
};

const QuantityRadioCheckContent: React.FC<Props> = (props: Props) => {
	const [currentQuantity, setCurrentQuantity] = useState<number>(0);
	const quantityTheme = OfferQuantityFieldTheme();

	return (
		<RadioCheckElement title="Quantité">
			<Stack direction="row" flexWrap="wrap" gap={5}>
				<IconButton
					onClick={() =>
						setCurrentQuantity((prevState) => {
							if (prevState === 0) {
								return 0;
							} else {
								return prevState - 1;
							}
						})
					}
				>
					<Image src={MinusSVG} width={40} height={40} alt="" />
				</IconButton>
				<ThemeProvider theme={quantityTheme}>
					<TextField variant="outlined" value={currentQuantity} color="primary" />
				</ThemeProvider>
				<IconButton onClick={() => setCurrentQuantity((prevState) => prevState + 1)}>
					<Image src={PlusSVG} width={40} height={40} alt="" />
				</IconButton>
			</Stack>
		</RadioCheckElement>
	);
};

export default QuantityRadioCheckContent;
