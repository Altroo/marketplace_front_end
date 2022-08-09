import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import { setCookie, getCookie } from 'cookies-next';

/*** Note Runs First **/
/** TODO 1 : redirect if cookie aren't set & if path starts with **/
/*
    Steps :
        step 1 : Get Cookie
        step 2 : if not cookie & path starts with => redirect.
 */
export function middleware(request: NextRequest) {
    // const response = NextResponse.next();
    // console.log('before context ?');
    /*response.cookies.set('new_cookie_from_middleware', 'cookie_from_middleware_value', {
        httpOnly: true, sameSite: 'lax', secure: true
    });
    const cookie = request.cookies.get('new_cookie_from_middleware');
    console.log(cookie);*/
    // const context_cookie = request.cookies.get('cookie_from_context_two');
    // console.log(context_cookie);
    // const allCookies = request.cookies.entries();
    // console.log(allCookies);
    // const cookie = getCookies();
    /*const allCookies = request.cookies.entries();
    console.log('AllCookies from middleware is : ');
    console.log(allCookies);
    setCookie('new_cookie_from_middleware', 'cookie_from_middleware_value', { response, request });
    // setCookie('key', 'value', { response, request });
    const new_cookie = getCookie('new_cookie_from_middleware');
    console.log(new_cookie);
    const context_cookie = getCookie('cookie_from_context', { response, request });
    console.log(context_cookie);*/
    /*if (request.nextUrl.pathname.startsWith('/blabla')) {
        return NextResponse.redirect(new URL('/about-2', request.url));
    }*/
    // return response;
}