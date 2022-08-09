import {
	MultiCartClass,
	MultiCartDetailsClass,
	SingleCartClass,
	SingleCartDetailsClass,
} from '../../models/cart/CartClass';
import { ResponseDataInterface } from '../_init/_initTypes';

export type cartOrderStatus = 'Success' | 'Fail';

//!- Cart State
export interface CartStateInterface {
	cartOffers: CartTopPaginationResponseType<SingleCartClass | MultiCartClass>;
	selectedCoordinates: CartGetCoordinates | Record<string, unknown>;
	selectedCartDetails: CartTopPaginationResponseType<SingleCartDetailsClass | MultiCartDetailsClass>;
	orderStatus: cartOrderStatus | null;
}

export type ClickAndCollect = {
	product_longitude: number;
	product_latitude: number;
	product_address: string;
};

export type OfferProductDetails = {
	offer_max_quantity: number;
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: string | null;
};

export type OfferServiceDetails = {
	picked_date: string | null;
	picked_hour: string | null;
};

export type CartDetails = {
	cart_pk: number;
	offer_pk: number;
	offer_picture: string;
	offer_title: string;
	offer_price: number;
	offer_details: OfferProductDetails | OfferServiceDetails;
};

export interface CartTopPaginationResponseType<T> {
	shops_count: number | null;
	total_offers_count: string | null;
	total_price: number | null;
	results: Array<T>;
}

export type CartGetAllResponseType = ResponseDataInterface<
	CartTopPaginationResponseType<SingleCartClass | MultiCartClass>
>;

export type CartGetCoordinates = {
	first_name: string;
	last_name: string;
	phone: string | null;
	email: string;
};

export type CartGetCoordinatesResponseType = ResponseDataInterface<CartGetCoordinates>;

// TODO to verify backend output
export type CartDetailsLot = {
	Lot: SingleCartDetailsClass | MultiCartDetailsClass
}

export interface CartDetailsTopPaginationResponseType {
	shops_count: number | null;
	total_offers_count: string | null;
	total_price: number | null;
	results: Array<CartDetailsLot>;
}

export type CartGetDetailsResponseType = ResponseDataInterface<CartDetailsTopPaginationResponseType>;

export type CartDeleteRoot = {
	offer_pk: number,
}
export type CartDeleteRootResponseType = ResponseDataInterface<CartDeleteRoot>;
