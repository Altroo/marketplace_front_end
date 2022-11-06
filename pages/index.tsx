import type { NextPage } from 'next';
import { RootState } from '../store/store';
import Styles from './index.module.sass';
import { Stack, Box, ThemeProvider, InputAdornment } from '@mui/material';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import QarybLogoSVG from '../public/assets/svgs/indexIcons/Qaryb.svg';
import ClockSVG from '../public/assets/svgs/indexIcons/clock.svg';
import EmailSentSVG from '../public/assets/svgs/indexIcons/Check.svg';
import TicTacSVG from '../public/assets/svgs/indexIcons/clock_tic.svg';

import { useFormik } from 'formik';
import { newsLetterEmailSchema } from '../utils/formValidationSchemas';
import { useAppDispatch } from '../utils/hooks';
import { newsLetterEmailInputTheme } from '../utils/themes';
import PrimaryButton from '../components/htmlElements/buttons/primaryButton/primaryButton';
import TextField from '@mui/material/TextField';
import { versionPostNewsLetterAction } from '../store/actions/version/versionActions';
import { SagaCallBackOnCompleteBoolType } from '../types/_init/_initTypes';

const DesktopLineBreak = () => {
	return <br className={Styles.desktopOnly} />;
};

const Home: NextPage<RootState> = () => {
	const dispatch = useAppDispatch();
	const [ticClockImg, setTicClockImg] = useState<boolean>(false);
	const [counterDays, setCounterDays] = useState<string>('');
	const [counterHours, setCounterHours] = useState<string>('');
	const [counterMinutes, setCounterMinutes] = useState<string>('');

	const [emailSentState, setEmailSentState] = useState<boolean>(false);
	const expirationDate = new Date(2022, 10, 21, 24, 59, 0).getTime();

	const pad = (num: number, size: number) => {
		let s = num + '';
		while (s.length < size) s = '0' + s;
		return s;
	};

	useEffect(() => {
		const timerFunc = setInterval(function () {
			const now = new Date().getTime();
			const timeleft = expirationDate - now;
			const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
			setCounterDays(pad(days, 2));
			setCounterHours(pad(hours, 2));
			setCounterMinutes(pad(minutes, 2));
			setTicClockImg(prevState => !prevState);
		}, 1000);
		return () => {
			clearInterval(timerFunc);
		};
	}, [emailSentState, expirationDate]);

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validateOnMount: true,
		validationSchema: newsLetterEmailSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			const action = versionPostNewsLetterAction(values.email);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
					if (!error && !cancelled && data) {
						setEmailSentState(true);
					}
				},
			});
			setSubmitting(false);
		},
	});

	const inputTheme = newsLetterEmailInputTheme();

	return (
		<main className={Styles.indexMain}>
			<Stack direction="column" spacing="40px" className={Styles.rootStack}>
				<Image
					className={Styles.qarybLogo}
					src={QarybLogoSVG}
					width={150}
					height={40}
					sizes="100vw"
					alt="Qaryb"
				/>
				<span className={Styles.lancement}>Lancement dans...</span>
				<Stack direction="row" spacing="120px" alignItems="center" className={Styles.counterRootStack}>
					<Box className={Styles.bgCounterWrapper}>
						<Box
							className={Styles.bgCounter}
							sx={{
								background: `url(${ticClockImg ? ClockSVG.src : TicTacSVG.src}) center center no-repeat scroll`,
								msFilter: `progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${ticClockImg ? ClockSVG.src : TicTacSVG.src}', 
						sizingMethod='scale')`,
								backgroundSize: 'cover',
								width: '460px',
								height: '236px',
							}}
						>
							<span className={Styles.counterDays}>{counterDays}</span>
							<span className={Styles.couterHours}>{counterHours}</span>
							<span className={Styles.counterMinutes}>{counterMinutes}</span>
						</Box>
					</Box>
					<Stack direction="column" className={Styles.headerMessage}>
						<h2>Notre mission</h2>
						<h1>
							Démocratiser <DesktopLineBreak /> le ecommerce <DesktopLineBreak /> au maroc
						</h1>
					</Stack>
				</Stack>
			</Stack>
			<Box className={Styles.footerBox}>
				<Stack direction="column" spacing="40px" alignItems="center" className={Styles.footerRootStack}>
					<Stack direction="column" alignItems="center">
						<h3>Vous ne voulez pas manquer le lancement?</h3>
						<h4>Inscrivez-vous à notre newsletter.</h4>
					</Stack>
					<form className={Styles.form}>
						<Stack direction="row" spacing="24px" alignItems="center" className={Styles.mobileStack}>
							<ThemeProvider theme={inputTheme}>
								<TextField
									id="email"
									type="email"
									value={formik.values.email}
									onChange={formik.handleChange('email')}
									onBlur={formik.handleBlur('email')}
									helperText={formik.touched.email ? formik.errors.email : ''}
									error={formik.touched.email && Boolean(formik.errors.email)}
									fullWidth={true}
									size="medium"
									placeholder="Email"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Image
													src={EmailSentSVG}
													width={18}
													height={18}
													sizes="100vw"
													alt=""
													style={{
														display: `${emailSentState ? 'block' : 'none'}`,
													}}
												/>
											</InputAdornment>
										),
									}}
								/>
							</ThemeProvider>
							<PrimaryButton
								buttonText="C'est noté !"
								active={formik.isValid && !formik.isSubmitting}
								onClick={formik.handleSubmit}
								cssClass={Styles.submitButton}
								type="submit"
							/>
						</Stack>
					</form>
				</Stack>
			</Box>
		</main>
	);
};

export default Home;
