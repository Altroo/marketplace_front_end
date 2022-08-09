import {
	APIContentTypeInterface,
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	ResponseDataTokenRefreshType,
} from '../types/_init/_initTypes';
import {
	emptyInitStateToken,
	emptyInitStateUniqueID,
	setInitState,
	initialState,
} from '../store/slices/_init/_initSlice';
import { tokenRefreshApi } from '../store/services/_init/_initAPI';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store/store';
import { ShopFontNameType } from '../types/shop/shopTypes';

export const loadAppToken = (): InitStateInterface<InitStateToken, InitStateUniqueID> => {
	// load required data from storage
	// using this check since next use server side rendering
	if (typeof window !== 'undefined') {
		const tokenType: string | null = localStorage.getItem('@type');
		const stateToken: string | null = localStorage.getItem('@initStateToken');
		const stateUniqueID: string | null = localStorage.getItem('@initStateUniqueID');
		if (tokenType === 'TOKEN' && stateToken !== null) {
			return {
				tokenType: 'TOKEN',
				initStateToken: JSON.parse(stateToken) as InitStateToken,
				initStateUniqueID: emptyInitStateUniqueID,
			};
		} else if (tokenType === 'UNIQUE_ID' && stateUniqueID !== null) {
			return {
				tokenType: 'UNIQUE_ID',
				initStateToken: emptyInitStateToken,
				initStateUniqueID: JSON.parse(stateUniqueID) as InitStateUniqueID,
			};
		} else {
			return initialState;
		}
	} else {
		return initialState;
	}
};

export const setLocalStorageAppToken = (newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID>) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@type', newInitStateToken.tokenType as 'TOKEN' | 'UNIQUE_ID');
		localStorage.setItem('@initStateToken', JSON.stringify(newInitStateToken.initStateToken));
		localStorage.setItem('@initStateUniqueID', JSON.stringify(newInitStateToken.initStateUniqueID));
	}
};

export const setLocalStorageTokenOnly = (InitStateToken: InitStateToken) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@type', 'TOKEN');
		localStorage.setItem('@initStateToken', JSON.stringify(InitStateToken));
	}
};

export const emptyLocalStorageUniqueIDOnly = () => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@initStateUniqueID', JSON.stringify(emptyInitStateUniqueID));
	}
};

export const emptyLocalStorageAppToken = () => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@type', '');
		localStorage.setItem('@initStateToken', JSON.stringify(emptyInitStateToken));
		localStorage.setItem('@initStateUniqueID', JSON.stringify(emptyInitStateUniqueID));
	}
};

const refreshToken = async (refresh_token: string): Promise<ResponseDataTokenRefreshType> => {
	return await tokenRefreshApi(refresh_token);
};

const loadAccessToken: () => string | null = () => {
	if (typeof window !== 'undefined') {
		const localStateToken = localStorage.getItem('@initStateToken');
		if (localStateToken !== null) {
			const stateToken: InitStateToken = JSON.parse(localStateToken) as InitStateToken;
			return stateToken.access_token;
		}
	}
	return null;
};

export const isAuthenticatedInstance = (
	initStateToken: InitStateToken,
	contentType: APIContentTypeInterface = 'application/json',
	useTokenParam = false,
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
			if (useTokenParam) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				config.headers!['Authorization'] = 'Bearer ' + initStateToken.access_token;
			} else {
				const access_token: string | null = loadAccessToken();
				if (access_token !== null) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					config.headers!['Authorization'] = 'Bearer ' + access_token;
				}
			}
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
							setLocalStorageAppToken(newInitStateToken);
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
						status: error.response.status,
						error: error.response.statusText,
					};
					return Promise.reject(errorObj);
				}
			}
			return Promise.reject(error);
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
				setLocalStorageAppToken(newInitStateToken);
				store.dispatch(setInitState(newInitStateToken));
			}
			return response;
		},
		(error) => {
			if (error.response) {
				const errorObj = {
					status: error.response.status,
					error: error.response.statusText,
				};
				return Promise.reject(errorObj);
			}
			return Promise.reject(error);
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
				const errorObj = {
					status: error.response.status,
					error: error.response.statusText,
				};
				return Promise.reject(errorObj);
			}
			return Promise.reject(error);
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

export const setLocalStorageNewShopColor = (color_code: string, bg_color_code: string) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('@color_code', color_code);
		localStorage.setItem('@bg_color_code', bg_color_code);
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
		const shop_name : string | null = localStorage.getItem('@shop_name');
		const avatar: string | null = localStorage.getItem('@avatar');
		const color_code: string | null = localStorage.getItem('@color_code');
		const bg_color_code: string | null = localStorage.getItem('@bg_color_code');
		const font_name: ShopFontNameType | null = localStorage.getItem('@font_name') as ShopFontNameType | null;
		return {
			shop_name,
			avatar,
			color_code,
			bg_color_code,
			font_name
		}
	}
	return null;
}
// New shop empty localStorage
export const emptyLocalStorageNewShopData = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('@shop_name');
		localStorage.removeItem('@avatar');
		localStorage.removeItem('@color_code');
		localStorage.removeItem('@bg_color_code');
		localStorage.removeItem('@font_name');
	}
}