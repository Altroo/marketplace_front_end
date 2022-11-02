import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';

type cookieDeleterType = {
	'@tokenType': string;
	'@initStateToken': string;
	'@initStateUniqueID': string;
};

const deleteBulkCookie = (res: NextApiResponse, name: cookieDeleterType, options: CookieSerializeOptions = {}) => {
	res.setHeader('Set-Cookie', [
		serialize(name['@tokenType'], '0', options),
		serialize(name['@initStateToken'], '0', options),
		serialize(name['@initStateUniqueID'], '0', options),
	]);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const options = {
		httpOnly: true,
		secure: true,
		path: '/',
		hostOnly: true,
		domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
	};
	if (req.method === 'DELETE') {
		const query = req.body as cookieDeleterType;
		deleteBulkCookie(res, query, {
			sameSite: 'lax',
				...options,
		})
	}
}
