import { call, put, takeLatest, select } from 'typed-redux-saga/macro';
import { ctxAuthSaga } from '../_init/_initSaga';
import { allowAnyInstance, isAuthenticatedInstance } from '../../../utils/helpers';
import { getApi, patchApi, postFormDataApi, postApi, putFormDataApi, deleteApi } from '../../services/_init/_initAPI';
import { ApiErrorResponseType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import * as Types from '../../actions';
import {
	OfferGetLastThreeUsedDeliveriesResponseType,
	OfferGetLastUsedLocalisationResponseType,
	OfferGetMyOffersResponseType,
	OfferGetRootProductResponseType,
	OfferGetRootServiceResponseType,
	OfferPkRootType,
	OfferGetTagsResponseType,
	OfferGetTagsType,
	OfferOfferTypeType,
	OfferPostRootProductResponseType,
	OfferPostRootProductType,
	OfferPostRootServiceResponseType,
	OfferPostRootServiceType,
	OfferPutRootProductType,
	OfferPutRootServiceType,
	OfferPutRootProductResponseType,
	OfferPutRootServiceResponseType,
	OfferPostSolderResponseType,
	OfferPostSolderType,
	OfferGetVuesResponseType,
	OfferCategoriesType
} from "../../../types/offer/offerTypes";
import {
	appendPostOfferState,
	setOfferLastThreeUsedDeliveries,
	setOfferLastUsedLocalisation,
	setSelectedOfferTags,
	setSelectedOffer,
	setMyOffersList,
	setPutOffer,
	deleteUserOffer,
	setSolderOffer,
	setGetSolderOffer,
	deleteSolderOffer,
	setOfferVuesList,
	setWSOfferThumbnail,
	setLocalOfferCategories,
} from '../../slices/offer/offerSlice';
import { getMyOffersNextPage, getOfferVuesNextPage } from '../../selectors';

function* offerPostRootSaga(payload: OfferPostRootProductType | OfferPostRootServiceType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield* call(() =>
				postFormDataApi(url, instance, payload),
			);
			if (response.status === 200) {
				// update state
				yield* put(appendPostOfferState(response.data));
			} else {
				// set error state
				console.log(response.data);
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance('multipart/form-data'));
			const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield* call(() =>
				postFormDataApi(url, instance, payload, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				yield* put(appendPostOfferState(response.data));
			} else {
				// set error state
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

function* offerGetRootSaga(payload: OfferPkRootType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/${payload.pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = yield* call(() =>
				getApi(url, instance),
			);
			if (response.status === 200) {
				// update state
				yield* put(setSelectedOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else {
			const instance = yield* call(() => allowAnyInstance());
			const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = yield* call(() =>
				getApi(url, instance),
			);
			if (response.status === 200) {
				yield* put(setSelectedOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerGetTagsSaga(payload: OfferGetTagsType) {
	const url = `${process.env.NEXT_PUBLIC_OFFER_TAGS}`;
	const params = { name_tag: payload.nameTag };
	try {
		const instance = yield* call(() => allowAnyInstance());
		const response: OfferGetTagsResponseType = yield* call(() => getApi(url, instance, params));
		if (response.status === 200) {
			yield* put(setSelectedOfferTags(response.data));
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetLastUsedLocalisationSaga(payload: { type: string; offer_type: OfferOfferTypeType }) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_LOCALISATION}${payload.offer_type}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: OfferGetLastUsedLocalisationResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 || response.status === 204) {
				if (response.data) {
					yield* put(setOfferLastUsedLocalisation(response.data));
				}
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			const response: OfferGetLastUsedLocalisationResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 || response.status === 204) {
				if (response.data) {
					yield* put(setOfferLastUsedLocalisation(response.data));
				}
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetLastThreeUsedDeliveriesSaga() {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_DELIVERIES}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: OfferGetLastThreeUsedDeliveriesResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setOfferLastThreeUsedDeliveries(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			const response: OfferGetLastThreeUsedDeliveriesResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setOfferLastThreeUsedDeliveries(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetMyOffersSaga() {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_MY_OFFERS}`;
	const nextPage = yield* select(getMyOffersNextPage);
	let page = 1;
	if (nextPage) {
		// const params = new URLSearchParams('http:...?page=2&filter_gender=m&filter_price=asc')
		// Object.fromEntries(params);
		// Load next items.
		const queryIndex = nextPage.search('=');
		page = parseInt(nextPage.slice(queryIndex + 1)[0]);
	}
	const pageUrl = `?page=${page}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// if (payload.page) {
			url += pageUrl;
			// }
			const response: OfferGetMyOffersResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setMyOffersList(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			// if (payload.page) {
			url += pageUrl;
			// }
			const response: OfferGetMyOffersResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setMyOffersList(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerPutRootSaga(payload: OfferPutRootProductType | OfferPutRootServiceType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: OfferPutRootProductResponseType | OfferPutRootServiceResponseType = yield* call(() =>
				putFormDataApi(url, instance, payload),
			);
			if (response.status === 200) {
				// update state
				yield* put(setPutOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance('multipart/form-data'));
			const response: OfferPutRootProductResponseType | OfferPutRootServiceResponseType = yield* call(() =>
				putFormDataApi(url, instance, payload, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				yield* put(setPutOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerDeleteRootSaga(payload: { type: string; pk: number }) {
	// /<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.pk}/`;
			const response: ResponseOnlyInterface = yield* call(() => deleteApi(url, instance));
			if (response.status === 204) {
				// update state
				yield* put(deleteUserOffer({ offer_pk: payload.pk }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.pk}/`;
			const response: ResponseOnlyInterface = yield* call(() => deleteApi(url, instance));
			if (response.status === 204) {
				yield* put(deleteUserOffer({ offer_pk: payload.pk }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerPostSolderSaga(payload: OfferPostSolderType) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				yield* put(setSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerGetSolderSaga(payload: { type: string; offer_pk: number }) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200) {
				// update state
				yield* put(setGetSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200) {
				yield* put(setGetSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerPatchSolderSaga(payload: OfferPostSolderType) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				yield* put(setSolderOffer(response.data));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerDeleteSolderSaga(payload: { type: string; offer_pk: number }) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: ResponseOnlyInterface = yield* call(() => deleteApi(url, instance));
			if (response.status === 204) {
				// update state
				yield* put(deleteSolderOffer({ offer_pk: payload.offer_pk }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
			const response: ResponseOnlyInterface = yield* call(() => deleteApi(url, instance));
			if (response.status === 204) {
				yield* put(deleteSolderOffer({ offer_pk: payload.offer_pk }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerGetVuesSaga() {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_VUES}`;
	const nextPage = yield* select(getOfferVuesNextPage);
	let page = 1;
	if (nextPage) {
		const queryIndex = nextPage.search('=');
		page = parseInt(nextPage.slice(queryIndex + 1)[0]);
		const pageUrl = `?page=${page}`;
		try {
			if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
				const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
				url += pageUrl;
				const response: OfferGetVuesResponseType = yield* call(() => getApi(url, instance));
				if (response.status === 200 && response.data) {
					yield* put(setOfferVuesList(response.data));
				} else {
					// set error state
					console.log(response.status);
				}
			}
		} catch (e) {
			const errors = e as ApiErrorResponseType;
			console.log(errors);
		}
	}
}

function* wsOfferThumbnailSaga(payload: {type: string, pk: number, offer_thumbnail: string}) {
	yield* put(setWSOfferThumbnail({offer_pk: payload.pk, offer_thumbnail: payload.offer_thumbnail}));
}

function* setOfferCategoriesSaga(payload: {type: string, categories: OfferCategoriesType}) {
	yield* put(setLocalOfferCategories(payload.categories));
}

export function* watchOffer() {
	yield* takeLatest(Types.SET_OFFER_CATEGORIES, setOfferCategoriesSaga);
	yield* takeLatest(Types.OFFER_POST_ROOT, offerPostRootSaga);
	yield* takeLatest(Types.OFFER_GET_ROOT, offerGetRootSaga);
	yield* takeLatest(Types.OFFER_PUT_ROOT, offerPutRootSaga);
	yield* takeLatest(Types.OFFER_GET_TAGS, offerGetTagsSaga);
	yield* takeLatest(Types.OFFER_GET_LOCALISATION, offerGetLastUsedLocalisationSaga);
	yield* takeLatest(Types.OFFER_GET_DELIVERIES, offerGetLastThreeUsedDeliveriesSaga);
	yield* takeLatest(Types.OFFER_GET_MY_OFFERS, offerGetMyOffersSaga);
	yield* takeLatest(Types.OFFER_POST_SOLDER, offerPostSolderSaga);
	yield* takeLatest(Types.OFFER_GET_SOLDER, offerGetSolderSaga);
	yield* takeLatest(Types.OFFER_PATCH_SOLDER, offerPatchSolderSaga);
	yield* takeLatest(Types.OFFER_DELETE_SOLDER, offerDeleteSolderSaga);
	yield* takeLatest(Types.OFFER_DELETE_ROOT, offerDeleteRootSaga);
	yield* takeLatest(Types.OFFER_GET_VUES, offerGetVuesSaga);
	yield* takeLatest(Types.WS_OFFER_THUMBNAIL, wsOfferThumbnailSaga);
}
