import * as Types from "../../actions";
import { withCallback } from "redux-saga-callback";
import { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { AuthSagaContextType, ResponseOnlyInterface } from "../../../types/_init/_initTypes";
import { ctxAuthSaga } from "../_init/_initSaga";
import { AxiosInstance } from "axios";
import { isAuthenticatedInstance } from "../../../utils/helpers";
import { getApi, postApi } from "../../services/_init/_initAPI";
import {
	OrderGetChiffreAffaireResponseType,
	OrderGetOrdersCountResponseType,
	OrdersGetOrdersListResponseType
} from "../../../types/order/orderTypes";
import { setLocalOrdersCount } from "../../slices/order/orderSlice";

function* orderGetChiffreAffaireSaga(payload: {type: string, url: string}) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: OrderGetChiffreAffaireResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	}
}

function* orderGetOrdersCountSaga() {
	const url = `${process.env.NEXT_PUBLIC_ORDER_GET_NEW_ORDERS_COUNT}`;
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: OrderGetOrdersCountResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200 && response.data) {
			yield put(setLocalOrdersCount(response.data.orders_count));
		}
	}
}

function* orderGetOrdersListSaga(payload: {type: string; url: string}) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: OrdersGetOrdersListResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	}
}

function* orderPostAcceptOrderSaga(payload: {type: string; order_pk: number}) {
	const url = `${process.env.NEXT_PUBLIC_ORDER_POST_ACCEPT_ORDER}`
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, {
			order_pk: payload.order_pk,
		}));
		if (response.status === 204) {
			return true;
		}
	}
}

function* orderPostCancelOrderSaga(payload: {type: string; order_pk: number}) {
	const url = `${process.env.NEXT_PUBLIC_ORDER_POST_CANCEL_ORDER}`
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, {
			order_pk: payload.order_pk,
		}));
		if (response.status === 204) {
			return true;
		}
	}
}

export function* watchOrder() {
	yield takeLatest(Types.ORDER_GET_CHIFFRE_AFFAIRE, withCallback(orderGetChiffreAffaireSaga as Saga));
	yield takeLatest(Types.ORDER_GET_ORDERS_COUNT, withCallback(orderGetOrdersCountSaga as Saga));
	yield takeLatest(Types.ORDER_GET_ORDERS_LIST, withCallback(orderGetOrdersListSaga as Saga));
	yield takeLatest(Types.ORDER_POST_ACCEPT_ORDER, withCallback(orderPostAcceptOrderSaga as Saga));
	yield takeLatest(Types.ORDER_POST_CANCEL_ORDER, withCallback(orderPostCancelOrderSaga as Saga));
}