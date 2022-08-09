import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../utils/cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const query = req.body;
		console.log(query);
		const obj = JSON.parse(query);
		setCookie(res, 'Token', obj.token, { maxAge: obj.maxAge, secure: true, httpOnly: true });
		res.end(res.getHeader('Set-Cookie'));
	} else if (req.method === 'GET') {
		res.status(200).json({
			cookies: req.cookies,
		});
	}
}
