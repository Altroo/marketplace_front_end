import * as Types from '../../actions';
import { call, takeLatest, put } from 'redux-saga/effects';
import { withCallback } from 'redux-saga-callback';
import { Saga } from 'redux-saga';
import {
	CartCounterTypeResponseType,
	cartOrderCoordonneeDataSagaType,
	cartOrderDeliveriesDataSagaType,
	cartPostOrderSagaType,
	CartPostProductRootResponseType,
	CartPostProductRootSagaPayload,
	CartPostServiceRootResponseType,
	CartPostServiceRootSagaPayload, userLocalCartOrderSagaType
} from "../../../types/cart/cartTypes";
import { AxiosInstance } from 'axios';
import { allowAnyInstance, isAuthenticatedInstance } from "../../../utils/helpers";
import { deleteApi, getApi, patchApi, postApi } from '../../services/_init/_initAPI';
import {
	setCartUniqueID,
	setUserCartCounter,
	setUserLocalCartOrder,
	setUserLocalCartOrderCoordonneeData,
	setUserLocalCartOrderDeliveriesData,
	initUserLocalCartOrder,
} from '../../slices/cart/cartSlice';
import { AuthSagaContextType, ResponseOnlyInterface } from "../../../types/_init/_initTypes";
import { ctxAuthSaga } from "../_init/_initSaga";

function* cartPostProductRootSaga(payload: CartPostProductRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (!payload.unique_id && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: CartPostProductRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			return true;
		}
	} else {
		const response: CartPostProductRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			return true;
		}
	}
}

function* cartPostServiceRootSaga(payload: CartPostServiceRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (!payload.unique_id && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: CartPostServiceRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			return true;
		}
	} else {
		const response: CartPostServiceRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			return true;
		}
	}
}

function* cartGetCartCounterSaga(payload: { type: string; unique_id: string | null }) {
	let url = `${process.env.NEXT_PUBLIC_CART_GET_CART_COUNTER}${payload.unique_id}/`;
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (!payload.unique_id && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		url = `${process.env.NEXT_PUBLIC_CART_GET_CART_COUNTER}`;
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
	}
	const response: CartCounterTypeResponseType = yield call(() => getApi(url, instance));
	if (response.status === 200) {
		yield put(setUserCartCounter(response.data));
		if (payload.unique_id) {
			yield put(setCartUniqueID(payload.unique_id));
		}
	}
}

function* cartDeleteRootSaga(payload: { type: string; cart_pk: number; unique_id: string | null}) {
	let url = `${process.env.NEXT_PUBLIC_CART_ROOT}/${payload.cart_pk}/${payload.unique_id}/`;
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (!payload.unique_id && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		url = `${process.env.NEXT_PUBLIC_CART_ROOT}/${payload.cart_pk}/`;
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
	}
	const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
	if (response.status === 204) {
		return true;
	}
}

function* cartPatchQuantitySaga(payload: { type: string; cart_pk: number; unique_id: string | null; action_type: '+' | '-' }) {
	let url = `${process.env.NEXT_PUBLIC_CART_PATCH_CART_QUANTITY}${payload.cart_pk}/${payload.action_type}/${payload.unique_id}/`;
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (!payload.unique_id && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		url = `${process.env.NEXT_PUBLIC_CART_PATCH_CART_QUANTITY}${payload.cart_pk}/${payload.action_type}/`;
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
	}
	const response: ResponseOnlyInterface = yield call(() => patchApi(url, instance));
	if (response.status === 204) {
		return true;
	}
}

function* cartSetLocalCartOrderSaga(payload: userLocalCartOrderSagaType) {
	yield put(
		setUserLocalCartOrder({...payload}),
	);
	return true;
}

function* cartSetLocalCartOrderCoordonneeDataSaga(payload: cartOrderCoordonneeDataSagaType) {
	yield put(
		setUserLocalCartOrderCoordonneeData({
			first_name: payload.first_name,
			last_name: payload.last_name,
			phone: payload.phone,
			email: payload.email,
			note: payload.note,
			delivery_pk: payload.delivery_pk,
			shop_pk: payload.shop_pk,
			picked_click_and_collect: payload.picked_click_and_collect,
			picked_delivery: payload.picked_delivery,
			url: payload.url,
		}),
	);
	return true;
}

function* cartSetLocalCartOrderDeliveriesDataSaga(payload: cartOrderDeliveriesDataSagaType) {
	yield put(
		setUserLocalCartOrderDeliveriesData({
			first_name: payload.first_name,
			last_name: payload.last_name,
			address: payload.address,
			city: payload.city,
			zip_code: payload.zip_code,
			country: payload.country,
			phone: payload.phone,
			email: payload.email,
			note: payload.note,
			delivery_pk: payload.delivery_pk,
			shop_pk: payload.shop_pk,
			picked_click_and_collect: payload.picked_click_and_collect,
			picked_delivery: payload.picked_delivery,
			url: payload.url,
		}),
	);
	return true;
}

function* cartPostOrderSaga(payload: cartPostOrderSagaType) {
	const { type, url, ...payloadData } = payload;
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	let instance: AxiosInstance = yield call(() => allowAnyInstance());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		instance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
	}
	const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, payloadData));
	if (response.status === 204) {
		return true;
	}
}

function* initCartOrderSaga() {
	yield call(() => initUserLocalCartOrder());
}

export function* watchCart() {
	yield takeLatest(Types.CART_POST_PRODUCT_ROOT, withCallback(cartPostProductRootSaga as Saga));
	yield takeLatest(Types.CART_POST_SERVICE_ROOT, withCallback(cartPostServiceRootSaga as Saga));
	yield takeLatest(Types.CART_GET_CART_COUNTER, withCallback(cartGetCartCounterSaga as Saga));
	yield takeLatest(Types.CART_DELETE_ROOT, withCallback(cartDeleteRootSaga as Saga));
	yield takeLatest(Types.CART_PATCH_CART_QUANTITY, withCallback(cartPatchQuantitySaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER, withCallback(cartSetLocalCartOrderSaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER_COORDONNEE_DATA, withCallback(cartSetLocalCartOrderCoordonneeDataSaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER_DELIVERIES_DATA, withCallback(cartSetLocalCartOrderDeliveriesDataSaga as Saga));
	yield takeLatest(Types.CART_POST_ORDER, withCallback(cartPostOrderSaga as Saga));
	yield takeLatest(Types.CART_INIT_CART_ORDER, withCallback(initCartOrderSaga as Saga));
}
