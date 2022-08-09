export type WSEventType = 'NEW_MESSAGE' | 'MSG_SEEN' | 'USER_STATUS' | 'OFFER_THUMBNAIL' | 'SHOP_AVATAR' | 'USER_AVATAR' | 'MAINTENANCE';

export type WSEvent<T> = {
	message: T;
};
/*
"message": {
	"pk": instance.id,
	"initiator_pk": instance.user.pk,
	"recipient_pk": instance.recipient.pk,
	"body": body,
}
 */
export type WSChatNewMessage = {
	type: WSEventType, // NEW_MESSAGE
	pk: number,
	initiator: number,
	recipient: number,
	body: string
};
/*
"message": {
	"pk": self.id,
	"initiator": self.user.id,
	"recipient": self.recipient.id,
}
 */
export type WSChatMessageSeen = {
	type: WSEventType, // MSG_SEEN
	pk: number,
	initiator: number,
	recipient: number,
};
/*
"message": {
	"user_pk": self.user.pk,
	"online": True,
	"recipient_pk": user_pk,
}
 */
export type WSChatUserStatus = {
	type: WSEventType, // USER_STATUS
	user: number,
	online: boolean,
	recipient: number,
};
/*
"message": {
	"pk": offer.pk,
	"offer_thumbnail": offer.get_absolute_picture_1_thumbnail,
}
 */
export type WSOfferThumbnails = {
	type: WSEventType, // OFFER_THUMBNAIL
	pk: number,
	offer_thumbnail: string,
};
/*
"message": {
	"pk": object_.user.pk,
	"avatar_thumbnail": object_.get_absolute_avatar_thumbnail,
}
 */
export type WSShopAvatar = {
	type: WSEventType, // SHOP_AVATAR
	pk: number,
	avatar_thumbnail: string,
};
/*
"message": {
	"pk": object_.pk,
	"avatar_thumbnail": object_.get_absolute_avatar_thumbnail,
}
 */
export type WSUserAvatar = {
	type: WSEventType, // USER_AVATAR
	pk: number,
	avatar_thumbnail: string,
};
/*
"message": {
	"recipient": user.user.pk,
	"maintenance": True / False
}
 */
export type WSMaintenance = {
	type: WSEventType, // MAINTENANCE
	recipient: number,
	maintenance: boolean
};