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
export const TEMP_SHOP_ROUTE = '/temp-shop';
export const TEMP_SHOP_ADD_SHOP_NAME = '/temp-shop/create';
export const TEMP_SHOP_ADD_AVATAR = '/temp-shop/create/avatar';
export const TEMP_SHOP_ADD_COLOR = '/temp-shop/create/color';
export const TEMP_SHOP_ADD_FONT = '/temp-shop/create/font';
export const TEMP_SHOP_EDIT_INDEX = '/temp-shop/edit';

// Auth Shop Routes
export const AUTH_SHOP_ROUTE = '/shop';
export const AUTH_SHOP_LINK_ROUTE = '/shop/[shop_link]';
// Real Offers Routes
export const REAL_OFFER_ROUTE = '/shop/[shop_link]/offer/[offer_pk]';
export const REAL_OFFER_ADD_INDEX = '/shop/[shop_link]/offer/new';

// Temp Offers Routes
export const TEMP_OFFER_ROUTE = '/temp-offer';
export const TEMP_OFFER_ADD_INDEX = '/temp-offer/create';
export const TEMP_OFFER_ADD_PRODUCT_CATEGORIES = '/temp-offer/product/create';
export const TEMP_OFFER_ADD_PRODUCT_DESCRIPTION = '/temp-offer/product/create/description';
export const TEMP_OFFER_ADD_PRODUCT_PRICE = '/temp-offer/product/create/prix';
export const TEMP_OFFER_ADD_PRODUCT_LIVRAISON = '/temp-offer/product/create/livraison';
export const TEMP_OFFER_ADD_PRODUCT_OVERVIEW = '/temp-offer/[offer_pk]/';

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
export const DASHBOARD = '/user/dashboard';
// my business (sellers only)
export const DASHBOARD_ACCOUNT = '/user/dashboard/account';
export const DASHBOARD_MY_BUSINESS = '/user/dashboard/business';
export const DASHBOARD_MESSAGES = '/user/dashboard/messages';
export const DASHBOARD_ORDERS = '/user/dashboard/orders';