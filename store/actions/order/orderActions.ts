import * as types from '../index';

export const orderGetMyBuyingsAction = () => {
	return {
		type: types.ORDER_GET_BUYINGS,
	};
};

export const orderGetMySellingsAction = () => {
	return {
		type: types.ORDER_GET_SELLINGS,
	};
};
