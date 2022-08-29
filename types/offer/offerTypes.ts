import { OfferProductClass, OfferServiceClass } from '../../models/offer/OfferProductClass';
import { Nullable, ResponseDataInterface, PaginationResponseType } from '../_init/_initTypes';

// ('V', 'Produit'), ('S', 'Service'), ('L', 'Location') <- 'L' Not yet available,
export type OfferOfferTypeType = 'V' | 'S' | 'L';
// ('A','All'), ('K','Kid'), ('F','Female'), ('M','Man')
export type OfferForWhomType = 'A' | 'K' | 'F' | 'M';
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
MC,MultiColor
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
}

export interface OfferPostRootServiceType extends OfferServiceClass {
	type: string;
}

export interface OfferPutRootProductType extends Omit<OfferPostRootProductType, 'offer_type'> {
	pk: number;
}

export interface OfferPutRootServiceType extends Omit<OfferPostRootServiceType, 'offer_type'> {
	pk: number;
}

export interface OfferPkRootType {
	type: string;
	pk: number;
}

export interface OfferGetTagsType {
	type: string;
	nameTag: string;
}

// type OfferTags = {
// 	pk: number;
// 	name_tag: string;
// };

export type OfferTagsType = Array<string> | [];

export type OfferGetTagsResponseType = ResponseDataInterface<OfferTagsType>;

type ProductDeliveryCity = {
	pk: number;
	name: string;
};

export type DeliveriesResponseType = {
	pk: number;
	delivery_city: Array<ProductDeliveryCity>;
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
	> {
	pk: number;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	// picture_4_thumb: string | null;
	deliveries: Array<DeliveriesResponseType>;
}

export interface OfferServiceInterface extends OfferServiceClass {
	pk: number;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
}

export type OfferProductColorsArray = Array<{ pk: number; code_color: OfferProductColors; name_color: string }>;
export type OfferProductSizesArray = Array<{ pk: number; code_size: OfferProductSizes; name_size: string }>;

export type DetailsOfferProductType = {
	product_quantity: number | null;
	product_price_by: OfferProductPriceByType;
	product_longitude: number | null;
	product_latitude: number | null;
	product_address: string | null;
	product_colors: string | OfferProductColorsArray | [];
	product_sizes: string | OfferProductSizesArray | [];
};

export type OfferServiceAvailabilityDaysArray = Array<{ pk: number; code_day: OfferServiceDaysType; name_day: string }>;
type DetailsOfferServiceType = {
	service_availability_days: string | OfferServiceAvailabilityDaysArray | [];
	service_morning_hour_from: string;
	service_morning_hour_to: string;
	service_afternoon_hour_from: string;
	service_afternoon_hour_to: string;
	service_zone_by: OfferZoneByType;
	service_price_by: OfferServicePriceByType;
	service_longitude: number;
	service_latitude: number;
	service_address: string;
	service_km_radius: number | null;
};

export type OfferCategoriesArray = Array<{ pk: number; code_category: OfferCategoriesType; name_category: string }>;
export type OfferForWhomArray = Array<{ pk: number; code_for_whom: OfferForWhomType; name_for_whom: string }>;

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
	> {
	pk: number;
	offer_categories: OfferCategoriesArray;
	shop_name: string;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	for_whom: OfferForWhomArray;
	creator_label?: boolean | null;
	made_in_label?: string | null;
	// picture_4_thumb: string | null;
	details_offer: DetailsOfferProductType;
	// details_offer: T;
	deliveries?: Array<DeliveriesResponseType> | [];
	exists_in_cart?: boolean;
}

export interface OfferGetRootServiceInterface extends Omit<OfferServiceClass, 'offer_categories' | 'for_whom'> {
	pk: number;
	offer_categories: OfferCategoriesArray;
	shop_name: string;
	picture_1_thumb: string | null;
	picture_2_thumb: string | null;
	picture_3_thumb: string | null;
	for_whom: OfferForWhomArray;
	creator_label?: boolean | null;
	made_in_label?: string | null;
	// picture_4_thumb: string | null;
	details_offer: DetailsOfferServiceType;
	exists_in_cart: boolean;
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

export type OfferDeliveries = {
	deliveries: Array<DeliveriesResponseType>;
};

export type OfferGetLastThreeUsedDeliveriesResponseType = ResponseDataInterface<OfferDeliveries>;

export type OfferGetVues = {
	pk: number;
	thumbnail: string;
	title: string;
	nbr_total_vue: number;
};

export type OfferGetVuesMonthType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface OfferGetVuesType extends PaginationResponseType<OfferGetVues> {
	total_vues: number | null;
	this_month: OfferGetVuesMonthType | null;
	pourcentage: string | null;
}
export interface UserLocalOfferType {
	categoriesList: Array<OfferCategoriesType>;
	title: string | null,
	description: string | null,
	images: Array<string>,
	forWhom: string | null,
	colors: string | null,
	sizes: Array<string>,
	quantity: number | null,
	tags: string | null,
}
//!- Offer State
export interface OfferStateInterface {
	userOffers: Array<OfferProductInterface | OfferServiceInterface>;
	userOffersList: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
	offerVuesList: OfferGetVuesType;
	selectedOffer: OfferGetRootProductInterface | OfferGetRootServiceInterface | Record<string, unknown>;
	selectedSolder: Nullable<OfferSolderInterface> | Record<string, unknown>;
	selectedTags: OfferTagsType;
	lastUsedLocalisation: OfferProductLocalisation | OfferServiceLocalisation | Record<string, unknown>;
	lastUsedDeliveries: Array<DeliveriesResponseType> | Record<string, unknown>;
	userLocalOffer: UserLocalOfferType;
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

type OfferGetMyOffersProductServiceType = {
	pk: number;
	thumbnail: string;
	title: string;
	price: number;
	solder_type: OfferSolderByType | null;
	solder_value: number | null;
	creator_label: boolean;
};

export interface OfferGetMyOffersProductInterface extends OfferGetMyOffersProductServiceType {
	details_offer: DetailsOfferProductType;
}

export interface OfferGetMyOffersServiceInterface extends OfferGetMyOffersProductServiceType {
	details_offer: DetailsOfferServiceType;
}

export type OfferGetMyOffersResponseType = ResponseDataInterface<
	PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>
>;

export interface OfferPostSolderType extends Omit<OfferSolderInterface, 'offer'> {
	type: string;
	offer_pk: number;
}

export type OfferGetVuesResponseType = ResponseDataInterface<OfferGetVuesType>;
