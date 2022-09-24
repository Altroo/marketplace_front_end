// import { put, takeLatest, call } from 'typed-redux-saga/macro';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as Types from '../../actions';
import { ctxAuthSaga } from '../_init/_initSaga';
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { deleteResponseDataApi, getApi, patchApi, postApi } from '../../services/_init/_initAPI';
import { ApiErrorResponseType, AuthSagaContextType, ResponseOnlyInterface } from "../../../types/_init/_initTypes";
import {
	CartDeleteRootResponseType,
	CartGetAllResponseType,
	CartGetCoordinatesResponseType,
} from '../../../types/cart/cartTypes';
import { setCartGetAll, setCartOrderStatus, setCartSelectedDetails, setCoordinates } from '../../slices/cart/cartSlice';
import { setExistsInCart } from '../../slices/offer/offerSlice';
import { AxiosInstance } from "axios";

function* cartGetAllSaga() {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_ALL}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: CartGetAllResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setCartGetAll(response.data));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartGetCoordinatesSaga() {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_GET_COORDINATES}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: CartGetCoordinatesResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setCoordinates(response.data));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartDeleteRootSaga(payload: { type: string; cart_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/${payload.cart_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: CartDeleteRootResponseType = yield call(() => deleteResponseDataApi(url, authInstance));
			if (response.status === 200) {
				// Refresh cart
				yield call(() => cartGetAllSaga());
				// set exists in cart in offers slice to false
				yield put(setExistsInCart({ offer_pk: response.data.offer_pk, exists_in_cart: false }));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartGetDetailsSaga(payload: { type: string; shop_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_GET_DETAILS}${payload.shop_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// TODO Check type in case wrong
			const response: CartGetAllResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setCartSelectedDetails(response.data));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartPostRootSaga(payload: {
	type: string;
	offer_pk: number;
	picked_color?: string;
	picked_size?: string;
	picked_quantity?: string;
	picked_date?: string;
	picked_hour?: string;
}) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
			if (response.status === 200) {
				// set exists in cart in offers slice
				yield put(setExistsInCart({ offer_pk: payload.offer_pk, exists_in_cart: true }));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartPatchRootSaga(payload: {
	type: string;
	cart_pk: number;
	picked_color?: string;
	picked_size?: string;
	picked_quantity?: string;
	picked_date?: string;
	picked_hour?: string;
}) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => patchApi(url, authInstance, payloadData));
			if (response.status === 204) {
				// reload cart
				yield call(() => cartGetAllSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* cartPostOrderSaga(payload: {
	type: string;
	shop_pk: number;
	user_address_pk?: number;
	delivery_pk?: number;
	picked_click_and_collect?: string;
	picked_delivery?: string;
	note?: string;
}) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CART_ORDER}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
			if (response.status === 204) {
				// set cart order successfully
				yield put(setCartOrderStatus('Success'));
				// reload cart
				yield call(() => cartGetAllSaga());
			} else {
				// set cart order failed
				yield put(setCartOrderStatus('Fail'));
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

export function* watchCart() {
	yield takeLatest(Types.CART_GET_ALL, cartGetAllSaga);
	yield takeLatest(Types.CART_POST_ORDER, cartPostOrderSaga);
	yield takeLatest(Types.CART_DELETE_ROOT, cartDeleteRootSaga);
	yield takeLatest(Types.CART_GET_COORDINATES, cartGetCoordinatesSaga);
	yield takeLatest(Types.CART_PATCH_ROOT, cartPatchRootSaga);
	yield takeLatest(Types.CART_GET_DETAILS, cartGetDetailsSaga);
	yield takeLatest(Types.CART_POST_ROOT, cartPostRootSaga);
}
