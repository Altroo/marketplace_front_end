import { call, put, takeLatest } from 'typed-redux-saga/macro';
import * as Types from '../../actions';
import {
	ShopGetRootTokenResponseType,
	ShopGetRootUniqueIDResponseType,
	ShopPostRootType,
	ShopPostRootTokenResponseType,
	ShopPostRootUniqueIDResponseType,
	ShopGetPhoneCodesResponseType,
	ShopPatchShopNameType,
	ShopPatchAvatarType,
	ShopPatchColorType,
	ShopPatchFontType,
	ShopPatchPhoneType,
	ShopPatchWhatsappType,
	ShopPatchBioType,
	ShopPatchAvailabilityType,
	ShopPatchContactType,
	ShopPatchAddressType,
	ShopPatchRootType,
	ShopGetRootType,
	ShopFontNameType,
} from '../../../types/shop/shopTypes';
import {
	AxiosErrorDefaultType,
	IconColorType,
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	ResponseDataErrorInterface,
} from '../../../types/_init/_initTypes';
import {
	setShopAvatar,
	setGetPhoneCodes,
	setGetShopState,
	setPostShopState,
	setShopName,
	setShopColors,
	setShopFont,
	setShopPhone,
	setShopWhatsapp,
	setShopBio,
	setShopAvailability,
	setShopContact,
	setShopAddress,
	setCreator,
	setWSShopAvatar,
	setNewShopName,
	setNewShopAvatar,
	setNewShopColor,
	setNewShopFont,
	setBorder,
	setIconColor,
} from '../../slices/shop/shopSlice';
import {
	allowAnyInstance,
	isAuthenticatedInstance,
	emptyLocalStorageNewShopData,
	setLocalStorageNewShopAvatar,
	setLocalStorageNewShopFont,
	loadLocalStorageNewShopData,
	setLocalStorageNewShopColor,
	setLocalStorageNewShopName,
	setRemoteCookiesAppToken,
} from '../../../utils/helpers';
import { emptyInitStateToken, setInitState } from '../../slices/_init/_initSlice';
import { ctxAuthSaga } from '../_init/_initSaga';
import { getApi, patchApi, patchFormDataApi, postApi, postFormDataApi } from '../../services/_init/_initAPI';
// import {AxiosInstance} from "axios";

// interface TokenNoAuthSagaBaseGeneratorParams {
//     payloadRecord: Record<string, unknown>;
//     apiCall: (
//         instance: AxiosInstance,
//         payload: Record<string, unknown>,
//         uniqueID?: (string | null)
//     ) => Promise<{ data: Record<string, unknown>, status: number }>;
// }
//
// function* tokenNoAuthSagaBaseGenerator({payloadRecord, apiCall}: TokenNoAuthSagaBaseGeneratorParams) {
//     const authSagaContext = yield* call(() => ctxAuthSaga());
//     try {
//         if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
//             const instance = yield* call(() => tokenInstance(authSagaContext.initStateToken));
//             return yield* call(() =>
//                 apiCall(instance, payloadRecord));
//         } else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
//             const instance = yield* call(() => noAuthInstance());
//             return yield* call(() =>
//                 // const response: typeof responseType = yield* call(() =>
//                 apiCall(instance, payloadRecord,
//                     authSagaContext.initStateUniqueID.unique_id));
//         }
//         return {
//             status: 500,
//         };
//     } catch (e) {
//         const errors = e as AxiosErrorDefaultType;
//         console.log(errors);
//         return {
//             data: errors.error,
//             status: errors.status,
//         };
//     }
// }

function* shopPostRootSaga(payload: ShopPostRootType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/`;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: ShopPostRootTokenResponseType = yield* call(() => postFormDataApi(url, instance, payload));
			if (response.status === 200) {
				// update state
				yield* put(setPostShopState(response.data));
			} else {
				// set error state
			}
		} else {
			// User is not authenticated
			const instance = yield* call(() => allowAnyInstance('multipart/form-data', true));
			const response: ShopPostRootUniqueIDResponseType = yield* call(() =>
				postFormDataApi(url, instance, payload),
			);
			if (response.status === 200) {
				// set UNIQUE_ID to local storage & states
				const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
					tokenType: 'UNIQUE_ID',
					initStateToken: emptyInitStateToken,
					initStateUniqueID: {
						unique_id: response.data.unique_id,
						unique_id_expiration: response.data.expiration_date,
					},
				};
				// yield* call(() => setLocalStorageAppToken(newInitStateToken));
				yield* call(() => setRemoteCookiesAppToken(newInitStateToken));
				yield* put(setInitState(newInitStateToken));
				yield* put(setPostShopState(response.data));
				// empty temporary new shop data
				yield* call(() => emptyLocalStorageNewShopData());
			} else {
				// set error state
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* shopGetRootSaga(payload: ShopGetRootType) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_SHOP_ROOT}/`;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// get shop data using qaryb link.
			// else get user data.
			if (payload.qaryb_link) {
				url += `${payload.qaryb_link}/`;
			}
			const response: ShopGetRootTokenResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200) {
				// update state
				yield* put(setGetShopState(response.data));
			} else {
				// set error state
				console.log(response.status);
				console.log(response.data);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			// User is not authenticated
			const instance = yield* call(() => allowAnyInstance());
			url += `${authSagaContext.initStateUniqueID.unique_id}/`;
			const response: ShopGetRootUniqueIDResponseType = yield* call(() => getApi(url, instance));
			if (response.status === 200) {
				// update state
				// console.log(response.data);
				yield* put(setGetShopState(response.data));
			} else {
				// set error state
				// TODO empty unique_ID state token
				console.log(response.status);
				console.log(response.data);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* shopGetPhoneCodesSaga() {
	const url = `${process.env.NEXT_PUBLIC_SHOP_PHONE_CODES}`;
	try {
		const instance = yield* call(() => allowAnyInstance());
		const response: ShopGetPhoneCodesResponseType = yield* call(() => getApi(url, instance));
		if (response.status === 200) {
			yield* put(setGetPhoneCodes({ ...response.data }));
		} else {
			console.log(response.status);
			console.log(response.data);
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchShopNameSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_SHOP_NAME}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchShopNameType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopName({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchShopNameType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopName({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchAvatarSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_AVATAR}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() =>
				isAuthenticatedInstance(authSagaContext.initStateToken, 'multipart/form-data'),
			);
			const response: ShopPatchAvatarType = yield* call(() => patchFormDataApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopAvatar({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance('multipart/form-data'));
			const response: ShopPatchAvatarType = yield* call(() =>
				patchFormDataApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopAvatar({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchColorSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_COLOR}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchColorType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopColors({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchColorType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopColors({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchFontSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_FONT}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchFontType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopFont({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchFontType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopFont({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchPhoneSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_PHONE}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchPhoneType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopPhone({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchPhoneType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopPhone({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchWhatsappSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_WHATSAPP}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchWhatsappType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopWhatsapp({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchWhatsappType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopWhatsapp({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchBioSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_WHATSAPP}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchBioType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopBio({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchBioType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopBio({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchAvailabilitySaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_AVAILABILITY}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchAvailabilityType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopAvailability({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchAvailabilityType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopAvailability({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchContactSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_CONTACT}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchContactType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopContact({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchContactType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopContact({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPatchAddressSaga(payload: Partial<ShopPatchRootType>) {
	const url = `${process.env.NEXT_PUBLIC_SHOP_ADDRESS}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		// User authenticated
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ShopPatchAddressType = yield* call(() => patchApi(url, instance, payloadData));
			if (response.status === 200) {
				// update state
				yield* put(setShopAddress({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		} else if (authSagaContext.tokenType === 'UNIQUE_ID' && authSagaContext.initStateUniqueID.unique_id !== null) {
			const instance = yield* call(() => allowAnyInstance());
			const response: ShopPatchAddressType = yield* call(() =>
				patchApi(url, instance, payloadData, authSagaContext.initStateUniqueID.unique_id),
			);
			if (response.status === 200) {
				// update state
				yield* put(setShopAddress({ ...response.data }));
			} else {
				// set error state
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* shopPostCreatorSaga() {
	const url = `${process.env.NEXT_PUBLIC_SHOP_CREATOR}`;
	const authSagaContext = yield* call(() => ctxAuthSaga());
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const instance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseDataErrorInterface = yield* call(() => postApi(url, instance));
			if (response.status === 204) {
				yield* put(setCreator(true));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
	}
}

function* wsShopAvatarSaga(payload: { type: string; pk: number; shop_avatar: string }) {
	yield* put(setWSShopAvatar(payload.shop_avatar));
}

// Create Temporary shop
function* setShopNameSaga(payload: { type: string; shop_name: string }) {
	yield* put(setNewShopName(payload.shop_name));
	yield* call(() => setLocalStorageNewShopName(payload.shop_name));
}

function* setShopAvatarSaga(payload: { type: string; avatar: ArrayBuffer | string }) {
	yield* put(setNewShopAvatar(payload.avatar));
	yield* call(() => setLocalStorageNewShopAvatar(payload.avatar as string));
}

function* setShopColorSaga(payload: {
	type: string;
	color_code: string;
	bg_color_code: string;
	border: string;
	icon_color: IconColorType;
}) {
	yield* put(
		setNewShopColor({
			color_code: payload.color_code,
			bg_color_code: payload.bg_color_code,
			border: payload.border,
			icon_color: payload.icon_color,
		}),
	);
	yield* call(() =>
		setLocalStorageNewShopColor(payload.color_code, payload.bg_color_code, payload.border, payload.icon_color),
	);
}

function* setShopFontSaga(payload: { type: string; font_name: ShopFontNameType }) {
	yield* put(setNewShopFont(payload.font_name));
	yield* call(() => setLocalStorageNewShopFont(payload.font_name));
}

function* setShopBorderSaga(payload: { type: string; border: string }) {
	yield* put(setBorder(payload.border));
}

function* setShopIconColorSaga(payload: { type: string; iconColor: IconColorType }) {
	yield* put(setIconColor(payload.iconColor));
}

function* loadNewAddedShopDataSaga() {
	const newShopData = yield* call(() => loadLocalStorageNewShopData());
	if (newShopData !== null) {
		yield* put(setNewShopName(newShopData.shop_name));
		yield* put(setNewShopAvatar(newShopData.avatar));
		yield* put(setNewShopColor({
			color_code: newShopData.color_code,
			bg_color_code: newShopData.bg_color_code,
			border: newShopData.border,
			icon_color: newShopData.icon_color
		}));
		yield* put(setNewShopFont(newShopData.font_name));
	}
}

export function* watchShop() {
	yield* takeLatest(Types.LOAD_NEW_ADDED_SHOP_DATA, loadNewAddedShopDataSaga);
	yield* takeLatest(Types.SET_SHOP_NAME, setShopNameSaga);
	yield* takeLatest(Types.SET_SHOP_AVATAR, setShopAvatarSaga);
	yield* takeLatest(Types.SET_SHOP_COLOR, setShopColorSaga);
	yield* takeLatest(Types.SET_SHOP_FONT, setShopFontSaga);
	yield* takeLatest(Types.SET_SHOP_BORDER, setShopBorderSaga);
	yield* takeLatest(Types.SET_SHOP_ICON_COLOR, setShopIconColorSaga);
	yield* takeLatest(Types.SHOP_POST_ROOT, shopPostRootSaga);
	yield* takeLatest(Types.SHOP_GET_ROOT, shopGetRootSaga);
	yield* takeLatest(Types.SHOP_GET_PHONE_CODES, shopGetPhoneCodesSaga);
	yield* takeLatest(Types.SHOP_PATCH_SHOP_NAME, shopPatchShopNameSaga);
	yield* takeLatest(Types.SHOP_PATCH_AVATAR, shopPatchAvatarSaga);
	yield* takeLatest(Types.SHOP_PATCH_COLOR, shopPatchColorSaga);
	yield* takeLatest(Types.SHOP_PATCH_FONT, shopPatchFontSaga);
	yield* takeLatest(Types.SHOP_PATCH_PHONE, shopPatchPhoneSaga);
	yield* takeLatest(Types.SHOP_PATCH_WHATSAPP, shopPatchWhatsappSaga);
	yield* takeLatest(Types.SHOP_PATCH_BIO, shopPatchBioSaga);
	yield* takeLatest(Types.SHOP_PATCH_AVAILABILITY, shopPatchAvailabilitySaga);
	yield* takeLatest(Types.SHOP_PATCH_CONTACT, shopPatchContactSaga);
	yield* takeLatest(Types.SHOP_PATCH_ADDRESS, shopPatchAddressSaga);
	yield* takeLatest(Types.SHOP_POST_CREATOR, shopPostCreatorSaga);
	yield* takeLatest(Types.WS_SHOP_AVATAR, wsShopAvatarSaga);
}
