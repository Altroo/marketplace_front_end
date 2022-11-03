import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';

// type cookieDeleterType = {
// 	'@tokenType': string;
// 	'@initStateToken': string;
// 	'@initStateUniqueID': string;
// };

const deleteBulkCookie = (res: NextApiResponse, options: CookieSerializeOptions = {}) => {
	res.setHeader('Set-Cookie', [
		serialize('@tokenType', '', options),
		serialize('@initStateToken', '', options),
		serialize('@initStateUniqueID', '', options),
	]);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const options = {
		httpOnly: true,
		secure: true,
		path: '/',
		expires: new Date(Date.now()),
	};
	if (req.method === 'DELETE') {
		deleteBulkCookie(res, {
			sameSite: 'lax',
				...options,
		})
		res.status(204);
		res.end();
	}
}
