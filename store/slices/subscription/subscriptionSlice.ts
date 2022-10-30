import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	availableSubscriptionPlanType,
	SubscriptionStateInterface
} from "../../../types/subscription/subscriptionTypes";

const initialState: SubscriptionStateInterface = {
	available_subscription_plan: [],
};

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState: initialState,
	reducers: {
		setAvailableSubscriptions: (state, action: PayloadAction<Array<availableSubscriptionPlanType>>) => {
			state.available_subscription_plan = action.payload;
		},
	},
});

export const { setAvailableSubscriptions } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;