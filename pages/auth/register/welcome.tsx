import React from 'react';
import Styles from '../../../styles/auth/register/welcome.module.sass';
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import { GetServerSidePropsContext } from 'next';
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, AUTH_REGISTER, DASHBOARD } from "../../../utils/routes";
import SuccessIlluSVG from '../../../public/assets/images/success-illu.svg';
import { default as ImageFuture } from 'next/future/image';
import { Stack } from '@mui/material';
import PrimaryAnchorButton from '../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import Link from "next/link";

type Props = {
	children?: React.ReactNode;
};

const Welcome: React.FC<Props> = (props: Props) => {
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
						<h2 className={Styles.header}>Bienvenue dans la famille Qaryb !</h2>
						<p className={Styles.subHeader}>Pensez à activer votre compte pour finaliser votre inscription</p>
						<PrimaryAnchorButton buttonText="Aller au dashboard" active={true} nextPage={DASHBOARD} />
					</Stack>
				</AuthPageLayout>
			</div>
			<div className={Styles.mobileOnly}>
				<main className={Styles.main}>
					<Stack direction="column" justifyContent="space-between" className={Styles.rootStack}>
						<Stack
						direction="column"
						spacing={4}
						alignItems="center"
						>
							<ImageFuture src={SuccessIlluSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
							<h2 className={Styles.header}>Bienvenue dans la famille Qaryb !</h2>
							<p className={Styles.subHeader}>Pensez à activer votre compte pour finaliser votre inscription</p>
						</Stack>
						<div className={Styles.primaryButtonWrapper}>
							<PrimaryAnchorButton
								buttonText="Aller au dashboard"
								active={true}
								nextPage={DASHBOARD}
							/>
						</div>
					</Stack>
					<Stack direction="column" justifyContent="center" alignItems="center">
						<p className={Styles.bottomLinks}>
							Vous avez déjà un compte ?{' '}
							<Link passHref href={AUTH_LOGIN}>
								<a>Connectez-vous</a>
							</Link>
						</p>
					</Stack>
				</main>
			</div>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// checking if new added user
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				// case user already loggedIn show page.
				return {
					props: {},
				};
			}
		} else {
			// redirect to register page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_REGISTER,
				},
			};
		}
	} catch (e) {
		// redirect to register page.
		return {
			redirect: {
				permanent: false,
				destination: AUTH_REGISTER,
			},
		};
	}
}

export default Welcome;
