import { ResponseDataInterface } from "../_init/_initTypes";

type CartBaseType = {
	pk: number,
	unique_id: string,
}

export interface CartPostProductRoot extends CartBaseType {
	picked_color: string,
	picked_size: string,
	picked_quantity: number,
}

export interface CartPostServiceRoot extends CartBaseType {
	picked_date: string,
	picked_hour: string,
}

export interface CartPostProductRootSagaPayload extends Omit<CartPostProductRoot, 'pk'> {
	offer_pk: number;
	type: string;
}

export interface CartPostServiceRootSagaPayload extends Omit<CartPostServiceRoot, 'pk'> {
	offer_pk: number;
	type: string;
}

export type CartPostProductRootResponseType = ResponseDataInterface<CartPostProductRoot>;
export type CartPostServiceRootResponseType = ResponseDataInterface<CartPostServiceRoot>;