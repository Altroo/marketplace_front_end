import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStateInterface } from "../../../types/order/orderTypes";

const initialState: OrderStateInterface = {
	orders_count: 0,
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		setLocalOrdersCount: (state, action: PayloadAction<number>) => {
			state.orders_count = action.payload;
		},
	},
});

export const {
	setLocalOrdersCount,
} = orderSlice.actions;

export default orderSlice.reducer;