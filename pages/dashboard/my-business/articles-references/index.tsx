import React, { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import SharedStyles from '../../../../styles/dashboard/dashboard.module.sass';
import Styles from '../../../../styles/dashboard/indexedArticles.module.sass';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, DASHBOARD_SUBSCRIPTION, NOT_FOUND_404 } from '../../../../utils/routes';
import { Stack, Box } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import { default as ImageFuture } from 'next/future/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import JumelleIlluSVG from '../../../../public/assets/images/jumelle-illu.svg';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import PrimaryAnchorButton from '../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';

type EmptyIndexedContentType = {
	slots_available_count: number;
	indexed_articles_count: number;
};

const IndexedArticlesCountBox: React.FC<EmptyIndexedContentType> = (props: EmptyIndexedContentType) => {
	const { slots_available_count, indexed_articles_count } = props;
	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing="10px"
			className={Styles.indexedArticlesBox}
		>
			<span>{indexed_articles_count}</span>
			<span>/{slots_available_count} articles</span>
		</Stack>
	);
};

const EmptyIndexedContent: React.FC<EmptyIndexedContentType> = (props: EmptyIndexedContentType) => {
	const { slots_available_count, indexed_articles_count } = props;
	return (
		<Stack direction="column" spacing="32px" className={SharedStyles.dashboardRightContentMarginLeft}>
			<Stack direction="column">
				<h2 className={SharedStyles.userShopTitle}>Articles référencés</h2>
			</Stack>
			<IndexedArticlesCountBox
				indexed_articles_count={indexed_articles_count}
				slots_available_count={slots_available_count}
			/>
			<Stack direction="column" spacing="18px">
				<Stack direction="column" className={Styles.emptyIndexedHeaderContent}>
					<span>Vos client sont</span>
					<span>sur les moteurs de recherche.</span>
					<span>Et vous?</span>
				</Stack>
				<Box className={SharedStyles.desktopOnly}>
					<Stack direction="row" spacing="120px" className={Styles.emptyIndexedParagraphe}>
						<span>
							L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien
							référencé, abonnez vous pour toucher plus de gens.
						</span>
						<Box sx={{ position: 'relative', width: '100%' }}>
							<ImageFuture
								src={JumelleIlluSVG}
								alt=""
								width="273"
								height="178"
								sizes="100vw"
								className={Styles.desktopJumelleIllu}
							/>
						</Box>
					</Stack>
				</Box>
				<Box className={SharedStyles.mobileOnly}>
					<Stack direction="column" spacing="24px" className={Styles.emptyIndexedParagraphe}>
						<ImageFuture
							src={JumelleIlluSVG}
							alt=""
							width="273"
							height="178"
							sizes="100vw"
							style={{ alignSelf: 'flex-end' }}
						/>
						<span>
							L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien
							référencé, abonnez vous pour toucher plus de gens.
						</span>
					</Stack>
				</Box>
				<Box className={Styles.emptyIndexedPrimaryButtonBox}>
					<PrimaryAnchorButton
						buttonText="S'abonner"
						active={true}
						nextPage={DASHBOARD_SUBSCRIPTION}
						cssClass={Styles.emptyIndexedPrimaryButton}
					/>
				</Box>
			</Stack>
		</Stack>
	);
};

type IndexedArticlesContentType = {
	data: AccountGetDashboardType;
};
const IndexedArticlesContent: React.FC<IndexedArticlesContentType> = (props: IndexedArticlesContentType) => {
	const { slots_available_count, indexed_articles_count } = props.data;

	return (
		<Stack direction="column" spacing="32px" className={SharedStyles.dashboardRightContentMarginLeft}>
			<Stack direction="column">
				<h2 className={SharedStyles.userShopTitle}>Articles référencés</h2>
			</Stack>
			<Stack direction="row" spacing="12px">
				<IndexedArticlesCountBox
					indexed_articles_count={indexed_articles_count}
					slots_available_count={slots_available_count}
				/>
				<Box>
					<p>-- Pas assez de slots box goes here --</p>
				</Box>
			</Stack>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: AccountGetDashboardType;
		first_name: string;
		last_name: string;
		indexedData: null; // Todo - missing endpoint data
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, indexedData } = props.pageProps;
	const { indexed_articles_count, slots_available_count } = data;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(true);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${SharedStyles.main} ${SharedStyles.fixMobile}`}>
				{indexedData === null ? (
					<>
						<Stack direction="row" className={`${SharedStyles.desktopOnly} ${SharedStyles.flexRootStack}`}>
							<DesktopMyBusinessSideNav backText="My business" data={data} />
							<Box sx={{ width: '100%' }}>
								<EmptyIndexedContent
									indexed_articles_count={indexed_articles_count}
									slots_available_count={slots_available_count}
								/>
							</Box>
						</Stack>
						<Stack className={SharedStyles.mobileOnly}>
							{!mobileElementClicked ? (
								<MobileMyBusinessNav setContent={setMobileElementClicked} backText="My business" data={data} />
							) : (
								<Box sx={{ width: '100%', height: '100%' }}>
									<Stack direction="column">
										<Stack direction="row" justifyContent="space-between">
											<Stack
												className={SharedStyles.topBackNavigationStack}
												direction="row"
												spacing={1}
												onClick={() => setMobileElementClicked(false)}
												alignItems="center"
											>
												<ImageFuture
													src={MiniBackSVG}
													alt=""
													width="0"
													height="0"
													sizes="100vw"
													className={SharedStyles.backIcon}
												/>
												<span className={SharedStyles.backText}>Retour</span>
											</Stack>
										</Stack>
									</Stack>
									<EmptyIndexedContent
										indexed_articles_count={indexed_articles_count}
										slots_available_count={slots_available_count}
									/>
								</Box>
							)}
						</Stack>
					</>
				) : (
					<>
						<Stack direction="row" className={`${SharedStyles.desktopOnly} ${SharedStyles.flexRootStack}`}>
							<DesktopMyBusinessSideNav backText="My business" data={data} />
							<Box sx={{ width: '100%' }}>
								<IndexedArticlesContent data={data} />
							</Box>
						</Stack>
						<Stack className={SharedStyles.mobileOnly}>
							{!mobileElementClicked ? (
								<MobileMyBusinessNav setContent={setMobileElementClicked} backText="My business" data={data} />
							) : (
								<Box sx={{ width: '100%', height: '100%' }}>
									<Stack direction="column">
										<Stack direction="row" justifyContent="space-between">
											<Stack
												className={SharedStyles.topBackNavigationStack}
												direction="row"
												spacing={1}
												onClick={() => setMobileElementClicked(false)}
												alignItems="center"
											>
												<ImageFuture
													src={MiniBackSVG}
													alt=""
													width="0"
													height="0"
													sizes="100vw"
													className={SharedStyles.backIcon}
												/>
												<span className={SharedStyles.backText}>Retour</span>
											</Stack>
										</Stack>
									</Stack>
									<IndexedArticlesContent data={data} />
								</Box>
							)}
						</Stack>
					</>
				)}
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// has shop proceed to indexed articles page
					return {
						props: {
							data: response_shop.data,
							first_name: appToken.initStateToken.user.first_name,
							last_name: appToken.initStateToken.user.last_name,
							indexedData: null,
						},
					};
					// doesn't own a shop
				} else {
					return {
						redirect: {
							permanent: false,
							destination: NOT_FOUND_404,
						},
					};
				}
				// fall back error
			} else {
				return {
					redirect: {
						permanent: false,
						destination: NOT_FOUND_404,
					},
				};
			}
		} else {
			// redirect to login page
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
		// redirect to 404
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default Index;
