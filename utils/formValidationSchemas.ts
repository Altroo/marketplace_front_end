import * as Yup from 'yup';
import {
	INPUT_EMAIL,
	INPUT_FACEBOOK_URL,
	INPUT_TWITTER_URL,
	INPUT_MAX,
	INPUT_MIN,
	INPUT_PONE,
	INPUT_REQUIRED,
	INPUT_URL,
	INPUT_INSTAGRAM_URL,
	INPUT_IMG_MIN,
	INPUT_PASSWORD_MIN,
	SHORT_INPUT_REQUIRED,
	INPUT_POSTAL_CODE,
	INPUT_ICE,
	INPUT_NUMBER_MIN, INPUT_NUMBER_MAX, MINI_INPUT_EMAIL
} from "./formValidationErrorMessages";

export const shopNameSchema = Yup.object().shape({
	shop_name: Yup.string().min(2, INPUT_MIN(2)).max(50, INPUT_MAX(50)).required(INPUT_REQUIRED),
});

export const shopBioSchema = Yup.object().shape({
	bio: Yup.string().max(300, INPUT_MAX(300)).nullable(),
});

export const emailSchema = Yup.object().shape({
	email: Yup.string().email(INPUT_EMAIL).required(INPUT_REQUIRED),
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
	phone: Yup.string().matches(rePhoneNumber, { message: INPUT_PONE }).nullable().notRequired(),
	contact_email: Yup.string().email(INPUT_EMAIL).nullable().notRequired(),
	website_link: Yup.string().url(INPUT_URL).nullable().notRequired(),
	facebook_link: Yup.string().url(INPUT_FACEBOOK_URL).nullable().notRequired(),
	twitter_link: Yup.string().url(INPUT_TWITTER_URL).nullable().notRequired(),
	instagram_link: Yup.string().url(INPUT_INSTAGRAM_URL).nullable().notRequired(),
	whatsapp: Yup.string().matches(rePhoneNumber, { message: INPUT_PONE }).nullable().notRequired(),
});

export const shopAddressSchema = Yup.object().shape({
	zone_by: Yup.string().notRequired(),
	longitude: Yup.number().nullable().notRequired(),
	latitude: Yup.number().nullable().notRequired(),
	address_name: Yup.string().nullable().required(),
	km_radius: Yup.number().nullable().notRequired(),
});

export const serviceAddressSchema = Yup.object().shape({
	service_zone_by: Yup.string().notRequired(),
	service_longitude: Yup.number().nullable().notRequired(),
	service_latitude: Yup.number().nullable().notRequired(),
	service_address: Yup.string().nullable().required(),
	service_km_radius: Yup.number().nullable().notRequired(),
});

export const addOfferProductSchema = Yup.object().shape({
	title: Yup.string().min(2, INPUT_MIN(2)).max(150, INPUT_MAX(150)).required(INPUT_REQUIRED),
	description: Yup.string().required(INPUT_REQUIRED),
	images: Yup.array().of(
		Yup.object().shape({
			dataURL: Yup.string(),
			file: Yup.object().nullable().shape({
				lastModified: Yup.number(),
				name: Yup.string(),
				size: Yup.number(),
				type: Yup.string(),
				webkitRelativePath: Yup.string(),
			}),
	})).min(1, INPUT_IMG_MIN(1)),
	made_in: Yup.string().required(INPUT_REQUIRED),
	// tags: Yup.lazy((val) =>
	// 	Array.isArray(val)
	// 		? Yup.array().of(Yup.string().required(INPUT_REQUIRED))
	// 		: Yup.string().required(INPUT_REQUIRED),
	// ),
});

export const addOfferServiceSchema = Yup.object().shape({
	title: Yup.string().min(2, INPUT_MIN(2)).max(150, INPUT_MAX(150)).required(INPUT_REQUIRED),
	images: Yup.array().of(
		Yup.object().shape({
			dataURL: Yup.string(),
			file: Yup.object().nullable().shape({
				lastModified: Yup.number(),
				name: Yup.string(),
				size: Yup.number(),
				type: Yup.string(),
				webkitRelativePath: Yup.string(),
			}),
	})).min(1, INPUT_IMG_MIN(1)),
	description: Yup.string().required(INPUT_REQUIRED),
	al_day: Yup.string().nullable().notRequired(),
	mo_day: Yup.string().nullable().notRequired(),
	tu_day: Yup.string().nullable().notRequired(),
	we_day: Yup.string().nullable().notRequired(),
	th_day: Yup.string().nullable().notRequired(),
	fr_day: Yup.string().nullable().notRequired(),
	sa_day: Yup.string().nullable().notRequired(),
	su_day: Yup.string().nullable().notRequired(),
	service_morning_hour_from: Yup.string().required(SHORT_INPUT_REQUIRED),
	service_morning_hour_to: Yup.string().required(SHORT_INPUT_REQUIRED),
	service_afternoon_hour_from: Yup.string().nullable().notRequired(),
	service_afternoon_hour_to: Yup.string().nullable().notRequired(),
	// tags: Yup.array().of(Yup.string().required(INPUT_REQUIRED)),
});

export const clickAndCollectSchema = Yup.object().shape({
	longitude: Yup.number().nullable().notRequired(),
	latitude: Yup.number().nullable().notRequired(),
	address_name: Yup.string().nullable().required(),
});

export const tellUsMoreSchema = Yup.object().shape({
	first_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	last_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	password: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
	password2: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
});

export const loginSchema = Yup.object().shape({
	email: Yup.string().email(INPUT_EMAIL).required(INPUT_REQUIRED),
	password: Yup.string().required(INPUT_REQUIRED),
	globalError: Yup.string().notRequired().nullable(),
});

export const passwordResetCodeSchema = Yup.object().shape({
	one: Yup.number().required(SHORT_INPUT_REQUIRED),
	two: Yup.number().required(SHORT_INPUT_REQUIRED),
	three: Yup.number().required(SHORT_INPUT_REQUIRED),
	four: Yup.number().required(SHORT_INPUT_REQUIRED),
	globalError: Yup.string().notRequired().nullable(),
});

export const passwordResetConfirmationSchema = Yup.object().shape({
	new_password: Yup.string().required(INPUT_REQUIRED),
	new_password2: Yup.string().required(INPUT_REQUIRED),
	globalError: Yup.string().notRequired().nullable(),
});

export const profilSchema = Yup.object().shape({
	first_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	last_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
});

export const changeEmailSchema = Yup.object().shape({
	email: Yup.string().email(INPUT_EMAIL).required(INPUT_REQUIRED),
	password: Yup.string().required(INPUT_REQUIRED),
});

export const changeEmailWithPasswordSchema = Yup.object().shape({
	email: Yup.string().email(INPUT_EMAIL).required(INPUT_REQUIRED),
	new_password1: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
	new_password2: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
});


export const changePasswordSchema = Yup.object().shape({
	old_password: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
	new_password1: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
	new_password2: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
});

export const createPasswordSchema = Yup.object().shape({
	new_password1: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
	new_password2: Yup.string().min(8, INPUT_PASSWORD_MIN(8)).required(INPUT_REQUIRED),
});

export const subscriptionSchema = Yup.object().shape({
	company: Yup.string().notRequired().nullable(),
	ice: Yup.string()
		.min(15, INPUT_NUMBER_MIN(15))
		.typeError(INPUT_ICE)
		.max(15, INPUT_NUMBER_MAX(15))
		.transform(value => value.replace(/\D/g, ''))
		.notRequired(),
	first_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	last_name: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	adresse: Yup.string().min(2, INPUT_MIN(2)).max(50, INPUT_MAX(50)).required(INPUT_REQUIRED),
	city: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
	code_postal: Yup.number().typeError(INPUT_POSTAL_CODE).required(INPUT_REQUIRED),
	country: Yup.string().min(2, INPUT_MIN(2)).max(30, INPUT_MAX(30)).required(INPUT_REQUIRED),
});

export const promoCodeSchema = Yup.object().shape({
	promo_code: Yup.string().notRequired().nullable(),
});

export const newsLetterEmailSchema = Yup.object().shape({
	email: Yup.string().email(MINI_INPUT_EMAIL).notRequired().nullable(),
});