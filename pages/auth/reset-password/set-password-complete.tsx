import React from 'react';
import Styles from '../../../styles/auth/reset-password/set-password-complete.module.sass';
import { GetServerSidePropsContext } from 'next';
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import { Stack } from '@mui/material';
import { default as ImageFuture } from 'next/future/image';
import SuccessIlluSVG from '../../../public/assets/images/success-illu.svg';
import PrimaryAnchorButton from '../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import { AUTH_LOGIN, AUTH_REGISTER, DASHBOARD } from '../../../utils/routes';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';

type Props = {
	children?: React.ReactNode;
};

const SetPasswordComplete: React.FC<Props> = (props: Props) => {
	return (
		<>
			<div className={Styles.desktopOnly}>
				<AuthPageLayout href="/" topBarText="CONNECT">
					<Stack
						direction="column"
						spacing={4}
						justifyContent="center"
						alignItems="center"
						className={Styles.rootStack}
					>
						<ImageFuture src={SuccessIlluSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
						<h2 className={Styles.header}>Mot de passe modifié</h2>
						<p className={Styles.subHeader}>Votre mot de passe a été modifier, connectez-vous</p>
						<PrimaryAnchorButton buttonText="Me connecter" active={true} nextPage={AUTH_LOGIN} />
					</Stack>
				</AuthPageLayout>
			</div>
			<div className={Styles.mobileOnly}>
				<main className={Styles.main}>
					<Stack direction="column" justifyContent="space-between" className={Styles.rootStack}>
						<Stack direction="column" spacing={4} alignItems="center">
							<ImageFuture src={SuccessIlluSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
							<h2 className={Styles.header}>Mot de passe modifié</h2>
							<p className={Styles.subHeader}>Votre mot de passe a été modifier, connectez-vous</p>
						</Stack>
						<div className={Styles.primaryButtonWrapper}>
							<PrimaryAnchorButton buttonText="Me connecter" active={true} nextPage={AUTH_LOGIN} />
						</div>
					</Stack>
					<Stack direction="column" justifyContent="center" alignItems="center">
						<p className={Styles.bottomLinks}>
							Pas encore de compte ?{' '}
							<Link passHref href={AUTH_REGISTER}>
								<a href={AUTH_REGISTER}>Inscrivez-vous</a>
							</Link>
						</p>
					</Stack>
				</main>
			</div>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const pass_updated = getCookie('@pass_updated', { req: context.req, res: context.res });
	if (pass_updated) {
		// show the page
		return {
			props: {},
		};
	} else {
		// pass updated not set
		const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
		const appToken = getServerSideCookieTokens(context);
		try {
			if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
				const instance = isAuthenticatedInstance(appToken.initStateToken);
				const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
				if (response.status === 200) {
					// user already loggedIn
					return {
						redirect: {
							permanent: false,
							destination: DASHBOARD,
						},
					};
				}
			} else {
				return {
					redirect: {
						permanent: false,
						destination: AUTH_LOGIN,
					},
				};
			}
		} catch (e) {
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	}
}

export default SetPasswordComplete;
