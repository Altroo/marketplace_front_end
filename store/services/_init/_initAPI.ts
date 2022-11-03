import axios, { AxiosInstance } from 'axios';
import { constructApiFormData } from '../../../utils/helpers';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;

export const tokenRefreshApi = async (refresh: string) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_ACCOUNT_TOKEN_REFRESH}`, {
		refresh: refresh,
	}, {
		baseURL: `${process.env.NEXT_PUBLIC_ROOT_API_URL}`,
	});
	return {
		data: response.data,
		status: response.status,
	};
};
// POST Next api/cookies
export const cookiesPoster = async (url: string, body: object) => {
	axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API}`;
	const response = await axios.post(
		url,
		{
			...body,
			maxAge: 86400,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	return {
		status: response.status,
	};
};

// GET Next api/cookies
export const cookiesFetcher = async (url: string) => {
	axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API}`;
	const response = await axios.get(url);
	return {
		status: response.status,
		data: response.data,
	};
};
// DELETE Next api/cookies
export const cookiesDeleter = async (url: string, body: object) => {
	axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API}`;
	const response = await axios.delete(url, {
		data: body
	});
	return {
		status: response.status,
	};
};

// DELETE Next api/cookies
export const bulkCookiesDeleter = async (url: string) => {
	axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API}`;
	const response = await axios.post(url, {
		'tokens': true,
	});
	return {
		status: response.status,
	};
};

/*** Base Axios Form Data Api call [POST] */
export const postFormDataApi = async (
	url: string | undefined,
	instance: AxiosInstance,
	body: object,
	unique_id?: string | null,
) => {
	const formData = constructApiFormData(body);
	if (unique_id) {
		formData.append('unique_id', unique_id);
	}
	const response = await instance.post(`${url}`, formData);
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Form Data Api call [PUT] */
export const putFormDataApi = async (
	url: string | undefined,
	instance: AxiosInstance,
	body: object,
	unique_id?: string | null,
) => {
	const formData = constructApiFormData(body);
	if (unique_id) {
		formData.append('unique_id', unique_id);
	}
	const response = await instance.put(`${url}`, formData);
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Form Data Api call [PATCH] */
export const patchFormDataApi = async (
	url: string | undefined,
	instance: AxiosInstance,
	body: object,
	unique_id?: string | null,
) => {
	const formData = constructApiFormData(body);
	if (unique_id) {
		formData.append('unique_id', unique_id);
	}
	const response = await instance.patch(`${url}`, formData);
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Json Api call [POST] */
export const postApi = async (url: string | undefined, instance: AxiosInstance, body?: object) => {
	const response = await instance.post(`${url}`, body);
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Json Api call [GET] */
export const getApi = async (url: string | undefined, instance: AxiosInstance, queryParams?: object) => {
	const response = await instance.get(`${url}`, { params: queryParams });
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Json Api call [PATCH] */
export const patchApi = async (
	url: string | undefined,
	instance: AxiosInstance,
	body: object,
	unique_id?: string | null,
) => {
	let data;
	if (unique_id) {
		data = { unique_id, ...body };
	} else {
		data = { ...body };
	}
	const response = await instance.patch(`${url}`, data);
	return {
		status: response.status,
		data: response.data,
	};
};

/*** Base Axios Json Api call [PUT] */
export const putApi = async (url: string | undefined, instance: AxiosInstance, body: object) => {
	const response = await instance.put(`${url}`, body);
	return {
		status: response.status,
		data: response.data,
	};
};
/*** Base Axios Json Api call [DELETE] */
export const deleteApi = async (url: string, instance: AxiosInstance, body?: object) => {
	const response = await instance.delete(`${url}`, body);
	return {
		status: response.status,
	};
};
/*** Base Axios Json Api call [DELETE with Response] */
export const deleteResponseDataApi = async (url: string, instance: AxiosInstance, body?: object) => {
	const response = await instance.delete(`${url}`, body);
	return {
		data: response.data,
		status: response.status,
	};
};
