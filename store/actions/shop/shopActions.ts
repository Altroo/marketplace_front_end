import * as Types from '../index';
import { ShopFontNameType, ShopZoneByType } from '../../../types/shop/shopTypes';

export const setShopNameAction = (shop_name: string) => {
	return {
		type: Types.SET_SHOP_NAME,
		shop_name,
	};
};

export const setShopAvatarAction = (avatar: ArrayBuffer | string | null) => {
	return {
		type: Types.SET_SHOP_AVATAR,
		avatar,
	};
};

export const setShopColorAction = (color_code: string, bg_color_code: string) => {
	return {
		type: Types.SET_SHOP_COLOR,
		color_code,
		bg_color_code
	};
};

export const setShopFontAction = (font_name: ShopFontNameType) => {
	return {
		type: Types.SET_SHOP_FONT,
		font_name,
	};
};

export const loadNewAddedShopAction = () => {
	return {
		type: Types.LOAD_NEW_ADDED_SHOP_DATA
	};
};

// POST : /api/1.0.0/shop/
export const shopPostRootAction = (
	shop_name: string,
	avatar: ArrayBuffer | string,
	color_code: string,
	bg_color_code: string,
	font_name: ShopFontNameType,
) => {
	return {
		type: Types.SHOP_POST_ROOT,
		shop_name,
		avatar,
		color_code,
		bg_color_code,
		font_name,
	};
};

// GET : /api/1.0.0/shop/
export const shopGetRootAction = (qaryb_link?: string) => {
	return {
		type: Types.SHOP_GET_ROOT,
		qaryb_link,
	};
};

// GET : /api/1.0.0/shop/phone_codes/
export const shopGetPhoneCodesAction = () => {
	return {
		type: Types.SHOP_GET_PHONE_CODES,
	};
};

// PATCH : /api/1.0.0/shop/store_name/
export const shopPatchShopNameAction = (shop_name: string) => {
	return {
		type: Types.SHOP_PATCH_SHOP_NAME,
		shop_name,
	};
};

// PATCH : /api/1.0.0/shop/avatar/
export const shopPatchAvatarAction = (avatar: File | string) => {
	return {
		type: Types.SHOP_PATCH_AVATAR,
		avatar,
	};
};

// PATCH : /api/1.0.0/shop/color/
export const shopPatchColorAction = (color_code: string, bg_color_code: string) => {
	return {
		type: Types.SHOP_PATCH_COLOR,
		color_code,
		bg_color_code,
	};
};

// PATCH : /api/1.0.0/shop/font/
export const shopPatchFontAction = (font_name: ShopFontNameType) => {
	return {
		type: Types.SHOP_PATCH_FONT,
		font_name,
	};
};

// PATCH : /api/1.0.0/shop/phone/
export const shopPatchPhoneAction = (phone: string) => {
	return {
		type: Types.SHOP_PATCH_PHONE,
		phone,
	};
};
// PATCH : /api/1.0.0/shop/whatsapp/
export const shopPatchWhatsappAction = (whatsapp: string) => {
	return {
		type: Types.SHOP_PATCH_WHATSAPP,
		whatsapp,
	};
};
// PATCH : /api/1.0.0/shop/bio/
export const shopPatchBioAction = (bio: string) => {
	return {
		type: Types.SHOP_PATCH_BIO,
		bio,
	};
};
// PATCH : /api/1.0.0/shop/availability/
export const shopPatchAvailabilityAction = (
	opening_days: string,
	morning_hour_from: string,
	morning_hour_to: string,
	afternoon_hour_from: string,
	afternoon_hour_to: string,
) => {
	return {
		type: Types.SHOP_PATCH_AVAILABILITY,
		opening_days,
		morning_hour_from,
		morning_hour_to,
		afternoon_hour_from,
		afternoon_hour_to,
	};
};
// PATCH : /api/1.0.0/shop/contact/
export const shopPatchContactAction = (
	phone: string,
	contact_email: string,
	website_link: string,
	facebook_link: string,
	twitter_link: string,
	instagram_link: string,
	whatsapp: string,
) => {
	return {
		type: Types.SHOP_PATCH_CONTACT,
		phone,
		contact_email,
		website_link,
		facebook_link,
		twitter_link,
		instagram_link,
		whatsapp,
	};
};
// PATCH : /api/1.0.0/shop/address/
export const shopPatchAddressAction = (
	zone_by: ShopZoneByType,
	longitude: number,
	latitude: number,
	address_name: string,
) => {
	return {
		type: Types.SHOP_PATCH_ADDRESS,
		zone_by,
		longitude,
		latitude,
		address_name,
	};
};

export const shopPostCreatorAction = () => {
	return {
		type: Types.SHOP_POST_CREATOR,
	};
};