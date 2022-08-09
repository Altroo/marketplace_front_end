import * as types from '../index';

// params are as object since not all required
export const cartPostOrderAction = ({
	shop_pk,
	user_address_pk,
	delivery_pk,
	picked_click_and_collect,
	picked_delivery,
	note,
}: {
	shop_pk: number;
	user_address_pk?: number;
	delivery_pk?: number;
	picked_click_and_collect?: string;
	picked_delivery?: string;
	note?: string;
}) => {
	return {
		type: types.CART_POST_ORDER,
		shop_pk,
		user_address_pk,
		delivery_pk,
		picked_click_and_collect,
		picked_delivery,
		note,
	};
};

export const cartGetAllAction = () => {
	return {
		type: types.CART_GET_ALL,
	};
};

// params are as object since not all required
export const cartPatchRootAction = ({
	cart_pk,
	picked_color,
	picked_size,
	picked_quantity,
	picked_date,
	picked_hour,
}: {
	cart_pk: number;
	picked_color?: string;
	picked_size?: string;
	picked_quantity?: string;
	picked_date?: string;
	picked_hour?: string;
}) => {
	return {
		type: types.CART_PATCH_ROOT,
		cart_pk,
		picked_color,
		picked_size,
		picked_quantity,
		picked_date,
		picked_hour,
	};
};

export const cartGetDetailsAction = (shop_pk: number) => {
	return {
		type: types.CART_GET_DETAILS,
		shop_pk,
	};
};

export const cartGetCoordinatesAction = () => {
	return {
		type: types.CART_GET_COORDINATES,
	};
};

export const cartDeleteAction = (cart_pk: number) => {
	return {
		type: types.CART_DELETE_ROOT,
		cart_pk,
	};
};

// params are as object since not all required
export const cartPostrootAction = ({
	offer_pk,
	picked_color,
	picked_size,
	picked_quantity,
	picked_date,
	picked_hour,
}: {
	offer_pk: number;
	picked_color?: string;
	picked_size?: string;
	picked_quantity?: string;
	picked_date?: string;
	picked_hour?: string;
}) => {
	return {
		type: types.CART_POST_ROOT,
		offer_pk,
		picked_color,
		picked_size,
		picked_quantity,
		picked_date,
		picked_hour,
	};
};
