import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const options: CookieSerializeOptions = {
		httpOnly: true,
		secure: true,
		path: '/',
		expires: new Date(Date.now()),
		maxAge: 0,
		sameSite: "lax",
	};

	if (req.method === 'POST' && req.body.tokens) {
		res.setHeader("Set-Cookie", [
      serialize("@tokenType", "false", {
        ...options
      }),
			serialize("@initStateToken", "false", {
        ...options
      }),
			serialize("@initStateUniqueID", "false", {
        ...options
      }),
    ]);
		res.status(204);
		res.end();
	}
}
