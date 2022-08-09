// POST : /api/1.0.0/offer/
import * as Types from '../index';
import {
	OfferCategoriesType,
	OfferOfferTypeType,
	OfferProductPriceByType,
	OfferServicePriceByType,
	OfferSolderByType,
	OfferZoneByType,
} from '../../../types/offer/offerTypes';

export const offerPostRootProductAction = (
	offer_type: OfferOfferTypeType,
	offer_categories: string,
	title: string,
	picture_1: File | string,
	picture_2: File | string | null,
	picture_3: File | string | null,
	picture_4: File | string | null,
	description: string,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	price: number,
	product_price_by: OfferProductPriceByType,
	product_longitude: number | null,
	product_latitude: number | null,
	product_address: string | null,
	delivery_city_1: string | null,
	delivery_price_1: number | null,
	delivery_days_1: number | null,
	delivery_city_2: string | null,
	delivery_price_2: number | null,
	delivery_days_2: number | null,
	delivery_city_3: string | null,
	delivery_price_3: number | null,
	delivery_days_3: number | null,
	tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_POST_ROOT,
		offer_type,
		offer_categories,
		title,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		description,
		for_whom,
		product_colors,
		product_sizes,
		product_quantity,
		price,
		product_price_by,
		product_longitude,
		product_latitude,
		product_address,
		delivery_city_1,
		delivery_price_1,
		delivery_days_1,
		delivery_city_2,
		delivery_price_2,
		delivery_days_2,
		delivery_city_3,
		delivery_price_3,
		delivery_days_3,
		tags,
		creator_label,
		made_in_label,
	};
};

export const offerPostRootServiceAction = (
	offer_type: OfferOfferTypeType,
	offer_categories: string | Array<OfferCategoriesType>,
	title: string,
	picture_1: File,
	picture_2: File | null,
	picture_3: File | null,
	picture_4: File | null,
	description: string,
	for_whom: string | null,
	price: number,
	service_availability_days: string,
	service_morning_hour_from: string,
	service_morning_hour_to: string,
	service_afternoon_hour_from: string,
	service_afternoon_hour_to: string,
	service_zone_by: OfferZoneByType,
	service_price_by: OfferServicePriceByType,
	service_longitude: number,
	service_latitude: number,
	service_address: string,
	service_km_radius: number | null,
	tags: string | Array<string> | [],
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_POST_ROOT,
		offer_type,
		offer_categories,
		title,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		description,
		for_whom,
		price,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		service_zone_by,
		service_price_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius,
		tags,
		creator_label,
		made_in_label,
	};
};

export const offerPutRootProductAction = (
	pk: number,
	offer_categories: string,
	title: string,
	picture_1: File | string,
	picture_2: File | string | null,
	picture_3: File | string | null,
	picture_4: File | string | null,
	description: string,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	price: number,
	product_price_by: OfferProductPriceByType,
	product_longitude: number | null,
	product_latitude: number | null,
	product_address: string | null,
	delivery_city_1: string | null,
	delivery_price_1: number | null,
	delivery_days_1: number | null,
	delivery_city_2: string | null,
	delivery_price_2: number | null,
	delivery_days_2: number | null,
	delivery_city_3: string | null,
	delivery_price_3: number | null,
	delivery_days_3: number | null,
	tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_PUT_ROOT,
		pk,
		offer_categories,
		title,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		description,
		for_whom,
		product_colors,
		product_sizes,
		product_quantity,
		price,
		product_price_by,
		product_longitude,
		product_latitude,
		product_address,
		delivery_city_1,
		delivery_price_1,
		delivery_days_1,
		delivery_city_2,
		delivery_price_2,
		delivery_days_2,
		delivery_city_3,
		delivery_price_3,
		delivery_days_3,
		tags,
		creator_label,
		made_in_label,
	};
};

export const offerPutRootServiceAction = (
	pk: number,
	offer_categories: string | Array<OfferCategoriesType>,
	title: string,
	picture_1: File,
	picture_2: File | null,
	picture_3: File | null,
	picture_4: File | null,
	description: string,
	for_whom: string | null,
	price: number,
	service_availability_days: string,
	service_morning_hour_from: string,
	service_morning_hour_to: string,
	service_afternoon_hour_from: string,
	service_afternoon_hour_to: string,
	service_zone_by: OfferZoneByType,
	service_price_by: OfferServicePriceByType,
	service_longitude: number,
	service_latitude: number,
	service_address: string,
	service_km_radius: number | null,
	tags: string | Array<string> | [],
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_PUT_ROOT,
		pk,
		offer_categories,
		title,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		description,
		for_whom,
		price,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		service_zone_by,
		service_price_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius,
		tags,
		creator_label,
		made_in_label
	};
};

export const offerGetRootAction = (pk: number) => {
	return {
		type: Types.OFFER_GET_ROOT,
		pk,
	};
};

export const offerDeleteRootAction = (pk: number) => {
	return {
		type: Types.OFFER_DELETE_ROOT,
		pk,
	};
};

export const offerGetTagsAction = (nameTag: string) => {
	return {
		type: Types.OFFER_GET_TAGS,
		nameTag,
	};
};

export const offerGetDeliveriesAction = () => {
	return {
		type: Types.OFFER_GET_DELIVERIES,
	};
};

export const offerGetMyOffersAction = () => {
	return {
		type: Types.OFFER_GET_MY_OFFERS,
	};
};

export const offerPostSolderAction = (offer_pk: number, solder_type: OfferSolderByType, solder_value: number) => {
	return {
		type: Types.OFFER_POST_SOLDER,
		offer_pk,
		solder_type,
		solder_value,
	};
};

export const offerGetSolderAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_GET_SOLDER,
		offer_pk,
	};
};

export const offerPatchSolderAction = (offer_pk: number, solder_type: OfferSolderByType, solder_value: number) => {
	return {
		type: Types.OFFER_PATCH_SOLDER,
		offer_pk,
		solder_type,
		solder_value,
	};
};

export const offerDeleteSolderAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_DELETE_SOLDER,
		offer_pk,
	};
};

export const offerGetVuesAction = () => {
	return {
		type: Types.OFFER_GET_VUES,
	};
};