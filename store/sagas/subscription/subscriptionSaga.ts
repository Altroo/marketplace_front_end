import { call, put, takeLatest } from 'redux-saga/effects';
import * as Types from '../../actions';
import { setAvailableSubscriptions } from '../../slices/subscription/subscriptionSlice';
import { AuthSagaContextType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import { ctxAuthSaga } from '../_init/_initSaga';
import { AxiosInstance } from 'axios';
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { deleteApi, getApi, patchApi, postApi } from '../../services/_init/_initAPI';
import {
	SubscriptionGetAvailableSubscriptionResponseType,
	subscriptionGetIndexedOffersResponseType,
	SubscriptionGetSubscriptionByNbrArticleResponseType,
	subscriptionPostCheckPromoCodeResponseType,
	subscriptionPostRootType,
} from '../../../types/subscription/subscriptionTypes';
import { withCallback } from 'redux-saga-callback';
import { Saga } from 'redux-saga';
import { SUBSCRIPTION_DELETE_SINGLE_INDEXED_ARTICLE, SUBSCRIPTION_PATCH_ROOT } from '../../actions';
import { OfferGetVuesResponseType } from '../../../types/offer/offerTypes';

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

function* subscriptionGetSubscriptionByNbrArticleSaga(payload: { type: string; nbr_article: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_ROOT}/${payload.nbr_article}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: SubscriptionGetSubscriptionByNbrArticleResponseType = yield call(() => getApi(url, authInstance));
		if (response.status === 200) {
			return response.data;
		}
	}
}

function* subscriptionPostRootSaga(payload: subscriptionPostRootType) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_ROOT}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
		if (response.status === 204) {
			return true;
		}
	}
}

function* subscriptionPostIndexArticlesRootSaga(payload: { type: string; pk: number | string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_INDEXED_ARTICLES_ROOT}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() =>
			postApi(url, authInstance, {
				offer_ids: payload.pk,
			}),
		);
		if (response.status === 204) {
			return true;
		}
	}
}

function* subscriptionPatchRootSaga(payload: subscriptionPostRootType) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_ROOT}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => patchApi(url, authInstance, payloadData));
		if (response.status === 204) {
			return true;
		}
	}
}

function* subscriptionPostCheckPromoCodeSaga(payload: { type: string; promo_code: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_CHECK_PROMO_CODE}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// // eslint-disable-next-line @typescript-eslint/no-unused-vars
		// 		const { type, ...payloadData } = payload;
		const response: subscriptionPostCheckPromoCodeResponseType = yield call(() =>
			postApi(url, authInstance, {
				promo_code: payload.promo_code,
			}),
		);
		if (response.status === 200) {
			return response.data;
		}
	}
}

function* subscriptionGetIndexedArticlesSaga(payload: { type: string; url: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: subscriptionGetIndexedOffersResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	}
}

function* subscriptionGetAvailableArticlesSaga(payload: { type: string; url: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: subscriptionGetIndexedOffersResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	}
}

function* subscriptionDeleteSingleIndexedArticleSaga(payload: { type: string; pk: number | string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_INDEXED_ARTICLES_ROOT}${payload.pk}`;
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
		if (response.status === 204) {
			return true;
		}
	}
}

export function* watchSubscription() {
	yield takeLatest(Types.SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS, subscriptionGetAvailableSubscriptionSaga);
	yield takeLatest(
		Types.SUBSCRIPTION_GET_SUBSCRIPTION_BY_NBR_ARTICLE,
		withCallback(subscriptionGetSubscriptionByNbrArticleSaga as Saga),
	);
	yield takeLatest(Types.SUBSCRIPTION_POST_ROOT, withCallback(subscriptionPostRootSaga as Saga));
	yield takeLatest(
		Types.SUBSCRIPTION_POST_INDEXED_ARTICLE_ROOT,
		withCallback(subscriptionPostIndexArticlesRootSaga as Saga),
	);
	yield takeLatest(Types.SUBSCRIPTION_PATCH_ROOT, withCallback(subscriptionPatchRootSaga as Saga));
	yield takeLatest(Types.SUBSCRIPTION_POST_CHECK_PROMO_CODE, withCallback(subscriptionPostCheckPromoCodeSaga as Saga));
	yield takeLatest(Types.SUBSCRIPTION_GET_INDEXED_ARTICLES, withCallback(subscriptionGetIndexedArticlesSaga as Saga));
	yield takeLatest(
		Types.SUBSCRIPTION_GET_AVAILABLE_ARTICLES,
		withCallback(subscriptionGetAvailableArticlesSaga as Saga),
	);
	yield takeLatest(
		Types.SUBSCRIPTION_DELETE_SINGLE_INDEXED_ARTICLE,
		withCallback(subscriptionDeleteSingleIndexedArticleSaga as Saga),
	);
}
