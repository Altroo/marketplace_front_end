import {
	OfferOfferTypeType,
	OfferProductPriceByType,
	OfferServiceAvailabilityDaysArray,
	OfferServicePriceByType, OfferSolderByType,
	OfferZoneByType,
} from '../../types/offer/offerTypes';
import { ImageListType, ImageListType as ImageUploadingType } from "react-images-uploading/dist/typings";

export class Offers {
	constructor(
		public offer_type: OfferOfferTypeType,
		public offer_categories: string,
		public title: string | null,
		public pictures: ImageListType,
		public thumbnails: Array<string>,
		public description: string | null,
		public for_whom: string | null,
		// public tags: string | number | null,
		public price: string | number | null,
		public solder_type?: OfferSolderByType | null | undefined,
		public solder_value?: number | null | undefined,
		public creator_label?: boolean | null | undefined,
		public made_in_label?: {
			name: string | null;
			code: string | null;
		} | null | undefined,
	) {}
}

export class OfferProductClass extends Offers {
	constructor(
		// inherited
		offer_type: OfferOfferTypeType,
		offer_categories: string,
		title: string | null,
		pictures: ImageUploadingType,
		thumbnails: Array<string>,
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
		// tags: string | null,
		solder_type?: OfferSolderByType | null,
		solder_value?: number | null,
		creator_label?: boolean | null,
		made_in_label?: {
			name: string;
			code: string;
		} | null | undefined,
	) {
		super(
			offer_type,
			offer_categories,
			title,
			pictures,
			thumbnails,
			description,
			for_whom,
			price,
			// tags,
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
		pictures: ImageUploadingType,
		thumbnails: Array<string>,
		description: string | null,
		for_whom: string | null,
		// tags: string | null,
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
		made_in_label?: {
			name: null;
			code: null;
		} | null | undefined,
	) {
		super(
			offer_type,
			offer_categories,
			title,
			pictures,
			thumbnails,
			description,
			for_whom,
			// tags,
			price,
			solder_type,
			solder_value,
			creator_label,
			made_in_label,
		);
	}
}
