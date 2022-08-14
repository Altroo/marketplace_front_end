import { AddShopClass, AuthShopClass, UserShopClass } from '../../models/shop/AuthShopClass';
import { IconColorType, Nullable, ResponseDataInterface } from "../_init/_initTypes";
// ('L', 'Light'), ('R', 'Regular'), ('S', 'Semi-bold'), ('B', 'Black'),
export type ShopFontNameType = 'L' | 'R' | 'S' | 'B';
// ('A', 'Address'), ('S', 'Sector')
export type ShopZoneByType = 'A' | 'S';
// ('A', 'En attente de confirmation'), ('R', 'Rejeté'), ('C', 'Confirmé'),
// export type ShopCreatorStatusType = "A" | "R" | "C";
export type ShopDaysType = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU' | 'AL';

export interface ShopPostRootType extends AuthShopClass {
	type: string;
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

// TODO Check here
export type OpeningDaysArray = Array<{ pk: number; code_day: ShopDaysType; name_day: string }>;

export interface ShopGetRootTokenType extends Omit<Nullable<UserShopClass>, 'opening_days'> {
	pk: number;
	opening_days: OpeningDaysArray;
	creator: boolean;
}

export interface ShopGetRootUniqueIDType extends Omit<Nullable<UserShopClass>, 'pk' | 'creator' | 'opening_days'> {
	opening_days: OpeningDaysArray;
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
	userShop: T | K | Record<string, unknown>;
	phoneCodes: Pick<PhoneCodesType, 'phone_codes'> | [];
	newShop: AddShopClass | Record<string, unknown>;
	border: string;
	iconColor: IconColorType | null;
}


export type ShopGetPhoneCodesResponseType = ResponseDataInterface<PhoneCodesType>;

export type ShopNameType = Pick<UserShopClass, 'shop_name'>;

export type ShopPatchShopNameType = ResponseDataInterface<ShopNameType>;

export type ShopAvatarType = Pick<UserShopClass, 'avatar'>;

export type ShopPatchAvatarType = ResponseDataInterface<ShopAvatarType>;

export type ShopColorType = Pick<UserShopClass, 'color_code' | 'bg_color_code'>;

export type ShopPatchColorType = ResponseDataInterface<ShopColorType>;

export type ShopFontType = Pick<UserShopClass, 'font_name'>;

export type ShopPatchFontType = ResponseDataInterface<ShopFontType>;

export type ShopPhoneType = Pick<UserShopClass, 'phone'>;

export type ShopPatchPhoneType = ResponseDataInterface<ShopPhoneType>;

export type ShopWhatsappType = Pick<UserShopClass, 'whatsapp'>;

export type ShopPatchWhatsappType = ResponseDataInterface<ShopWhatsappType>;

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

export type ShopAddressType = Pick<UserShopClass, 'zone_by' | 'longitude' | 'latitude' | 'address_name'>;

export type ShopPatchAddressType = ResponseDataInterface<ShopAddressType>;

// export type TypeExcludedShopPostRootType = Omit<ShopPostRootType, 'type'>;
