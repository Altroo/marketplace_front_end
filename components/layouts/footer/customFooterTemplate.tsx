import React from 'react';
import Styles from './customFooterTemplate.module.sass';
import { Stack } from '@mui/material';
import Image from 'next/image';

type Props = {
	alignTop?: boolean;
	addSpacing?: boolean;
	illustrationWidth: number;
	illustrationHeight: number;
	illustration: string;
	children?: React.ReactNode;
};

const CustomFooterTemplate: React.FC<Props> = (props: Props) => {
	return (
		<Stack
			direction="row"
			spacing={props.addSpacing ? { xs: '0px', sm: '0px', md: '100px', lg: '100px', xl: '100px' } : '0px'}
			justifyContent="space-between"
			alignItems={props.alignTop ? 'flex-start' : 'center'}
			className={Styles.mobileRootStack}
		>
			{props.children}
			<Image
				src={props.illustration}
				height={props.illustrationHeight}
				alt=""
				sizes="100vw"
				className={Styles.illustration}
			/>
		</Stack>
	);
};

export default CustomFooterTemplate;
