import * as Types from '../index';
import { ShopFontNameType, ShopZoneByType } from '../../../types/shop/shopTypes';
import { IconColorType } from '../../../types/_init/_initTypes';
import { NextRouter } from 'next/router';

export const setShopNameAction = (shop_name: string, router: NextRouter) => {
	return {
		type: Types.SET_SHOP_NAME,
		shop_name,
		router
	};
};

export const setShopAvatarAction = (avatar: ArrayBuffer | string | null, router: NextRouter) => {
	return {
		type: Types.SET_SHOP_AVATAR,
		avatar,
		router
	};
};
// SHOP_ADD_FONT
export const setShopColorAction = (color_code: string, bg_color_code: string, border: string, icon_color: string, router: NextRouter) => {
	return {
		type: Types.SET_SHOP_COLOR,
		color_code,
		bg_color_code,
		border,
		icon_color,
		router
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
		type: Types.LOAD_NEW_ADDED_SHOP_DATA,
	};
};

// POST : /api/1.0.0/shop/
export const shopPostRootAction = (
	shop_name: string,
	avatar: ArrayBuffer | string,
	color_code: string,
	bg_color_code: string,
	border: string,
	icon_color: IconColorType,
	font_name: ShopFontNameType,
) => {
	return {
		type: Types.SHOP_POST_ROOT,
		shop_name,
		avatar,
		color_code,
		bg_color_code,
		border,
		icon_color,
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
export const shopGetPhoneCodesAction = () => { // <= saga used as export
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
export const shopPatchAvatarAction = (avatar: ArrayBuffer | string) => {
	return {
		type: Types.SHOP_PATCH_AVATAR,
		avatar,
	};
};

// PATCH : /api/1.0.0/shop/color/
export const shopPatchColorAction = (
	color_code: string,
	bg_color_code: string,
	border: string,
	icon_color: IconColorType,
) => {
	return {
		type: Types.SHOP_PATCH_COLOR,
		color_code,
		bg_color_code,
		border,
		icon_color,
	};
};

// PATCH : /api/1.0.0/shop/font/
export const shopPatchFontAction = (font_name: ShopFontNameType) => {
	return {
		type: Types.SHOP_PATCH_FONT,
		font_name,
	};
};

// PATCH : /api/1.0.0/shop/phone_contact/
export const shopPatchPhoneContactAction = (
	contact_phone_code: string | null,
	contact_phone: string | null,
	contact_whatsapp_code: string | null,
	contact_whatsapp: string | null,
	contact_mode: 'P' | 'W',
) => {
	return {
		type: Types.SHOP_PATCH_PHONE_CONTACT,
		contact_phone_code,
		contact_phone,
		contact_whatsapp_code,
		contact_whatsapp,
		contact_mode,
	};
};

// PATCH : /api/1.0.0/shop/bio/
export const shopPatchBioAction = (bio: string | null) => {
	return {
		type: Types.SHOP_PATCH_BIO,
		bio,
	};
};
// PATCH : /api/1.0.0/shop/availability/
export const shopPatchAvailabilityAction = (
	opening_days: string | null,
	morning_hour_from: string | null,
	morning_hour_to: string | null,
	afternoon_hour_from: string | null,
	afternoon_hour_to: string | null,
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
	phone: string | null,
	contact_email: string | null,
	website_link: string | null,
	facebook_link: string | null,
	twitter_link: string | null,
	instagram_link: string | null,
	whatsapp: string | null,
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
	zone_by: ShopZoneByType | null,
	longitude: number | null,
	latitude: number | null,
	address_name: string | null,
	km_radius: number | null,
) => {
	return {
		type: Types.SHOP_PATCH_ADDRESS,
		zone_by,
		longitude,
		latitude,
		address_name,
		km_radius,
	};
};
