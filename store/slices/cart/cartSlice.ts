import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	CartCounterType,
	CartGetDetailsType, cartOrderCoordonneeDataType, cartOrderDeliveriesDataSagaType, cartOrderDeliveriesDataType,
	CartStateInterface,
	getAllMultiCartType,
	getAllSingleCartType,
	userLocalCartOrderType
} from "../../../types/cart/cartTypes";

const initialState: CartStateInterface = {
	userCart: null,
	selectedCart: null,
	cartUniqueID: null,
	cartCounter: null,
	userLocalCartOrder: null,
	userLocalCartOrderCoordoneeData: null,
	userLocalCartOrderDeliveriesData: null,
};

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState: initialState,
	reducers: {
		setUserCart: (state, action: PayloadAction<getAllSingleCartType | getAllMultiCartType>) => {
			state.userCart = action.payload;
		},
		setSelectedCart: (state, action: PayloadAction<CartGetDetailsType>) => {
			state.selectedCart = action.payload;
		},
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

	},
});

export const { setUserCart, setSelectedCart, setCartUniqueID, setUserCartCounter, setUserLocalCartOrder, setUserLocalCartOrderCoordonneeData, setUserLocalCartOrderDeliveriesData } = cartSlice.actions;

export default cartSlice.reducer;
