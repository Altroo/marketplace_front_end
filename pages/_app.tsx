import '../styles/globals.sass';
import React from 'react';
import type { AppProps } from "next/app"
import { wrapper } from '../store/store';
import { Provider } from "react-redux";
import { InitContextProvider } from '../contexts/InitContext';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getDefaultTheme } from '../utils/themes';
import createEmotionCache from '../utils/createEmotionCache';
import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";
import CustomContainer from "../components/layouts/customContainer/customContainer";
// import { Session } from "next-auth/core/types";
// import App from 'next/app';
// import { SagaStore } from '../store/store';
// import { END } from 'redux-saga';
// import {
// 	initAppAction,
// 	initAppCookieTokensAction,
// 	initNewShopBorderIconAction
// } from "../store/actions/_init/_initActions";
// import { AppTokensCookieType, NewShopCookieType } from '../types/_init/_initTypes';
// import { cookiesFetcher } from '../store/services/_init/_initAPI';
// import { getCookie } from "cookies-next";
// import { placesGetCitiesAction } from "../store/actions/places/placesActions";
// import { loadNewAddedShopAction, shopGetRootAction } from "../store/actions/shop/shopActions";
// import { accountGetCheckAccountAction } from "../store/actions/account/accountActions";
// import { offerGetMyOffersFirstPageAction } from "../store/actions/offer/offerActions";
// import { END } from "redux-saga";
// import {
// 	initAppAction,
// 	initAppCookieTokensAction,
// 	initNewShopBorderIconAction
// } from "../store/actions/_init/_initActions";
// import { cookiesFetcher } from "../store/services/_init/_initAPI";
// import { AppTokensCookieType, NewShopCookieType } from "../types/_init/_initTypes";
// import { placesGetCitiesAction } from "../store/actions/places/placesActions";
// import { loadNewAddedShopAction } from "../store/actions/shop/shopActions";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface EntryPointProps extends AppProps {
	emotionCache?: EmotionCache;
	session: Session;
}

// Emotion cache Alone
const EntryPoint: React.FC<EntryPointProps> = (props: EntryPointProps) => {
	const { store } = wrapper.useWrappedStore(props);
	const { Component, emotionCache = clientSideEmotionCache } = props;
	const { session, ...pageProps } = props;
	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={getDefaultTheme()}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<SessionProvider
						// Provider options are not required but can be useful in situations where
						// you have a short session maxAge time. Shown here with default values.
						session={session}>
						<InitContextProvider>
							<CustomContainer>
								<Component {...pageProps} />
							</CustomContainer>
						</InitContextProvider>
					</SessionProvider>
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	);
};
export default EntryPoint;

// Emotion cache With redux saga

// class EntryPoint extends React.Component<EntryPointProps> {
// 	public static getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
// 		// Replaces the INIT CONTEXT
// 		const tokenCookies = {
// 			"@tokenType": getCookie('@tokenType', {req: context.ctx.req, res: context.ctx.res}),
// 			"@initStateToken": getCookie('@initStateToken', {req: context.ctx.req, res: context.ctx.res}),
// 			"@initStateUniqueID": getCookie('@initStateUniqueID', {req: context.ctx.req, res: context.ctx.res}),
// 		}
// 		store.dispatch(initAppCookieTokensAction(tokenCookies as AppTokensCookieType));
// 		const shopCookies = {
// 			"@shop_name": getCookie('@shop_name', {req: context.ctx.req, res: context.ctx.res}),
// 			"@avatar": getCookie('@avatar', {req: context.ctx.req, res: context.ctx.res}),
// 			"@color_code": getCookie('@color_code', {req: context.ctx.req, res: context.ctx.res}),
// 			"@bg_color_code":getCookie('@bg_color_code', {req: context.ctx.req, res: context.ctx.res}),
// 			"@font_name": getCookie('@font_name', {req: context.ctx.req, res: context.ctx.res}),
// 			"@border": getCookie('@border', {req: context.ctx.req, res: context.ctx.res}),
// 			"@icon_color": getCookie('@icon_color', {req: context.ctx.req, res: context.ctx.res}),
// 		}
// 		store.dispatch(initNewShopBorderIconAction(shopCookies as NewShopCookieType));
// 		store.dispatch(initAppAction());
// 		store.dispatch(placesGetCitiesAction('MA'));
// 		store.dispatch(loadNewAddedShopAction());
// 		if (tokenCookies["@tokenType"] === 'TOKEN' && tokenCookies["@initStateToken"] !== null){
// 			store.dispatch(accountGetCheckAccountAction());
// 			if (store.getState().account.check_account.has_shop){
// 				store.dispatch(shopGetRootAction());
// 				// store.dispatch(offerGetMyOffersFirstPageAction());
// 			}
// 		}else if (tokenCookies["@tokenType"] === 'UNIQUE_ID' && tokenCookies["@initStateUniqueID"] !== null) {
// 			store.dispatch(shopGetRootAction());
// 			// store.dispatch(offerGetMyOffersFirstPageAction());
// 		}
//
// 		const pageProps = {
// 			...(await App.getInitialProps(context)).pageProps,
// 		};
// 		// if (context.ctx.req) {
// 		// 	// Example set cookie
// 		// 	// const req = context.ctx.req;
// 		// 	// const res = context.ctx.res;
// 		// 	await store.dispatch(END);
// 		// 	await (store as SagaStore).sagaTask?.toPromise();
// 		// }
// 		return { pageProps };
// 	});
//
// 	render() {
// 		const { Component, emotionCache = clientSideEmotionCache, pageProps } = this.props;
// 		return (
// 			<CacheProvider value={emotionCache}>
// 				<Head>
// 					<meta name="viewport" content="initial-scale=1, width=device-width" />
// 				</Head>
// 				<ThemeProvider theme={getDefaultTheme()}>
// 					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
// 					<CssBaseline />
// 					{/*<InitContextProvider>*/}
// 						<Component {...pageProps} />
// 					{/*</InitContextProvider>*/}
// 				</ThemeProvider>
// 			</CacheProvider>
// 		);
// 	}
// }
//
// export default wrapper.withRedux(EntryPoint);
