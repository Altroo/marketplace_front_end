{}
// import React from 'react';
// import App, { AppProps } from 'next/app';
// import { wrapper, SagaStore } from '../store/store';
// import { InitContextProvider } from '../contexts/InitContext';
// // import {loadNewAddedShopAction} from "../store/actions/shop/shopActions";
// import { END } from 'redux-saga';
// // import { placesGetCountriesAction } from '../store/actions/places/placesActions';
// // import { initAppAction } from '../store/actions/_init/_initActions';
// // import { loadNewAddedShopAction } from '../store/actions/shop/shopActions';
// import { CacheProvider, EmotionCache } from '@emotion/react';
// import createEmotionCache from '../utils/createEmotionCache';
// import Head from 'next/head';
// import { ThemeProvider } from '@mui/material/styles';
// import { getDefaultTheme } from '../utils/themes';
// import CssBaseline from '@mui/material/CssBaseline';
//
// // import { setCookie, getCookie } from "cookies-next";
//
// interface EntryPointProps extends AppProps {
// 	emotionCache?: EmotionCache;
// }
//
// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();
//
// class EntryPoint extends React.Component<EntryPointProps> {
// 	public static getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
// 		const pageProps = {
// 			...(await App.getInitialProps(context)).pageProps,
// 		};
//
// 		if (context.ctx.req) {
// 			// Example set cookie
// 			// const req = context.ctx.req;
// 			// const res = context.ctx.res;
// 			// setCookie("new_cookie", "new_cookie_value", { req, res, maxAge: 60 * 6 * 24 });
// 			// setCookie("cookie_from_EntryPoint", "cookie_from_EntryPoint_value", {
// 			// 	req, res, httpOnly: true, sameSite: "lax", secure: true,
// 			// });
// 			// context.ctx.res.cookies.set('new_cookie', 'new_cookie_value', {httpOnly: true, sameSite: 'lax', secure: true});
// 			// console.log("from getInitialProps SERVER SIDE");
// 			await store.dispatch(END);
// 			await (store as SagaStore).sagaTask?.toPromise();
// 		}
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
// 					<InitContextProvider>
// 						<Component {...pageProps} />
// 					</InitContextProvider>
// 				</ThemeProvider>
// 			</CacheProvider>
// 		);
// 	}
// }
//
// export default wrapper.withRedux(EntryPoint);
