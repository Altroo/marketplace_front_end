import NextAuth, { DefaultSession } from "next-auth"
import { tokenUser } from './_init/_initTypes';

export interface AuthInterface {
	user: tokenUser;
	accessToken: string;
	refreshToken: string;
	accessTokenExpiration: string;
	refreshTokenExpiration: string;
}

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: tokenUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: string;
		refreshTokenExpiration: string;
	}
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		user: tokenUser,
		access_token: string,
		access_token_expiration: string,
		refresh_token_expiration: string,
		refresh_token: string,
	}
	/**
	 * Usually contains information about the provider being used
	 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
	 */
	interface Account {
		provider: string,
		user: tokenUser,
		access_token: string,
		access_token_expiration: string,
		refresh_token_expiration: string,
		refresh_token: string,
	}
	// /** The OAuth profile returned from your provider */
	// interface Profile {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
		user: tokenUser,
    accessToken: string;
		refreshToken: string;
		accessTokenExpiration: string;
		refreshTokenExpiration: string;
  }
}