import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyingsSellingsList, OrderStateInterface } from '../../../types/order/orderTypes';
import { PaginationResponseType } from '../../../types/_init/_initTypes';
// import { HYDRATE } from "next-redux-wrapper";

const initialState: OrderStateInterface = {
	buyingsList: {
		next: null,
		previous: null,
		count: null,
		results: [],
	},
	sellingsList: {
		next: null,
		previous: null,
		count: null,
		results: [],
	}
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		setBuyingsListState: (state, action: PayloadAction<PaginationResponseType<BuyingsSellingsList>>) => {
			const { next, previous, count, results } = action.payload;
			state.buyingsList.count = count;
			state.buyingsList.next = next;
			state.buyingsList.previous = previous;
			// prepend to the list
			for (let i = 0; i < results.length; i++) {
				state.buyingsList.results.unshift(results[i]);
			}
			// return state;
		},
		setSellingsListState: (state, action: PayloadAction<PaginationResponseType<BuyingsSellingsList>>) => {
			const { next, previous, count, results } = action.payload;
			state.sellingsList.count = count;
			state.sellingsList.next = next;
			state.sellingsList.previous = previous;
			// prepend to the list
			for (let i = 0; i < results.length; i++) {
				state.sellingsList.results.unshift(results[i]);
			}
			// return state;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.order };
	// 	},
	// },
});

export const {
	setBuyingsListState,
	setSellingsListState,
} = orderSlice.actions;

export default orderSlice.reducer;