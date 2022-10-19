import * as Types from '../index';
// GET : /api/1.0.1/subscription

export const subscriptionGetAvailableSubscriptionAction = () => {
	return {
		type: Types.SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS,
	};
};