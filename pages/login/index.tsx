import React, { useEffect, useRef, useState } from "react";
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getUserIsLoggedIn } from '../../store/selectors';
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NextAuthOptions } from 'next-auth';
import { NextAuthHandler } from 'next-auth/core';
import { detectHost } from 'next-auth/utils/detect-host';
import { wrapper } from '../../store/store';
import { useRouter } from "next/router";
import { initAppCookieTokensAction, refreshAppTokenStatesAction } from "../../store/actions/_init/_initActions";
import { AppTokensCookieType } from "../../types/_init/_initTypes";
import { emptyInitStateUniqueID } from "../../store/slices/_init/_initSlice";

type Props = {
	pageProps: {
		csrfToken: string;
	};
	children?: React.ReactNode;
};

const Index: React.FC<Props> = (props: Props) => {
	const { data: session, status } = useSession();
	const loading = status === 'loading';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(getUserIsLoggedIn);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);
	const { csrfToken } = props.pageProps;
	// const rawLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	// 	e.preventDefault();
	// 	if (email.current && password.current) {
	// 		console.log('email : ', email.current.value);
	// 		console.log('password : ', password.current.value);
	// 		dispatch(accountPostLoginAction(email.current.value, password.current.value));
	// 	}
	// };

	useEffect(() => {
		console.log(session);
		console.log(isLoggedIn);
		if (session && !sessionUpdated) {
			dispatch(refreshAppTokenStatesAction(session));
			setSessionUpdated(true);
		}
	}, [session, isLoggedIn, sessionUpdated, dispatch]);

	const handleRawLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (email.current && password.current) {
			const res = await signIn('credentials', {
				email: email.current.value,
				password: password.current.value,
				redirect: false,
				// The page where you want to redirect to after a
				// successful login
				// callbackUrl: `${window.location.origin}/account_page`,
			}).then();
			/*
			error: null
			ok: true
			status: 200
			url: "http://localhost:3000/login"
			 */
			console.log(res);
		}
	};

	return (
		<>
			{loading && <h2>Loading....</h2>}
			{!loading && !session && (
				<>
					Not signed in <br />
					<button onClick={() => signIn('google')}>Sign in with google</button>
					<button onClick={() => signIn('facebook')}>Sign in with facebook</button>
					{/*<button onClick={() => signIn('credentials')}>Sign in with Raw email</button>*/}
					<form method="POST">
						<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
						<input type="email" ref={email} id="email" name="email" />
						<input type="password" ref={password} id="password" name="password" />
						<button onClick={(e) => handleRawLogin(e)}>Sign in with Raw email</button>
					</form>
					<pre>{!session && 'User is not logged in'}</pre>
				</>
			)}
			{!loading && session && (
				<>
					Signed in as {session.user?.email} <br />
					{/* TODO : Dispatch clear state tokens */}
					<button onClick={() => signOut()}>Sign out</button>
					{session.accessToken && <pre>User has access token = {`${session.accessToken}`}</pre>}
				</>
			)}
		</>
	);
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
	const csrfToken = await getCsrfToken(context);
	return { props: { csrfToken } };
}

export default Index;
