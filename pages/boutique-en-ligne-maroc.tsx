import React from 'react';
// import { GetServerSidePropsContext, NextPage } from 'next';
import { NextPage } from 'next';
import Styles from '../styles/insta.module.sass';
// import { getServerSideCookieTokens, isAuthenticatedInstance } from '../utils/helpers';
// import { AccountGetCheckAccountResponseType } from '../types/account/accountTypes';
// import { getApi } from '../store/services/_init/_initAPI';
// import { AUTH_REGISTER, REAL_SHOP_BY_SHOP_LINK_ROUTE } from '../utils/routes';
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
import { default as ImageFuture } from 'next/future/image';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../components/layouts/footer/customFooter';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { NextSeo } from 'next-seo';

type InstaListItem = {
	img: string;
	img_width: string;
	img_height: string;
	title: string;
	children: React.ReactNode;
};

const InstaListItem: React.FC<InstaListItem> = (props: InstaListItem) => {
	const { img, img_width, img_height, title, children } = props;
	return (
		<Stack direction="column" alignItems="center" justifyContent="center" component="section" className={Styles.mobileRootSection}>
			<Stack direction="column" spacing="26px" alignItems="center" justifyContent="center">
				<ImageFuture src={img} alt="" width={img_width} height={img_height} sizes="100vw" />
				<Stack direction="column" spacing="6px" alignItems="center" justifyContent="center">
					<h2 className={Styles.sectionTitle}>{title}</h2>
					<p className={Styles.sectionParagraphe}>{children}</p>
				</Stack>
			</Stack>
		</Stack>
	);
};

const Insta: NextPage = () => {
	const DesktopLineBreak = () => {
		return <br className={Styles.desktopOnly} />;
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
						<ImageFuture
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
									votre Boutique <DesktopLineBreak />
									en ligne en 2 min !
								</h1>
							</Stack>
							<p className={Styles.mainSectionParagraphe}>
								La 1ère marketplace premium dédiée <DesktopLineBreak /> aux vendeurs Instagram !
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
						<Stack direction="row" justifyContent="center" alignItems="center" spacing="32px" className={Styles.secondSectionStackMobile}>
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
									img_width="157"
									img_height="100"
									title="Une présence sur le web"
								>
									En créant votre boutique en ligne <DesktopLineBreak /> vous obtenez un site web pour votre
									<DesktopLineBreak /> marque
								</InstaListItem>
								<InstaListItem img={ZenIlluSVG} img_width="78" img_height="100" title="Sans effort">
									Concentrez vous <DesktopLineBreak /> sur votre coeur de métier,
									<DesktopLineBreak /> on s’occupe du ecommerce
								</InstaListItem>
								<InstaListItem img={SeoIlluSVG} img_width="170" img_height="100" title="Bien référencé">
									Vous ajoutez vos articles à votre
									<DesktopLineBreak /> boutique, nous les référençons sur
									<DesktopLineBreak /> Google et Qaryb
								</InstaListItem>
							</Stack>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								className={Styles.sectionMobileStackPartTwo}
							>
								<InstaListItem img={MoneyIlluSVG} img_width="165" img_height="76" title="Économique">
									On s’occupe du marketing.
									<DesktopLineBreak /> Vous économisez votre budget de
									<DesktopLineBreak /> com et votre dotation en devises
								</InstaListItem>
								<InstaListItem img={MeterIlluSVG} img_width="286" img_height="95" title="Adapté">
									Payez à mesure
									<DesktopLineBreak /> que vous grandissez, de plus nous ne
									<DesktopLineBreak /> prenons pas de commissions sur vos
									<DesktopLineBreak /> ventes
								</InstaListItem>
								<InstaListItem
									img={UserExperienceIlluSVG}
									img_width="226"
									img_height="100"
									title="La meilleure expérience"
								>
									Vos clients sont importants,
									<DesktopLineBreak /> c’est pourquoi nous leur offrons la
									<DesktopLineBreak /> meilleure expérience de navigation
									<DesktopLineBreak /> sur le marché
								</InstaListItem>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<Box className={Styles.thirdSectionBox}>
					<Stack direction="row" spacing="84px" alignItems="center" justifyContent="center" className={Styles.mobileRootMain}>
						<ImageFuture src={CreateShopIlluSVG} alt="" width="230" height="214" sizes="100vw" />
						<Stack direction="column" spacing="24px" className={Styles.mobileThirdSection}>
							<h4 className={Styles.thirdSectionHeader}>
								Vous aussi, rejoignez notre
								<DesktopLineBreak /> communauté de vendeurs au Maroc
							</h4>
							<Box className={Styles.actionButtonRootBox}>
								<PrimaryAnchorButton
									buttonText="Créez votre boutique"
									active={true}
									nextPage={AUTH_REGISTER}
									cssClass={Styles.thirdSectionActionButton}
								/>
							</Box>
						</Stack>
					</Stack>
				</Box>
			</main>
			<CustomFooter />
		</Stack>
		</>
	);
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
// 	const appToken = getServerSideCookieTokens(context);
// 	const proceedToPage = {
// 		props: {},
// 	};
// 	try {
// 		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
// 			const instance = isAuthenticatedInstance(appToken.initStateToken);
// 			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
// 			if (response.status === 200 && response.data.has_shop) {
// 				// user already own a shop
// 				return {
// 					redirect: {
// 						permanent: false,
// 						destination: REAL_SHOP_BY_SHOP_LINK_ROUTE(response.data.shop_url as string),
// 					},
// 				};
// 			} else {
// 				// user doesn't own a shop - proceed
// 				return proceedToPage;
// 			}
// 		} else {
// 			// user is not authenticated - proceed
// 			return proceedToPage;
// 		}
// 	} catch (e) {
// 		// fall back error - proceed
// 		return proceedToPage;
// 	}
// }

export default Insta;
