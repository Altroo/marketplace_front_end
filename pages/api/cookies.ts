import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../utils/cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const options = {
			httpOnly: true,
			secure: true,
			path: '/',
			domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
		};
		const query = req.body;
		// Store Name
		if ('shop_name' in query) {
			setCookie(res, '@shop_name', query.shop_name, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		// Avatar
		if ('avatar' in query) {
			console.log(query);
			setCookie(res, '@avatar', query.avatar, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		// Color code & bg_color_code
		if ('bg_color_code' in query) {
			setCookie(res, '@bg_color_code', query.bg_color_code, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		if ('color_code' in query) {
			setCookie(res, '@color_code', query.color_code, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}

		// font_type
		if ('font_name' in query) {
			setCookie(res, '@font_name', query.font_name, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		if ('tokenType' in query) {
			setCookie(res, '@tokenType', query.tokenType, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		if ('initStateToken' in query) {
			setCookie(res, '@initStateToken', query.initStateToken, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		if ('initStateUniqueID' in query) {
			setCookie(res, '@initStateUniqueID', query.initStateUniqueID, {
				maxAge: query.maxAge,
				sameSite: 'none',
				...options,
			});
		}
		// Return created with cookies set.
		res.status(204);
		res.end(res.getHeader('Set-Cookie'));
	} else if (req.method === 'GET') {
		res.status(200).json({
			cookies: req.cookies,
		});
	}
}
