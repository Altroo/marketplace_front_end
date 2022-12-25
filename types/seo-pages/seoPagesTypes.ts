import { ResponseDataInterface } from "../_init/_initTypes";
import {DefaultSeoPageClass} from "../../models/seo-data/DefaultSeoPageClass";


type DefaultGetSeoPagesUrl = Array<Pick<DefaultSeoPageClass, 'page_url'>>;
export type SeoPagesGetDefaultSeoSlugsResponseType = ResponseDataInterface<DefaultGetSeoPagesUrl>;
export type SeoPagesGetSingleSeoDataResponseType = ResponseDataInterface<DefaultSeoPageClass>;

export type coupDeCoeurOffers = {
	offer_pk: number;
	picture: string;
}

export type coupDeCoeurType = {
	shop_pk: number;
	shop_name: string;
	avatar: string;
	shop_link: string;
	left_offers: Array<coupDeCoeurOffers>;
	right_offers: Array<coupDeCoeurOffers>;
}

export interface newShopsType extends Omit<coupDeCoeurType, 'left_offers' | 'right_offers'> {
	shop_category: string;
	bg_color_code: string;
}

export type GetHomePageType = {
	coup_de_coeur_bg: string;
	coup_de_coeur: coupDeCoeurType;
	new_shops: Array<newShopsType>
}

export type SeoPagesGetHomePageResponseType = ResponseDataInterface<GetHomePageType>;