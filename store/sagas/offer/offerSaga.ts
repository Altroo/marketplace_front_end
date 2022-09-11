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
	OfferCategoriesType, OfferPostPinResponseType
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
	setLocalOfferDescription,
	setLocalOfferPrice,
	setLocalOfferClickAndCollect,
	setLocalOfferDeliveries,
	emptyLocalOfferDeliveryClickAndCollect,
	emptyLocalOfferDeliveries,
	setMyOffersFirstPageList,
	setPinOffer,
	setMyOffersFirstPageListIsLoading,
	setMyOffersFirstPageListError, myOffersListGETApiErrorAction
} from "../../slices/offer/offerSlice";
import { getMyOffersNextPage, getOfferVuesNextPage } from '../../selectors';
import { NextRouter } from 'next/router';
import {
	OFFER_ADD_PRODUCT_LIVRAISON,
	OFFER_ADD_PRODUCT_PRICE,
	SHOP_EDIT_INDEX
} from "../../../utils/routes";
import { ImageListType as ImageUploadingType } from "react-images-uploading/dist/typings";

function* offerPostRootSaga(payload: OfferPostRootProductType | OfferPostRootServiceType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	const { type, ...payloadData } = payload;
	const {pictures, ...remainingData} = payloadData;
	// const pictures = payloadData.pictures;
	let picture_1 = null;
	let picture_2 = null;
	let picture_3 = null;
	let picture_4 = null;
	if (pictures.length === 1){
		picture_1 = pictures[0].dataURL;
	}else if (pictures.length === 2){
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
	} else if (pictures.length === 3){
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
		picture_3 = pictures[2].dataURL;
	} else if (pictures.length === 4){
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
		picture_3 = pictures[2].dataURL;
		picture_4 = pictures[3].dataURL;
	}
	const dataToSend = {
		...remainingData,
		picture_1,
		picture_2,
		picture_3,
		picture_4
	}
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield* call(() =>
				postFormDataApi(url, instance, {...dataToSend}),
			);
			if (response.status === 200) {
				// update state
				yield* put(appendPostOfferState(response.data));
				yield* call(() => payload.router.push(SHOP_EDIT_INDEX));
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance('multipart/form-data'));
			const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield* call(() =>
				postFormDataApi(url, instance, {...dataToSend}, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				yield* put(appendPostOfferState(response.data));
				yield* call(() => payload.router.push(SHOP_EDIT_INDEX));
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
			}
		} else {
			const instance = yield* call(() => allowAnyInstance());
			const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = yield* call(() =>
				getApi(url, instance),
			);
			if (response.status === 200) {
				yield* put(setSelectedOffer(response.data));
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
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			const response: OfferGetLastUsedLocalisationResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 || response.status === 204) {
				if (response.data) {
					yield* put(setOfferLastUsedLocalisation(response.data));
				}
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
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetMyOffersFirstPageSaga() {
	// create is loading
	yield* put(setMyOffersFirstPageListIsLoading());
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_MY_OFFERS}`;
	const pageUrl = "?page=1";
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// if (payload.page) {
			url += pageUrl;
			// }
			const response: OfferGetMyOffersResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setMyOffersFirstPageList(response.data));
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			// if (payload.page) {
			url += pageUrl;
			// }
			const response: OfferGetMyOffersResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield* put(setMyOffersFirstPageList(response.data));
			}
		}
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		// create is error.
		// yield* put(setMyOffersFirstPageListError(apiError));
		yield* put(yield* call(() => myOffersListGETApiErrorAction(apiError)));
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

function* offerPostPinSaga(payload: {type: string, offer_pk: number}) {
	// pin/<uuid:unique_id>/
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_PIN}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostPinResponseType = yield* call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setPinOffer(response.data));
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
			const response: OfferPostPinResponseType = yield* call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				yield* put(setPinOffer(response.data));
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

function* wsOfferThumbnailSaga(payload: { type: string; pk: number; offer_thumbnail: string }) {
	yield* put(setWSOfferThumbnail({ offer_pk: payload.pk, offer_thumbnail: payload.offer_thumbnail }));
}

function* setOfferCategoriesPageSaga(payload: { type: string; categories: OfferCategoriesType }) {
	yield* put(setLocalOfferCategories(payload.categories));
}

function* setOfferDescriptionPageSaga(payload: {
	type: string;
	title: string;
	pictures: ImageUploadingType;
	// picture_1: string;
	// picture_2: string | null;
	// picture_3: string | null;
	// picture_4: string | null;
	description: string;
	for_whom: string | null;
	product_colors: string | null;
	product_sizes: string | null;
	product_quantity: number | null;
	tags: string | null;
	router: NextRouter;
}) {
	yield* put(
		setLocalOfferDescription({...payload}),
	);
	yield* call(() => payload.router.push(OFFER_ADD_PRODUCT_PRICE));
}

function* setOfferPricePageSaga(payload: {type: string; price: string, price_by: 'U' | 'K' | 'L', router: NextRouter}) {
	const { type, ...payloadData } = payload;
	yield* put(setLocalOfferPrice(payloadData));
	yield* call(() => payload.router.push(OFFER_ADD_PRODUCT_LIVRAISON))
}

function* setOfferDeliveryPageClickAndCollectSaga(payload: {type: string; longitude: number; latitude: number; address_name: string | null}) {
	const { type, ...payloadData } = payload;
	yield* put(setLocalOfferClickAndCollect(payloadData));
}

function* emptyOfferDeliveryClickAndCollectSaga() {
	yield* put(emptyLocalOfferDeliveryClickAndCollect());
}

function* setOfferDeliveryPageDeliveriesSaga(payload: {type: string,
	delivery_city_1: string,
	all_cities_1: boolean,
	delivery_price_1: string,
	delivery_days_1: string,
	delivery_city_2: string,
	all_cities_2: boolean,
	delivery_price_2: string,
	delivery_days_2: string,
	delivery_city_3: string,
	all_cities_3: boolean,
	delivery_price_3: string,
	delivery_days_3: string
}) {
	const {type, ...payloadData} = payload;
	yield* put(setLocalOfferDeliveries(payloadData));
}

function* emptyOfferDeliveriesSaga(payload: {type: string, option: "1" | "2" | "3"}) {
	yield* put(emptyLocalOfferDeliveries(payload.option));
}

// function* offerSetEmptySelectedOfferSaga() {
// 	yield* put(setEmptySelectedOfferState());
// }


export function* watchOffer() {
	yield* takeLatest(Types.SET_OFFER_CATEGORIES_PAGE, setOfferCategoriesPageSaga);
	yield* takeLatest(Types.SET_OFFER_DESCRIPTION_PAGE, setOfferDescriptionPageSaga);
	yield* takeLatest(Types.SET_OFFER_PRICE_PAGE, setOfferPricePageSaga);
	yield* takeLatest(Types.SET_OFFER_DELIVERY_PAGE_CLICK_AND_COLLECT, setOfferDeliveryPageClickAndCollectSaga);
	yield* takeLatest(Types.SET_OFFER_DELIVERY_PAGE_DELIVERIES, setOfferDeliveryPageDeliveriesSaga);
	yield* takeLatest(Types.EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT, emptyOfferDeliveryClickAndCollectSaga);
	yield* takeLatest(Types.EMPTY_OFFER_DELIVERIES, emptyOfferDeliveriesSaga);
	yield* takeLatest(Types.OFFER_POST_ROOT, offerPostRootSaga);
	yield* takeLatest(Types.OFFER_GET_ROOT, offerGetRootSaga);
	// yield* takeLatest(Types.OFFER_SET_EMPTY_SELECTED_OFFER, offerSetEmptySelectedOfferSaga);
	yield* takeLatest(Types.OFFER_PUT_ROOT, offerPutRootSaga);
	yield* takeLatest(Types.OFFER_GET_TAGS, offerGetTagsSaga);
	yield* takeLatest(Types.OFFER_GET_LOCALISATION, offerGetLastUsedLocalisationSaga);
	yield* takeLatest(Types.OFFER_GET_DELIVERIES, offerGetLastThreeUsedDeliveriesSaga);
	yield* takeLatest(Types.OFFER_GET_MY_OFFERS, offerGetMyOffersSaga);
	yield* takeLatest(Types.OFFER_GET_MY_OFFERS_FIRST_PAGE, offerGetMyOffersFirstPageSaga);
	yield* takeLatest(Types.OFFER_POST_PIN, offerPostPinSaga);
	yield* takeLatest(Types.OFFER_POST_SOLDER, offerPostSolderSaga);
	yield* takeLatest(Types.OFFER_GET_SOLDER, offerGetSolderSaga);
	yield* takeLatest(Types.OFFER_PATCH_SOLDER, offerPatchSolderSaga);
	yield* takeLatest(Types.OFFER_DELETE_SOLDER, offerDeleteSolderSaga);
	yield* takeLatest(Types.OFFER_DELETE_ROOT, offerDeleteRootSaga);
	yield* takeLatest(Types.OFFER_GET_VUES, offerGetVuesSaga);
	yield* takeLatest(Types.WS_OFFER_THUMBNAIL, wsOfferThumbnailSaga);
}
