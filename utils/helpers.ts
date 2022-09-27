import {
	APIContentTypeInterface,
	ApiErrorResponseType,
	IconColorType,
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	ResponseDataTokenRefreshType,
} from '../types/_init/_initTypes';
import {
	emptyInitStateToken,
	emptyInitStateUniqueID,
	initialState,
	setInitState,
} from '../store/slices/_init/_initSlice';
import { cookiesDeleter, cookiesPoster, tokenRefreshApi } from '../store/services/_init/_initAPI';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store/store';
import { ShopFontNameType } from '../types/shop/shopTypes';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

// export const loadAppToken = (): InitStateInterface<InitStateToken, InitStateUniqueID> => {
// 	// load required data from storage
// 	// using this check since next use server side rendering
// 	if (typeof window !== 'undefined') {
// 		const tokenType: string | null = localStorage.getItem('@tokenType');
// 		const stateToken: string | null = localStorage.getItem('@initStateToken');
// 		const stateUniqueID: string | null = localStorage.getItem('@initStateUniqueID');
// 		if (tokenType === 'TOKEN' && stateToken !== null) {
// 			return {
// 				tokenType: 'TOKEN',
// 				initStateToken: JSON.parse(stateToken) as InitStateToken,
// 				initStateUniqueID: emptyInitStateUniqueID,
// 			};
// 		} else if (tokenType === 'UNIQUE_ID' && stateUniqueID !== null) {
// 			return {
// 				tokenType: 'UNIQUE_ID',
// 				initStateToken: emptyInitStateToken,
// 				initStateUniqueID: JSON.parse(stateUniqueID) as InitStateUniqueID,
// 			};
// 		} else {
// 			return initialState;
// 		}
// 	} else {
// 		return initialState;
// 	}
// };

// export const setLocalStorageAppToken = (newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID>) => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('@tokenType', newInitStateToken.tokenType as 'TOKEN' | 'UNIQUE_ID');
// 		localStorage.setItem('@initStateToken', JSON.stringify(newInitStateToken.initStateToken));
// 		localStorage.setItem('@initStateUniqueID', JSON.stringify(newInitStateToken.initStateUniqueID));
// 	}
// };

// export const setLocalStorageTokenOnly = (InitStateToken: InitStateToken) => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('@tokenType', 'TOKEN');
// 		localStorage.setItem('@initStateToken', JSON.stringify(InitStateToken));
// 	}
// };
//
// export const emptyLocalStorageUniqueIDOnly = () => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('@initStateUniqueID', JSON.stringify(emptyInitStateUniqueID));
// 	}
// };

// export const emptyLocalStorageAppToken = () => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('@tokenType', '');
// 		localStorage.setItem('@initStateToken', JSON.stringify(emptyInitStateToken));
// 		localStorage.setItem('@initStateUniqueID', JSON.stringify(emptyInitStateUniqueID));
// 	}
// };

const refreshToken = async (refresh_token: string): Promise<ResponseDataTokenRefreshType> => {
	return await tokenRefreshApi(refresh_token);
};

// const loadAccessToken: () => string | null = () => {
// 	if (typeof window !== 'undefined') {
// 		const localStateToken = localStorage.getItem('@initStateToken');
// 		if (localStateToken !== null) {
// 			const stateToken: InitStateToken = JSON.parse(localStateToken) as InitStateToken;
// 			return stateToken.access_token;
// 		}
// 	}
// 	return null;
// };

// const loadAccessTokenCookie: () => string | null = () => {
// 	cookiesFetcher('/cookies').then((value: { data: { cookies: AppTokensCookieType }; status: number }) => {
// 		if (value.status === 200) {
// 			const localStateToken = value.data.cookies['@initStateToken'];
// 			if (localStateToken !== null) {
// 				if (typeof localStateToken === 'string') {
// 					const stateToken: InitStateToken = JSON.parse(localStateToken) as InitStateToken;
// 					return stateToken.access_token;
// 				}
// 			}
// 		}else {
// 			return null;
// 		}
// 	});
// 	// console.log('Returned null');
// 	// return null;
// };

export const isAuthenticatedInstance = (
	initStateToken: InitStateToken,
	contentType: APIContentTypeInterface = 'application/json',
	// useTokenParam = false,
) => {
	const instance: AxiosInstance = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_ROOT_API_URL}`,
		headers: {
			'Content-Type': contentType,
		},
	});
	instance.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			/* initStateToken might be using the old access_token. */
			// load new access token from storage instead.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			config.headers!['Authorization'] = 'Bearer ' + initStateToken.access_token;
			// if (useTokenParam) {
			// 	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			// 	config.headers!['Authorization'] = 'Bearer ' + initStateToken.access_token;
			// } else {
			// 	// const access_token: string | null = loadAccessToken();
			// 	const access_token: string | null | undefined = loadAccessTokenCookie();
			// 	if (typeof access_token === 'string') {
			// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			// 		config.headers!['Authorization'] = 'Bearer ' + access_token;
			// 	}
			// }
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			// Any status code with range of 2xx
			return response;
		},
		async (error) => {
			const originalConfig = error.config;
			if (error.response) {
				// access token expired
				if ('code' in error && error.code !== 'ERR_BAD_REQUEST') {
					const errorObj = {
						error: {
							status_code: 502,
							message: 'Network error.',
							details: {
								error: ['It looks like we are unable to connect. Please check your network connection and try again.'],
							},
						},
					};
					return Promise.reject(errorObj);
				}
				if (error.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;
					try {
						// trying to refresh access token using refresh token
						const newAccessToken: ResponseDataTokenRefreshType = await refreshToken(
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							initStateToken.refresh_token!,
						);
						if (newAccessToken.data) {
							instance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken.data.access;
							const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
								tokenType: 'TOKEN', // TOKEN
								initStateToken: {
									access_token: newAccessToken.data.access,
									refresh_token: newAccessToken.data.refresh,
									user: {
										pk: initStateToken.user.pk,
										email: initStateToken.user.email,
										first_name: initStateToken.user.first_name,
										last_name: initStateToken.user.last_name,
									},
									access_token_expiration: newAccessToken.data.access_token_expiration,
									refresh_token_expiration: initStateToken.refresh_token_expiration,
								},
								initStateUniqueID: emptyInitStateUniqueID,
							};
							await setRemoteCookiesAppToken(newInitStateToken);
							store.dispatch(setInitState(newInitStateToken));
							return instance(originalConfig);
						}
					} catch (_error) {
						// error trying to refresh access token
						return Promise.reject(_error);
					}
				} else {
					// api error not related to access token
					const errorObj = {
						error: error.response.data.error as ApiErrorResponseType,
					};
					return Promise.reject(errorObj);
				}
			}
			// return Promise.reject(error);
		},
	);
	return instance;
};

export const allowAnyInstance = (
	contentType: APIContentTypeInterface = 'application/json',
	expectUniqueID?: boolean,
) => {
	const instance: AxiosInstance = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_ROOT_API_URL}`,
		headers: {
			'Content-Type': contentType,
		},
	});
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			if (expectUniqueID) {
				const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
					tokenType: 'UNIQUE_ID',
					initStateToken: emptyInitStateToken,
					initStateUniqueID: {
						unique_id: response.data.unique_id,
						unique_id_expiration: response.data.unique_id_expiration,
					},
				};
				setRemoteCookiesAppToken(newInitStateToken).then();
				store.dispatch(setInitState(newInitStateToken));
			}
			return response;
		},
		(error) => {
			if (error.response) {
				let errorObj;
				if ('code' in error && error.code !== 'ERR_BAD_REQUEST') {
					errorObj = {
						error: {
							status_code: 502,
							message: 'Network error.',
							details: {
								error: ['It looks like we are unable to connect. Please check your network connection and try again.'],
							},
						},
					};
				} else {
					errorObj = {
						error: error.response.data.error as ApiErrorResponseType,
					};
				}
				return Promise.reject(errorObj);
			}
			// return Promise.reject(error);
		},
	);
	return instance;
};

export const defaultInstance = (BaseUrl: string, contentType: APIContentTypeInterface = 'application/json') => {
	const instance: AxiosInstance = axios.create({
		baseURL: `${BaseUrl}`,
		headers: {
			'Content-Type': contentType,
		},
	});
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error) => {
			if (error.response) {
				let errorObj;
				/*
					"ERR_FR_TOO_MANY_REDIRECTS"
					"ERR_BAD_OPTION_VALUE"
					"ERR_BAD_OPTION"
					"ERR_NETWORK"
					"ERR_DEPRECATED"
					"ERR_BAD_RESPONSE"
					"ERR_BAD_REQUEST"
					"ERR_CANCELED"
					"ECONNABORTED"
					"ETIMEDOUT"
				*/
				if ('code' in error && error.code !== 'ERR_BAD_REQUEST') {
					errorObj = {
						error: {
							status_code: 502,
							message: 'Network error.',
							details: {
								error: ['It looks like we are unable to connect. Please check your network connection and try again.'],
							},
						},
					};
				} else {
					errorObj = {
						error: error.response.data.error as ApiErrorResponseType,
					};
				}
				return Promise.reject(errorObj);
			}
			// return Promise.reject(error);
		},
	);
	return instance;
};

export const constructApiFormData = (apiData: object) => {
	const formData = new FormData();
	for (const [key, value] of Object.entries(apiData)) {
		formData.append(key, value);
	}
	return formData;
};

// New shop set LocalStorage
export const setLocalStorageNewShopName = (shop_name: string) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@shop_name', shop_name);
	}
};

export const setLocalStorageNewShopAvatar = (avatar: string) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@avatar', avatar);
	}
};

export const setLocalStorageNewShopColor = (
	color_code: string,
	bg_color_code: string,
	border: string,
	icon_color: IconColorType,
) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@color_code', color_code);
		localStorage.setItem('@bg_color_code', bg_color_code);
		localStorage.setItem('@border', border);
		localStorage.setItem('@icon_color', icon_color);
	}
};

export const setLocalStorageNewShopFont = (font_name: ShopFontNameType) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@font_name', font_name);
	}
};
// New shop load LocalStorage
export const loadLocalStorageNewShopData = () => {
	if (typeof window !== 'undefined') {
		const shop_name = localStorage.getItem('@shop_name') as string;
		const avatar = localStorage.getItem('@avatar') as string;
		const color_code = localStorage.getItem('@color_code') as string;
		const bg_color_code = localStorage.getItem('@bg_color_code') as string;
		const border = localStorage.getItem('@border') as string;
		const icon_color = localStorage.getItem('@icon_color') as IconColorType;
		const font_name = localStorage.getItem('@font_name') as ShopFontNameType;
		return {
			shop_name,
			avatar,
			color_code,
			bg_color_code,
			border,
			icon_color,
			font_name,
		};
	}
	return null;
};
// New shop empty localStorage
export const emptyLocalStorageNewShopData = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('@shop_name');
		localStorage.removeItem('@avatar');
		localStorage.removeItem('@color_code');
		localStorage.removeItem('@bg_color_code');
		localStorage.removeItem('@border');
		localStorage.removeItem('@icon_color');
		localStorage.removeItem('@font_name');
	}
};

export const deleteCookieStorageNewShopData = () => {
	cookiesDeleter('/cookies', { shop_name: 0 }).then(() => {
		cookiesDeleter('/cookies', { avatar: 0 }).then(() => {
			cookiesDeleter('/cookies', { color_code: 0 }).then(() => {
				cookiesDeleter('/cookies', { font_name: 0 }).then();
			});
		});
	});
};

// Set Server token cookies
export const setRemoteCookiesAppToken = async (
	newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID>,
) => {
	await cookiesPoster('/cookies', { tokenType: newInitStateToken.tokenType }).then(async () => {
		cookiesPoster('/cookies', { initStateToken: newInitStateToken.initStateToken }).then(async () => {
			cookiesPoster('/cookies', { initStateUniqueID: newInitStateToken.initStateUniqueID }).then();
		});
	});
};

export const setRemoteCookiesTokenOnly = (InitStateToken: InitStateToken) => {
	cookiesPoster('/cookies', { tokenType: 'TOKEN' }).then(() => {
		cookiesPoster('/cookies', { initStateToken: InitStateToken }).then();
	});
};

export const emptyRemoteCookiesUniqueIDOnly = () => {
	cookiesPoster('/cookies', { initStateToken: emptyInitStateToken }).then();
};

export const deleteRemoteCookiesAppToken = () => {
	cookiesDeleter('/cookies', { tokenType: 0 }).then(() => {
		cookiesDeleter('/cookies', { initStateToken: 0 }).then(() => {
			cookiesDeleter('/cookies', { initStateToken: 0 }).then();
		});
	});
};

// convert hex color to rgba
export const hexToRGB = (hex: string, alpha: number) => {
	const r: number = parseInt(hex.slice(1, 3), 16),
		g: number = parseInt(hex.slice(3, 5), 16),
		b: number = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	} else {
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
};

export const getServerSideCookieTokens = (context: GetServerSidePropsContext) => {
	const tokenCookies = {
		'@tokenType': getCookie('@tokenType', { req: context.req, res: context.res }),
		'@initStateToken': getCookie('@initStateToken', { req: context.req, res: context.res }),
		'@initStateUniqueID': getCookie('@initStateUniqueID', { req: context.req, res: context.res }),
	};
	const tokenType = tokenCookies['@tokenType'];
	const stateToken = tokenCookies['@initStateToken'];
	const stateUniqueID = tokenCookies['@initStateUniqueID'];
	let appToken = initialState;

	if (tokenType === 'TOKEN' && stateToken !== undefined) {
		appToken = {
			tokenType: 'TOKEN',
			initStateToken: JSON.parse(stateToken as string) as InitStateToken,
			initStateUniqueID: emptyInitStateUniqueID,
		};
	} else if (tokenType === 'UNIQUE_ID' && stateUniqueID !== undefined) {
		appToken = {
			tokenType: 'UNIQUE_ID',
			initStateToken: emptyInitStateToken,
			initStateUniqueID: JSON.parse(stateUniqueID as string) as InitStateUniqueID,
		};
	}
	return appToken;
};

type formikAutoErrors = {
	e: unknown;
	setFieldError: (field: string, message: string | undefined) => void;
};

export const setFormikAutoErrors = (props: formikAutoErrors) => {
	const {e, setFieldError} = props;
	const errors = e as ApiErrorResponseType;
	if (errors.error.details) {
		if (errors.error.details.error) {
			// requires globalError field in formik initialValues
			setFieldError('globalError', errors.error.details.error[0]);
		}
		if (typeof errors.error.details === 'object') {
			for (const [key, value] of Object.entries(errors.error.details)) {
				value.map((singleError) => {
					setFieldError(key, singleError);
				});
			}
		}
	}
};

export const getBackendNextPageNumber = (url: string | null) => {
	// using regex
	if (url === null) {
		return null;
	}
	const regex = /page=(\d+)/;
	const regexArray = url.match(regex);
	if (regexArray) {
		if (regexArray.length >= 2) {
			return regexArray[1];
		}
	}
	return "1";
	// using split
	// const queryIndex = url.search(regexp);
	// const pageNumber = url.slice(queryIndex + regexp.length);
	// if (pageNumber.includes('&')){
	// 	return pageNumber.split('&')[0];
	// }
	// return pageNumber;
};

export const generateQueryParams = (query: ParsedUrlQuery, nextPage?: string) => {
	// const {page, sort_by} = query;
	const {sort_by} = query;
	// default queries using let.
	let pageNumber = '1';
	let sortBy = '-price';
	// construct url if queries found.
	if (nextPage) {
		pageNumber = nextPage;
	}
	if (sort_by){
		sortBy = sort_by as string;
	}
	return `?sort_by=${sortBy}&page=${pageNumber}`;
}