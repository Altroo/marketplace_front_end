import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { DASHBOARD_ACCOUNT, DASHBOARD_EDIT_PROFILE } from "./utils/routes";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		// console.log(req.nextauth.token);
		// redirect to dashboard/compte/edit-profil when accessing dashboard/compte <- since doesn't have an index page.
		if (req.nextUrl.pathname === DASHBOARD_ACCOUNT) {
			return NextResponse.redirect(new URL(DASHBOARD_EDIT_PROFILE, req.url));
		}
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				return !!token;
			},
		},
	},
);

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/shop/create/:path*',
	]
};
