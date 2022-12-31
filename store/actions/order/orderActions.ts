import * as Types from "../index";

export const orderGetChiffreAffaireAction = (url: string) => {
	return {
		type: Types.ORDER_GET_CHIFFRE_AFFAIRE,
		url,
	};
};

export const orderGetOrdersCountAction = () => {
	return {
		type: Types.ORDER_GET_ORDERS_COUNT,
	};
};

export const orderGetOrdersListAction = (url: string) => {
	return {
		type: Types.ORDER_GET_ORDERS_LIST,
		url,
	};
};

export const orderPostAcceptOrderAction = (order_pk: number) => {
	return {
		type: Types.ORDER_POST_ACCEPT_ORDER,
		order_pk,
	};
};

export const orderPostCancelOrderAction = (order_pk: number) => {
	return {
		type: Types.ORDER_POST_CANCEL_ORDER,
		order_pk,
	};
};