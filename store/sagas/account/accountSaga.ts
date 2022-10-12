import { call, put, takeLatest } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	allowAnyInstance,
	deleteRemoteCookiesAppToken,
	emptyRemoteCookiesUniqueIDOnly,
	isAuthenticatedInstance,
	setRemoteCookiesTokenOnly,
} from '../../../utils/helpers';
import { deleteApi, getApi, patchApi, postApi, putApi } from '../../services/_init/_initAPI';
import {
	appendPostAddress, check_accountGETApiErrorAction,
	profileGETApiErrorAction,
	setAddresses,
	setBlockedList,
	setCheckAccount, setCheckAccountGETLoading,
	setEmailChanged,
	setEmailExistsStatus, setFbEmailSet,
	setIsLoggedIn,
	setPasswordChanged,
	setPasswordResetSent,
	setPasswordResetValidCode,
	setPatchAddress,
	setProfil,
	setProfilGETLoading,
	setResendVerification,
	setSelectedAddress,
	setSelectedProfil,
	setSocials,
	setVerifiedAccount,
	setWSUserAvatar
} from "../../slices/account/accountSlice";
import {
	ApiErrorResponseType, AuthSagaContextType,
	InitStateNonNullableToken,
	ResponseDataErrorInterface,
	ResponseOnlyInterface,
} from "../../../types/_init/_initTypes";
import {
	AccountGetAddressesResponseType,
	AccountGetAddressResponseType,
	AccountGetBlockResponseType,
	AccountGetCheckAccountResponseType,
	AccountGetProfilResponseType,
	AccountGetSocialsResponseType,
	AccountPatchAddressResponseType,
	AccountPatchProfilResponseType,
	AccountPatchProfilType,
	AccountPostAddressInterface,
	AccountPostAddressResponseType,
	AccountPostBlockResponseType,
	AccountPostDeleteAccountType,
	AccountPostEncloseAccountType,
	AccountPostFacebookResponseType,
	AccountPostGoogleResponseType,
	AccountPostLoginResponseType,
	AccountPostLoginType,
	// AccountPostRegisterResponseType,
	// AccountPostRegisterType,
	AccountPostVerifyAccountType, AccountPutChangeEmailHasPasswordResponseType
} from "../../../types/account/accountTypes";
import { setTokenState, setEmptyUniqueIDState, initToken, setFbEmailInInit } from "../../slices/_init/_initSlice";
import { ctxAuthSaga, initEmptyStatesSaga } from '../_init/_initSaga';
import { withCallback } from 'redux-saga-callback';
import { AxiosInstance } from "axios";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Saga } from "redux-saga";
import { NextRouter } from "next/router";
import { accountPostLogoutAction } from "../../actions/account/accountActions";

function* accountPostCheckEmailSaga(payload: { type: string; email: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_EMAIL}`;
	try {
		const instance: AxiosInstance = yield call(() => allowAnyInstance());
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, { email: payload.email }));
		if (response.status === 204) {
			yield put(setEmailExistsStatus(false));
		}
	} catch (e) {
		yield put(setEmailExistsStatus(true));
		const errors = e as ApiErrorResponseType;
		console.log(errors.error.status_code);
		console.log(errors);
	}
}

// function* accountPostRegisterSaga(payload: AccountPostRegisterType) {
// 	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
// 	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_REGISTER}`;
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	// const { type, ...payloadData } = payload;
// 	const payloadData: Omit<AccountPostRegisterType, 'type'> = payload;
// 	try {
// 		// Call allow any instance to register
// 		const instance = yield call(() => allowAnyInstance());
// 		// Get register response which has stateToken
// 		const response: AccountPostRegisterResponseType = yield call(() => postApi(url, instance, payloadData));
// 		if (response.status === 200) {
// 			// Check if previous init state has unique_id (user own a temporary shop)
// 			const uniqueID = authSagaContext.initStateUniqueID.unique_id;
// 			if (authSagaContext.tokenType === 'UNIQUE_ID' && uniqueID !== null) {
// 				// set cookie token only
// 				yield call(() => setRemoteCookiesTokenOnly(response.data));
// 				// construct transfer shop url
// 				const transferShopUrl = `${process.env.NEXT_PUBLIC_SHOP_TRANSFER_SHOP}`;
// 				// call is authenticated instance (require real token from localStorage previously set)
// 				const authInstance = yield call(() =>
// 					isAuthenticatedInstance(response.data),
// 				);
// 				// Get transfer shop response
// 				const transferResponse: ResponseDataErrorInterface = yield call(() =>
// 					postApi(transferShopUrl, authInstance, { unique_id: uniqueID }),
// 				);
// 				if (transferResponse.status === 204) {
// 					// Transfer complete
// 					// localStorage token was previously set
// 					// Set new token state
// 					yield put(setTokenState(response.data));
// 					// Empty unique ID state
// 					yield put(setEmptyUniqueIDState());
// 					// Empty unique ID localStorage
// 					yield call(() => emptyRemoteCookiesUniqueIDOnly());
// 					yield put(setIsLoggedIn(true));
// 				} else {
// 					console.log(transferResponse.data);
// 					console.log(transferResponse.status);
// 				}
// 				// Previous init state is null (user don't own a temporary shop)
// 			} else {
// 				// Set new token state
// 				yield put(setTokenState(response.data));
// 				// set localStorage token only
// 				yield call(() => setRemoteCookiesTokenOnly(response.data));
// 				// Empty unique ID state & cookies in case
// 				yield put(setEmptyUniqueIDState());
// 				yield call(() => emptyRemoteCookiesUniqueIDOnly());
// 				yield put(setIsLoggedIn(true));
// 			}
// 		} else {
// 			console.log(response.status);
// 			console.log(response.data);
// 		}
// 	} catch (e) {
// 		const errors = e as ApiErrorResponseType;
// 		console.log(errors);
// 	}
// }

function* accountPostLoginSaga(payload: AccountPostLoginType) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_LOGIN}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		const instance: AxiosInstance = yield call(() => allowAnyInstance());
		const response: AccountPostLoginResponseType = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 200) {
			// set remote cookie token only
			yield call(() => setRemoteCookiesTokenOnly(response.data));
			// Empty unique ID state & localStorage in case
			yield put(setEmptyUniqueIDState());
			yield call(() => emptyRemoteCookiesUniqueIDOnly());
			yield put(setIsLoggedIn(true));
		} else {
			console.log(response.data);
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* accountPostLogoutSaga(payload: {type: string, router: NextRouter}) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_LOGOUT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseDataErrorInterface = yield call(() =>
				postApi(url, authInstance, { refresh: authSagaContext.initStateToken.refresh_token }),
			);
			if (response.status === 200) {
				// Empty both Token & unique ID state
				yield put(initToken());
				yield put(setIsLoggedIn(false));
				yield call(() => deleteRemoteCookiesAppToken(payload.router));
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

function* accountGetProfilSaga() {
	yield put(setProfilGETLoading());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PROFIL}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetProfilResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setProfil(response.data));
			}
		}
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => profileGETApiErrorAction(apiError)));
	}
}

function* accountGetSelectedProfilSaga(payload: { type: string; user_pk: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_PROFIL}${payload.user_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetProfilResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setSelectedProfil(response.data));
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

function* accountPatchProfilSaga(payload: AccountPatchProfilType) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PROFIL}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountPatchProfilResponseType = yield call(() =>
				patchApi(url, authInstance, payloadData),
			);
			if (response.status === 200) {
				yield put(setProfil(response.data));
				return true;
			}
		}
	} catch (e) {
		return e as ApiErrorResponseType;
		//console.log(errors);
		// set error state
	}
}

function* accountGetSocialsSaga() {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_SOCIALS}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetSocialsResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setSocials(response.data));
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

function* accountPostFacebookSaga(payload: { type: string; access_token: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_FACEBOOK}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: AccountPostFacebookResponseType = yield call(() =>
			postApi(url, instance, { access_token: payload.access_token }),
		);
		if (response.status === 200) {
			// Set new token state
			yield put(setTokenState(response.data));
			// set localStorage token only
			yield call(() => setRemoteCookiesTokenOnly(response.data));
			// Empty unique ID state & localStorage in case
			yield put(setEmptyUniqueIDState());
			yield call(() => emptyRemoteCookiesUniqueIDOnly());
			yield put(setIsLoggedIn(true));
			// Reload socials state
			yield call(() => accountGetSocialsSaga());
		} else {
			console.log(response.data);
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountPostGoogleSaga(payload: { type: string; access_token: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GOOGLE}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: AccountPostGoogleResponseType = yield call(() =>
			postApi(url, instance, { access_token: payload.access_token }),
		);
		if (response.status === 200) {
			// Set new token state
			yield put(setTokenState(response.data));
			// set localStorage token only
			yield call(() => setRemoteCookiesTokenOnly(response.data));
			// Empty unique ID state & localStorage in case
			yield put(setEmptyUniqueIDState());
			yield call(() => emptyRemoteCookiesUniqueIDOnly());
			yield put(setIsLoggedIn(true));
			// Reload socials state
			yield call(() => accountGetSocialsSaga());
		} else {
			console.log(response.data);
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountPostLinkFacebookSaga(payload: { type: string; access_token: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_LINK_FACEBOOK}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountPostFacebookResponseType = yield call(() =>
				postApi(url, authInstance, { access_token: payload.access_token }),
			);
			if (response.status === 200) {
				// Set new token state
				yield put(setTokenState(response.data));
				// set localStorage token only
				yield call(() => setRemoteCookiesTokenOnly(response.data));
				// Empty unique ID state & localStorage in case
				yield put(setEmptyUniqueIDState());
				yield call(() => emptyRemoteCookiesUniqueIDOnly());
				// Reload socials state
				yield call(() => accountGetSocialsSaga());
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

function* accountPostLinkGoogleSaga(payload: { type: string; access_token: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_LINK_GOOGLE}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountPostGoogleResponseType = yield call(() =>
				postApi(url, authInstance, { access_token: payload.access_token }),
			);
			if (response.status === 200) {
				// Set new token state
				yield put(setTokenState(response.data));
				// set localStorage token only
				yield call(() => setRemoteCookiesTokenOnly(response.data));
				// Empty unique ID state & localStorage in case
				yield put(setEmptyUniqueIDState());
				yield call(() => emptyRemoteCookiesUniqueIDOnly());
				// Reload socials state
				yield call(() => accountGetSocialsSaga());
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

//TODO : missing unlink a primary email check
function* accountPostUnlinkSocialSaga(payload: { type: string; pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_UNLINK_SOCIAL}${payload.pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance));
			if (response.status === 200) {
				// Reload socials state
				yield call(() => accountGetSocialsSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountGetBlockSaga() {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_BLOCK}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetBlockResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setBlockedList(response.data));
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

function* accountPostBlockSaga(payload: { type: string; user_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_BLOCK}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountPostBlockResponseType = yield call(() =>
				postApi(url, authInstance, { user_pk: payload.user_pk }),
			);
			if (response.status === 204) {
				// Reload the block list
				yield call(() => accountGetBlockSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountDeleteBlockSaga(payload: { type: string; user_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_BLOCK}${payload.user_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseOnlyInterface = yield call(() => deleteApi(url, authInstance));
			if (response.status === 204) {
				// Reload the block list
				yield call(() => accountGetBlockSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountGetCheckAccountSaga() {
	yield put(setCheckAccountGETLoading());
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetCheckAccountResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setCheckAccount(response.data));
			}
		}
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => check_accountGETApiErrorAction(apiError)));
		// set error state
	}
}

function* accountGetAddressesSaga() {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ADDRESSES}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetAddressesResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setAddresses(response.data));
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

function* accountPostAddressSaga(payload: AccountPostAddressInterface) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: AccountPostAddressResponseType = yield call(() => postApi(url, authInstance, payloadData));
			if (response.status === 200) {
				// Reload the address list
				// yield call(() => accountGetAddressesSaga());
				yield put(appendPostAddress(response.data));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountPatchAddressSaga(payload: AccountPostAddressInterface) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS}`;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, ...payloadData } = payload;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountPatchAddressResponseType = yield call(() =>
				patchApi(url, authInstance, payloadData),
			);
			if (response.status === 200) {
				yield put(setPatchAddress(response.data));
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

function* accountDeleteAddressSaga(payload: { type: string; address_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS}${payload.address_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseOnlyInterface = yield call(() => deleteApi(url, authInstance));
			if (response.status === 204) {
				// Reload the addresses list
				yield call(() => accountGetAddressesSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountGetAddressSaga(payload: { type: string; address_pk: number }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS}${payload.address_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: AccountGetAddressResponseType = yield call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield put(setSelectedAddress(response.data));
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

function* accountPostEncloseSaga(payload: AccountPostEncloseAccountType) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_ENCLOSE}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
			if (response.status === 204) {
				// Logout has initToken.
				// yield call(() => accountPostLogoutSaga());
				yield call(() => accountPostLogoutAction(payload.router));
				// Empty the rest of the states
				yield call(() => initEmptyStatesSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountDeleteAccountSaga(payload: AccountPostDeleteAccountType) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_DELETE_ACCOUNT}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => deleteApi(url, authInstance, payloadData));
			if (response.status === 204) {
				// Logout has initToken.
				// yield call(() => accountPostLogoutSaga());
				yield call(() => accountPostLogoutAction(payload.router));
				// Empty the rest of the states
				yield call(() => initEmptyStatesSaga());
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountPostVerifyAccountSaga(payload: AccountPostVerifyAccountType) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_VERIFY_ACCOUNT}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, payloadData));
		if (response.status === 204) {
			yield put(setVerifiedAccount(true));
		} else {
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* accountPostResendVerificationSaga(payload: { type: string; email: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_RESEND_VERIFICATION}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, { email: payload.email }));
		if (response.status === 204) {
			yield put(setResendVerification(true));
		} else {
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* accountPostPasswordChangeSaga(payload: { type: string; new_password1: string; new_password2: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_CHANGE}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
			if (response.status === 204) {
				yield put(setPasswordChanged(true));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountPostSendPasswordResetSaga(payload: { type: string; email: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_SEND_PASSWORD_RESET}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, { email: payload.email }));
		if (response.status === 204) {
			yield put(setPasswordResetSent(true));
			return true;
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

function* accountGetPasswordResetSaga(payload: { type: string; email: string; code: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_RESET}${payload.email}/${payload.code}/`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		const response: ResponseOnlyInterface = yield call(() => getApi(url, instance));
		if (response.status === 204) {
			yield put(setPasswordResetValidCode(true));
		} else {
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* accountPutPasswordResetSaga(payload: {
	type: string;
	email: string;
	code: string;
	new_password: string;
	new_password2: string;
}) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_RESET}`;
	try {
		const instance : AxiosInstance = yield call(() => allowAnyInstance());
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => putApi(url, instance, payloadData));
		if (response.status === 204) {
			yield put(setPasswordChanged(true));
		} else {
			console.log(response.status);
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
	}
}

function* accountPutChangeEmailHasPasswordSaga(payload: { type: string; email: string; password: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHANGE_EMAIL_HAS_PASSWORD}`;
	// try {
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: AccountPutChangeEmailHasPasswordResponseType = yield call(() => putApi(url, authInstance, payloadData));
		if (response.status === 200 && response.data.email) {
			yield put(setEmailChanged({ new_email: response.data.email, changed: true }));
			return response.data;
		}
	}
}

function* accountPutChangeEmailNotHasPasswordSaga(payload: {
	type: string;
	new_email: string;
	new_password: string;
	new_password2: string;
}) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHANGE_EMAIL_NOT_HAS_PASSWORD}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, ...payloadData } = payload;
			const response: ResponseOnlyInterface = yield call(() => putApi(url, authInstance, payloadData));
			if (response.status === 204) {
				yield put(setEmailChanged({ new_email: payload.new_email, changed: true }));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as ApiErrorResponseType;
		console.log(errors);
		// set error state
	}
}

function* accountSetFacebookEmailSaga(payload: {type: string, email :string}) {
	// change email in account slice
	yield put(setFbEmailSet({ email: payload.email }));
	// change email in init slice
	yield put(setFbEmailInInit({ email: payload.email }));
}

function* wsUserAvatarSaga(payload: { type: string; pk: number; avatar_thumbnail: string }) {
	yield put(setWSUserAvatar(payload.avatar_thumbnail));
}

function* accountPostRegisterSaga(payload: {type: string, unique_id_exists: boolean, tokens: InitStateNonNullableToken}) {
	if (payload.unique_id_exists) {
		// Transfer complete
		// localStorage token was previously set
		// Set new token state
		yield put(setTokenState(payload.tokens));
		// Empty unique ID state
		yield put(setEmptyUniqueIDState());
		// Empty unique ID localStorage
		yield call(() => emptyRemoteCookiesUniqueIDOnly());
		yield put(setIsLoggedIn(true));
	} else {
		// this part is used in login also.
		// Set new token state
		yield put(setTokenState(payload.tokens));
		// set localStorage token only
		yield call(() => setRemoteCookiesTokenOnly(payload.tokens));
		// Empty unique ID state & cookies in case
		yield put(setEmptyUniqueIDState());
		yield call(() => emptyRemoteCookiesUniqueIDOnly());
		yield put(setIsLoggedIn(true));
	}
}


export function* watchAccount() {
	yield takeLatest(Types.ACCOUNT_POST_CHECK_EMAIL, accountPostCheckEmailSaga);
	yield takeLatest(Types.ACCOUNT_POST_REGISTER, accountPostRegisterSaga);
	yield takeLatest(Types.ACCOUNT_POST_LOGIN, accountPostLoginSaga);
	yield takeLatest(Types.ACCOUNT_POST_LOGOUT, accountPostLogoutSaga);
	yield takeLatest(Types.ACCOUNT_GET_PROFIL, accountGetProfilSaga);
	yield takeLatest(Types.ACCOUNT_GET_SELECTED_PROFIL, accountGetSelectedProfilSaga);
	yield takeLatest(Types.ACCOUNT_PATCH_PROFIL, withCallback(accountPatchProfilSaga as Saga));
	yield takeLatest(Types.ACCOUNT_GET_SOCIALS, accountGetSocialsSaga);
	yield takeLatest(Types.ACCOUNT_POST_FACEBOOK, accountPostFacebookSaga);
	yield takeLatest(Types.ACCOUNT_POST_GOOGLE, accountPostGoogleSaga);
	yield takeLatest(Types.ACCOUNT_POST_LINK_FACEBOOK, accountPostLinkFacebookSaga);
	yield takeLatest(Types.ACCOUNT_POST_LINK_GOOGLE, accountPostLinkGoogleSaga);
	yield takeLatest(Types.ACCOUNT_POST_UNLINK_SOCIAL, accountPostUnlinkSocialSaga);
	yield takeLatest(Types.ACCOUNT_GET_BLOCK, accountGetBlockSaga);
	yield takeLatest(Types.ACCOUNT_POST_BLOCK, accountPostBlockSaga);
	yield takeLatest(Types.ACCOUNT_DELETE_BLOCK, accountDeleteBlockSaga);
	yield takeLatest(Types.ACCOUNT_GET_CHECK_ACCOUNT, accountGetCheckAccountSaga);
	yield takeLatest(Types.ACCOUNT_GET_ADDRESSES, accountGetAddressesSaga);
	yield takeLatest(Types.ACCOUNT_POST_ADDRESS, accountPostAddressSaga);
	yield takeLatest(Types.ACCOUNT_PATCH_ADDRESS, accountPatchAddressSaga);
	yield takeLatest(Types.ACCOUNT_DELETE_ADDRESS, accountDeleteAddressSaga);
	yield takeLatest(Types.ACCOUNT_GET_ADDRESS, accountGetAddressSaga);
	yield takeLatest(Types.ACCOUNT_POST_ENCLOSE, accountPostEncloseSaga);
	yield takeLatest(Types.ACCOUNT_DELETE_ACCOUNT, accountDeleteAccountSaga);
	yield takeLatest(Types.ACCOUNT_POST_VERIFY_ACCOUNT, accountPostVerifyAccountSaga);
	yield takeLatest(Types.ACCOUNT_POST_RESEND_VERIFICATION, accountPostResendVerificationSaga);
	yield takeLatest(Types.ACCOUNT_POST_PASSWORD_CHANGE, accountPostPasswordChangeSaga);
	yield takeLatest(Types.ACCOUNT_POST_SEND_PASSWORD_RESET, withCallback(accountPostSendPasswordResetSaga as Saga));
	yield takeLatest(Types.ACCOUNT_GET_PASSWORD_RESET, accountGetPasswordResetSaga);
	yield takeLatest(Types.ACCOUNT_PUT_PASSWORD_RESET, accountPutPasswordResetSaga);
	yield takeLatest(Types.ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD, withCallback(accountPutChangeEmailHasPasswordSaga as Saga));
	yield takeLatest(Types.ACCOUNT_PUT_CHANGE_EMAIL_NOT_HAS_PASSWORD, accountPutChangeEmailNotHasPasswordSaga);
	yield takeLatest(Types.ACCOUNT_SET_FACEBOOK_EMAIL, accountSetFacebookEmailSaga);
	yield takeLatest(Types.WS_USER_AVATAR, wsUserAvatarSaga);
}
