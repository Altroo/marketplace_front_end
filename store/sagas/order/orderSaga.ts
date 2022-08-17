import { put, takeLatest, call, select } from 'typed-redux-saga/macro';
import * as Types from "../../actions";
import { ctxAuthSaga } from '../_init/_initSaga';
import { getMyBuyingsListNextPage, getMySellingsListNextPage } from '../../selectors';
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { getApi } from '../../services/_init/_initAPI';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import { setBuyingsListState, setSellingsListState } from '../../slices/order/orderSlice';
import { OrderGetBuyingsSellingsResponseType } from '../../../types/order/orderTypes';

function* orderGetBuyingsSaga() {
    const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_ORDER_BUYINGS}`;
	const nextPage = yield* select(getMyBuyingsListNextPage);
	let page = 1;
	if (nextPage) {
		const queryIndex = nextPage.search('=');
		page = parseInt(nextPage.slice(queryIndex + 1)[0]);
	}
	const pageUrl = `?page=${page}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += pageUrl;
			const response: OrderGetBuyingsSellingsResponseType = yield* call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield* put(setBuyingsListState(response.data));
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

function* orderGetSellingsSaga() {
    const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_ORDER_SELLINGS}`;
	const nextPage = yield* select(getMySellingsListNextPage);
	let page = 1;
	if (nextPage) {
		const queryIndex = nextPage.search('=');
		page = parseInt(nextPage.slice(queryIndex + 1)[0]);
	}
	const pageUrl = `?page=${page}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += pageUrl;
			const response: OrderGetBuyingsSellingsResponseType = yield* call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield* put(setSellingsListState(response.data));
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

export function* watchOrder() {
    yield* takeLatest(Types.ORDER_GET_BUYINGS, orderGetBuyingsSaga)
    yield* takeLatest(Types.ORDER_GET_SELLINGS, orderGetSellingsSaga)
}