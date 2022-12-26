import { call, takeLatest } from 'redux-saga/effects';
import * as Types from '../../actions';
import { defaultInstance } from '../../../utils/helpers';
import { getApi } from '../../services/_init/_initAPI';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import { withCallback } from 'redux-saga-callback';
import { AxiosInstance } from 'axios';
import { Saga } from 'redux-saga';
import {
	OfferGetMyOffersResponseType,
	OfferGetShopAvailableFiltersResponseType
} from "../../../types/offer/offerTypes";

function* seoPagesGetAvailableFiltersBySeoPageUrl(payload: { type: string; url: string }) {
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_FILTERS}${payload.url}/`;
	const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
	const instance: AxiosInstance = yield call(() => defaultInstance(base_url));
	try {
		const response: OfferGetShopAvailableFiltersResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

function* seoPagesGetOffersBySeoPageUrl(payload: { type: string; url: string }) {
	const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
	const instance: AxiosInstance = yield call(() => defaultInstance(base_url));
	try {
		const response: OfferGetMyOffersResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

export function* watchSeoPages() {
	yield takeLatest(
		Types.SEO_PAGES_GET_AVAILABLE_FILTERS_BY_SEO_PAGE_URL,
		withCallback(seoPagesGetAvailableFiltersBySeoPageUrl as Saga),
	);
	yield takeLatest(
		Types.SEO_PAGES_GET_OFFERS_BY_SEO_PAGE_URL_AND_QUERY_PARAMS,
		withCallback(seoPagesGetOffersBySeoPageUrl as Saga),
	);
}
