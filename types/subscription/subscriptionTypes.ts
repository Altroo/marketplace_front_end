import { PaginationResponseType, ResponseDataInterface, SagaCallBackBase } from "../_init/_initTypes";

// ('C', 'Carte'), ('V', 'Virement')
export type PaymentTypeType = 'C' | 'V';
// ('P', 'Price'), ('S', 'Slots'),
export type PromoCodeTypeType = 'P' | 'S';

type PayloadType = {
	type: string;
};

export type availableSubscriptionPlanType = {
	pk: number,
	nbr_article: number,
	prix_ht: number,
	prix_ttc: number,
	prix_unitaire_ht: number,
	prix_unitaire_ttc: number,
	pourcentage: number,
}

//!- Subscription State
export interface SubscriptionStateInterface {
	available_subscription_plan: Array<availableSubscriptionPlanType>;
}

export type SubscriptionGetAvailableSubscriptionResponseType = ResponseDataInterface<Array<availableSubscriptionPlanType>>;

export type SubscriptionGetSubscriptionByNbrArticleResponseType = ResponseDataInterface<availableSubscriptionPlanType>;

export interface subscriptionPostRootType extends PayloadType {
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
	payment_type: PaymentTypeType,
}

export type subscriptionPostCheckPromoCodeType = {
    validity: boolean,
    type: PromoCodeTypeType | null,
    value: number | null
}

export type subscriptionPostCheckPromoCodeResponseType = ResponseDataInterface<subscriptionPostCheckPromoCodeType>;

export interface SagaCallBackOnCompleteCheckPromoCodeType extends SagaCallBackBase {
	data: subscriptionPostCheckPromoCodeType;
}

export interface SagaCallBackOnCompleteSubscriptionByNbrArticleType extends SagaCallBackBase {
	data: availableSubscriptionPlanType;
}

export type subscriptionPostType = {
	reference_number: string,
  total_paid: number,
}
export interface SagaCallBackOnCompletePostSubscriptionType extends SagaCallBackBase {
	data: subscriptionPostType;
}

export type subscriptionPostResponseType = ResponseDataInterface<subscriptionPostType>;

export interface subscriptionGetUserSubscriptionType extends Omit<subscriptionPostRootType, 'type' | 'payment_type' | 'promo_code'> {
	prix_ht: number,
	prix_ttc: number,
	prix_unitaire_ht: number,
	prix_unitaire_ttc: number,
	pourcentage: number,
	used_slots: number,
	facture: string,
	expiration_date: string,
}

export type subscriptionGetUserSubscriptionResponseType = ResponseDataInterface<subscriptionGetUserSubscriptionType>;

export type subscriptionGetUserCurrentSubscriptionType = {
	expiration_date: string,
	used_slots: number,
	nbr_article: number,
	prix_ttc: number,
	prix_unitaire_ttc: number,
	pourcentage: number,
	facture: string,
}
export type subscriptionGetIndexedOffersType = {
	pk: number,
	thumbnail: string,
	title: string,
}

export type subscriptionGetIndexedOffersPaginatedType = PaginationResponseType<subscriptionGetIndexedOffersType>;
export type subscriptionGetIndexedOffersResponseType = ResponseDataInterface<subscriptionGetIndexedOffersPaginatedType>;