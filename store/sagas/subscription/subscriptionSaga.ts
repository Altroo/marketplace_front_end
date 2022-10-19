import { call, put, takeLatest } from "redux-saga/effects";
import * as Types from "../../actions";
import {setAvailableSubscriptions} from '../../slices/subscription/subscriptionSlice';
import { AuthSagaContextType } from "../../../types/_init/_initTypes";
import { ctxAuthSaga } from "../_init/_initSaga";
import { AxiosInstance } from "axios";
import { isAuthenticatedInstance } from "../../../utils/helpers";
import { getApi } from "../../services/_init/_initAPI";
import { SubscriptionGetAvailableSubscriptionResponseType } from "../../../types/subscription/subscriptionTypes";

function* subscriptionGetAvailableSubscriptionSaga() {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_AVAILABLE_SUBSCRIPTION}`;
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: SubscriptionGetAvailableSubscriptionResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setAvailableSubscriptions(response.data));
			}
	}
}

export function* watchSubscription() {
	yield takeLatest(Types.SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS, subscriptionGetAvailableSubscriptionSaga);
}