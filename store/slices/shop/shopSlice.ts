import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ShopStateInterface,
	ShopStateToken,
	ShopPostRootUniqueIDType,
	ShopStateUniqueID,
	ShopPostRootTokenType,
	ShopGetRootTokenType,
	ShopGetRootUniqueIDType,
	ShopNameType,
	ShopAvatarType,
	ShopColorType,
	ShopFontType,
	ShopContactPhoneType,
	ShopBioType,
	ShopAvailabilityType,
	ShopContactType,
	ShopAddressType,
	ShopFontNameType,
} from '../../../types/shop/shopTypes';
import { ApiErrorResponseType, IconColorType } from "../../../types/_init/_initTypes";
import { apiErrorInitialState } from "../_init/_initSlice";
// import { HYDRATE } from "next-redux-wrapper";

// Extra reducers actions
export const userShopGETApiErrorAction = createAction<ApiErrorResponseType>('userShopGETApiErrorAction');
export const userShopPOSTApiErrorAction = createAction<ApiErrorResponseType>('userShopPOSTApiErrorAction');
export const userShopPATCHApiErrorAction = createAction<ApiErrorResponseType>('userShopPATCHApiErrorAction');

// GET | POST |
const initialState:
	| ShopStateInterface<ShopStateToken, ShopStateUniqueID>
	| ShopStateInterface<ShopGetRootTokenType, ShopGetRootUniqueIDType> = {
	userShop: null,
	userShopApi: apiErrorInitialState,
	phoneCodes: [],
	phoneCodesApi: apiErrorInitialState,
	newShop: {},
	// newShopApi: apiErrorInitialState,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState: initialState,
	reducers: {
		setPostShopIsLoading: (state) => {
			state.userShopApi.isAddInProgress = true;
			state.userShopApi.addPromiseStatus = 'PENDING';
			// state.userShopApi.error = apiErrorInitialState.error;
			return state;
		},
		setPostShopState: (state, action: PayloadAction<ShopPostRootTokenType | ShopPostRootUniqueIDType>) => {
			state.userShop = action.payload;
			state.userShopApi.addPromiseStatus = 'RESOLVED';
			state.userShopApi.isAddInProgress = false;
			state.userShopApi.error = apiErrorInitialState.error;
			return state;
		},
		setGetShopIsLoading: (state) => {
			state.userShopApi.isFetchInProgress = true;
			state.userShopApi.fetchPromiseStatus = 'PENDING';
			state.userShopApi.error = apiErrorInitialState.error;
			return state;
		},
		setGetShopState: (state, action: PayloadAction<ShopGetRootTokenType | ShopGetRootUniqueIDType>) => {
			state.userShop = action.payload;
			state.userShopApi.fetchPromiseStatus = 'RESOLVED';
			state.userShopApi.isFetchInProgress = false;
			return state;
		},
		setGetPhoneCodes: (state, action: PayloadAction<Array<string>>) => {
			state.phoneCodes = action.payload;
			return state;
		},
		setPatchShopDataIsLoading: (state) => {
			state.userShopApi.isEditInProgress = true;
			state.userShopApi.editPromiseStatus = 'PENDING';
			return state;
		},
		setShopName: (state, action: PayloadAction<ShopNameType>) => {
			if (state.userShop) {
				state.userShop.shop_name = action.payload.shop_name;
				state.userShopApi.editPromiseStatus = 'RESOLVED';
				state.userShopApi.isEditInProgress = false;
			}
			return state;
		},
		setShopAvatar: (state, action: PayloadAction<ShopAvatarType>) => {
			if (state.userShop) {
				state.userShop.avatar = action.payload.avatar;
			}
			return state;
		},
		setShopColors: (state, action: PayloadAction<ShopColorType>) => {
			if (state.userShop) {
				state.userShop.color_code = action.payload.color_code;
				state.userShop.bg_color_code = action.payload.bg_color_code;
				state.userShop.border = action.payload.border;
				state.userShop.icon_color = action.payload.icon_color;
			}
			return state;
		},
		setShopFont: (state, action: PayloadAction<ShopFontType>) => {
			if (state.userShop) {
				state.userShop.font_name = action.payload.font_name;
			}
			return state;
		},
		setShopPhoneContact: (state, action: PayloadAction<ShopContactPhoneType>) => {
			if (state.userShop) {
					if ('contact_phone_code' in state.userShop) {
						state.userShop.contact_phone_code = action.payload.contact_phone_code;
						state.userShop.contact_phone = action.payload.contact_phone;
						state.userShop.contact_whatsapp_code = action.payload.contact_whatsapp_code;
						state.userShop.contact_whatsapp = action.payload.contact_whatsapp;
						state.userShop.contact_mode = action.payload.contact_mode;
					}
			}
			return state;
		},
		setShopBio: (state, action: PayloadAction<ShopBioType>) => {
			if (state.userShop) {
				if ('bio' in state.userShop) {
					state.userShop.bio = action.payload.bio;
					state.userShopApi.editPromiseStatus = 'RESOLVED';
					state.userShopApi.isEditInProgress = false;
				}
			}
			return state;
		},
		setShopAvailability: (state, action: PayloadAction<ShopAvailabilityType>) => {
			if (state.userShop) {
				if ('opening_days' in state.userShop) {
					state.userShop.opening_days = action.payload.opening_days;
					state.userShop.morning_hour_from = action.payload.morning_hour_from;
					state.userShop.morning_hour_to = action.payload.morning_hour_to;
					state.userShop.afternoon_hour_from = action.payload.afternoon_hour_from;
					state.userShop.afternoon_hour_to = action.payload.afternoon_hour_to;
					state.userShopApi.editPromiseStatus = 'RESOLVED';
					state.userShopApi.isEditInProgress = false;
				}
			}
			return state;
		},
		setShopContact: (state, action: PayloadAction<ShopContactType>) => {
			if (state.userShop) {
				if ('phone' in state.userShop) {
					state.userShop.phone = action.payload.phone;
					state.userShop.contact_email = action.payload.contact_email;
					state.userShop.website_link = action.payload.website_link;
					state.userShop.facebook_link = action.payload.facebook_link;
					state.userShop.twitter_link = action.payload.twitter_link;
					state.userShop.instagram_link = action.payload.instagram_link;
					state.userShop.whatsapp = action.payload.whatsapp;
					state.userShopApi.editPromiseStatus = 'RESOLVED';
					state.userShopApi.isEditInProgress = false;
				}
			}
			return state;
		},
		setShopAddress: (state, action: PayloadAction<ShopAddressType>) => {
			if (state.userShop) {
				if ('longitude' in state.userShop) {
					state.userShop.zone_by = action.payload.zone_by;
					state.userShop.longitude = action.payload.longitude;
					state.userShop.latitude = action.payload.latitude;
					state.userShop.address_name = action.payload.address_name;
					state.userShop.km_radius = action.payload.km_radius;
				}
			}
			return state;
		},
		setCreator: (state, action: PayloadAction<boolean>) => {
			if (state.userShop) {
				if ('creator' in state.userShop) {
					state.userShop.creator = action.payload;
				}
			}
			return state;
		},
		setWSShopAvatar: (state, action: PayloadAction<string>) => {
			// payload has shop_avatar
			if (state.userShop) {
				if ('avatar_thumbnail' in state.userShop) {
					state.userShop.avatar_thumbnail = action.payload;
				}
			}
			return state;
		},
		// Step by step shop creation
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
			action: PayloadAction<{ color_code: string; bg_color_code: string, border: string, icon_color: IconColorType }>,
		) => {
			state.newShop.color_code = action.payload.color_code;
			state.newShop.bg_color_code = action.payload.bg_color_code;
			state.newShop.border = action.payload.border;
			state.newShop.icon_color = action.payload.icon_color;
			return state;
		},
		setNewShopFont: (state, action: PayloadAction<ShopFontNameType>) => {
			state.newShop.font_name = action.payload;
			return state;
		},
		setBorderIconColor: (state, action: PayloadAction<{border: string, iconColor: IconColorType}>) => {
			state.newShop.border = action.payload.border;
			state.newShop.icon_color = action.payload.iconColor;
			return state;
		},
		setBorder: (state, action: PayloadAction<string>) => {
			state.newShop.border = action.payload;
			return state;
		},
		setIconColor: (state, action: PayloadAction<IconColorType>) => {
			state.newShop.icon_color = action.payload;
			return state;
		},
		initShop: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userShopGETApiErrorAction, (state, action) => {
				state.userShopApi.error = action.payload.error;
				state.userShopApi.fetchPromiseStatus = 'REJECTED';
				state.userShopApi.isFetchInProgress = false;
				return state;
			})
			.addCase(userShopPOSTApiErrorAction, (state, action) => {
				state.userShopApi.error = action.payload.error;
				state.userShopApi.addPromiseStatus = 'REJECTED';
				state.userShopApi.isAddInProgress = false;
				return state;
			}).addCase(userShopPATCHApiErrorAction, (state, action) => {
				state.userShopApi.error = action.payload.error;
				state.userShopApi.editPromiseStatus = 'REJECTED';
				state.userShopApi.isEditInProgress = false;
				return state;
			})
		;
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.shop };
	// 	},
	// },
});

export const {
	setPostShopIsLoading,
	setPostShopState,
	setGetShopIsLoading,
	setGetShopState,
	setGetPhoneCodes,
	setPatchShopDataIsLoading,
	setShopName,
	setShopAvatar,
	setShopColors,
	setShopFont,
	setShopPhoneContact,
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
