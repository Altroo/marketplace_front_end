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
	// if added shop cookie tokenType doesn't exist redirect to create shop else to shop details page.
	if (req.nextUrl.pathname.endsWith('/edit') || (req.nextUrl.pathname.endsWith('/edit?created=true'))) {
		if (typeof req.cookies.get('@tokenType') == 'undefined' || req.cookies.get('@tokenType') === null) {
			return NextResponse.redirect(new URL('/shop/add', req.url));
		} else {
			return res;
		}
	}
	return res;
}

export const config = {
	matcher: ['/shop/add', '/shop/add/:path*', '/shop/edit'],
};
