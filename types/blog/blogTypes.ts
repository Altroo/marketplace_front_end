import { BlogClass } from "../../models/blog/BlogClass";
import { ResponseDataInterface } from "../_init/_initTypes";

type BlogPageUrlType = Array<Pick<BlogClass, 'page_url' | 'title' | 'created_date'>>;
export type BlogPageSlugsResponseType = ResponseDataInterface<BlogPageUrlType>;
export type BlogPageDetailsDataResponseType = ResponseDataInterface<BlogClass>;