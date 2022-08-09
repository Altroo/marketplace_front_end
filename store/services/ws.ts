import { eventChannel } from 'redux-saga';
import {
	WSChatMessageSeen,
	WSChatNewMessage,
	WSChatUserStatus,
	WSEvent,
	WSEventType,
	WSMaintenance,
	WSOfferThumbnails,
	WSShopAvatar,
	WSUserAvatar,
} from '../../types/ws/wsTypes';
import {
	WSMaintenanceAction,
	WSMessageSeenAction,
	WSNewMessageAction,
	WSOfferThumbnailAction,
	WSShopAvatarAction,
	WSUserAvatarAction,
	WSUserStatusAction,
} from '../actions/ws/wsActions';

let ws: WebSocket;

export function initWebsocket(token: string) {
	return eventChannel((emitter) => {
		function createWs() {
			if (typeof window !== 'undefined') {
				ws = new WebSocket(`ws://127.0.0.1:8000/chatws?token=${token}`);
				ws.onopen = () => {
					// ws.send('hello server')
					console.log('Listening to ws...');
				};
				ws.onerror = (error: Event) => {
					console.log('WS error ' + error);
				};
				ws.onmessage = (e: MessageEvent) => {
					const msg = JSON.parse(e.data);
					if (msg) {
						const { message } = msg;
						const SignalType : WSEventType = message.type;
						if (SignalType === 'NEW_MESSAGE') {
							const { message } = msg as WSEvent<WSChatNewMessage>;
							const {pk, initiator, recipient, body} = message;
							return emitter(WSNewMessageAction(pk, initiator, recipient, body));
						} else if (SignalType === 'MSG_SEEN') {
							const { message } = msg as WSEvent<WSChatMessageSeen>;
							const {pk, initiator, recipient} = message;
							return emitter(WSMessageSeenAction(pk, initiator, recipient));
						} else if (SignalType === 'USER_STATUS') {
							const { message } = msg as WSEvent<WSChatUserStatus>;
							const {user, online, recipient} = message;
							return emitter(WSUserStatusAction(user, online, recipient));
						} else if (SignalType === 'OFFER_THUMBNAIL') {
							const { message } = msg as WSEvent<WSOfferThumbnails>;
							const {pk, offer_thumbnail} = message;
							return emitter(WSOfferThumbnailAction(pk, offer_thumbnail));
						} else if (SignalType === 'SHOP_AVATAR') {
							const { message } = msg as WSEvent<WSShopAvatar>;
							const {pk, avatar_thumbnail} = message;
							return emitter(WSShopAvatarAction(pk, avatar_thumbnail));
						} else if (SignalType === 'USER_AVATAR') {
							const { message } = msg as WSEvent<WSUserAvatar>;
							const {pk, avatar_thumbnail} = message;
							return emitter(WSUserAvatarAction(pk, avatar_thumbnail));
						} else if (SignalType === 'MAINTENANCE') {
							const { message } = msg as WSEvent<WSMaintenance>;
							const {maintenance} = message;
							return emitter(WSMaintenanceAction(maintenance));
						}
						// switch (SignalType) {
						// 	case 'NEW_MESSAGE':
						// 		return emitter(WSNewMessageAction());
						// 	case 'MSG_SEEN':
						// 		return emitter(WSMessageSeenAction());
						// 	case 'USER_STATUS':
						// 		return emitter(WSUserStatusAction());
						// 	case 'OFFER_THUMBNAIL':
						// 		return emitter(WSOfferThumbnailAction());
						// 	case 'SHOP_AVATAR':
						// 		return emitter(WSShopAvatarAction());
						// 	case 'USER_AVATAR':
						// 		return emitter(WSUserAvatarAction());
						// 	case 'MAINTENANCE':
						// 		return emitter(WSMaintenanceAction(message.maintenance));
						// 	default:
						// 		console.log('default');
						// }
					}
				}; // unsubscribe function
				ws.onclose = (e: CloseEvent) => {
					console.log('Socket is closed Unexpectedly. Reconnect will be attempted in 4 second.', e.reason);
					setTimeout(() => {
						createWs();
					}, 4000);
				};
			}
		}
		createWs();
		return () => {
			console.log('Closing Websocket');
			ws.close();
		};
	});
}

/*
	 WS STATUS TITLE                                          e.code
	 WS_CLOSE_STATUS_NORMAL                                 = 1000,
	 WS_CLOSE_STATUS_GOINGAWAY                              = 1001,
	 WS_CLOSE_STATUS_PROTOCOL_ERR                           = 1002,
	 WS_CLOSE_STATUS_UNACCEPTABLE_OPCODE                    = 1003,
	 WS_CLOSE_STATUS_RESERVED                               = 1004,
	 WS_CLOSE_STATUS_NO_STATUS                              = 1005, // RESERVED
	 WS_CLOSE_STATUS_ABNORMAL_CLOSE                         = 1006,
	 WS_CLOSE_STATUS_INVALID_PAYLOAD                        = 1007,
	 WS_CLOSE_STATUS_POLICY_VIOLATION                       = 1008,
	 WS_CLOSE_STATUS_MESSAGE_TOO_LARGE                      = 1009,
	 WS_CLOSE_STATUS_EXTENSION_REQUIRED                     = 1010,
	 WS_CLOSE_STATUS_UNEXPECTED_CONDITION                   = 1011,
	 WS_CLOSE_STATUS_TLS_FAILURE                            = 1015,
	 WS_CLOSE_STATUS_CLIENT_TRANSACTION_DONE                = 2000,
*/