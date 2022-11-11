import { eventChannel } from 'redux-saga';
import {
	WSEvent,
	WSEventType,
	WSMaintenance,
	WSOfferPictureType,
	WSShopAvatar,
	WSUserAvatar
} from "../../types/ws/wsTypes";
import {
	WSMaintenanceAction,
	WSShopAvatarAction,
	WSUserAvatarAction,
	WSOfferPicture1Action,
	WSOfferPicture1ThumbAction,
	WSOfferPicture2Action,
	WSOfferPicture2ThumbAction,
	WSOfferPicture3Action,
	WSOfferPicture3ThumbAction,
	WSOfferPicture4Action,
	WSOfferPicture4ThumbAction,
} from '../actions/ws/wsActions';

let ws: WebSocket;

export function initWebsocket(token: string) {
	return eventChannel((emitter) => {
		function createWs() {
			const wsUrl = `${process.env.NEXT_PUBLIC_ROOT_WS_URL}`
			if (typeof window !== 'undefined') {
				ws = new WebSocket(`${wsUrl}?token=${token}`);
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
						const signalType : WSEventType = message.type;
						console.log(signalType);
						if (signalType === 'OFFER_PICTURE_1') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture1Action(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_1_THUMB') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture1ThumbAction(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_2') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture2Action(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_2_THUMB') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture2ThumbAction(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_3') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture3Action(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_3_THUMB') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture3ThumbAction(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_4') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture4Action(pk, offer_picture));
						} else if (signalType === 'OFFER_PICTURE_4_THUMB') {
							const { message } = msg as WSEvent<WSOfferPictureType>;
							const { pk, offer_picture } = message;
							return emitter(WSOfferPicture4ThumbAction(pk, offer_picture));
						} else if (signalType === 'SHOP_AVATAR') {
							const { message } = msg as WSEvent<WSShopAvatar>;
							const {pk, avatar} = message;
							return emitter(WSShopAvatarAction(pk, avatar));
						} else if (signalType === 'USER_AVATAR') {
							const { message } = msg as WSEvent<WSUserAvatar>;
							const {pk, avatar} = message;
							return emitter(WSUserAvatarAction(pk, avatar));
						} else if (signalType === 'MAINTENANCE') {
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