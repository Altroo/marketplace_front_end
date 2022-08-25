import React, { useState } from 'react';
import Styles from './showBio.module.sass';
import { useAppSelector } from '../../../../../../utils/hooks';
import { getShopBio } from '../../../../../../store/selectors';
import { Stack, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import {CustomTheme} from '../../../../../../utils/themes';

type Props = {
	children?: React.ReactNode;
};

const ShowBio: React.FC<Props> = (props: Props) => {
	const shopBio = useAppSelector(getShopBio);
	let voirPlusState = true;
	const shopBioMaxLength = 90;

	if (shopBio && shopBio.length > shopBioMaxLength) {
		voirPlusState = false;
	}
	const [voirPlus, setVoirPlus] = useState<boolean>(voirPlusState);
	const blueColor = '#0274d7';
	const customTheme = CustomTheme(blueColor);
	const buttonTheme = createTheme({
		...customTheme,
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						padding: '0px',
					},
				},
			},
		},
	});
	const voirPlusHandler = (value: boolean) => {
		setVoirPlus(value);
	};

	const VoirPlusMoinButtons = () => {
		if (shopBio && shopBio.length > shopBioMaxLength) {
			if (voirPlus) {
				return (
					<ThemeProvider theme={buttonTheme}>
						<Button color="primary" className={Styles.button} onClick={() => voirPlusHandler(false)}>
							voir moin
						</Button>
					</ThemeProvider>
				);
			} else {
				return (
					<ThemeProvider theme={buttonTheme}>
						<Button color="primary" className={Styles.button} onClick={() => voirPlusHandler(true)}>
							voir plus
						</Button>
					</ThemeProvider>
				);
			}
		} else {
			return null;
		}
	};

	return (
		<Stack direction="column" spacing={2} sx={{ wordWrap: 'break-word' }}>
			<span className={Styles.spanParagraphe}>
				{!voirPlus
					? shopBio && shopBio.length > shopBioMaxLength
						? shopBio.substring(0, shopBioMaxLength).concat('...')
						: shopBio
					: shopBio}
			</span>
			<Box sx={{ width: 'auto' }}>
				<VoirPlusMoinButtons />
			</Box>
		</Stack>
	);
};

export default ShowBio;
