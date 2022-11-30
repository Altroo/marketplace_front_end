import { OfferProductClass, OfferServiceClass } from '../../models/offer/OfferProductClass';
import {
	ResponseDataInterface,
	PaginationResponseType,
	GlobalApiPromiseError,
	ApiErrorResponseType
} from "../_init/_initTypes";
import { NextRouter } from 'next/router';
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';

// ('V', 'Produit'), ('S', 'Service'), ('L', 'Location') <- 'L' Not yet available,
export type OfferOfferTypeType = 'V' | 'S'; //  | 'L'
// ('T','Tout le monde'), ('E','Enfant'), ('F','Femme'), ('H','Homme')
export type OfferForWhomType = 'T' | 'E' | 'F' | 'H';
// ('U', 'Unity'), ('K', 'Kilogram'), ('L', 'Liter'),
export type OfferProductPriceByType = 'U' | 'K' | 'L';
// ('A', 'Address'), ('S', 'Sector')
export type OfferZoneByType = 'A' | 'S';
// ('H', 'Heur'), ('J', 'Jour'), ('S', 'Semaine'), ('M', 'Mois'), ('P', 'Prestation'),
export type OfferServicePriceByType = 'H' | 'J' | 'S' | 'M' | 'P';
// ('F', 'Prix fix'), ('P', 'Pourcentage'),
export type OfferSolderByType = 'F' | 'P';

export type OfferServiceDaysType = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU' | 'AL';
// AC,Accessoire
// AN,Animaux
// AR,Artisanat
// BE,Beauté
// CO,Cours
// DI,Divers
// EV,Événement
// IM,Immobilier
// JA,Jardin
// JE,Jeux
// LO,Loisirs
// LI,Livres
// MA,Maison
// MO,Mode
// MD,Multimédia
// MS,Musique
// NO,Nourriture & Alimentation
// SA,Santé & Bien être
// SP,Sport
// VE,Véhicule
// VO,Voyage
export type OfferCategoriesType =
	| 'AC'
	| 'AN'
	| 'AR'
	| 'BE'
	| 'CO'
	| 'DI'
	| 'EV'
	| 'IM'
	| 'JA'
	| 'JE'
	| 'LO'
	| 'LI'
	| 'MA'
	| 'MO'
	| 'MD'
	| 'MS'
	| 'NO'
	| 'SA'
	| 'SP'
	| 'VE'
	| 'VO';
/*
BK,Black
WT,White
BR,Brown
BL,Blue
GN,Green
PR,Purple
OR,Orange
PI,Pink
YE,Yellow
GR,Gray
MC,Multi
RD,Red
 */
export type OfferProductColors = 'BK' | 'WT' | 'BR' | 'BL' | 'GN' | 'PR' | 'OR' | 'PI' | 'YE' | 'GR' | 'MC' | 'RD';
/*
XS,XSmall
S,Small
M,Medium
L,Large
X,XLarge
XL,XXLarge
 */
export type OfferProductSizes = 'XS' | 'S' | 'M' | 'L' | 'X' | 'XL';

export interface OfferPostRootProductType extends OfferProductClass {
	type: string;
	made_in: string | null;
	creator: boolean | null;
	onComplete: () => void;
}

export interface OfferPostRootServiceType extends OfferServiceClass {
	type: string;
	router: NextRouter;
	onComplete: () => void;
}

export interface OfferPutRootProductType extends Omit<OfferPostRootProductType, 'offer_type'> {
	pk: number;
}

export interface OfferPutRootServiceType extends Omit<OfferPostRootServiceType, 'offer_type'> {
	pk: number;
}

export interface OfferGetTagsType {
	type: string;
	nameTag: string;
}

export type OfferTagsType = Array<string> | [];

export type OfferGetTagsResponseType = ResponseDataInterface<OfferTagsType>;

type ProductDeliveryCity = {
	pk: number;
	name: string;
};

export type DeliveriesResponseType = {
	pk: number;
	delivery_city: Array<ProductDeliveryCity>;
	all_cities: boolean;
	delivery_price: number;
	delivery_days: number;
};

export interface OfferProductInterface
	extends Omit<
		OfferProductClass,
		| 'delivery_days_1'
		| 'delivery_days_2'
		| 'delivery_days_3'
		| 'delivery_city_1'
		| 'delivery_city_2'
		| 'delivery_city_3'
		| 'delivery_price_1'
		| 'delivery_price_2'
		| 'delivery_price_3'
		| 'title'
	> {
	pk: number;
	title: string;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	picture_4_thumb: string | null;
	deliveries: Array<DeliveriesResponseType>;
	pinned: boolean;
}

export interface OfferServiceInterface extends Omit<OfferServiceClass, 'title'> {
	pk: number;
	title: string;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	picture_4_thumb: string | null;
	pinned: boolean;
}

export type DetailsOfferProductType = {
	product_quantity: number;
	product_price_by: OfferProductPriceByType;
	product_longitude: string | null;
	product_latitude: string | null;
	product_address: string | null;
	product_colors: Array<OfferProductColors>;
	product_sizes: Array<OfferProductSizes>;
};

export type OfferServiceAvailabilityDaysArray = Array<{ pk: number; code_day: OfferServiceDaysType; name_day: string }>;

export type DetailsOfferServiceType = {
	service_availability_days: OfferServiceAvailabilityDaysArray | [];
	service_morning_hour_from: string;
	service_morning_hour_to: string;
	service_afternoon_hour_from: string;
	service_afternoon_hour_to: string;
	service_price_by: OfferServicePriceByType;
	service_zone_by: OfferZoneByType;
	service_longitude: number;
	service_latitude: number;
	service_address: string;
	service_km_radius: number | null;
};

export interface OfferGetRootProductInterface
	extends Omit<
		OfferProductClass,
		| 'delivery_days_1'
		| 'delivery_days_2'
		| 'delivery_days_3'
		| 'delivery_city_1'
		| 'delivery_city_2'
		| 'delivery_city_3'
		| 'delivery_price_1'
		| 'delivery_price_2'
		| 'delivery_price_3'
		| 'offer_categories'
		| 'for_whom'
		| 'pictures'
		// | 'tags'
	> {
	pk: number;
	user_pk: number;
	offer_categories: Array<OfferCategoriesType>;
	shop_name: string;
	picture_1: string | null;
	picture_2: string | null;
	picture_3: string | null;
	picture_4: string | null;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	picture_4_thumb: string | null;
	for_whom: Array<OfferForWhomType>;
	details_offer: DetailsOfferProductType;
	// tags: Array<string>;
	creator_label?: boolean | null;
	made_in_label?: {
		name: string;
		code: string;
	};
	// details_offer: T;
	pinned: boolean;
	deliveries: Array<DeliveriesFlatResponseType> | [];
	exists_in_cart?: boolean;
}

export type DeliveriesFlatResponseType = {
	delivery_city: Array<string>;
	all_cities: boolean;
	delivery_price: number;
	delivery_days: number;
};

export interface OfferGetRootServiceInterface
	extends Omit<OfferServiceClass,
		| 'offer_categories'
		| 'for_whom'
		| 'pictures'
		// | 'tags'
	> {
	pk: number;
	user_pk: number;
	offer_categories: Array<OfferCategoriesType>;
	shop_name: string;
	picture_1: string | null;
	picture_2: string | null;
	picture_3: string | null;
	picture_4: string | null;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	picture_4_thumb: string | null;
	for_whom: Array<OfferForWhomType>;
	details_offer: DetailsOfferServiceType;
	// tags: Array<string>;
	creator_label?: null;
	made_in_label?: {
		name: null;
		code: null;
	};
	pinned: boolean;
	exists_in_cart?: boolean;
}

export type OfferProductLocalisation = {
	longitude: number;
	latitude: number;
	localisation_name: string;
};

export interface OfferServiceLocalisation extends OfferProductLocalisation {
	zone_by: OfferZoneByType;
	km_radius: number | null;
}

export type OfferGetLastUsedLocalisationResponseType = ResponseDataInterface<
	OfferProductLocalisation | OfferServiceLocalisation
>;

export type OfferCustomDeliveries = {
	delivery_city_1: string;
	all_cities_1: boolean;
	delivery_price_1: string;
	delivery_days_1: string;
	delivery_city_2: string;
	all_cities_2: boolean;
	delivery_price_2: string;
	delivery_days_2: string;
	delivery_city_3: string;
	all_cities_3: boolean;
	delivery_price_3: string;
	delivery_days_3: string;
};

export type OfferGetLastThreeUsedDeliveriesResponseType = ResponseDataInterface<OfferCustomDeliveries>;

export type OfferGetVues = {
	pk: number;
	thumbnail: string;
	title: string;
	nbr_total_vue: number;
};

export type OfferGetVuesMonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface OfferGetVuesType extends PaginationResponseType<OfferGetVues> {
	total_vues: number;
	this_month: OfferGetVuesMonthType;
	pourcentage: string;
}

export type clickAndCollect = {
	longitude: number | null;
	latitude: number | null;
	address_name: string | null;
};

export type deliveries = {
	delivery_city_1: string | null;
	all_cities_1: boolean | null;
	delivery_price_1: string | null;
	delivery_days_1: string | null;
	delivery_city_2: string | null;
	all_cities_2: boolean | null;
	delivery_price_2: string | null;
	delivery_days_2: string | null;
	delivery_city_3: string | null;
	all_cities_3: boolean | null;
	delivery_price_3: string | null;
	delivery_days_3: string | null;
};

export interface UserLocalProductType {
	pk: number | null;
	categoriesList: Array<OfferCategoriesType>;
	title: string | null;
	description: string | null;
	pictures: ImageUploadingType;
	forWhom: string | null;
	colors: string | null;
	sizes: string | null;
	quantity: number | null;
	made_in: string | null;
	creator: boolean | null;
	prix: string | null;
	prix_par: 'U' | 'K' | 'L' | null;
	clickAndCollect: clickAndCollect;
	deliveries: deliveries;
}

export interface UserLocalServiceType {
	pk: number | null;
	categoriesList: Array<OfferCategoriesType>;
	title: string | null;
	description: string | null;
	pictures: ImageUploadingType;
	forWhom: string | null;
	service_availability_days: OfferServiceAvailabilityDaysArray | [];
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	service_zone_by: OfferZoneByType | null,
	service_longitude: number | null,
	service_latitude: number | null,
	service_address: string | null,
	service_km_radius: number | null,
	// tags: string | null;
	price: string | null;
	service_price_by: OfferServicePriceByType | null;
}

export type WSThumbnailType = {
	pk: number,
	picture: string,
}

//!- Offer State
export interface OfferStateInterface {
	selectedOffer: OfferGetRootProductInterface | OfferGetRootServiceInterface | null;
	selectedTags: OfferTagsType;
	lastUsedLocalisation: OfferProductLocalisation | OfferServiceLocalisation | Record<string, unknown>;
	userLocalProduct: UserLocalProductType; // kept for product
	userLocalService: UserLocalServiceType;
	offerApi: GlobalApiPromiseError;
	offer_thumbnail: null | WSThumbnailType;
}

export type OfferPostRootProductResponseType = ResponseDataInterface<OfferProductInterface>;
export type OfferPostRootServiceResponseType = ResponseDataInterface<OfferServiceInterface>;

export type OfferGetRootProductResponseType = ResponseDataInterface<OfferGetRootProductInterface>;
export type OfferGetRootServiceResponseType = ResponseDataInterface<OfferGetRootServiceInterface>;

export type OfferPutRootProductResponseType = OfferPostRootProductResponseType;
export type OfferPutRootServiceResponseType = OfferPostRootServiceResponseType;

export interface OfferSolderInterface {
	offer: number;
	solder_type: OfferSolderByType;
	solder_value: number;
}

export type OfferPostSolderResponseType = ResponseDataInterface<OfferSolderInterface>;

export type OfferGetMyOffersProductServiceType = {
	pk: number;
	thumbnail: string;
	title: string;
	price: number;
	solder_type: OfferSolderByType | null;
	solder_value: number | null;
	pinned: boolean;
	offer_type: OfferOfferTypeType;
	creator_label: boolean;
};

export type OfferGetMyOffersProductInterface = OfferGetMyOffersProductServiceType;

export type OfferGetMyOffersServiceInterface = OfferGetMyOffersProductServiceType;

export type OfferGetMyOffersResponseType = ResponseDataInterface<
	PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>
>;


export interface OfferPostSolderType extends Omit<OfferSolderInterface, 'offer'> {
	type: string;
	offer_pk: number;
}

export type OfferGetVuesResponseType = ResponseDataInterface<OfferGetVuesType>;

export type OfferPinType = {
	offer_pk: number;
	pinned: boolean;
};

export type OfferPostPinResponseType = ResponseDataInterface<OfferPinType>;

export type OfferGetAvailableShopFiltersType = {
	available_categories: Array<OfferCategoriesType>;
	available_colors: Array<OfferProductColors>;
	available_sizes: Array<OfferProductSizes>;
	available_for_whom: Array<OfferForWhomType>;
	available_solder: boolean;
	available_labels: boolean;
	available_made_in_maroc: boolean;
	available_cities: Array<string>;
	available_services: boolean;
};

export type OfferGetShopAvailableFiltersResponseType = ResponseDataInterface<OfferGetAvailableShopFiltersType>;

// local offer types
export type LocalOfferProductDescriptionPageType = {
	type: string;
	title: string;
	pictures: ImageUploadingType;
	description: string;
	for_whom: string | null;
	product_colors: string | null;
	product_sizes: string | null;
	product_quantity: number | null;
	made_in: string | null;
	creator: boolean | null;
	// tags: string | null;
	router: NextRouter;
};

export type LocalOfferServiceDescriptionPageType = {
	title: string | null,
	pictures: ImageUploadingType,
	description: string | null,
	for_whom: string | null,
	service_availability_days: OfferServiceAvailabilityDaysArray,
	service_morning_hour_from: string | null,
	service_morning_hour_to: string | null,
	service_afternoon_hour_from: string | null,
	service_afternoon_hour_to: string | null,
	// tags: string | null,
};

export type OfferGetServicesDaysResponseType = ResponseDataInterface<OfferServiceAvailabilityDaysArray>;

export type GetOffersSagaCallBackOnCompleteDataType = {
	error: ApiErrorResponseType;
	cancelled: boolean;
	data: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
};

export interface setOfferProductToEditPayloadType extends UserLocalProductType {
	type: string;
}

export interface setOfferServiceToEditPayloadType extends UserLocalServiceType {
	type: string;
}
