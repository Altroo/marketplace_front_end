import {
	GlobalApiPromiseError,
	InitStateNonNullableToken,
	InitStateToken,
	ResponseDataInterface
} from "../_init/_initTypes";
import { UserClass } from '../../models/account/UserClass';
import { FacebookClass, GoogleClass } from '../../models/account/SocialsClass';
import { CitiesType, CountriesType } from '../places/placesTypes';

export type AccountGenderType = 'M' | 'F' | '';
export type AccountEncloseType = '' | 'A' | 'B';
export type AccountDeleteType = '' | 'A' | 'B';

export type AccountCheckAccountType = {
	email: string,
	verified: boolean,
	has_password: boolean,
	has_shop: boolean,
}

//!- Account State
export interface AccountStateInterface {
	// email: string | null,
	profil: UserClass | Record<string, unknown>;
	profilApi: GlobalApiPromiseError,
	selectedProfil: UserClass | Record<string, unknown>;
	socials: Array<GoogleClass | FacebookClass> | [];
	email_exists: boolean;
	isLoggedIn: boolean;
	blockedList: Array<AccountGetBlockType> | [];
	check_account: AccountCheckAccountType | Record<string, unknown>;
	check_accountApi: GlobalApiPromiseError,
	addresses: Array<AccountAddress>;
	selectedAddress: AccountAddress | Record<string, unknown>;
	verifiedAccount: boolean;
	verificationCodeSent: boolean;
	passwordChanged: boolean;
	passwordResetCodeSent: boolean;
	passwordResetValidCode: boolean;
	emailChanged: boolean;
}

type PayloadType = {
	type: string;
};

export interface AccountPostRegisterType extends PayloadType {
	email: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
}

export type AccountPostRegisterResponseType = ResponseDataInterface<InitStateNonNullableToken>;

export type AccountPostLoginType = Omit<AccountPostRegisterType, 'password2' | 'first_name' | 'last_name'>;

export type AccountPostLoginResponseType = AccountPostRegisterResponseType;

export type AccountGetProfilResponseType = ResponseDataInterface<UserClass>;

export type AccountPatchProfilResponseType = AccountGetProfilResponseType;

export interface AccountPatchProfilType extends UserClass {
	type: string;
}

export type AccountGetSocialsType = Array<GoogleClass | FacebookClass> | [];
export type AccountGetSocialsResponseType = ResponseDataInterface<AccountGetSocialsType>;
export type AccountPostFacebookResponseType = ResponseDataInterface<InitStateToken>;
export type AccountPostGoogleResponseType = ResponseDataInterface<InitStateToken>;

export type AccountGetBlockType = {
	pk: number,
    blocked_user_pk: number,
    blocked_user_first_name: string | null,
    blocked_user_last_name: string | null,
	blocked_user_avatar: string
}

export type AccountBlockType = Array<AccountGetBlockType> | [];

export type AccountGetBlockResponseType = ResponseDataInterface<AccountBlockType>;
export type AccountPostBlockResponseType = ResponseDataInterface<AccountGetBlockType>;

export type AccountGetCheckAccountResponseType = ResponseDataInterface<AccountCheckAccountType>;

export type AccountAddress = {
	pk: number,
	title: string,
	first_name: string,
	last_name: string,
	address: string,
	city: CitiesType,
	country: CountriesType,
	phone: string,
	email: string,
}

export type AccountGetAddresses = Array<AccountAddress> | [];
export type AccountGetAddressesResponseType = ResponseDataInterface<AccountGetAddresses>;

export interface AccountPostAddressType extends Omit<AccountAddress, 'pk' | 'city' | 'country'> {
	type: string;
}

export interface AccountPostAddressInterface extends AccountPostAddressType {
	city: number,
	country: number,
}
export type AccountPostAddressResponseType = ResponseDataInterface<AccountAddress>;
export type AccountPatchAddressResponseType = AccountPostAddressResponseType;

export type AccountGetAddressResponseType = ResponseDataInterface<AccountAddress>;
export interface AccountPostEncloseAccountType extends PayloadType {
	reason_choice: AccountEncloseType,
	typed_reason: string | null,
}
export interface AccountPostDeleteAccountType extends PayloadType {
	reason_choice: AccountDeleteType,
	typed_reason: string | null,
}

export interface AccountPostVerifyAccountType extends PayloadType {
	email: string,
	code: string,
}
