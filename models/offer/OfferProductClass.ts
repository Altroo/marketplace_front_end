import {
	OfferCategoriesArray,
	OfferForWhomArray,
	OfferOfferTypeType,
	OfferProductColorsArray,
	OfferProductPriceByType,
	OfferProductSizesArray, OfferServiceAvailabilityDaysArray,
	OfferServicePriceByType, OfferSolderByType, OfferTagsType,
	OfferZoneByType,
} from '../../types/offer/offerTypes';

export class Offers {
	constructor(
		public offer_type: OfferOfferTypeType,
		public offer_categories: string | OfferCategoriesArray,
		public title: string,
		public picture_1: File | string,
		public picture_2: File | string | null,
		public picture_3: File | string | null,
		public picture_4: File | string | null,
		public description: string,
		public for_whom: string | OfferForWhomArray,
		public tags: string | OfferTagsType,
		public price: number,
		public solder_type?: OfferSolderByType | null,
		public solder_value?: number | null,
		public creator_label?: boolean | null,
		public made_in_label?: string | null,
	) {}
}

export class OfferProductClass extends Offers {
	constructor(
		// inherited
		offer_type: OfferOfferTypeType,
		offer_categories: string | OfferCategoriesArray,
		title: string,
		picture_1: File | string,
		picture_2: File | string | null,
		picture_3: File | string | null,
		picture_4: File | string | null,
		description: string,
		for_whom: string | OfferForWhomArray,
		tags: string | OfferTagsType,
		price: number,
		// Product
		public product_colors: string | OfferProductColorsArray,
		public product_sizes: string | OfferProductSizesArray,
		public product_quantity: number | null,
		public product_price_by: OfferProductPriceByType,
		public product_longitude: number | null,
		public product_latitude: number | null,
		public product_address: string | null,
		// Deliveries
		public delivery_city_1: string | null,
		public delivery_price_1: number | null,
		public delivery_days_1: number | null,
		public delivery_city_2: string | null,
		public delivery_price_2: number | null,
		public delivery_days_2: number | null,
		public delivery_city_3: string | null,
		public delivery_price_3: number | null,
		public delivery_days_3: number | null,
		solder_type?: OfferSolderByType | null,
		solder_value?: number | null,
		creator_label?: boolean | null,
		made_in_label?: string | null,
	) {
		super(
			offer_type,
			offer_categories,
			title,
			picture_1,
			picture_2,
			picture_3,
			picture_4,
			description,
			for_whom,
			tags,
			price,
			solder_type,
			solder_value,
			creator_label,
			made_in_label,
		);
	}
}

export class OfferServiceClass extends Offers {
	constructor(
		// inherited
		offer_type: OfferOfferTypeType,
		offer_categories: string | OfferCategoriesArray,
		title: string,
		picture_1: File | string,
		picture_2: File | string | null,
		picture_3: File | string | null,
		picture_4: File | string | null,
		description: string,
		for_whom: string | OfferForWhomArray,
		tags: string | OfferTagsType,
		price: number,
		public service_availability_days: string | OfferServiceAvailabilityDaysArray,
		public service_morning_hour_from: string,
		public service_morning_hour_to: string,
		public service_afternoon_hour_from: string,
		public service_afternoon_hour_to: string,
		public service_zone_by: OfferZoneByType,
		public service_price_by: OfferServicePriceByType,
		public service_longitude: number,
		public service_latitude: number,
		public service_address: string,
		public service_km_radius: number | null,
		solder_type?: OfferSolderByType | null,
		solder_value?: number | null,
		creator_label?: boolean | null,
		made_in_label?: string | null,
	) {
		super(
			offer_type,
			offer_categories,
			title,
			picture_1,
			picture_2,
			picture_3,
			picture_4,
			description,
			for_whom,
			tags,
			price,
			solder_type,
			solder_value,
			creator_label,
			made_in_label,
		);
	}
}
