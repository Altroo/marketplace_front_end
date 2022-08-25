import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
	OFFER_ROUTE,
	SHOP_ADD_AVATAR,
	SHOP_ADD_COLOR,
	SHOP_ADD_FONT,
	SHOP_ADD_SHOP_NAME,
	SHOP_EDIT_INDEX
} from "./utils/routes";

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
	if (req.nextUrl.pathname.endsWith(SHOP_ADD_AVATAR)) {
		return redirectFunc(req, '@shop_name', SHOP_ADD_SHOP_NAME);
	}
	if (req.nextUrl.pathname.endsWith(SHOP_ADD_COLOR)) {
		return redirectFunc(req, '@avatar', SHOP_ADD_AVATAR);
	}
	if (req.nextUrl.pathname.endsWith(SHOP_ADD_FONT)) {
		return redirectFunc(req, '@color_code', SHOP_ADD_COLOR);
	}
	if (req.nextUrl.pathname.endsWith(SHOP_ADD_FONT)) {
		return redirectFunc(req, '@bg_color_code', SHOP_ADD_COLOR);
	}
	// if added shop cookie tokenType doesn't exist redirect to create shop else to shop details page.
	if (
		req.nextUrl.pathname.endsWith(SHOP_EDIT_INDEX) ||
		req.nextUrl.pathname.endsWith(`${SHOP_EDIT_INDEX}?created=true`) ||
		req.nextUrl.pathname.includes(OFFER_ROUTE)
	) {
		if (typeof req.cookies.get('@tokenType') == 'undefined' || req.cookies.get('@tokenType') === null) {
			return NextResponse.redirect(new URL(SHOP_ADD_SHOP_NAME, req.url));
		} else {
			return res;
		}
	}
	return res;
}

export const config = {
	matcher: [SHOP_ADD_SHOP_NAME, `${SHOP_ADD_SHOP_NAME}/:path*`, SHOP_EDIT_INDEX, `${OFFER_ROUTE}:path*`],
};
