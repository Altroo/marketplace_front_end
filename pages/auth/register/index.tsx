import React, { useEffect, useState } from 'react';
import Styles from '../../../styles/auth/register/register.module.sass';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useAppDispatch } from '../../../utils/hooks';
import { refreshAppTokenStatesAction } from '../../../store/actions/_init/_initActions';
import { Stack, Theme } from '@mui/material';
// import GoogleSignInButton from '../../../components/htmlElements/buttons/googleSignInButton/googleSignInButton';
import FacebookSignInButton from '../../../components/htmlElements/buttons/facebookSignInButton/facebookSignInButton';
import Divider from '@mui/material/Divider';
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import { coordonneeTextInputTheme } from '../../../utils/themes';
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import {
	allowAnyInstance, Desktop,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	setFormikAutoErrors, TabletAndMobile
} from "../../../utils/helpers";
import { cookiesPoster, getApi, postApi } from '../../../store/services/_init/_initAPI';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { useFormik } from 'formik';
import { emailSchema } from '../../../utils/formValidationSchemas';
import {
	AUTH_REGISTER_ABOUT_PAGE,
	AUTH_FB_EMAIL_MISSING,
	AUTH_LOGIN,
	AUTH_WELCOME,
	CGU_PAGE,
} from '../../../utils/routes';
import { ResponseOnlyInterface } from '../../../types/_init/_initTypes';
import Link from 'next/link';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { CGUCheckBox } from '../../../components/htmlElements/checkBoxes/checkBox';
import PrimaryLoadingButton from "../../../components/htmlElements/buttons/primaryLoadingButton/primaryLoadingButton";

const emailTheme = coordonneeTextInputTheme();

type registerPageContentProps = {
	googleSignIn: () => void;
	facebookSignIn: () => void;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string | Array<string>;
	validationError?: boolean;
	helperText?: string;
	Theme: Theme;
	isValid: boolean;
	isSubmitting: boolean;
	handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
	cguCheckbox: boolean;
	setCguCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
	isSubmitLoading: boolean;
};

const RegisterPageContent = (props: registerPageContentProps) => {
	return (
		<Stack direction="column" spacing={4} className={Styles.contentWrapper}>
			<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
				<h2 className={Styles.content}>Inscription</h2>
				<p className={Styles.subHeader}>Inscrivez vous pour créer votre boutique. ça ne prend que quelques secondes.</p>
			</Stack>
			<Stack direction="column" spacing={2} className={Styles.mobileWidth}>
				{/*<GoogleSignInButton onClick={props.googleSignIn} />*/}
				<FacebookSignInButton onClick={props.facebookSignIn} />
				{props.error && <span className={Styles.errorMessage}>{props.error}</span>}
			</Stack>
			<Divider orientation="horizontal" flexItem className={Styles.divider} />
			<form style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
				<Stack direction="column" spacing="24px">
					<CustomTextInput
						id="email"
						value={props.value}
						onChange={props.onChange}
						onBlur={props.onBlur}
						helperText={props.helperText}
						error={props.validationError}
						theme={props.Theme}
						type="email"
						placeholder="Adresse email"
						label="Adresse email"
						fullWidth={false}
						size="medium"
						// cssClass={Styles.emailInputField}
					/>
					<p className={Styles.cguParagraphe}>
						Conformément à la loi 09-08, vous disposez d&apos;un droit d&apos;accès, de rectification et
						d&apos;opposition au traitement de vos données personnelles. Ce traitement a été autorisé par la CNDP sous
						le numéro D-GC-158/2016.
					</p>
					<Stack direction="row" justifyContent="space-between">
						<CGUCheckBox
							checked={props.cguCheckbox}
							active={true}
							text=""
							labelcssStyles={{
								alignItems: 'flex-start',
								height: '100%',
							}}
							onChange={props.setCguCheckBox}
						>
							<span className={Styles.cguCheckBoxText}>
								J&apos;ai lu et j&apos;accepte les{' '}
								<Link href={CGU_PAGE} className={Styles.cguUnderlineBlue} target="_blank" rel="noreferrer">
									Conditions générales d&apos;utilisation
								</Link>
								, notament la mention relative à la protection des données.
							</span>
						</CGUCheckBox>
					</Stack>
					<PrimaryLoadingButton buttonText="S'inscrire"
						active={props.isValid && !props.isSubmitting && props.cguCheckbox}
						onClick={props.handleSubmit}
						cssClass={Styles.emailRegisterButton}
						type="submit"
						loading={props.isSubmitLoading}
					/>
				</Stack>
			</form>
		</Stack>
	);
};

const Register: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { error } = router.query;
	const [errorState, setErrorState] = useState<string | Array<string> | undefined>(undefined);
	const dispatch = useAppDispatch();
	const loading = status === 'loading';
	const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
	// const authenticated = status === 'authenticated';
	// const unauthenticated = status === 'unauthenticated';
	const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);
	const [cguCheckBox, setCguCheckBox] = useState<boolean>(false);

	useEffect(() => {
		if (session && !sessionUpdated) {
			dispatch(refreshAppTokenStatesAction(session));
			setSessionUpdated(true);
		}
		if (error === 'AccessDenied') {
			setErrorState('Service non disponible.');
		} else {
			setErrorState(error);
		}
	}, [dispatch, error, session, sessionUpdated]);

	const googleSignIn = () => {
		// redirect to the same page that will then check if user is new or old
		signIn('google').then();
	};

	const facebookSignIn = () => {
		// redirect to the same page that will then check if user is new or old
		signIn('facebook').then();
	};
	// via email
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validateOnMount: true,
		validationSchema: emailSchema,
		onSubmit: async (values, { setFieldError, setSubmitting }) => {
			setIsSubmitLoading(true);
			const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_EMAIL}`;
			try {
				const instance = allowAnyInstance();
				const response: ResponseOnlyInterface = await postApi(url, instance, { email: values.email });
				if (response.status === 204) {
					cookiesPoster('/cookies', { new_email: values.email }).then(() => {
						router.push(AUTH_REGISTER_ABOUT_PAGE).then(() => {
							setIsSubmitLoading(false);
						});
					});
				}
			} catch (e) {
				setFormikAutoErrors({ e, setFieldError });
			}
			setSubmitting(false);
			setIsSubmitLoading(false);
		},
	});

	return (
		<>
			{!loading && !session && (
				<>
					<Desktop>
						<div>
							<AuthPageLayout href={AUTH_LOGIN} topBarText="CONNECT">
							<RegisterPageContent
								Theme={emailTheme}
								facebookSignIn={facebookSignIn}
								googleSignIn={googleSignIn}
								handleSubmit={(e) => {
									e?.preventDefault();
									formik.handleSubmit();
								}}
								isSubmitting={formik.isSubmitting}
								isValid={formik.isValid}
								onBlur={formik.handleBlur('email')}
								onChange={formik.handleChange('email')}
								value={formik.values.email}
								error={errorState}
								helperText={formik.touched.email ? formik.errors.email : ''}
								validationError={formik.touched.email && Boolean(formik.errors.email)}
								cguCheckbox={cguCheckBox}
								setCguCheckBox={setCguCheckBox}
								isSubmitLoading={isSubmitLoading}
							/>
						</AuthPageLayout>
						</div>
					</Desktop>
					<TabletAndMobile>
						<div style={{display: 'flex', width: '100%', height: '100%'}}>
							<main className={Styles.main}>
							<Stack direction="column" justifyContent="space-between">
								<UserMainNavigationBar />
								<RegisterPageContent
									Theme={emailTheme}
									facebookSignIn={facebookSignIn}
									googleSignIn={googleSignIn}
									handleSubmit={(e) => {
										e?.preventDefault();
										formik.handleSubmit();
									}}
									isSubmitting={formik.isSubmitting}
									isValid={formik.isValid}
									onBlur={formik.handleBlur('email')}
									onChange={formik.handleChange('email')}
									value={formik.values.email}
									error={error}
									helperText={formik.touched.email ? formik.errors.email : ''}
									validationError={formik.touched.email && Boolean(formik.errors.email)}
									cguCheckbox={cguCheckBox}
									setCguCheckBox={setCguCheckBox}
									isSubmitLoading={isSubmitLoading}
								/>
								<Stack direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '60px' }}>
									<p className={Styles.bottomLinks}>
										Vous avez déjà un compte ? <Link href={AUTH_LOGIN}>Connectez-vous</Link>
									</p>
								</Stack>
							</Stack>
						</main>
						</div>
					</TabletAndMobile>
				</>
			)}
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
				// facebook case email not found
				if (response.data.email === '') {
					return {
						redirect: {
							permanent: false,
							destination: AUTH_FB_EMAIL_MISSING,
						},
					};
				} else {
					// redirect to the welcome page.
					return {
						redirect: {
							permanent: false,
							destination: AUTH_WELCOME,
						},
					};
				}
			}
		} else {
			return { props: {} };
		}
	} catch (e) {
		return { props: {} };
	}
}

export default Register;
