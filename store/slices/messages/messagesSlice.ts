import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ChatGetConversationsLinkedResponseType,
	ChatGetMessageOutput,
	ChatGetMessagesOfTargetInterface,
	ChatPostMessageOutput,
	ChatStateInterface
} from "../../../types/messages/messagesTypes";
import { paginationInitial } from "../_init/_initSlice";
import { PaginationResponseType } from "../../../types/_init/_initTypes";
// import { HYDRATE } from "next-redux-wrapper";

const initialState: ChatStateInterface = {
	conversationsList: null,
	selectedConversation: {
		chat_messages: paginationInitial,
		receiver: null,
	},
};

const messagesSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		setConversationsList: (state, action: PayloadAction<ChatGetConversationsLinkedResponseType>) => {
			state.conversationsList = action.payload;
			// if (state.conversationsList) {
			// 	state.conversationsList = action.payload;
			// }
		},
		setPostMessage: (state, action: PayloadAction<ChatPostMessageOutput>) => {
			// preppend to selected conversation
			// append ws new message to selected conversation
			// if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user) {
			state.selectedConversation.chat_messages.results.push(action.payload);
			// }
			// only change the body
			if (state.conversationsList) {
				const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user);
				// find from conversationList & change the body
				// if recipient_pk exists
				if (conversationListindex >= 0 && action.payload.body){
					state.conversationsList.results[conversationListindex].body = action.payload.body;
				}
			}
		},
		// TODO - require those
		/*
			pk: 22
			user_pk: 65
			user_avatar: "http://127.0.0.1:8000/media/media/user_avatars/80145727-e30c-42bf-8fab-8ff712f6b7a0.webp"
			user_first_name: "Yooy"
			user_last_name: "Altroo"
			body: "Hello"
			viewed: false
			created: "2023-01-23T20:33:28.778480Z"
			online: true
			shop_pk: null
			shop_name: null
			shop_avatar_thumbnail: null
		 */
		/*
			current :
	    "pk": 23,
	    "user": 65,
	    "initiator": "Yooy Altroo",
	    "recipient": 1,
	    "created": "2023-01-23T20:36:56.955888Z",
	    "body": "Hello",
	    "attachment_link": null,
	    "attachment_thumbnail_link": null,
	    "viewed": false
		 */
		setGetWSMessage: (state, action: PayloadAction<ChatGetMessageOutput>) => {
			if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user) {
				state.selectedConversation.chat_messages.results.push(action.payload);
			}
			if (state.conversationsList) {
				const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user);
				if (conversationListindex >= 0 && action.payload.body){
					state.conversationsList.results[conversationListindex].pk = action.payload.pk;
					state.conversationsList.results[conversationListindex].viewed = action.payload.viewed;
					state.conversationsList.results[conversationListindex].body = action.payload.body;
					state.conversationsList.results[conversationListindex].created = action.payload.created;
				}
			}
		},
		// setPostArchiveConversation: (state, action: PayloadAction<number>) => {
		// 	// find from conversationList with recipient_pk & delete it.
		// 	// payload has recipient_pk
		// 	if (state.conversationsList) {
		// 		const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload);
		// 		if (conversationListindex >= 0) {
		// 			state.conversationsList.results.splice(conversationListindex, 1);
		// 		}
		// 		// empty selectedConversation
		// 		state.selectedConversation = initialState.selectedConversation;
		// 		// return state;
		// 	}
		// },
		setSelectedConversation: (state, action: PayloadAction<ChatGetMessagesOfTargetInterface>) => {
			state.selectedConversation.receiver = action.payload.receiver;
			const map: Array<ChatPostMessageOutput> = [];
			action.payload.chat_messages.results.map((message) => {
				map.unshift(message);
			})
			state.selectedConversation.chat_messages = {
				count: action.payload.chat_messages.count,
				next: action.payload.chat_messages.next,
				previous: action.payload.chat_messages.previous,
				results: map,
			};
			// return state;
		},
		setSelectedConversationLoadMoreMessages: (state, action: PayloadAction<PaginationResponseType<ChatPostMessageOutput>>) => {
			const map: Array<ChatPostMessageOutput> = state.selectedConversation.chat_messages.results
			action.payload.results.map((messages) => {
				const messageIndex = state.selectedConversation.chat_messages.results.find((item) => item.pk === messages.pk);
				if (!messageIndex) {
					map.unshift(messages);
				}
			});
			state.selectedConversation.chat_messages = {
				count: action.payload.count,
				next: action.payload.next,
				previous: action.payload.previous,
				results: map,
			};
		},
		setPatchMessageAsViewed: (state, action: PayloadAction<number>) => {
			// payload has pk = message_pk
			// find from conversationList & selectedConversation & mark as seen.
			if (state.conversationsList) {
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
			}
			// return state;
		},
		setWSUserStatus: (state, action: PayloadAction<{user_pk: number, status: boolean}>) => {
			// from conversationList
			if (state.conversationsList) {
				const conversationListindex = state.conversationsList.results.findIndex((item) => item.user_pk === action.payload.user_pk);
				if (conversationListindex >= 0){
					state.conversationsList.results[conversationListindex].online = action.payload.status;
				}
				// from selectedConversation
				if (state.selectedConversation.receiver !== null && state.selectedConversation.receiver.pk === action.payload.user_pk) {
					state.selectedConversation.receiver.online = action.payload.status;
				}
			}
			// return state;
		},
		setClearLocalMessagesOfTarget: (state) => {
			state.selectedConversation = {
				chat_messages: paginationInitial,
				receiver: null,
			};
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
	// setPostArchiveConversation,
	setSelectedConversation,
	setGetWSMessage,
	setPatchMessageAsViewed,
	setWSUserStatus,
	setSelectedConversationLoadMoreMessages,
	setClearLocalMessagesOfTarget,
	initChat,
} = messagesSlice.actions;

export default messagesSlice.reducer;
