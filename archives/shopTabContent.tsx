// import React, { useCallback, useEffect, useState } from 'react';
// import Styles from './shopTabContent.module.sass';
// import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
// import { Box, Button, CircularProgress, Grid, Stack, ThemeProvider } from '@mui/material';
// import { PaginationResponseType } from '../../../../../types/_init/_initTypes';
// import {
// 	OfferGetMyOffersProductInterface,
// 	OfferGetMyOffersProductServiceType,
// 	OfferGetMyOffersServiceInterface,
// } from '../../../../../types/offer/offerTypes';
// import Link from 'next/link';
// import { default as ImageFuture } from 'next/future/image';
// import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
// import Image from 'next/image';
// import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
// import { useRouter } from 'next/router';
// import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useAppDispatch } from '../../../../../utils/hooks';
// import {
// 	offerGetOffersByShopIDAction,
// 	offerGetOffersByShopIDNewAction,
// } from '../../../../../store/actions/offer/offerActions';
// import { GetOffersSagaCallBackOnCompleteDataType } from '../../../../../pages/shop/[shop_link]';
// import { getDefaultTheme } from '../../../../../utils/themes';
// import SeoAnchorWrapper from '../../../../htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
// import { ParsedUrlQueryInput } from 'node:querystring';
// import { generateQueryParams, getBackendNextPageNumber } from '../../../../../utils/helpers';
// import { paginationInitial } from '../../../../../store/slices/_init/_initSlice';
// import ApiProgress from '../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
// import { Iterables } from 'langx-js';
//
// type Props = {
// 	shop_pk: number;
// 	// offersData: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
// 	activeColor: string;
// 	children?: React.ReactNode;
// 	// loading: boolean;
// 	// setLoading: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
// };
//
// const LoadMoreLoader = () => {
// 	return (
// 		<Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
// 			<CircularProgress sx={{ color: '#FFFFFF' }} />
// 		</Box>
// 	);
// };
//
// const ShopTabContent: React.FC<Props> = (props: Props) => {
// 	const { shop_pk } = props;
// 	const router = useRouter();
// 	const page = router.query?.page;
// 	const sort_by = router.query?.sort_by;
// 	const [filter, setFilter] = useState<'D' | 'C' | null>(null);
// 	const dispatch = useAppDispatch();
// 	const [offersData, setOffersData] =
// 		useState<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>(
// 			paginationInitial,
// 		);
// 	const [firstPageDispatched, setFirstPageDispatched] = useState<boolean>(false);
// 	const [hasMoreState, setHasMoreState] = useState<boolean>(false);
// 	const [nextPageNumber, setNextPageNumber] = useState<string | null>(null);
//
// 	// const [showLoading, setShowLoading] = useState<boolean>(false);
// 	const [loading, setLoading] = useState<boolean>(false);
// 	// const [loadingMore, setLoadingMore] = useState<boolean>(false);
//
// 	const [nextPageDispatched, setNextPageDispatched] = useState<boolean>(false);
//
// 	// useEffect(() => {
// 	// 	setLoading(true);
// 	//
// 	// 	const dispatchLoadMore = (action: { type: string; pk: number; next_page: string; sort_by: string | undefined }) => {
// 	// 		dispatch({
// 	// 			...action,
// 	// 			onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
// 	// 				if (!error && !cancelled && data) {
// 	// 					setOffersData((prevState) => {
// 	// 						// second page & more
// 	// 						if (prevState.results) {
// 	// 							console.log('IN PREVIOUS RESULTS');
// 	// 							// merging previous page with new page.
// 	// 							const newSetResult = new Set<OfferGetMyOffersProductServiceType>();
// 	// 							prevState.results.map((prev) => {
// 	// 								newSetResult.add(prev);
// 	// 							});
// 	// 							data.results.map((new_) => {
// 	// 								newSetResult.add(new_);
// 	// 							});
// 	// 							const newResult: Array<OfferGetMyOffersProductServiceType> = [];
// 	// 							newSetResult.forEach((value) => {
// 	// 								console.log(value);
// 	// 								newResult.push(value);
// 	// 							});
// 	// 							console.log(action.sort_by);
// 	// 							console.log(typeof action.sort_by);
// 	// 							if (action.sort_by === '-price') {
// 	// 								newResult.sort((a, b) => b.price - a.price);
// 	// 								console.log(newResult);
// 	// 							} else if (action.sort_by === 'price') {
// 	// 								newResult.sort((a, b) => a.price - b.price);
// 	// 								console.log(newResult);
// 	// 							}
// 	// 							return {
// 	// 								results: newResult,
// 	// 								next: data.next,
// 	// 								previous: data.previous,
// 	// 								count: data.count,
// 	// 							};
// 	// 						} else {
// 	// 							// load first page data only.
// 	// 							return data;
// 	// 						}
// 	// 					});
// 	// 				}
// 	// 				// setLoading(false);
// 	// 			},
// 	// 		});
// 	// 	};
// 	//
// 	// 	const applyPriceSorting = () => {
// 	// 		if (offersData.results) {
// 	// 			const localOffers = offersData.results;
// 	// 			if (sort_by === '-price') {
// 	// 				localOffers.sort((a, b) => b.price - a.price);
// 	// 			} else if (sort_by === 'price') {
// 	// 				localOffers.sort((a, b) => a.price - b.price);
// 	// 			}
// 	// 			const sortedResult = {
// 	// 				results: localOffers,
// 	// 				next: offersData.next,
// 	// 				previous: offersData.previous,
// 	// 				count: offersData.count,
// 	// 			};
// 	// 			setOffersData(sortedResult);
// 	// 		}
// 	// 	};
// 	//
// 	// 	if (!firstPageDispatched) {
// 	// 		// dispatch first page on page init with price filter default décroissant
// 	// 		const action = offerGetOffersByShopIDAction(shop_pk, '1', '-price');
// 	// 		dispatchLoadMore(action);
// 	// 		setFirstPageDispatched(true);
// 	// 	}
// 	// 	// on first page
// 	// 	if (!offersData.previous && !page) {
// 	// 		// checking if sort param exist & not page param
// 	// 		if (sort_by) {
// 	// 			applyPriceSorting();
// 	// 		}
// 	// 		setLoading(false);
// 	// 	} else {
// 	// 		// second page and more
// 	// 		// if next page number exist & load more button clicked
// 	// 		if (offersData.next && !nextPageDispatched) {
// 	// 			const nextPage = getBackendNextPageNumber(offersData.next);
// 	// 			if (nextPage) {
// 	// 				if (sort_by) {
// 	// 					console.log('IN if sort_by');
// 	// 					console.log(sort_by);
// 	// 					const action = offerGetOffersByShopIDAction(shop_pk, nextPage as string, sort_by as string);
// 	// 					dispatchLoadMore(action);
// 	// 				} else {
// 	// 					console.log('IN else sort_by');
// 	// 					console.log(nextPage);
// 	// 					const action = offerGetOffersByShopIDAction(shop_pk, nextPage as string);
// 	// 					dispatchLoadMore(action);
// 	// 				}
// 	// 			}
// 	// 			setNextPageDispatched(true);
// 	// 		} else {
// 	// 			// case sort was applied in mid pages or last
// 	// 			if (sort_by) {
// 	// 				applyPriceSorting();
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	if (offersData.next) {
// 	// 		const pageNumber = getBackendNextPageNumber(offersData.next);
// 	// 		setNextPageNumber(pageNumber);
// 	// 		setHasMoreState(true);
// 	// 	} else {
// 	// 		setHasMoreState(false);
// 	// 		setNextPageNumber(null);
// 	// 	}
// 	// 	setLoading(false);
// 	// }, [
// 	// 	dispatch,
// 	// 	firstPageDispatched,
// 	// 	nextPageDispatched,
// 	// 	offersData.next,
// 	// 	offersData.results,
// 	// 	offersData.previous,
// 	// 	offersData.count,
// 	// 	page,
// 	// 	shop_pk,
// 	// 	sort_by,
// 	// ]);
//
// 	const [generateQueryParamsCalled, setGenerateQueryParamsCalled] = useState<boolean>(false);
//
// 	type offerLinkedHashMapType = {
// 		offersMap: Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType> | null;
// 		count: number;
// 		nextPage: string | null;
// 	};
//
// 	const [offersLinkedHashMap, setOffersLinkedHashMap] = useState<offerLinkedHashMapType>({
// 		count: 0,
// 		nextPage: null,
// 		offersMap: null,
// 	});
//
// 	useEffect(() => {
// 		setLoading(true);
//
// 		const dispatchLoadMore = (action: { type: string; pk: number; queryParams: string }) => {
// 			dispatch({
// 				...action,
// 				onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
// 					if (!error && !cancelled && data) {
// 						if (data.next) {
// 							const pageNumber = getBackendNextPageNumber(data.next);
// 							setNextPageNumber(pageNumber);
// 							setHasMoreState(true);
// 						} else {
// 							setHasMoreState(false);
// 							setNextPageNumber(null);
// 						}
// 						setOffersLinkedHashMap((prevState) => {
// 							// second page & more
// 							const map = new Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType>();
// 							// if previous data was set
// 							if (!prevState.offersMap?.isEmpty()) {
// 								prevState.offersMap
// 									?.entrySet()
// 									.toArray()
// 									.map((value) => {
// 										map.put(value.key, value.value);
// 									});
// 								data.results.map((item) => {
// 									map.put(item.pk, item);
// 								});
// 							} else {
// 								data.results.map((item) => {
// 									map.put(item.pk, item);
// 								});
// 							}
// 							return {
// 								offersMap: map,
// 								nextPage: data.next,
// 								count: data.count,
// 							};
// 							// if (prevState.offersMap) {
// 							// 	const newSetResult = new Set<OfferGetMyOffersProductServiceType>();
// 							// 	prevState.offersMap .map((prev) => {
// 							// 		newSetResult.add(prev);
// 							// 	});
// 							// 	data.results.map((new_) => {
// 							// 		newSetResult.add(new_);
// 							// 	});
// 							// 	const newResult: Array<OfferGetMyOffersProductServiceType> = [];
// 							// 	newSetResult.forEach((value) => {
// 							// 		console.log(value);
// 							// 		newResult.push(value);
// 							// 	});
// 							// 	if (action.sort_by === '-price') {
// 							// 		newResult.sort((a, b) => b.price - a.price);
// 							// 		console.log(newResult);
// 							// 	} else if (action.sort_by === 'price') {
// 							// 		newResult.sort((a, b) => a.price - b.price);
// 							// 		console.log(newResult);
// 							// 	}
// 							// 	return {
// 							// 		results: newResult,
// 							// 		next: data.next,
// 							// 		previous: data.previous,
// 							// 		count: data.count,
// 							// 	};
// 							// } else {
// 							// 	// load first page data only.
// 							// 	data.results.map((result) => {
// 							// 		map.put(result.pk, result);
// 							// 	});
// 							// 	return map;
// 							// }
// 						});
// 					}
// 					// setLoading(false);
// 				},
// 			});
// 		};
//
// 		// load first page
// 		if (!firstPageDispatched) {
// 			const queryParams = generateQueryParams(router.query);
// 			// dispatch first page on page init with price filter default décroissant
// 			const action = offerGetOffersByShopIDNewAction(shop_pk, queryParams);
// 			dispatchLoadMore(action);
// 			setFirstPageDispatched(true);
// 		} else {
// 			// dispatch rest of the pages -> case query params wasn't generated or next page dispatched
// 			if (!generateQueryParamsCalled || nextPageDispatched) {
// 				const queryParams = generateQueryParams(router.query);
// 				console.log(queryParams);
// 				setGenerateQueryParamsCalled(true);
// 				const action = offerGetOffersByShopIDNewAction(shop_pk, queryParams);
// 				dispatchLoadMore(action);
// 				setNextPageDispatched(true);
// 			}
// 		}
// 		console.log(offersLinkedHashMap.offersMap?.entrySet().toArray());
// 		setLoading(false);
// 	}, [dispatch, firstPageDispatched, generateQueryParamsCalled, nextPageDispatched, offersLinkedHashMap.offersMap, router.query, shop_pk]);
//
//
//
// 	const filterOnChange = (
// 		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null,
// 		value: string | null,
// 	) => {
// 		setFilter(value as 'D' | 'C');
// 		// default prix decroissant.
// 		// -price = D
// 		// price = T
// 		const queryParams: ParsedUrlQueryInput = {
// 			shop_link: router.query.shop_link,
// 			sort_by: '-price',
// 		};
// 		const options = { shallow: true, scroll: false };
// 		if (router.query.page) {
// 			if (value === 'D') {
// 				router
// 					.replace(
// 						{
// 							query: {
// 								...queryParams,
// 								page: router.query.page,
// 							},
// 						},
// 						undefined,
// 						options,
// 					)
// 					.then();
// 			} else {
// 				router
// 					.replace(
// 						{
// 							query: {
// 								...queryParams,
// 								page: router.query.page,
// 								sort_by: 'price',
// 							},
// 						},
// 						undefined,
// 						options,
// 					)
// 					.then();
// 			}
// 		} else {
// 			if (value === 'D') {
// 				router
// 					.replace(
// 						{
// 							query: {
// 								...queryParams,
// 							},
// 						},
// 						undefined,
// 						options,
// 					)
// 					.then();
// 			} else {
// 				router
// 					.replace(
// 						{
// 							query: {
// 								...queryParams,
// 								sort_by: 'price',
// 							},
// 						},
// 						undefined,
// 						options,
// 					)
// 					.then();
// 			}
// 		}
// 	};
//
// 	return (
// 		<>
// 			{loading && <ApiProgress cssStyle={{ position: 'absolute', top: '50%', left: '50%' }} />}
// 			<Box sx={{ minHeight: '450px' }}>
// 				{!offersLinkedHashMap.offersMap?.isEmpty() && (
// 					<>
// 						<Stack className={Styles.filterWrapper} flexDirection="row" justifyContent="space-between" gap={0}>
// 							<span className={Styles.filterText}>Filtrer</span>
// 							<ShopFilterSelect
// 								onChange={(e, value) => filterOnChange(e, value)}
// 								state={filter}
// 								setStateHandler={setFilter}
// 								activeHoverColor={props.activeColor}
// 							/>
// 						</Stack>
// 						<div style={{ display: 'none' }}>
// 							{/*<Stack direction="row" justifyContent="space-between">*/}
// 							{/*	<div className={Styles.shopFilterWrapper}>*/}
// 							{/*		<IconTextInput active={true} placeholder="Rechercher" />*/}
// 							{/*		<div className={Styles.shopFilterContainer}>*/}
// 							{/*			<span className={Styles.subHeader}>Catégories</span>*/}
// 							{/*			<div className={Styles.categoriesWrapper}>*/}
// 							{/*				<ChipButtons actions={props.chipCategoriesAction} />*/}
// 							{/*			</div>*/}
// 							{/*			/!*<div className={Styles.promoWrapper}>*!/*/}
// 							{/*			/!*	<span className={Styles.subHeader}>En Promo</span>*!/*/}
// 							{/*			/!*	<IosSwitch*!/*/}
// 							{/*			/!*		checked={props.promoCheckAction.checked}*!/*/}
// 							{/*			/!*		onChange={props.promoCheckAction.onChange}*!/*/}
// 							{/*			/!*		activeColor={props.promoCheckAction.activeColor}*!/*/}
// 							{/*			/!*		labelcssStyles={{marginLeft: '10px'}}*!/*/}
// 							{/*			/!*	/>*!/*/}
// 							{/*			/!*</div>*!/*/}
// 							{/*			<div className={Styles.forWhomWrapper}>*/}
// 							{/*				<span className={Styles.subHeader}>Pour qui</span>*/}
// 							{/*				<div>*/}
// 							{/*					<div>*/}
// 							{/*						{props.checkBoxForWhomAction.map((action, index: number) => {*/}
// 							{/*							return (*/}
// 							{/*								<CheckBox*/}
// 							{/*									key={index}*/}
// 							{/*									checked={action.checked}*/}
// 							{/*									active={action.active}*/}
// 							{/*									text={action.text}*/}
// 							{/*									onChange={action.onChange}*/}
// 							{/*									activeColor={action.activeColor}*/}
// 							{/*								/>*/}
// 							{/*							);*/}
// 							{/*						})}*/}
// 							{/*					</div>*/}
// 							{/*				</div>*/}
// 							{/*			</div>*/}
// 							{/*		</div>*/}
// 							{/*	</div>*/}
// 							{/*<InfiniteScroll*/}
// 							{/*	dataLength={offersDataState?.count as number}*/}
// 							{/*	next={() => loadMoreOffers()}*/}
// 							{/*	inverse={false}*/}
// 							{/*	hasMore={hasMoreState}*/}
// 							{/*	loader={<LoadMoreLoader />}*/}
// 							{/*	style={{ overflow: 'hidden' }}*/}
// 							{/*	// initialScrollY={200}*/}
// 							{/*	scrollableTarget="lastOfferScrollTrigger"*/}
// 							{/*	// // below props only if you need pull down functionality*/}
// 							{/*	// refreshFunction={() => loadMoreOffers()}*/}
// 							{/*	// pullDownToRefresh*/}
// 							{/*	// pullDownToRefreshThreshold={50}*/}
// 							{/*	// pullDownToRefreshContent={*/}
// 							{/*	//   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>*/}
// 							{/*	// }*/}
// 							{/*	// releaseToRefreshContent={*/}
// 							{/*	//   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>*/}
// 							{/*	// }*/}
// 							{/*>*/}
// 						</div>
// 						<Grid container gap={2} wrap="wrap">
// 							{offersLinkedHashMap.offersMap
// 								?.entrySet()
// 								.toArray()
// 								.map((data) => {
// 									if (data.value) {
// 										const { price, solder_type, solder_value } = data.value;
// 										let newPrice = 0;
// 										if (solder_type !== null && solder_value !== null) {
// 											if (solder_type === 'F') {
// 												newPrice = price - solder_value;
// 											} else if (solder_type === 'P') {
// 												newPrice = price - (price * solder_value) / 100;
// 											}
// 										}
// 										return (
// 											<Link
// 												href={`/shop/${router.query.shop_link}/offer/${encodeURIComponent(data.key)}/`}
// 												passHref
// 												key={data.key}
// 											>
// 												<a className={Styles.gridCardOfferWrapper}>
// 													<Grid item xs="auto">
// 														<Stack direction="column" spacing={2}>
// 															<Box className={Styles.thumbnailWrapper}>
// 																{data.value.pinned && (
// 																	<ImageFuture
// 																		src={PinActiveIconSVG}
// 																		alt=""
// 																		width={32}
// 																		height={32}
// 																		className={Styles.thumbnailActionIcon}
// 																		loading="lazy"
// 																	/>
// 																)}
// 																<ImageFuture
// 																	src={data.value.thumbnail}
// 																	alt=""
// 																	width="0"
// 																	height="0"
// 																	sizes="100vw"
// 																	className={Styles.offerThumb}
// 																	loading="lazy"
// 																/>
// 																{data.value.creator_label && (
// 																	<ImageFuture
// 																		className={Styles.creatorImageTag}
// 																		src={CreatorIconSVG}
// 																		alt="creator"
// 																		width="0"
// 																		height="0"
// 																		sizes="100vw"
// 																	/>
// 																)}
// 															</Box>
// 															<Stack direction="column" spacing={1}>
// 																<span className={Styles.offerTitle}>
// 																	{data.value.title.length >= 25
// 																		? data.value.title.substring(0, 25) + '...'
// 																		: data.value.title}
// 																</span>
// 																<Stack direction="row">
// 																	<Image src={BlackStarSVG} width={20} height={20} alt="" />
// 																	<span className={Styles.offerRating}>0 (0 notes)</span>
// 																</Stack>
// 																<Stack direction="row" spacing={1}>
// 																	<span
// 																		className={`${Styles.offerPrice} ${
// 																			data.value.solder_value !== null && Styles.oldPrice
// 																		}`}
// 																	>
// 																		{data.value.price + ' DH'}
// 																	</span>
// 																	<span className={Styles.solderPrice}>
// 																		{data.value.solder_value !== null ? newPrice + ' DH' : null}
// 																	</span>
// 																</Stack>
// 															</Stack>
// 														</Stack>
// 													</Grid>
// 												</a>
// 											</Link>
// 										);
// 									}
// 								})}
// 						</Grid>
// 						{hasMoreState && (
// 							<ThemeProvider theme={getDefaultTheme()}>
// 								<Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
// 									<SeoAnchorWrapper
// 										href={{
// 											// pathname: `${AUTH_SHOP_ROUTE}/${router.query.shop_link}/`,
// 											query: {
// 												page: nextPageNumber,
// 												shop_link: router.query.shop_link,
// 												sort_by: `${filter === 'D' ? '-price' : 'price'}`,
// 											},
// 										}}
// 										replace={true}
// 										scroll={false}
// 										shallow={true}
// 									>
// 										<Button
// 											variant="text"
// 											color="primary"
// 											className={Styles.loadMoreButton}
// 											onClick={() => {
// 												setNextPageDispatched(false);
// 											}}
// 										>
// 											Charger plus
// 										</Button>
// 									</SeoAnchorWrapper>
// 								</Stack>
// 							</ThemeProvider>
// 						)}
// 						{/*</InfiniteScroll>*/}
// 						{/*</Stack>*/}
// 					</>
// 				)}
// 			</Box>
// 		</>
// 	);
// };
//
// export default ShopTabContent;
// @ts-ignore
// eslint-disable-next-line no-empty
{}