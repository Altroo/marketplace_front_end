import "../styles/globals.sass";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import { InitContextProvider } from "../contexts/InitContext";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { getDefaultTheme } from "../utils/themes";
import createEmotionCache from "../utils/createEmotionCache";
import { SessionProvider } from "next-auth/react";
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
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
import * as fbq from "../utils/fpixel";
import { effect } from "@redux-saga/is";
import { router } from "next/client";
import { useRouter } from "next/router";
import Script from "next/script";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface EntryPointProps extends AppProps {
	emotionCache?: EmotionCache;
	session: Session;
}

// Emotion cache Alone
const EntryPoint: React.FC<EntryPointProps> = (props: EntryPointProps) => {
	const router = useRouter();
	TimeAgo.addLocale(fr);
	// TimeAgo.addDefaultLocale(fr);
	const { store } = wrapper.useWrappedStore(props);
	const { Component, emotionCache = clientSideEmotionCache } = props;
	const { session, ...pageProps } = props;

	useEffect(() => {
		// This pageview only triggers the first time (it's important for Pixel to have real information)
		fbq.pageview();

		const handleRouteChange = () => {
			fbq.pageview();
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);


	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<Head>
					<link rel="shortcut icon" href="/ico/favicon.ico" />
					<link rel="apple-touch-icon" sizes="57x57" href="/ico/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/ico/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/ico/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/ico/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/ico/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/ico/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/ico/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/ico/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/ico/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/ico/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/ico/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/ico/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/ico/favicon-16x16.png" />
					<link rel="manifest" href="/ico/manifest.json" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="msapplication-TileImage" content="/ico/ms-icon-144x144.png" />
					<meta name="theme-color" content="#ffffff" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="author" content="Qaryb" lang="fr-FR" />
					<meta name="copyright" content="Copyright - Qaryb © 2021" lang="fr-FR" />
					<meta name="rating" content="general" />
					<meta name="robots" content="index, follow" />
					<meta name="description" content="Qaryb est une marketplace de
					boutiques en ligne au Maroc. Inscrivez vous pour créer votre site ecommerce." />
					<meta name="expires" content="never" />
					<title>Qaryb</title>
					{/* Global Site Code Pixel - Facebook Pixel */}
					<Script
						id="fb-pixel"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
	            !function(f,b,e,v,n,t,s)
	            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	            n.queue=[];t=b.createElement(e);t.async=!0;
	            t.src=v;s=b.getElementsByTagName(e)[0];
	            s.parentNode.insertBefore(t,s)}(window, document,'script',
	            'https://connect.facebook.net/en_US/fbevents.js');
	            fbq('init', ${fbq.FB_PIXEL_ID});
	          `
						}} />
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
