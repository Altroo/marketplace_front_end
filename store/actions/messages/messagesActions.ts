import * as types from '../index';

export const chatPostMessageAction = (recipient_pk: number, body: string | null = null, attachment : File | string | null = null) => {
	return {
		type: types.CHAT_POST_MESSAGE,
		recipient_pk,
		body,
		attachment
	};
};

export const chatPostArchiveConversationAction = (recipient: number) => {
	return {
		type: types.CHAT_POST_ARCHIVE,
		recipient
	};
};

export const chatGetMessagesOfTargetAction = (target: number) => {
	return {
		type: types.CHAT_GET_MESSAGES,
		target
	};
};

export const chatSetClearMessagesOfTargetAction = () => {
	return {
		type: types.CHAT_SET_CLEAR_MESSAGES_OF_TARGET,
	};
}

export const chatGetLoadMoreMessagesOfTargetAction = () => {
	return {
		type: types.CHAT_GET_LOAD_MORE_MESSAGES,
	};
};

export const chatPatchMessageAsSeenAction = (message_pk: number) => {
	return {
		type: types.CHAT_PATCH_MESSAGE,
		message_pk
	};
};

export const chatGetConversationsAction = (url: string, isReset: boolean) => {
	return {
		type: types.CHAT_GET_CONVERSATIONS,
		url,
		isReset
	};
}