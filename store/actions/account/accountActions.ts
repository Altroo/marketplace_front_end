import * as types from '../index';
import { AccountDeleteType, AccountEncloseType, AccountGenderType } from '../../../types/account/accountTypes';
import { InitStateNonNullableToken } from "../../../types/_init/_initTypes";

export const accountPostFacebookAction = (access_token: string) => {
	return {
		type: types.ACCOUNT_POST_FACEBOOK,
		access_token,
	};
};

export const accountPostGoogleAction = (access_token: string) => {
	return {
		type: types.ACCOUNT_POST_GOOGLE,
		access_token,
	};
};

// No longer used (since it's using async)
export const accountPostCheckEmailAction = (email: string) => {
	return {
		type: types.ACCOUNT_POST_CHECK_EMAIL,
		email,
	};
};

export const accountPostLoginAction = (email: string, password: string) => {
	return {
		type: types.ACCOUNT_POST_LOGIN,
		email,
		password,
	};
};

export const accountGetSocialsAction = () => {
	return {
		type: types.ACCOUNT_GET_SOCIALS,
	};
};

export const accountPostLinkFacebookAction = (access_token: string) => {
	return {
		type: types.ACCOUNT_POST_LINK_FACEBOOK,
		access_token,
	};
};

export const accountPostLinkGoogleAction = (access_token: string) => {
	return {
		type: types.ACCOUNT_POST_LINK_GOOGLE,
		access_token,
	};
};

export const accountPostUnlinkSocialAction = (pk: number) => {
	return {
		type: types.ACCOUNT_POST_UNLINK_SOCIAL,
		pk,
	};
};

export const accountPostLogoutAction = () => {
	return {
		type: types.ACCOUNT_POST_LOGOUT,
	};
};

// export const accountPostRegisterAction = (
// 	email: string,
// 	password: string,
// 	password2: string,
// 	first_name: string,
// 	last_name: string,
// ) => {
// 	return {
// 		type: types.ACCOUNT_POST_REGISTER,
// 		email,
// 		password,
// 		password2,
// 		first_name,
// 		last_name,
// 	};
// };

export const accountPostRegisterAction = (
	unique_id_exists: boolean,
	tokens: InitStateNonNullableToken
) => {
	return {
		type: types.ACCOUNT_POST_REGISTER,
		unique_id_exists,
		tokens,
	};
};

export const accountSetFacebookEmailAction = (email: string) => {
	return {
		type: types.ACCOUNT_SET_FACEBOOK_EMAIL,
		email,
	};
}

export const accountPostVerifyAccountAction = (email: string, code: number) => {
	return {
		type: types.ACCOUNT_POST_VERIFY_ACCOUNT,
		email,
		code,
	};
};

export const accountPostResendActivationAction = (email: string) => {
	return {
		type: types.ACCOUNT_POST_RESEND_VERIFICATION,
		email,
	};
};

export const accountPostPasswordChangeAction = (new_password1: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_POST_PASSWORD_CHANGE,
		new_password1,
		new_password2,
	};
};

export const accountPostSendPasswordResetAction = (email: string ) => {
	return {
		type: types.ACCOUNT_POST_SEND_PASSWORD_RESET,
		email,
	};
};

export const accountGetPasswordResetAction = (email: string, code: number) => {
	return {
		type: types.ACCOUNT_GET_PASSWORD_RESET,
		email,
		code,
	};
};

export const accountPutPasswordResetAction = (email: string, code: number, new_password: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_PUT_PASSWORD_RESET,
		email,
		code,
		new_password,
		new_password2
	};
};

/*** date format YYYY-MM-DD - 2022-12-31 */
export const accountPatchProfilAction = (
	first_name: string,
	last_name: string,
	gender: AccountGenderType,
	birth_date: Date,
	city_pk: number,
	country_pk: number,
	avatar?: File
) => {
	return {
		type: types.ACCOUNT_PATCH_PROFIL,
		first_name,
		last_name,
		gender,
		birth_date,
		city_pk,
		country_pk,
		avatar,
	};
};

export const accountGetProfilAction = () => {
	return {
		type: types.ACCOUNT_GET_PROFIL,
	};
};

export const accountGetSelectedProfilAction = (user_pk: number) => {
	return {
		type: types.ACCOUNT_GET_SELECTED_PROFIL,
		user_pk
	};
};

export const accountGetBlockedAction = () => {
	return {
		type: types.ACCOUNT_GET_BLOCK,
	};
};

export const accountPostBlockAction = (user_pk: number) => {
	return {
		type: types.ACCOUNT_POST_BLOCK,
		user_pk,
	};
};

export const accountDeleteBlockAction = (user_pk: number) => {
	return {
		type: types.ACCOUNT_DELETE_BLOCK,
		user_pk,
	};
};

/*** report_reason needs a type - NOT YET AVAILABLE ON FIGMA */
export const accountPostReportAction = (user_pk: number, report_reason: string) => {
	return {
		type: types.ACCOUNT_POST_REPORT,
		user_pk,
		report_reason,
	};
};

export const accountPostAddressAction = (
	title: string,
	first_name: string,
	last_name: string,
	address: string,
	city_pk: number,
	zip_code: number,
	country_pk: number,
	phone: string,
	email: string,
) => {
	return {
		type: types.ACCOUNT_POST_ADDRESS,
		title,
		first_name,
		last_name,
		address,
		city_pk,
		zip_code,
		country_pk,
		phone,
		email,
	};
};

export const accountPatchAddressAction = (
	address_pk: number,
	title: string,
	first_name: string,
	last_name: string,
	address: string,
	city_pk: number,
	zip_code: number,
	country_pk: number,
	phone: string,
	email: string,
) => {
	return {
		type: types.ACCOUNT_PATCH_ADDRESS,
		address_pk,
		title,
		first_name,
		last_name,
		address,
		city_pk,
		zip_code,
		country_pk,
		phone,
		email,
	};
};

export const accountDeleteAddressAction = (address_pk: number) => {
	return {
		type: types.ACCOUNT_DELETE_ADDRESS,
		address_pk,
	};
};

export const accountGetAddressAction = (address_pk: number) => {
	return {
		type: types.ACCOUNT_GET_ADDRESS,
		address_pk,
	};
};

export const accountGetAddressesAction = () => {
	return {
		type: types.ACCOUNT_GET_ADDRESSES,
	};
};

/*** reason_choice needs a type - NOT YET AVAILABLE ON FIGMA */
export const accountPostEncloseAction = (reason_choice: AccountEncloseType, typed_reason?: string) => {
	return {
		type: types.ACCOUNT_POST_ENCLOSE,
		reason_choice,
		typed_reason,
	};
};

export const accountPostChangeEmailHasPasswordAction = (new_email: string, password: string) => {
	return {
		type: types.ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD,
		new_email,
		password,
	};
};

export const accountPostChangeEmailNotHasPasswordAction = (new_email: string, new_password: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD,
		new_email,
		new_password,
		new_password2,
	};
};

/*** reason_choice needs a type - NOT YET AVAILABLE ON FIGMA */
export const accountPostDeleteAccountAction = (reason_choice: AccountDeleteType, typed_reason?: string) => {
	return {
		type: types.ACCOUNT_DELETE_ACCOUNT,
		reason_choice,
		typed_reason,
	};
};

export const accountGetCheckAccountAction = () => {
	return {
		type: types.ACCOUNT_GET_CHECK_ACCOUNT,
	};
};
