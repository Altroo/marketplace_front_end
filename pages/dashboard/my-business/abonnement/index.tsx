import React, { useState } from "react";
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType, AccountGetDashboardType
} from "../../../../types/account/accountTypes";
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../utils/routes';
import { Stack, Box } from "@mui/material";
import UserMainNavigationBar from "../../../../components/layouts/userMainNavigationBar/userMainNavigationBar";
import DesktopMyBusinessSideNav
	from "../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav";
import { default as ImageFuture } from "next/future/image";
import MiniBackSVG from "../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg";
import MobileMyBusinessNav from "../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav";
import CustomFooter from "../../../../components/layouts/footer/customFooter";

type PageContentType = {
	data: AccountGetDashboardType;
}

const PageContent: React.FC<PageContentType> = (props: PageContentType) => {
	const { data } = props;

	return (
		<p>empty abonnement content</p>
	);
};

type IndexProps = {
	pageProps: {
		data: AccountGetDashboardType;
		first_name: string;
		last_name: string;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(true);
	
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
					<DesktopMyBusinessSideNav backText="My business" data={data}/>
					<Box sx={{ width: '100%' }}>
						<PageContent data={data}/>
					</Box>
				</Stack>
				<Stack className={Styles.mobileOnly}>
					{!mobileElementClicked ? (
						<MobileMyBusinessNav setContent={setMobileElementClicked} backText="My business" data={data}/>
					) : (
						<Box sx={{ width: '100%', height: '100%' }}>
							<Stack direction="column">
								<Stack direction="row" justifyContent="space-between">
									<Stack
										className={Styles.topBackNavigationStack}
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
											className={Styles.backIcon}
										/>
										<span className={Styles.backText}>Retour</span>
									</Stack>
								</Stack>
							</Stack>
							<PageContent data={data}/>
						</Box>
					)}
				</Stack>
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
					// has shop proceed to audience page
					return {
						props: {
							data: response_shop.data,
							first_name: appToken.initStateToken.user.first_name,
							last_name: appToken.initStateToken.user.last_name,
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
