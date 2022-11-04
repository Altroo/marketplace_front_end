import React from 'react';
import Styles from './squareImageInputFile.module.sass';
import { Button, Stack, ThemeProvider } from '@mui/material';
import BlueAdd from '../../../../public/assets/svgs/globalIcons/blue-add.svg';
import { getDefaultTheme } from '../../../../utils/themes';
import Image from 'next/image';

type Props = {
	onImageUpload: () => void;
	children?: React.ReactNode;
};

const SquareImageInputFile: React.FC<Props> = (props: Props) => {
	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Button className={Styles.squareImageWrapper} color="primary" onClick={props.onImageUpload}>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
					<Image
							src={BlueAdd}
							alt=""
							width="31.5"
							height="31.5"
							sizes="100vw"
						/>
					<span className={Styles.addImagesSpan}>Ajouter des images</span>
				</Stack>
			</Button>
		</ThemeProvider>
	);
};

export default SquareImageInputFile;
