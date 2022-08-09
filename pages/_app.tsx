import '../styles/globals.sass';
import type {AppProps} from 'next/app';
import {wrapper} from '../store/store';
import {InitContextProvider} from '../contexts/InitContext';

function EntryPoint({Component, pageProps}: AppProps) {
    return (
        <InitContextProvider>
            <Component {...pageProps} />
        </InitContextProvider>
    );
}

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
// import { setCookie, getCookie } from "cookies-next";
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
// 		if (context.ctx.req) {
// 			//*** TODO 2 : LOAD COOKIE *** //
// 			// Example set cookie
// 			const req = context.ctx.req;
// 			const res = context.ctx.res;
// 			setCookie("new_cookie", "new_cookie_value", { req, res, maxAge: 60 * 6 * 24 });
// 			setCookie("cookie_from_EntryPoint", "cookie_from_EntryPoint_value", {
// 				req, res, httpOnly: true, sameSite: "lax", secure: true,
// 			});
// 			// context.ctx.res.cookies.set('new_cookie', 'new_cookie_value', {httpOnly: true, sameSite: 'lax', secure: true});
// 			console.log("from getInitialProps SERVER SIDE");
// 			store.dispatch(END);
// 			await (store as SagaStore).sagaTask?.toPromise();
// 		} else {
// 			console.log("from getInitialProps LOCAL SIDE");
// 		}
// 		/*** Note Runs Second **/
//
// 		//*** TODO 3 : PASS token from cookie to HOContext **//
// 		pageProps["abc"] = "test";
// 		return {
// 			pageProps: pageProps
// 		};
// 	});
//
// 	render() {
// 		const { Component, pageProps } = this.props;
// 		return (
// 			<InitContextProvider abc={pageProps.abc}>
// 				<Component {...pageProps} />
// 			</InitContextProvider>
// 		);
// 	}
// }
//
// export default wrapper.withRedux(EntryPoint);