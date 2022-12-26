import * as types from '../index';

export const seoPagesGetAvailableFiltersBySeoPageUrlAction = (url: string) => {
	return {
		type: types.SEO_PAGES_GET_AVAILABLE_FILTERS_BY_SEO_PAGE_URL,
		url,
	};
};

export const seoPagesGetOffersBySeoPageUrlWithQueryParamsAction = (url: string) => {
	return {
		type: types.SEO_PAGES_GET_OFFERS_BY_SEO_PAGE_URL_AND_QUERY_PARAMS,
		url,
	};
};
