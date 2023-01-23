import { put, takeLatest, call, select } from 'redux-saga/effects';
import * as Types from '../../actions';
import { ctxAuthSaga } from '../_init/_initSaga';
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { ApiErrorResponseType, AuthSagaContextType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import { getApi, patchApi, postApi, postFormDataApi } from '../../services/_init/_initAPI';
import {
	ChatGetConversationsResponseType,
	ChatGetConversationsType,
	ChatGetMessageResponseType,
	ChatGetMessagesOfTargetResponseType,
	ChatPatchMessageSeenResponseType,
	ChatPostMessageResponseType,
	ChatPostMessageType,
} from '../../../types/messages/messagesTypes';
import {
	setConversationsList,
	setGetWSMessage,
	setPatchMessageAsViewed,
	setPostArchiveConversation,
	setPostMessage,
	setSelectedConversation,
	setWSUserStatus,
} from '../../slices/messages/messagesSlice';
import { getMyConversationsNextPage, getMyConversationsResults } from '../../selectors';
import { AxiosInstance } from 'axios';
import { withCallback } from 'redux-saga-callback';
import { Saga } from 'redux-saga';

function* chatGetConversationsSaga(payload: { type: string; url: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ChatGetConversationsResponseType = yield call(() => getApi(payload.url, authInstance));
			if (response.status === 200 && response.data) {
				return response.data;
			}
		}
	} catch (e) {
		return e as ApiErrorResponseType;
	}
}

// function* chatPostMessageSaga(payload: ChatPostMessageType) {
// 	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
// 	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
// 	const conversationsResults: Array<ChatGetConversationsType> = yield select(getMyConversationsResults);
// 	try {
// 		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
// 			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
// 			// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 			const { type, ...payloadData } = payload;
// 			const response: ChatPostMessageResponseType = yield call(() => postFormDataApi(url, authInstance, payloadData));
// 			// Chat post message has 201 created status
// 			if (response.status === 201) {
// 				yield put(setPostMessage(response.data));
// 				const conversationListindex = conversationsResults.findIndex((item) => item.user_pk === response.data.user);
// 				// first time conversation is created
// 				// reload conversations list
// 				if (conversationListindex == -1) {
// 					yield call(() => chatGetConversationsSaga());
// 				}
// 			} else {
// 				console.log(response.data);
// 				console.log(response.status);
// 			}
// 		}
// 	} catch (e) {
// 		const errors = e as ApiErrorResponseType;
// 		console.log(errors);
// 		// set error state
// 	}
// }

function* chatPostArchiveConversationSaga(payload: { type: string; recipient_pk: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ARCHIVE_CONVERSATION}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseOnlyInterface = yield call(() =>
				postApi(url, authInstance, { recipient_pk: payload.recipient_pk }),
			);
			if (response.status === 204) {
				// reload conversations list.
				yield put(setPostArchiveConversation(payload.recipient_pk));
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

function* chatGetMessagesOfTargetSaga(payload: { type: string; target: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatGetMessagesOfTargetResponseType = yield call(() =>
			getApi(url, authInstance, { target: payload.target }),
		);
		if (response.status === 200) {
			yield put(setSelectedConversation(response.data));
		}
	}
}

function* chatPatchMessageAsSeenSaga(payload: { type: string; message_pk: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.message_pk}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatPatchMessageSeenResponseType = yield call(() =>
			patchApi(url, authInstance, { viewed: true }),
		);
		if (response.status === 200) {
			return true;
		}
	}
}

// function* wsNewMessageSaga(payload: { type: string; pk: number; initiator: number; recipient: number; body: string }) {
// 	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
// 	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.pk}/`;
// 	const conversationsResults: Array<ChatGetConversationsType> = yield select(getMyConversationsResults);
// 	try {
// 		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
// 			const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
// 			const response: ChatGetMessageResponseType = yield call(() => getApi(url, authInstance));
// 			if (response.status === 200) {
// 				yield put(setGetWSMessage(response.data));
// 				const conversationListindex = conversationsResults.findIndex((item) => item.user_pk === response.data.user);
// 				// first time conversation is created
// 				// reload conversations list
// 				if (conversationListindex == -1) {
// 					yield call(() => chatGetConversationsSaga());
// 				}
// 			} else {
// 				console.log(response.data);
// 				console.log(response.status);
// 			}
// 		}
// 	} catch (e) {
// 		const errors = e as ApiErrorResponseType;
// 		console.log(errors);
// 		// set error state
// 	}
// }

function* wsMessageViewedSaga(payload: { type: string; pk: number; initiator: number; recipient: number }) {
	yield put(setPatchMessageAsViewed(payload.pk));
}

function* wsUserStatusSaga(payload: { type: string; user: number; online: boolean; recipient: number }) {
	yield put(setWSUserStatus({ user_pk: payload.user, status: payload.online }));
}

export function* watchMessages() {
	yield takeLatest(Types.CHAT_GET_CONVERSATIONS, withCallback(chatGetConversationsSaga as Saga));
	// yield takeLatest(Types.CHAT_POST_MESSAGE, chatPostMessageSaga);
	yield takeLatest(Types.CHAT_POST_ARCHIVE, chatPostArchiveConversationSaga);
	yield takeLatest(Types.CHAT_GET_MESSAGES, chatGetMessagesOfTargetSaga);
	yield takeLatest(Types.CHAT_PATCH_MESSAGE, withCallback(chatPatchMessageAsSeenSaga as Saga));
	// yield takeLatest(Types.WS_NEW_MESSAGE, wsNewMessageSaga);
	yield takeLatest(Types.WS_MESSAGE_VIEWED, wsMessageViewedSaga);
	yield takeLatest(Types.WS_USER_STATUS, wsUserStatusSaga);
}
