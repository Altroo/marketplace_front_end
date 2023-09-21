import { put, takeLatest, call } from 'redux-saga/effects';
import * as Types from '../../actions';
import { ctxAuthSaga } from '../_init/_initSaga';
import { AxiosInstance } from "axios";
// import { Saga } from "redux-saga";
// import { withCallback } from "redux-saga-callback";
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { getApi, patchApi } from "../../services/_init/_initAPI";
import { AuthSagaContextType, ResponseOnlyInterface } from "../../../types/_init/_initTypes";
import { NotificationsGetRootResponseType, NotificationsType } from "../../../types/notification/notificationTypes";
import { setNotificationsState, setNotificationVueState, prependNotificationsState } from "../../slices/notification/notificationSlice";


function* notificationGetRootSaga() {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_NOTIFICATION_ROOT}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: NotificationsGetRootResponseType = yield call(() => getApi(url, instance));
		if (response.status === 200) {
			yield put(setNotificationsState(response.data));
			// return response.data;
		}
	}
}

function* notificationPatchRootSaga(payload: {type: string, pk: number}) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_NOTIFICATION_ROOT}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access !== null) {
		const instance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() => patchApi(url, instance, {
			'pk': payload.pk,
		}));
		if (response.status === 204) {
			yield put(setNotificationVueState(payload.pk));
		}
	}
}

function* wsNotificationSaga(payload: {type: string, pk: number, body: string | null, type_: NotificationsType, viewed: boolean, created_date: string}) {
	yield put(prependNotificationsState(payload));
}

export function* watchNotifications() {
	// yield takeLatest(Types.NOTIFICATION_GET_ROOT, withCallback(notificationGetRootSaga as Saga));
	yield takeLatest(Types.NOTIFICATION_GET_ROOT, notificationGetRootSaga);
	yield takeLatest(Types.NOTIFICATION_PATCH_ROOT, notificationPatchRootSaga);
	yield takeLatest(Types.WS_NOTIFICATION, wsNotificationSaga);
}