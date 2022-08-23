import { OpeningDaysArray, ShopFontNameType, ShopZoneByType } from "../../types/shop/shopTypes";
import { IconColorType } from "../../types/_init/_initTypes";

export class AuthShopClass {
	constructor(
		public shop_name: string,
		public avatar: string | ArrayBuffer,
		public color_code: string,
		public bg_color_code: string,
		public border: string,
		public icon_color: IconColorType,
		public font_name: ShopFontNameType,
	) {}
}

export class AddShopClass {
	constructor(
		public shop_name: string,
		public avatar: string | ArrayBuffer | null,
		public color_code: string,
		public bg_color_code: string,
		public border: string,
		public icon_color: IconColorType,
		public font_name: ShopFontNameType,
	) {}
}

export class UserShopClass extends AuthShopClass {
	constructor(
		public pk: number,
		public shop_name: string,
		public avatar: string | ArrayBuffer,
		public avatar_thumbnail: string | ArrayBuffer | null,
		public color_code: string,
		public bg_color_code: string,
		public border: string,
		public icon_color: IconColorType,
		public font_name: ShopFontNameType,
		public bio: string | null,
		public opening_days: OpeningDaysArray,
		public morning_hour_from: string | null,
		public morning_hour_to: string | null,
		public afternoon_hour_from: string | null,
		public afternoon_hour_to: string | null,
		public contact_phone_code: string,
		public contact_phone: string,
		public contact_whatsapp_code: string,
		public contact_whatsapp: string,
		public contact_mode: 'P' | 'W' | '',
		public phone: string | null,
		public contact_email: string | null,
		public website_link: string | null,
		public facebook_link: string | null,
		public twitter_link: string | null,
		public instagram_link: string | null,
		public whatsapp: string | null,
		public zone_by: ShopZoneByType,
		public longitude: number | null,
		public latitude: number | null,
		public address_name: string | null,
		public km_radius: number | null,
		public creator: boolean,
	) {
		super(shop_name, avatar, color_code, bg_color_code, border, icon_color, font_name);
	}
}
