import { call, put, takeLatest } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	ShopGetRootTokenResponseType,
	ShopPostRootType,
	ShopPostRootTokenResponseType,
	ShopGetPhoneCodesResponseType,
	ShopPatchShopNameType,
	ShopPatchAvatarType,
	ShopPatchColorType,
	ShopPatchFontType,
	ShopPatchBioType,
	ShopPatchAvailabilityType,
	ShopPatchContactType,
	ShopPatchAddressType,
	ShopPatchRootType,
	ShopGetRootType,
	ShopFontNameType,
	ShopPatchContactPhoneType,
} from '../../../types/shop/shopTypes';
import {
	ApiErrorResponseType,
	AuthSagaContextType,
	IconColorType,
} from '../../../types/_init/_initTypes';
import {
	setShopAvatar,
	setGetPhoneCodes,
	setGetShopState,
	setPostShopState,
	setShopName,
	setShopColors,
	setShopFont,
	setShopBio,
	setShopAvailability,
	setShopContact,
	setShopAddress,
	setWSShopAvatar,
	setNewShopName,
	setNewShopAvatar,
	setNewShopColor,
	setNewShopFont,
	setShopPhoneContact,
	setGetShopIsLoading,
	setPostShopIsLoading,
	setPatchShopDataIsLoading,
	userShopPATCHApiErrorAction,
} from '../../slices/shop/shopSlice';
import {
	allowAnyInstance,
	isAuthenticatedInstance,
} from '../../../utils/helpers';
import { withCallback } from 'redux-saga-callback';
import { ctxAuthSaga } from '../_init/_initSaga';
import { getApi, patchApi, patchFormDataApi, postFormDataApi } from '../../services/_init/_initAPI';
import { AxiosInstance } from 'axios';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Saga } from "redux-saga";
import { accountGetCheckAccountSaga } from "../account/accountSaga";

function* shopPostRootSaga(payload: ShopPostRootType) {
	yield put(setPostShopIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/`;
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() =>
			isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
		);
		const response: ShopPostRootTokenResponseType = yield call(() => postFormDataApi(url, instance, payload));
		if (response.status === 200) {
			yield put(setPostShopState(response.data));
			// empty temporary new shop data
			yield call(() => accountGetCheckAccountSaga());
			return response.data.qaryb_link;
		}
	}
		// } else {
		// 	// User is not authenticated
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance('multipart/form-data', true));
		// 	const response: ShopPostRootUniqueIDResponseType = yield call(() => postFormDataApi(url, instance, payload));
		// 	if (response.status === 200) {
		// 		// set UNIQUE_ID to local storage & states
		// 		const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
		// 			tokenType: 'UNIQUE_ID',
		// 			initStateToken: emptyInitStateToken,
		// 			initStateUniqueID: {
		// 				unique_id: response.data.unique_id,
		// 				unique_id_expiration: response.data.expiration_date,
		// 			},
		// 		};
		// 		// yield call(() => setLocalStorageAppToken(newInitStateToken));
		// 		yield call(() => setRemoteCookiesAppToken(newInitStateToken));
		// 		yield put(setInitState(newInitStateToken));
		// 		yield put(setPostShopState(response.data));
		// 		// empty temporary new shop data
		// 		yield call(() => emptyLocalStorageNewShopData());
		// 		// delete cookies
		// 		yield call(() => deleteCookieStorageNewShopData());
		// 		return response.data.qaryb_link;
		// 	}
		// }
	// } catch (e) {
	// 	const apiError = e as ApiErrorResponseType;
	// 	yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => userShopPOSTApiErrorAction(apiError)));
	// }
}

function* shopGetRootSaga(payload: ShopGetRootType) {
	yield put(setGetShopIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/`;
	// try {
	// User authenticated
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// get shop data using qaryb link.
		// else get user data.
		if (payload.qaryb_link) {
			url += `${payload.qaryb_link}/`;
		}
		const response: ShopGetRootTokenResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200) {
			// update state
			yield put(setGetShopState(response.data));
		}
	}
	// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
	// 	// User is not authenticated
	// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	// 	url += `${authSagaContext.initStateUniqueID.unique_id}/`;
	// 	const response: ShopGetRootUniqueIDResponseType = yield call(() => getApi(url, instance));
	// 	if (response.status === 200) {
	// 		yield put(setGetShopState(response.data));
	// 	}
	// }
	// } catch (e) {
	// 	const apiError = e as ApiErrorResponseType;
	// 	yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => userShopGETApiErrorAction(apiError)));
	// 	// set error state
	// }
}

export function* shopGetPhoneCodesSaga() {
	const url = `${process.env.NEXT_PUBLIC_SHOP_PHONE_CODES}`;
	try {
		const instance: AxiosInstance = yield call(() => allowAnyInstance());
		const response: ShopGetPhoneCodesResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200) {
			yield put(setGetPhoneCodes(response.data.phone_codes));
		} else {
			console.log(response.status);
			console.log(response.data);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* shopPatchShopNameSaga(payload: {type: string, shop_name: string}) {
	yield put(setPatchShopDataIsLoading());
	const url = `${process.env.NEXT_PUBLIC_SHOP_SHOP_NAME}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ShopPatchShopNameType = yield call(() => patchApi(url, instance, {
			shop_name: payload.shop_name,
		}));
		if (response.status === 200) {
			// update state
			yield put(setShopName({ ...response.data }));
			return response.data;
		}
	}
}

function* shopPatchAvatarSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_AVATAR}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	// User authenticated
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() =>
			isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
		);
		const response: ShopPatchAvatarType = yield call(() => patchFormDataApi(url, instance, payloadData));
		if (response.status === 200) {
			// update state
			yield put(setShopAvatar({ ...response.data }));
			return true;
		}
	}
}

function* shopPatchColorSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_COLOR}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchColorType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setShopColors({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	const response: ShopPatchColorType = yield call(() =>
		// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		// update state
		// 		yield put(setShopColors({ ...response.data }));
		// 	} else {
		// 		// set error state
		// 		console.log(response.status);
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* shopPatchFontSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_FONT}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchFontType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setShopFont({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	const response: ShopPatchFontType = yield call(() =>
		// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		// update state
		// 		yield put(setShopFont({ ...response.data }));
		// 	} else {
		// 		// set error state
		// 		console.log(response.status);
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* shopPatchPhoneContactSaga(payload: {
	type: string;
	contact_phone_code: string | null;
	contact_phone: string | null;
	contact_whatsapp_code: string | null;
	contact_whatsapp: string | null;
	contact_mode: 'P' | 'W';
}) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_PHONE_CONTACT}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchContactPhoneType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setShopPhoneContact(response.data));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	const response: ShopPatchContactPhoneType = yield call(() =>
		// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		// update state
		// 		yield put(setShopPhoneContact(response.data));
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* shopPatchBioSaga(payload: {type: string, bio: string | null}) {
	yield put(setPatchShopDataIsLoading());
	const url = `${process.env.NEXT_PUBLIC_SHOP_BIO}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// User authenticated
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ShopPatchBioType = yield call(() => patchApi(url, instance, {
			bio: payload.bio,
		}));
		if (response.status === 200) {
			// update state
			yield put(setShopBio({ ...response.data }));
			return response.data;
		}
	}
}

function* shopPatchAvailabilitySaga(payload: Partial<ShopPatchRootType>) {
	yield put(setPatchShopDataIsLoading());
	const url = `${process.env.NEXT_PUBLIC_SHOP_AVAILABILITY}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchAvailabilityType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setShopAvailability({ ...response.data }));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	const response: ShopPatchAvailabilityType = yield call(() =>
		// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		// update state
		// 		yield put(setShopAvailability({ ...response.data }));
		// 	}
		// }
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => userShopPATCHApiErrorAction(apiError)));
	}
}

function* shopPatchContactSaga(payload: Partial<ShopPatchRootType>) {
	yield put(setPatchShopDataIsLoading());
	const url = `${process.env.NEXT_PUBLIC_SHOP_CONTACT}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchContactType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setShopContact({ ...response.data }));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	const response: ShopPatchContactType = yield call(() =>
		// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		// update state
		// 		yield put(setShopContact({ ...response.data }));
		// 	}
		// }
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => userShopPATCHApiErrorAction(apiError)));
	}
}

function* shopPatchAddressSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_ADDRESS}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	// User authenticated
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ShopPatchAddressType = yield call(() => patchApi(url, instance, payloadData));
		if (response.status === 200) {
			// update state
			yield put(setShopAddress({ ...response.data }));
			return true;
		}
	}
	// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
	// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	// 	const response: ShopPatchAddressType = yield call(() =>
	// 		patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
	// 	);
	// 	if (response.status === 200) {
	// 		// update state
	// 		yield put(setShopAddress({ ...response.data }));
	// 	} else {
	// 		// set error state
	// 		console.log(response.status);
	// 	}
	// }
}

function* wsShopAvatarSaga(payload: { type: string; pk: number; avatar: string }) {
	yield put(setWSShopAvatar({avatar: payload.avatar}));
}

// Create Temporary shop
function* setShopLocalShopNameSaga(payload: { type: string; shop_name: string}) {
	yield put(setNewShopName(payload.shop_name));
	return true;
}

function* setShopLocalAvatarSaga(payload: { type: string; avatar: ArrayBuffer | string}) {
	yield put(setNewShopAvatar(payload.avatar));
	return true;
}

function* setShopLocalColorSaga(payload: {
	type: string;
	color_code: string;
	bg_color_code: string;
	border: string;
	icon_color: IconColorType;
}) {
	yield put(
		setNewShopColor({
			color_code: payload.color_code,
			bg_color_code: payload.bg_color_code,
			border: payload.border,
			icon_color: payload.icon_color,
		}),
	);
	return true;
}

function* setShopLocalFontSaga(payload: { type: string; font_name: ShopFontNameType }) {
	yield put(setNewShopFont(payload.font_name));
	return true;
}

// function* loadNewAddedShopDataSaga() {
// 	const newShopData: {
// 		shop_name: string;
// 		avatar: string;
// 		color_code: string;
// 		bg_color_code: string;
// 		border: string;
// 		icon_color: IconColorType;
// 		font_name: ShopFontNameType;
// 	} | null = yield call(() => loadLocalStorageNewShopData());
// 	if (newShopData !== null) {
// 		yield put(setNewShopName(newShopData.shop_name));
// 		yield put(setNewShopAvatar(newShopData.avatar));
// 		yield put(
// 			setNewShopColor({
// 				color_code: newShopData.color_code,
// 				bg_color_code: newShopData.bg_color_code,
// 				border: newShopData.border,
// 				icon_color: newShopData.icon_color,
// 			}),
// 		);
// 		yield put(setNewShopFont(newShopData.font_name));
// 	}
// 	// else case is handled by the middleware
// }

export function* watchShop() {
	// yield takeLatest(Types.LOAD_NEW_ADDED_SHOP_DATA, loadNewAddedShopDataSaga);
	yield takeLatest(Types.SET_SHOP_NAME, withCallback(setShopLocalShopNameSaga as Saga));
	yield takeLatest(Types.SET_SHOP_AVATAR, withCallback(setShopLocalAvatarSaga as Saga));
	yield takeLatest(Types.SET_SHOP_COLOR, withCallback(setShopLocalColorSaga as Saga));
	yield takeLatest(Types.SET_SHOP_FONT, withCallback(setShopLocalFontSaga as Saga));
	yield takeLatest(Types.SHOP_POST_ROOT, withCallback(shopPostRootSaga as Saga));
	yield takeLatest(Types.SHOP_GET_ROOT, shopGetRootSaga);
	yield takeLatest(Types.SHOP_GET_PHONE_CODES, shopGetPhoneCodesSaga);
	yield takeLatest(Types.SHOP_PATCH_SHOP_NAME, withCallback(shopPatchShopNameSaga as Saga));
	yield takeLatest(Types.SHOP_PATCH_AVATAR, withCallback(shopPatchAvatarSaga as Saga));
	yield takeLatest(Types.SHOP_PATCH_COLOR, shopPatchColorSaga);
	yield takeLatest(Types.SHOP_PATCH_FONT, shopPatchFontSaga);
	yield takeLatest(Types.SHOP_PATCH_PHONE_CONTACT, shopPatchPhoneContactSaga);
	yield takeLatest(Types.SHOP_PATCH_BIO, withCallback(shopPatchBioSaga as Saga));
	yield takeLatest(Types.SHOP_PATCH_AVAILABILITY, shopPatchAvailabilitySaga);
	yield takeLatest(Types.SHOP_PATCH_CONTACT, shopPatchContactSaga);
	yield takeLatest(Types.SHOP_PATCH_ADDRESS, withCallback(shopPatchAddressSaga as Saga));
	yield takeLatest(Types.WS_SHOP_AVATAR, wsShopAvatarSaga);
}
