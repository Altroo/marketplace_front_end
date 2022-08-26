import React from 'react';
import Image from 'next/image';
import Styles from './squareImageInputFile.module.sass';
import { Button, Stack, ThemeProvider } from '@mui/material';
import BlueAdd from '../../../../public/assets/svgs/globalIcons/blue-add.svg';
import { getDefaultTheme } from '../../../../utils/themes';

type Props = {
	// // React image uploading has any signature in it's source
	// dragProps: {
	// 	// eslint-disable-next-line
	// 	onDrop: (e: any) => void;
	// 	// eslint-disable-next-line
	// 	onDragEnter: (e: any) => void;
	// 	// eslint-disable-next-line
	// 	onDragLeave: (e: any) => void;
	// 	// eslint-disable-next-line
	// 	onDragOver: (e: any) => void;
	// 	// eslint-disable-next-line
	// 	onDragStart: (e: any) => void;
	// };
	// isDragging: boolean;
	onImageUpload: () => void;
	children?: React.ReactNode;
};

const SquareImageInputFile: React.FC<Props> = (props: Props) => {
	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Button className={Styles.squareImageWrapper} color="primary" onClick={props.onImageUpload}>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
					<Image alt="" src={BlueAdd} width={31.5} height={31.5} />
					<span className={Styles.addImagesSpan}>Ajouter des images</span>
				</Stack>
			</Button>
		</ThemeProvider>
	);
};

export default SquareImageInputFile;
