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

	// const options_two: CookieSerializeOptions = {
	// 	httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   path: "/",
  //   maxAge: 5,
  //   sameSite: "lax",
	// }

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
		// res.setHeader('Set-Cookie', [
		// 	serialize('@tokenType', '', options),
		// 	serialize('@initStateToken', '', options),
		// 	serialize('@initStateUniqueID', '', options),
		// ]);
		return res.status(200).json({ disconnected: true });
	}
	return res.status(400).json({ status: 'fail', message: 'Bad request happened!' });
}
