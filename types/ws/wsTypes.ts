export type WSEventType =
	| 'NEW_MESSAGE'
	| 'MSG_SEEN'
	| 'USER_STATUS'
	| 'SHOP_AVATAR'
	| 'USER_AVATAR'
	| 'MAINTENANCE'
	| 'OFFER_PICTURE_1'
	| 'OFFER_PICTURE_1_THUMB'
	| 'OFFER_PICTURE_2'
	| 'OFFER_PICTURE_2_THUMB'
	| 'OFFER_PICTURE_3'
	| 'OFFER_PICTURE_3_THUMB'
	| 'OFFER_PICTURE_4'
	| 'OFFER_PICTURE_4_THUMB';

export type WSEvent<T> = {
	message: T;
};
/*
"message": {
	"pk": offer.pk,
	"offer_picture": offer.get_absolute_picture_1 [..._thumbnail, ...],
}
 */
/* OFFER_PICTURE_1 'OFFER_PICTURE_1' | 'OFFER_PICTURE_1_THUMB' | 'OFFER_PICTURE_2' | 'OFFER_PICTURE_2_THUMB' |
'OFFER_PICTURE_3' | 'OFFER_PICTURE_3_THUMB' |
'OFFER_PICTURE_4' | 'OFFER_PICTURE_4_THUMB' */
export type WSOfferPictureType = {
	type: WSEventType;
	pk: number;
	offer_picture: string;
};

/*
"message": {
	"pk": object_.user.pk,
	"avatar": object_.get_absolute_avatar_thumbnail,
}
 */
export type WSShopAvatar = {
	type: WSEventType; // SHOP_AVATAR
	pk: number;
	avatar: string;
};
/*
"message": {
	"pk": object_.pk,
	"avatar": object_.get_absolute_avatar_thumbnail,
}
 */
export type WSUserAvatar = {
	type: WSEventType; // USER_AVATAR
	pk: number;
	avatar: string;
};
/*
"message": {
	"recipient": user.user.pk,
	"maintenance": True / False
}
 */
export type WSMaintenance = {
	type: WSEventType; // MAINTENANCE
	recipient: number;
	maintenance: boolean;
};
