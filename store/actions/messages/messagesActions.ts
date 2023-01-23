import * as types from '../index';

export const chatPostMessageAction = (recipient_pk: number, body: string | null, attachment : File | string | null) => {
	return {
		type: types.CHAT_POST_MESSAGE,
		recipient_pk,
		body,
		attachment
	};
};

export const chatPostArchiveConversationAction = (recipient_pk: number) => {
	return {
		type: types.CHAT_POST_ARCHIVE,
		recipient_pk
	};
};

export const chatGetMessagesOfTargetAction = (target: number) => {
	return {
		type: types.CHAT_GET_MESSAGES,
		target
	};
};

export const chatPatchMessageAsSeenAction = (message_pk: number) => {
	return {
		type: types.CHAT_PATCH_MESSAGE,
		message_pk
	};
};

export const chatGetConversationsAction = (url: string) => {
	return {
		type: types.CHAT_GET_CONVERSATIONS,
		url,
	};
}