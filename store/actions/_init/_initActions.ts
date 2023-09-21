import * as types from '../index';
import {
	AppTokensCookieType,
	NewShopCookieType
} from "../../../types/_init/_initTypes";
import { Session } from "../../../types/next-auth";

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

export const refreshAppTokenStatesAction = (session: Session) => {
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
