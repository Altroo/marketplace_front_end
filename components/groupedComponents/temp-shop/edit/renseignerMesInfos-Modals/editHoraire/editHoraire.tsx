import React, { useEffect, useRef, useState } from 'react';
import Styles from './editHoraire.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getNewShopApiError,
	getNewShopEditPromiseStatus,
	getNewShopIsEditInProgress, getShopAfternoonHourFrom, getShopMorningHourFrom, getShopMorningHourTo,
	getShopAfternoonHourTo, getShopOpeningDays
} from "../../../../../../store/selectors";
import { Chip, Stack, ThemeProvider, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { shopAvailabilityDaysSchema } from '../../../../../../utils/formValidationSchemas';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import ApiProgress from '../../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import ApiAlert from '../../../../../formikElements/apiLoadingResponseOrError/apiAlert/apiAlert';
import { shopPatchAvailabilityAction } from '../../../../../../store/actions/shop/shopActions';
import { horairesInputTheme } from "../../../../../../utils/themes";

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditHoraire: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const opening_days = useAppSelector(getShopOpeningDays);
	const morning_hour_from = useAppSelector(getShopMorningHourFrom);
	const morning_hour_to = useAppSelector(getShopMorningHourTo);
	const afternoon_hour_from = useAppSelector(getShopAfternoonHourFrom);
	const afternoon_hour_to = useAppSelector(getShopAfternoonHourTo);
	const isEditInProgress = useAppSelector(getNewShopIsEditInProgress);
	const editPromiseStatus = useAppSelector(getNewShopEditPromiseStatus);
	const apiError = useAppSelector(getNewShopApiError);
	// Availability day states
	const [alState, setAlState] = useState<boolean>(false);
	const [moState, setMoState] = useState<boolean>(false);
	const [tuState, setTuState] = useState<boolean>(false);
	const [weState, setWeState] = useState<boolean>(false);
	const [thState, setThState] = useState<boolean>(false);
	const [frState, setFrState] = useState<boolean>(false);
	const [saState, setSaState] = useState<boolean>(false);
	const [suState, setSuState] = useState<boolean>(false);
	// Availability day refs
	{
		/* "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU" | "AL" */
	}
	const alRef = useRef<HTMLInputElement>(null);
	const moRef = useRef<HTMLInputElement>(null);
	const tuRef = useRef<HTMLInputElement>(null);
	const weRef = useRef<HTMLInputElement>(null);
	const thRef = useRef<HTMLInputElement>(null);
	const frRef = useRef<HTMLInputElement>(null);
	const saRef = useRef<HTMLInputElement>(null);
	const suRef = useRef<HTMLInputElement>(null);

	// Availability day handlers
	const availabilityDaysSwitchHandler = (
		setState: React.Dispatch<React.SetStateAction<boolean>>,
		state: boolean,
		ref: React.RefObject<HTMLInputElement>,
		textValue: string,
	) => {
		setState(state);
		if (ref.current !== null) {
			if (state) {
				ref.current.value = textValue;
			} else {
				ref.current.value = '';
			}
		}
	};

	type valuesType = {
		opening_days: string;
		morning_hour_from: string | null;
		morning_hour_to: string | null;
		afternoon_hour_from: string | null;
		afternoon_hour_to: string | null;
	};
	const editHoraireHandler = (values: valuesType) => {
		dispatch(
			shopPatchAvailabilityAction(
				values.opening_days,
				values.morning_hour_from,
				values.morning_hour_to,
				values.afternoon_hour_from,
				values.afternoon_hour_to,
			),
		);
		props.handleClose();
	};

	useEffect(() => {
		if (opening_days) {
			opening_days.map((day) => {
				switch (day.code_day) {
					case 'AL':
						availabilityDaysSwitchHandler(setAlState, true, alRef, 'AL');
						break;
					case 'MO':
						availabilityDaysSwitchHandler(setMoState, true, moRef, 'MO');
						break;
					case 'TU':
						availabilityDaysSwitchHandler(setTuState, true, tuRef, 'TU');
						break;
					case 'WE':
						availabilityDaysSwitchHandler(setWeState, true, weRef, 'WE');
						break;
					case 'TH':
						availabilityDaysSwitchHandler(setThState, true, thRef, 'TH');
						break;
					case 'FR':
						availabilityDaysSwitchHandler(setFrState, true, frRef, 'FR');
						break;
					case 'SA':
						availabilityDaysSwitchHandler(setSaState, true, saRef, 'SA');
						break;
					case 'SU':
						availabilityDaysSwitchHandler(setSuState, true, suRef, 'SU');
						break;
				}
			});
		}
	}, [opening_days]);

	const horaireTheme = horairesInputTheme('#0274d7')

	return (
		<ThemeProvider theme={horaireTheme}>
			<Stack direction="column" spacing={4}>
				<Formik
					enableReinitialize={true}
					initialValues={{
						al_day: alState ? 'AL' : '',
						mo_day: moState ? 'MO' : '',
						tu_day: tuState ? 'TU' : '',
						we_day: weState ? 'WE' : '',
						th_day: thState ? 'TH' : '',
						fr_day: frState ? 'FR' : '',
						sa_day: saState ? 'SA' : '',
						su_day: suState ? 'SU' : '',
						morning_hour_from: morning_hour_from,
						morning_hour_to: morning_hour_to,
						afternoon_hour_from: afternoon_hour_from,
						afternoon_hour_to: afternoon_hour_to,
					}}
					validateOnMount={true}
					validationSchema={shopAvailabilityDaysSchema}
					onSubmit={(values) => {
						let availabilityDaysString = '';
						if (values.al_day !== '') {
							availabilityDaysString = availabilityDaysString + values.al_day + ',';
						}
						if (values.mo_day !== '') {
							availabilityDaysString = availabilityDaysString + values.mo_day + ',';
						}
						if (values.tu_day !== '') {
							availabilityDaysString = availabilityDaysString + values.tu_day + ',';
						}
						if (values.we_day !== '') {
							availabilityDaysString = availabilityDaysString + values.we_day + ',';
						}
						if (values.th_day !== '') {
							availabilityDaysString = availabilityDaysString + values.th_day + ',';
						}
						if (values.fr_day !== '') {
							availabilityDaysString = availabilityDaysString + values.fr_day + ',';
						}
						if (values.sa_day !== '') {
							availabilityDaysString = availabilityDaysString + values.sa_day + ',';
						}
						if (values.su_day !== '') {
							availabilityDaysString = availabilityDaysString + values.su_day + ',';
						}
						editHoraireHandler({
							opening_days: availabilityDaysString,
							morning_hour_from: values.morning_hour_from ? values.morning_hour_from.slice(0, 5) : '',
							morning_hour_to: values.morning_hour_to ? values.morning_hour_to.slice(0, 5) : '',
							afternoon_hour_from: values.afternoon_hour_from ? values.afternoon_hour_from.slice(0, 5) : '',
							afternoon_hour_to: values.afternoon_hour_to ? values.afternoon_hour_to.slice(0, 5) : '',
						});
					}}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						touched,
						errors,
						isValid,
						isSubmitting,
					}) => (
						<Form>
							<Stack
								direction="column"
								justifyContent="space-between"
								alignContent="space-between"
								columnGap={0.5}
								rowGap={0}
							>
								<TopBarSaveClose
									buttonText="Enregistrer"
									handleClose={props.handleClose}
									handleSubmit={handleSubmit}
									isSubmitting={isSubmitting}
									isValid={isValid}
								/>
								<HelperDescriptionHeader
									header="Définissez vos jours et horaires d'ouverture"
									description="Ouvert le..."
									headerClasses={Styles.header}
									descriptionClasses={Styles.description}
								/>
								{/* Availability days list */}
								<Stack
									direction="row"
									flexWrap="wrap"
									alignItems="center"
									justifyContent="flex-start"
									rowGap={1}
									columnGap={1.5}
									justifyItems="flex-start"
								>
									{/* "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU" | "AL" */}
									<Chip
										label="Tous les jours"
										variant={alState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setAlState, !alState, alRef, 'AL')}
									/>
									<input
										type="hidden"
										id="al_day"
										ref={alRef}
										value={values.al_day}
										onChange={handleChange('al_day')}
									/>

									<Chip
										label="Lundi"
										variant={moState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setMoState, !moState, moRef, 'MO')}
									/>
									<input
										type="hidden"
										id="mo_day"
										ref={moRef}
										value={values.mo_day}
										onChange={handleChange('mo_day')}
									/>

									<Chip
										label="Mardi"
										variant={tuState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setTuState, !tuState, tuRef, 'TU')}
									/>
									<input
										type="hidden"
										id="tu_day"
										ref={tuRef}
										value={values.tu_day}
										onChange={handleChange('tu_day')}
									/>

									<Chip
										label="Mercredi"
										variant={weState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setWeState, !weState, weRef, 'WE')}
									/>
									<input
										type="hidden"
										id="we_day"
										ref={weRef}
										value={values.we_day}
										onChange={handleChange('we_day')}
									/>

									<Chip
										label="Jeudi"
										variant={thState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setThState, !thState, thRef, 'TH')}
									/>
									<input
										type="hidden"
										id="th_day"
										ref={thRef}
										value={values.th_day}
										onChange={handleChange('th_day')}
									/>
									<Chip
										label="Vendredi"
										variant={frState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setFrState, !frState, frRef, 'FR')}
									/>
									<input
										type="hidden"
										id="fr_day"
										ref={frRef}
										value={values.fr_day}
										onChange={handleChange('fr_day')}
									/>

									<Chip
										label="Samedi"
										variant={saState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setSaState, !saState, saRef, 'SA')}
									/>
									<input
										type="hidden"
										id="sa_day"
										ref={saRef}
										value={values.sa_day}
										onChange={handleChange('sa_day')}
									/>

									<Chip
										label="Dimanche"
										variant={suState ? 'filled' : 'outlined'}
										onClick={() => availabilityDaysSwitchHandler(setSuState, !suState, suRef, 'SU')}
									/>
									<input
										type="hidden"
										id="su_day"
										ref={suRef}
										value={values.su_day}
										onChange={handleChange('su_day')}
									/>
								</Stack>
								<Stack
									direction="column"
									flexWrap="wrap"
									justifyContent="flex-start"
									rowGap={1}
									justifyItems="flex-start"
								>
									<div className={Styles.grayTitle}>
										<p>Horaire du matin</p>
									</div>
									<Stack direction="row" columnGap={1} justifyContent="space-between">
										<TextField
											fullWidth={true}
											type="time"
											id="morning_hour_from"
											label="De"
											value={values.morning_hour_from ? values.morning_hour_from.slice(0, 5) : ''}
											onBlur={handleBlur('morning_hour_from')}
											onChange={handleChange('morning_hour_from')}
											helperText={touched.morning_hour_from ? errors.morning_hour_from : ''}
											error={touched.morning_hour_from && Boolean(errors.morning_hour_from)}
										/>
										<TextField
											fullWidth={true}
											type="time"
											id="morning_hour_to"
											label="A"
											value={values.morning_hour_to ? values.morning_hour_to.slice(0, 5) : ''}
											onBlur={handleBlur('morning_hour_to')}
											onChange={handleChange('morning_hour_to')}
											helperText={touched.morning_hour_to ? errors.morning_hour_to : ''}
											error={touched.morning_hour_to && Boolean(errors.morning_hour_to)}
										/>
									</Stack>
									<div className={Styles.grayTitle}>
										<p>Horaire de l&apos;après-midi</p>
									</div>
									<Stack direction="row" columnGap={1} justifyContent="space-between">
										<TextField
											fullWidth={true}
											size="medium"
											label="De"
											type="time"
											id="afternoon_hour_from"
											value={values.afternoon_hour_from ? values.afternoon_hour_from.slice(0, 5) : ''}
											onBlur={handleBlur('afternoon_hour_from')}
											onChange={handleChange('afternoon_hour_from')}
											helperText={touched.afternoon_hour_from ? errors.afternoon_hour_from : ''}
											error={touched.afternoon_hour_from && Boolean(errors.afternoon_hour_from)}
										/>
										<TextField
											fullWidth={true}
											label="A"
											type="time"
											id="afternoon_hour_to"
											value={values.afternoon_hour_to ? values.afternoon_hour_to.slice(0, 5) : ''}
											onBlur={handleBlur('afternoon_hour_to')}
											onChange={handleChange('afternoon_hour_to')}
											helperText={touched.afternoon_hour_to ? errors.afternoon_hour_to : ''}
											error={touched.afternoon_hour_to && Boolean(errors.afternoon_hour_to)}
										/>
									</Stack>
								</Stack>
							</Stack>
						</Form>
					)}
				</Formik>
				{isEditInProgress && editPromiseStatus === 'PENDING' && (
					<ApiProgress cssStyle={{ position: 'absolute', top: '45%', left: '45%' }} backdropColor="#FFFFFF" circularColor="#FFFFFF" />
				)}
				{!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError && (
					<ApiAlert
						errorDetails={apiError.details}
						cssStyle={{ position: 'absolute', left: '0', top: '50%', margin: '0 -60px -60px -60px' }}
					/>
				)}
			</Stack>
		</ThemeProvider>
	);
};

export default EditHoraire;
