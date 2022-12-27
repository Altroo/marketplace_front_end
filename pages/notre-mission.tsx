import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/notre-mission.module.sass';
import AvatarOneIllu from '../public/assets/images/footer_illu/notre-mission/avatar-1-illu.svg';
import AvatarTwoIllu from '../public/assets/images/footer_illu/notre-mission/avatar-2-illu.svg';
import AvatarThreeIllu from '../public/assets/images/footer_illu/notre-mission/avatar-3-illu.svg';
import AvatarFourIllu from '../public/assets/images/footer_illu/notre-mission/avatar-4-illu.svg';
import AvatarFiveIllu from '../public/assets/images/footer_illu/notre-mission/avatar-5-illu.svg';
import AvatarSixIllu from '../public/assets/images/footer_illu/notre-mission/avatar-6-illu.svg';
import ZenIllu from '../public/assets/images/footer_illu/notre-mission/zen-illu.svg';
import GoogleSeoIllu from '../public/assets/images/footer_illu/notre-mission/google-seo-illu.svg';
import MoneyIllu from '../public/assets/images/footer_illu/notre-mission/money-illu.svg';
import UXIllu from '../public/assets/images/footer_illu/notre-mission/qaryb-ux-illu.svg';
import MarketingIllu from '../public/assets/images/footer_illu/notre-mission/marketing-illu.svg';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Box, Stack } from '@mui/material';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import CustomFooter from '../components/layouts/footer/customFooter';
import CreateYourShopLarge from '../components/layouts/callToActionCards/createYourShopLarge/createYourShopLarge';
import Image from 'next/image';
import { REAL_SHOP_ADD_SHOP_NAME } from '../utils/routes';

type sectionContentType = {
	illu: string;
	illuWidth: number;
	illuHeight: number;
	header: string;
	paragraphe: string;
};
const SectionContent: React.FC<sectionContentType> = (props: sectionContentType) => {
	return (
		<Stack direction="column" spacing="24px" component="section">
			<Image src={props.illu} alt="" width={props.illuWidth} height={props.illuHeight} sizes="100vw" />
			<h2 className={Styles.subHeader}>{props.header}</h2>
			<p className={Styles.paragraphe}>{props.paragraphe}</p>
		</Stack>
	);
};

const NotreMission: NextPage = () => {
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="column" spacing="20px">
					<Stack
						direction="row"
						spacing={{ xs: '23px', sm: '23px', md: '46px', lg: '46px', xl: '46px' }}
						alignItems="center"
						overflow="hidden"
					>
						<Image src={AvatarOneIllu} alt="" width="204" height="204" sizes="100vw" className={Styles.avatarImage} />
						<Image src={AvatarTwoIllu} alt="" width="223" height="223" sizes="100vw" className={Styles.avatarImage} />
						<Image src={AvatarThreeIllu} alt="" width="204" height="204" sizes="100vw" className={Styles.avatarImage} />
						<Image src={AvatarFourIllu} alt="" width="169" height="233" sizes="100vw" className={Styles.avatarImage} />
						<Image src={AvatarFiveIllu} alt="" width="204" height="204" sizes="100vw" className={Styles.avatarImage} />
						<Image src={AvatarSixIllu} alt="" width="263" height="263" sizes="100vw" className={Styles.avatarImage} />
					</Stack>
					<Stack direction="column" spacing="32px" className={Styles.bodyStack}>
						<h1 className={Styles.header}>
							<span>NOTRE MISSION</span>
							<br />
							Démocratiser <br />
							le ecommerce au Maroc
						</h1>
						<PrimaryAnchorButton
							anchorcssClass={Styles.anchorButton}
							cssClass={Styles.primaryButton}
							buttonText="Créez votre boutique"
							active={true}
							nextPage={REAL_SHOP_ADD_SHOP_NAME}
						/>
					</Stack>
					<Box className={Styles.bodyBox}>
						<Stack direction="column" spacing={{ xs: '84px', sm: '84px', md: '100px', lg: '100px', xl: '100px' }}>
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								spacing={{ xs: '5px', sm: '5px', md: '10px', lg: '10px', xl: '10px' }}
								className={Styles.bodyBoxRootStack}
							>
								<span className={Styles.sectionDot}>•</span>
								<h3 className={Styles.sectionHeader}>Voici comment nous pouvons vous aider</h3>
								<span className={Styles.sectionDot}>•</span>
							</Stack>
							<Stack spacing="92px" direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}>
								<Stack
									direction="column"
									spacing={{ xs: '84px', sm: '84px', md: '130px', lg: '130px', xl: '130px' }}
									minWidth={{ xs: '100%', sm: '100%', md: '540px', lg: '540px', xl: '540px' }}
								>
									<SectionContent
										header="Concentrez vous sur votre coeur de métier, on s'occupe du ecommerce"
										paragraphe="Avec nous, le ecommerce est un jeu d’enfants. En quelques clics, vous pouvez créer votre boutique en ligne pour
											présenter & vendre vos produits/services. En plus, vous pouvez customiser votre boutique pour l’adapter à votre
											branding."
										illu={ZenIllu}
										illuWidth={103}
										illuHeight={132}
									/>
									<SectionContent
										header="On s’occupe du marketing. Vous économisez votre budget de com et votre dotation en devises"
										paragraphe="Chaque mois, nous lançons des campagnes de com dans la presse et sur les réseaux sociaux pour promouvoir les entreprises locales comme la vôtre. En bonus, nous développons des partenariats avec des influenceurs."
										illu={MarketingIllu}
										illuWidth={243}
										illuHeight={190}
									/>
									<SectionContent
										header="Payez à mesure que vous grandissez"
										paragraphe="Nos abonnements annuels sont moins chers qu’un mois de location d’une boutique physique. Et nos tarifs s’adaptent au nombre d’articles que vous désirez référencer sur Google et Qaryb. En plus, le paiement à la livraison vous exempte d’une commission de notre part."
										illu={MoneyIllu}
										illuWidth={191}
										illuHeight={88}
									/>
								</Stack>
								<Stack
									direction="column"
									spacing={{ xs: '84px', sm: '84px', md: '130px', lg: '130px', xl: '130px' }}
									minWidth={{ xs: '100%', sm: '100%', md: '540px', lg: '540px', xl: '540px' }}
								>
									<SectionContent
										header="Vous ajoutez vos articles à votre boutique, nous les référençons sur Google et Qaryb"
										paragraphe="On va pas se mentir, le référencement c’est notre point fort. Nos algorythmes vous positionnent sur les mots clés les plus recherchés sur Google pour vous aider à toucher des millions d’acheteurs à travers tout le Maroc. Pour vous le prouver, savez vous combien de fois, par mois, les Marocaines recherchent le mot clé « robe »  Très exactement, 3’335 fois par mois. Soit, 40’020 fois par an. Enfin, chaque mois nous mettons on avant sur notre plateforme nos boutiques et produits coup de coeur. Aussi nous valorisons vos articles en les intégrant dans nos collections Lifestyle."
										illu={GoogleSeoIllu}
										illuWidth={305}
										illuHeight={179}
									/>
									<SectionContent
										header="Vos clients sont importants, c’est pourquoi nous leur offrons la meilleure expérience de navigation sur le marché"
										paragraphe="Sur notre plateforme, vous aurez accès à une multitude de fonctionnalités qui vous permettront d’offrir une expérience d’achat unique à vos clients: les créateurs de produits peuvent afficher notre label Creator, les revendeurs peuvent spécifier le pays d’origine de leur produit, les commerces physiques peuvent proposer l’option « Click & Collect » pour leurs clients pressés... 
										Vous aurez aussi accès à un système simple et efficace pour gérer vos commandes et avertir  vos clients du traitement de leurs achats.
										Et c’est pas fini, on a également créé pour vous une messagerie instantanée, un système d’évaluation de vos achats, une page bio de votre marque avec vos horaires d’ouverture, et bien d’autres choses encore!"
										illu={UXIllu}
										illuWidth={367}
										illuHeight={202}
									/>
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</Stack>
				<CreateYourShopLarge />
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default NotreMission;
