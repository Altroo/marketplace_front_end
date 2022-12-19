import * as Types from '../../actions';
import { call, takeLatest, put } from 'redux-saga/effects';
import { withCallback } from 'redux-saga-callback';
import { Saga } from 'redux-saga';
import {
	CartCounterTypeResponseType, cartDetailsFormikType,
	CartGetDetailsResponseType, cartOrderCoordonneeDataSagaType, cartOrderDeliveriesDataSagaType,
	CartPostProductRootResponseType,
	CartPostProductRootSagaPayload,
	CartPostServiceRootResponseType,
	CartPostServiceRootSagaPayload
} from "../../../types/cart/cartTypes";
import { AxiosInstance } from 'axios';
import { allowAnyInstance } from '../../../utils/helpers';
import { deleteApi, getApi, patchApi, postApi } from '../../services/_init/_initAPI';
import {
	setSelectedCart,
	setCartUniqueID,
	setUserCartCounter,
	setUserLocalCartOrder,
	setUserLocalCartOrderCoordonneeData,
	setUserLocalCartOrderDeliveriesData,
} from '../../slices/cart/cartSlice';
import { ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import { CART_SET_LOCAL_CART_ORDER } from "../../actions";

function* cartPostProductRootSaga(payload: CartPostProductRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: CartPostProductRootResponseType = yield call(() => postApi(url, instance, payloadData));
	if (response.status === 200) {
		return true;
	}
}

function* cartPostServiceRootSaga(payload: CartPostServiceRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: CartPostServiceRootResponseType = yield call(() => postApi(url, instance, payloadData));
	if (response.status === 200) {
		return true;
	}
}

// function* cartGetAllCartSaga(payload: {type: string, unique_id: string}) {
// 	const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_LIST}${payload.unique_id}/`;
// 	const instance : AxiosInstance = yield call(() => allowAnyInstance());
// 	const response: CartGetAllResponseType = yield call(() => getApi(url, instance));
// 	if (response.status === 200) {
// 		yield put(setUserCart(response.data));
// 		yield put(setCartUniqueID(payload.unique_id));
// 	}
// }

function* cartGetCartCounterSaga(payload: { type: string; unique_id: string }) {
	const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_COUNTER}${payload.unique_id}/`;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: CartCounterTypeResponseType = yield call(() => getApi(url, instance));
	if (response.status === 200) {
		yield put(setUserCartCounter(response.data));
		yield put(setCartUniqueID(payload.unique_id));
	}
}

function* cartGetDetailsSaga(payload: { type: string; shop_pk: number; unique_id: string }) {
	const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_DETAILS}${payload.shop_pk}/${payload.unique_id}/`;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: CartGetDetailsResponseType = yield call(() => getApi(url, instance));
	if (response.status === 200) {
		yield put(setSelectedCart(response.data));
	}
}

function* cartDeleteRootSaga(payload: { type: string; cart_pk: number; unique_id: string }) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/${payload.cart_pk}/${payload.unique_id}/`;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
	if (response.status === 204) {
		return true;
	}
}

function* cartPatchQuantitySaga(payload: { type: string; cart_pk: number; unique_id: string; action_type: '+' | '-' }) {
	const url = `${process.env.NEXT_PUBLIC_CART_PATCH_CART_QUANTITY}${payload.cart_pk}/${payload.unique_id}/${payload.action_type}/`;
	const instance: AxiosInstance = yield call(() => allowAnyInstance());
	const response: ResponseOnlyInterface = yield call(() => patchApi(url, instance));
	if (response.status === 204) {
		return true;
	}
}

function* cartSetLocalCartOrderSaga(payload: {
	type: string;
	shop_pk: number;
	delivery_pk: number;
	picked_click_and_collect: string;
	picked_deliveries: string;
	whichFormik: cartDetailsFormikType;
	totalPrice: number;
	showGratuitDeliveryOne: boolean;
	deliveriesTotalPriceOne: number;
	showGratuitDeliveryTwo: boolean;
	deliveriesTotalPriceTwo: number;
}) {
	yield put(
		setUserLocalCartOrder({
			shop_pk: payload.shop_pk,
			picked_deliveries: payload.picked_deliveries,
			picked_click_and_collect: payload.picked_click_and_collect,
			delivery_pk: payload.delivery_pk,
			whichFormik: payload.whichFormik,
			totalPrice: payload.totalPrice,
			showGratuitDeliveryOne: payload.showGratuitDeliveryOne,
			showGratuitDeliveryTwo: payload.showGratuitDeliveryTwo,
			deliveriesTotalPriceOne: payload.deliveriesTotalPriceOne,
			deliveriesTotalPriceTwo: payload.deliveriesTotalPriceTwo,
		}),
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

export function* watchCart() {
	yield takeLatest(Types.CART_POST_PRODUCT_ROOT, withCallback(cartPostProductRootSaga as Saga));
	yield takeLatest(Types.CART_POST_SERVICE_ROOT, withCallback(cartPostServiceRootSaga as Saga));
	// yield takeLatest(Types.CART_GET_ALL, withCallback(cartGetAllCartSaga as Saga));
	yield takeLatest(Types.CART_GET_CART_COUNTER, withCallback(cartGetCartCounterSaga as Saga));
	yield takeLatest(Types.CART_GET_DETAILS, withCallback(cartGetDetailsSaga as Saga));
	yield takeLatest(Types.CART_DELETE_ROOT, withCallback(cartDeleteRootSaga as Saga));
	yield takeLatest(Types.CART_PATCH_CART_QUANTITY, withCallback(cartPatchQuantitySaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER, withCallback(cartSetLocalCartOrderSaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER_COORDONNEE_DATA, withCallback(cartSetLocalCartOrderCoordonneeDataSaga as Saga));
	yield takeLatest(Types.CART_SET_LOCAL_CART_ORDER_DELIVERIES_DATA, withCallback(cartSetLocalCartOrderDeliveriesDataSaga as Saga));
}
