import { RootState } from '../store';
import { ShopFontNameType, ShopGetRootUniqueIDType } from "../../types/shop/shopTypes";
import { IconColorType, TokenChoices } from "../../types/_init/_initTypes";
import { DetailsOfferProductType, OfferGetRootProductInterface } from "../../types/offer/offerTypes";

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

// Global
export const getNewShopApiError = (state: RootState) => state.shop.userShopApi.error;
// Add
export const getNewShopIsAddInProgress = (state: RootState) => state.shop.userShopApi.isAddInProgress;
export const getNewShopAddPromiseStatus = (state: RootState) => state.shop.userShopApi.addPromiseStatus;
// Edit
export const getNewShopIsEditInProgress = (state: RootState) => state.shop.userShopApi.isEditInProgress;
export const getNewShopEditPromiseStatus = (state: RootState) => state.shop.userShopApi.editPromiseStatus;

// Delete

// Fetch

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
export const getShopBio = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.bio;

export const getShopOpeningDays = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.opening_days;
export const getShopMorningHourFrom = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.morning_hour_from;
export const getShopMorningHourTo = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.morning_hour_to;
export const getShopAfternoonHourFrom = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.afternoon_hour_from;
export const getShopAfternoonHourTo = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.afternoon_hour_to;

export const getShopPhone = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.phone;
export const getShopContactEmail = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.contact_email;
export const getShopWebsiteLink = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.website_link;
export const getShopFacebookLink = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.facebook_link;
export const getShopTwitterLink = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.twitter_link;
export const getShopInstagramLink = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.instagram_link;
export const getShopWhatsapp = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.whatsapp;

export const getShopAddressName = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.address_name;
export const getShopLongitude = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.longitude;
export const getShopLatitude = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.latitude;
export const getShopZoneBy = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.zone_by;
export const getShopKmRadius = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType)?.km_radius;


export const getShopObj = (state: RootState) => (state.shop.userShop as ShopGetRootUniqueIDType);
// Places
export const getLocalisationName = (state: RootState) => state.places.localisation_name;
export const getPlacesApiError = (state: RootState) => state.places.placesApi.error;
export const getPlacesApiFetchPromiseStatus = (state: RootState) => state.places.placesApi.fetchPromiseStatus;
export const getAvailableCities = (state: RootState) => state.places.cities;

// export const getPlacesApiFetchInProgress = (state: RootState) => state.places.placesApi.isFetchInProgress;
// Account
export const getCheckUserHasShop = (state: RootState) => state.account.check_account?.has_shop as boolean;
// Offers
export const getMyOffersList = (state: RootState) => state.offer.userOffersList.results;
export const getMyOffersNextPage = (state: RootState) => state.offer.userOffersList.next;
export const getOfferVuesNextPage = (state: RootState) => state.offer.offerVuesList.next;
export const getOfferTags = (state: RootState) => state.offer.selectedTags;
// Local offers
export const getUserLocalOffer = (state: RootState) => state.offer.userLocalOffer;
export const getLocalOfferCategories = (state: RootState) => state.offer.userLocalOffer.categoriesList;
export const getLocalOfferTitle = (state: RootState) => state.offer.userLocalOffer?.title;
export const getLocalOfferDescription = (state: RootState) => state.offer.userLocalOffer?.description;
export const getLocalOfferPictures = (state: RootState) => state.offer.userLocalOffer.pictures;
export const getLocalOfferAddressName = (state: RootState) => state.offer.userLocalOffer.clickAndCollect.address_name;
export const getLocalOfferLongitude = (state: RootState) => state.offer.userLocalOffer.clickAndCollect.longitude;
export const getLocalOfferLatitude = (state: RootState) => state.offer.userLocalOffer.clickAndCollect.latitude;
// export const getLocalOfferPicture1 = (state: RootState) => state.offer.userLocalOffer.picture_1;
// export const getLocalOfferPicture2 = (state: RootState) => state.offer.userLocalOffer.picture_2;
// export const getLocalOfferPicture3 = (state: RootState) => state.offer.userLocalOffer.picture_3;
// export const getLocalOfferPicture4 = (state: RootState) => state.offer.userLocalOffer.picture_4;
export const getLocalOfferForwhom = (state: RootState) => state.offer.userLocalOffer?.forWhom;
export const getLocalOfferColors = (state: RootState) => state.offer.userLocalOffer?.colors;
export const getLocalOfferSizes = (state: RootState) => state.offer.userLocalOffer?.sizes;
export const getLocalOfferQuantity = (state: RootState) => state.offer.userLocalOffer?.quantity;
export const getLocalOfferTags = (state: RootState) => state.offer.userLocalOffer?.tags;
export const getLocalOfferPrice = (state: RootState) => state.offer.userLocalOffer?.prix;
export const getLocalOfferPriceBy = (state: RootState) => state.offer.userLocalOffer?.prix_par;

export const getLocalOfferDeliveryCity1 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_city_1;
export const getLocalOfferDeliveryAllCities1 = (state: RootState) => state.offer.userLocalOffer.deliveries?.all_cities_1;
export const getLocalOfferDeliveryPrice1 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_price_1;
export const getLocalOfferDeliveryDays1 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_days_1;
export const getLocalOfferDeliveryCity2 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_city_2;
export const getLocalOfferDeliveryAllCities2 = (state: RootState) => state.offer.userLocalOffer.deliveries?.all_cities_2;
export const getLocalOfferDeliveryPrice2 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_price_2;
export const getLocalOfferDeliveryDays2 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_days_2;
export const getLocalOfferDeliveryCity3 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_city_3;
export const getLocalOfferDeliveryAllCities3 = (state: RootState) => state.offer.userLocalOffer.deliveries?.all_cities_3;
export const getLocalOfferDeliveryPrice3 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_price_3;
export const getLocalOfferDeliveryDays3 = (state: RootState) => state.offer.userLocalOffer.deliveries?.delivery_days_3;

// Offer by pk
export const getMyOffersFirstPageApi = (state: RootState) => state.offer.offerApi;
// export const getMyOffersFirstPageApiFetchPromiseStatus = (state: RootState) => state.offer.offerApi;
export const getSelectedOfferPk = (state: RootState) => state.offer.selectedOffer?.pk;
export const getSelectedOfferTitle = (state: RootState) => state.offer.selectedOffer?.title;
export const getSelectedOfferOfferType = (state: RootState) => state.offer.selectedOffer?.offer_type;
export const getSelectedOfferOfferCategories = (state: RootState) => state.offer.selectedOffer?.offer_categories;
export const getSelectedOfferShopName = (state: RootState) => state.offer.selectedOffer?.shop_name;
export const getSelectedOfferPicture1 = (state: RootState) => state.offer.selectedOffer?.picture_1;
export const getSelectedOfferPicture2 = (state: RootState) => state.offer.selectedOffer?.picture_2;
export const getSelectedOfferPicture3 = (state: RootState) => state.offer.selectedOffer?.picture_3;
export const getSelectedOfferPicture4 = (state: RootState) => state.offer.selectedOffer?.picture_4;
export const getSelectedOfferPicture1Thumb = (state: RootState) => state.offer.selectedOffer?.picture_1_thumb;
export const getSelectedOfferPicture2Thumb = (state: RootState) => state.offer.selectedOffer?.picture_2_thumb;
export const getSelectedOfferPicture3Thumb = (state: RootState) => state.offer.selectedOffer?.picture_3_thumb;
export const getSelectedOfferPicture4Thumb = (state: RootState) => state.offer.selectedOffer?.picture_4_thumb;
export const getSelectedOfferDescription = (state: RootState) => state.offer.selectedOffer?.description;
export const getSelectedOfferForWhom = (state: RootState) => state.offer.selectedOffer?.for_whom;
export const getSelectedOfferPrice = (state: RootState) => state.offer.selectedOffer?.price;
export const getSelectedOfferPrixPar = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_price_by;
export const getSelectedOfferQuantity = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_quantity;
export const getSelectedOfferLongitude = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_longitude;
export const getSelectedOfferLatitude = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_latitude;
export const getSelectedOfferAddress = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_address;
export const getSelectedOfferColors = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_colors;
export const getSelectedOfferSizes = (state: RootState) =>
	(state.offer.selectedOffer?.details_offer as DetailsOfferProductType)?.product_sizes;
export const getSelectedOfferDeliveries = (state: RootState) => (state.offer.selectedOffer as OfferGetRootProductInterface)?.deliveries;
export const getSelectedOfferPinned = (state: RootState) => state.offer.selectedOffer?.pinned;
export const getSelectedOfferSolderType = (state: RootState) => state.offer.selectedOffer?.solder_type;
export const getSelectedOfferSolderValue = (state: RootState) => state.offer.selectedOffer?.solder_value;

// Chat
export const getMyConversationsResults = (state: RootState) => state.chat.conversationsList.results;
export const getMyConversationsNextPage = (state: RootState) => state.chat.conversationsList.next;

// Order
export const getMyBuyingsListNextPage = (state: RootState) => state.order.buyingsList.next;
export const getMySellingsListNextPage = (state: RootState) => state.order.sellingsList.next;