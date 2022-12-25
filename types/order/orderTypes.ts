import { PaginationResponseType, ResponseDataInterface } from '../_init/_initTypes';
import { OfferOfferTypeType, OfferZoneByType } from "../offer/offerTypes";
import { cartClickAndCollect, CartPostProductRoot, CartPostServiceRoot } from "../cart/cartTypes";

// !- Order state
export interface OrderStateInterface {
	orders_count: number;
}

export type OrderGetChiffreAffaire = {
	pk: number;
	order_number: string;
	order_date: Date;
	articles_count: number;
	total_price: number;
};


export type OrderGetChiffreAffaireResponseType = ResponseDataInterface<PaginationResponseType<OrderGetChiffreAffaire>>;

export type OrderGetOrdersCountType = {
	orders_count: number;
}

export type OrderGetOrdersCountResponseType = ResponseDataInterface<OrderGetOrdersCountType>;

/*
	('IP', 'In Progress'),
  ('CM', 'Completed'),
  ('CA', 'Canceled'),
 */
export type OrderStatusType = 'IP' | 'CM' | 'CA';

export type OrdersSmallListBoxType = {
	pk: number;
	first_name: string;
	last_name: string;
	avatar: string;
	order_number: string;
	order_status: OrderStatusType;
	order_date: Date;
	total_price: number;
	articles_count: string;
};

export interface OrderPostServiceRootWithCoordinates extends Omit<CartPostServiceRoot, 'pk' | 'unique_id'> {
	service_zone_by: OfferZoneByType;
	service_longitude: number;
	service_latitude: number;
	service_address: string;
}

export type OrderDeliveryDataType = {
	delivery_price: number,
  address: string;
  city: string,
  zip_code: number,
  country: string,
  phone: string,
  email: string
}

export type OrderDetailsListType = {
	offer_type: OfferOfferTypeType;
	offer_title: string;
	offer_thumbnail: string;
	offer_price: number;
	offer_total_price: number;
	offer_details: Omit<CartPostProductRoot, 'pk' | 'unique_id'> | OrderPostServiceRootWithCoordinates;
	picked_click_and_collect: boolean;
	click_and_collect: cartClickAndCollect | null;
	picked_delivery: boolean;
	delivery: OrderDeliveryDataType | null;
}
export interface OrdersGetOrdersListType extends Omit<OrdersSmallListBoxType, 'articles_count'> {
	articles_count: number;
	order_details: Array<OrderDetailsListType>;
	note: string | null;
	highest_delivery_price: number | null;
}

export type OrdersGetOrdersListResponseType = ResponseDataInterface<PaginationResponseType<OrdersGetOrdersListType>>;

export type OrdersGetDetailsResponseType = ResponseDataInterface<OrdersGetOrdersListType>;