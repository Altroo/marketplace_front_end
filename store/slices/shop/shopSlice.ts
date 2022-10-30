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
};

const shopSlice = createSlice({
	name: 'shop',
	initialState: initialState,
	reducers: {
		setPostShopIsLoading: (state) => {
			state.userShopApi.isAddInProgress = true;
			state.userShopApi.addPromiseStatus = 'PENDING';
		},
		setPostShopState: (state, action: PayloadAction<ShopPostRootTokenType | ShopPostRootUniqueIDType>) => {
			state.userShop = action.payload;
			state.userShopApi.addPromiseStatus = 'RESOLVED';
			state.userShopApi.isAddInProgress = false;
			state.userShopApi.error = apiErrorInitialState.error;
		},
		setGetShopIsLoading: (state) => {
			state.userShopApi.isFetchInProgress = true;
			state.userShopApi.fetchPromiseStatus = 'PENDING';
			state.userShopApi.error = apiErrorInitialState.error;
		},
		setGetShopState: (state, action: PayloadAction<ShopGetRootTokenType | ShopGetRootUniqueIDType>) => {
			state.userShop = action.payload;
			state.userShopApi.fetchPromiseStatus = 'RESOLVED';
			state.userShopApi.isFetchInProgress = false;
		},
		setGetPhoneCodes: (state, action: PayloadAction<Array<string>>) => {
			state.phoneCodes = action.payload;
		},
		setPatchShopDataIsLoading: (state) => {
			state.userShopApi.isEditInProgress = true;
			state.userShopApi.editPromiseStatus = 'PENDING';
		},
		setShopName: (state, action: PayloadAction<ShopNameType>) => {
			if (state.userShop) {
				state.userShop.shop_name = action.payload.shop_name;
				state.userShopApi.editPromiseStatus = 'RESOLVED';
				state.userShopApi.isEditInProgress = false;
			}
		},
		setShopAvatar: (state, action: PayloadAction<ShopAvatarType>) => {
			if (state.userShop) {
				state.userShop.avatar = action.payload.avatar;
			}
		},
		setShopColors: (state, action: PayloadAction<ShopColorType>) => {
			if (state.userShop) {
				state.userShop.color_code = action.payload.color_code;
				state.userShop.bg_color_code = action.payload.bg_color_code;
				state.userShop.border = action.payload.border;
				state.userShop.icon_color = action.payload.icon_color;
			}
		},
		setShopFont: (state, action: PayloadAction<ShopFontType>) => {
			if (state.userShop) {
				state.userShop.font_name = action.payload.font_name;
			}
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
		},
		setShopBio: (state, action: PayloadAction<ShopBioType>) => {
			if (state.userShop) {
				if ('bio' in state.userShop) {
					state.userShop.bio = action.payload.bio;
					state.userShopApi.editPromiseStatus = 'RESOLVED';
					state.userShopApi.isEditInProgress = false;
				}
			}
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
		},
		setWSShopAvatar: (state, action: PayloadAction<string>) => {
			// payload has shop_avatar
			if (state.userShop) {
				if ('avatar' in state.userShop) {
					state.userShop.avatar = action.payload;
				}
			}
		},
		// Step by step shop creation
		setNewShopName: (state, action: PayloadAction<string>) => {
			state.newShop.shop_name = action.payload;
		},
		setNewShopAvatar: (state, action: PayloadAction<ArrayBuffer | string>) => {
			state.newShop.avatar = action.payload;
		},
		setNewShopColor: (
			state,
			action: PayloadAction<{ color_code: string; bg_color_code: string, border: string, icon_color: IconColorType }>,
		) => {
			state.newShop.color_code = action.payload.color_code;
			state.newShop.bg_color_code = action.payload.bg_color_code;
			state.newShop.border = action.payload.border;
			state.newShop.icon_color = action.payload.icon_color;
		},
		setNewShopFont: (state, action: PayloadAction<ShopFontNameType>) => {
			state.newShop.font_name = action.payload;
		},
		setBorderIconColor: (state, action: PayloadAction<{border: string, iconColor: IconColorType}>) => {
			state.newShop.border = action.payload.border;
			state.newShop.icon_color = action.payload.iconColor;
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
			})
			.addCase(userShopPOSTApiErrorAction, (state, action) => {
				state.userShopApi.error = action.payload.error;
				state.userShopApi.addPromiseStatus = 'REJECTED';
				state.userShopApi.isAddInProgress = false;
			}).addCase(userShopPATCHApiErrorAction, (state, action) => {
				state.userShopApi.error = action.payload.error;
				state.userShopApi.editPromiseStatus = 'REJECTED';
				state.userShopApi.isEditInProgress = false;
			})
		;
	},
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
	setWSShopAvatar,
	initShop,
	setNewShopName,
	setNewShopAvatar,
	setNewShopColor,
	setNewShopFont,
	setBorderIconColor,
} = shopSlice.actions;

export default shopSlice.reducer;
