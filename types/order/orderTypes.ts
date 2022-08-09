import { PaginationResponseType, ResponseDataInterface } from '../_init/_initTypes';

/*
('TC', 'To confirm'),
('OG', 'On-going'),
('SH', 'Shipped'),
('RD', 'Ready'),
('TE', 'To evaluate'),
('CM', 'Completed'),
('CB', 'Canceled by buyer'),
('CS', 'Canceled by seller'),
 */
export type OrderStatus = 'TC' | 'OG' | 'SH' | 'RD' | 'TE' | 'CM' | 'CB' | 'CS';


export type BuyingsSellingsList = {
	pk: number,
	avatar: string,
	initiator_name: string,
	offer_title: string,
	total_price: number,
	order_status: OrderStatus,
	order_date: string,
	viewed: boolean
}

//!- Order State
export interface OrderStateInterface {
	buyingsList: PaginationResponseType<BuyingsSellingsList>;
	sellingsList: PaginationResponseType<BuyingsSellingsList>;
}

export type OrderGetBuyingsSellingsResponseType = ResponseDataInterface<PaginationResponseType<BuyingsSellingsList>>;