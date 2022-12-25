import type { NextPage } from 'next';
import Styles from './index.module.sass';
import { Stack, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { allowAnyInstance, Desktop } from '../utils/helpers';
import { NextSeo } from 'next-seo';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../components/layouts/footer/customFooter';
import { AxiosInstance } from 'axios';
import { getApi } from '../store/services/_init/_initAPI';
import { AUTH_REGISTER, NOT_FOUND_404, REAL_SHOP_ADD_SHOP_NAME, REAL_SHOP_BY_SHOP_LINK_ROUTE } from '../utils/routes';
import { GetHomePageType, SeoPagesGetHomePageResponseType } from '../types/seo-pages/seoPagesTypes';
import FilledHeartBlackSVG from '../public/assets/svgs/homePageIcons/filled-heart-black.svg';
import CoupDeCoeurShape from '../public/assets/svgs/globalIcons/shape.svg';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import TextAnchorButton from '../components/htmlElements/buttons/textAnchorButton/textAnchorButton';
import SeoAnchorWrapper from '../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import CreateShopIlluSVG from '../public/assets/images/create-shop-illu.svg';

type HomePropsType = {
	pageProps: {
		data: GetHomePageType;
	};
};
const Home: NextPage<HomePropsType> = (props: HomePropsType) => {
	const { coup_de_coeur_bg, coup_de_coeur, new_shops } = props.pageProps.data;

	return (
		<>
			<NextSeo
				title="Qaryb"
				// description="A short description goes here."
			/>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main>
					<Stack direction="column" spacing={{xs: '25px', sm: '25px'}} className={Styles.main} style={{ backgroundColor: coup_de_coeur_bg }}>
						<Stack direction="row" alignItems="center" spacing={{ xs: '5px', sm: '5px', md: '10px', lg: '10px', xl: '10px' }} className={Styles.topRowStack}>
							<span>Coup de</span>
							<Image src={FilledHeartBlackSVG} alt="" width="26" height="24" sizes="100vw" />
							<span>de la semaine</span>
						</Stack>
						<Stack direction="column" alignItems="center" spacing="10px" className={Styles.blockMobileScroll}>
							<Stack direction="row" alignItems="center" spacing="32px" justifyContent="center">
								{coup_de_coeur.left_offers.map((offer, index) => {
									return (
										<Box key={index} className={Styles.coeurRootOffersBox}>
											<Image
												src={offer.picture}
												alt=""
												width="160"
												className={Styles.offerImage}
												height="160"
												sizes="100vw"
											/>
										</Box>
									);
								})}
								<Stack direction="row" alignItems="center" spacing="110px">
									<Image
										src={coup_de_coeur.avatar}
										className={Styles.coupDeCoeurShopAvatar}
										alt=""
										width="364"
										height="364"
										sizes="100vw"
										style={{
											WebkitMaskImage: `url(${CoupDeCoeurShape.src})`,
											maskImage: `url(${CoupDeCoeurShape.src})`,
										}}
									/>
								</Stack>
								{coup_de_coeur.right_offers.map((offer, index) => {
									return (
										<Box key={index} className={Styles.coeurRootOffersBox}>
											<Image
												src={offer.picture}
												alt=""
												width="160"
												className={Styles.offerImage}
												height="160"
												sizes="100vw"
											/>
										</Box>
									);
								})}
							</Stack>
							<h1 className={Styles.coeurShopName}>{coup_de_coeur.shop_name}</h1>
							<PrimaryAnchorButton
								cssClass={Styles.visitShopButton}
								buttonText="Visiter la boutique"
								active={true}
								nextPage={REAL_SHOP_BY_SHOP_LINK_ROUTE(coup_de_coeur.shop_link)}
							/>
						</Stack>
					</Stack>
					<Stack
						direction="column"
						alignItems="center"
						mt={{ xs: '32px', sm: '32px', md: '80px', lg: '80px', xl: '80px' }}
						mb={{ xs: '32px', sm: '32px', md: '80px', lg: '80px', xl: '80px' }}
						spacing="10px"
					>
						<Stack direction="row" alignItems="center" spacing="5px" justifyContent="center">
							<span className={Styles.secondSectionDot}>•</span>
							<h3 className={Styles.secondSectionHeader}>Vous aussi</h3>
							<span className={Styles.secondSectionDot}>•</span>
						</Stack>
						<h4 className={Styles.secondSectionSubHeader}>Créez votre boutique Qaryb en quelques clicks !</h4>
						<TextAnchorButton
							buttonText="Créer ma boutique"
							nextPage={REAL_SHOP_ADD_SHOP_NAME}
							cssClass={Styles.createShpTextButton}
						/>
					</Stack>
					{new_shops.length > 0 && (
						<Stack
							direction="column"
							spacing="22px"
							justifyContent="center"
							mr={{ xs: '18px', sm: '18px', md: '80px', lg: '80px', xl: '80px' }}
							mb={{ xs: '18px', sm: '18px', md: '80px', lg: '80px', xl: '80px' }}
							ml={{ xs: '18px', sm: '18px', md: '80px', lg: '80px', xl: '80px' }}
						>
							<Stack direction="column" className={Styles.newShopsStackHeader}>
								<span>APERÇU</span>
								<span>Ils viennent de nous rejoindre !</span>
								<span>Découvrez leur boutique</span>
							</Stack>
							<Stack direction={{xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row'}} spacing="12px" className={Styles.newShopsStackWrapper}>
								{new_shops.map((new_shop, index) => {
									return (
										<SeoAnchorWrapper
											href={REAL_SHOP_BY_SHOP_LINK_ROUTE(new_shop.shop_link)}
											key={index}
											anchorCssClass={Styles.hover}
										>
											<Stack
												className={Styles.newShopsRootStack}
												direction="column"
												justifyContent="center"
												alignItems="center"
												spacing="18px"
											>
												<Box className={Styles.newShopsImageBox} sx={{ borderColor: `${new_shop.bg_color_code}` }}>
													<Image
														src={new_shop.avatar}
														alt=""
														width="158"
														height="158"
														sizes="100vw"
														className={Styles.newShopsImage}
													/>
												</Box>
												<h5 className={Styles.newShopShopName}>{new_shop.shop_name}</h5>
												<span
													className={Styles.newShopCategory}
													style={{ backgroundColor: `${new_shop.bg_color_code}` }}
												>
													{new_shop.shop_category}
												</span>
											</Stack>
										</SeoAnchorWrapper>
									);
								})}
							</Stack>
						</Stack>
					)}
					<Box className={Styles.thirdSectionBox}>
						<Stack
							direction="row"
							spacing="84px"
							alignItems="center"
							justifyContent="center"
							className={Styles.mobileRootMain}
						>
							<Image src={CreateShopIlluSVG} alt="" width="230" height="214" sizes="100vw" />
							<Stack direction="column" spacing="24px" className={Styles.mobileThirdSection}>
								<h4 className={Styles.thirdSectionHeader}>
									Vous aussi, rejoignez notre
									<Desktop>
										<br />
									</Desktop>{' '}
									communauté de vendeurs au Maroc
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

export async function getServerSideProps() {
	const not_found_redirect = {
		redirect: {
			permanent: false,
			destination: NOT_FOUND_404,
		},
	};
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_GET_HOME_PAGE}`;
	try {
		const instance: AxiosInstance = allowAnyInstance();
		const response: SeoPagesGetHomePageResponseType = await getApi(url, instance);
		if (response.status === 200 && response.data) {
			return {
				props: {
					data: response.data,
				},
			};
		} else {
			return {
				...not_found_redirect,
			};
		}
	} catch (e) {
		return {
			...not_found_redirect,
		};
	}
}

export default Home;
