import * as Types from '../index';

import {
	OfferCategoriesType, OfferGetRootProductInterface, OfferGetRootServiceInterface,
	OfferOfferTypeType,
	OfferProductPriceByType,
	OfferServicePriceByType,
	OfferSolderByType,
	OfferZoneByType, setOfferProductToEditPayloadType, setOfferServiceToEditPayloadType
} from "../../../types/offer/offerTypes";
import { ImageListType as ImageUploadingType } from "react-images-uploading/dist/typings";
import { ShopZoneByType } from "../../../types/shop/shopTypes";

export const setOfferProductCategories = (categories: OfferCategoriesType) => {
	return {
		type: Types.SET_OFFER_PRODUCT_CATEGORIES_PAGE,
		categories,
	};
};

export const setOfferServiceCategories = (categories: OfferCategoriesType) => {
	return {
		type: Types.SET_OFFER_SERVICE_CATEGORIES_PAGE,
		categories,
	};
};

export const setSelectedOfferAction = (data: OfferGetRootProductInterface | OfferGetRootServiceInterface) => {
	return {
		type: Types.SET_SELECTED_OFFER,
		data,
	};
}

export const setOfferProductDescriptionPage = (
	title: string,
	pictures: ImageUploadingType,
	description: string,
	for_whom: string | null,
	product_colors: string | null,
	product_sizes: string | null,
	product_quantity: number | null,
	made_in: string,
	creator: boolean,
	// tags: string | null,
) => {
	return {
		type: Types.SET_OFFER_PRODUCT_DESCRIPTION_PAGE,
		title,
		pictures,
		description,
		for_whom,
		product_colors,
		product_sizes,
		product_quantity,
		made_in,
		creator,
		// tags,
	};
};

export const setOfferServiceLocalisation = (
	service_zone_by: ShopZoneByType | null,
	service_longitude: number | null,
	service_latitude: number | null,
	service_address: string | null,
	service_km_radius: number | null,
) => {
	return {
		type: Types.SET_OFFER_SERVICE_LOCALISATION,
		service_zone_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius
	};
};

export const setOfferServiceDescriptionPage = (
	title: string,
	pictures: ImageUploadingType,
	description: string,
	for_whom: string | null,
	service_availability_days: string,
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	// tags: string | null,
) => {
	return {
		type: Types.SET_OFFER_SERVICE_DESCRIPTION_PAGE,
		title,
		pictures,
		description,
		for_whom,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		// tags,
	};
};

export const setOfferServicePricePage = (price: string, price_by: "H" | "J" | "S" | "M" | "P") => {
	return {
		type: Types.SET_OFFER_SERVICE_PRICE_PAGE,
		price,
		price_by,
	}
}

export const setOfferProductPricePage = (price: string, price_by: 'U' | 'K' | 'L') => {
	return {
		type: Types.SET_OFFER_PRODUCT_PRICE_PAGE,
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

export const setOfferProductToEdit = (
	payload: Omit<setOfferProductToEditPayloadType, 'type'>
) => {
	return {
		type: Types.SET_OFFER_PRODUCT_TO_EDIT,
		...payload,
	}
}

export const setOfferServiceToEdit = (
	payload: Omit<setOfferServiceToEditPayloadType, 'type'>
) => {
	return {
		type: Types.SET_OFFER_SERVICE_TO_EDIT,
		...payload,
	}
}

export const emptyOfferDeliveryClickAndCollect = () => {
	return {
		type: Types.EMPTY_OFFER_DELIVERY_CLICK_AND_COLLECT,
	};
};

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
	// tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	let verified_price_2: number | null = null;
	let verified_days_2: number | null = null;
	if (delivery_city_2 && delivery_city_2.length > 0) {
		if (delivery_price_2 && delivery_price_2.length > 0) {
			verified_price_2 = parseInt(delivery_price_2);
		} else {
			verified_price_2 = 0.0;
		}
		if (delivery_days_2 && delivery_days_2.length > 0) {
			verified_days_2 = parseInt(delivery_days_2);
		} else {
			verified_days_2 = 1;
		}
	}
	let verified_price_3: number | null = null;
	let verified_days_3: number | null = null;
	if (delivery_city_3 && delivery_city_3.length > 0) {
		if (delivery_price_3 && delivery_price_3.length > 0) {
			verified_price_3 = parseInt(delivery_price_3);
		} else {
			verified_price_3 = 0;
		}
		if (delivery_days_3 && delivery_days_3.length > 0) {
			verified_days_3 = parseInt(delivery_days_3);
		} else {
			verified_days_3 = 1;
		}
	}

	return {
		type: Types.OFFER_POST_ROOT,
		offer_type: offer_type,
		offer_categories: offer_categories,
		title: title,
		pictures: pictures,
		description: description,
		for_whom: for_whom,
		product_colors: product_colors,
		product_sizes: product_sizes,
		product_quantity: product_quantity,
		price: price,
		product_price_by: product_price_by,
		product_longitude: product_longitude,
		product_latitude: product_latitude,
		product_address: product_address,
		delivery_city_1: delivery_city_1,
		all_cities_1: all_cities_1,
		delivery_price_1: delivery_price_1,
		delivery_days_1: delivery_days_1,
		delivery_city_2: delivery_city_2,
		all_cities_2: all_cities_2,
		delivery_price_2: verified_price_2,
		delivery_days_2: verified_days_2,
		delivery_city_3: delivery_city_3,
		all_cities_3: all_cities_3,
		delivery_price_3: verified_price_3,
		delivery_days_3: verified_days_3,
		// tags,
		creator_label,
		made_in_label,
	};
};

export const offerPostRootServiceAction = (
	offer_type: OfferOfferTypeType,
	offer_categories: string,
	title: string | null,
	pictures: ImageUploadingType,
	description: string | null,
	for_whom: string | null,
	service_availability_days: string | null,
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	service_zone_by: OfferZoneByType | null,
	service_longitude: number | null,
	service_latitude: number | null,
	service_address: string | null,
	service_km_radius: number | null,
	price: string | null,
	service_price_by: OfferServicePriceByType | null,
	// tags: string | null,
) => {
	return {
		type: Types.OFFER_POST_ROOT,
		offer_type,
		offer_categories,
		title,
		pictures,
		description,
		for_whom,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		service_zone_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius,
		price,
		service_price_by,
		// tags
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
	// tags: string | null,
	creator_label?: boolean,
	made_in_label?: string,
) => {
	let verified_price_2: number | null = null;
	let verified_days_2: number | null = null;
	if (delivery_city_2 && delivery_city_2.length > 0) {
		if (delivery_price_2 && delivery_price_2.length > 0) {
			verified_price_2 = parseInt(delivery_price_2);
		} else {
			verified_price_2 = 0.0;
		}
		if (delivery_days_2 && delivery_days_2.length > 0) {
			verified_days_2 = parseInt(delivery_days_2);
		} else {
			verified_days_2 = 1;
		}
	}
	let verified_price_3: number | null = null;
	let verified_days_3: number | null = null;
	if (delivery_city_3 && delivery_city_3.length > 0) {
		if (delivery_price_3 && delivery_price_3.length > 0) {
			verified_price_3 = parseInt(delivery_price_3);
		} else {
			verified_price_3 = 0;
		}
		if (delivery_days_3 && delivery_days_3.length > 0) {
			verified_days_3 = parseInt(delivery_days_3);
		} else {
			verified_days_3 = 1;
		}
	}

	return {
		type: Types.OFFER_PUT_ROOT,
		offer_pk: offer_pk,
		offer_categories: offer_categories,
		title: title,
		pictures: pictures,
		description: description,
		for_whom: for_whom,
		product_colors: product_colors,
		product_sizes: product_sizes,
		product_quantity: product_quantity,
		price: price,
		product_price_by: product_price_by,
		product_longitude: product_longitude,
		product_latitude: product_latitude,
		product_address: product_address,
		delivery_city_1: delivery_city_1,
		all_cities_1: all_cities_1,
		delivery_price_1: delivery_price_1,
		delivery_days_1: delivery_days_1,
		delivery_city_2: delivery_city_2,
		all_cities_2: all_cities_2,
		delivery_price_2: verified_price_2,
		delivery_days_2: verified_days_2,
		delivery_city_3: delivery_city_3,
		all_cities_3: all_cities_3,
		delivery_price_3: verified_price_3,
		delivery_days_3: verified_days_3,
		// tags,
		creator_label,
		made_in_label,
	};
};

export const offerPutRootServiceAction = (
	offer_pk: number,
	offer_categories: string,
	title: string | null,
	pictures: ImageUploadingType,
	description: string | null,
	for_whom: string | null,
	service_availability_days: string | null,
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	service_zone_by: OfferZoneByType | null,
	service_longitude: number | null,
	service_latitude: number | null,
	service_address: string | null,
	service_km_radius: number | null,
	price: string | null,
	service_price_by: OfferServicePriceByType | null,
	// tags: string | null,
) => {
	return {
		type: Types.OFFER_PUT_ROOT,
		offer_pk,
		offer_categories,
		title,
		pictures,
		description,
		for_whom,
		service_availability_days,
		service_morning_hour_from,
		service_morning_hour_to,
		service_afternoon_hour_from,
		service_afternoon_hour_to,
		service_zone_by,
		service_longitude,
		service_latitude,
		service_address,
		service_km_radius,
		price,
		service_price_by,
		// tags
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

export const setEmptyUserLocalOffer = () => {
	return {
		type: Types.EMPTY_OFFER_USER_LOCAL_OFFER,
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

export const offerGetLastThreeUsedDeliveriesAction = () => {
	return {
		type: Types.OFFER_GET_LAST_THREE_USED_DELIVERIES,
	};
};

// export const offerPostPinAction = (offer_pk: number) => {
// 	return {
// 		type: Types.OFFER_POST_PIN,
// 		offer_pk,
// 	};
// };

export const offerPostPinAction = (offer_pk: number) => {
	return {
		type: Types.OFFER_POST_PIN,
		offer_pk,
	};
}


export const offerPostSolderAction = (
	offer_pk: number,
	solder_type: OfferSolderByType,
	solder_value: number,
) => {
	return {
		type: Types.OFFER_POST_SOLDER,
		offer_pk,
		solder_type,
		solder_value,
	};
};

export const offerPatchSolderAction = (
	offer_pk: number,
	solder_type: OfferSolderByType,
	solder_value: number,
) => {
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

export const offerGetVuesAction = (url: string) => {
	return {
		type: Types.OFFER_GET_VUES,
		url,
	};
};
