import { ResponseDataInterface } from "../_init/_initTypes";

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