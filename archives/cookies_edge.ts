// @ts-ignore
// eslint-disable-next-line no-empty
{}
// import { setCookieV2 } from "../../utils/cookies";
// import type { NextRequest, NextResponse } from 'next/server';
//
// export const config = {
// 	runtime: 'experimental-edge',
// };
//
// export default async function handler(req: NextRequest) {
// 	if (req.method === 'POST') {
// 		console.log('POST received');
// 		// console.log('POST req : ', req);
// 		// console.log('POST res : ', res);
// 		console.log();
// 		const options = {
// 			httpOnly: true,
// 			secure: true,
// 			path: '/',
// 			maxAge: 86400,
// 			sameSite: 'lax' as "lax",
// 			// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
// 		};
// 		const query = await req.json();
// 		console.log('Query received : ', query);
// 		// Store Name
// 		// let headers = req.headers;
// 		if ('shop_name' in query) {
// 			console.log('shop_name is in query');
// 			const updated_headers = setCookieV2('@shop_name', query.shop_name, {
// 				...options,
// 			});
// 			req.headers.set('Set-Cookie', updated_headers)
// 		}
// 		return new Response(null, {
// 			status: 204,
// 			headers: req.headers,
// 		});
// 	}
// }
