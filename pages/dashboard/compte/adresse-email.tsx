import React, { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../styles/dashboard/dashboard.module.sass';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopDashboardSideNav from '../../../components/layouts/desktop/desktopDashboardSideNav/desktopDashboardSideNav';
import { Box, Stack } from '@mui/material';
import { coordonneeTextInputTheme } from '../../../utils/themes';
import Image from 'next/image';
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useFormik } from 'formik';
import { changeEmailSchema, changeEmailWithPasswordSchema } from "../../../utils/formValidationSchemas";
import CustomPasswordInput from '../../../components/formikElements/customPasswordInput/customPasswordInput';
import { getServerSideCookieTokens, isAuthenticatedInstance, setFormikAutoErrors } from '../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountPutChangeEmailHasPasswordSagaCallback,
} from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../utils/routes';
import { useAppDispatch } from '../../../utils/hooks';
import MobileDashboardNav from '../../../components/layouts/mobile/mobileDashboardNav/mobileDashboardNav';
import MiniBackSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import {
	accountPostChangeEmailNotHasPasswordAction,
	accountPutChangeEmailHasPasswordAction
} from "../../../store/actions/account/accountActions";
import CustomToast from "../../../components/portals/customToast/customToast";
import { useRouter } from "next/router";
import CustomFooter from "../../../components/layouts/footer/customFooter";
import Portal from "../../../contexts/Portal";

type formikContentType = {
	email: string;
	setShowDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormikContentWithOldPassword: React.FC<formikContentType> = (props: formikContentType) => {
	const { email } = props;
	const dispatch = useAppDispatch();
	const [newEmail, setNewEmail] = useState<string>(email);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validateOnMount: true,
		validationSchema: changeEmailSchema,
		onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
			setSubmitting(true);
			const action = accountPutChangeEmailHasPasswordAction(values.email, values.password);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: AccountPutChangeEmailHasPasswordSagaCallback) => {
					if (!error && !cancelled && data) {
						setNewEmail(data.email);
						props.setShowDataUpdated(true);
						resetForm();
					}
					if (error) {
						setFormikAutoErrors({
							e: error,
							setFieldError,
						});
					}
					setSubmitting(false);
				},
			});
		},
	});

	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" alignItems="center" spacing={2} className={`${Styles.flexRootStack}`} mt="32px">
			<h2 className={Styles.pageTitle}>Modifier l&apos;email</h2>
			<span className={Styles.paragrapheContent}>
				Votre email actuelle est <span>{newEmail}</span>.<br />
				Pour modifier cette adresse, veuillez insérer votre mot de passe et votre nouvel email.
			</span>
			<form className={Styles.form}>
				<Stack direction="column" spacing={2}>
					<CustomTextInput
						id="email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange('email')}
						onBlur={formik.handleBlur('email')}
						helperText={formik.touched.email ? formik.errors.email : ''}
						error={formik.touched.email && Boolean(formik.errors.email)}
						fullWidth={false}
						size="medium"
						label="Nouvelle adresse email"
						placeholder="Nouvelle adresse email"
						theme={inputTheme}
					/>
					<CustomPasswordInput
						id="password"
						value={formik.values.password}
						onChange={formik.handleChange('password')}
						onBlur={formik.handleBlur('password')}
						helperText={formik.touched.password ? formik.errors.password : ''}
						error={formik.touched.password && Boolean(formik.errors.password)}
						fullWidth={false}
						size="medium"
						label="Mot de passe"
						placeholder="Mot de passe"
						theme={inputTheme}
					/>
					<PrimaryButton
						buttonText="Modifier"
						active={formik.isValid && !formik.isSubmitting}
						onClick={formik.handleSubmit}
						cssClass={`${Styles.maxWidth} ${Styles.mobileButton} ${Styles.submitButton}`}
						type="submit"
					/>
				</Stack>
			</form>
		</Stack>
	);
};

const FormikContentWithNewPassword: React.FC<formikContentType> = (props: formikContentType) => {
	const { email } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [newEmail, setNewEmail] = useState<string>(email);
	const formik = useFormik({
		initialValues: {
			email: '',
			new_password1: '',
			new_password2: '',
		},
		validateOnMount: true,
		validationSchema: changeEmailWithPasswordSchema,
		onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
			setSubmitting(true);
			const action = accountPostChangeEmailNotHasPasswordAction(values.email, values.new_password1, values.new_password2);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: AccountPutChangeEmailHasPasswordSagaCallback) => {
					if (!error && !cancelled && data) {
						setNewEmail(data.email);
						props.setShowDataUpdated(true);
						resetForm();
						// refresh page to load other formik content
						router.replace(router.asPath).then();
					}
					if (error) {
						setFormikAutoErrors({
							e: error,
							setFieldError,
						});
					}
					setSubmitting(false);
				},
			});
		},
	});
	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" alignItems="center" spacing={2} className={`${Styles.flexRootStack}`} mt="32px">
			<h2 className={Styles.pageTitle}>Modifier l&apos;email</h2>
			<span className={Styles.paragrapheContent}>
				Votre email actuelle est <span>{newEmail}</span>.<br />
				Votre compte n&apos;a pas encore un mot de passe.<br />
				Pour modifier cette adresse, veuillez insérer votre nouveau mot de passe et votre nouvel email.
			</span>
			<form>
				<Stack direction="column" spacing={2}>
					<CustomTextInput
						id="email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange('email')}
						onBlur={formik.handleBlur('email')}
						helperText={formik.touched.email ? formik.errors.email : ''}
						error={formik.touched.email && Boolean(formik.errors.email)}
						fullWidth={false}
						size="medium"
						label="Nouvelle adresse email"
						placeholder="Nouvelle adresse email"
						theme={inputTheme}
					/>
					<CustomPasswordInput
						id="new_password1"
						value={formik.values.new_password1}
						onChange={formik.handleChange('new_password1')}
						onBlur={formik.handleBlur('new_password1')}
						helperText={formik.touched.new_password1 ? formik.errors.new_password1 : ''}
						error={formik.touched.new_password1 && Boolean(formik.errors.new_password1)}
						fullWidth={false}
						size="medium"
						label="Nouveau mot de passe"
						placeholder="Nouveau mot de passe"
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
						label="Confirmation du nouveau mot de passe"
						placeholder="Confirmation du nouveau mot de passe"
						theme={inputTheme}
					/>
					<PrimaryButton
						buttonText="Modifier l'email"
						active={formik.isValid && !formik.isSubmitting}
						onClick={formik.handleSubmit}
						cssClass={`${Styles.maxWidth} ${Styles.mobileButton} ${Styles.submitButton}`}
						type="submit"
					/>
				</Stack>
			</form>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		email: string;
		has_password: boolean;
	};
};

const AdresseEmail: NextPage<IndexProps> = (props: IndexProps) => {
	const { email, has_password } = props.pageProps;
	const [showDataUpdated, setShowDataUpdated] = useState<boolean>(false);
	const router = useRouter()
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column" sx={{position: 'relative'}}>
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
					<DesktopDashboardSideNav backText="Mon compte" />
					<Box sx={{ width: '100%' }}>
						{has_password ? (
							<FormikContentWithOldPassword email={email} setShowDataUpdated={setShowDataUpdated} />
						) : (
							<FormikContentWithNewPassword email={email} setShowDataUpdated={setShowDataUpdated} />
						)}
					</Box>
				</Stack>
				<Stack className={`${Styles.mobileOnly}`}>
					{!mobileElementClicked ? (
						<MobileDashboardNav setContent={setMobileElementClicked} backText="Mon compte"/>
					) : (
						<Box sx={{ width: '100%', height: '100%' }}>
							<Stack direction="column">
								<Stack direction="row" justifyContent="space-between">
									<Stack
										className={Styles.topBackNavigationStack}
										direction="row"
										spacing={1}
										onClick={() => setMobileElementClicked(false)}
										alignItems="center"
									>
										<Image
											src={MiniBackSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.backIcon}
										/>
										<span className={Styles.backText}>Retour</span>
									</Stack>
								</Stack>
							</Stack>
							{has_password ? (
							<FormikContentWithOldPassword email={email} setShowDataUpdated={setShowDataUpdated} />
						) : (
							<FormikContentWithNewPassword email={email} setShowDataUpdated={setShowDataUpdated} />
						)}
						</Box>
					)}
				</Stack>
				<Portal id="snackbar_portal">
					<CustomToast type="success" message="Profil mis à jour" setShow={setShowDataUpdated} show={showDataUpdated}/>
				</Portal>
			</main>
			<CustomFooter />
		</Stack>
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
					props: {
						email: response.data.email,
						has_password: response.data.has_password,
					},
				};
			}
		} else {
			// redirect to login page.
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
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default AdresseEmail;
