import React, { useEffect, useState } from 'react';
import Styles from './accordionFilter.module.sass';
import { FilterAccordionTheme, FilterChipTheme } from '../../../utils/themes';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
	ThemeProvider,
	Chip,
	Grid,
	Box,
	Button,
} from '@mui/material';
import Image from 'next/image';
import AccordionDropDownSVG from '../../../public/assets/svgs/globalIcons/filter-drop-down.svg';
import { OfferGetAvailableShopFiltersType, OfferProductColors } from '../../../types/offer/offerTypes';
import { useRouter } from 'next/router';
import { getCategoriesDataArray, getForWhomDataArray } from '../../../utils/rawData';
import { hexToRGB } from '../../../utils/helpers';
import { availableColorsList } from '../../groupedComponents/temp-offer/radioCheckElement/colorsRadioCheckContent/colorsRadioCheckContent';
import IosSwitch from '../../htmlElements/switches/iosSwitch';
import TextButton from '../../htmlElements/buttons/textButton/textButton';
import PrimaryButton from '../../htmlElements/buttons/primaryButton/primaryButton';
import { OfferColorsListType } from '../../../types/ui/uiTypes';
import { ParsedUrlQueryInput } from "querystring";

type FilterColorsGridParentType = {
	availableColors: Array<OfferProductColors>;
	selectedColorsList: Array<string>;
	setSelectedColorsList: React.Dispatch<React.SetStateAction<Array<string>>>;
};
const FlterColorsGridParent: React.FC<FilterColorsGridParentType> = (props: FilterColorsGridParentType) => {
	const colorOnClickHandler = (color: OfferProductColors) => {
		if (!props.selectedColorsList.includes(color)) {
			props.setSelectedColorsList((prevState) => {
				return [...prevState, color];
			});
		} else {
			const colorsList = [...props.selectedColorsList];
			const index = props.selectedColorsList.indexOf(color);
			if (index > -1) {
				colorsList.splice(index, 1);
				props.setSelectedColorsList(colorsList);
			}
		}
	};

	const constructColorsList: Array<OfferColorsListType> = [];
	props.availableColors.map((availableColor) => {
		const color = availableColorsList.find((item) => item.code === availableColor);
		if (color) {
			constructColorsList.push(color);
		}
	});

	return (
		<Grid container rowGap={1}>
			{constructColorsList.map((color, index) => {
				const rippleColor = hexToRGB(color.hex, 0.5);
				const colorExistInPage = props.availableColors.includes(color.code as OfferProductColors);
				const colorSelected = props.selectedColorsList.includes(color.code as OfferProductColors);

				return (
					<Grid item md={2} sm={2} key={index}>
						<Stack direction="column" key={index}>
							<Box className={`${Styles.colorWrapper} ${colorSelected ? Styles.colorActive : ''}`}>
								<Button
									className={Styles.colorButton}
									sx={{
										border: color.code === 'WT' ? `1px solid ${!colorExistInPage ? '#A3A3AD' : '#0D070B'}` : '0',
										background: color.hex,
										opacity: `${!colorExistInPage ? '.4' : '1'}`,
										'&:hover': {
											backgroundColor: `${rippleColor} !important`,
										},
									}}
									size="small"
									onClick={() => colorOnClickHandler(color.code as OfferProductColors)}
									color="primary"
									disabled={!colorExistInPage}
								/>
							</Box>
						</Stack>
					</Grid>
				);
			})}
		</Grid>
	);
};

type AccordionFilterContentType = {
	title: string;
	children?: React.ReactNode;
};
const AccordionFilterContent: React.FC<AccordionFilterContentType> = (props: AccordionFilterContentType) => {
	return (
		<Accordion disableGutters square expanded>
			<AccordionSummary expandIcon={<Image src={AccordionDropDownSVG} alt="" width={16} height={16} />}>
				<span className={Styles.filterTitle}>{props.title}</span>
			</AccordionSummary>
			<AccordionDetails>{props.children}</AccordionDetails>
		</Accordion>
	);
};

type AccordionChipContentType = {
	pickedList: Array<string>;
	objectToMap: Array<string>;
	setPickedList: React.Dispatch<React.SetStateAction<Array<string>>>;
	voirTout?: boolean;
};
const AccordionChipContent: React.FC<AccordionChipContentType> = (props: AccordionChipContentType) => {
	const chipTheme = FilterChipTheme();
	const [objectToMap, setObjectToMap] = useState<Array<string>>(
		props.voirTout ? props.objectToMap.slice(0, 10) : props.objectToMap,
	);
	const [voirToutClicked, setVoirToutClicked] = useState<boolean>(false);

	useEffect(() => {
		if (voirToutClicked) {
			setObjectToMap(props.objectToMap);
		}
	}, [voirToutClicked, props.objectToMap]);

	return (
		<Stack direction="column" spacing={1}>
			<Stack
				direction="row"
				flexWrap="wrap"
				rowGap={1}
				columnGap={1}
				justifyContent="flex-start"
				alignItems="flex-start"
			>
				<ThemeProvider theme={chipTheme}>
					{objectToMap.map((item, index) => {
						return (
							<Chip
								key={index}
								label={item}
								variant={props.pickedList.includes(item) ? 'filled' : 'outlined'}
								onClick={() => {
									if (props.pickedList.includes(item)) {
										props.setPickedList((prevState) => {
											return prevState.filter((value) => value !== item);
										});
									} else {
										props.setPickedList((prevState) => {
											return [...prevState, item];
										});
									}
								}}
							/>
						);
					})}
				</ThemeProvider>
			</Stack>
			{/*  */}
			{props.voirTout && !voirToutClicked && props.objectToMap.length > 10 && (
				<TextButton buttonText="Voir tout" onClick={() => setVoirToutClicked(true)} cssClass={Styles.voirToutButton} />
			)}
		</Stack>
	);
};

type AccordionRadioSwitchType = {
	title: string;
	selected: boolean;
	setSelected: React.Dispatch<React.SetStateAction<boolean>>;
};
const AccordionSwitchCheck: React.FC<AccordionRadioSwitchType> = (props: AccordionRadioSwitchType) => {
	return (
		<Stack direction="row" spacing={2} alignItems="center">
			<IosSwitch
				checked={props.selected}
				onChange={props.setSelected}
				activeColor="#0D070B"
				labelcssStyles={{ marginRight: '0px', marginLeft: '0px' }}
			/>
			<span className={`${Styles.switchLabel} ${props.selected && Styles.switchActive}`}>{props.title}</span>
		</Stack>
	);
};

type Props = {
	availableFilters: OfferGetAvailableShopFiltersType;
	setApplyFiltersClicked: React.Dispatch<React.SetStateAction<boolean>>;
	closeModal?: () => void;
	children?: React.ReactNode;
};
const AccordionFilter: React.FC<Props> = (props: Props) => {
	const { availableFilters } = props;
	const router = useRouter();

	// filter states
	const [pickedCategories, setPickedCategories] = useState<Array<string>>([]);
	const [pickedColors, setPickedColors] = useState<Array<string>>([]);
	const [pickedSizes, setPickedSizes] = useState<Array<string>>([]);
	const [pickedForWhom, setPickedForWhom] = useState<Array<string>>([]);
	const [pickedCities, setPickedCities] = useState<Array<string>>([]);
	const [pickedSolder, setPickedSolder] = useState<boolean>(false);
	const [pickedLabels, setPickedLabels] = useState<boolean>(false);
	const [pickedMaroc, setPickedMaroc] = useState<boolean>(false);

	const {
		available_categories,
		available_colors,
		available_for_whom,
		available_made_in_maroc,
		available_labels,
		available_sizes,
		available_solder,
		available_cities,
		available_services,
	} = availableFilters;

	// useEffect(() => {
	// 	console.log(pickedCategories);
	// 	console.log(pickedColors);
	// 	console.log(pickedSizes);
	// 	console.log(pickedForWhom);
	// 	console.log(pickedCities);
	// }, [pickedCategories, pickedColors, pickedSizes, pickedForWhom, pickedCities]);

	const applyFilterHandler = () => {
		let queryParams: ParsedUrlQueryInput = {
			...router.query,
		};
		const options = { shallow: true, scroll: false };
		if (available_services) {
			pickedCategories.push('SE'); // service
		}
		if (pickedCategories.length > 0) {
			queryParams = { ...queryParams, categories: pickedCategories.join(',') };
		} else {
			if(!available_services) {
				delete queryParams['categories'];
			}
		}
		if (pickedColors.length > 0) {
			queryParams = { ...queryParams, colors: pickedColors.join(',') };
		} else {
			delete queryParams['colors'];
		}
		if (pickedSizes.length > 0) {
			queryParams = { ...queryParams, sizes: pickedSizes.join(',') };
		} else {
			delete queryParams['sizes'];
		}
		if (pickedForWhom.length > 0) {
			queryParams = { ...queryParams, forWhom: pickedForWhom.join(',') };
		} else {
			delete queryParams['forWhom'];
		}
		if (pickedCities.length > 0) {
			queryParams = { ...queryParams, cities: pickedCities.join(',') };
		} else {
			delete queryParams['cities'];
		}
		if (pickedSolder) {
			queryParams = { ...queryParams, solder: true };
		} else {
			delete queryParams['solder'];
		}
		if (pickedLabels) {
			queryParams = { ...queryParams, labels: true };
		} else {
			delete queryParams['labels'];
		}
		if (pickedMaroc) {
			queryParams = { ...queryParams, maroc: true };
		} else {
			delete queryParams['maroc'];
		}
		router.replace({ query: { ...queryParams } }, undefined, options).then(() => {
			props.setApplyFiltersClicked(true);
		});

		if (props.closeModal){
			props.closeModal();
		}
	};

	const clearFiltersHandler = () => {
		setPickedCategories([]);
		setPickedColors([]);
		setPickedSizes([]);
		setPickedForWhom([]);
		setPickedCities([]);
		setPickedSolder(false);
		setPickedLabels(false);
		setPickedMaroc(false);
		let queryParams: ParsedUrlQueryInput = {};
		if (router.query.sort_by) {
			queryParams = {
				sort_by: router.query.sort_by
			}
		}
		router
			.replace(
				{
					pathname: router.pathname,
					query: {
						...queryParams,
						shop_link: router.query.shop_link
					},
				},
				undefined,
				{ shallow: true, scroll: false },
			)
			.then(() => {
				props.setApplyFiltersClicked(true);
			});
	};

	// Content
	let categoriesFilter;
	if (available_categories.length > 0) {
		const categories = getCategoriesDataArray(available_categories);
		if (available_services) {
			categories.push('Services');
		}
		categoriesFilter = (
			<AccordionFilterContent title="Tags">
				<AccordionChipContent
					pickedList={pickedCategories}
					setPickedList={setPickedCategories}
					objectToMap={categories}
				/>
			</AccordionFilterContent>
		);
	} else {
		const categories: Array<string> = [];
		if (available_services) {
			categories.push('Services');
		}
		categoriesFilter = (
			<AccordionFilterContent title="Tags">
				<AccordionChipContent
					pickedList={pickedCategories}
					setPickedList={setPickedCategories}
					objectToMap={categories}
				/>
			</AccordionFilterContent>
		)
	}

	let colorsFilter = null;
	if (available_colors.length > 0) {
		colorsFilter = (
			<AccordionFilterContent title="Couleurs">
				<FlterColorsGridParent
					availableColors={available_colors}
					selectedColorsList={pickedColors}
					setSelectedColorsList={setPickedColors}
				/>
			</AccordionFilterContent>
		);
	}

	let sizesFilter = null;
	if (available_sizes.length > 0) {
		sizesFilter = (
			<AccordionFilterContent title="Tailles">
				<AccordionChipContent pickedList={pickedSizes} setPickedList={setPickedSizes} objectToMap={available_sizes} />
			</AccordionFilterContent>
		);
	}

	let forWhomFilter = null;
	if (available_for_whom.length > 0) {
		const forWhom = getForWhomDataArray(available_for_whom, true);
		forWhomFilter = (
			<AccordionFilterContent title="Pour qui">
				<AccordionChipContent pickedList={pickedForWhom} setPickedList={setPickedForWhom} objectToMap={forWhom} />
			</AccordionFilterContent>
		);
	}
	let citiesFilter = null;
	if (available_cities.length > 0) {
		citiesFilter = (
			<AccordionFilterContent title="Villes">
				<AccordionChipContent
					pickedList={pickedCities}
					setPickedList={setPickedCities}
					objectToMap={available_cities}
					voirTout
				/>
			</AccordionFilterContent>
		);
	}

	return (
		<ThemeProvider theme={FilterAccordionTheme()}>
			<Stack direction="column" className={Styles.rootStack}>
				{categoriesFilter}
				{colorsFilter}
				{sizesFilter}
				{forWhomFilter}
				<Stack direction="column" className={Styles.rootStack} mt={1} mb="25px">
					{available_solder && (
						<AccordionSwitchCheck title="Soldé" selected={pickedSolder} setSelected={setPickedSolder} />
					)}
					{available_labels && (
						<AccordionSwitchCheck title="Labels" selected={pickedLabels} setSelected={setPickedLabels} />
					)}
					{available_made_in_maroc && (
						<AccordionSwitchCheck title="Made in Maroc" selected={pickedMaroc} setSelected={setPickedMaroc} />
					)}
				</Stack>
				{citiesFilter}
			</Stack>
			<Stack direction="column" mt="1rem">
				<PrimaryButton
					buttonText="Filtrer"
					active
					onClick={applyFilterHandler}
					cssClass={Styles.applyFilterButton}
					type="button"
				/>
				<TextButton buttonText="Effacer" cssClass={Styles.clearFilterButton} onClick={clearFiltersHandler} />
			</Stack>
		</ThemeProvider>
	);
};

export default AccordionFilter;
