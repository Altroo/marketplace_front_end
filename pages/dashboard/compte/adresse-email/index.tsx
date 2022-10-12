import React, { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopDashboardLeftSideNav from '../../../../components/layouts/desktopDashboardLeftSideNav/desktopDashboardLeftSideNav';
import { Box, Stack } from '@mui/material';
import { coordonneeTextInputTheme } from '../../../../utils/themes';
import { default as ImageFuture } from 'next/future/image';
import CustomTextInput from '../../../../components/formikElements/customTextInput/customTextInput';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import SuccessAlert from '../../../../components/layouts/successAlert/successAlert';
import { useFormik } from 'formik';
import { changeEmailSchema } from "../../../../utils/formValidationSchemas";
import CustomPasswordInput from '../../../../components/formikElements/customPasswordInput/customPasswordInput';
import { getServerSideCookieTokens, isAuthenticatedInstance, setFormikAutoErrors } from "../../../../utils/helpers";
import {
	AccountGetCheckAccountResponseType,
	AccountPutChangeEmailHasPasswordSagaCallback,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../utils/routes';
import { useAppDispatch } from '../../../../utils/hooks';
import MobileDashboardNav from '../../../../components/layouts/mobileDashboardNav/mobileDashboardNav';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import { accountPutChangeEmailHasPasswordAction } from '../../../../store/actions/account/accountActions';

type formikContentType = {
	email: string;
	setShowDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormikContent: React.FC<formikContentType> = (props: formikContentType) => {
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
			console.log(values);
			setSubmitting(true);
			const action = accountPutChangeEmailHasPasswordAction(values.email, values.password);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: AccountPutChangeEmailHasPasswordSagaCallback) => {
					if (!error && !cancelled && data) {
						setNewEmail(data.email);
						props.setShowDataUpdated(true);
					}
					if (error) {
						setFormikAutoErrors({
							e: error,
							setFieldError,
						});
					}
					setSubmitting(false);
					resetForm();
				},
			});
		},
	});
	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" alignItems="center" spacing={2} className={`${Styles.rootStackVH}`}>
			<h2 className={Styles.pageTitle}>Modifier l&apos;email</h2>
			<span className={Styles.paragrapheContent}>
				Votre email actuelle est <span>{newEmail}</span>.<br />
				Pour modifier cette adresse, veuillez insérer votre mot de passe et votre nouvel email.
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
						cssClass={`${Styles.maxWidth} ${Styles.mobileButton}`}
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
	};
};

const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { email } = props.pageProps;
	const [showDataUpdated, setShowDataUpdated] = useState<boolean>(false);
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(true);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.rootStack}`}>
					<DesktopDashboardLeftSideNav backText="Mon compte" />
					<Box sx={{ width: '100%' }}>
						<FormikContent email={email} setShowDataUpdated={setShowDataUpdated} />
					</Box>
				</Stack>
				<Stack className={`${Styles.mobileOnly}`}>
					{!mobileElementClicked ? (
						<MobileDashboardNav setContent={setMobileElementClicked} />
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
										<ImageFuture
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
							<FormikContent email={email} setShowDataUpdated={setShowDataUpdated} />
						</Box>
					)}
				</Stack>
			</main>
			<SuccessAlert message="Email mis à jour" setShow={setShowDataUpdated} show={showDataUpdated} />
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
					},
				};
			}
		} else {
			// redirect to register page.
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

export default Index;
