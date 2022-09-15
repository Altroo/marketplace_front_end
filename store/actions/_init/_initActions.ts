import * as types from '../index';
import {
	AppTokensCookieType,
	NewShopCookieType
} from "../../../types/_init/_initTypes";
import { Session } from "next-auth";
import { REFRESH_APP_TOKEN_STATES } from "../index";

export const initAppAction = () => {
	return {
		type: types.INIT_APP,
	};
};

export const initAppCookieTokensAction = (cookies: AppTokensCookieType) => {
	return {
		type: types.INIT_APP_COOKIE_TOKENS,
		cookies,
	};
}

export const refreshAppTokenStatesAction = (session: Record<string, unknown>) => {
	return {
		type: types.REFRESH_APP_TOKEN_STATES,
		session,
	}
}

export const initNewShopBorderIconAction = (cookies: NewShopCookieType) => {
	return {
		type: types.INIT_COOKIE_BORDER_ICON,
		cookies,
	}
}

// // Api Error handler
// export const apiErrorAction = (
// 	type: string,
// 	promise_status: ApiPromiseStatus,
// 	error: string
// ) => {
// 	return {
// 		type,
// 		promise_status,
// 		error,
// 	}
// }