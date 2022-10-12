// Site root
export const SITE_ROOT = '/pages';
// 404 page
export const NOT_FOUND_404 = '/404';

/*
shop/abc/ => index
shop/abc/offer/1 => index
shop/abc/offer/new => index
 */

// Temp Shop Routes
// export const TEMP_SHOP_ROUTE = '/temp-shop';
export const TEMP_SHOP_ADD_SHOP_NAME = '/temp-shop/create';
export const TEMP_SHOP_ADD_AVATAR = '/temp-shop/create/avatar';
export const TEMP_SHOP_ADD_COLOR = '/temp-shop/create/color';
export const TEMP_SHOP_ADD_FONT = '/temp-shop/create/font';

// Auth Shop Routes
// export const AUTH_SHOP_ROUTE = '/shop';
export const REAL_SHOP_LINK_ROUTE = (shop_link: string) => `/shop/${shop_link}`;
// Real Offers Routes
// offer details by offer_pk
export const REAL_OFFER_ROUTE = (shop_link: string, offer_pk: string) => `/shop/${shop_link}/offer/${offer_pk}`;
// add offer (product, service, location) page.
export const REAL_OFFER_ADD_INDEX = (shop_link: string) => `/shop/${shop_link}/offer`;
export const REAL_OFFER_ADD_SERVICE_CATEGORIES = (shop_link: string) => `/shop/${shop_link}/offer/service`;
export const REAL_OFFER_ADD_SERVICE_DESCRIPTION = (shop_link: string) => `/shop/${shop_link}/offer/service/description`;
export const REAL_OFFER_ADD_SERVICE_PRICE = (shop_link: string) => `/shop/${shop_link}/offer/service/prix`;

// add offer (product) first page (categories).
export const REAL_OFFER_ADD_PRODUCT_CATEGORIES = (shop_link: string) => `/shop/${shop_link}/offer/product`;
export const REAL_OFFER_ADD_PRODUCT_DESCRIPTION = (shop_link: string) => `/shop/${shop_link}/offer/product/description`;
export const REAL_OFFER_ADD_PRODUCT_PRICE = (shop_link: string) => `/shop/${shop_link}/offer/product/prix`;
export const REAL_OFFER_ADD_PRODUCT_DELIVERIES = (shop_link: string) => `/shop/${shop_link}/offer/product/livraison`;

export const TEMP_SHOP_LINK_ROUTE = '/temp-shop/edit';
// Temp Offers Routes
export const TEMP_OFFER_ROUTE = (offer_pk: string) => `/temp-offer/${offer_pk}/`;
// export const TEMP_OFFER_ROUTE = '/temp-offer';
export const TEMP_OFFER_ADD_INDEX = '/temp-offer';
export const TEMP_OFFER_ADD_PRODUCT_CATEGORIES = '/temp-offer/product';
export const TEMP_OFFER_ADD_SERVICE_CATEGORIES = '/temp-offer/service';
export const TEMP_OFFER_ADD_SERVICE_DESCRIPTION = '/temp-offer/service/description';
export const TEMP_OFFER_ADD_SERVICE_PRICE = '/temp-offer/service/prix';
export const TEMP_OFFER_ADD_PRODUCT_DESCRIPTION = '/temp-offer/product/description';
export const TEMP_OFFER_ADD_PRODUCT_PRICE = '/temp-offer/product/prix';
export const TEMP_OFFER_ADD_PRODUCT_DELIVERIES = '/temp-offer/product/livraison';

// Auth Routes
export const AUTH_REGISTER = '/auth/register';
// Register second page (details page)
export const AUTH_REGISTER_ABOUT_PAGE = '/auth/register/about';
export const AUTH_FB_EMAIL_MISSING = '/auth/register/missing-email';
export const AUTH_WELCOME = '/auth/register/welcome';

// Auth Login
export const AUTH_LOGIN = '/auth/login';
// Auth forgot password
export const AUTH_RESET_PASSWORD = '/auth/reset-password';
export const AUTH_RESET_PASSWORD_ENTER_CODE = '/auth/reset-password/enter-code';
export const AUTH_RESET_PASSWORD_SET_PASSWORD = '/auth/reset-password/set-password';
export const AUTH_RESET_PASSWORD_COMPLETE = '/auth/reset-password/set-password-complete';

// dashboard index
export const DASHBOARD = '/dashboard';
// my business (sellers only)
export const DASHBOARD_ACCOUNT = '/dashboard/compte'; // placeholder with redirect
export const DASHBOARD_PROFILE = '/dashboard/compte/profil'; // phase 1
export const DASHBOARD_DELIVERIES = '/dashboard/compte/adresses-de-livraison';
export const DASHBOARD_RATINGS = '/dashboard/compte/evaluation';
export const DASHBOARD_ADRESSE_EMAIL = '/dashboard/compte/adresse-email'; // phase 1
export const DASHBOARD_PASSWORD = '/dashboard/compte/mot-de-passe'; // phase 1
export const DASHBOARD_LINKED_ACCOUNTS = '/dashboard/compte/comptes-relies';
export const DASHBOARD_MANAGE_ACCOUNT = '/dashboard/compte/gestion-des-donnes'; // placeholder needs redirect
export const DASHBOARD_MANAGE_ACCOUNT_CLOTURER = '/dashboard/compte/gestion-des-donnes/cloturer-mon-compte';
export const DASHBOARD_MANAGE_ACCOUNT_DELETE = '/dashboard/compte/gestion-des-donnes/supprimer-ma-boutique';
export const DASHBOARD_BLOCKED_ACCOUNTS = '/dashboard/compte/comptes-bloques';


export const DASHBOARD_MY_BUSINESS = '/dashboard/business';
export const DASHBOARD_MESSAGES = '/dashboard/messages';
export const DASHBOARD_ORDERS = '/dashboard/orders';