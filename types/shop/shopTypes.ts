import { AddShopClass, AuthShopClass, UserShopClass } from '../../models/shop/AuthShopClass';
import { GlobalApiPromiseError, Nullable, ResponseDataInterface } from "../_init/_initTypes";
import { NextRouter } from "next/router";
// ('L', 'Light'), ('R', 'Regular'), ('S', 'Semi-bold'), ('B', 'Black'),
export type ShopFontNameType = 'L' | 'R' | 'S' | 'B';
// ('A', 'Address'), ('S', 'Sector')
export type ShopZoneByType = 'A' | 'S';
// ('A', 'En attente de confirmation'), ('R', 'Rejeté'), ('C', 'Confirmé'),
// export type ShopCreatorStatusType = "A" | "R" | "C";
export type ShopDaysType = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU' | 'AL';

export interface ShopPostRootType extends AuthShopClass {
	type: string;
	router: NextRouter,
}

export interface ShopGetRootType {
	type: string;
	qaryb_link?: string;
}

export interface ShopPatchRootType extends UserShopClass {
	type: string;
}

export interface ShopPostRootTokenType extends AuthShopClass {
	pk: number;
	creator: boolean;
	qaryb_link: string;
}

export interface ShopPostRootUniqueIDType extends AuthShopClass {
	unique_id: string;
	expiration_date: string;
	qaryb_link: string;
}

export type OpeningDaysArray = Array<{ pk: number; code_day: ShopDaysType; name_day: string }>;

export interface ShopGetRootTokenType extends Omit<Nullable<UserShopClass>, 'opening_days'> {
	pk: number;
	user: number;
	opening_days: OpeningDaysArray | null;
	creator: boolean;
	is_subscribed: boolean;
}

export interface ShopGetRootUniqueIDType extends Omit<Nullable<UserShopClass>, 'pk' | 'creator' | 'opening_days' | 'zone_by'> {
	opening_days: OpeningDaysArray | null;
	zone_by: ShopZoneByType;
}

export type ShopPostRootTokenResponseType = ResponseDataInterface<ShopPostRootTokenType>;

export type ShopPostRootUniqueIDResponseType = ResponseDataInterface<ShopPostRootUniqueIDType>;

export type ShopGetRootTokenResponseType = ResponseDataInterface<ShopGetRootTokenType>;

export type ShopGetRootUniqueIDResponseType = ResponseDataInterface<ShopGetRootUniqueIDType>;

export interface ShopStateToken extends Nullable<AuthShopClass> {
	pk: number | null;
	creator: boolean | null;
	qaryb_link: string | null;
}

export type ShopStateUniqueID = Nullable<ShopPostRootUniqueIDType>;

export type PhoneCodesType = { phone_codes: Array<string> };

//!- Shop State
export interface ShopStateInterface<T, K> {
	userShop: T | K | null;
	userShopApi: GlobalApiPromiseError,
	phoneCodes: Array<string>;
	phoneCodesApi: GlobalApiPromiseError,
	newShop: AddShopClass | Record<string, unknown>;
	// newShopApi: GlobalApiPromiseError,
}

export type ShopGetPhoneCodesResponseType = ResponseDataInterface<PhoneCodesType>;

export type ShopNameType = Pick<UserShopClass, 'shop_name'>;

export type ShopPatchShopNameType = ResponseDataInterface<ShopNameType>;

export type ShopAvatarType = Pick<UserShopClass, 'avatar'>;

export type ShopPatchAvatarType = ResponseDataInterface<ShopAvatarType>;

export type ShopColorType = Pick<UserShopClass, 'color_code' | 'bg_color_code' | 'border' | 'icon_color'>;

export type ShopPatchColorType = ResponseDataInterface<ShopColorType>;

export type ShopFontType = Pick<UserShopClass, 'font_name'>;

export type ShopPatchFontType = ResponseDataInterface<ShopFontType>;

export type ShopContactPhoneType = Pick<
	UserShopClass,
	'contact_phone_code' | 'contact_phone' | 'contact_whatsapp_code' | 'contact_whatsapp' | 'contact_mode'
>;

export type ShopPatchContactPhoneType = ResponseDataInterface<ShopContactPhoneType>;

// export type ShopWhatsappType = Pick<UserShopClass, 'whatsapp_code' | 'whatsapp'>;

// export type ShopPatchWhatsappType = ResponseDataInterface<ShopWhatsappType>;

export type ShopBioType = Pick<UserShopClass, 'bio'>;

export type ShopPatchBioType = ResponseDataInterface<ShopBioType>;

export type ShopAvailabilityType = Pick<
	UserShopClass,
	'opening_days' | 'morning_hour_from' | 'morning_hour_to' | 'afternoon_hour_from' | 'afternoon_hour_to'
>;

export type ShopPatchAvailabilityType = ResponseDataInterface<ShopAvailabilityType>;

export type ShopContactType = Pick<
	UserShopClass,
	'phone' | 'contact_email' | 'website_link' | 'facebook_link' | 'twitter_link' | 'instagram_link' | 'whatsapp'
>;

export type ShopPatchContactType = ResponseDataInterface<ShopContactType>;

export type ShopAddressType = Pick<UserShopClass, 'zone_by' | 'longitude' | 'latitude' | 'address_name' | 'km_radius'>;

export type ShopPatchAddressType = ResponseDataInterface<ShopAddressType>;

// export type TypeExcludedShopPostRootType = Omit<ShopPostRootType, 'type'>;
