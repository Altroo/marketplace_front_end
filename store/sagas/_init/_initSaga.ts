import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	AppTokensCookieType,
	IconColorType, InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	NewShopCookieType,
	TokenChoices
} from "../../../types/_init/_initTypes";
import { emptyInitStateUniqueID, initialState, setInitState, setBoutiqueCoupDeCoeur } from '../../slices/_init/_initSlice';
import { getInitStateToken, getInitStateUniqueID, getTokenType } from '../../selectors';
import { versionSaga } from '../version/versionSaga';
import { initAccount, setIsLoggedIn } from '../../slices/account/accountSlice';
import { initShop, setBorderIconColor } from '../../slices/shop/shopSlice';
import { initOffer } from '../../slices/offer/offerSlice';
import { initPlaces } from '../../slices/places/placesSlice';
import { initVersion } from '../../slices/version/versionSlice';
import { shopGetPhoneCodesSaga } from '../shop/shopSaga';
import { AxiosInstance } from "axios";
import { allowAnyInstance } from "../../../utils/helpers";
import { SeoPagesGetHomePageResponseType } from "../../../types/seo-pages/seoPagesTypes";
import { getApi } from "../../services/_init/_initAPI";

function* initAppSaga() {
	// init version first.
	yield call(() => versionSaga());
	// load phone codes.
	yield call(() => shopGetPhoneCodesSaga());
	// load boutique coup de coeur
	yield call(() => getBoutiqueCoupDeCoeurSaga());
}

function* getBoutiqueCoupDeCoeurSaga() {
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_GET_HOME_PAGE}`;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: SeoPagesGetHomePageResponseType = yield call(() => getApi(url, instance));
	if (response.status === 200 && response.data) {
		yield put(setBoutiqueCoupDeCoeur(response.data.coup_de_coeur.shop_link));
	}
}

function* initAppCookieTokensSaga(payload: { type: string; cookies: AppTokensCookieType }) {
	const tokenType: string | undefined = payload.cookies['@tokenType'];
	const stateToken: string | undefined = payload.cookies['@initStateToken'];
	// const stateUniqueID: string | undefined = payload.cookies['@initStateUniqueID'];
	let appToken = initialState;
	if (tokenType === 'TOKEN' && stateToken !== undefined) {
		appToken = {
			tokenType: 'TOKEN',
			initStateToken: JSON.parse(stateToken) as InitStateToken,
			initStateUniqueID: emptyInitStateUniqueID,
		};
	}
	// else if (tokenType === 'UNIQUE_ID' && stateUniqueID !== undefined) {
	// 	appToken = {
	// 		tokenType: 'UNIQUE_ID',
	// 		initStateToken: emptyInitStateToken,
	// 		initStateUniqueID: JSON.parse(stateUniqueID) as InitStateUniqueID,
	// 	};
	// }
	yield put(setInitState(appToken));
	if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access !== null) {
		// set is logged in to true
		yield put(setIsLoggedIn(true));
	}
}

function* initCookieBorderIconSaga(payload: { type: string; cookies: NewShopCookieType }) {
	const border: string | undefined = payload.cookies['@border'];
	const iconColor: IconColorType | undefined = payload.cookies['@icon_color'];
	if (border && iconColor) {
		yield put(setBorderIconColor({ border: border, iconColor: iconColor }));
	}
}

// User click Logout
export function* initEmptyStatesSaga() {
	yield put(initShop());
	yield put(initOffer());
	yield put(initPlaces());
	yield put(initVersion());
	yield put(initAccount());
}

export function* ctxAuthSaga() {
	return {
		tokenType: yield select(getTokenType),
		initStateToken: yield select(getInitStateToken),
		initStateUniqueID: yield select(getInitStateUniqueID),
	} as {
		tokenType: TokenChoices,
		initStateToken: InitStateToken,
		initStateUniqueID: InitStateUniqueID,
	};
}

function* refreshAppTokenStatesSaga(payload: { type: string; session: Record<string, unknown> }) {
	const accessToken: string = payload.session['accessToken'] as string;
	const refreshToken: string = payload.session['refreshToken'] as string;
	const accessTokenExpiration = payload.session['accessTokenExpiration'] as string;
	const refreshTokenExpiration = payload.session['refreshTokenExpiration'] as string;
	const userObj: {
		pk: number;
		email: string;
		first_name: string;
		last_name: string;
	} = payload.session['user'] as {
		pk: number;
		email: string;
		first_name: string;
		last_name: string;
	};
	const appToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
		tokenType: 'TOKEN',
		initStateToken: {
			access: accessToken,
			refresh: refreshToken,
			user: {
				pk: userObj.pk as number,
				email: userObj.email as string,
				first_name: userObj.first_name as string,
				last_name: userObj.last_name as string,
			},
			refresh_expiration: accessTokenExpiration,
			access_expiration: refreshTokenExpiration,
		},
		initStateUniqueID: emptyInitStateUniqueID,
	};
	if (appToken) {
		yield put(setInitState(appToken));
		yield put(setIsLoggedIn(true));
	}
}

export function* watchInit() {
	yield takeLatest(Types.INIT_APP, initAppSaga);
	yield takeLatest(Types.INIT_APP_COOKIE_TOKENS, initAppCookieTokensSaga);
	yield takeLatest(Types.INIT_COOKIE_BORDER_ICON, initCookieBorderIconSaga);
	yield takeLatest(Types.REFRESH_APP_TOKEN_STATES, refreshAppTokenStatesSaga);
}
