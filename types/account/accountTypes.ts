import {
	GlobalApiPromiseError,
	InitStateNonNullableToken,
	InitStateNonNullableTokenFixNextAuth,
	ResponseDataInterface,
	SagaCallBackBase,
} from '../_init/_initTypes';
import { UserClass } from '../../models/account/UserClass';
import { OrdersSmallListBoxType } from "../order/orderTypes";
import { OfferCategoriesType, OffersGetMiniOffersList } from "../offer/offerTypes";

export type AccountGenderType = 'M' | 'F';

export type AccountGenderCodeValueType = {
	code: 'M' | 'F';
	value: 'Homme' | 'Femme';
};

export type AccountCheckAccountType = {
	pk: number;
	first_name: string;
	last_name: string;
	email: string;
	verified: boolean;
	has_password: boolean;
	shop_url: string | boolean;
	has_shop: boolean;
	is_new: boolean;
	is_subscribed: boolean;
	is_creator: boolean;
	picture: string;
	city: string | null;
	country: string | null;
};

//!- Account State
export interface AccountStateInterface {
	profil: UserClass | Record<string, unknown>;
	profilApi: GlobalApiPromiseError;
	isLoggedIn: boolean;
	check_account: AccountCheckAccountType | Record<string, unknown>;
	check_accountApi: GlobalApiPromiseError;
	verifiedAccount: boolean;
	verificationCodeSent: boolean;
	passwordChanged: boolean;
	passwordResetCodeSent: boolean;
	emailChanged: boolean;
	facture: string | null;
	blockedList: Array<AccountGetBlockType> | [];
}

export type AccountGetBlockType = {
	pk: number;
	blocked_user_pk: number;
	blocked_user_first_name: string | null;
	blocked_user_last_name: string | null;
	blocked_user_avatar: string;
};

export type AccountBlockType = Array<AccountGetBlockType> | [];

export type AccountGetBlockResponseType = ResponseDataInterface<AccountBlockType>;
export type AccountPostBlockResponseType = ResponseDataInterface<AccountGetBlockType>;


export type AccountPostRegisterResponseType = ResponseDataInterface<InitStateNonNullableToken>;

export type AccountPostLoginResponseType = AccountPostRegisterResponseType;
export type AccountPostLoginFixNextAuthResponseType = ResponseDataInterface<InitStateNonNullableTokenFixNextAuth>;

export type AccountGetProfilResponseType = ResponseDataInterface<UserClass>;

export type AccountPatchProfilResponseType = AccountGetProfilResponseType;

export interface AccountPatchProfilType {
	type: string;
	avatar: string | ArrayBuffer | null;
	first_name: string;
	last_name: string;
	birth_date: string | null;
	gender: string;
	city: string | null;
	country: string | null;
}

export type InitNonNullStateToken = {
	access_token: string;
	refresh_token: string;
	user: {
		pk: number;
		email: string;
		first_name: string;
		last_name: string;
	};
	access_token_expiration: string;
	refresh_token_expiration: string;
};

export type AccountPostFacebookResponseType = ResponseDataInterface<InitNonNullStateToken>;
export type AccountPostGoogleResponseType = ResponseDataInterface<InitNonNullStateToken>;

export type AccountGetCheckAccountResponseType = ResponseDataInterface<AccountCheckAccountType>;

export interface AccountPutChangeEmailHasPasswordType {
	email: string;
}

export interface AccountPutChangeEmailHasPasswordSagaCallback extends SagaCallBackBase {
	data: AccountPutChangeEmailHasPasswordType;
}

export type AccountPutChangeEmailHasPasswordResponseType = ResponseDataInterface<AccountPutChangeEmailHasPasswordType>;

export type AccountGetDashboardType = {
	pk: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
	is_verified: boolean;
	is_subscribed: boolean;
	is_creator: boolean;
	has_shop: boolean;
	shop_avatar: string;
	shop_name: string;
	shop_url: string;
	global_rating: number;
	has_messages: boolean;
	has_notifications: boolean;
	has_orders: boolean;
	mini_orders_list: Array<OrdersSmallListBoxType>,
	indexed_articles_count: number;
	remaining_slots_count: number;
	all_slots_count: number;
	total_offers_count: number;
	total_offers_vue_count: number;
	total_vue_month: number;
	total_vue_pourcentage: string;
	total_sells_count: number;
	total_sells_pourcentage: string;
	total_sells_month: number;
};

export type AccountGetDashboardResponseType = ResponseDataInterface<AccountGetDashboardType>;

export type AccountGetProfilByUserIDType = {
	pk: number;
	avatar: string;
	first_name: string;
	last_name: string;
	city: string | null;
	country: string | null;
	date_joined: string;
	shop_pk: number | null;
	shop_name: string | null;
	shop_link: string | null;
	available_categories: Array<OfferCategoriesType>;
	available_services: boolean;
	offers: Array<OffersGetMiniOffersList>;
};

export type AccountGetProfilByUserIDResponseType = ResponseDataInterface<AccountGetProfilByUserIDType>;