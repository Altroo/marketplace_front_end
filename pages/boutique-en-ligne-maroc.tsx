import React from 'react';
import { NextPage } from 'next';
import Styles from './boutique-en-ligne-maroc.module.sass';
import { AUTH_REGISTER } from '../utils/routes';
import ImliPawIlluSVG from '../public/assets/images/imli-paw-illu.svg';
import JumelleReverseIlluSVG from '../public/assets/images/jumelle-reversed-illu.svg';
import CreateShopIlluSVG from '../public/assets/images/create-shop-illu.svg';
import MeterIlluSVG from '../public/assets/images/meter-illu.svg';
import MoneyIlluSVG from '../public/assets/images/money-illu.svg';
import SeoIlluSVG from '../public/assets/images/seo-illu.svg';
import ZenIlluSVG from '../public/assets/images/zen-illu.svg';
import UserExperienceIlluSVG from '../public/assets/images/user-experience-illu.svg';
import { Stack, Box } from '@mui/material';
import Image from 'next/image';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../components/layouts/footer/customFooter';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { NextSeo } from 'next-seo';
import { Desktop } from "../utils/helpers";
import CreateYourShopLarge from "../components/layouts/callToActionCards/createYourShopLarge/createYourShopLarge";

type InstaListItem = {
	img: string;
	img_width: number;
	img_height: number;
	title: string;
	children: React.ReactNode;
};

const InstaListItem: React.FC<InstaListItem> = (props: InstaListItem) => {
	const { img, img_width, img_height, title, children } = props;
	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			component="section"
			className={Styles.mobileRootSection}
		>
			<Stack direction="column" spacing="26px" alignItems="center" justifyContent="center">
				<Image src={img} alt="" width={img_width} height={img_height} sizes="100vw" />
				<Stack direction="column" spacing="6px" alignItems="center" justifyContent="center">
					<h2 className={Styles.sectionTitle}>{title}</h2>
					<p className={Styles.sectionParagraphe}>{children}</p>
				</Stack>
			</Stack>
		</Stack>
	);
};

const BoutiqueEnLigneMaroc: NextPage = () => {
	const DesktopLineBreak = () => {
		return <br />;
	};

	return (
		<>
			<NextSeo
				title="Boutique en ligne Maroc"
				// description="A short description goes here."
			/>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<Stack direction="column" spacing="48px">
						<Stack
							direction="row"
							spacing="60px"
							justifyContent="center"
							className={`${Styles.mobilePadding} ${Styles.mobileRootMain}`}
						>
							<Image
								src={ImliPawIlluSVG}
								alt=""
								width="347"
								height="555"
								sizes="100vw"
								className={Styles.implyPawMobile}
							/>
							<Stack direction="column" spacing="24px" className={Styles.mobileHeaderLeft}>
								<Stack direction="column" spacing="15px">
									<span className={Styles.mainSectionMiniHeader}>Créez</span>
									<h1 className={Styles.mainSectionHeader}>
										votre Boutique <Desktop><DesktopLineBreak /></Desktop>
										en ligne en 2 min !
									</h1>
								</Stack>
								<p className={Styles.mainSectionParagraphe}>
									La 1ère marketplace premium dédiée <Desktop><DesktopLineBreak /></Desktop> aux vendeurs Instagram !
								</p>
								<PrimaryAnchorButton
									cssClass={Styles.mainSectionActionButton}
									buttonText="Essayez gratuitement"
									active={true}
									nextPage={AUTH_REGISTER}
								/>
							</Stack>
						</Stack>
						<Stack direction="column" className={Styles.secondSection} spacing="100px">
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								spacing="32px"
								className={Styles.secondSectionStackMobile}
							>
								<span className={Styles.secondSectionDot}>•</span>
								<h3 className={Styles.secondSectionHeader}>Quelques raisons pour nous rejoindre</h3>
								<span className={Styles.secondSectionDot}>•</span>
							</Stack>
							<Stack direction="column" spacing="100px" className={Styles.secondSectionMobileRootStack}>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									className={Styles.sectionMobileStack}
								>
									<InstaListItem
										img={JumelleReverseIlluSVG}
										img_width={157}
										img_height={100}
										title="Une présence sur le web"
									>
										En créant votre boutique en ligne <Desktop><DesktopLineBreak /></Desktop> vous obtenez un site web pour votre
										<Desktop><DesktopLineBreak /></Desktop> marque
									</InstaListItem>
									<InstaListItem img={ZenIlluSVG} img_width={78} img_height={100} title="Sans effort">
										Concentrez vous <Desktop><DesktopLineBreak /></Desktop> sur votre coeur de métier,
										<Desktop><DesktopLineBreak /></Desktop> on s’occupe du ecommerce
									</InstaListItem>
									<InstaListItem img={SeoIlluSVG} img_width={170} img_height={100} title="Bien référencé">
										Vous ajoutez vos articles à votre
										<Desktop><DesktopLineBreak /></Desktop> boutique, nous les référençons sur
										<Desktop><DesktopLineBreak /></Desktop> Google et Qaryb
									</InstaListItem>
								</Stack>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									className={Styles.sectionMobileStackPartTwo}
								>
									<InstaListItem img={MoneyIlluSVG} img_width={165} img_height={76} title="Économique">
										On s’occupe du marketing.
										<Desktop><DesktopLineBreak /></Desktop> Vous économisez votre budget de
										<Desktop><DesktopLineBreak /></Desktop> com et votre dotation en devises
									</InstaListItem>
									<InstaListItem img={MeterIlluSVG} img_width={286} img_height={95} title="Adapté">
										Payez à mesure
										<Desktop><DesktopLineBreak /></Desktop> que vous grandissez, de plus nous ne
										<Desktop><DesktopLineBreak /></Desktop> prenons pas de commissions sur vos
										<Desktop><DesktopLineBreak /></Desktop> ventes
									</InstaListItem>
									<InstaListItem
										img={UserExperienceIlluSVG}
										img_width={226}
										img_height={100}
										title="La meilleure expérience"
									>
										Vos clients sont importants,
										<Desktop><DesktopLineBreak /></Desktop> c’est pourquoi nous leur offrons la
										<Desktop><DesktopLineBreak /></Desktop> meilleure expérience de navigation
										<Desktop><DesktopLineBreak /></Desktop> sur le marché
									</InstaListItem>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<CreateYourShopLarge/>
					{/*<Box className={Styles.thirdSectionBox}>*/}
					{/*	<Stack*/}
					{/*		direction="row"*/}
					{/*		spacing="84px"*/}
					{/*		alignItems="center"*/}
					{/*		justifyContent="center"*/}
					{/*		className={Styles.mobileRootMain}*/}
					{/*	>*/}
					{/*		<Image src={CreateShopIlluSVG} alt="" width="230" height="214" sizes="100vw" />*/}
					{/*		<Stack direction="column" spacing="24px" className={Styles.mobileThirdSection}>*/}
					{/*			<h4 className={Styles.thirdSectionHeader}>*/}
					{/*				Vous aussi, rejoignez notre*/}
					{/*				<Desktop><DesktopLineBreak /></Desktop> communauté de vendeurs au Maroc*/}
					{/*			</h4>*/}
					{/*			<Box className={Styles.actionButtonRootBox}>*/}
					{/*				<PrimaryAnchorButton*/}
					{/*					buttonText="Créez votre boutique"*/}
					{/*					active={true}*/}
					{/*					nextPage={AUTH_REGISTER}*/}
					{/*					cssClass={Styles.thirdSectionActionButton}*/}
					{/*				/>*/}
					{/*			</Box>*/}
					{/*		</Stack>*/}
					{/*	</Stack>*/}
					{/*</Box>*/}
				</main>
				<CustomFooter />
			</Stack>
		</>
	);
};

export default BoutiqueEnLigneMaroc;
