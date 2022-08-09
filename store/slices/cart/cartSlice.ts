import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	CartDetailsTopPaginationResponseType,
	CartGetCoordinates,
	cartOrderStatus,
	CartStateInterface,
	CartTopPaginationResponseType,
} from '../../../types/cart/cartTypes';
import {
	MultiCartClass,
	MultiCartDetailsClass,
	SingleCartClass,
	SingleCartDetailsClass,
} from '../../../models/cart/CartClass';

const initialState: CartStateInterface = {
	cartOffers: {
		shops_count: null,
		total_offers_count: null,
		total_price: null,
		results: [],
	},
	selectedCoordinates: {},
	selectedCartDetails: {
		shops_count: null,
		total_offers_count: null,
		total_price: null,
		results: [],
	},
	orderStatus: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		setCartGetAll: (
			state,
			action: PayloadAction<CartTopPaginationResponseType<SingleCartClass | MultiCartClass>>,
		) => {
			state.cartOffers = action.payload;
			return state;
		},
		setCoordinates: (state, action: PayloadAction<CartGetCoordinates>) => {
			state.selectedCoordinates = action.payload;
			return state;
		},
		setCartSelectedDetails: (
			state,
			action: PayloadAction<CartTopPaginationResponseType<SingleCartDetailsClass | MultiCartDetailsClass>>,
		) => {
			state.selectedCartDetails = action.payload;
			return state;
		},
		setCartOrderStatus: (state, action: PayloadAction<cartOrderStatus>) => {
			state.orderStatus = action.payload;
			return state;
		},
		initCart: () => {
			return initialState;
		},
	},
});

export const { setCartGetAll, setCoordinates, setCartSelectedDetails, setCartOrderStatus, initCart } =
	cartSlice.actions;

export default cartSlice.reducer;
