import * as types from '../index';
import { InitStateNonNullableToken } from "../../../types/_init/_initTypes";

export const accountPostRegisterAction = (
	tokens: InitStateNonNullableToken
) => {
	return {
		type: types.ACCOUNT_POST_REGISTER,
		tokens,
	};
};

export const accountSetFacebookEmailAction = (email: string) => {
	return {
		type: types.ACCOUNT_SET_FACEBOOK_EMAIL,
		email,
	};
}

export const accountPostResendActivationAction = (email: string) => {
	return {
		type: types.ACCOUNT_POST_RESEND_VERIFICATION,
		email,
	};
};

export const accountPostPasswordChangeAction = (old_password: string, new_password1: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_POST_PASSWORD_CHANGE,
		old_password,
		new_password1,
		new_password2,
	};
};

export const accountPutCreatePasswordAction = (new_password1: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_PUT_CREATE_PASSWORD,
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

/*** date format YYYY-MM-DD - 2022-12-31 */
export const accountPatchProfilAction = (
	avatar: string | ArrayBuffer | null,
	first_name: string,
	last_name: string,
	birth_date: string | null,
	gender: string,
	city: string | null,
	country: string | null,
) => {
	return {
		type: types.ACCOUNT_PATCH_PROFIL,
		first_name,
		last_name,
		gender,
		birth_date,
		city,
		country,
		avatar,
	};
};

export const accountPutChangeEmailHasPasswordAction = (email: string, password: string) => {
	return {
		type: types.ACCOUNT_PUT_CHANGE_EMAIL_HAS_PASSWORD,
		email,
		password,
	};
};

export const accountPostChangeEmailNotHasPasswordAction = (email: string, new_password1: string, new_password2: string) => {
	return {
		type: types.ACCOUNT_PUT_CHANGE_EMAIL_NOT_HAS_PASSWORD,
		email,
		new_password1,
		new_password2,
	};
};

export const accountGetCheckAccountAction = () => {
	return {
		type: types.ACCOUNT_GET_CHECK_ACCOUNT,
	};
};
