import React, { useEffect, useState } from 'react';
import Styles from './shopTabContent.module.sass';
import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import { Box, Button, Grid, Stack, ThemeProvider } from '@mui/material';
import { OfferGetMyOffersProductServiceType } from '../../../../../types/offer/offerTypes';
import Link from 'next/link';
import { default as ImageFuture } from 'next/future/image';
import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
import Image from 'next/image';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
import { useRouter } from 'next/router';
import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
import { useAppDispatch } from '../../../../../utils/hooks';
import { offerGetOffersByShopIDWithQueryParamsAction } from '../../../../../store/actions/offer/offerActions';
import { GetOffersSagaCallBackOnCompleteDataType } from '../../../../../pages/shop/[shop_link]';
import { getDefaultTheme } from '../../../../../utils/themes';
import SeoAnchorWrapper from '../../../../htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import { ParsedUrlQueryInput } from 'node:querystring';
import { generateQueryParams, getBackendNextPageNumber } from '../../../../../utils/helpers';
import ApiProgress from '../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { Iterables } from 'langx-js';

type offerLinkedHashMapType = {
	offersMap: Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType> | null;
	count: number;
	nextPage: string | null;
};

type Props = {
	shop_pk: number;
	activeColor: string;
	children?: React.ReactNode;
};

const ShopTabContent: React.FC<Props> = (props: Props) => {
	const { shop_pk } = props;
	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'C' | null>(null);
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

	useEffect(() => {
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
			const action = offerGetOffersByShopIDWithQueryParamsAction(shop_pk, url);
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

		if (!firstPageLoaded) {
			loadFirstPage();
			setFirstPageLoaded(true);
		}

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

		if (filterChanged) {
			loadFirstPage();
			setFilterChanged(false);
		}
	}, [
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
			shop_link: router.query.shop_link,
			sort_by: '-price',
		};
		const options = { shallow: true, scroll: false };
		if (router.query.page) {
			if (value === 'D') {
				router
					.replace(
						{
							query: {
								...queryParams,
							},
						},
						undefined,
						options,
					)
					.then(() => setFilterChanged(true));
			} else {
				router
					.replace(
						{
							query: {
								...queryParams,
								sort_by: 'price',
							},
						},
						undefined,
						options,
					)
					.then(() => setFilterChanged(true));
			}
		} else {
			if (value === 'D') {
				router
					.replace(
						{
							query: {
								...queryParams,
							},
						},
						undefined,
						options,
					)
					.then(() => setFilterChanged(true));
			} else {
				router
					.replace(
						{
							query: {
								...queryParams,
								sort_by: 'price',
							},
						},
						undefined,
						options,
					)
					.then(() => setFilterChanged(true));
			}
		}
	};

	return (
		<>
			{isLoadingInitInProgress ||
				(isLoadingNextPageInProgress && <ApiProgress cssStyle={{ position: 'absolute', top: '50%', left: '50%' }} />)}
			<Box sx={{ minHeight: '450px' }}>
				{!offersLinkedHashMap.offersMap?.isEmpty() && (
					<>
						<Stack className={Styles.filterWrapper} flexDirection="row" justifyContent="space-between" gap={0}>
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
						<Grid container gap={2} wrap="wrap">
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
												href={`/shop/${router.query.shop_link}/offer/${encodeURIComponent(data.key)}/`}
												passHref
												key={data.key}
											>
												<a className={Styles.gridCardOfferWrapper}>
													<Grid item xs="auto">
														<Stack direction="column" spacing={2}>
															<Box className={Styles.thumbnailWrapper}>
																{data.value.pinned && (
																	<ImageFuture
																		src={PinActiveIconSVG}
																		alt=""
																		width={32}
																		height={32}
																		className={Styles.thumbnailActionIcon}
																		loading="lazy"
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
												shop_link: router.query.shop_link,
												sort_by: `${filter === 'D' ? '-price' : 'price'}`,
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
					</>
				)}
			</Box>
		</>
	);
};

export default ShopTabContent;
