import React, { useState } from 'react';
import Styles from '../../../styles/auth/reset-password/enter-code.module.sass';
import { GetServerSidePropsContext } from 'next';
import {
	allowAnyInstance,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	setFormikAutoErrors,
} from '../../../utils/helpers';
import { getCookie } from 'cookies-next';
import { AccountGetCheckAccountResponseType } from '../../../types/account/accountTypes';
import { cookiesPoster, getApi } from '../../../store/services/_init/_initAPI';
import { AUTH_REGISTER, AUTH_RESET_PASSWORD, AUTH_RESET_PASSWORD_SET_PASSWORD, DASHBOARD } from '../../../utils/routes';
import AuthPageLayout from '../../../components/layouts/auth/authPageLayout';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { passwordResetCodeSchema } from '../../../utils/formValidationSchemas';
import {
	ResponseOnlyInterface,
	SagaCallBackOnCompleteBoolType
} from "../../../types/_init/_initTypes";
import { codeTextInputTheme } from '../../../utils/themes';
import CustomOutlinedText from '../../../components/formikElements/customOutlinedText/customOutlinedText';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import TextButton from '../../../components/htmlElements/buttons/textButton/textButton';
import { useAppDispatch } from '../../../utils/hooks';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { accountPostSendPasswordResetAction } from "../../../store/actions/account/accountActions";

type enterCodePageContentProps = {
	email: string;
};

const EnterCodePageContent = (props: enterCodePageContentProps) => {
	const { email } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState<boolean>(false);

	const renvoyerLeCodeHandler = () => {
		setLoading(true);
		// dispatch with callback
		const action = accountPostSendPasswordResetAction(email);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
				if (!error && !cancelled && data) {
					setLoading(false);
				}
			},
		});
	};

	const formik = useFormik({
		initialValues: {
			one: '',
			two: '',
			three: '',
			four: '',
			globalError: '',
		},
		validateOnMount: true,
		validationSchema: passwordResetCodeSchema,
		onSubmit: async (values, { setFieldError, setSubmitting }) => {
			setSubmitting(false);
			const code = values.one + values.two + values.three + values.four;
			const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PASSWORD_RESET}${email}/${code}/`;
			try {
				const instance = allowAnyInstance();
				const response: ResponseOnlyInterface = await getApi(url, instance);
				if (response.status === 204) {
					setSubmitting(true);
					cookiesPoster('/cookies', { code: code }).then(() => {
						router.push(AUTH_RESET_PASSWORD_SET_PASSWORD).then();
					});
				}
			} catch (e) {
				setFormikAutoErrors({ e, setFieldError });
			}
		},
	});

	return (
		<>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				className={Styles.contentWrapper}
				spacing={4}
			>
				{loading && <ApiProgress cssStyle={{ position: 'absolute', top: '50%', left: '50%' }} />}
				<Stack direction="column" spacing={1}>
					<span className={Styles.content}>Rentrez le code</span>
					<span className={Styles.paragraphe}>
						Un code a été envoyé au <span className={Styles.email}>{email}</span>
					</span>
				</Stack>
				<form>
					<Stack direction="column" spacing={8}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							spacing={1}
							className={Styles.mobileCodeRootWrapper}
						>
							<CustomOutlinedText
								id="one"
								value={formik.values.one}
								onChange={formik.handleChange('one')}
								onBlur={formik.handleBlur('one')}
								// helperText={formik.touched.one ? formik.errors.one : ''}
								error={formik.touched.one && Boolean(formik.errors.one)}
								fullWidth={false}
								size="medium"
								type="tel"
								inputProps={{ maxLength: 1 }}
								theme={codeTextInputTheme(formik.touched.one && Boolean(formik.errors.one))}
							/>
							<CustomOutlinedText
								id="two"
								value={formik.values.two}
								onChange={formik.handleChange('two')}
								onBlur={formik.handleBlur('two')}
								// helperText={formik.touched.two ? formik.errors.two : ''}
								error={formik.touched.two && Boolean(formik.errors.two)}
								fullWidth={false}
								size="medium"
								type="tel"
								inputProps={{ maxLength: 1 }}
								theme={codeTextInputTheme(formik.touched.two && Boolean(formik.errors.two))}
							/>
							<CustomOutlinedText
								id="three"
								value={formik.values.three}
								onChange={formik.handleChange('three')}
								onBlur={formik.handleBlur('three')}
								// helperText={formik.touched.three ? formik.errors.three : ''}
								error={formik.touched.three && Boolean(formik.errors.three)}
								fullWidth={false}
								size="medium"
								type="tel"
								inputProps={{ maxLength: 1 }}
								theme={codeTextInputTheme(formik.touched.three && Boolean(formik.errors.three))}
							/>
							<CustomOutlinedText
								id="four"
								value={formik.values.four}
								onChange={formik.handleChange('four')}
								onBlur={formik.handleBlur('four')}
								// helperText={formik.touched.four ? formik.errors.four : ''}
								error={formik.touched.four && Boolean(formik.errors.four)}
								fullWidth={false}
								size="medium"
								type="tel"
								inputProps={{ maxLength: 1 }}
								theme={codeTextInputTheme(formik.touched.four && Boolean(formik.errors.four))}
							/>
						</Stack>
						{formik.errors.globalError && <span className={Styles.errorMessage}>{formik.errors.globalError}</span>}
						<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
							<PrimaryButton
								buttonText="Confirmer le code"
								active={formik.isValid && !formik.isSubmitting}
								onClick={formik.handleSubmit}
								cssClass={Styles.emailRegisterButton}
								type="submit"
							/>
							<TextButton
								buttonText="Renvoyer le code"
								onClick={renvoyerLeCodeHandler}
								cssClass={Styles.resendCodeButton}
							/>
						</Stack>
					</Stack>
				</form>
			</Stack>
		</>
	);
};

type Props = {
	pageProps: {
		email: string;
	};
	children?: React.ReactNode;
};

// email field
// edit password button
const EnterCode: React.FC<Props> = (props: Props) => {
	const { email } = props.pageProps;

	return (
		<>
			<div className={Styles.desktopOnly}>
				<AuthPageLayout href={AUTH_REGISTER} topBarText="CREATE">
					<EnterCodePageContent email={email} />
				</AuthPageLayout>
			</div>
			<div className={Styles.mobileOnly}>
				<main className={Styles.main}>
					<Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100vh' }}>
						<EnterCodePageContent email={email} />
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
	const email = getCookie('@new_email', { req: context.req, res: context.res });
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
			if (typeof email === 'string') {
				// access page with new email set.
				return {
					props: {
						email: email,
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
	} catch (e) {
		if (typeof email === 'string') {
			// access page with new email set.
			return {
				props: {
					email: email,
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

export default EnterCode;
