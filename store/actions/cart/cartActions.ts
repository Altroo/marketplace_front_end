import * as types from '../index';
import { OfferOfferTypeType } from "../../../types/offer/offerTypes";
import {
	cartOrderCoordonneeDataType,
	cartOrderDeliveriesDataType,
	cartPostOrderActionType,
	userLocalCartOrderType
} from "../../../types/cart/cartTypes";

export const cartPostProductRootUniqueIDAction = (
	offer_pk: number,
	offer_type: OfferOfferTypeType,
	unique_id: string | null,
	picked_color: string | null,
	picked_size: string | null,
	picked_quantity: number,
) => {
	return {
		type: types.CART_POST_PRODUCT_ROOT,
		offer_pk,
		offer_type,
		unique_id,
		picked_color,
		picked_size,
		picked_quantity,
	};
};

export const cartPostServiceRootUniqueIDAction = (
	offer_pk: number,
	offer_type: OfferOfferTypeType,
	unique_id: string | null,
	picked_date: string,
	picked_hour: string,
) => {
	return {
		type: types.CART_POST_SERVICE_ROOT,
		offer_pk,
		offer_type,
		unique_id,
		picked_date,
		picked_hour,
	};
};

export const cartGetCartCounterAction = (unique_id: string | null) => {
	return {
		type: types.CART_GET_CART_COUNTER,
		unique_id,
	};
};

export const cartPatchCartQuantityAction = (cart_pk: number, unique_id: string | null, action_type: '+' | '-') => {
	return {
		type: types.CART_PATCH_CART_QUANTITY,
		cart_pk,
		unique_id,
		action_type
	};
};

export const cartDeleteAction = (cart_pk: number, unique_id: string | null) => {
	return {
		type: types.CART_DELETE_ROOT,
		cart_pk,
		unique_id
	};
};

export const cartSetLocalCartOrderAction = (cartData: userLocalCartOrderType) => {
	return {
		type: types.CART_SET_LOCAL_CART_ORDER,
		...cartData
	};
};

export const cartSetLocalCartOrderDeliveriesDataAction = (cartData: cartOrderDeliveriesDataType) => {
	return {
		type: types.CART_SET_LOCAL_CART_ORDER_DELIVERIES_DATA,
		...cartData
	};
};

export const cartSetLocalCartOrderCoordonneeDataAction = (cartData: cartOrderCoordonneeDataType) => {
	return {
		type: types.CART_SET_LOCAL_CART_ORDER_COORDONNEE_DATA,
		...cartData
	};
};




export const cartPostOrderAction = (orderData: cartPostOrderActionType) => {
	return {
		type: types.CART_POST_ORDER,
		...orderData
	};
};

export const initCartOrderAction = () => {
	return {
		type: types.CART_INIT_CART_ORDER,
	};
};
