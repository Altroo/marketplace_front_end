import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });

	const options: CookieSerializeOptions = {
		httpOnly: true,
		secure: true,
		path: '/',
		expires: new Date(Date.now()),
		maxAge: 0,
		sameSite: "lax",
		domain: '.qaryb.com',
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
