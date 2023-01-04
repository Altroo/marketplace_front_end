import React, { useState, useEffect } from 'react';
import Styles from './showBio.module.sass';
import { useAppSelector } from '../../../../../../utils/hooks';
import { getShopBio } from '../../../../../../store/selectors';
import { Stack, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import {CustomTheme} from '../../../../../../utils/themes';

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

const ShowBio: React.FC = () => {
	const shopBio = useAppSelector(getShopBio);
	const [bio, setBio] = useState<string | null>(null);
	const shopBioMaxLength = 90;
	const [voirPlus, setVoirPlus] = useState<boolean>(true);

	useEffect(() => {
		if (shopBio) {
			setBio(shopBio);
			if (shopBio.length > shopBioMaxLength) {
				setVoirPlus(false);
			}
		}
	}, [shopBio]);

	const voirPlusHandler = (value: boolean) => {
		setVoirPlus(value);
	};

	const VoirPlusMoinButtons = () => {
		if (bio && bio.length > shopBioMaxLength) {
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
					? bio && bio.length > shopBioMaxLength
						? bio.substring(0, shopBioMaxLength).concat('...')
						: bio
					: bio}
			</span>
			<Box sx={{ width: 'auto' }}>
				<VoirPlusMoinButtons />
			</Box>
		</Stack>
	);
};

export default ShowBio;
