// @ts-ignore
// eslint-disable-next-line no-empty
{}
// import '../styles/globals.sass';
// import React from 'react';
// import { AppProps } from 'next/app';
// import { wrapper } from '../store/store';
// import { InitContextProvider } from '../contexts/InitContext';
// import Head from 'next/head';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { CacheProvider, EmotionCache } from '@emotion/react';
// import { getDefaultTheme } from '../utils/themes';
// import createEmotionCache from '../utils/createEmotionCache';
// import App from 'next/app';
// import { SagaStore } from '../store/store';
// import { END } from 'redux-saga';
// import {
// 	initAppAction,
// 	initAppCookieTokensAction,
// 	initNewShopBorderIconAction
// } from "../store/actions/_init/_initActions";
// import { cookiesFetcher } from "../store/services/_init/_initAPI";
// import { AppTokensCookieType, NewShopCookieType } from "../types/_init/_initTypes";
// import { placesGetCitiesAction } from "../store/actions/places/placesActions";
// import { loadNewAddedShopAction } from "../store/actions/shop/shopActions";
// import { getCookie } from "cookies-next";
//
// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();
//
// interface EntryPointProps extends AppProps {
// 	emotionCache?: EmotionCache;
// 	appTokenCookiesLoaded: boolean;
// 	newShopCookiesLoaded: boolean;
// }
//
// // Emotion cache Alone
// // const EntryPoint: React.FC<EntryPointProps> = (props: EntryPointProps) => {
// //   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
// //   return (
// //     <CacheProvider value={emotionCache}>
// //       <Head>
// //         <meta name="viewport" content="initial-scale=1, width=device-width" />
// //       </Head>
// //       <ThemeProvider theme={getDefaultTheme()}>
// //         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
// //         <CssBaseline />
// // 				<InitContextProvider>
// // 					<Component {...pageProps} />
// // 				</InitContextProvider>
// //       </ThemeProvider>
// //     </CacheProvider>
// //   );
// // };
// // export default wrapper.withRedux(EntryPoint);
//
// // Emotion cache With redux saga
//
// class EntryPoint extends React.Component<EntryPointProps, {appTokenCookiesLoaded: boolean, newShopCookiesLoaded: boolean}> {
// 	constructor(props: EntryPointProps) {
//     super(props);
//     this.state = {
//       appTokenCookiesLoaded: false,
//       newShopCookiesLoaded: false,
//     };
//   }
//
// 	public static getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
// 		// Init Server actions here only
// 		// if (!this.state.appTokenCookiesLoaded) {
// 		// 	cookiesFetcher('/cookies').then((value: { data: { cookies: AppTokensCookieType }; status: number }) => {
// 		// 		if (value.status === 200) {
// 		// 			store.dispatch(initAppCookieTokensAction(value.data.cookies));
// 		// 			// setAppTokenCookiesLoaded(true);
// 		// 			this.setState({appTokenCookiesLoaded: true})
// 		// 		}
// 		// 	});
// 		// }
// 		// init new shop border & icon_color from cookies
// 		// if (!this.state.newShopCookiesLoaded) {
// 		// 	cookiesFetcher('/cookies').then((value: {data: {cookies: NewShopCookieType}; status: number }) => {
// 		// 		if (value.status === 200) {
// 		// 			store.dispatch(initNewShopBorderIconAction(value.data.cookies));
// 		// 			// setNewShopCookiesLoaded(true);
// 		// 			this.setState({newShopCookiesLoaded: true})
// 		// 		}
// 		// 	});
// 		// }
// 		store.dispatch(initAppAction());
// 		store.dispatch(placesGetCitiesAction('MA'));
// 		store.dispatch(loadNewAddedShopAction());
// 		// store.dispatch(placesGetCountriesAction());
// 		// store.dispatch(loadNewAddedShopAction());
// 		const pageProps = {
// 			...(await App.getInitialProps(context)).pageProps,
// 		};
// 		if (context.ctx.req) {
// 			// Example set cookie
// 			// const req = context.ctx.req;
// 			// const res = context.ctx.res;
// 			await store.dispatch(END);
// 			await (store as SagaStore).sagaTask?.toPromise();
// 		}
// 		return { pageProps };
// 	});
//
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
