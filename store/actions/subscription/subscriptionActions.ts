import * as Types from '../index';
import { PaymentTypeType } from "../../../types/subscription/subscriptionTypes";

// GET : /api/1.0.0/subscription
export const subscriptionGetAvailableSubscriptionAction = () => {
	return {
		type: Types.SUBSCRIPTION_GET_AVAILABLE_SUBSCRIPTIONS,
	};
};

// GET : /api/1.0.0/subscription
export const subscriptionGetSubscriptionByNbrArticle = (nbr_article: number) => {
	return {
		type: Types.SUBSCRIPTION_GET_SUBSCRIPTION_BY_NBR_ARTICLE,
		nbr_article,
	};
};

// POST : /api/1.0.0/subscription
export const subscriptionPostRootAction = (
	nbr_article: number,
	company: string | undefined,
	ice: string | undefined,
	first_name: string,
	last_name: string,
	adresse: string,
	city: string,
	code_postal: string,
	country: string,
	promo_code: string | undefined,
	payment_type: PaymentTypeType | string,
) => {
	return {
		type: Types.SUBSCRIPTION_POST_ROOT,
		nbr_article,
		company,
		ice,
		first_name,
		last_name,
		adresse,
		city,
		code_postal,
		country,
		promo_code,
		payment_type,
	};
};

// POST : /api/1.0.0/subscription/check_promo_code/
export const subscriptionPostCheckPromoCode = (promo_code: string) => {
	return {
		type: Types.SUBSCRIPTION_POST_CHECK_PROMO_CODE,
		promo_code,
	};
};