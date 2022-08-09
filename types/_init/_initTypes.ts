export type ResponseStatusDefaultType = {
	status: number | undefined;
};

export interface AxiosErrorDefaultType extends ResponseStatusDefaultType {
	error?: string;
}

export interface ResponseDataInterface<T> {
	data: T;
	status: number;
}

export interface PaginationResponseType<T> {
	count: number | null,
	next: string | null,
	previous: string | null,
	results: Array<T>
}

export interface ResponseDataErrorInterface {
	data: Record<string, unknown>;
	status: number;
}

export interface ResponseOnlyInterface {
	status: number
}

export type APIContentTypeInterface = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';

export type Nullable<T> = { [K in keyof T]: T[K] | null };

// export type DeepNullable<T> = { [K in keyof T]: DeepNullable<T[K]> | null };

export type TokenChoices = 'TOKEN' | 'UNIQUE_ID' | null;

export type Token_type = {
	tokenType: TokenChoices;
};

export type InitStateNonNullableToken = {
	access_token: string;
	refresh_token: string;
	user: {
		pk: number;
		email: string;
		first_name: string;
		last_name: string;
	};
	access_token_expiration: string;
	refresh_token_expiration: string;
}

//!- Init State
export type InitStateToken = {
	access_token: string | null;
	refresh_token: string | null;
	user: {
		pk: number | null;
		email: string | null;
		first_name: string | null;
		last_name: string | null;
	};
	access_token_expiration: string | null;
	refresh_token_expiration: string | null;
};

export type InitStateUniqueID = {
	unique_id: string | null;
	unique_id_expiration: string | null;
};

export interface InitStateInterface<T, K> extends Token_type {
	initStateToken: T;
	initStateUniqueID: K;
}

type ResponseDataTokenRefresh = {
	access: string;
	refresh: string;
	access_token_expiration: string;
};

export type ResponseDataTokenRefreshType = ResponseDataInterface<ResponseDataTokenRefresh>;

// export type cookiesType = {
// 	'@shop_name' : string | undefined,
// 	'@avatar': ArrayBuffer | string | undefined,
// 	'@color_code': string | undefined,
// 	'@bg_color_code': string | undefined,
// 	'@font_name': ShopFontNameType | undefined,
// };

export type AppTokensCookieType = {
	'@tokenType' : string | undefined,
	'@initStateToken' : string | undefined,
	'@initStateUniqueID' : string | undefined,
}