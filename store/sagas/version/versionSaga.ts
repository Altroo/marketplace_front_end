import { put, takeLatest, call } from 'redux-saga/effects';
import * as Types from '../../actions';
import {
	setCurrentVersion,
	setWSMaintenance,
} from "../../slices/version/versionSlice";
import { VersionGetRootResponseType } from '../../../types/version/versionTypes';
import { defaultInstance } from '../../../utils/helpers';
import { getApi } from '../../services/_init/_initAPI';
import { AxiosInstance } from "axios";

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

export function* watchVersion() {
	yield takeLatest(Types.VERSION_GET_ROOT, versionSaga);
	yield takeLatest(Types.WS_MAINTENANCE, wsMaintenanceSaga);
}
