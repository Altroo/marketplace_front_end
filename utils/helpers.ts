import {
	APIContentTypeInterface,
	ApiErrorResponseType,
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	ResponseDataTokenRefreshType,
} from '../types/_init/_initTypes';
import {
	emptyInitStateToken,
	emptyInitStateUniqueID,
	initialState, initToken,
} from "../store/slices/_init/_initSlice";
import { bulkCookiesDeleter, cookiesPoster, tokenRefreshApi } from "../store/services/_init/_initAPI";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store/store';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { signOut } from "next-auth/react";
import { DASHBOARD, SITE_ROOT } from "./routes";

const refreshToken = async (refresh_token: string): Promise<ResponseDataTokenRefreshType> => {
	return await tokenRefreshApi(refresh_token);
};

export const isAuthenticatedInstance = (
	initStateToken: InitStateToken,
	contentType: APIContentTypeInterface = 'application/json',
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
			// let retry: string | undefined = undefined;
			// if (typeof window !== 'undefined') {
			// 	retry = localStorage.getItem('@retry') as string;
			// }
			if (error.response) {
				// access token expired
				if (error.response.status >= 500) {
					const errorObj = {
						error: {
							status_code: 502,
							message: 'Server error.',
							details: {
								error: ['It looks like we are unable to connect. Please check your network connection and try again.'],
							},
						},
					};
					return Promise.reject(errorObj);
				}
				if (error.response.status === 401) {
					await bulkCookiesDeleter('/cookie/delete');
					await signOut({ redirect: false, callbackUrl: SITE_ROOT});
					store.dispatch(initToken());
				}
				const errorObj = {
						error: error.response.data.error as ApiErrorResponseType, // for custom api errors
					};
				return Promise.reject(errorObj);
				// if (error.response.status === 401 && !retry) {
				// 	if (typeof window !== 'undefined') {
				// 		await localStorage.setItem('@retry', '1');
				// 	}
				// 	try {
				// 		// trying to refresh access token using refresh token
				// 		const newAccessToken: ResponseDataTokenRefreshType = await refreshToken(
				// 			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				// 			initStateToken.refresh_token!,
				// 		);
				// 		if (newAccessToken.data) {
				// 			instance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken.data.access;
				// 			const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
				// 				tokenType: 'TOKEN', // TOKEN
				// 				initStateToken: {
				// 					access_token: newAccessToken.data.access,
				// 					refresh_token: newAccessToken.data.refresh,
				// 					user: {
				// 						pk: initStateToken.user.pk,
				// 						email: initStateToken.user.email,
				// 						first_name: initStateToken.user.first_name,
				// 						last_name: initStateToken.user.last_name,
				// 					},
				// 					access_token_expiration: newAccessToken.data.access_token_expiration,
				// 					refresh_token_expiration: initStateToken.refresh_token_expiration,
				// 				},
				// 				initStateUniqueID: emptyInitStateUniqueID,
				// 			};
				// 			await setRemoteCookiesAppToken(newInitStateToken);
				// 			store.dispatch(setInitState(newInitStateToken));
				// 			if (typeof window !== 'undefined') {
				// 				await localStorage.setItem('@retry', '0');
				// 			}
				// 			return instance(error.config);
				// 		} else {
				// 			return Promise.reject(error);
				// 		}
				// 	} catch (_error) {
				// 		return Promise.reject(_error);
				// 	}
				// } else {
				// 	// api error not related to access token
				// 	const errorObj = {
				// 		error: error.response.data.error as ApiErrorResponseType, // for custom api errors
				// 	};
				// 	return Promise.reject(errorObj);
				// }
			}
			return Promise.reject(error);
		},
	);
	return instance;
};

export const allowAnyInstance = (contentType: APIContentTypeInterface = 'application/json') => {
	const instance: AxiosInstance = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_ROOT_API_URL}`,
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
						error: error.response.data.error as ApiErrorResponseType, // for custom api errors
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
						error: error.response.data.error as ApiErrorResponseType, // for custom api errors
					};
				}
				return Promise.reject(errorObj);
			}
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

export const setRemoteCookiesTokenOnly = async (InitStateToken: InitStateToken) => {
	await cookiesPoster('/cookies', { tokenType: 'TOKEN' }).then(async () => {
		cookiesPoster('/cookies', { initStateToken: InitStateToken }).then();
	});
};

export const emptyRemoteCookiesUniqueIDOnly = () => {
	cookiesPoster('/cookies', { InitStateUniqueID: emptyInitStateUniqueID }).then();
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
	const { e, setFieldError } = props;
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
	return '1';
};

export const generateQueryParams = (query: ParsedUrlQuery, nextPage?: string) => {
	// const {page, sort_by} = query;
	const { sort_by, categories, colors, sizes, forWhom, cities, solder, labels, maroc } = query;
	// default queries using let.
	let pageNumber = '1';
	let sortBy = '-price';
	// construct url if queries found.
	if (nextPage) {
		pageNumber = nextPage;
	}
	if (sort_by) {
		sortBy = sort_by as string;
	}
	let url = `?sort_by=${sortBy}`;

	if (categories) {
		url += `&categories=${categories}`;
	}
	if (colors) {
		url += `&colors=${colors}`;
	}
	if (sizes) {
		url += `&sizes=${sizes}`;
	}
	if (forWhom) {
		url += `&forWhom=${forWhom}`;
	}
	if (cities) {
		url += `&cities=${cities}`;
	}
	if (solder) {
		url += `&solder=${solder}`;
	}
	if (labels) {
		url += `&labels=${labels}`;
	}
	if (maroc) {
		url += `&maroc=${maroc}`;
	}
	url += `&page=${pageNumber}`;
	return url;
};

export const generatePageQueryParams = (nextPage?: string) => {
	let pageNumber = '1';
	if (nextPage) {
		pageNumber = nextPage;
	}
	return `?page=${pageNumber}`;
};
