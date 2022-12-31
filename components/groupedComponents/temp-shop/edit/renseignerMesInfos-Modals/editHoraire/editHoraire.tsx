import React, { useEffect, useRef, useState, useCallback } from 'react';
import Styles from './editHoraire.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getShopAfternoonHourFrom,
	getShopMorningHourFrom,
	getShopMorningHourTo,
	getShopAfternoonHourTo,
	getShopOpeningDays,
} from '../../../../../../store/selectors';
import { Chip, Stack, ThemeProvider } from '@mui/material';
import { Form, Formik } from 'formik';
import { shopAvailabilityDaysSchema } from '../../../../../../utils/formValidationSchemas';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import { shopPatchAvailabilityAction } from '../../../../../../store/actions/shop/shopActions';
import { coordonneeTextInputTheme, horairesInputTheme } from '../../../../../../utils/themes';
import CustomTimeInput from '../../../../../formikElements/customTimeInput/customTimeInput';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from "next/router";
import { constructDate } from "../../../../../../utils/rawData";

const horaireTheme = horairesInputTheme('#0274d7');
const titleFieldTheme = coordonneeTextInputTheme();

type valuesType = {
	opening_days: string;
	morning_hour_from: Dayjs | null;
	morning_hour_to: Dayjs | null;
	afternoon_hour_from: Dayjs | null;
	afternoon_hour_to: Dayjs | null;
};

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditHoraire: React.FC<Props> = (props: Props) => {
	const {handleClose} = props;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const opening_days = useAppSelector(getShopOpeningDays);
	const morningHourFrom = useAppSelector(getShopMorningHourFrom);
	const morningHourTo = useAppSelector(getShopMorningHourTo);
	const afternoonHourFrom = useAppSelector(getShopAfternoonHourFrom);
	const afternoonHourTo = useAppSelector(getShopAfternoonHourTo);

	const [morningHourFromState, setMorningHourFromState] = useState<Dayjs | null>(null);
	const [morningHourToState, setMorningHourToState] = useState<Dayjs | null>(null);
	const [afternoonHourFromState, setAfternoonHourFromState] = useState<Dayjs | null>(null);
	const [afternoonHourToState, setAfternoonHourToState] = useState<Dayjs | null>(null);

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
	const availabilityDaysSwitchHandler = useCallback((setState: React.Dispatch<React.SetStateAction<boolean>>,
		state: boolean,
		ref: React.RefObject<HTMLInputElement>,
		textValue: string) => {
		setState(state);
		if (ref.current !== null) {
			if (state) {
				ref.current.value = textValue;
			} else {
				ref.current.value = '';
			}
		}
	}, []);

	const editHoraireHandler = useCallback((values: valuesType) => {
		const morning_hour_from = values.morning_hour_from ? values.morning_hour_from.format('HH:mm') : null;
		const morning_hour_to = values.morning_hour_to ? values.morning_hour_to.format('HH:mm') : null;
		const afternoon_hour_from = values.afternoon_hour_from ? values.afternoon_hour_from.format('HH:mm') : null;
		const afternoon_hour_to = values.afternoon_hour_to ? values.afternoon_hour_to.format('HH:mm') : null;

		dispatch(
			shopPatchAvailabilityAction(
				values.opening_days,
				morning_hour_from,
				morning_hour_to,
				afternoon_hour_from,
				afternoon_hour_to,
			),
		);
		handleClose();
		router.replace(router.asPath).then();
	}, [dispatch, handleClose, router]);

	useEffect(() => {
		if (morningHourFrom) {
			setMorningHourFromState(dayjs(new Date(constructDate(morningHourFrom))));
		}
		if (morningHourTo) {
			setMorningHourToState(dayjs(new Date(constructDate(morningHourTo))));
		}
		if (afternoonHourFrom) {
			setAfternoonHourFromState(dayjs(new Date(constructDate(afternoonHourFrom))));
		}
		if (afternoonHourTo) {
			setAfternoonHourToState(dayjs(new Date(constructDate(afternoonHourTo))));
		}

		if (opening_days) {
			opening_days.map((day) => {
				switch (day.code_day) {
					case 'AL':
						availabilityDaysSwitchHandler(setAlState, true, alRef, 'AL');
						availabilityDaysSwitchHandler(setMoState, true, moRef, 'MO');
						availabilityDaysSwitchHandler(setTuState, true, tuRef, 'TU');
						availabilityDaysSwitchHandler(setWeState, true, weRef, 'WE');
						availabilityDaysSwitchHandler(setWeState, true, weRef, 'WE');
						availabilityDaysSwitchHandler(setThState, true, thRef, 'TH');
						availabilityDaysSwitchHandler(setFrState, true, frRef, 'FR');
						availabilityDaysSwitchHandler(setSaState, true, saRef, 'SA');
						availabilityDaysSwitchHandler(setSuState, true, suRef, 'SU');
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
	}, [afternoonHourFrom, afternoonHourTo, availabilityDaysSwitchHandler, morningHourFrom, morningHourTo, opening_days]);

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
						morning_hour_from: morningHourFromState,
						morning_hour_to: morningHourToState,
						afternoon_hour_from: afternoonHourFromState,
						afternoon_hour_to: afternoonHourToState,
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
							morning_hour_from: values.morning_hour_from ? dayjs(new Date(values.morning_hour_from.toString())) : null,
							morning_hour_to: values.morning_hour_to ? dayjs(new Date(values.morning_hour_to.toString())) : null,
							afternoon_hour_from: values.afternoon_hour_from ? dayjs(new Date(values.afternoon_hour_from.toString())) : null,
							afternoon_hour_to: values.afternoon_hour_to ? dayjs(new Date(values.afternoon_hour_to.toString())) : null,
						});
					}}
				>
					{({ handleChange, handleSubmit, values, isValid, isSubmitting }) => (
						<Form onSubmit={(e) => e.preventDefault()}>
							<Stack
								direction="column"
								justifyContent="space-between"
								alignContent="space-between"
								className={Styles.rootStack}
							>
								<TopBarSaveClose
									buttonText="Enregistrer"
									handleClose={handleClose}
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
									justifyItems="flex-start"
									className={Styles.rootStackDays}
								>
									{/* "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU" | "AL" */}
									<Chip
										label="Tous les jours"
										variant={alState ? 'filled' : 'outlined'}
										onClick={() => {
											availabilityDaysSwitchHandler(setAlState, !alState, alRef, 'AL');
											availabilityDaysSwitchHandler(setMoState, !alState, moRef, 'MO');
											availabilityDaysSwitchHandler(setTuState, !alState, tuRef, 'TU');
											availabilityDaysSwitchHandler(setWeState, !alState, weRef, 'WE');
											availabilityDaysSwitchHandler(setThState, !alState, thRef, 'TH');
											availabilityDaysSwitchHandler(setFrState, !alState, frRef, 'FR');
											availabilityDaysSwitchHandler(setSaState, !alState, saRef, 'SA');
											availabilityDaysSwitchHandler(setSuState, !alState, suRef, 'SU');
										}}
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
									justifyItems="flex-start"
									className={Styles.rootGrid}
								>
									<div className={Styles.grayTitle}>
										<p>Horaire du matin</p>
									</div>
									<Stack direction="row" justifyContent="space-between" className={Styles.timeInputRoot}>
										<CustomTimeInput
											id="morning_hour_from"
											label="De"
											placeholder="De"
											onChange={(e) => {
												if (e) {
													handleChange('morning_hour_from')(new Date(e.toString()).toString());
												} else {
													handleChange('morning_hour_from')('');
												}
											}}
											value={values.morning_hour_from}
											theme={titleFieldTheme}
										/>
										<CustomTimeInput
											id="morning_hour_to"
											label="A"
											placeholder="A"
											onChange={(e) => {
												if (e) {
													handleChange('morning_hour_to')(new Date(e.toString()).toString());
												} else {
													handleChange('morning_hour_to')('');
												}
											}}
											value={values.morning_hour_to}
											theme={titleFieldTheme}
										/>
									</Stack>
									<div className={Styles.grayTitle}>
										<p>Horaire de l&apos;après-midi</p>
									</div>
									<Stack direction="row" justifyContent="space-between" className={Styles.timeInputRoot}>
										<CustomTimeInput
											id="afternoon_hour_from"
											label="De"
											placeholder="De"
											onChange={(e) => {
												if (e) {
													handleChange('afternoon_hour_from')(new Date(e.toString()).toString());
												} else {
													handleChange('afternoon_hour_from')('');
												}
											}}
											value={values.afternoon_hour_from}
											theme={titleFieldTheme}
										/>
										<CustomTimeInput
											id="afternoon_hour_to"
											label="A"
											placeholder="A"
											onChange={(e) => {
												if (e) {
													handleChange('afternoon_hour_to')(new Date(e.toString()).toString());
												} else {
													handleChange('afternoon_hour_to')('');
												}
											}}
											value={values.afternoon_hour_to}
											theme={titleFieldTheme}
										/>
									</Stack>
								</Stack>
							</Stack>
						</Form>
					)}
				</Formik>
			</Stack>
		</ThemeProvider>
	);
};

export default EditHoraire;
