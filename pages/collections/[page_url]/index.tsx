import React, { useCallback, useEffect, useState } from 'react';
import { NextPage, GetStaticPropsContext } from 'next';
import Styles from '../../../styles/collections/collectionPageUrlIndex.module.sass';
import {
	allowAnyInstance,
	Desktop,
	generateOffersFilterQueryParams,
	getBackendNextPageNumber,
} from '../../../utils/helpers';
import { getApi } from '../../../store/services/_init/_initAPI';
import { NOT_FOUND_404, REAL_OFFER_ROUTE } from '../../../utils/routes';
import {
	SeoPagesGetDefaultSeoSlugsResponseType,
	SeoPagesGetSingleSeoDataResponseType,
} from '../../../types/seo-pages/seoPagesTypes';
import { DefaultSeoPageClass } from '../../../models/seo-data/DefaultSeoPageClass';
import { Box, Button, Grid, Skeleton, Stack, ThemeProvider } from '@mui/material';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { NextSeo } from 'next-seo';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import DefaultSeoTextContent from '../../../components/groupedComponents/collections/defaultSeoTextContent/defaultSeoTextContent';
import {
	GetOffersSagaCallBackOnCompleteDataType,
	OfferGetAvailableShopFiltersType,
	OfferGetMyOffersProductServiceType,
	OfferGetMyOffersResponseType,
	OfferGetShopAvailableFiltersResponseType,
} from '../../../types/offer/offerTypes';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../utils/hooks';
import {
	offerLinkedHashMapType,
	offersSeoPagesLinkedHashMapType,
} from '../../../components/groupedComponents/shop/get/shopTabContent/shopTabContent';
import {
	seoPagesGetOffersBySeoPageUrlWithQueryParamsAction,
} from '../../../store/actions/seo_pages/seoPagesActions';
import { Iterables } from 'langx-js';
import { ParsedUrlQueryInput } from 'querystring';
import MobileOffersFilterButton from '../../../components/mobile/buttons/mobileOffersFilterButton/mobileOffersFilterButton';
import MobileFilterWhiteSVG from '../../../public/assets/svgs/globalIcons/mobile-filter-white.svg';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import ShopFilterSelect from '../../../components/groupedComponents/temp-shop/edit/shopFilterSelect/shopFilterSelect';
import AccordionFilter from '../../../components/layouts/accordionFilter/accordionFilter';
import Link from 'next/link';
import Image from 'next/image';
import CreatorIconSVG from '../../../public/assets/svgs/globalIcons/creator.svg';
import { getDefaultTheme } from '../../../utils/themes';
import SeoAnchorWrapper from '../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import CustomSwipeModal from '../../../components/desktop/modals/rightSwipeModal/customSwipeModal';
import CloseSVG from '../../../public/assets/svgs/navigationIcons/close.svg';

type IndexProps = {
	pageProps: {
		page_data: DefaultSeoPageClass;
		offers_data: offersSeoPagesLinkedHashMapType;
		page_filters: OfferGetAvailableShopFiltersType;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { title, page_meta_description, h_one, h_two, paragraphe, tags, page_url } = props.pageProps.page_data;
	const { offers_data, page_filters } = props.pageProps;

	const map = new Iterables.LinkedHashMap<number, OfferGetMyOffersProductServiceType>();
	offers_data.offersMap.map((offer) => {
		map.put(offer.pk, offer);
	});

	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'C'>('D');
	const dispatch = useAppDispatch();
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [filterChanged, setFilterChanged] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(false);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [offersLinkedHashMap, setOffersLinkedHashMap] = useState<offerLinkedHashMapType>({
		count: offers_data.count,
		nextPage: offers_data.nextPage,
		offersMap: map,
	});
	const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
	const [applyFiltersClicked, setApplyFiltersClicked] = useState<boolean>(false);
	const [imagesLoading, setImagesLoading] = useState<Array<boolean>>([]);

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
			let url = `${process.env.NEXT_PUBLIC_SEO_PAGES_OFFERS}${page_url}/`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generateOffersFilterQueryParams(router.query, nextPage);
				url += queryParams;
			} else {
				queryParams = generateOffersFilterQueryParams(router.query);
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
						}
					}
				},
			});
		};

		const loadFirstPage = () => {
			getOffers(true);
		};

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
	}, [applyFiltersClicked, dispatch, filterChanged, loadMoreState, offersLinkedHashMap, page_url, router.query]);

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
			<NextSeo title={title} description={page_meta_description} />
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<DefaultSeoTextContent
						h_one={h_one}
						h_two={h_two}
						paragraphe={paragraphe}
						tags={tags}
						filterMargin={true}
					/>
					{/* Add endpoint ID or change compo - gap 75px between filter & offers */}
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
							{!offersLinkedHashMap.offersMap?.isEmpty() && (
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
										{page_filters && (
											<Desktop>
												<Stack direction="column" className={Styles.shopFilterWrapperDesktopOnly}>
													<AccordionFilter
														filterFor="COLLECTIONS"
														availableFilters={page_filters}
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
																				<span className={Styles.offerTitle}>{data.value.title}</span>
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
							{page_filters && (
								<CustomSwipeModal
									transition
									open={openFilterModal}
									handleClose={() => setOpenFilterModal(false)}
									keepMounted={true}
								>
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
											availableFilters={page_filters}
											setApplyFiltersClicked={setApplyFiltersClicked}
											closeModal={closeMobileFilterModal}
										/>
									</Stack>
								</CustomSwipeModal>
							)}
							{/* END EDIT CONTENT MODAL */}
						</Box>
					</>
				</main>
				<CustomFooter />
			</Stack>
		</>
	);
};

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_ROOT}/`;
	const instance = allowAnyInstance();
	const response: SeoPagesGetDefaultSeoSlugsResponseType = await getApi(url, instance);
	if (response.status === 200) {
		const paths = response.data.map((seo_page) => ({
			params: { page_url: seo_page.page_url },
		}));
		return { paths, fallback: 'blocking' };
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const params = context.params;
	const seo_page_url = `${process.env.NEXT_PUBLIC_SEO_PAGES_ROOT}/${params?.page_url}/`;
	const seo_page_offers_url = `${process.env.NEXT_PUBLIC_SEO_PAGES_OFFERS}${params?.page_url}/`;
	const seo_page_filters_url = `${process.env.NEXT_PUBLIC_SEO_PAGES_FILTERS}${params?.page_url}/`;
	try {
		const instance = allowAnyInstance();
		const seo_page_response: SeoPagesGetSingleSeoDataResponseType = await getApi(seo_page_url, instance);
		const seo_page_offers_response: OfferGetMyOffersResponseType = await getApi(seo_page_offers_url, instance);
		const seo_page_filters_response: OfferGetShopAvailableFiltersResponseType = await getApi(
			seo_page_filters_url,
			instance,
		);
		if (
			seo_page_response.status === 200 &&
			seo_page_offers_response.status === 200 &&
			seo_page_filters_response.status === 200
		) {
			const result = {
				offersMap: seo_page_offers_response.data.results,
				nextPage: getBackendNextPageNumber(seo_page_offers_response.data.next),
				count: seo_page_offers_response.data.count,
			};
			return {
				props: {
					page_data: seo_page_response.data,
					offers_data: result,
					page_filters: seo_page_filters_response.data,
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
