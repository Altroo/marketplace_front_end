import { call, put, takeLatest } from 'redux-saga/effects';
import { ctxAuthSaga } from '../_init/_initSaga';
import { allowAnyInstance, defaultInstance, isAuthenticatedInstance } from '../../../utils/helpers';
import { getApi, patchApi, postFormDataApi, postApi, putFormDataApi, deleteApi } from '../../services/_init/_initAPI';
import { ApiErrorResponseType, AuthSagaContextType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import * as Types from '../../actions';
import {
	OfferGetLastThreeUsedDeliveriesResponseType,
	OfferGetLastUsedLocalisationResponseType,
	OfferGetMyOffersResponseType,
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
	OfferCategoriesType,
	OfferPostPinResponseType,
	OfferGetShopAvailableFiltersResponseType,
	OfferGetServicesDaysResponseType,
	setOfferProductToEditPayloadType,
	setOfferServiceToEditPayloadType
} from "../../../types/offer/offerTypes";
import {
	appendPostOfferState,
	setOfferLastUsedLocalisation,
	setSelectedOfferTags,
	setPutOffer,
	deleteUserOffer,
	setSolderOffer,
	deleteSolderOffer,
	setLocalOfferProductCategories,
	setLocalOfferProductDescription,
	setLocalOfferProductPrice,
	setLocalOfferClickAndCollect,
	setLocalOfferDeliveries,
	emptyLocalOfferDeliveryClickAndCollect,
	emptyLocalOfferDeliveries,
	setMyOffersFirstPageList,
	setPinOffer,
	setMyOffersFirstPageListIsLoading,
	myOffersListGETApiErrorAction,
	setLocalOfferProductMultiCategories,
	setLocalOfferProductToEditPk,
	setPutOfferIsLoading,
	offersPUTApiErrorAction,
	emptyUserLocalOffer,
	offersDELETEApiErrorAction,
	setDeleteOfferIsLoading,
	setLocalOfferServiceCategories,
	setLocalOfferServiceLocalisation,
	setLocalOfferServiceDescription,
	setLocalOfferServicePrice,
	setLocalOfferServiceToEditPk,
	setLocalOfferServiceMultiCategories,
	setWSOfferPicture4,
	setWSOfferThumbnail4,
	setWSOfferThumbnail3,
	setWSOfferThumbnail2,
	setWSOfferThumbnail1,
	setWSOfferPicture2, setWSOfferPicture3, setWSOfferPicture1
} from "../../slices/offer/offerSlice";
import { NextRouter } from 'next/router';
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';
import { withCallback } from 'redux-saga-callback';
import { AxiosInstance } from 'axios';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';
import { ShopZoneByType } from '../../../types/shop/shopTypes';

function* offerPostRootSaga(payload: OfferPostRootProductType | OfferPostRootServiceType) {
	// yield put(appendPostOfferIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	const { type, onComplete, ...payloadData } = payload;
	const { pictures, ...remainingData } = payloadData;
	let picture_1 = null;
	let picture_2 = null;
	let picture_3 = null;
	let picture_4 = null;
	if (pictures.length === 1) {
		picture_1 = pictures[0].dataURL;
	} else if (pictures.length === 2) {
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
	} else if (pictures.length === 3) {
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
		picture_3 = pictures[2].dataURL;
	} else if (pictures.length === 4) {
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
		picture_4,
	};
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() =>
			isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
		);
		const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield call(() =>
			postFormDataApi(url, instance, { ...dataToSend }),
		);
		if (response.status === 200) {
			// update state
			yield put(appendPostOfferState(response.data));
			return response;
		}
	}
	// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
	// 	const instance: AxiosInstance = yield call(() => allowAnyInstance('multipart/form-data'));
	// 	const response: OfferPostRootProductResponseType | OfferPostRootServiceResponseType = yield call(() =>
	// 		postFormDataApi(url, instance, { ...dataToSend }, authSagaContext.initStateUniqueID.unique_id),
	// 	);
	// 	if (response.status === 200) {
	// 		yield put(appendPostOfferState(response.data));
	// 		return response;
	// 	}
	// }
}

function* offerGetTagsSaga(payload: OfferGetTagsType) {
	const url = `${process.env.NEXT_PUBLIC_OFFER_TAGS}`;
	const params = { name_tag: payload.nameTag };
	try {
		const instance: AxiosInstance = yield call(() => allowAnyInstance());
		const response: OfferGetTagsResponseType = yield call(() => getApi(url, instance, params));
		if (response.status === 200) {
			yield put(setSelectedOfferTags(response.data));
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetLastUsedLocalisationSaga(payload: { type: string; offer_type: OfferOfferTypeType }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_LOCALISATION}${payload.offer_type}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: OfferGetLastUsedLocalisationResponseType = yield call(() => getApi(url, instance));
			if (response.status === 200 || response.status === 204) {
				if (response.data) {
					yield put(setOfferLastUsedLocalisation(response.data));
				}
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/`;
		// 	const response: OfferGetLastUsedLocalisationResponseType = yield call(() => getApi(url, instance));
		// 	if (response.status === 200 || response.status === 204) {
		// 		if (response.data) {
		// 			yield put(setOfferLastUsedLocalisation(response.data));
		// 		}
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* offerGetLastThreeUsedDeliveriesSaga() {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_DELIVERIES}`;
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: OfferGetLastThreeUsedDeliveriesResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200 && response.data) {
			yield put(setLocalOfferDeliveries(response.data));
		}
	}
	// 	else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
	// 		const instance: AxiosInstance = yield call(() => allowAnyInstance());
	// 		url += `${authSagaContext.initStateUniqueID.unique_id}/`;
	// 		const response: OfferGetLastThreeUsedDeliveriesResponseType = yield call(() => getApi(url, instance));
	// 		if (response.status === 200 && response.data) {
	// 			yield put(setLocalOfferDeliveries(response.data));
	// 		}
	// 	}
	// } catch (e) {
	// 	const errors = e as ApiErrorResponseType;
	// 	console.log(errors);
	// }
}

function* offerGetMyOffersFirstPageSaga() {
	// create is loading
	yield put(setMyOffersFirstPageListIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_MY_OFFERS}`;
	const pageUrl = '?page=1';
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += pageUrl;
			const response: OfferGetMyOffersResponseType = yield call(() => getApi(url, instance));
			if (response.status === 200 && response.data) {
				yield put(setMyOffersFirstPageList(response.data));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/`;
		// 	url += pageUrl;
		// 	const response: OfferGetMyOffersResponseType = yield call(() => getApi(url, instance));
		// 	if (response.status === 200 && response.data) {
		// 		yield put(setMyOffersFirstPageList(response.data));
		// 	}
		// }
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(
			yield call(() => myOffersListGETApiErrorAction(apiError)),
		);
	}
}

function* offerGetOffersByShopNewIDSaga(payload: { type: string; url: string }) {
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

function* offerGetAvailableFiltersByShopIDSaga(payload: { type: string; pk: number }) {
	const url = `${process.env.NEXT_PUBLIC_OFFER_FILTERS}${payload.pk}/`;
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

function* offerGetAvailableFiltersByUniqueIDSaga(payload: { type: string; unique_id: string }) {
	const url = `${process.env.NEXT_PUBLIC_OFFER_FILTERS}${payload.unique_id}/`;
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

function* offerPutRootSaga(payload: OfferPutRootProductType | OfferPutRootServiceType) {
	yield put(setPutOfferIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/`;
	const { type, onComplete, ...payloadData } = payload;
	const { pictures, ...remainingData } = payloadData;
	let picture_1 = null;
	let picture_2 = null;
	let picture_3 = null;
	let picture_4 = null;
	if (pictures.length === 1) {
		picture_1 = pictures[0].dataURL;
	} else if (pictures.length === 2) {
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
	} else if (pictures.length === 3) {
		picture_1 = pictures[0].dataURL;
		picture_2 = pictures[1].dataURL;
		picture_3 = pictures[2].dataURL;
	} else if (pictures.length === 4) {
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
		picture_4,
	};
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: OfferPutRootProductResponseType | OfferPutRootServiceResponseType = yield call(() =>
				putFormDataApi(url, instance, { ...dataToSend }),
			);
			if (response.status === 200) {
				// update state
				yield put(setPutOffer(response.data));
				yield put(emptyUserLocalOffer());
				return response;
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance('multipart/form-data'));
		// 	const response: OfferPutRootProductResponseType | OfferPutRootServiceResponseType = yield call(() =>
		// 		putFormDataApi(url, instance, { ...dataToSend }, authSagaContext.initStateUniqueID.unique_id),
		// 	);
		// 	if (response.status === 200) {
		// 		yield put(setPutOffer(response.data));
		// 		yield put(emptyUserLocalOffer());
		// 		return response;
		// 	}
		// }
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => offersPUTApiErrorAction(apiError)));
	}
}

function* offerDeleteRootSaga(payload: { type: string; pk: number }) {
	// /<uuid:unique_id>/<int:offer_pk>/
	yield put(setDeleteOfferIsLoading());
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `/${payload.pk}/`;
			const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
			if (response.status === 204) {
				// update state
				yield put(deleteUserOffer({ offer_pk: payload.pk }));
				return true;
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `/uuid/${authSagaContext.initStateUniqueID.unique_id}/${payload.pk}/`;
		// 	const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
		// 	if (response.status === 204) {
		// 		yield put(deleteUserOffer({ offer_pk: payload.pk }));
		// 		return true;
		// 	}
		// }
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => offersDELETEApiErrorAction(apiError)));
		// set error state
	}
}

function* offerPostSolderSaga(payload: OfferPostSolderType) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, router, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setSolderOffer(response.data));
				// reload page
				yield call(() => router.replace(payload.router.asPath));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
		// 	const response: OfferPostSolderResponseType = yield call(() => postApi(url, instance, payloadData));
		// 	if (response.status === 200) {
		// 		yield put(setSolderOffer(response.data));
		// 		yield call(() => payload.router.replace(payload.router.asPath));
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerPostPinSaga(payload: { type: string; offer_pk: number }) {
	// pin/<uuid:unique_id>/
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_PIN}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostPinResponseType = yield call(() => postApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setPinOffer(response.data));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
		// 	const response: OfferPostPinResponseType = yield call(() => postApi(url, instance, payloadData));
		// 	if (response.status === 200) {
		// 		yield put(setPinOffer(response.data));
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerPostPinCallBackSaga(payload: { type: string; offer_pk: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_PIN}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostPinResponseType = yield call(() => postApi(url, instance, payloadData));
			if (response.status === 200 && response.data) {
				// update state
				return response.data;
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
		// 	const response: OfferPostPinResponseType = yield call(() => postApi(url, instance, payloadData));
		// 	if (response.status === 200 && response.data) {
		// 		return response.data;
		// 	}
		// }
	} catch (e) {
		return e as ApiErrorResponseType;
		// set error state
	}
}

function* offerPatchSolderSaga(payload: OfferPostSolderType) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, router, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: OfferPostSolderResponseType = yield call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield put(setSolderOffer(response.data));
				yield call(() => router.replace(payload.router.asPath));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
		// 	const response: OfferPostSolderResponseType = yield call(() => patchApi(url, instance, payloadData));
		// 	if (response.status === 200) {
		// 		yield put(setSolderOffer(response.data));
		// 		yield call(() => payload.router.replace(payload.router.asPath));
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerDeleteSolderSaga(payload: { type: string; offer_pk: number; router: NextRouter }) {
	// solder/<uuid:unique_id>/<int:offer_pk>/
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_OFFER_SOLDER}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += `${payload.offer_pk}/`;
			const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
			if (response.status === 204) {
				// update state
				yield put(deleteSolderOffer({ offer_pk: payload.offer_pk }));
				yield call(() => payload.router.replace(payload.router.asPath));
			}
		}
		// else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
		// 	const instance: AxiosInstance = yield call(() => allowAnyInstance());
		// 	url += `${authSagaContext.initStateUniqueID.unique_id}/${payload.offer_pk}/`;
		// 	const response: ResponseOnlyInterface = yield call(() => deleteApi(url, instance));
		// 	if (response.status === 204) {
		// 		yield put(deleteSolderOffer({ offer_pk: payload.offer_pk }));
		// 		yield call(() => payload.router.replace(payload.router.asPath));
		// 	}
		// }
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* offerGetVuesSaga(payload: {type: string, url: string}) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: OfferGetVuesResponseType = yield call(() => getApi(payload.url, instance));
		if (response.status === 200 && response.data) {
			return response.data;
		}
	}
}

function* setOfferProductCategoriesPageSaga(payload: { type: string; categories: OfferCategoriesType }) {
	yield put(setLocalOfferProductCategories(payload.categories));
}

function* setOfferServiceCategoriesPageSaga(payload: { type: string; categories: OfferCategoriesType }) {
	yield put(setLocalOfferServiceCategories(payload.categories));
}

function* setOfferServiceLocalisationSaga(payload: {
	type: string;
	service_zone_by: ShopZoneByType | null;
	service_longitude: number | null;
	service_latitude: number | null;
	service_address: string | null;
	service_km_radius: number | null;
}) {
	const serviceLocalisation = {
		service_zone_by: payload.service_zone_by,
		service_longitude: payload.service_longitude,
		service_latitude: payload.service_latitude,
		service_address: payload.service_address,
		service_km_radius: payload.service_km_radius,
	}
	yield put(setLocalOfferServiceLocalisation(serviceLocalisation));
}

function* setOfferProductDescriptionPageSaga(payload: {
	type: string;
	title: string;
	pictures: ImageUploadingType;
	description: string;
	for_whom: string | null;
	product_colors: string | null;
	product_sizes: string | null;
	product_quantity: number | null;
	made_in: string;
	creator: boolean;
	// tags: string | null;
}) {
	yield put(setLocalOfferProductDescription({ ...payload }));
	return true;
}

function* setOfferServiceDescriptionPageSaga(payload: {
	title: string,
	pictures: ImageUploadingType,
	description: string,
	for_whom: string | null,
	service_availability_days: string,
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	// tags: string | null,
}) {
	const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
	const url = `${process.env.NEXT_PUBLIC_OFFER_GET_SERVICES_DAYS}`;
	const instance: AxiosInstance = yield call(() => defaultInstance(base_url));
	try {
		const response: OfferGetServicesDaysResponseType = yield call(() => postApi(url, instance, {
			availability_days: payload.service_availability_days,
		}));
		if (response.status === 200 && response.data) {
			const newPayload = {
				title: payload.title,
				pictures: payload.pictures,
				description: payload.description,
				for_whom: payload.for_whom,
				service_availability_days: response.data,
				service_morning_hour_from: payload.service_morning_hour_from,
				service_morning_hour_to: payload.service_morning_hour_to,
				service_afternoon_hour_from: payload.service_afternoon_hour_from,
				service_afternoon_hour_to: payload.service_afternoon_hour_to,
				// tags: payload.tags,
			}
			yield put(setLocalOfferServiceDescription(newPayload));
			return true;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

function* setOfferProductPricePageSaga(payload: { type: string; price: string; price_by: 'U' | 'K' | 'L' }) {
	const { type, ...payloadData } = payload;
	yield put(setLocalOfferProductPrice(payloadData));
	return true;
}

function* setOfferServicePricePageSaga(payload: { type: string; price: string; service_price_by: "H" | "J" | "S" | "M" | "P" }) {
	const { type, ...payloadData } = payload;
	yield put(setLocalOfferServicePrice(payloadData));
}

function* setOfferDeliveryPageClickAndCollectSaga(payload: {
	type: string;
	longitude: number;
	latitude: number;
	address_name: string | null;
}) {
	const { type, ...payloadData } = payload;
	yield put(setLocalOfferClickAndCollect(payloadData));
}

function* emptyOfferDeliveryClickAndCollectSaga() {
	yield put(emptyLocalOfferDeliveryClickAndCollect());
}

function* setOfferDeliveryPageDeliveriesSaga(payload: {
	type: string;
	delivery_city_1: string;
	all_cities_1: boolean;
	delivery_price_1: string;
	delivery_days_1: string;
	delivery_city_2: string;
	all_cities_2: boolean;
	delivery_price_2: string;
	delivery_days_2: string;
	delivery_city_3: string;
	all_cities_3: boolean;
	delivery_price_3: string;
	delivery_days_3: string;
}) {
	const { type, ...payloadData } = payload;
	yield put(setLocalOfferDeliveries(payloadData));
}

function* emptyOfferDeliveriesSaga(payload: { type: string; option: '1' | '2' | '3' }) {
	yield put(emptyLocalOfferDeliveries(payload.option));
}

function* setOfferProductToEditSaga(payload: setOfferProductToEditPayloadType) {
	// Set categories page
	yield put(setLocalOfferProductToEditPk(payload.pk as number));
	yield put(setLocalOfferProductMultiCategories(payload.categoriesList));
	// Set description page
	const description = {
		// type: payload.type,
		title: payload.title as string,
		description: payload.description as string,
		pictures: payload.pictures,
		for_whom: payload.forWhom,
		product_colors: payload.colors,
		product_sizes: payload.sizes,
		made_in: payload.made_in,
		creator: payload.creator,
		product_quantity: payload.quantity,
		// tags: payload.tags,
	};
	yield put(setLocalOfferProductDescription(description));
	// Set price page
	yield put(setLocalOfferProductPrice({ price: payload.prix as string, price_by: payload.prix_par as 'L' | 'U' | 'K' }));
	// Set deliveries page
	const clickAndCollect = {
		longitude: payload.clickAndCollect.longitude,
		latitude: payload.clickAndCollect.latitude,
		address_name: payload.clickAndCollect.address_name,
	};
	yield put(setLocalOfferClickAndCollect(clickAndCollect));
	const deliveries = {
		delivery_city_1: payload.deliveries.delivery_city_1 as string,
		all_cities_1: payload.deliveries.all_cities_1 as boolean,
		delivery_price_1: payload.deliveries.delivery_price_1 as string,
		delivery_days_1: payload.deliveries.delivery_days_1 as string,
		delivery_city_2: payload.deliveries.delivery_city_2 as string,
		all_cities_2: payload.deliveries.all_cities_2 as boolean,
		delivery_price_2: payload.deliveries.delivery_price_2 as string,
		delivery_days_2: payload.deliveries.delivery_days_2 as string,
		delivery_city_3: payload.deliveries.delivery_city_3 as string,
		all_cities_3: payload.deliveries.all_cities_3 as boolean,
		delivery_price_3: payload.deliveries.delivery_price_3 as string,
		delivery_days_3: payload.deliveries.delivery_days_3 as string,
	};
	yield put(setLocalOfferDeliveries(deliveries));
	return true;
}

function* setOfferServiceToEditSaga(payload: setOfferServiceToEditPayloadType) {
	// Set categories page
	yield put(setLocalOfferServiceToEditPk(payload.pk as number));
	yield put(setLocalOfferServiceMultiCategories(payload.categoriesList));
	// Set description page
	const newPayload = {
		title: payload.title,
		pictures: payload.pictures,
		description: payload.description,
		for_whom: payload.forWhom,
		service_availability_days: payload.service_availability_days,
		service_morning_hour_from: payload.service_morning_hour_from,
		service_morning_hour_to: payload.service_morning_hour_to,
		service_afternoon_hour_from: payload.service_afternoon_hour_from,
		service_afternoon_hour_to: payload.service_afternoon_hour_to,
		// tags: payload.tags,
	}
	yield put(setLocalOfferServiceDescription(newPayload));
	// Set localisation
	const serviceLocalisation = {
		service_zone_by: payload.service_zone_by,
		service_longitude: payload.service_longitude,
		service_latitude: payload.service_latitude,
		service_address: payload.service_address,
		service_km_radius: payload.service_km_radius,
	}
	yield put(setLocalOfferServiceLocalisation(serviceLocalisation));
	// Set price
	const pricePayload = {
		price: payload.price as string,
		service_price_by: payload.service_price_by as "H" | "J" | "S" | "M" | "P",
	}
	yield put(setLocalOfferServicePrice(pricePayload));
	return true;
}

function* offerSetEmptyUserLocalOfferSaga() {
	yield put(emptyUserLocalOffer());
}


function* wsOfferPicture1Saga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferPicture1({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture1ThumbSaga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferThumbnail1({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture2Saga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferPicture2({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture2ThumbSaga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferThumbnail2({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture3Saga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferPicture3({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture3ThumbSaga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferThumbnail3({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture4Saga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferPicture4({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

function* wsOfferPicture4ThumbSaga(payload: { type: string; pk: number; offer_picture: string }) {
	yield put(setWSOfferThumbnail4({ offer_pk: payload.pk, offer_picture: payload.offer_picture }));
}

export function* watchOffer() {
	yield takeLatest(Types.SET_OFFER_PRODUCT_CATEGORIES_PAGE, setOfferProductCategoriesPageSaga);
	yield takeLatest(Types.SET_OFFER_SERVICE_CATEGORIES_PAGE, setOfferServiceCategoriesPageSaga);
	yield takeLatest(Types.SET_OFFER_SERVICE_LOCALISATION, setOfferServiceLocalisationSaga);
	yield takeLatest(Types.SET_OFFER_PRODUCT_DESCRIPTION_PAGE, withCallback(setOfferProductDescriptionPageSaga as Saga));
	yield takeLatest(Types.SET_OFFER_SERVICE_DESCRIPTION_PAGE, withCallback(setOfferServiceDescriptionPageSaga as Saga));
	yield takeLatest(Types.SET_OFFER_PRODUCT_PRICE_PAGE, withCallback(setOfferProductPricePageSaga as Saga));
	yield takeLatest(Types.SET_OFFER_SERVICE_PRICE_PAGE, setOfferServicePricePageSaga);
	yield takeLatest(Types.SET_OFFER_DELIVERY_PAGE_CLICK_AND_COLLECT, setOfferDeliveryPageClickAndCollectSaga);
	yield takeLatest(Types.SET_OFFER_DELIVERY_PAGE_DELIVERIES, setOfferDeliveryPageDeliveriesSaga);
	yield takeLatest(Types.EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT, emptyOfferDeliveryClickAndCollectSaga);
	yield takeLatest(Types.EMPTY_OFFER_DELIVERIES, emptyOfferDeliveriesSaga);
	yield takeLatest(Types.EMPTY_OFFER_USER_LOCAL_OFFER, offerSetEmptyUserLocalOfferSaga);
	yield takeLatest(
		Types.OFFER_GET_OFFERS_BY_SHOP_ID_AND_QUERY_PARAMS,
		withCallback(offerGetOffersByShopNewIDSaga as Saga),
	);
	yield takeLatest(
		Types.OFFER_GET_AVAILABLE_FILTERS_BY_SHOP_ID,
		withCallback(offerGetAvailableFiltersByShopIDSaga as Saga),
	);
	yield takeLatest(
		Types.OFFER_GET_AVAILABLE_FILTERS_BY_UNIQUE_ID,
		withCallback(offerGetAvailableFiltersByUniqueIDSaga as Saga),
	);
	yield takeLatest(Types.SET_OFFER_PRODUCT_TO_EDIT, withCallback(setOfferProductToEditSaga as Saga));
	yield takeLatest(Types.SET_OFFER_SERVICE_TO_EDIT, withCallback(setOfferServiceToEditSaga as Saga));
	yield takeLatest(Types.OFFER_POST_ROOT, withCallback(offerPostRootSaga as Saga));
	yield takeLatest(Types.OFFER_PUT_ROOT, withCallback(offerPutRootSaga as Saga));
	yield takeLatest(Types.OFFER_GET_TAGS, offerGetTagsSaga);
	yield takeLatest(Types.OFFER_GET_LOCALISATION, offerGetLastUsedLocalisationSaga);
	yield takeLatest(Types.OFFER_GET_LAST_THREE_USED_DELIVERIES, offerGetLastThreeUsedDeliveriesSaga);
	yield takeLatest(Types.OFFER_GET_MY_OFFERS_FIRST_PAGE, offerGetMyOffersFirstPageSaga);
	yield takeLatest(Types.OFFER_POST_PIN, offerPostPinSaga);
	yield takeLatest(Types.OFFER_POST_PIN_WITH_CALLBACK, withCallback(offerPostPinCallBackSaga as Saga));
	yield takeLatest(Types.OFFER_POST_SOLDER, offerPostSolderSaga);
	yield takeLatest(Types.OFFER_PATCH_SOLDER, offerPatchSolderSaga);
	yield takeLatest(Types.OFFER_DELETE_SOLDER, offerDeleteSolderSaga);
	yield takeLatest(Types.OFFER_DELETE_ROOT, withCallback(offerDeleteRootSaga as Saga));
	yield takeLatest(Types.OFFER_GET_VUES, withCallback(offerGetVuesSaga as Saga));
	yield takeLatest(Types.WS_OFFER_PICTURE_1, wsOfferPicture1Saga);
	yield takeLatest(Types.WS_OFFER_PICTURE_1_THUMB, wsOfferPicture1ThumbSaga);
	yield takeLatest(Types.WS_OFFER_PICTURE_2, wsOfferPicture2Saga);
	yield takeLatest(Types.WS_OFFER_PICTURE_2_THUMB, wsOfferPicture2ThumbSaga);
	yield takeLatest(Types.WS_OFFER_PICTURE_3, wsOfferPicture3Saga);
	yield takeLatest(Types.WS_OFFER_PICTURE_3_THUMB, wsOfferPicture3ThumbSaga);
	yield takeLatest(Types.WS_OFFER_PICTURE_4, wsOfferPicture4Saga);
	yield takeLatest(Types.WS_OFFER_PICTURE_4_THUMB, wsOfferPicture4ThumbSaga);
}
