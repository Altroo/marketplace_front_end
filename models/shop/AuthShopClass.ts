import { ShopDaysType, ShopFontNameType, ShopZoneByType } from '../../types/shop/shopTypes';

export class AuthShopClass {
	constructor(
		public shop_name: string,
		public avatar: string | ArrayBuffer,
		public color_code: string,
		public bg_color_code: string,
		public font_name: ShopFontNameType,
	) {}
}

export class AddShopClass {
	constructor(
		public shop_name?: string,
		public avatar?: string | ArrayBuffer | null,
		public color_code?: string,
		public bg_color_code?: string,
		public font_name?: ShopFontNameType,
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
		public font_name: ShopFontNameType,
		public bio: string,
		public opening_days: Array<ShopDaysType>,
		public morning_hour_from: string,
		public morning_hour_to: string,
		public afternoon_hour_from: string,
		public afternoon_hour_to: string,
		public phone: string,
		public contact_email: string,
		public website_link: string,
		public facebook_link: string,
		public twitter_link: string,
		public instagram_link: string,
		public whatsapp: string,
		public zone_by: ShopZoneByType,
		public longitude: number,
		public latitude: number,
		public address_name: string,
		public km_radius: number,
		public creator: boolean,
	) {
		super(shop_name, avatar, color_code, bg_color_code, font_name);
	}
}
