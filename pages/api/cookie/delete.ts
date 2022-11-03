import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';

// type cookieDeleterType = {
// 	'@tokenType': string;
// 	'@initStateToken': string;
// 	'@initStateUniqueID': string;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const options: CookieSerializeOptions = {
		httpOnly: true,
		secure: true,
		path: '/',
		expires: new Date(Date.now()),
		maxAge: 0,
		sameSite: "lax",
	};
	if (req.method === 'DELETE') {
		res.setHeader('Set-Cookie', [
			serialize('@tokenType', '', options),
			serialize('@initStateToken', '', options),
			serialize('@initStateUniqueID', '', options),
		]);
		return res.status(204);
		// res.end();
	}
	return res.status(400).json({ status: 'fail', message: 'Bad request happened!' });
}
