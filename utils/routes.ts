// Site root
export const SITE_ROOT = '/';
// 404 page
export const NOT_FOUND_404 = '/404';

/*
shop/abc/ => index
shop/abc/offer/1 => index
shop/abc/offer/new => index
 */

// Auth Shop Routes
export const REAL_SHOP_ADD_SHOP_NAME = '/shop/create';
export const REAL_SHOP_ADD_AVATAR = '/shop/create/avatar';
export const REAL_SHOP_ADD_COLOR = '/shop/create/color';
export const REAL_SHOP_ADD_FONT = '/shop/create/font';

// Auth Shop Routes
export const REAL_SHOP_BY_SHOP_LINK_ROUTE = (shop_link: string) => `/shop/${shop_link}`;
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

// export const REAL_SHOP_EDIT_ROUTE = '/shop/edit'; //replaced by shop url page itself

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
// Mon profil
export const DASHBOARD_ACCOUNT = '/dashboard/compte'; // placeholder with redirect
export const DASHBOARD_EDIT_PROFILE = '/dashboard/compte/edit-profil'; // phase 1
export const DASHBOARD_ADRESSE_EMAIL = '/dashboard/compte/adresse-email'; // phase 1
export const DASHBOARD_PASSWORD = '/dashboard/compte/mot-de-passe'; // phase 1
// my business
export const DASHBOARD_SUBSCRIPTION = '/dashboard/my-business/abonnement';
export const DASHBOARD_NEW_SUBSCRIPTION = '/dashboard/my-business/abonnement/checkout';
export const DASHBOARD_UPGRADE_SUBSCRIPTION = '/dashboard/my-business/abonnement/update-checkout';
export const DASHBOARD_SUBSCRIPTION_PAY_VIA_VIREMENT = '/dashboard/my-business/abonnement/par-virement';
export const DASHBOARD_INDEXED_OFFERS = '/dashboard/my-business/articles-references';
export const DASHBOARD_ADD_INDEX_OFFERS = '/dashboard/my-business/articles-references/add-offers';
export const DASHBOARD_AUDIENCES = "/dashboard/my-business/audience";
export const DASHBOARD_CHIFFRE_DAFFAIRE = "/dashboard/my-business/chiffre-d'affaire";
