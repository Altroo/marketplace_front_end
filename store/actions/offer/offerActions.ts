import * as Types from '../index';

import {
	OfferCategoriesType,
	OfferOfferTypeType,
	OfferProductPriceByType,
	OfferServicePriceByType,
	OfferSolderByType,
	OfferZoneByType,
} from '../../../types/offer/offerTypes';
import { NextRouter } from "next/router";
import { ImageListType as ImageUploadingType } from "react-images-uploading/dist/typings";
import { setOfferToEditPayloadType } from "../../sagas/offer/offerSaga";

export const setOfferCategories = (categories: OfferCategoriesType) => {
	return {
		type: Types.SET_OFFER_CATEGORIES_PAGE,
		categories,
	};
};

export const setOfferDescriptionPage = (
	title: string,
	pictures: ImageUploadingType,
	description: string,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	made_in: string,
	creator: boolean,
	tags: string | null,
) => {
	return {
		type: Types.SET_OFFER_DESCRIPTION_PAGE,
		title,
		pictures,
		description,
		for_whom,
		product_colors,
		product_sizes,
		product_quantity,
		made_in,
		creator,
		tags,
	};
};

export const setOfferPricePage = (price: string, price_by: 'U' | 'K' | 'L') => {
	return {
		type: Types.SET_OFFER_PRICE_PAGE,
		price,
		price_by,
	}
}

export const setOfferDeliveryClickAndCollect = (
		longitude: number,
		latitude: number,
		address_name: string | null,
) => {
	return {
		type: Types.SET_OFFER_DELIVERY_PAGE_CLICK_AND_COLLECT,
		longitude,
		latitude,
		address_name
	}
}

export const setOfferToEdit = (
	payload: Omit<setOfferToEditPayloadType, 'type'>
) => {
	return {
		type: Types.SET_OFFER_TO_EDIT,
		...payload,
	}
}

// export const emptyOfferDeliveryClickAndCollect = () => {
// 	return {
// 		type: Types.EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT,
// 	};
// };

export const emptyOfferDeliveries = (option: "1" | "2" | "3") => {
	return {
		type: Types.EMPTY_OFFER_DELIVERIES,
		option,
	};
};

export const setOfferDeliveries = (
	delivery_city_1: string,
	all_cities_1: boolean,
	delivery_price_1: string,
	delivery_days_1: string,
	delivery_city_2: string,
	all_cities_2: boolean,
	delivery_price_2: string,
	delivery_days_2: string,
	delivery_city_3: string,
	all_cities_3: boolean,
	delivery_price_3: string,
	delivery_days_3: string,
) => {
	return {
		type: Types.SET_OFFER_DELIVERY_PAGE_DELIVERIES,
		delivery_city_1,
		all_cities_1,
		delivery_price_1,
		delivery_days_1,
		delivery_city_2,
		all_cities_2,
		delivery_price_2,
		delivery_days_2,
		delivery_city_3,
		all_cities_3,
		delivery_price_3,
		delivery_days_3,
	};
};
// POST : /api/1.0.0/offer/
export const offerPostRootProductAction = (
	offer_type: OfferOfferTypeType,
	offer_categories: string,
	title: string | null,
	pictures: ImageUploadingType,
	description: string | null,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	price: string | null,
	product_price_by: OfferProductPriceByType | null,
	product_address: string | null,
	product_longitude: number | null,
	product_latitude: number | null,
	delivery_city_1: string | null,
	all_cities_1: boolean | null,
	delivery_price_1: string | null,
	delivery_days_1: string | null,
	delivery_city_2: string | null,
	all_cities_2: boolean | null,
	delivery_price_2: string | null,
	delivery_days_2: string | null,
	delivery_city_3: string | null,
	all_cities_3: boolean | null,
	delivery_price_3: string | null,
	delivery_days_3: string | null,
	tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_POST_ROOT,
		offer_type,
		offer_categories,
		title,
		pictures,
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
		all_cities_1,
		delivery_price_1,
		delivery_days_1,
		delivery_city_2,
		all_cities_2,
		delivery_price_2,
		delivery_days_2,
		delivery_city_3,
		all_cities_3,
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
	offer_pk: number,
	offer_categories: string,
	title: string | null,
	pictures: ImageUploadingType,
	description: string | null,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	price: string | null,
	product_price_by: OfferProductPriceByType | null,
	product_address: string | null,
	product_longitude: number | null,
	product_latitude: number | null,
	delivery_city_1: string | null,
	all_cities_1: boolean | null,
	delivery_price_1: string | null,
	delivery_days_1: string | null,
	delivery_city_2: string | null,
	all_cities_2: boolean | null,
	delivery_price_2: string | null,
	delivery_days_2: string | null,
	delivery_city_3: string | null,
	all_cities_3: boolean | null,
	delivery_price_3: string | null,
	delivery_days_3: string | null,
	tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	return {
		type: Types.OFFER_PUT_ROOT,
		offer_pk,
		offer_categories,
		title,
		pictures,
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
		made_in_label,
	};
};

export const offerGetRootAction = (pk: number) => {
	return {
		type: Types.OFFER_GET_ROOT,
		pk,
	};
};

export const offerGetOffersByShopIDAction = (
	pk: number,
	next_page: string,
	sort_by?: string,
) => {
	return {
		type: Types.OFFER_GET_OFFERS_BY_SHOP_ID,
		pk,
		next_page,
		sort_by
	};
};

export const offerGetOffersByShopIDWithQueryParamsAction = (
	url: string,
) => {
	return {
		type: Types.OFFER_GET_OFFERS_BY_SHOP_ID_AND_QUERY_PARAMS,
		url,
	};
};

export const offerGetAvailableFiltersByShopID = (
	pk: number,
) => {
	return {
		type: Types.OFFER_GET_AVAILABLE_FILTERS_BY_SHOP_ID,
		pk,
	}
}

export const offerGetAvailableFiltersByUniqueID = (
	unique_id: string,
) => {
	return {
		type: Types.OFFER_GET_AVAILABLE_FILTERS_BY_UNIQUE_ID,
		unique_id,
	}
}

export const setEmptySelectedOffer = () => {
	return {
		type: Types.OFFER_SET_EMPTY_SELECTED_OFFER,
	};
};

export const setEmptyUserLocalOffer = () => {
	return {
		type: Types.EMPTY_OFFER_USER_LOCAL_OFFER,
	};
};

export const offerDeleteRootAction = (pk: number, router: NextRouter) => {
	return {
		type: Types.OFFER_DELETE_ROOT,
		pk,
		router
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

export const offerGetMyOffersFirstPageAction = () => {
	return {
		type: Types.OFFER_GET_MY_OFFERS_FIRST_PAGE,
	};
};

export const offerPostPinAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_POST_PIN,
		offer_pk,
	};
};

export const offerPostPinWithCallBackAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_POST_PIN_WITH_CALLBACK,
		offer_pk,
	};
}

export const offerGetMyOffersAction = () => {
	return {
		type: Types.OFFER_GET_MY_OFFERS,
	};
};

export const offerPostSolderAction = (
	offer_pk: number,
	solder_type: OfferSolderByType,
	solder_value: number,
	router: NextRouter,
) => {
	return {
		type: Types.OFFER_POST_SOLDER,
		offer_pk,
		solder_type,
		solder_value,
		router,
	};
};



export const offerGetSolderAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_GET_SOLDER,
		offer_pk,
	};
};

export const offerPatchSolderAction = (
	offer_pk: number,
	solder_type: OfferSolderByType,
	solder_value: number,
	router: NextRouter,
) => {
	return {
		type: Types.OFFER_PATCH_SOLDER,
		offer_pk,
		solder_type,
		solder_value,
		router,
	};
};

export const offerDeleteSolderAction = (offer_pk: number, router: NextRouter) => {
	return {
		type: Types.OFFER_DELETE_SOLDER,
		offer_pk,
		router
	};
};

export const offerGetVuesAction = () => {
	return {
		type: Types.OFFER_GET_VUES,
	};
};
