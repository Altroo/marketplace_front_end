import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

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
