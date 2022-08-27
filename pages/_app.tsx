// import '../styles/globals.sass';
// import type { AppProps } from 'next/app';
// import { wrapper } from '../store/store';
// import { InitContextProvider } from '../contexts/InitContext';
//
// function EntryPoint({ Component, pageProps }: AppProps) {
// 	return (
// 		<InitContextProvider>
// 			<Component {...pageProps} />
// 		</InitContextProvider>
// 	);
// }
//
// export default wrapper.withRedux(EntryPoint);

import '../styles/globals.sass';
import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store/store';
import { InitContextProvider } from '../contexts/InitContext';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {getDefaultTheme} from '../utils/themes';
import createEmotionCache from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface EntryPointProps extends AppProps {
  emotionCache?: EmotionCache;
}

const EntryPoint: FC<EntryPointProps> = (props: EntryPointProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={getDefaultTheme()}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
				<InitContextProvider>
					<Component {...pageProps} />
				</InitContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

// const EntryPoint: FC<AppProps> = ({Component, pageProps}) => {
// 	return (
// 		<InitContextProvider>
// 			<Component {...pageProps} />
// 		</InitContextProvider>
// 	);
// };

export default wrapper.withRedux(EntryPoint);

/*
    Steps :
        step 1 : Dispatch init server actions only.
        step 2 : Get token cookies.
        step 3 : Pass token cookies to InitContext.
 */

/*
    NEW :
        step 1 : remove getInitialProps.
        step 2 : get cookie from initContext.
        step 3 :
 */

// import React from "react";
// import App, { AppProps } from "next/app";
// import { wrapper, SagaStore } from "../store/store";
// import { InitContextProvider } from "../contexts/InitContext";
// // import {loadNewAddedShopAction} from "../store/actions/shop/shopActions";
// import { END } from "redux-saga";
// import { placesGetCountriesAction } from "../store/actions/places/placesActions";
// import { initAppAction } from "../store/actions/_init/_initActions";
// import { loadNewAddedShopAction } from "../store/actions/shop/shopActions";
// // import { setCookie, getCookie } from "cookies-next";
//
//
// class EntryPoint extends React.Component<AppProps> {
// 	public static getInitialProps = wrapper.getInitialAppProps(store => async context => {
// 		// Init Server actions here only
// 		store.dispatch(initAppAction());
// 		store.dispatch(placesGetCountriesAction());
// 		store.dispatch(loadNewAddedShopAction());
//
// 		const pageProps = {
// 			...(await App.getInitialProps(context)).pageProps
// 		};
//
// 		if (context.ctx.req) {
// 			//*** TODO 2 : LOAD COOKIE *** //
// 			// Example set cookie
// 			// const req = context.ctx.req;
// 			// const res = context.ctx.res;
// 			// setCookie("new_cookie", "new_cookie_value", { req, res, maxAge: 60 * 6 * 24 });
// 			// setCookie("cookie_from_EntryPoint", "cookie_from_EntryPoint_value", {
// 			// 	req, res, httpOnly: true, sameSite: "lax", secure: true,
// 			// });
// 			// context.ctx.res.cookies.set('new_cookie', 'new_cookie_value', {httpOnly: true, sameSite: 'lax', secure: true});
// 			// console.log("from getInitialProps SERVER SIDE");
// 			store.dispatch(END);
// 			await (store as SagaStore).sagaTask?.toPromise();
// 		}
// 		// pageProps["abc"] = "test";
// 		return {pageProps};
// 	});
//
// 	render() {
// 		const { Component, pageProps } = this.props;
// 		return (
// 			<InitContextProvider>
// 				<Component {...pageProps} />
// 			</InitContextProvider>
// 		);
// 	}
// }
//
// export default wrapper.withRedux(EntryPoint);