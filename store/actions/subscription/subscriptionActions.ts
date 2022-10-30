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

// PATCH : /api/1.0.0/subscription
export const subscriptionPatchRootAction = (
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
		type: Types.SUBSCRIPTION_PATCH_ROOT,
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

// GET : /api/1.0.0/subscription/indexed_articles/
export const subscriptionGetIndexedArticlesAction = (url: string) => {
	return {
		type: Types.SUBSCRIPTION_GET_INDEXED_ARTICLES,
		url,
	};
};

// GET : /api/1.0.0/subscription/available_articles/
export const subscriptionGetAvailableArticlesAction = (url: string) => {
	return {
		type: Types.SUBSCRIPTION_GET_AVAILABLE_ARTICLES,
		url,
	};
};

// DELETE : /api/1.0.0/subscription/indexed_articles/
export const subscriptionDeleteSingleIndexedArticleAction = (pk: number | string) => {
	return {
		type: Types.SUBSCRIPTION_DELETE_SINGLE_INDEXED_ARTICLE,
		pk,
	};
};

// POST : /api/1.0.0/subscription/indexed_articles
export const subscriptionPostIndexArticlesAction = (pk: number | string) => {
	return {
		type: Types.SUBSCRIPTION_POST_INDEXED_ARTICLE_ROOT,
		pk
	};
};