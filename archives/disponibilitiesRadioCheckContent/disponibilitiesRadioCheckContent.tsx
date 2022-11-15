import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import Styles from './disponibilitiesRadioCheckContent.module.sass';
import { OfferBulkStatesListType } from '../../types/ui/uiTypes';
import { SizesChipTheme } from '../../utils/themes';
import RadioCheckElement from '../../components/groupedComponents/temp-offer/radioCheckElement/radioCheckElement';
import { Grid, Stack, ThemeProvider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useAppSelector } from '../../utils/hooks';
import { getLocalOfferServiceAvailabilityDays } from '../../store/selectors';

type Props = {
	selectedDisponibilities: Record<string, boolean>;
	setSelectedDisponibilities: Record<string, React.Dispatch<React.SetStateAction<boolean>>>;
	switchOpen: boolean;
	// eslint-disable-next-line
	formik: any;
	children?: React.ReactNode;
};

const chipTheme = SizesChipTheme();
const DisponibilitiesRadioCheckContent: React.FC<Props> = (props: Props) => {
	const availabilityDays = useAppSelector(getLocalOfferServiceAvailabilityDays);
	const alRef = useRef<HTMLInputElement>(null);
	const moRef = useRef<HTMLInputElement>(null);
	const tuRef = useRef<HTMLInputElement>(null);
	const weRef = useRef<HTMLInputElement>(null);
	const thRef = useRef<HTMLInputElement>(null);
	const frRef = useRef<HTMLInputElement>(null);
	const saRef = useRef<HTMLInputElement>(null);
	const suRef = useRef<HTMLInputElement>(null);

	const disponibilitiesRef = useMemo(() => {
		return [alRef, moRef, tuRef, weRef, thRef, frRef, saRef, suRef];
	}, []);

	const disponibilitiesOnClickHandler = useCallback(
		(
			setState: React.Dispatch<React.SetStateAction<boolean>>,
			state: boolean,
			ref: React.RefObject<HTMLInputElement>,
			code: string,
		) => {
			if (code === 'AL') {
				setState(state);
				props.setSelectedDisponibilities.setMoState(state);
				props.setSelectedDisponibilities.setTuState(state);
				props.setSelectedDisponibilities.setWeState(state);
				props.setSelectedDisponibilities.setThState(state);
				props.setSelectedDisponibilities.setFrState(state);
				props.setSelectedDisponibilities.setSaState(state);
				props.setSelectedDisponibilities.setSuState(state);
			} else {
				setState(state);
			}
			if (ref.current !== null) {
				if (state) {
					ref.current.value = code;
					// dispatch state add here
				} else {
					ref.current.value = '';
					// dispatch state remove here
				}
			}
		},
		[props.setSelectedDisponibilities],
	);

	useEffect(() => {
		if (availabilityDays) {
			availabilityDays.map((day) => {
				switch (day.code_day) {
					case 'AL':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setAlState, true, alRef, 'AL');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setMoState, true, moRef, 'MO');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setTuState, true, tuRef, 'TU');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setWeState, true, weRef, 'WE');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setThState, true, thRef, 'TH');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setFrState, true, frRef, 'FR');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setSaState, true, saRef, 'SA');
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setSuState, true, suRef, 'SU');
						break;
					case 'MO':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setMoState, true, moRef, 'MO');
						break;
					case 'TU':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setTuState, true, tuRef, 'TU');
						break;
					case 'WE':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setWeState, true, weRef, 'WE');
						break;
					case 'TH':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setThState, true, thRef, 'TH');
						break;
					case 'FR':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setFrState, true, frRef, 'FR');
						break;
					case 'SA':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setSaState, true, saRef, 'SA');
						break;
					case 'SU':
						disponibilitiesOnClickHandler(props.setSelectedDisponibilities.setSuState, true, suRef, 'SU');
						break;
				}
			});
		}
	}, [availabilityDays, disponibilitiesOnClickHandler, props.setSelectedDisponibilities]);

	const availableDisponibilitiesList: Array<OfferBulkStatesListType> = useMemo(() => {
		return [
			{
				code: 'AL',
				value: 'Tous les jours',
				state: props.selectedDisponibilities.alState,
				setState: props.setSelectedDisponibilities.setAlState,
			},
			{
				code: 'MO',
				value: 'Lundi',
				state: props.selectedDisponibilities.moState,
				setState: props.setSelectedDisponibilities.setMoState,
			},
			{
				code: 'TU',
				value: 'Mardi',
				state: props.selectedDisponibilities.tuState,
				setState: props.setSelectedDisponibilities.setTuState,
			},
			{
				code: 'WE',
				value: 'Mercredi',
				state: props.selectedDisponibilities.weState,
				setState: props.setSelectedDisponibilities.setWeState,
			},
			{
				code: 'TH',
				value: 'Jeudi',
				state: props.selectedDisponibilities.thState,
				setState: props.setSelectedDisponibilities.setThState,
			},
			{
				code: 'FR',
				value: 'Vendredi',
				state: props.selectedDisponibilities.frState,
				setState: props.setSelectedDisponibilities.setFrState,
			},
			{
				code: 'SA',
				value: 'Samedi',
				state: props.selectedDisponibilities.saState,
				setState: props.setSelectedDisponibilities.setSaState,
			},
			{
				code: 'SU',
				value: 'Dimanche',
				state: props.selectedDisponibilities.suState,
				setState: props.setSelectedDisponibilities.setSuState,
			},
		];
	}, [
		props.selectedDisponibilities.alState,
		props.selectedDisponibilities.frState,
		props.selectedDisponibilities.moState,
		props.selectedDisponibilities.saState,
		props.selectedDisponibilities.suState,
		props.selectedDisponibilities.thState,
		props.selectedDisponibilities.tuState,
		props.selectedDisponibilities.weState,
		props.setSelectedDisponibilities.setAlState,
		props.setSelectedDisponibilities.setFrState,
		props.setSelectedDisponibilities.setMoState,
		props.setSelectedDisponibilities.setSaState,
		props.setSelectedDisponibilities.setSuState,
		props.setSelectedDisponibilities.setThState,
		props.setSelectedDisponibilities.setTuState,
		props.setSelectedDisponibilities.setWeState,
	]);

	return (
		<RadioCheckElement title="Disponibilités" defaultValue={props.switchOpen}>
			<Stack
				direction="row"
				flexWrap="wrap"
				gap="24px"
				justifyContent="space-between"
				alignItems="center"
				className={Styles.rootStack}
			>
				<ThemeProvider theme={chipTheme}>
					<Grid container spacing={2}>
						{availableDisponibilitiesList.map((day, index) => {
							return (
								<Grid item xs="auto" key={index}>
									<Chip
										label={day.value}
										variant={day.state ? 'filled' : 'outlined'}
										onClick={(e) => {
											e.preventDefault();
											disponibilitiesOnClickHandler(day.setState, !day.state, disponibilitiesRef[index], day.code);
										}}
									/>
									<input
										type="hidden"
										id={`${day.code.toLowerCase()}_day`}
										ref={disponibilitiesRef[index]}
										value={day.state ? day.code : ''}
									/>
								</Grid>
							);
						})}
					</Grid>
				</ThemeProvider>
			</Stack>
		</RadioCheckElement>
	);
};

export default DisponibilitiesRadioCheckContent;
