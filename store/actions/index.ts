// Initialise the APP
export const INIT_APP = 'INIT_APP';
export const INIT_APP_COOKIE_TOKENS = 'INIT_APP_COOKIE_TOKENS';
export const REFRESH_APP_TOKEN_STATES = 'REFRESH_APP_TOKEN_STATES';
export const INIT_COOKIE_BORDER_ICON = 'INIT_COOKIE_BORDER_ICON';
// Account [Has no root]
export const ACCOUNT_SET_FACEBOOK_EMAIL = 'ACCOUNT_SET_FACEBOOK_EMAIL';
export const ACCOUNT_POST_REGISTER = 'ACCOUNT_POST_REGISTER';
export const ACCOUNT_POST_RESEND_VERIFICATION = 'ACCOUNT_POST_RESEND_VERIFICATION';
export const ACCOUNT_POST_PASSWORD_CHANGE = 'ACCOUNT_POST_PASSWORD_CHANGE';
export const ACCOUNT_PUT_CREATE_PASSWORD = 'ACCOUNT_PUT_CREATE_PASSWORD';
export const ACCOUNT_POST_SEND_PASSWORD_RESET = 'ACCOUNT_POST_SEND_PASSWORD_RESET';
export const ACCOUNT_PATCH_PROFIL = 'ACCOUNT_PATCH_PROFIL';
export const ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD = 'ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD';
export const ACCOUNT_PUT_CHANGE_EMAIL_NOT_HAS_PASSWORD = 'ACCOUNT_PUT_CHANGE_EMAIL_NOT_HAS_PASSWORD';
export const ACCOUNT_GET_CHECK_ACCOUNT = 'ACCOUNT_GET_CHECK_ACCOUNT';
// Shop
export const SHOP_GET_PHONE_CODES = 'SHOP_GET_PHONE_CODES';
export const SHOP_PATCH_PHONE_CONTACT = 'SHOP_PATCH_PHONE_CONTACT';
export const SHOP_PATCH_AVATAR = 'SHOP_PATCH_AVATAR';
export const SHOP_PATCH_SHOP_NAME = 'SHOP_PATCH_SHOP_NAME';
export const SHOP_PATCH_BIO = 'SHOP_PATCH_BIO';
export const SHOP_PATCH_AVAILABILITY = 'SHOP_PATCH_AVAILABILITY';
export const SHOP_PATCH_CONTACT = 'SHOP_PATCH_CONTACT';
export const SHOP_PATCH_ADDRESS = 'SHOP_PATCH_ADDRESS';
export const SHOP_PATCH_COLOR = 'SHOP_PATCH_COLOR';
export const SHOP_PATCH_FONT = 'SHOP_PATCH_FONT';
export const SHOP_POST_ROOT = 'SHOP_POST_ROOT';
export const SHOP_GET_ROOT = 'SHOP_GET_ROOT';
export const SET_SHOP_NAME = 'SET_SHOP_NAME';
export const SET_SHOP_AVATAR = 'SET_SHOP_AVATAR';
export const SET_SHOP_COLOR = 'SET_SHOP_COLOR';
export const SET_SHOP_FONT = 'SET_SHOP_FONT';
// export const LOAD_NEW_ADDED_SHOP_DATA = 'LOAD_NEW_ADDED_SHOP_DATA';
// Offer
export const OFFER_GET_TAGS = 'OFFER_GET_TAGS';
export const OFFER_GET_LAST_THREE_USED_DELIVERIES = 'OFFER_GET_LAST_THREE_USED_DELIVERIES';
export const OFFER_GET_LOCALISATION = 'OFFER_GET_LOCALISATION';
export const OFFER_POST_PIN = 'OFFER_POST_PIN';
export const OFFER_POST_SOLDER = 'OFFER_POST_SOLDER';
export const OFFER_PATCH_SOLDER = 'OFFER_PATCH_SOLDER';
export const OFFER_DELETE_SOLDER = 'OFFER_DELETE_SOLDER';
export const OFFER_GET_VUES = 'OFFER_GET_VUES';
export const OFFER_POST_ROOT = 'OFFER_POST_ROOT';
export const OFFER_GET_OFFERS_BY_SHOP_ID_AND_QUERY_PARAMS = 'OFFER_GET_OFFERS_BY_SHOP_ID_AND_QUERY_PARAMS';
export const OFFER_GET_AVAILABLE_FILTERS_BY_SHOP_ID = 'OFFER_GET_AVAILABLE_FILTERS_BY_SHOP_ID';
export const OFFER_GET_AVAILABLE_FILTERS_BY_UNIQUE_ID = 'OFFER_GET_AVAILABLE_FILTERS_BY_UNIQUE_ID';
export const OFFER_PUT_ROOT = 'OFFER_PUT_ROOT';
export const OFFER_DELETE_ROOT = 'OFFER_DELETE_ROOT';
// Offer local states
export const SET_OFFER_PRODUCT_CATEGORIES_PAGE = 'SET_OFFER_PRODUCT_CATEGORIES_PAGE';
export const SET_OFFER_SERVICE_CATEGORIES_PAGE = 'SET_OFFER_SERVICE_CATEGORIES_PAGE';
export const SET_OFFER_SERVICE_LOCALISATION = 'SET_OFFER_SERVICE_LOCALISATION';
export const SET_OFFER_PRODUCT_DESCRIPTION_PAGE = 'SET_OFFER_PRODUCT_DESCRIPTION_PAGE';
export const SET_OFFER_SERVICE_DESCRIPTION_PAGE = 'SET_OFFER_SERVICE_DESCRIPTION_PAGE';
export const SET_OFFER_PRODUCT_PRICE_PAGE = 'SET_OFFER_PRODUCT_PRICE_PAGE';
export const SET_OFFER_SERVICE_PRICE_PAGE = 'SET_OFFER_SERVICE_PRICE_PAGE';
export const SET_OFFER_DELIVERY_PAGE_CLICK_AND_COLLECT = 'SET_OFFER_DELIVERY_PAGE_CLICK_AND_COLLECT';
export const SET_OFFER_DELIVERY_PAGE_DELIVERIES = 'SET_OFFER_DELIVERY_PAGE_DELIVERIES';
export const SET_OFFER_PRODUCT_TO_EDIT = 'SET_OFFER_PRODUCT_TO_EDIT';
export const SET_OFFER_SERVICE_TO_EDIT = 'SET_OFFER_SERVICE_TO_EDIT';
export const EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT = 'EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT';
export const EMPTY_OFFER_DELIVERIES = 'EMPTY_OFFER_DELIVERIES';
export const EMPTY_OFFER_USER_LOCAL_OFFER = 'EMPTY_OFFER_USER_LOCAL_OFFER';
export const SET_SELECTED_OFFER = 'SET_SELECTED_OFFER';
// Places
export const PLACES_GET_COUNTRIES = 'PLACES_GET_COUNTRIES';
export const PLACES_GET_CITIES = 'PLACES_GET_CITIES';
export const PLACES_GET_LOCALISATION = 'PLACES_GET_LOCALISATION';
// Subscription
export const SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS = 'SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS';
export const SUBSCRIPTION_POST_ROOT = 'SUBSCRIPTION_POST_ROOT';
export const SUBSCRIPTION_PATCH_ROOT = 'SUBSCRIPTION_PATCH_ROOT';
export const SUBSCRIPTION_GET_SUBSCRIPTION_BY_NBR_ARTICLE = 'SUBSCRIPTION_GET_SUBSCRIPTION_BY_NBR_ARTICLE';
export const SUBSCRIPTION_POST_CHECK_PROMO_CODE = 'SUBSCRIPTION_POST_CHECK_PROMO_CODE';
export const SUBSCRIPTION_GET_INDEXED_ARTICLES = 'SUBSCRIPTION_GET_INDEXED_ARTICLES';
export const SUBSCRIPTION_GET_AVAILABLE_ARTICLES = 'SUBSCRIPTION_GET_AVAILABLE_ARTICLES';
export const SUBSCRIPTION_DELETE_SINGLE_INDEXED_ARTICLE = 'SUBSCRIPTION_DELETE_SINGLE_INDEXED_ARTICLE';
export const SUBSCRIPTION_POST_INDEXED_ARTICLE_ROOT = 'SUBSCRIPTION_POST_INDEXED_ARTICLE_ROOT';
// Notifications
export const NOTIFICATION_GET_ROOT = 'NOTIFICATION_GET_ROOT';
export const NOTIFICATION_PATCH_ROOT = 'NOTIFICATION_PATCH_ROOT';
// Seo Pages
export const SEO_PAGES_GET_AVAILABLE_FILTERS_BY_SEO_PAGE_URL = 'SEO_PAGES_GET_AVAILABLE_FILTERS_BY_SEO_PAGE_URL';
export const SEO_PAGES_GET_OFFERS_BY_SEO_PAGE_URL_AND_QUERY_PARAMS = 'SEO_PAGES_GET_OFFERS_BY_SEO_PAGE_URL_AND_QUERY_PARAMS';
// Cart
export const CART_POST_PRODUCT_ROOT = 'CART_POST_PRODUCT_ROOT';
export const CART_POST_SERVICE_ROOT = 'CART_POST_SERVICE_ROOT';
export const CART_POST_ORDER = 'CART_POST_ORDER';
export const CART_INIT_CART_ORDER = 'CART_INIT_CART_ORDER';
export const CART_GET_CART_COUNTER = 'CART_GET_CART_COUNTER';
export const CART_PATCH_CART_QUANTITY = 'CART_PATCH_CART_QUANTITY';
export const CART_DELETE_ROOT = 'CART_DELETE_ROOT';
export const CART_SET_LOCAL_CART_ORDER = 'CART_SET_LOCAL_CART_ORDER';
export const CART_SET_LOCAL_CART_ORDER_DELIVERIES_DATA = 'CART_SET_LOCAL_CART_ORDER_DELIVERIES_DATA';
export const CART_SET_LOCAL_CART_ORDER_COORDONNEE_DATA = 'CART_SET_LOCAL_CART_ORDER_COORDONNEE_DATA';
export const ORDER_GET_CHIFFRE_AFFAIRE = 'ORDER_GET_CHIFFRE_AFFAIRE';
export const ORDER_GET_ORDERS_COUNT = 'ORDER_GET_ORDERS_COUNT';
export const ORDER_GET_ORDERS_LIST = 'ORDER_GET_ORDERS_LIST';
export const ORDER_POST_ACCEPT_ORDER = 'ORDER_POST_ACCEPT_ORDER';
export const ORDER_POST_CANCEL_ORDER = 'ORDER_POST_CANCEL_ORDER';

// Version [will be applied later see : https://github.com/vercel/next.js/pull/34765]
export const VERSION_GET_ROOT = 'VERSION_GET_ROOT';
export const VERSION_POST_NEWS_LETTER = 'VERSION_POST_NEWS_LETTER';
// WS Events
export const WS_OFFER_PICTURE_1 = 'WS_OFFER_PICTURE_1';
export const WS_OFFER_PICTURE_1_THUMB = 'WS_OFFER_PICTURE_1_THUMB';
export const WS_OFFER_PICTURE_2 = 'WS_OFFER_PICTURE_2';
export const WS_OFFER_PICTURE_2_THUMB = 'WS_OFFER_PICTURE_2_THUMB';
export const WS_OFFER_PICTURE_3 = 'WS_OFFER_PICTURE_3';
export const WS_OFFER_PICTURE_3_THUMB = 'WS_OFFER_PICTURE_3_THUMB';
export const WS_OFFER_PICTURE_4 = 'WS_OFFER_PICTURE_4';
export const WS_OFFER_PICTURE_4_THUMB = 'WS_OFFER_PICTURE_4_THUMB';
export const WS_SHOP_AVATAR = 'WS_SHOP_AVATAR';
export const WS_USER_AVATAR = 'WS_USER_AVATAR';
export const WS_MAINTENANCE = 'WS_MAINTENANCE';
export const WS_NOTIFICATION = 'WS_NOTIFICATION';
export const WS_FACTURE = 'WS_FACTURE';
