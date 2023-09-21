import React from 'react';
import Styles from '../../../styles/auth/reset-password/set-password.module.sass';
import {
	allowAnyInstance, Desktop,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	setFormikAutoErrors, TabletAndMobile
} from "../../../utils/helpers";
import { cookiesPoster, getApi, putApi } from "../../../store/services/_init/_initAPI";
import { AUTH_REGISTER, AUTH_RESET_PASSWORD, AUTH_RESET_PASSWORD_COMPLETE, DASHBOARD } from "../../../utils/routes";
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { passwordResetConfirmationSchema } from '../../../utils/formValidationSchemas';
import { coordonneeTextInputTheme } from '../../../utils/themes';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import CustomPasswordInput from '../../../components/formikElements/customPasswordInput/customPasswordInput';
import { GetServerSidePropsContext } from "next";
import { AccountGetCheckAccountResponseType } from "../../../types/account/accountTypes";
import { getCookie } from "cookies-next";
import UserMainNavigationBar from "../../../components/layouts/userMainNavigationBar/userMainNavigationBar";

const inputTheme = coordonneeTextInputTheme();

type setPasswordPageContentProps = {
	email: string;
	code: string;
};

const SetPasswordPageContent = (props: setPasswordPageContentProps) => {
	const { email, code } = props;

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			new_password: '',
			new_password2: '',
			globalError: '',
		},
		validateOnMount: true,
		validationSchema: passwordResetConfirmationSchema,
		onSubmit: async (values, { setFieldError, setSubmitting }) => {
			const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_RESET}`;
			try {
				const instance = allowAnyInstance();
				const response: ResponseOnlyInterface = await putApi(url, instance, {
					email: email,
					code: code,
					new_password: values.new_password,
					new_password2: values.new_password2,
				});
				if (response.status === 204) {
					cookiesPoster('/cookies', { pass_updated: 1 }).then(() => {
						router.push(AUTH_RESET_PASSWORD_COMPLETE).then();
					});
				}
			} catch (e) {
				setFormikAutoErrors({ e, setFieldError });
			}
			setSubmitting(false);
		},
	});

	return (
		<Stack direction="column" className={Styles.contentWrapper} spacing={6}>
			<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
				<span className={Styles.content}>
					Nouveau <br />
					mot de passe
				</span>
			</Stack>
			<form style={{ width: "100%"}} onSubmit={(e) => e.preventDefault()}>
				<Stack direction="column" spacing={4}>
					<Stack direction="column" spacing={2}>
					<CustomPasswordInput
						id="new_password"
						value={formik.values.new_password}
						onChange={formik.handleChange('new_password')}
						onBlur={formik.handleBlur('new_password')}
						helperText={formik.touched.new_password ? formik.errors.new_password : ''}
						error={formik.touched.new_password && Boolean(formik.errors.new_password)}
						fullWidth={false}
						size="medium"
						label="Mot de passe"
						placeholder="Mot de passe"
						cssClass={Styles.mobileInput}
						theme={inputTheme}
					/>
					<CustomPasswordInput
						id="new_password2"
						value={formik.values.new_password2}
						onChange={formik.handleChange('new_password2')}
						onBlur={formik.handleBlur('new_password2')}
						helperText={formik.touched.new_password2 ? formik.errors.new_password2 : ''}
						error={formik.touched.new_password2 && Boolean(formik.errors.new_password2)}
						fullWidth={false}
						size="medium"
						label="Confirmez mot de passe"
						placeholder="Confirmez mot de passe"
						cssClass={Styles.mobileInput}
						theme={inputTheme}
					/>
					</Stack>
					{formik.errors.globalError && <span className={Styles.errorMessage}>{formik.errors.globalError}</span>}
					<PrimaryButton
						buttonText="Modifier"
						active={formik.isValid && !formik.isSubmitting}
						onClick={formik.handleSubmit}
						cssClass={Styles.emailRegisterButton}
						type="submit"
					/>
				</Stack>
			</form>
		</Stack>
	);
};

type Props = {
	pageProps: {
		email: string;
		code: string;
	};
	children?: React.ReactNode;
};

const SetPassword: React.FC<Props> = (props: Props) => {
	const { email, code } = props.pageProps;
	return (
		<>
			<Desktop>
				<div>
					<AuthPageLayout href={AUTH_REGISTER} topBarText="CREATE">
					<SetPasswordPageContent email={email} code={code} />
				</AuthPageLayout>
				</div>

			</Desktop>
			<TabletAndMobile>
				<div style={{display: 'flex', width: '100%', height: '100%'}}>
				<main className={Styles.main}>
					<UserMainNavigationBar />
					<SetPasswordPageContent email={email} code={code} />
				</main>
				</div>
			</TabletAndMobile>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// redirect if user already logged in
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	const email = getCookie('@new_email', { req: context.req, res: context.res });
	const code = getCookie('@code', { req: context.req, res: context.res });
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					redirect: {
						permanent: false,
						destination: DASHBOARD,
					},
				};
			}
		} else {
			if (typeof email === 'string' && typeof code === 'string') {
				// access page with new email set.
				return {
					props: {
						email: email,
						code: code,
					},
				};
			} else {
				// email & code not passed, redirect back to previous page.
				return {
					redirect: {
						permanent: false,
						destination: AUTH_RESET_PASSWORD,
					},
				};
			}
		}
	} catch (e) {
		if (typeof email === 'string' && typeof code === 'string') {
			// access page with new email set.
			return {
				props: {
					email: email,
					code: code,
				},
			};
		} else {
			// email not passed, redirect back to previous page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_RESET_PASSWORD,
				},
			};
		}
	}
}

export default SetPassword;
