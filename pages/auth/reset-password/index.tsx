import React from 'react';
import Styles from '../../../styles/auth/reset-password/reset-password.module.sass';
import { GetServerSidePropsContext } from 'next';
import {
	allowAnyInstance,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	setFormikAutoErrors,
} from '../../../utils/helpers';
import { AccountGetCheckAccountResponseType, AccountPostLoginResponseType } from '../../../types/account/accountTypes';
import { cookiesPoster, getApi, postApi } from "../../../store/services/_init/_initAPI";
import {
	AUTH_REGISTER,
	AUTH_RESET_PASSWORD_ENTER_CODE,
	DASHBOARD
} from "../../../utils/routes";
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { emailSchema } from '../../../utils/formValidationSchemas';
import { coordonneeTextInputTheme } from '../../../utils/themes';
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import UserMainNavigationBar from "../../../components/layouts/userMainNavigationBar/userMainNavigationBar";

const ResetPasswordPageContent = () => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validateOnMount: true,
		validationSchema: emailSchema,
		onSubmit: async (values, { setFieldError, setSubmitting }) => {
			setSubmitting(false);
			const url = `${process.env.NEXT_PUBLIC_ACCOUNT_SEND_PASSWORD_RESET}`;
			try {
				const instance = allowAnyInstance();
				const response: AccountPostLoginResponseType = await postApi(url, instance, {
					email: values.email,
				});
				if (response.status === 204) {
					setSubmitting(true);
					cookiesPoster("/cookies", { new_email: values.email }).then(() => {
						router.push(AUTH_RESET_PASSWORD_ENTER_CODE).then();
					});
				}
			} catch (e) {
				setFormikAutoErrors({ e, setFieldError });
			}
		},
	});

	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.contentWrapper} spacing={4}>
			<Stack direction="column" spacing={1}>
				<Stack direction="column">
					<span className={Styles.content}>Récupération</span>
					<span className={Styles.subContent}>du mot de passe</span>
				</Stack>
				<span className={Styles.paragraphe}>
					Entrez votre email pour recevoir un code et modifier votre mot de passe.
				</span>
			</Stack>
			<form>
				<Stack direction="column" spacing={4}>
					<CustomTextInput
						id="email"
						value={formik.values.email}
						onChange={formik.handleChange('email')}
						onBlur={formik.handleBlur('email')}
						helperText={formik.touched.email ? formik.errors.email : ''}
						error={formik.touched.email && Boolean(formik.errors.email)}
						fullWidth={false}
						size="medium"
						type="email"
						label="Adresse email"
						placeholder="Adresse email"
						cssClass={Styles.mobileEmailInput}
						theme={inputTheme}
					/>
					<PrimaryButton
						buttonText="Modifier mot de passe"
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
	children?: React.ReactNode;
};

const ResetPassword: React.FC<Props> = (props: Props) => {
	return (
		<>
			<div className={Styles.desktopOnly}>
				<AuthPageLayout href={AUTH_REGISTER} topBarText="CREATE">
					<ResetPasswordPageContent />
				</AuthPageLayout>
			</div>
			<div className={Styles.mobileOnly}>
				<main className={Styles.main}>
					<Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100vh' }}>
						<UserMainNavigationBar/>
						<ResetPasswordPageContent />
						<Stack direction="column" justifyContent="center" alignItems="center">
							<p className={Styles.bottomLinks}>
								Pas encore de compte ?{' '}
								<Link passHref href={AUTH_REGISTER}>
									<a href={AUTH_REGISTER}>Inscrivez-vous</a>
								</Link>
							</p>
						</Stack>
					</Stack>
				</main>
			</div>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// redirect if user already logged in
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
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
			// access reset password page
			return { props: {} };
		}
	} catch (e) {
		// access reset password page
		return { props: {} };
	}
}

export default ResetPassword;
