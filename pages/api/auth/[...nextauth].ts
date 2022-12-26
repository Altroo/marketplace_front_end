import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { allowAnyInstance, emptyRemoteCookiesUniqueIDOnly } from "../../../utils/helpers";
import {
	AccountPostFacebookResponseType,
	AccountPostGoogleResponseType,
	AccountPostLoginFixNextAuthResponseType
} from "../../../types/account/accountTypes";
import { postApi } from "../../../store/services/_init/_initAPI";
import { NextApiRequest, NextApiResponse } from "next";
import {
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	tokenUser
} from "../../../types/_init/_initTypes";
import { emptyInitStateUniqueID } from "../../../store/slices/_init/_initSlice";
import { setAuthTokenCookie } from "../../../utils/cookies";
import axios from "axios";
import NextCors from "nextjs-cors";

const getOptions = (req: NextApiRequest, res: NextApiResponse) => {
	return {
		// https://next-auth.js.org/configuration/providers
		providers: [
			FacebookProvider({
				idToken: true,
				clientId: `${process.env.FACEBOOK_ID}`,
				clientSecret: `${process.env.FACEBOOK_SECRET}`,
				checks: ["pkce", "state"],
				token: {
					url: "https://graph.facebook.com/oauth/access_token",
					async request(context) {
						// request to https://graph.facebook.com/oauth/access_token?code_verifier=""&code=""&client_id=""&redirect_uri=""&client_secret=""
						const response = await axios.get("https://graph.facebook.com/oauth/access_token", {
							params: {
								code_verifier: context.checks.code_verifier,
								code: context.params.code,
								client_id: context.provider.clientId,
								redirect_uri: context.provider.callbackUrl,
								client_secret: context.provider.clientSecret
							}
						});

						const tokens = response.data;
						return { tokens };
					}
				}
			}),
			GoogleProvider({
				idToken: true,
				checks: ["pkce", "state"],
				clientId: `${process.env.GOOGLE_ID}`,
				clientSecret: `${process.env.GOOGLE_SECRET}`,
				authorization: {
					params: {
						prompt: "consent",
						access_type: "offline",
						response_type: "code"
					}
				}
			}),
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				name: "credentials",
				type: "credentials",
				// The credentials is used to generate a suitable form on the sign in page.
				// You can specify whatever fields you are expecting to be submitted.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {
					email: { label: "Email", type: "email", placeholder: "email" },
					password: { label: "Password", type: "password", placeholder: "password" }
				},
				async authorize(credentials) {
					const email = credentials?.email;
					const password = credentials?.password;
					const url = `${process.env.NEXT_PUBLIC_ACCOUNT_LOGIN}`;
					try {
						const instance = allowAnyInstance();
						const response: AccountPostLoginFixNextAuthResponseType = await postApi(url, instance, {
							email: email,
							password: password
						});
						if (response.status === 200) {
							// set localStorage token only
							// setRemoteCookiesTokenOnly(response.data);
							emptyRemoteCookiesUniqueIDOnly();
							return response.data;
						}
					} catch (e) {
						// const errors = e as ApiErrorResponseType;
						return null;
					}
					return null;
				}
			})
		],
		// The secret should be set to a reasonably long random string.
		// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
		// a separate secret is defined explicitly for encrypting the JWT.
		secret: process.env.NEXTAUTH_SECRET,

		session: {
			// Use JSON Web Tokens for session instead of database sessions.
			// This option can be used with or without a database for users/accounts.
			// Note: `strategy` should be set to 'jwt' if no database is used.
			strategy: "jwt",

			// Seconds - How long until an idle session expires and is no longer valid.
			maxAge: 30 * 24 * 60 * 60 // 30 days

			// Seconds - Throttle how frequently to write to database to extend a session.
			// Use it to limit write operations. Set to 0 to always update the database.
			// Note: This option is ignored if using JSON Web Tokens
			// updateAge: 24 * 60 * 60, // 24 hours
		},

		// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
		// option is set - or by default if no database is specified.
		// https://next-auth.js.org/configuration/options#jwt
		jwt: {
			maxAge: 30 * 24 * 60 * 60 // 30 days
			// A secret to use for key generation (you should set this explicitly)
			// secret: process.env.NEXTAUTH_SECRET
			// Set to true to use encryption (default: false)
			// encryption: true,
			// You can define your own encode/decode functions for signing and encryption
			// if you want to override the default behaviour.
			// encode: async ({ secret, token, maxAge }) => {},
			// decode: async ({ secret, token, maxAge }) => {},
		},

		// You can define custom pages to override the built-in ones. These will be regular Next.js pages
		// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
		// The routes shown here are the default URLs that will be used when a custom
		// pages is not specified for that route.
		// https://next-auth.js.org/configuration/pages
		pages: {
			signIn: "/auth/register", // Displays signin buttons
			// signOut: '/auth/signout', // Displays form with sign out button
			error: "/auth/login" // Error code passed in query string as ?error=
			// verifyRequest: '/auth/verify-request', // Used for check email page
			// newUser: null // If set, new users will be directed here on first sign in
		},

		// Callbacks are asynchronous functions you can use to control what happens
		// when an action is performed.
		// https://next-auth.js.org/configuration/callbacks
		callbacks: {
			async signIn({ user, account, profile, email, credentials }) {
				if (account) {
					if (account && account.provider === "google") {
						// extract needed tokens
						const { access_token, id_token } = account;
						// send a POST request
						const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GOOGLE}`;
						try {
							const instance = allowAnyInstance();
							const response: AccountPostGoogleResponseType = await postApi(url, instance, {
								access_token: access_token,
								id_token: id_token
							});
							account.user = response.data.user;
							account.access_token = response.data.access_token as string;
							account.refresh_token = response.data.refresh_token as string;
							account.access_token_expiration = response.data.access_token_expiration as string;
							account.refresh_token_expiration = response.data.refresh_token_expiration as string;
							return true;
						} catch (e) {
							// return e as ApiErrorResponseType;
							return false;
						}
					} else if (account.provider === "facebook") {
						// extract needed tokens
						const { access_token, id_token } = account;
						// send a POST request
						const url = `${process.env.NEXT_PUBLIC_ACCOUNT_FACEBOOK}`;
						try {
							const instance = allowAnyInstance();
							const response: AccountPostFacebookResponseType = await postApi(url, instance, {
								access_token: access_token,
								id_token: id_token
							});
							account.user = response.data.user;
							account.access_token = response.data.access_token;
							account.refresh_token = response.data.refresh_token;
							account.access_token_expiration = response.data.access_token_expiration;
							account.refresh_token_expiration = response.data.refresh_token_expiration;
							return true;
						} catch (e) {
							return false;
						}
					} else if (account.provider === "credentials") {
						// login handled in authorize
						account.user = user.user;
						account.access_token = user.access_token;
						account.refresh_token = user.refresh_token;
						account.access_token_expiration = user.access_token_expiration;
						account.refresh_token_expiration = user.refresh_token_expiration;
						return true;
					}
					return false;
				}
				return false;
			},
			// async redirect({ url, baseUrl }) {
			// 	// Allows relative callback URLs
			// 	if (url.startsWith('/')) return `${baseUrl}${url}`;
			// 	// Allows callback URLs on the same origin
			// 	else if (new URL(url).origin === baseUrl) return url;
			// 	return baseUrl;
			// },
			async jwt({ token, user, account, profile, isNewUser }) {
				const options = {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					path: "/",
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				};
				if (account) {
					token.accessToken = account.access_token;
					token.accessTokenExpiration = account.access_token_expiration;
					token.refreshTokenExpiration = account.refresh_token_expiration;
					token.refreshToken = account.refresh_token;
					token.user = account.user as tokenUser;
					const newInitStateToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
						tokenType: "TOKEN",
						initStateToken: {
							user: account.user,
							access_token: account.access_token as string,
							refresh_token: account.refresh_token as string,
							access_token_expiration: account.access_token_expiration as string,
							refresh_token_expiration: account.refresh_token_expiration as string
						},
						initStateUniqueID: emptyInitStateUniqueID
					};
					setAuthTokenCookie(res, newInitStateToken, {
						maxAge: 30 * 24 * 60 * 60, // 30 days
						sameSite: 'lax',
						...options
					});
				}
				return token;
			},
			async session({ session, token }) {
				session.accessToken = token.accessToken;
				session.refreshToken = token.refreshToken;
				session.accessTokenExpiration = token.accessTokenExpiration;
				session.refreshTokenExpiration = token.refreshTokenExpiration;
				session.user = token.user;
				return session;
			}
		},

		// Events are useful for logging
		// https://next-auth.js.org/configuration/events
		events: {},
		cookies: {
			sessionToken: {
				name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
				options: {
					httpOnly: true,
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			},
			callbackUrl: {
				name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.callback-url`,
				options: {
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			},
			csrfToken: {
				name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`,
				options: {
					httpOnly: true,
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			},
			pkceCodeVerifier: {
				name: "next-auth.pkce.code_verifier",
				options: {
					httpOnly: true,
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 900,
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			},
			state: {
				name: "next-auth.state",
				options: {
					httpOnly: true,
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 900,
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			},
			nonce: {
				name: "next-auth.nonce",
				options: {
					httpOnly: true,
					sameSite: 'lax',
					path: "/",
					secure: process.env.NODE_ENV !== 'development',
					// domain: `${process.env.NEXT_BACKEND_DOMAIN}`,
				}
			}
		},
		// Enable debug messages in the console if you are having problems
		debug: process.env.NODE_ENV !== "production"
	} as NextAuthOptions;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: process.env.NODE_ENV !== "production" ? '*' : ['https://www.qaryb.com', 'https://qaryb.com', 'https://dev.qaryb.com'],
      optionsSuccessStatus: 200, //
   });
	NextAuth(req, res, getOptions(req, res));
};

export default handler;
