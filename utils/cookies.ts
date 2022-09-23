import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';
import { InitStateInterface, InitStateToken, InitStateUniqueID } from "../types/_init/_initTypes";

// Runs on next server
export const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
	const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
	if (typeof options.maxAge === 'number') {
		options.expires = new Date(Date.now() + options.maxAge * 1000);
	}
	res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export const deleteCookie = (res: NextApiResponse, name: string, options: CookieSerializeOptions = {}) => {
	res.setHeader('Set-Cookie', serialize(name, '0', options));
};

export const setAuthTokenCookie = (res: NextApiResponse, value: InitStateInterface<InitStateToken, InitStateUniqueID>, options: CookieSerializeOptions = {}) => {
	const tokenTypeValue = String(value.tokenType);
	const initStateTokenValue = JSON.stringify(value.initStateToken);
	const initStateUniqueIDValue = JSON.stringify(value.initStateUniqueID);
	if (typeof options.maxAge === 'number') {
		options.expires = new Date(Date.now() + options.maxAge);
	}
	res.setHeader('Set-Cookie', [
		serialize('@tokenType', tokenTypeValue, options),
		serialize('@initStateToken', initStateTokenValue, options),
		serialize('@initStateUniqueID', initStateUniqueIDValue, options),
	]);
};