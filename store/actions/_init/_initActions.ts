import * as types from '../index';
import { AppTokensCookieType, NewShopCookieType } from "../../../types/_init/_initTypes";

export const initAppAction = () => {
	return {
		type: types.INIT_APP,
	};
};

// export const initNewShopStateAction = (cookies: cookiesType) => {
// 	return {
// 		type: types.INIT_NEW_SHOP_STATE,
// 		cookies,
// 	};
// }

export const initAppCookieTokensAction = (cookies: AppTokensCookieType) => {
	return {
		type: types.INIT_APP_COOKIE_TOKENS,
		cookies,
	};
}

export const initNewShopBorderIconAction = (cookies: NewShopCookieType) => {
	return {
		type: types.INIT_COOKIE_BORDER_ICON,
		cookies,
	}
}