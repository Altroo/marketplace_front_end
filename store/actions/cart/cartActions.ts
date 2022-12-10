import * as types from '../index';

export const cartPostProductRootUniqueIDAction = (
	offer_pk: number,
	unique_id: string,
	picked_color: string,
	picked_size: string,
	picked_quantity: number,
) => {
	return {
		type: types.CART_POST_PRODUCT_ROOT,
		offer_pk,
		unique_id,
		picked_color,
		picked_size,
		picked_quantity,
	};
};

export const cartPostServiceRootUniqueIDAction = (
	offer_pk: number,
	unique_id: string,
	picked_date: string,
	picked_hour: string,
) => {
	return {
		type: types.CART_POST_SERVICE_ROOT,
		offer_pk,
		unique_id,
		picked_date,
		picked_hour,
	};
};
