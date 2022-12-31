import React from 'react';
import Styles from './createYourShopLarge.module.sass';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import CreateShopIlluSVG from '../../../../public/assets/images/create-shop-illu.svg';
import { Desktop } from '../../../../utils/helpers';
import PrimaryAnchorButton from '../../../htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { AUTH_REGISTER } from '../../../../utils/routes';

const DesktopLineBreak = () => {
	return <br />;
};

const CreateYourShopLarge: React.FC = () => {

	return (
		<Box className={Styles.rootBox}>
			<Stack
				direction="row"
				spacing="84px"
				alignItems="center"
				justifyContent="center"
				className={Styles.rootStack}
			>
				<Image src={CreateShopIlluSVG} alt="" width="230" height="214" sizes="100vw" />
				<Stack direction="column" spacing="24px" className={Styles.childStack}>
					<h4 className={Styles.sectionHeader}>
						Vous aussi, rejoignez notre
						<Desktop>
							<DesktopLineBreak />
						</Desktop>{' '}
						communauté de vendeurs au Maroc
					</h4>
					<Box className={Styles.actionButtonRootBox}>
						<PrimaryAnchorButton
							buttonText="Créez votre boutique"
							active={true}
							nextPage={AUTH_REGISTER}
							cssClass={Styles.actionButton}
						/>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default CreateYourShopLarge;
