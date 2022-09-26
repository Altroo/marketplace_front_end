import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import Styles from './shopTabContent.module.sass';
import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import { Box, Button, CircularProgress, Grid, Stack, ThemeProvider } from '@mui/material';
import { PaginationResponseType } from '../../../../../types/_init/_initTypes';
import {
	OfferGetMyOffersProductInterface,
	OfferGetMyOffersProductServiceType,
	OfferGetMyOffersServiceInterface,
} from '../../../../../types/offer/offerTypes';
import Link from 'next/link';
import { default as ImageFuture } from 'next/future/image';
import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
import Image from 'next/image';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
import { useRouter } from 'next/router';
import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch } from '../../../../../utils/hooks';
import { offerGetOffersByShopIDAction } from '../../../../../store/actions/offer/offerActions';
import { GetOffersSagaCallBackOnCompleteDataType } from '../../../../../pages/shop/[shop_link]';
import { LoadingButton } from '@mui/lab';
import { getDefaultTheme } from '../../../../../utils/themes';
import { AUTH_SHOP_ROUTE } from '../../../../../utils/routes';
import PrimaryAnchorButton from '../../../../htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import SeoAnchorWrapper from '../../../../htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import { UrlObject } from 'url';
import { ParsedUrlQueryInput } from 'node:querystring';
import { getBackendNextPageNumber } from "../../../../../utils/helpers";

type Props = {
	// shop_pk: number;
	offersData: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>;
	activeColor: string;
	children?: React.ReactNode;
	// loading: boolean;
	// setLoading: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
};

const LoadMoreLoader = () => {
	return (
		<Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
			<CircularProgress sx={{ color: '#FFFFFF' }} />
		</Box>
	);
};

const ShopTabContent: React.FC<Props> = (props: Props) => {
	const { offersData } = props;
	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'C' | null>(null);
	// const dispatch = useAppDispatch();
	// const [offersDataState, setOffersDataState] = useState<PaginationResponseType<
	// 	OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface
	// > | null>(null);
	const [hasMoreState, setHasMoreState] = useState<boolean>(false);
	const [nextPageNumber, setNextPageNumber] = useState<string | null>(null);
	// const [showLoading, setShowLoading] = useState<boolean>(false);

	useEffect(() => {
		if (offersData.next) {
			// const queryIndex = offersData.next.search('page=');
			// // get the page number
			// const pageNumber = offersData.next.slice(queryIndex + 5);
			// // check if contains & sort_by
			// if (pageNumber.includes('&')) {
			// 	setNextPageNumber(pageNumber.split('&')[0]);
			// 	setHasMoreState(true);
			// } else {
			// 	setNextPageNumber(pageNumber);
			// 	setHasMoreState(true);
			// }
			const pageNumber = getBackendNextPageNumber(offersData.next);
			setNextPageNumber(pageNumber);
			setHasMoreState(true);
		} else {
			setHasMoreState(false);
			setNextPageNumber(null);
		}
	}, [offersData.next]);

	// const loadMoreOffers = () => {
	// 	setShowLoading(true);
	// 	if (offersDataState && offersDataState.next) {
	// 		const queryIndex = offersDataState.next.search('=');
	// 		const pageNumber = offersDataState.next.slice(queryIndex + 1)[0];
	// 		const action = offerGetOffersByShopIDAction(shop_pk, pageNumber);
	// 		dispatch({
	// 			...action,
	// 			onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
	// 				if (!error && !cancelled && data) {
	// 					setOffersDataState((prevState) => {
	// 						if (prevState !== null) {
	// 							const newResult = [...prevState.results, ...data.results];
	// 							if (data.next) {
	// 								setHasMoreState(true);
	// 							} else {
	// 								setHasMoreState(false);
	// 							}
	// 							return {
	// 								results: newResult,
	// 								next: data.next,
	// 								previous: data.previous,
	// 								count: data.count,
	// 							};
	// 						}
	// 						setHasMoreState(false);
	// 						return prevState;
	// 					});
	// 				}
	// 			},
	// 		});
	// 	} else {
	// 		setHasMoreState(false);
	// 	}
	// 	setShowLoading(false);
	// };

	const filterOnChange = (
		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null,
		value: string | null,
	) => {
		setFilter(value as 'D' | 'C');
		// default prix decroissant.
		// -price = D
		// price = T
		const queryParams: ParsedUrlQueryInput = {
			shop_link: router.query.shop_link,
			sort_by: '-price',
		};
		if (router.query.page) {
			if (value === 'D') {
				router
					.replace(
						{
							query: {
								...queryParams,
								page: router.query.page,
							},
						},
						undefined,
						{ shallow: true },
					)
					.then();
			} else {
				router
					.replace(
						{
							query: {
								...queryParams,
								page: router.query.page,
								sort_by: 'price',
							},
						},
						undefined,
						{ shallow: true },
					)
					.then();
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
						{ shallow: true },
					)
					.then();
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
						{ shallow: true },
					)
					.then();
			}
		}
	};

	return (
		<Box sx={{ minHeight: '450px' }}>
			{(offersData.count as number) > 0 && (
				<>
					<Stack className={Styles.filterWrapper} flexDirection="row" justifyContent="space-between" gap={0}>
						<span className={Styles.filterText}>Filtrer</span>
						<ShopFilterSelect
							onChange={(e, value) => filterOnChange(e, value)}
							state={filter}
							setStateHandler={setFilter}
							activeHoverColor={props.activeColor}
						/>
					</Stack>
					<div style={{ display: 'none' }}>
						{/*<Stack direction="row" justifyContent="space-between">*/}
						{/*	<div className={Styles.shopFilterWrapper}>*/}
						{/*		<IconTextInput active={true} placeholder="Rechercher" />*/}
						{/*		<div className={Styles.shopFilterContainer}>*/}
						{/*			<span className={Styles.subHeader}>Catégories</span>*/}
						{/*			<div className={Styles.categoriesWrapper}>*/}
						{/*				<ChipButtons actions={props.chipCategoriesAction} />*/}
						{/*			</div>*/}
						{/*			/!*<div className={Styles.promoWrapper}>*!/*/}
						{/*			/!*	<span className={Styles.subHeader}>En Promo</span>*!/*/}
						{/*			/!*	<IosSwitch*!/*/}
						{/*			/!*		checked={props.promoCheckAction.checked}*!/*/}
						{/*			/!*		onChange={props.promoCheckAction.onChange}*!/*/}
						{/*			/!*		activeColor={props.promoCheckAction.activeColor}*!/*/}
						{/*			/!*		labelcssStyles={{marginLeft: '10px'}}*!/*/}
						{/*			/!*	/>*!/*/}
						{/*			/!*</div>*!/*/}
						{/*			<div className={Styles.forWhomWrapper}>*/}
						{/*				<span className={Styles.subHeader}>Pour qui</span>*/}
						{/*				<div>*/}
						{/*					<div>*/}
						{/*						{props.checkBoxForWhomAction.map((action, index: number) => {*/}
						{/*							return (*/}
						{/*								<CheckBox*/}
						{/*									key={index}*/}
						{/*									checked={action.checked}*/}
						{/*									active={action.active}*/}
						{/*									text={action.text}*/}
						{/*									onChange={action.onChange}*/}
						{/*									activeColor={action.activeColor}*/}
						{/*								/>*/}
						{/*							);*/}
						{/*						})}*/}
						{/*					</div>*/}
						{/*				</div>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*<InfiniteScroll*/}
						{/*	dataLength={offersDataState?.count as number}*/}
						{/*	next={() => loadMoreOffers()}*/}
						{/*	inverse={false}*/}
						{/*	hasMore={hasMoreState}*/}
						{/*	loader={<LoadMoreLoader />}*/}
						{/*	style={{ overflow: 'hidden' }}*/}
						{/*	// initialScrollY={200}*/}
						{/*	scrollableTarget="lastOfferScrollTrigger"*/}
						{/*	// // below props only if you need pull down functionality*/}
						{/*	// refreshFunction={() => loadMoreOffers()}*/}
						{/*	// pullDownToRefresh*/}
						{/*	// pullDownToRefreshThreshold={50}*/}
						{/*	// pullDownToRefreshContent={*/}
						{/*	//   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>*/}
						{/*	// }*/}
						{/*	// releaseToRefreshContent={*/}
						{/*	//   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>*/}
						{/*	// }*/}
						{/*>*/}
					</div>
					<Grid container gap={2} wrap="wrap">
						{offersData.results.map((offer: OfferGetMyOffersProductServiceType) => {
							const { price, solder_type, solder_value } = offer;
							let newPrice = 0;
							if (solder_type !== null && solder_value !== null) {
								if (solder_type === 'F') {
									newPrice = price - solder_value;
								} else if (solder_type === 'P') {
									newPrice = price - (price * solder_value) / 100;
								}
							}
							return (
								<Link href={`/shop/${router.query.shop_link}/offer/${encodeURIComponent(offer.pk)}/`} passHref key={offer.pk}>
									<a className={Styles.gridCardOfferWrapper}>
										<Grid item xs="auto">
											<Stack direction="column" spacing={2}>
												<Box className={Styles.thumbnailWrapper}>
													{offer.pinned && (
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
														src={offer.thumbnail}
														alt=""
														width="0"
														height="0"
														sizes="100vw"
														className={Styles.offerThumb}
														loading="lazy"
													/>
													{offer.creator_label && (
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
														{offer.title.length >= 25 ? offer.title.substring(0, 25) + '...' : offer.title}
													</span>
													<Stack direction="row">
														<Image src={BlackStarSVG} width={20} height={20} alt="" />
														<span className={Styles.offerRating}>0 (0 notes)</span>
													</Stack>
													<Stack direction="row" spacing={1}>
														<span className={`${Styles.offerPrice} ${offer.solder_value !== null && Styles.oldPrice}`}>
															{offer.price + ' DH'}
														</span>
														<span className={Styles.solderPrice}>
															{offer.solder_value !== null ? newPrice + ' DH' : null}
														</span>
													</Stack>
												</Stack>
											</Stack>
										</Grid>
									</a>
								</Link>
							);
						})}
					</Grid>
					{hasMoreState && (
						<ThemeProvider theme={getDefaultTheme()}>
							<Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
								<SeoAnchorWrapper
									href={{
										// pathname: `${AUTH_SHOP_ROUTE}/${router.query.shop_link}/`,
										query: {
											page: nextPageNumber,
											shop_link: router.query.shop_link,
											sort_by: `${filter === 'D' ? '-price' : 'price'}`,
										},
									}}
									replace={true}
									scroll={false}
									shallow={true}
								>
									<Button variant="text" color="primary" className={Styles.loadMoreButton}>
										Charger plus
									</Button>
								</SeoAnchorWrapper>
							</Stack>
						</ThemeProvider>
					)}
					{/*</InfiniteScroll>*/}
					{/*</Stack>*/}
				</>
			)}
		</Box>
	);
};

export default ShopTabContent;
