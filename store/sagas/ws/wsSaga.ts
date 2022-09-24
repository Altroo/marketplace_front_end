import {take, call, put, select} from 'typed-redux-saga/macro'
import {initWebsocket} from '../../services/ws';
import { getAccessToken } from '../../selectors';
import { RootState } from '../../store';


function* monitorToken(selector: (state: RootState) => string | null, previousValue: string | null, takePattern = "*") {
    while (true) {
        const nextValue = yield* select(selector);
        if (nextValue !== previousValue) {
            return nextValue;
        }
        yield* take(takePattern);
    }
}

export function* watchWS() {
  const token = yield* call(() => monitorToken(getAccessToken, null));
	if (token) {
		const channel = yield* call(() => initWebsocket(token));
		while (true) {
			const action = yield* take(channel);
			// type & payload passed from the switch case
			// with yield put it calles the action & passes the payload
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			yield* put(action);
		}
	}
}
