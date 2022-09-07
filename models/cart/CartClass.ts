import { DeliveriesResponseType } from '../../types/offer/offerTypes';
import { CartDetails, ClickAndCollect } from '../../types/cart/cartTypes';

class GlobalCartClass {
	constructor(
		public offers_count: number,
		public offers_total_price: number,
        public shop_pk: number | undefined,
        public shop_picture: string | undefined,
        public shop_name: string | undefined,
	) {}
}

export class SingleCartClass extends GlobalCartClass{
	constructor(
		offers_count: number,
		offers_total_price: number,
        shop_pk: number | undefined,
		shop_picture: string | undefined,
        shop_name: string | undefined,
		public cart_details: CartDetails,
		public click_and_collect: ClickAndCollect | null,
		public deliveries: Array<DeliveriesResponseType> | null,
	) {
		super(offers_count, offers_total_price, shop_pk, shop_picture, shop_name)
	}
}

export class SingleCartDetailsClass extends SingleCartClass{
	constructor(
		offers_count: number,
		offers_total_price: number,
		shop_pk: number,
		shop_picture: string,
		shop_name: string,
		cart_details: CartDetails,
		click_and_collect: ClickAndCollect | null,
		deliveries: Array<DeliveriesResponseType> | null,
	) {
		super(offers_count, offers_total_price,
			shop_pk, shop_picture, shop_name, cart_details, click_and_collect, deliveries)
	}
}

export class MultiCartClass extends GlobalCartClass{
	constructor(
		offers_count: number,
		offers_total_price: number,
		shop_pk: number | undefined,
		shop_picture: string | undefined,
		shop_name: string | undefined,
		public cart_details: Array<CartDetails>,
	){
		super(offers_count, offers_total_price, shop_pk, shop_picture, shop_name)
	}
}

export class MultiCartDetailsClass extends MultiCartClass{
	constructor(
		offers_count: number,
		offers_total_price: number,
		shop_pk: number,
		shop_picture: string,
        shop_name: string,
		cart_details: Array<CartDetails>,
	) {
		super(offers_count, offers_total_price, shop_pk, shop_picture, shop_name, cart_details)
	}
}
