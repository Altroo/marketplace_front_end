import { ResponseDataInterface } from '../_init/_initTypes';
import { OfferOfferTypeType } from '../offer/offerTypes';

export type userLocalCartOrderType = {
	shop_pk: number;
	delivery_pk: number | null;
	picked_click_and_collect: string;
	picked_deliveries: string;
	whichFormik: cartDetailsFormikType;
	totalPrice: number;
	showGratuitDeliveryOne: boolean;
	deliveriesTotalPriceOne: number;
	showGratuitDeliveryTwo: boolean;
	deliveriesTotalPriceTwo: number;
};

export type cartOrderDeliveriesDataType = {
	first_name: string;
	last_name: string;
	address: string;
	city: string;
	zip_code: string;
	country: string;
	phone: string;
	email: string;
	note: string;
	delivery_pk: number | null;
	shop_pk: number;
	picked_click_and_collect: string;
	picked_delivery: string;
	url: string;
};

export type cartOrderCoordonneeDataType = {
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
	note: string;
	delivery_pk: number | null;
	shop_pk: number;
	picked_click_and_collect: string;
	picked_delivery: string;
	url: string;
}

export interface cartOrderCoordonneeDataSagaType extends cartOrderCoordonneeDataType {
	type: string;
}

export interface cartOrderDeliveriesDataSagaType extends cartOrderDeliveriesDataType {
	type: string;
}

//!- Cart State
export interface CartStateInterface {
	userCart: getAllSingleCartType | getAllMultiCartType | null;
	selectedCart: CartGetDetailsType | null;
	cartUniqueID: string | null;
	cartCounter: number | null;
	userLocalCartOrder: userLocalCartOrderType | null;
	userLocalCartOrderCoordoneeData: cartOrderCoordonneeDataType | null;
	userLocalCartOrderDeliveriesData: cartOrderDeliveriesDataType | null;
}

type CartBaseType = {
	pk: number;
	unique_id: string;
};

export interface CartPostProductRoot extends CartBaseType {
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: number;
}

export interface CartPostServiceRoot extends CartBaseType {
	picked_date: Date | null;
	picked_hour: string | null;
}

export interface CartPostProductRootSagaPayload extends Omit<CartPostProductRoot, 'pk'> {
	offer_pk: number;
	offer_type: OfferOfferTypeType;
	type: string;
}

export interface CartPostServiceRootSagaPayload extends Omit<CartPostServiceRoot, 'pk'> {
	offer_pk: number;
	type: string;
}

export type CartPostProductRootResponseType = ResponseDataInterface<CartPostProductRoot>;
export type CartPostServiceRootResponseType = ResponseDataInterface<CartPostServiceRoot>;

export type cart_type = 'MULTI_SHOP' | 'SINGLE_SHOP';

type getAllCartRootPaginationType = {
	cart_type: cart_type;
	shops_count: number;
	total_offers_count: number;
	total_price: number;
};

export type cartClickAndCollect = {
	product_longitude: number | null;
	product_latitude: number | null;
	product_address: string | null;
};

export type cartDeliveries = {
	pk: number;
	delivery_city: Array<{ pk: number; name: string }>;
	delivery_price: number;
	delivery_days: number;
};

export type cartPaginationDetailsForProduct = {
	offer_max_quantity: number | null;
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: number;
};

export type cartPaginationDetailsForService = {
	picked_date: Date | null;
	picked_hour: string | null;
};

type cartPaginationDetails = {
	cart_pk: number;
	offer_pk: number;
	shop_link: string;
	shop_name: string;
	offer_picture: string;
	offer_title: string;
	offer_type: OfferOfferTypeType;
	offer_total_price: number;
	offer_price: number;
	offer_details: cartPaginationDetailsForProduct | cartPaginationDetailsForService;
};

export type getAllSingleAndMultiCartPaginationResult = {
	shop_pk: number;
	shop_picture: string;
	desktop_shop_name: string;
	mobile_shop_name: string;
	shop_link: string;
	offer_total_price: number;
	offer_price: number;
	click_and_collect?: cartClickAndCollect;
	deliveries?: Array<cartDeliveries>; // check
	cart_details: Array<cartPaginationDetails>;
};

export interface getAllSingleCartType extends getAllCartRootPaginationType {
	cart_type: 'SINGLE_SHOP';
	results: Array<getAllSingleAndMultiCartPaginationResult>;
}

export interface getAllMultiCartPaginationResult extends getAllSingleAndMultiCartPaginationResult {
	offers_count: number;
}

export interface getAllMultiCartType extends getAllCartRootPaginationType {
	cart_type: 'MULTI_SHOP';
	results: Array<getAllMultiCartPaginationResult>;
}

export type CartGetAllResponseType = ResponseDataInterface<getAllSingleCartType | getAllMultiCartType>;

type CartGetDetailsResultsType = {
	lot: {
		global_offer_type: OfferOfferTypeType;
		cart_details: Array<cartPaginationDetails>;
		click_and_collect?: cartClickAndCollect;
		deliveries?: Array<cartDeliveries>;
	};
};

export type cartDetailsFormikType = 'V' | 'S';

export type CartGetDetailsType = {
	formik: cartDetailsFormikType;
	offers_count: number;
	total_price: number;
	results: Array<CartGetDetailsResultsType>;
};

export type CartGetDetailsResponseType = ResponseDataInterface<CartGetDetailsType>;

export type CartCounterType = {
	cart_counter: number;
};

export type CartCounterTypeResponseType = ResponseDataInterface<CartCounterType>;

export type CartClickAndCollectDeliveriesStateType = {
	cart_pks: Array<number>;
	click_and_collects: boolean;
	deliveries: Array<boolean>;
};

export type cartPostOrderActionType = {
	url: string;
	shop_pk: number;
	first_name: string;
	last_name: string;
	note: string | null;
	address: string | null;
	city: string | null;
	zip_code: string | null;
	country: string | null;
	phone: string;
	email: string;
	picked_click_and_collect: string;
	picked_delivery: string;
	delivery_pk: number | null;
};
