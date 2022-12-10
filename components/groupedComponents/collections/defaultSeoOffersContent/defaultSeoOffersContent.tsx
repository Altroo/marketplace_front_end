import React, { useCallback, useEffect, useState } from 'react';
import Styles from './defaultSeoOffersContent.module.sass';
import MobileFilterWhiteSVG from '../../../../public/assets/svgs/globalIcons/mobile-filter-white.svg';
import MobileOffersFilterButton from '../../../mobile/buttons/mobileOffersFilterButton/mobileOffersFilterButton';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../../utils/hooks';
import { availableFiltersInit, offerLinkedHashMapType } from '../../shop/get/shopTabContent/shopTabContent';
import {
	GetOffersSagaCallBackOnCompleteDataType,
	OfferGetAvailableShopFiltersType,
	OfferGetMyOffersProductServiceType,
} from '../../../../types/offer/offerTypes';
import {
	seoPagesGetAvailableFiltersBySeoPageUrlAction,
	seoPagesGetOffersBySeoPageUrlWithQueryParamsAction
} from '../../../../store/actions/seo_pages/seoPagesActions';
import { ApiErrorResponseType } from '../../../../types/_init/_initTypes';
import { Desktop, generateQueryParams, getBackendNextPageNumber } from "../../../../utils/helpers";
import { Iterables } from 'langx-js';
import { ParsedUrlQueryInput } from 'querystring';
import ApiProgress from '../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { Box, Button, Grid, Skeleton, Stack, ThemeProvider } from '@mui/material';
import ShopFilterSelect from '../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import AccordionFilter from '../../../layouts/accordionFilter/accordionFilter';
import Link from 'next/link';
import { REAL_OFFER_ROUTE } from '../../../../utils/routes';
import Image from 'next/image';
import CreatorIconSVG from '../../../../public/assets/svgs/globalIcons/creator.svg';
import { getDefaultTheme } from '../../../../utils/themes';
import SeoAnchorWrapper from '../../../htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import CustomSwipeModal from '../../../desktop/modals/rightSwipeModal/customSwipeModal';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';

type Props = {
	page_url: string;
	children?: React.ReactNode;
};

const DefaultSeoOffersContent: React.FC<Props> = (props: Props) => {
	const { page_url } = props;
	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'C'>('D');
	const dispatch = useAppDispatch();
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [filterChanged, setFilterChanged] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [offersLinkedHashMap, setOffersLinkedHashMap] = useState<offerLinkedHashMapType>({
		count: 0,
		nextPage: null,
		offersMap: null,
	});
	const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
	const [availableFiltersFetched, setAvailableFiltersFetched] = useState<boolean>(false);
	const [availableFilters, setAvailableFilters] = useState<OfferGetAvailableShopFiltersType>(availableFiltersInit);
	const [applyFiltersClicked, setApplyFiltersClicked] = useState<boolean>(false);
	const [availableFiltersHasData, setAvailableFiltersHasData] = useState<boolean>(false);
	const [imagesLoading, setImagesLoading] = useState<Array<boolean>>([]);

	useEffect(() => {
		if (!availableFiltersFetched) {
			const action = seoPagesGetAvailableFiltersBySeoPageUrlAction(page_url);
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
			let url = `${process.env.NEXT_PUBLIC_SEO_PAGES_OFFERS}${page_url}/`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generateQueryParams(router.query, nextPage);
				url += queryParams;
			} else {
				queryParams = generateQueryParams(router.query);
				url += queryParams;
			}
			const action = seoPagesGetOffersBySeoPageUrlWithQueryParamsAction(url);
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
						setIsLoadingNextPageInProgress(false);
						if (isReset) {
							setIsLoadingInitInProgress(false);
							setFirstPageLoaded(true);
						}
					}
				},
			});
		};

		const loadFirstPage = () => {
			getOffers(true);
		};

		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
		}

		// load more pressed
		if (loadMoreState) {
			if (offersLinkedHashMap.offersMap) {
				const isReset = offersLinkedHashMap.offersMap.size() >= offersLinkedHashMap.count;
				getOffers(isReset);
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
		applyFiltersClicked,
		availableFiltersFetched,
		dispatch,
		filterChanged,
		firstPageLoaded,
		loadMoreState,
		offersLinkedHashMap,
		router.query,
		page_url,
	]);

	const filterOnChange = useCallback(
		(e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null, value: string) => {
			setFilter(value as 'D' | 'C');
			const queryParams: ParsedUrlQueryInput = {
				...router.query,
				page_url: page_url,
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
		},
		[page_url, router],
	);

	const closeMobileFilterModal = useCallback(() => {
		setOpenFilterModal(false);
	}, []);

	return (
		<>
			<MobileOffersFilterButton
				buttonText="Filtrer"
				svgIcon={MobileFilterWhiteSVG}
				textColor="#FFFFFF"
				backgroundColor="#0D070B"
				onClick={() => setOpenFilterModal(true)}
			/>
			{(isLoadingInitInProgress || isLoadingNextPageInProgress) && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			<Box sx={{ minHeight: '450px' }}>
				{!offersLinkedHashMap.offersMap?.isEmpty() && firstPageLoaded && (
					<>
						<Desktop>
							<Stack
							className={Styles.filterWrapper}
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<span className={Styles.filterText}>Filtrer</span>
							<ShopFilterSelect
								onChange={(e, value) => {
									filterOnChange(e, value as 'D' | 'C');
								}}
								state={filter}
								setStateHandler={setFilter}
								activeHoverColor="#0D070B"
							/>
						</Stack>
						</Desktop>

						<Stack direction="row" justifyContent="space-between" className={Styles.rootShopFilterWrapper}>
							{availableFiltersHasData && (
								<Desktop>
									<Stack direction="column" className={Styles.shopFilterWrapperDesktopOnly}>
										<AccordionFilter
											filterFor="COLLECTIONS"
											availableFilters={availableFilters}
											setApplyFiltersClicked={setApplyFiltersClicked}
										/>
									</Stack>
								</Desktop>
							)}
							<div className={`${offersLinkedHashMap.nextPage ? Styles.gridInStack : Styles.gridInBlock}`}>
								<Grid container wrap="wrap" className={Styles.rootGrid}>
									{offersLinkedHashMap.offersMap
										?.entrySet()
										.toArray()
										.map((data, index) => {
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
														href={REAL_OFFER_ROUTE(data.value.shop_url as string, encodeURIComponent(data.key))}
														key={data.key}
														className={Styles.gridCardOfferWrapper}
													>
														<Grid item xs="auto" className={Styles.mobileGridRoot}>
															<Stack direction="column" spacing={2}>
																<Box className={Styles.thumbnailWrapper}>
																	<Box sx={{ position: 'relative', height: '100%', borderRadius: '20px' }}>
																		{(!imagesLoading[index] || !data.value.thumbnail) && (
																			<Skeleton
																				animation="wave"
																				variant="rectangular"
																				width={250}
																				height={165}
																				sx={{ position: 'absolute' }}
																				className={Styles.offerThumb}
																			/>
																		)}
																		{data.value.thumbnail && (
																			<Image
																				onLoadingComplete={() => {
																					setImagesLoading((prevState) => {
																						prevState[index] = true;
																						return [...prevState];
																					});
																				}}
																				src={data.value.thumbnail}
																				alt=""
																				width="0"
																				height="0"
																				sizes="100vw"
																				className={Styles.offerThumb}
																				loading="eager"
																				priority={true}
																			/>
																		)}
																	</Box>
																	{data.value.creator_label && (
																		<Image
																			className={Styles.creatorImageTag}
																			src={CreatorIconSVG}
																			alt="creator"
																			width="0"
																			height="0"
																			sizes="100vw"
																		/>
																	)}
																</Box>
																<Stack direction="column" spacing={0}>
																	<span className={Styles.offerTitle}>
																		{data.value.title.length >= 25
																			? data.value.title.substring(0, 25) + '...'
																			: data.value.title}
																	</span>
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
													onClick={() => {
														setLoadMoreState(true);
														setIsLoadingNextPageInProgress(true);
													}}
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
				)}
				{/* Mobile filter MODAL */}
				{availableFiltersHasData && (
					<CustomSwipeModal transition open={openFilterModal} handleClose={() => setOpenFilterModal(false)} keepMounted={true}>
						<Stack
							className={Styles.mobileFilterRootStack}
							direction="column"
							justifyContent="space-between"
							alignContent="space-between"
						>
							<Box className={Styles.closeButtonWrapper}>
								<Image
									src={CloseSVG}
									width={40}
									height={40}
									alt=""
									onClick={() => setOpenFilterModal(false)}
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
								activeHoverColor="#0D070B"
							/>
							<AccordionFilter
								filterFor="COLLECTIONS"
								availableFilters={availableFilters}
								setApplyFiltersClicked={setApplyFiltersClicked}
								closeModal={closeMobileFilterModal}
							/>
						</Stack>
					</CustomSwipeModal>
				)}
				{/* END EDIT CONTENT MODAL */}
			</Box>
		</>
	);
};

export default DefaultSeoOffersContent;
