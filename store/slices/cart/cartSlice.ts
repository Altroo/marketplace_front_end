import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	CartCounterType,
	cartOrderCoordonneeDataType,
	cartOrderDeliveriesDataType,
	CartStateInterface,
	userLocalCartOrderType,
} from '../../../types/cart/cartTypes';

const initialState: CartStateInterface = {
	cartUniqueID: null,
	cartCounter: null,
	userLocalCartOrder: null,
	userLocalCartOrderCoordoneeData: null,
	userLocalCartOrderDeliveriesData: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		setCartUniqueID: (state, action: PayloadAction<string>) => {
			state.cartUniqueID = action.payload;
		},
		setUserCartCounter: (state, action: PayloadAction<CartCounterType>) => {
			state.cartCounter = action.payload.cart_counter;
		},
		setUserLocalCartOrder: (state, action: PayloadAction<userLocalCartOrderType>) => {
			state.userLocalCartOrder = action.payload;
		},
		setUserLocalCartOrderCoordonneeData: (state, action: PayloadAction<cartOrderCoordonneeDataType>) => {
			state.userLocalCartOrderCoordoneeData = action.payload;
		},
		setUserLocalCartOrderDeliveriesData: (state, action: PayloadAction<cartOrderDeliveriesDataType>) => {
			state.userLocalCartOrderDeliveriesData = action.payload;
		},
		initUserLocalCartOrder: (state) => {
			state.userLocalCartOrder = null;
			state.userLocalCartOrderCoordoneeData = null;
			state.userLocalCartOrderDeliveriesData = null;
		}
	},
});

export const {
	setCartUniqueID,
	setUserCartCounter,
	setUserLocalCartOrder,
	setUserLocalCartOrderCoordonneeData,
	setUserLocalCartOrderDeliveriesData,
	initUserLocalCartOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
