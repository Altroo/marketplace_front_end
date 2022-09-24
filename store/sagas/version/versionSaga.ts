import { put, takeLatest, call } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	setCurrentVersion,
	setCurrentVersionIsLoading,
	setWSMaintenance,
	SetGETVersionApiError
} from "../../slices/version/versionSlice";
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import { VersionGetRootResponseType } from '../../../types/version/versionTypes';
import { defaultInstance } from '../../../utils/helpers';
import { getApi } from '../../services/_init/_initAPI';
import { AxiosInstance } from "axios";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export function* versionSaga() {
	yield put(setCurrentVersionIsLoading());
	const BaseUrl = `${process.env.NEXT_PUBLIC_ROOT_API_URL_FOR_VERSION}`;
	const Url = `${process.env.NEXT_PUBLIC_VERSION_ROOT}/`;
	const instance: AxiosInstance = yield call(() => defaultInstance(BaseUrl));
	try {
		const response: VersionGetRootResponseType = yield call(() => getApi(Url, instance));
		if (response.status === 200) {
			yield put(setCurrentVersion({ ...response.data }));
		}
	} catch (e) {
		const apiError = e as ApiErrorResponseType;
		yield put<ActionCreatorWithPayload<ApiErrorResponseType>>(yield call(() => SetGETVersionApiError(apiError)));
	}
}

function* wsMaintenanceSaga(payload: { type: string; maintenance: boolean }) {
	yield put(setWSMaintenance(payload.maintenance));
}

// function* setErrorSaga(payload: {
// 	type: string,
// 	promise_status: ApiPromiseStatus,
// 	error: AxiosErrorDefaultType
// }) {
// 	console.log('FROM dynamic setErrorSaga');
// 	// pass error to slice
// 	yield call(() => {console.log(payload)});
// }

export function* watchVersion() {
	yield takeLatest(Types.VERSION_GET_ROOT, versionSaga);
	// yield takeLatest(Types.VERSION_GET_ROOT_ERROR, setErrorSaga)
	// yield takeLatest('VERSION_2_GET_ROOT_ERROR', setErrorSaga)
	yield takeLatest(Types.WS_MAINTENANCE, wsMaintenanceSaga);
}
