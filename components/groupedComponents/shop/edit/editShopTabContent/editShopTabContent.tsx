import React, { useEffect, useState } from 'react';
import Styles from './editShopTabContent.module.sass';
import SharedStyles from '../../../../groupedComponents/temp-shop/edit/startYourShopContent/startYourShopContent.module.sass';
import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import { Box, Button, Grid, Stack, ThemeProvider } from '@mui/material';
import {
	GetOffersSagaCallBackOnCompleteDataType,
	OfferGetAvailableShopFiltersType,
	OfferGetMyOffersProductServiceType
} from "../../../../../types/offer/offerTypes";
import Link from 'next/link';
import { default as ImageFuture } from 'next/future/image';
import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
import Image from 'next/image';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
import { useRouter } from 'next/router';
import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
import { useAppDispatch } from '../../../../../utils/hooks';
import {
	offerGetAvailableFiltersByShopID, offerGetAvailableFiltersByUniqueID, offerGetLastThreeUsedDeliveriesAction,
	offerGetOffersByShopIDWithQueryParamsAction,
	offerPostPinWithCallBackAction, setEmptyUserLocalOffer
} from "../../../../../store/actions/offer/offerActions";
import { getDefaultTheme } from '../../../../../utils/themes';
import SeoAnchorWrapper from '../../../../htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import { ParsedUrlQueryInput } from 'node:querystring';
import { generateQueryParams, getBackendNextPageNumber } from '../../../../../utils/helpers';
import ApiProgress from '../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { Iterables } from 'langx-js';
import {
	ApiErrorResponseType,
	OfferPinSagaCallBackType,
} from '../../../../../types/_init/_initTypes';
import AccordionFilter from '../../../../layouts/accordionFilter/accordionFilter';
import RightSwipeModal from '../../../../desktop/modals/rightSwipeModal/rightSwipeModal';
import CloseSVG from '../../../../../public/assets/svgs/navigationIcons/close.svg';
import CenteredInfoAction from '../../../temp-shop/create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../../htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import ActivatedAddIconSVG from '../../../../../public/assets/svgs/globalIcons/blue-add.svg';
import {
	REAL_OFFER_ADD_INDEX,
	REAL_OFFER_ROUTE,
	TEMP_OFFER_ADD_INDEX,
	TEMP_OFFER_ROUTE
} from "../../../../../utils/routes";
import LargeBorderIconAnchorButton from '../../../../htmlElements/buttons/largeBorderIconAnchorButton/largeBorderIconAnchorButton';
import PinInactiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-inactive.svg';

type offerLinkedHashMapType = {
	offersMap: Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType> | null;
	count: number;
	nextPage: string | null;
};

type Props = {
	shop_pk: number | string;
	activeColor: string;
	openFilterModal: boolean;
	setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
	shop_type: 'TEMP_SHOP' | 'AUTH_SHOP';
	children?: React.ReactNode;
};

const availableFiltersInit: OfferGetAvailableShopFiltersType = {
	available_categories: [],
	available_colors: [],
	available_sizes: [],
	available_for_whom: [],
	available_solder: false,
	available_labels: false,
	available_made_in_maroc: false,
	available_cities: [],
	available_services: false,
};

const EditShopTabContent: React.FC<Props> = (props: Props) => {
	const { shop_pk, shop_type } = props;
	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'C'>('D');
	const dispatch = useAppDispatch();
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [filterChanged, setFilterChanged] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(false);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [offersLinkedHashMap, setOffersLinkedHashMap] = useState<offerLinkedHashMapType>({
		count: 0,
		nextPage: null,
		offersMap: null,
	});
	const [availableFiltersFetched, setAvailableFiltersFetched] = useState<boolean>(false);
	const [availableFilters, setAvailableFilters] = useState<OfferGetAvailableShopFiltersType>(availableFiltersInit);
	const [applyFiltersClicked, setApplyFiltersClicked] = useState<boolean>(false);

	// const getCurrentQueryParams = useCallback(async () => {
	// 	return generateQueryParams(router.query);
	// }, [router.query]);
	// const checkNextPage = async (index: number) => {
	// 	if (isLoadingNextPageInProgress) {
	// 		return;
	// 	}
	// 	if (offersLinkedHashMap.offersMap) {
	// 		if (index >= offersLinkedHashMap.offersMap.size() - 1) {
	// 			setIsLoadingNextPageInProgress(true);
	// 			await getOffers();
	// 			setIsLoadingNextPageInProgress(false);
	// 		}
	// 	}
	// };
	const [availableFiltersHasData, setAvailableFiltersHasData] = useState<boolean>(false);

	useEffect(() => {
		if (!availableFiltersFetched) {
			if (shop_type === 'AUTH_SHOP') {
				const action = offerGetAvailableFiltersByShopID(shop_pk as number);
				dispatch({
					...action,
					onComplete: ({
						error,
						cancelled,
						data,
					}: {
						error: ApiErrorResponseType;
						cancelled: boolean;
						data: OfferGetAvailableShopFiltersType;
					}) => {
						if (!error && !cancelled && data) {
							setAvailableFilters(data);
							setAvailableFiltersHasData(true);
						}
					},
				});
			} else if (shop_type === 'TEMP_SHOP') {
				const action = offerGetAvailableFiltersByUniqueID(shop_pk as string);
				dispatch({
					...action,
					onComplete: ({
						error,
						cancelled,
						data,
					}: {
						error: ApiErrorResponseType;
						cancelled: boolean;
						data: OfferGetAvailableShopFiltersType;
					}) => {
						if (!error && !cancelled && data) {
							setAvailableFilters(data);
							setAvailableFiltersHasData(true);
						}
					},
				});
			}
			setAvailableFiltersFetched(true);
		}

		const getOffers = (isReset = false) => {
			const { count, nextPage, offersMap } = offersLinkedHashMap;
			// is reset = false.
			// offers map is full
			// count > 0
			// offers map size >= count
			if (!isReset && offersMap !== null && count > 0 && offersMap.size() >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_OFFER_OFFERS}${shop_pk}/`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generateQueryParams(router.query, nextPage);
				url += queryParams;
			} else {
				queryParams = generateQueryParams(router.query);
				url += queryParams;
			}
			const action = offerGetOffersByShopIDWithQueryParamsAction(url);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType>;
						if (offersMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType>();
						} else {
							map = offersMap;
						}
						data.results.map((offer) => {
							map.put(offer.pk, offer);
						});
						const result = {
							offersMap: map,
							nextPage: getBackendNextPageNumber(data.next),
							count: data.count,
						};
						setOffersLinkedHashMap(result);
					}
				},
			});
		};

		const loadFirstPage = () => {
			setIsLoadingInitInProgress(true);
			getOffers(true);
			setIsLoadingInitInProgress(false);
		};

		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
			setFirstPageLoaded(true);
		}

		// load more pressed
		if (loadMoreState) {
			if (isLoadingNextPageInProgress) {
				return;
			}
			setIsLoadingNextPageInProgress(true);
			if (offersLinkedHashMap.offersMap) {
				const isReset = offersLinkedHashMap.offersMap.size() >= offersLinkedHashMap.count;
				getOffers(isReset);
				setIsLoadingNextPageInProgress(false);
			}
			setLoadMoreState(false);
		}

		// price filter changed
		if (filterChanged) {
			loadFirstPage();
			setFilterChanged(false);
		}
		if (applyFiltersClicked) {
			loadFirstPage();
			setApplyFiltersClicked(false);
		}
	}, [
		shop_type,
		applyFiltersClicked,
		availableFiltersFetched,
		dispatch,
		filterChanged,
		firstPageLoaded,
		isLoadingNextPageInProgress,
		loadMoreState,
		offersLinkedHashMap,
		router.query,
		shop_pk,
	]);

	const filterOnChange = (
		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null,
		value: string,
	) => {
		setFilter(value as 'D' | 'C');
		// default prix decroissant.
		// -price = D
		// price = T
		const queryParams: ParsedUrlQueryInput = {
			// shop_link: router.query.shop_link,
			// sort_by: '-price',
			...router.query,
		};
		const options = { shallow: true, scroll: false };

		if (router.query.page) {
			if (value === 'D') {
				router.replace({ query: { ...queryParams, sort_by: '-price' } }, undefined, options).then(() => {
					setFilterChanged(true);
				});
			} else {
				router.replace({ query: { ...queryParams, sort_by: 'price' } }, undefined, options).then(() => {
					setFilterChanged(true);
				});
			}
		} else {
			if (value === 'D') {
				router.replace({ query: { ...queryParams, sort_by: '-price' } }, undefined, options).then(() => {
					setFilterChanged(true);
				});
			} else {
				router.replace({ query: { ...queryParams, sort_by: 'price' } }, undefined, options).then(() => {
					setFilterChanged(true);
				});
			}
		}
	};

	// const [searchValue, setSearchValue] = useState<string>('');

	const closeMobileFilterModal = () => {
		props.setOpenFilterModal(false);
	};

	const togglePinHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, pk: number) => {
		e.preventDefault();
		const action = offerPostPinWithCallBackAction(pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: OfferPinSagaCallBackType) => {
				if (!error && !cancelled && data) {
					if (offersLinkedHashMap.offersMap) {
						const userOfferIndex = offersLinkedHashMap.offersMap
							.entrySet()
							.toArray()
							.findIndex((item) => item.value?.pk === pk);
						if (userOfferIndex >= 0) {
							const map = offersLinkedHashMap.offersMap.entrySet().toArray()[userOfferIndex];
							if (map.value) {
								map.value.pinned = data.pinned;
								offersLinkedHashMap.offersMap.put(pk, map.value);
								offersLinkedHashMap.offersMap
									.entrySet()
									.toArray()
									.sort((a, b) => Number(b.value?.pinned) - Number(a.value?.pinned));
								setOffersLinkedHashMap(offersLinkedHashMap);
								router.replace(router.asPath).then();
							}
						}
					}
				}
			},
		});
	};

	return (
		<>
			{(isLoadingInitInProgress || isLoadingNextPageInProgress) && ( // todo : fix loading doesn't trigger
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FBFBFB"
					circularColor="#0D070B"
				/>
			)}
			<Box sx={{ minHeight: '450px' }}>
				{!offersLinkedHashMap.offersMap?.isEmpty() ? (
					<>
						<Stack
							className={Styles.filterWrapper}
							flexDirection="row"
							justifyContent="space-between"
							gap={0}
							alignItems="center"
						>
							<span className={Styles.filterText}>Filtrer</span>
							<ShopFilterSelect
								onChange={(e, value) => {
									filterOnChange(e, value as 'D' | 'C');
								}}
								state={filter}
								setStateHandler={setFilter}
								activeHoverColor={props.activeColor}
							/>
						</Stack>
						<Stack direction="row" justifyContent="space-between" gap="28px" className={Styles.rootShopFilterWrapper}>
							{/* filter search removed */}
							{/*<IconTextInput*/}
							{/*	active={true}*/}
							{/*	placeholder="Rechercher"*/}
							{/*	value={searchValue}*/}
							{/*	onChange={(e) => setSearchValue(e.target.value)}*/}
							{/*/>*/}
							{availableFiltersHasData && (
								<Stack direction="column" className={Styles.shopFilterWrapperDesktopOnly}>
									<AccordionFilter
										availableFilters={availableFilters}
										setApplyFiltersClicked={setApplyFiltersClicked}
									/>
								</Stack>
							)}
							<div className={`${offersLinkedHashMap.nextPage ? Styles.gridInStack : Styles.gridInBlock}`}>
								<Grid container gap="15px" wrap="wrap">
									<Grid item xs="auto" className={SharedStyles.gridButtonAddAnOfferWrapper}>
										<LargeBorderIconAnchorButton
											buttonText="Ajouter un article"
											svgIcon={ActivatedAddIconSVG}
											active={true}
											onClick={() => {
												dispatch(setEmptyUserLocalOffer());
												dispatch(offerGetLastThreeUsedDeliveriesAction());
											}}
											nextPage={shop_type === 'AUTH_SHOP' ? REAL_OFFER_ADD_INDEX(router.query.shop_link as string) : TEMP_OFFER_ADD_INDEX}
										/>
									</Grid>
									{offersLinkedHashMap.offersMap
										?.entrySet()
										.toArray()
										.map((data) => {
											if (data.value) {
												const { price, solder_type, solder_value } = data.value;
												let newPrice = 0;
												if (solder_type !== null && solder_value !== null) {
													if (solder_type === 'F') {
														newPrice = price - solder_value;
													} else if (solder_type === 'P') {
														newPrice = price - (price * solder_value) / 100;
													}
												}
												return (
													<Link
														href={
														shop_type === 'AUTH_SHOP' ?
														REAL_OFFER_ROUTE(router.query.shop_link as string, encodeURIComponent(data.key)) : TEMP_OFFER_ROUTE(encodeURIComponent(data.key))
													}
														passHref
														key={data.key}
													>
														<a className={Styles.gridCardOfferWrapper}>
															<Grid item xs="auto">
																<Stack direction="column" spacing={2}>
																	<Box className={Styles.thumbnailWrapper}>
																		{data.value.pinned ? (
																			<ImageFuture
																				src={PinActiveIconSVG}
																				alt=""
																				width={32}
																				height={32}
																				className={Styles.thumbnailActionIcon}
																				loading="lazy"
																				onClick={(e) => togglePinHandler(e, data.key)}
																			/>
																		) : (
																			<ImageFuture
																				src={PinInactiveIconSVG}
																				alt=""
																				width={32}
																				height={32}
																				className={Styles.thumbnailActionIcon}
																				loading="lazy"
																				onClick={(e) => togglePinHandler(e, data.key)}
																			/>
																		)}
																		<ImageFuture
																			src={data.value.thumbnail}
																			alt=""
																			width="0"
																			height="0"
																			sizes="100vw"
																			className={Styles.offerThumb}
																			loading="lazy"
																		/>
																		{data.value.creator_label && (
																			<ImageFuture
																				className={Styles.creatorImageTag}
																				src={CreatorIconSVG}
																				alt="creator"
																				width="0"
																				height="0"
																				sizes="100vw"
																			/>
																		)}
																	</Box>
																	<Stack direction="column" spacing={1}>
																		<span className={Styles.offerTitle}>
																			{data.value.title.length >= 25
																				? data.value.title.substring(0, 25) + '...'
																				: data.value.title}
																		</span>
																		<Stack direction="row">
																			<Image src={BlackStarSVG} width={20} height={20} alt="" />
																			<span className={Styles.offerRating}>0 (0 notes)</span>
																		</Stack>
																		<Stack direction="row" spacing={1}>
																			<span
																				className={`${Styles.offerPrice} ${
																					data.value.solder_value !== null && Styles.oldPrice
																				}`}
																			>
																				{data.value.price + ' DH'}
																			</span>
																			<span className={Styles.solderPrice}>
																				{data.value.solder_value !== null ? newPrice + ' DH' : null}
																			</span>
																		</Stack>
																	</Stack>
																</Stack>
															</Grid>
														</a>
													</Link>
												);
											}
										})}
								</Grid>
								{offersLinkedHashMap.nextPage && (
									<ThemeProvider theme={getDefaultTheme()}>
										<Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
											<SeoAnchorWrapper
												href={{
													query: {
														// shop_link: router.query.shop_link,
														// sort_by: `${filter === 'D' ? '-price' : 'price'}`,
														...router.query,
														page: offersLinkedHashMap.nextPage,
													},
												}}
												replace={true}
												scroll={false}
												shallow={true}
											>
												<Button
													variant="text"
													color="primary"
													className={Styles.loadMoreButton}
													onClick={() => setLoadMoreState(true)}
												>
													Charger plus
												</Button>
											</SeoAnchorWrapper>
										</Stack>
									</ThemeProvider>
								)}
							</div>
						</Stack>
					</>
				) : (
					<>
						<div className={SharedStyles.shopAddOfferWrapper}>
							<div className={SharedStyles.addOfferContainer}>
								<div className={SharedStyles.centeredInfoActionWrapper}>
									<CenteredInfoAction
										header="Démarrer votre boutique"
										subHeader="Ajoutez votre premier article !"
										cssHeaderClass={SharedStyles.infoHeader}
										cssSubHeaderClass={SharedStyles.infoSubHeader}
									/>
									<BorderIconAnchorButton
										buttonText="Ajouter un article"
										svgIcon={ActivatedAddIconSVG}
										active={true}
										nextPage={shop_type === 'AUTH_SHOP' ? REAL_OFFER_ADD_INDEX(router.query.shop_link as string) : TEMP_OFFER_ADD_INDEX}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{/* Mobile filter MODAL */}
				{availableFiltersHasData && (
					<RightSwipeModal
						open={props.openFilterModal}
						handleClose={() => props.setOpenFilterModal(false)}
						keepMounted={true}
					>
						<Stack
							className={Styles.mobileFilterRootStack}
							direction="column"
							justifyContent="space-between"
							alignContent="space-between"
							columnGap={0}
							rowGap={0}
						>
							<Box className={Styles.closeButtonWrapper}>
								<Image
									src={CloseSVG}
									width={40}
									height={40}
									alt=""
									onClick={() => props.setOpenFilterModal(false)}
									style={{ cursor: 'pointer' }}
								/>
							</Box>
							<h5 className={Styles.mobileFilterHeader}>Filtrer</h5>
							<ShopFilterSelect
								onChange={(e, value) => {
									filterOnChange(e, value as 'D' | 'C');
								}}
								state={filter}
								setStateHandler={setFilter}
								activeHoverColor={props.activeColor}
							/>
							<AccordionFilter
								availableFilters={availableFilters}
								setApplyFiltersClicked={setApplyFiltersClicked}
								closeModal={closeMobileFilterModal}
							/>
						</Stack>
					</RightSwipeModal>
				)}
				{/* END EDIT CONTENT MODAL */}
			</Box>
		</>
	);
};
export default EditShopTabContent;
