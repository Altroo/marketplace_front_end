export type WSEventType = 'NEW_MESSAGE' | 'MSG_SEEN' | 'USER_STATUS' | 'OFFER_THUMBNAIL' | 'SHOP_AVATAR' | 'USER_AVATAR' | 'MAINTENANCE';

export type WSEvent<T> = {
	message: T;
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