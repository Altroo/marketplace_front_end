import { call, put, takeLatest } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	allowAnyInstance,
	emptyRemoteCookiesUniqueIDOnly,
	isAuthenticatedInstance,
	setRemoteCookiesTokenOnly,
} from '../../../utils/helpers';
import { getApi, patchApi, postApi, putApi } from '../../services/_init/_initAPI';
import {
	check_accountGETApiErrorAction,
	setCheckAccount,
	setCheckAccountGETLoading,
	setEmailChanged,
	setFbEmailSet,
	setIsLoggedIn,
	setPasswordChanged,
	setPasswordResetSent,
	setProfil,
	setResendVerification,
	setWSUserAvatar
} from "../../slices/account/accountSlice";
import {
	ApiErrorResponseType, AuthSagaContextType,
	InitStateNonNullableToken,
	ResponseOnlyInterface,
} from "../../../types/_init/_initTypes";
import {
	AccountGetCheckAccountResponseType,
	AccountPatchProfilResponseType,
	AccountPatchProfilType,
	AccountPutChangeEmailHasPasswordResponseType
} from "../../../types/account/accountTypes";
import { setTokenState, setEmptyUniqueIDState, setFbEmailInInit } from "../../slices/_init/_initSlice";
import { ctxAuthSaga } from '../_init/_initSaga';
import { withCallback } from 'redux-saga-callback';
import { AxiosInstance } from "axios";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Saga } from "redux-saga";

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


export function* accountGetCheckAccountSaga() {
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

function* accountPostResendVerificationSaga(payload: { type: string; email: string }) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_RESEND_VERIFICATION}`;
	const instance : AxiosInstance = yield call(() => allowAnyInstance());
	const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, { email: payload.email }));
	if (response.status === 204) {
		yield put(setResendVerification(true));
		return true;
	}
}

function* accountPostPasswordChangeSaga(payload: { type: string; old_password: string, new_password1: string; new_password2: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_CHANGE}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => postApi(url, authInstance, payloadData));
		if (response.status === 204) {
			yield put(setPasswordChanged(true));
			return true;
		}
	}
}

function* accountPutCreatePasswordSaga(payload: { type: string; new_password1: string; new_password2: string }) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CREATE_PASSWORD}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: ResponseOnlyInterface = yield call(() => putApi(url, authInstance, payloadData));
		if (response.status === 204) {
			yield put(setPasswordChanged(true));
			return true;
		}
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
	email: string;
	new_password1: string;
	new_password2: string;
}) {
	const authSagaContext : AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHANGE_EMAIL_NOT_HAS_PASSWORD}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance : AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { type, ...payloadData } = payload;
		const response: AccountPutChangeEmailHasPasswordResponseType = yield call(() => putApi(url, authInstance, payloadData));
		if (response.status === 204 && response.data.email) {
			yield put(setEmailChanged({ new_email: response.data.email, changed: true }));
		}
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
	yield takeLatest(Types.ACCOUNT_POST_REGISTER, accountPostRegisterSaga);
	yield takeLatest(Types.ACCOUNT_PATCH_PROFIL, withCallback(accountPatchProfilSaga as Saga));
	yield takeLatest(Types.ACCOUNT_GET_CHECK_ACCOUNT, accountGetCheckAccountSaga);
	yield takeLatest(Types.ACCOUNT_POST_RESEND_VERIFICATION, withCallback(accountPostResendVerificationSaga as Saga));
	yield takeLatest(Types.ACCOUNT_POST_PASSWORD_CHANGE, withCallback(accountPostPasswordChangeSaga as Saga));
	yield takeLatest(Types.ACCOUNT_PUT_CREATE_PASSWORD, withCallback(accountPutCreatePasswordSaga as Saga));
	yield takeLatest(Types.ACCOUNT_POST_SEND_PASSWORD_RESET, withCallback(accountPostSendPasswordResetSaga as Saga));
	yield takeLatest(Types.ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD, withCallback(accountPutChangeEmailHasPasswordSaga as Saga));
	yield takeLatest(Types.ACCOUNT_PUT_CHANGE_EMAIL_NOT_HAS_PASSWORD, withCallback(accountPutChangeEmailNotHasPasswordSaga as Saga));
	yield takeLatest(Types.ACCOUNT_SET_FACEBOOK_EMAIL, accountSetFacebookEmailSaga);
	yield takeLatest(Types.WS_USER_AVATAR, wsUserAvatarSaga);
}
