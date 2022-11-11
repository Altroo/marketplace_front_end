import * as types from '../index';

export const WSOfferPicture1Action = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_1,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture1ThumbAction = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_1_THUMB,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture2Action = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_2,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture2ThumbAction = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_2_THUMB,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture3Action = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_3,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture3ThumbAction = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_3_THUMB,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture4Action = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_4,
		pk,
		offer_picture,
	};
};

export const WSOfferPicture4ThumbAction = (pk: number, offer_picture: string) => {
	return {
		type: types.WS_OFFER_PICTURE_4_THUMB,
		pk,
		offer_picture,
	};
};

export const WSShopAvatarAction = (pk: number, avatar: string) => {
	return {
		type: types.WS_SHOP_AVATAR,
		pk,
		avatar
	};
};

export const WSUserAvatarAction = (pk: number, avatar: string) => {
	return {
		type: types.WS_USER_AVATAR,
		pk,
		avatar
	};
};

export const WSMaintenanceAction = (maintenance: boolean) => {
	return {
		type: types.WS_MAINTENANCE,
		maintenance
	};
};
