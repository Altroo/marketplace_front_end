// import NextAuth from 'next-auth';
// import FacebookProvider from 'next-auth/providers/facebook';
// import GoogleProvider from 'next-auth/providers/google';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import { allowAnyInstance } from "../../../utils/helpers";
// import { AccountPostFacebookResponseType, AccountPostGoogleResponseType } from "../../../types/account/accountTypes";
// import { postApi } from "../../../store/services/_init/_initAPI";
//
// const isJwtExpired = (token: string) => {
// 	// offset by 60 seconds, so we will check if the token is "almost expired".
// 	const currentTime = Math.round(Date.now() / 1000 + 60);
// 	const decoded = jwt.decode(token);
//
// 	console.log(`Current time + 60 seconds: ${new Date(currentTime * 1000)}`);
// 	console.log(`Token lifetime: ${new Date(decoded['exp'] * 1000)}`);
//
// 	if (decoded['exp']) {
// 		const adjustedExpiry = decoded['exp'];
//
// 		if (adjustedExpiry < currentTime) {
// 			console.log('Token expired');
// 			return true;
// 		}
//
// 		console.log('Token has not expired yet');
// 		return false;
// 	}
//
// 	console.log('Token["exp"] does not exist');
// 	return true;
// };
//
// export const makeUrl = (...endpoints: string[]) => {
// 	return endpoints.reduce((prevUrl, currentPath) => {
// 		if (prevUrl.length === 0) {
// 			return prevUrl + currentPath;
// 		}
//
// 		return prevUrl.endsWith('/') ? prevUrl + currentPath + '/' : prevUrl + '/' + currentPath + '/';
// 	}, '');
// };
//
// export const refreshToken = async function (refreshToken: string) {
// 	try {
// 		const response = await axios.post(
// 			// "http://localhost:8000/api/auth/token/refresh/",
// 			makeUrl(`${process.env.BACKEND_API_BASE}`, 'auth', 'token', 'refresh'),
// 			{
// 				refresh: refreshToken,
// 			},
// 		);
//
// 		const { access, refresh } = response.data;
// 		// still within this block, return true
// 		return [access, refresh];
// 	} catch {
// 		return [null, null];
// 	}
// };
//
// export default NextAuth({
// 	providers: [
// 		FacebookProvider({
// 			clientId: `${process.env.FACEBOOK_ID}`,
// 			clientSecret: `${process.env.FACEBOOK_SECRET}`,
// 		}),
// 		GoogleProvider({
// 			clientId: `${process.env.GOOGLE_ID}`,
// 			clientSecret: `${process.env.GOOGLE_SECRET}`,
// 		}),
// 	],
// 	secret: process.env.SECRET,
// 	session: {
// 		strategy: 'jwt',
// 		maxAge: 30 * 24 * 60 * 60, // 30 days
// 	},
// 	jwt: {
// 		secret: process.env.SECRET,
// 	},
// 	pages: {
// 		signIn: '/login/index',
// 	},
// 	callbacks: {
// 		async signIn({ user, account, profile, email, credentials }) {
// 			if (account.provider === 'google') {
// 				// extract needed tokens
// 				const { access_token, id_token } = account;
// 				// send a POST request
// 				const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GOOGLE}`;
// 				try {
// 					const instance = allowAnyInstance();
// 					const response: AccountPostGoogleResponseType = await postApi(url, instance, {
// 						access_token: access_token,
// 						id_token: id_token,
// 					});
// 					account.accessToken = response.data.access_token;
// 					return true;
// 				} catch (e) {
// 					return false;
// 				}
// 			} else if (account.provider === 'facebook') {
// 				// extract needed tokens
// 				const { access_token, id_token } = account;
// 				// send a POST request
// 				const url = `${process.env.NEXT_PUBLIC_ACCOUNT_FACEBOOK}`;
// 				try {
// 					const instance = allowAnyInstance();
// 					const response: AccountPostFacebookResponseType = await postApi(url, instance, {
// 						access_token: access_token,
// 						id_token: id_token,
// 					});
// 					account.accessToken = response.data.access_token;
// 					return true;
// 				} catch (e) {
// 					return false;
// 				}
// 			}
// 			return false;
// 		},
// 		async jwt({token, user, account, profile, isNewUser}) {
// 			// user just signed in
// 			if (user) {
// 				// may have to switch it up a bit for other providers
// 				if (account.provider === 'google') {
// 					// extract these two tokens
// 					const { access_token, id_token } = account;
//
// 					// make a POST request to the DRF backend
// 					try {
// 						const response = await axios.post(
// 							// tip: use a seperate .ts file or json file to store such URL endpoints
// 							// "http://127.0.0.1:8000/api/social/login/google/",
// 							makeUrl(process.env.BACKEND_API_BASE, 'social', 'login', account.provider),
// 							{
// 								access_token: access_token, // note the differences in key and value variable names
// 								id_token: id_token,
// 							},
// 						);
//
// 						// extract the returned token from the DRF backend and add it to the `user` object
// 						const { access_token, refresh_token } = response.data;
// 						// reform the `token` object from the access token we appended to the `user` object
// 						token = {
// 							...token,
// 							accessToken: access_token,
// 							refreshToken: refresh_token,
// 						};
//
// 						return token;
// 					} catch (error) {
// 						return null;
// 					}
// 				}
// 			}
//
// 			// user was signed in previously, we want to check if the token needs refreshing
// 			// token has been invalidated, try refreshing it
// 			if (isJwtExpired(token.accessToken as string)) {
// 				const [newAccessToken, newRefreshToken] = await refreshToken(token.refreshToken);
//
// 				if (newAccessToken && newRefreshToken) {
// 					token = {
// 						...token,
// 						accessToken: newAccessToken,
// 						refreshToken: newRefreshToken,
// 						iat: Math.floor(Date.now() / 1000),
// 						exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
// 					};
//
// 					return token;
// 				}
//
// 				// unable to refresh tokens from DRF backend, invalidate the token
// 				return {
// 					...token,
// 					exp: 0,
// 				};
// 			}
//
// 			// token valid
// 			return token;
// 		},
// 		async session({ session, token, user }) {
// 			session.accessToken = token.accessToken
//       return session
// 		},
// 	},
// 	// Events are useful for logging
// 	// https://next-auth.js.org/configuration/events
// 	events: {},
// 	// Enable debug messages in the console if you are having problems
// 	debug: process.env.NODE_ENV === 'development',
// });
// @ts-ignore
{}