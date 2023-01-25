import { put, takeLatest, call, select } from 'redux-saga/effects';
import * as Types from '../../actions';
import { ctxAuthSaga } from '../_init/_initSaga';
import { generatePageQueryParams, getBackendNextPageNumber, isAuthenticatedInstance } from "../../../utils/helpers";
import { ApiErrorResponseType, AuthSagaContextType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import { getApi, patchApi, postApi, postFormDataApi } from '../../services/_init/_initAPI';
import {
	ChatGetConversationsResponseType,
	ChatGetConversationsType,
	ChatGetMessageResponseType,
	ChatGetMessagesOfTargetResponseType,
	ChatPatchMessageSeenResponseType, ChatPostMessageImageType,
	ChatPostMessageOutput,
	ChatPostMessageResponseType,
	ChatPostMessageType
} from "../../../types/messages/messagesTypes";
import {
	setConversationsList,
	setGetWSMessage,
	setPatchMessageAsViewed,
	setPostMessage,
	setSelectedConversation,
	setSelectedConversationLoadMoreMessages,
	setWSUserStatus,
	setClearLocalMessagesOfTarget
} from "../../slices/messages/messagesSlice";
import { AxiosInstance } from 'axios';
import { withCallback } from 'redux-saga-callback';
import { Saga } from 'redux-saga';
import {
	getMyConversationsResults,
	getSelectedConversationNextPage,
	getSelectedConversationResults
} from "../../selectors";
import { chatGetConversationsAction } from "../../actions/messages/messagesActions";

function* chatGetConversationsSaga(payload: { type: string; url: string; isReset: boolean }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatGetConversationsResponseType = yield call(() => getApi(payload.url, authInstance));
		if (response.status === 200 && response.data) {
			let map: Array<ChatGetConversationsType> = [];
			if (!payload.isReset) {
				map = yield select(getMyConversationsResults);
			}
			response.data.results.map((conversation) => {
				map.push(conversation);
			});
			const result = {
				results: map,
				nextPage: getBackendNextPageNumber(response.data.next),
				count: response.data.count,
			};
			yield put(setConversationsList(result));
			return true;
		}
	}
}

function* chatPostMessageSaga(payload: ChatPostMessageType) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatPostMessageResponseType = yield call(() => postFormDataApi(url, authInstance, {
			'body': payload.body,
			'recipient' : payload.recipient_pk
		}));
		// Chat post message has 201 created status
		if (response.status === 201) {
			yield put(setPostMessage(response.data));
			return true;
		}
	}
}

function* chatPostMessageImageSaga(payload: ChatPostMessageImageType) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatPostMessageResponseType = yield call(() => postFormDataApi(url, authInstance, {
			'attachment': payload.attachment,
			'recipient' : payload.recipient_pk
		}));
		// Chat post message has 201 created status
		if (response.status === 201) {
			yield put(setPostMessage(response.data));
			return true;
		}
	}
}

function* chatPostArchiveConversationSaga(payload: { type: string; recipient: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ARCHIVE_CONVERSATION}`;
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ResponseOnlyInterface = yield call(() =>
			postApi(url, authInstance, { recipient: payload.recipient }),
		);
		if (response.status === 204) {
			// Empty selected conversation
			yield put(setClearLocalMessagesOfTarget());
			return true;
		}
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
			return true;
		}
	}
}

function* chatGetLoadMoreMessagesOfTargetSaga() {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const nextPage: string | null = yield select(getSelectedConversationNextPage);
	if (nextPage && authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatGetMessagesOfTargetResponseType = yield call(() =>
			getApi(nextPage, authInstance),
		);
		if (response.status === 200 && response.data) {
			yield put(setSelectedConversationLoadMoreMessages(response.data.chat_messages));
			return true;
		}
	}
}

function* chatPatchMessageAsSeenSaga(payload: { type: string; message_pk: number }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.message_pk}/`;
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatPatchMessageSeenResponseType = yield call(() => patchApi(url, authInstance, { viewed: true }));
		if (response.status === 200) {
			yield put(setPatchMessageAsViewed(response.data.pk));
		}
	}
}

function* wsNewMessageSaga(payload: { type: string; pk: number; initiator: number; recipient: number; body: string }) {
	const authSagaContext: AuthSagaContextType = yield call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.pk}/`;
	const conversationsResults: Array<ChatGetConversationsType> = yield select(getMyConversationsResults);
	if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
		const authInstance: AxiosInstance = yield call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
		const response: ChatGetMessageResponseType = yield call(() => getApi(url, authInstance));
		if (response.status === 200) {
			yield put(setGetWSMessage(response.data));
			const conversationListindex = conversationsResults.findIndex((item) => item.user_pk === response.data.user);
			// first time conversation is created
			// reload conversations list
			const chat_conversation_url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}?page=1`;
			if (conversationListindex == -1) {
				yield put(chatGetConversationsAction(chat_conversation_url, true));
			}
		}
	}
}

function* wsMessageViewedSaga(payload: { type: string; pk: number; initiator: number; recipient: number }) {
	yield put(setPatchMessageAsViewed(payload.pk));
}

function* wsUserStatusSaga(payload: { type: string; user: number; online: boolean; recipient: number }) {
	yield put(setWSUserStatus({ user_pk: payload.user, status: payload.online }));
}

function* setClearMessagesOfTarget() {
	yield put(setClearLocalMessagesOfTarget());
}

export function* watchMessages() {
	yield takeLatest(Types.CHAT_GET_CONVERSATIONS, withCallback(chatGetConversationsSaga as Saga));
	yield takeLatest(Types.CHAT_POST_MESSAGE, withCallback(chatPostMessageSaga as Saga));
	yield takeLatest(Types.CHAT_POST_MESSAGE_IMAGE, withCallback(chatPostMessageImageSaga as Saga));
	yield takeLatest(Types.CHAT_POST_ARCHIVE, withCallback(chatPostArchiveConversationSaga as Saga));
	yield takeLatest(Types.CHAT_GET_MESSAGES, withCallback(chatGetMessagesOfTargetSaga as Saga));
	yield takeLatest(Types.CHAT_PATCH_MESSAGE, chatPatchMessageAsSeenSaga as Saga);
	yield takeLatest(Types.WS_NEW_MESSAGE, wsNewMessageSaga);
	yield takeLatest(Types.WS_MESSAGE_VIEWED, wsMessageViewedSaga);
	yield takeLatest(Types.WS_USER_STATUS, wsUserStatusSaga);
	yield takeLatest(Types.CHAT_SET_CLEAR_MESSAGES_OF_TARGET, setClearMessagesOfTarget);
	yield takeLatest(Types.CHAT_GET_LOAD_MORE_MESSAGES, withCallback(chatGetLoadMoreMessagesOfTargetSaga as Saga));
}
