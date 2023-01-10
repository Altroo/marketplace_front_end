import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ChatGetConversationsPaginatedType, ChatGetMessageOutput,
	ChatGetMessagesOfTargetInterface,
	ChatPostMessageOutput,
	ChatStateInterface,
} from '../../../types/chat/chatTypes';
import { paginationInitial } from "../_init/_initSlice";
// import { HYDRATE } from "next-redux-wrapper";

const initialState: ChatStateInterface = {
	conversationsList: paginationInitial,
	selectedConversation: {
		chat_messages: paginationInitial,
		receiver: null,
	},
};

const chatSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		setConversationsList: (state, action: PayloadAction<ChatGetConversationsPaginatedType>) => {
			const { next, previous, count, results } = action.payload;
			state.conversationsList.count = count;
			state.conversationsList.next = next;
			state.conversationsList.previous = previous;
			for (let i = 0; i < results.length; i++) {
				state.conversationsList.results.push(results[i]);
			}
			// return state;
		},
		setPostMessage: (state, action: PayloadAction<ChatPostMessageOutput>) => {
			// preppend to selected conversation
			// append ws new message to selected conversation
			// if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user) {
			state.selectedConversation.chat_messages.results.unshift(action.payload);
			// }
			// only change the body
			const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user);
			// find from conversationList & change the body
			// if recipient_pk exists
			if (conversationListindex >= 0 && action.payload.body){
				state.conversationsList.results[conversationListindex].body = action.payload.body;
			}
			// else reloads conversation list inside sagas.
			// return state;
		},
		setGetWSMessage: (state, action: PayloadAction<ChatGetMessageOutput>) => {
			if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user) {
				state.selectedConversation.chat_messages.results.unshift(action.payload);
			}
			const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user);
			if (conversationListindex >= 0 && action.payload.body){
				state.conversationsList.results[conversationListindex].body = action.payload.body;
			}
			// return state;
		},
		setPostArchiveConversation: (state, action: PayloadAction<number>) => {
			// find from conversationList with recipient_pk & delete it.
			// payload has recipient_pk
			const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload);
			if (conversationListindex >= 0) {
				state.conversationsList.results.splice(conversationListindex, 1);
			}
			// empty selectedConversation
			state.selectedConversation = initialState.selectedConversation;
			// return state;
		},
		setSelectedConversation: (state, action: PayloadAction<ChatGetMessagesOfTargetInterface>) => {
			state.selectedConversation = action.payload;
			// return state;
		},
		setPatchMessageAsViewed: (state, action: PayloadAction<number>) => {
			// payload has pk = message_pk
			// find from conversationList & selectedConversation & mark as seen.
			const conversationListindex = state.conversationsList.results.findIndex((item) => item.pk === action.payload);
			if (conversationListindex >= 0){
				state.conversationsList.results[conversationListindex].viewed = true;
			}
			if (state.selectedConversation.chat_messages.results !== null) {
				const chatMessage = state.selectedConversation.chat_messages.results.find((item) => item.pk === action.payload);
				if (chatMessage){
					chatMessage.viewed = true;
				}
			}
			// return state;
		},
		setWSUserStatus: (state, action: PayloadAction<{user_pk: number, status: boolean}>) => {
			// from conversationList
			const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user_pk);
			if (conversationListindex >= 0){
				state.conversationsList.results[conversationListindex].online = action.payload.status;
			}
			// from selectedConversation
			if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user_pk) {
				state.selectedConversation.receiver.online = action.payload.status;
			}
			// return state;
		},
		initChat: () => {
			return initialState;
		}
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.chat };
	// 	},
	// },
});

export const {
	setConversationsList,
	setPostMessage,
	setPostArchiveConversation,
	setSelectedConversation,
	setGetWSMessage,
	setPatchMessageAsViewed,
	setWSUserStatus,
	initChat,
} = chatSlice.actions;

export default chatSlice.reducer;
