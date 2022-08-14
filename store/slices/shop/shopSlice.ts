import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ShopStateInterface,
	ShopStateToken,
	ShopPostRootUniqueIDType,
	ShopStateUniqueID,
	ShopPostRootTokenType,
	ShopGetRootTokenType,
	ShopGetRootUniqueIDType,
	ShopNameType,
	PhoneCodesType,
	ShopAvatarType,
	ShopColorType,
	ShopFontType,
	ShopPhoneType,
	ShopWhatsappType,
	ShopBioType,
	ShopAvailabilityType,
	ShopContactType,
	ShopAddressType,
	ShopFontNameType,
} from '../../../types/shop/shopTypes';
import { IconColorType } from "../../../types/_init/_initTypes";
// import { HYDRATE } from "next-redux-wrapper";

// GET | POST |
const initialState:
	| ShopStateInterface<ShopStateToken, ShopStateUniqueID>
	| ShopStateInterface<ShopGetRootTokenType, ShopGetRootUniqueIDType> = {
	userShop: {},
	phoneCodes: [],
	newShop: {},
	border: '',
	iconColor: null,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState: initialState,
	reducers: {
		setPostShopState: (state, action: PayloadAction<ShopPostRootTokenType | ShopPostRootUniqueIDType>) => {
			state.userShop = action.payload;
			return state;
		},
		setGetShopState: (state, action: PayloadAction<ShopGetRootTokenType | ShopGetRootUniqueIDType>) => {
			state.userShop = action.payload;
			return state;
		},
		setGetPhoneCodes: (state, action: PayloadAction<PhoneCodesType>) => {
			state.phoneCodes = action.payload;
			return state;
		},
		setShopName: (state, action: PayloadAction<ShopNameType>) => {
			state.userShop.shop_name = action.payload.shop_name;
			return state;
		},
		setShopAvatar: (state, action: PayloadAction<ShopAvatarType>) => {
			state.userShop.avatar = action.payload.avatar;
			return state;
		},
		setShopColors: (state, action: PayloadAction<ShopColorType>) => {
			state.userShop.color_code = action.payload.color_code;
			state.userShop.bg_color_code = action.payload.bg_color_code;
			return state;
		},
		setShopFont: (state, action: PayloadAction<ShopFontType>) => {
			state.userShop.font_name = action.payload.font_name;
			return state;
		},
		setShopPhone: (state, action: PayloadAction<ShopPhoneType>) => {
			if ('phone' in state.userShop) {
				state.userShop.phone = action.payload.phone;
			}
			return state;
		},
		setShopWhatsapp: (state, action: PayloadAction<ShopWhatsappType>) => {
			if ('whatsapp' in state.userShop) {
				state.userShop.whatsapp = action.payload.whatsapp;
			}
			return state;
		},
		setShopBio: (state, action: PayloadAction<ShopBioType>) => {
			if ('bio' in state.userShop) {
				state.userShop.bio = action.payload.bio;
			}
			return state;
		},
		// TODO TO CHECK OpeningDaysArray
		setShopAvailability: (state, action: PayloadAction<ShopAvailabilityType>) => {
			if ('opening_days' in state.userShop) {
				state.userShop.opening_days = action.payload.opening_days;
				state.userShop.morning_hour_from = action.payload.morning_hour_from;
				state.userShop.morning_hour_to = action.payload.morning_hour_to;
				state.userShop.afternoon_hour_from = action.payload.afternoon_hour_from;
				state.userShop.afternoon_hour_to = action.payload.afternoon_hour_to;
			}
			return state;
		},
		setShopContact: (state, action: PayloadAction<ShopContactType>) => {
			if ('phone' in state.userShop) {
				state.userShop.phone = action.payload.phone;
				state.userShop.contact_email = action.payload.contact_email;
				state.userShop.website_link = action.payload.website_link;
				state.userShop.facebook_link = action.payload.facebook_link;
				state.userShop.twitter_link = action.payload.twitter_link;
				state.userShop.instagram_link = action.payload.instagram_link;
				state.userShop.whatsapp = action.payload.whatsapp;
			}
			return state;
		},
		setShopAddress: (state, action: PayloadAction<ShopAddressType>) => {
			if ('zone_by' in state.userShop) {
				state.userShop.zone_by = action.payload.zone_by;
				state.userShop.longitude = action.payload.longitude;
				state.userShop.latitude = action.payload.latitude;
				state.userShop.address_name = action.payload.address_name;
			}
			return state;
		},
		setCreator: (state, action: PayloadAction<boolean>) => {
			if ('creator' in state.userShop) {
				state.userShop.creator = action.payload;
			}
			return state;
		},
		setWSShopAvatar: (state, action: PayloadAction<string>) => {
			// payload has shop_avatar
			if ('avatar_thumbnail' in state.userShop) {
				state.userShop.avatar_thumbnail = action.payload;
			}
			return state;
		},
		setNewShopName: (state, action: PayloadAction<string>) => {
			state.newShop.shop_name = action.payload;
			return state;
		},
		setNewShopAvatar: (state, action: PayloadAction<ArrayBuffer | string>) => {
			state.newShop.avatar = action.payload;
			return state;
		},
		setNewShopColor: (
			state,
			action: PayloadAction<{ color_code: string; bg_color_code: string }>,
		) => {
			state.newShop.color_code = action.payload.color_code;
			state.newShop.bg_color_code = action.payload.bg_color_code;
			return state;
		},
		setNewShopFont: (state, action: PayloadAction<ShopFontNameType>) => {
			state.newShop.font_name = action.payload;
			return state;
		},
		setBorderIconColor: (state, action: PayloadAction<{border: string, iconColor: IconColorType}>) => {
			state.border = action.payload.border;
			state.iconColor = action.payload.iconColor;
			return state;
		},
		setBorder: (state, action: PayloadAction<string>) => {
			state.border = action.payload;
			return state;
		},
		setIconColor: (state, action: PayloadAction<IconColorType>) => {
			state.iconColor = action.payload;
			return state;
		},
		initShop: () => {
			return initialState;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.shop };
	// 	},
	// },
});

export const {
	setPostShopState,
	setGetShopState,
	setGetPhoneCodes,
	setShopName,
	setShopAvatar,
	setShopColors,
	setShopFont,
	setShopPhone,
	setShopWhatsapp,
	setShopBio,
	setShopAvailability,
	setShopContact,
	setShopAddress,
	setCreator,
	setWSShopAvatar,
	initShop,
	setNewShopName,
	setNewShopAvatar,
	setNewShopColor,
	setNewShopFont,
	setBorderIconColor,
	setBorder,
	setIconColor,
} = shopSlice.actions;

export default shopSlice.reducer;
