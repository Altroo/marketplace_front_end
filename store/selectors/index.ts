import { RootState } from '../store';
import { ShopFontNameType, ShopGetRootUniqueIDType } from "../../types/shop/shopTypes";
import { IconColorType, TokenChoices } from "../../types/_init/_initTypes";

// _Init
export const getTokenType = (state: RootState) => state._init.tokenType as TokenChoices;
export const getInitStateToken = (state: RootState) => state._init.initStateToken;
export const getAccessToken = (state: RootState) => state._init.initStateToken.access_token;
export const getInitStateUniqueID = (state: RootState) => state._init.initStateUniqueID;

// New shop
export const getNewShopName = (state: RootState) => state.shop.newShop?.shop_name as string;
export const getNewShopAvatar = (state: RootState) => state.shop.newShop?.avatar as ArrayBuffer;
export const getNewShopColorCode = (state: RootState) => state.shop.newShop?.color_code as string;
export const getNewShopBgColorCode = (state: RootState) => state.shop.newShop?.bg_color_code as string;
export const getNewShopBorder = (state: RootState) => state.shop.newShop?.border as string;
export const getNewShopIconColor = (state: RootState) => state.shop.newShop?.icon_color as IconColorType;
export const getNewShopFontName = (state: RootState) => state.shop.newShop?.font_name as ShopFontNameType;

export const getNewShopIsAddInProgress = (state: RootState) => state.shop.userShopApi.isAddInProgress;
export const getNewShopIsAddError = (state: RootState) => state.shop.userShopApi.error;
export const getNewShopAddPromiseStatus = (state: RootState) => state.shop.userShopApi.addPromiseStatus;

// Shop
export const getShopName = (state: RootState) => state.shop.userShop?.shop_name as string;
export const getShopAvatar = (state: RootState) => state.shop.userShop?.avatar as string;
export const getShopColorCode = (state: RootState) => state.shop.userShop?.color_code as string;
export const getShopBgColorCode = (state: RootState) => state.shop.userShop?.bg_color_code as string;
export const getShopFontName = (state: RootState) => state.shop.userShop?.font_name as ShopFontNameType;
export const getShopBorder = (state: RootState) => state.shop.userShop?.border as string;
export const getShopIconColor = (state: RootState) => state.shop.userShop?.icon_color as IconColorType;
export const getShopPhoneContactCode = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_phone_code;
export const getShopWhatsappContactCode = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_whatsapp_code;
export const getShopPhoneContact = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_phone;
export const getShopWhatsappContact = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_whatsapp;
export const getShopContactMode = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_mode;
// Account
export const getCheckUserHasShop = (state: RootState) => state.account.check_account?.has_shop as boolean;

// Offers
export const getMyOffersNextPage = (state: RootState) => state.offer.userOffersList.next;
export const getOfferVuesNextPage = (state: RootState) => state.offer.offerVuesList.next;

// Chat
export const getMyConversationsResults = (state: RootState) => state.chat.conversationsList.results;
export const getMyConversationsNextPage = (state: RootState) => state.chat.conversationsList.next;

// Order
export const getMyBuyingsListNextPage = (state: RootState) => state.order.buyingsList.next;
export const getMySellingsListNextPage = (state: RootState) => state.order.sellingsList.next;