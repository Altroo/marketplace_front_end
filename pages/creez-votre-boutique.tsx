import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/creez-votre-boutique.module.sass';
import FooterClockIllu from '../public/assets/images/footer_illu/footer-clockIllu.svg';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Stack } from '@mui/material';
import CustomFooter from '../components/layouts/footer/customFooter';
import CustomFooterTemplate from '../components/layouts/footer/customFooterTemplate';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { REAL_SHOP_ADD_SHOP_NAME } from '../utils/routes';

const CreezVotreBoutique: NextPage = () => {
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main} style={{ backgroundColor: '#DBF4EA' }}>
				<CustomFooterTemplate illustration={FooterClockIllu} illustrationHeight={573} illustrationWidth={443}>
					<Stack direction="column" spacing="20px" alignSelf="flex-start">
						<h1 className={Styles.header}>
							<span>Créez en</span>
							<br />2 min votre <br />
							boutique en
							<br /> ligne !
						</h1>
						<h2 className={Styles.subHeader}>
							Vous désirez vous lancer dans le <br />
							e-commerce au Maroc? <br />
							N’attendez plus!
						</h2>
						<p className={Styles.paragraphe}>
							Qaryb vous permet de vendre des produits et des services en les référençant sur les moteurs de recherche
							ainsi que sur notre marketplace premium.
						</p>
						<PrimaryAnchorButton
							anchorcssClass={Styles.anchorButton}
							cssClass={Styles.primaryButton}
							buttonText="Essayer gratuitement"
							active={true}
							nextPage={REAL_SHOP_ADD_SHOP_NAME}
						/>
					</Stack>
				</CustomFooterTemplate>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default CreezVotreBoutique;