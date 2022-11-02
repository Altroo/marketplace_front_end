import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie, setCookie } from '../../utils/cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const options = {
			httpOnly: true,
			secure: true,
			path: '/',
			// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
		};
		const query = req.body;
		// Store Name
		if ('shop_name' in query) {
			setCookie(res, '@shop_name', query.shop_name, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		// Avatar
		if ('avatar' in query) {
			setCookie(res, '@avatar', query.avatar, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		// Color code & bg_color_code
		if ('color_code' in query) {
			setCookie(res, '@color_code', query.color_code, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}

		// font_type
		if ('font_name' in query) {
			setCookie(res, '@font_name', query.font_name, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('tokenType' in query) {
			setCookie(res, '@tokenType', query.tokenType, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('initStateToken' in query) {
			setCookie(res, '@initStateToken', query.initStateToken, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('initStateUniqueID' in query) {
			setCookie(res, '@initStateUniqueID', query.initStateUniqueID, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('border' in query) {
			setCookie(res, '@border', query.border, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('icon_color' in query) {
			setCookie(res, '@icon_color', query.icon_color, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('new_email' in query) {
			setCookie(res, '@new_email', query.new_email, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('code' in query) {
			setCookie(res, '@code', query.code, {
				maxAge: query.maxAge,
				sameSite: 'lax',
				...options,
			});
		}
		if ('pass_updated' in query) {
			setCookie(res, '@pass_updated', query.pass_updated, {
				maxAge: query.maxAge,
				sameSite: 'lax',
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
	} else if (req.method === 'DELETE') {
		const options = {
			maxAge: -1,
			path: '/',
			httpOnly: true,
			secure: true,
			// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
		};
		const query = req.body;
		if ('shop_name' in query) {
			deleteCookie(res, '@shop_name', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('avatar' in query) {
			deleteCookie(res, '@avatar', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('color_code' in query) {
			deleteCookie(res, '@color_code', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('font_name' in query) {
			deleteCookie(res, '@font_name', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('tokenType' in query) {
			deleteCookie(res, '@tokenType', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('initStateToken' in query) {
			deleteCookie(res, '@initStateToken', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('initStateUniqueID' in query) {
			deleteCookie(res, '@initStateUniqueID', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('new_email' in query) {
			deleteCookie(res, '@new_email', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('code' in query) {
			deleteCookie(res, '@code', {
				sameSite: 'lax',
				...options,
			});
		}
		if ('pass_updated' in query) {
			deleteCookie(res, '@pass_updated', {
				sameSite: 'lax',
				...options,
			});
		}
		// deleted
		res.status(204);
		res.end();
	}
}
