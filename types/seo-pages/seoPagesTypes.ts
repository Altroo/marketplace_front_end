import { ResponseDataInterface } from "../_init/_initTypes";
import {DefaultSeoPageClass} from "../../models/seo-data/DefaultSeoPageClass";


type DefaultGetSeoPagesUrl = Array<Pick<DefaultSeoPageClass, 'page_url'>>;
export type SeoPagesGetDefaultSeoSlugsResponseType = ResponseDataInterface<DefaultGetSeoPagesUrl>;
export type SeoPagesGetSingleSeoDataResponseType = ResponseDataInterface<DefaultSeoPageClass>;