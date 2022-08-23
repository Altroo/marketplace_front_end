import * as Yup from "yup";
import {
	INPUT_EMAIL, INPUT_FACEBOOK_URL, INPUT_TWITTER_URL,
	INPUT_MAX,
	INPUT_MIN,
	INPUT_PONE,
	INPUT_REQUIRED,
	INPUT_URL, INPUT_INSTAGRAM_URL
} from "./formValidationErrorMessages";

export const shopNameSchema = Yup.object().shape({
	shop_name: Yup.string()
		.min(2, INPUT_MIN(2))
		.max(50, INPUT_MAX(50))
		.required(INPUT_REQUIRED),
});

export const shopBioSchema = Yup.object().shape({
	bio: Yup.string()
		.max(300, INPUT_MAX(300))
		.nullable()
});

export const shopAvailabilityDaysSchema = Yup.object().shape({
	al_day: Yup.string().nullable().notRequired(),
	tu_day: Yup.string().nullable().notRequired(),
	we_day: Yup.string().nullable().notRequired(),
	th_day: Yup.string().nullable().notRequired(),
	fr_day: Yup.string().nullable().notRequired(),
	sa_day: Yup.string().nullable().notRequired(),
	su_day: Yup.string().nullable().notRequired(),
	morning_hour_from: Yup.string().nullable().notRequired(),
	morning_hour_to: Yup.string().nullable().notRequired(),
	afternoon_hour_from: Yup.string().nullable().notRequired(),
	afternoon_hour_to: Yup.string().nullable().notRequired(),
});

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const shopCoordonneeSchema = Yup.object().shape({
	phone: Yup.string().matches(rePhoneNumber, {message: INPUT_PONE}).nullable().notRequired(),
	contact_email: Yup.string().email(INPUT_EMAIL).nullable().notRequired(),
	website_link: Yup.string().url(INPUT_URL).nullable().notRequired(),
	facebook_link: Yup.string().url(INPUT_FACEBOOK_URL).nullable().notRequired(),
	twitter_link: Yup.string().url(INPUT_TWITTER_URL).nullable().notRequired(),
	instagram_link: Yup.string().url(INPUT_INSTAGRAM_URL).nullable().notRequired(),
	whatsapp: Yup.string().matches(rePhoneNumber, {message: INPUT_PONE}).nullable().notRequired(),
});

export const shopAddressSchema = Yup.object().shape({
	zone_by: Yup.string().notRequired(),
	longitude: Yup.number().nullable().notRequired(),
	latitude: Yup.number().nullable().notRequired(),
	address_name: Yup.string().nullable().required(),
	km_radius: Yup.number().nullable().notRequired(),
});










