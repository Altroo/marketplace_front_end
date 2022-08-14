import { put, call, takeLatest, select } from 'typed-redux-saga/macro';
import * as Types from '../../actions';
import {
	AppTokensCookieType, IconColorType,
	InitStateToken,
	InitStateUniqueID, NewShopCookieType
} from "../../../types/_init/_initTypes";
import { emptyInitStateToken, emptyInitStateUniqueID, initialState, setInitState } from '../../slices/_init/_initSlice';
import { getInitStateToken, getInitStateUniqueID, getTokenType } from '../../selectors';
import { versionSaga } from '../version/versionSaga';
import { initAccount, setIsLoggedIn } from '../../slices/account/accountSlice';
import { initShop, setBorderIconColor } from "../../slices/shop/shopSlice";
import { initOffer } from '../../slices/offer/offerSlice';
import { initPlaces } from '../../slices/places/placesSlice';
import { initVersion } from '../../slices/version/versionSlice';
import { initCart } from '../../slices/cart/cartSlice';
import { initChat } from '../../slices/chat/chatSlice';

// or use fork instead
// fork(initAppSaga, Types.INIT_APP)
// export function* monitorToken(selector: any, previousValue: TokenChoices, takePattern = "*") {
//     while (true) {
//         const nextValue = yield* select(selector);
//         if (nextValue !== previousValue) {
//             return nextValue;
//         }
//         yield* take(takePattern); // wait until action is dispatched
//     }
// }

function* initAppSaga() {
	// init version first.
	yield* call(() => versionSaga());
	// const appToken: InitStateInterface<InitStateToken, InitStateUniqueID> = yield* call(loadAppToken);
	// const appToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
	// 	tokenType: 'TOKEN',
	// 	initStateToken: {
	// 		access_token:
	// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyODM0MjE4LCJpYXQiOjE2NTc2NTAyMTgsImp0aSI6ImEyZGFkMGJkNGQxNjRjODU5YzE2ZWI4ODZkMDkyNGY2IiwidXNlcl9pZCI6OX0.EA86MrJtfOaIuK0I6_ud6qN38ut90E87zGDX2yvH7KQ',
	// 		refresh_token:
	// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4OTE4NjIxOCwiaWF0IjoxNjU3NjUwMjE4LCJqdGkiOiI0ZThjMDNkYTVmNDU0NjJjYjllMGYxNGM3OGQ4Yzk4NyIsInVzZXJfaWQiOjl9.hyU0-uXvBoiMeQikB_gjIk2fgFcC2P4F5Fa00wi8t0g',
	// 		user: {
	// 			pk: 9,
	// 			email: 'test1@gmail.com',
	// 			first_name: 'Al',
	// 			last_name: 'Yooy',
	// 		},
	// 		access_token_expiration: '2022-09-10T18:23:38.274147Z',
	// 		refresh_token_expiration: '2023-07-12T18:23:38.274154Z',
	// 	},
	// 	initStateUniqueID: emptyInitStateUniqueID,
	// };
	// ///* TESTING Set localstorage -- localStorage is set on login */
	// yield* call(() => localStorage.setItem('@type', appToken.tokenType!));
	// yield* call(() => localStorage.setItem('@initStateToken', JSON.stringify(appToken.initStateToken)));
	// yield* call(() => localStorage.setItem('@initStateUniqueID', JSON.stringify(appToken.initStateUniqueID)));
	/*yield* put(setInitState(appToken));
	if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
		// set is logged in to true
		yield* put(setIsLoggedIn(true));
	}
	console.log('initAppSaga Called');*/
}

// function* initNewShopStateSaga(payload: {type: string, cookies: cookiesType}) {
// 	if ('@shop_name' in payload.cookies) {
// 		const shop_name = payload.cookies['@shop_name'];
// 		if (shop_name) {
// 			yield* put(setNewShopName(shop_name));
// 		}
// 	} else if ('@avatar' in payload.cookies) {
// 		const avatar = payload.cookies['@avatar'];
// 		if (avatar) {
// 			yield* put(setNewShopAvatar(avatar));
// 		}
// 	} else if ('@color_code' in payload.cookies && '@bg_color_code' in payload.cookies) {
// 		const color_code = payload.cookies['@color_code'];
// 		const bg_color_code = payload.cookies['@bg_color_code'];
// 		if (color_code && bg_color_code) {
// 			yield* put(setNewShopColor({color_code, bg_color_code}));
// 		}
// 	} else if ('@font_name' in payload.cookies) {
// 		const font_name = payload.cookies['@font_name'];
// 		if (font_name) {
// 			yield* put(setNewShopFont(font_name));
// 		}
// 	}
// }

function* initAppCookieTokensSaga(payload: { type: string; cookies: AppTokensCookieType }) {
	const tokenType: string | undefined = payload.cookies['@tokenType'];
	const stateToken: string | undefined = payload.cookies['@initStateToken'];
	const stateUniqueID: string | undefined = payload.cookies['@initStateUniqueID'];
	let appToken = initialState;
	if (tokenType === 'TOKEN' && stateToken !== undefined) {
		appToken = {
			tokenType: 'TOKEN',
			initStateToken: JSON.parse(stateToken) as InitStateToken,
			initStateUniqueID: emptyInitStateUniqueID,
		};
	} else if (tokenType === 'UNIQUE_ID' && stateUniqueID !== undefined) {
		appToken = {
			tokenType: 'UNIQUE_ID',
			initStateToken: emptyInitStateToken,
			initStateUniqueID: JSON.parse(stateUniqueID) as InitStateUniqueID,
		};
	}
	yield* put(setInitState(appToken));
	if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
		// set is logged in to true
		yield* put(setIsLoggedIn(true));
	}
	console.log('initAppCookieTokensSaga Called');
}

function* initCookieBorderIconSaga(payload: { type: string; cookies: NewShopCookieType }) {
	const border: string | undefined = payload.cookies['@border'];
	const iconColor: IconColorType | undefined = payload.cookies['@icon_color'];
	if (border && iconColor) {
		yield* put(setBorderIconColor({border: border, iconColor: iconColor}));
	}
}

// User click Logout
export function* initEmptyStatesSaga() {
	yield* put(initShop());
	yield* put(initOffer());
	yield* put(initPlaces());
	yield* put(initVersion());
	yield* put(initAccount());
	yield* put(initCart());
	yield* put(initChat());
	// yield* put(initOrder());
	// yield* put(initRating());
}

export function* ctxAuthSaga() {
	return {
		tokenType: yield* select(getTokenType),
		initStateToken: yield* select(getInitStateToken),
		initStateUniqueID: yield* select(getInitStateUniqueID),
	};
}

export function* watchInit() {
	// using fork to let initAppSaga sets the token state
	// before proceeding to the rest of the watchers that needs the token state
	// yield* takeLatest(Types.INIT_NEW_SHOP_STATE, initNewShopStateSaga)
	yield* takeLatest(Types.INIT_APP, initAppSaga);
	yield* takeLatest(Types.INIT_APP_COOKIE_TOKENS, initAppCookieTokensSaga);
	yield* takeLatest(Types.INIT_COOKIE_BORDER_ICON, initCookieBorderIconSaga);
	// yield* fork(initAppSaga, Types.INIT_APP);
}
