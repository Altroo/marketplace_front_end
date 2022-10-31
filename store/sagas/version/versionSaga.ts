import { put, takeLatest, call } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	setCurrentVersion,
	setWSMaintenance,
} from "../../slices/version/versionSlice";
import { VersionGetRootResponseType } from '../../../types/version/versionTypes';
import { defaultInstance } from '../../../utils/helpers';
import { getApi, postApi } from "../../services/_init/_initAPI";
import { AxiosInstance } from "axios";
import { Saga } from "redux-saga";
import { withCallback } from "redux-saga-callback";
import { ResponseOnlyInterface } from "../../../types/_init/_initTypes";

export function* versionSaga() {
	const BaseUrl = `${process.env.NEXT_PUBLIC_ROOT_API_URL_FOR_VERSION}`;
	const Url = `${process.env.NEXT_PUBLIC_VERSION_ROOT}/`;
	const instance: AxiosInstance = yield call(() => defaultInstance(BaseUrl));
	const response: VersionGetRootResponseType = yield call(() => getApi(Url, instance));
	if (response.status === 200) {
		yield put(setCurrentVersion({ ...response.data }));
	}
}

function* wsMaintenanceSaga(payload: { type: string; maintenance: boolean }) {
	yield put(setWSMaintenance(payload.maintenance));
}

function* newsLetterSaga(payload: {type: string, email: string}) {
	const baseUrl = `${process.env.NEXT_PUBLIC_ROOT_API_URL_FOR_VERSION}`;
	const url = `${process.env.NEXT_PUBLIC_VERSION_NEWS_LETTER}`;
	const instance: AxiosInstance = yield call(() => defaultInstance(baseUrl));
	const response: ResponseOnlyInterface = yield call(() => postApi(url, instance, {
		'email': payload.email,
	}));
	if (response.status === 204) {
		return true;
	}
}

export function* watchVersion() {
	yield takeLatest(Types.VERSION_GET_ROOT, versionSaga);
	yield takeLatest(Types.VERSION_POST_NEWS_LETTER, withCallback(newsLetterSaga as Saga));
	yield takeLatest(Types.WS_MAINTENANCE, wsMaintenanceSaga);
}
