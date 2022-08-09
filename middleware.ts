import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectFunc = (req: NextRequest, cookieName: string, redirectTo: string) => {
	const res = NextResponse.next();
	const cookie = req.cookies.get(cookieName);
	if (!cookie) {
		return NextResponse.redirect(new URL(redirectTo, req.url));
	}
	return res;
};

export function middleware(req: NextRequest) {
	const res = NextResponse.next();
	// For user create new shop
	if (req.nextUrl.pathname.endsWith('/avatar')) {
		return redirectFunc(req, '@shop_name', '/shop/add');
	}
	if (req.nextUrl.pathname.endsWith('/color')) {
		return redirectFunc(req, '@avatar', '/shop/add/avatar');
	}
	if (req.nextUrl.pathname.endsWith('/font')) {
		return redirectFunc(req, '@color_code', '/shop/add/color');
	}
	if (req.nextUrl.pathname.endsWith('/font')) {
		return redirectFunc(req, '@bg_color_code', '/shop/add/color');
	}
	return res;
}

export const config = {
	matcher: ['/shop/add', '/shop/add/:path*'],
};
