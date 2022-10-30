import * as types from '../index';

export const WSOfferThumbnailAction = (pk: number, offer_thumbnail: string) => {
	return {
		type: types.WS_OFFER_THUMBNAIL,
		pk,
		offer_thumbnail
	};
};

export const WSShopAvatarAction = (pk: number, avatar_thumbnail: string) => {
	return {
		type: types.WS_SHOP_AVATAR,
		pk,
		avatar_thumbnail
	};
};

export const WSUserAvatarAction = (pk: number, avatar_thumbnail: string) => {
	return {
		type: types.WS_USER_AVATAR,
		pk,
		avatar_thumbnail
	};
};

export const WSMaintenanceAction = (maintenance: boolean) => {
	return {
		type: types.WS_MAINTENANCE,
		maintenance
	};
};
