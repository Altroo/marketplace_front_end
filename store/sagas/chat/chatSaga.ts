import { put, takeLatest, call, select } from 'typed-redux-saga/macro';
import * as Types from "../../actions";
import { ctxAuthSaga } from '../_init/_initSaga';
import { isAuthenticatedInstance } from '../../../utils/helpers';
import { AxiosErrorDefaultType, ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import { getApi, patchApi, postApi, postFormDataApi } from '../../services/_init/_initAPI';
import {
	ChatGetConversationsResponseType, ChatGetMessageResponseType,
	ChatGetMessagesOfTargetResponseType, ChatPatchMessageSeenResponseType,
	ChatPostMessageResponseType,
	ChatPostMessageType,
} from '../../../types/chat/chatTypes';
import {
	setConversationsList, setGetWSMessage,
	setPatchMessageAsViewed,
	setPostArchiveConversation,
	setPostMessage,
	setSelectedConversation, setWSUserStatus,
} from '../../slices/chat/chatSlice';
import { getMyConversationsNextPage, getMyConversationsResults } from '../../selectors';


function* chatGetConversationsSaga() {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	let url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
	const nextPage = yield* select(getMyConversationsNextPage);
	let page = 1;
	if (nextPage) {
		const queryIndex = nextPage.search('=');
		page = parseInt(nextPage.slice(queryIndex + 1)[0]);
	}
	const pageUrl = `?page=${page}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			url += pageUrl;
			const response: ChatGetConversationsResponseType = yield* call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield* put(setConversationsList(response.data));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* chatPostMessageSaga(payload: ChatPostMessageType) {
    const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
	const conversationsResults = yield* select(getMyConversationsResults);
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...payloadData } = payload;
			const response: ChatPostMessageResponseType = yield* call(() => postFormDataApi(url, authInstance, payloadData));
			// Chat post message has 201 created status
            if (response.status === 201) {
				yield* put(setPostMessage(response.data));
				const conversationListindex = conversationsResults.findIndex((item) => item.user_pk === response.data.user);
				// first time conversation is created
				// reload conversations list
				if (conversationListindex == -1){
					yield* call(() => chatGetConversationsSaga());
				}
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* chatPostArchiveConversationSaga(payload: {type: string, recipient_pk: number}) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_ARCHIVE_CONVERSATION}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ResponseOnlyInterface = yield* call(() => postApi(url, authInstance,
				{recipient_pk: payload.recipient_pk}));
            if (response.status === 204) {
				// reload conversations list.
				yield* put(setPostArchiveConversation(payload.recipient_pk));
			} else {
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* chatGetMessagesOfTargetSaga(payload: {type: string, target: number}) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ChatGetMessagesOfTargetResponseType = yield* call(() => getApi(url, authInstance,
				{target: payload.target}));
			if (response.status === 200) {
				yield* put(setSelectedConversation(response.data));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* chatPatchMessageAsSeenSaga(payload: {type: string, message_pk: number}) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.message_pk}/`;
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null) {
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ChatPatchMessageSeenResponseType = yield* call(() => patchApi(url, authInstance,
				{viewed: true}));
			if (response.status === 200) {
				// response.data.pk = message_pk
				// handled via WS.
				// yield* put(setPatchMessageAsSeen(response.data.pk));
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* wsNewMessageSaga(payload: {type: string, pk: number, initiator: number, recipient: number, body: string}) {
	const authSagaContext = yield* call(() => ctxAuthSaga());
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}${payload.pk}/`;
	const conversationsResults = yield* select(getMyConversationsResults);
	try {
		if (authSagaContext.tokenType === 'TOKEN' && authSagaContext.initStateToken.access_token !== null){
			const authInstance = yield* call(() => isAuthenticatedInstance(authSagaContext.initStateToken));
			const response: ChatGetMessageResponseType = yield* call(() => getApi(url, authInstance));
			if (response.status === 200) {
				yield* put(setGetWSMessage(response.data));
				const conversationListindex = conversationsResults.findIndex((item) => item.user_pk === response.data.user);
				// first time conversation is created
				// reload conversations list
				if (conversationListindex == -1){
					yield* call(() => chatGetConversationsSaga());
				}
			} else {
				console.log(response.data);
				console.log(response.status);
			}
		}
	} catch (e) {
		const errors = e as AxiosErrorDefaultType;
		console.log(errors);
		// set error state
	}
}

function* wsMessageViewedSaga(payload: {type: string, pk: number, initiator: number, recipient: number}) {
	yield* put(setPatchMessageAsViewed(payload.pk));
}

function* wsUserStatusSaga(payload: {type: string, user: number, online: boolean, recipient: number}) {
	yield* put(setWSUserStatus({user_pk: payload.user, status: payload.online}));
}

export function* watchChat() {
	yield* takeLatest(Types.CHAT_GET_CONVERSATIONS, chatGetConversationsSaga)
    yield* takeLatest(Types.CHAT_POST_MESSAGE, chatPostMessageSaga)
    yield* takeLatest(Types.CHAT_POST_ARCHIVE, chatPostArchiveConversationSaga)
    yield* takeLatest(Types.CHAT_GET_MESSAGES, chatGetMessagesOfTargetSaga)
    yield* takeLatest(Types.CHAT_PATCH_MESSAGE, chatPatchMessageAsSeenSaga)
    yield* takeLatest(Types.WS_NEW_MESSAGE, wsNewMessageSaga)
    yield* takeLatest(Types.WS_MESSAGE_VIEWED, wsMessageViewedSaga)
    yield* takeLatest(Types.WS_USER_STATUS, wsUserStatusSaga)
}