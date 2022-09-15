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
import { ImageListType, ImageListType as ImageUploadingType } from "react-images-uploading/dist/typings";

export class Offers {
	constructor(
		public offer_type: OfferOfferTypeType,
		public offer_categories: string,
		public title: string | null,
		// public picture_1: File | string,
		// public picture_2: File | string | null,
		// public picture_3: File | string | null,
		// public picture_4: File | string | null,
		public pictures: ImageListType,
		public description: string | null,
		public for_whom: string | null,
		public tags: string | number | null,
		public price: string | number | null,
		public solder_type?: OfferSolderByType | null | undefined,
		public solder_value?: number | null | undefined,
		public creator_label?: boolean | null | undefined,
		public made_in_label?: string | null | undefined,
	) {}
}

export class OfferProductClass extends Offers {
	constructor(
		// inherited
		offer_type: OfferOfferTypeType,
		offer_categories: string,
		title: string | null,
		// picture_1: File | string,
		// picture_2: File | string | null,
		// picture_3: File | string | null,
		// picture_4: File | string | null,
		pictures: ImageUploadingType,
		description: string | null,
		for_whom: string | null,
		// Product
		public product_colors: string | null,
		public product_sizes: string | null,
		public product_quantity: number | null,
		price: string | number | null,
		public product_price_by: OfferProductPriceByType | null,
		public product_address: string | null,
		public product_longitude: number | null,
		public product_latitude: number | null,
		// Deliveries
		public delivery_city_1: string | null,
		public all_cities_1: boolean | null,
		public delivery_price_1: string | null,
		public delivery_days_1: string | null,
		public delivery_city_2: string | null,
		public all_cities_2: boolean | null,
		public delivery_price_2: string | null,
		public delivery_days_2: string | null,
		public delivery_city_3: string | null,
		public all_cities_3: boolean | null,
		public delivery_price_3: string | null,
		public delivery_days_3: string | null,
		tags: string | null,
		solder_type?: OfferSolderByType | null,
		solder_value?: number | null,
		creator_label?: boolean | null,
		made_in_label?: string | null,
	) {
		super(
			offer_type,
			offer_categories,
			title,
			// picture_1,
			// picture_2,
			// picture_3,
			// picture_4,
			pictures,
			description,
			for_whom,
			price,
			tags,
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
		offer_categories: string,
		title: string | null,
		// picture_1: File | string,
		// picture_2: File | string | null,
		// picture_3: File | string | null,
		// picture_4: File | string | null,
		pictures: ImageUploadingType,
		description: string | null,
		for_whom: string | null,
		tags: string | null,
		price: string | number | null,
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
			pictures,
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
