import React, { useEffect, useState } from "react";
import AuthPageLayout from "../../../components/layouts/auth/authPageLayout";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
// import { getCsrfToken, signIn } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import {
	allowAnyInstance,
	getServerSideCookieTokens,
	isAuthenticatedInstance, setFormikAutoErrors,
	setRemoteCookiesTokenOnly
} from "../../../utils/helpers";
import {
	AccountGetCheckAccountResponseType,
	AccountPostRegisterResponseType
} from "../../../types/account/accountTypes";
import { cookiesDeleter, getApi, postApi } from "../../../store/services/_init/_initAPI";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_WELCOME } from "../../../utils/routes";
import { getCookie } from "cookies-next";
import Styles from "../../../styles/auth/register/about.module.sass";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { tellUsMoreSchema } from "../../../utils/formValidationSchemas";
import {
	ResponseDataErrorInterface,
} from "../../../types/_init/_initTypes";
import CustomTextInput from "../../../components/formikElements/customTextInput/customTextInput";
import { coordonneeTextInputTheme } from "../../../utils/themes";
import PrimaryButton from "../../../components/htmlElements/buttons/primaryButton/primaryButton";
import CustomPasswordInput from "../../../components/formikElements/customPasswordInput/customPasswordInput";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getInitStateUniqueID, getTokenType } from "../../../store/selectors";
import { accountPostRegisterAction } from "../../../store/actions/account/accountActions";
import { refreshAppTokenStatesAction } from "../../../store/actions/_init/_initActions";
import UserMainNavigationBar from "../../../components/layouts/userMainNavigationBar/userMainNavigationBar";

type AboutPageContent = {
	email: string;
};

const AboutPageContent = (props: AboutPageContent) => {
	const tokenType = useAppSelector(getTokenType);
	const uniqueID = useAppSelector(getInitStateUniqueID);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			password: "",
			password2: ""
		},
		validateOnMount: true,
		validationSchema: tellUsMoreSchema,
		onSubmit: async (values, { setFieldError, setSubmitting }) => {
			setSubmitting(false);
			const url = `${process.env.NEXT_PUBLIC_ACCOUNT_REGISTER}`;
			try {
				const instance = allowAnyInstance();
				const response: AccountPostRegisterResponseType = await postApi(url, instance, {
					email: props.email,
					first_name: values.first_name,
					last_name: values.last_name,
					password: values.password,
					password2: values.password2
				});
				if (response.status === 200) {
					// if (tokenType === "UNIQUE_ID" && uniqueID.unique_id !== null) {
					// 	const unique_id = uniqueID.unique_id;
					// 	setRemoteCookiesTokenOnly(response.data);
					// 	const transferShopUrl = `${process.env.NEXT_PUBLIC_SHOP_TRANSFER_SHOP}`;
					// 	// using tokens from the register response
					// 	const authInstance = isAuthenticatedInstance(response.data);
					// 	// Get transfer shop response
					// 	const transferResponse: ResponseDataErrorInterface = await postApi(transferShopUrl, authInstance, { unique_id: unique_id });
					// 	if (transferResponse.status === 204) {
					// 		dispatch(accountPostRegisterAction(true, response.data));
					// 	}
					// } else {
					dispatch(accountPostRegisterAction(response.data));
					// }
					await signIn('credentials', {
						email: props.email,
						password: values.password,
						redirect: false,
					}).then(() => {
						setSubmitting(true);
						// delete new email cookie so it'll be used else where.
						cookiesDeleter('/cookies', { new_email: 0 }).then();
						router.replace(router.asPath).then();
					});
				}
			} catch (e) {
				setFormikAutoErrors({e, setFieldError});
			}
		}
	});

	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.rootStack} spacing={6}>
			<Stack direction="column" spacing={2}>
				<span className={Styles.header}>Dites-nous en plus</span>
				<p className={Styles.subHeader}>Pour vous inscrire, nous avons besoin de quelques informations</p>
			</Stack>
			<form>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
					<Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
						<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
							<CustomTextInput
								id="first_name"
								type="text"
								value={formik.values.first_name}
								onChange={formik.handleChange("first_name")}
								onBlur={formik.handleBlur("first_name")}
								helperText={formik.touched.first_name ? formik.errors.first_name : ""}
								error={formik.touched.first_name && Boolean(formik.errors.first_name)}
								fullWidth={false}
								size="medium"
								label="Nom"
								placeholder="Nom"
								cssClass={Styles.mobileInput}
								theme={inputTheme}
							/>
							<CustomTextInput
								id="last_name"
								type="text"
								value={formik.values.last_name}
								onChange={formik.handleChange("last_name")}
								onBlur={formik.handleBlur("last_name")}
								helperText={formik.touched.last_name ? formik.errors.last_name : ""}
								error={formik.touched.last_name && Boolean(formik.errors.last_name)}
								fullWidth={false}
								size="medium"
								label="Prénom"
								placeholder="Prénom"
								cssClass={Styles.mobileInput}
								theme={inputTheme}
							/>
						</Stack>
						<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
							<CustomPasswordInput
								id="password"
								value={formik.values.password}
								onChange={formik.handleChange("password")}
								onBlur={formik.handleBlur("password")}
								helperText={formik.touched.password ? formik.errors.password : ""}
								error={formik.touched.password && Boolean(formik.errors.password)}
								fullWidth={false}
								size="medium"
								label="Mot de passe"
								placeholder="Mot de passe"
								cssClass={Styles.mobileInput}
								theme={inputTheme}
							/>
							<CustomPasswordInput
								id="password2"
								value={formik.values.password2}
								onChange={formik.handleChange("password2")}
								onBlur={formik.handleBlur("password2")}
								helperText={formik.touched.password2 ? formik.errors.password2 : ""}
								error={formik.touched.password2 && Boolean(formik.errors.password2)}
								fullWidth={false}
								size="medium"
								label="Confirmation du mot de passe"
								placeholder="Confirmation du mot de passe"
								cssClass={Styles.mobileInput}
								theme={inputTheme}
							/>
						</Stack>
					</Stack>
					<PrimaryButton
						buttonText="S'inscrire"
						active={formik.isValid && !formik.isSubmitting}
						onClick={formik.handleSubmit}
						cssClass={Styles.registerButton}
						type="submit"
					/>
				</Stack>
			</form>
		</Stack>
	);
};

type Props = {
	pageProps: {
		newEmail: string;
		// csrfToken: string;
	};
	children?: React.ReactNode;
};

const About: React.FC<Props> = (props: Props) => {
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	// const { csrfToken, newEmail } = props.pageProps;
	const { newEmail } = props.pageProps;
	const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);

	useEffect(() => {
		if (session && !sessionUpdated) {
			dispatch(refreshAppTokenStatesAction(session));
			setSessionUpdated(true);
		}
	}, [dispatch, session, sessionUpdated]);

	return (
		<>
			<div className={Styles.desktopOnly}>
				<AuthPageLayout href={AUTH_LOGIN} topBarText="CONNECT">
					<AboutPageContent email={newEmail} />
				</AuthPageLayout>
			</div>
			<div className={Styles.mobileOnly}>
				<main className={Styles.main}>
					<Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: "100vh" }}>
						<UserMainNavigationBar/>
						<AboutPageContent email={newEmail} />
						<Stack direction="column" justifyContent="center" alignItems="center">
							<p className={Styles.bottomLinks}>
								Vous avez déjà un compte ?{" "}
								<Link passHref href={AUTH_LOGIN}>
									<a>Connectez-vous</a>
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
	// const csrfToken = await getCsrfToken(context);
	// checking if new added user
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	const newEmail = getCookie("@new_email", { req: context.req, res: context.res });
	try {
		if (appToken.tokenType === "TOKEN" && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				// user is already loged IN. redirect to welcome page.
				return {
					redirect: {
						permanent: false,
						destination: AUTH_WELCOME
					}
				};
			}
		} else {
			// case raw email & new user
			if (typeof newEmail === "string") {
				return {
					props: {
						newEmail: newEmail,
						// csrfToken: csrfToken
					}
				};
			} else {
				// email not found, redirect back to previous page.
				return {
					redirect: {
						permanent: false,
						destination: AUTH_REGISTER
					}
				};
			}
		}
	} catch (e) {
		// case raw email & new user (catch fallback)
		if (typeof newEmail === "string") {
			return {
				props: {
					newEmail: newEmail,
					// csrfToken: csrfToken
				}
			};
		} else {
			// email not found, redirect back to previous page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_REGISTER
				}
			};
		}
	}
}

export default About;
