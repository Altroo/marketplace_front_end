import * as Types from "../../actions";
import { call, takeLatest } from "redux-saga/effects";
import { withCallback } from "redux-saga-callback";
import { Saga } from "redux-saga";
import {
	CartPostProductRootResponseType,
	CartPostProductRootSagaPayload, CartPostServiceRootResponseType,
	CartPostServiceRootSagaPayload
} from "../../../types/cart/cartTypes";
import { AxiosInstance } from "axios";
import { allowAnyInstance } from "../../../utils/helpers";
import { ApiErrorResponseType } from "../../../types/_init/_initTypes";
import { postApi } from "../../services/_init/_initAPI";

function* cartPostProductRootSaga(payload: CartPostProductRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: CartPostProductRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			// PUT INTO CART SLICE
			// yield put(setPasswordResetSent(true));
			return true;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

function* cartPostServiceRootSaga(payload: CartPostServiceRootSagaPayload) {
	const url = `${process.env.NEXT_PUBLIC_CART_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: CartPostServiceRootResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			// PUT INTO CART SLICE
			// yield put(setPasswordResetSent(true));
			return true;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

export function* watchCart() {
    yield takeLatest(Types.CART_POST_PRODUCT_ROOT, withCallback(cartPostProductRootSaga as Saga));
    yield takeLatest(Types.CART_POST_SERVICE_ROOT, withCallback(cartPostServiceRootSaga as Saga));
}