import React, { useEffect, useState } from 'react';
import Styles from './shopTabContent.module.sass';
import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import { Box, Grid, Stack } from '@mui/material';
import {
	ApiErrorResponseType,
	PaginationResponseType,
	ResponseDataInterface,
} from '../../../../../types/_init/_initTypes';
import {
	OfferGetMyOffersProductInterface,
	OfferGetMyOffersProductServiceType,
	OfferGetMyOffersResponseType,
	OfferGetMyOffersServiceInterface,
} from '../../../../../types/offer/offerTypes';
import Link from 'next/link';
import { default as ImageFuture } from 'next/future/image';
import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
import Image from 'next/image';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
import { useRouter } from 'next/router';
import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { defaultInstance } from '../../../../../utils/helpers';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import { useAppDispatch } from '../../../../../utils/hooks';
import { offerGetOffersByShopIDAction } from '../../../../../store/actions/offer/offerActions';
import { GetOffersSagaCallBackOnCompleteDataType } from '../../../../../pages/shop/[shop_link]';

type Props = {
	shop_pk: number;
	offersData: PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface> | null;
	activeColor: string;
	children?: React.ReactNode;
};

const ShopTabContent: React.FC<Props> = (props: Props) => {
	const { shop_pk, offersData } = props;
	const router = useRouter();
	const [filter, setFilter] = useState<'D' | 'T'>('D');
	// const [availableOffersCount, setAvailableOffersCount] = useState<number>(0);
	const dispatch = useAppDispatch();
	const [offersDataState, setOffersDataState] = useState<PaginationResponseType<
		OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface
	> | null>(null);
	const [hasMoreState, setHasMoreState] = useState<boolean>(false);
	// const [offersData, setOffersData] = useState<
	// 	| ResponseDataInterface<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>
	// 	| ApiErrorResponseType
	// 	| undefined
	// >(undefined);

	// const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
	//   "results",
	//   async ({ pageParam = 1}) =>
	//     await fetch(
	//       `${process.env.NEXT_PUBLIC_ROOT_API_URL}${process.env.NEXT_PUBLIC_OFFER_OFFERS}${props.shop_pk}/?page=${pageParam}`
	//     ).then((result) => result.json() as Promise<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>)
	// );

	// useEffect(() => {
	// 	// check available offers count
	// 	const getOffersByShopID = async (pageNumber = 0) => {
	// 		const url = `${process.env.NEXT_PUBLIC_OFFER_OFFERS}${shop_pk}/?page=${pageNumber}`;
	// 		const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
	// 		const instance = defaultInstance(base_url);
	// 		try {
	// 			const response: OfferGetMyOffersResponseType = await getApi(url, instance);
	// 			if (response.status === 200 && response.data) {
	// 				return response;
	// 			}
	// 		} catch (e) {
	// 			return e as ApiErrorResponseType;
	// 		}
	// 	};
	// 	if (availableOffersCount === 0) {
	// 		const results:
	// 			Promise<ResponseDataInterface<
	// 					PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>
	// 			| ApiErrorResponseType
	// 			| undefined> = getOffersByShopID(1);
	// 		results.then((data) => {
	// 			if (data === typeof ResponseDataInterface<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>) {
	//
	// 			}
	// 			// setOffersData(data);
	//
	// 			// setAvailableOffersCount()
	// 		}).catch((e) => {
	// 			console.log(e as ApiErrorResponseType);
	// 		})
	// 	}
	// }, [availableOffersCount, offersData, shop_pk]);

	useEffect(() => {
		if (offersData) {
			setOffersDataState(offersData);
			if (offersData.next) {
				setHasMoreState(true);
			}
		}
	}, [offersData]);

	const loadMoreOffers = () => {
		console.log('loadMoreOffers called');
		if (offersDataState) {
			const action = offerGetOffersByShopIDAction(shop_pk, offersDataState.next);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
					console.log(error);
					console.log(cancelled);
					console.log(data);
					if (!error && !cancelled && data) {
						setOffersDataState((prevState) => {
							if (prevState !== null) {
								const newResult = [...prevState.results, ...data.results];
								return {
									results: newResult,
									next: data.next,
									previous: data.previous,
									count: data.count,
								};
							}
							return prevState;
						});
						// const resultArray = [];
						// for (let i = 0; i < data.results.length; i++) {
						// 	resultArray.push(data.results[i]);
						// }
					}
				},
			});
		}
		// dispatch(offerGetOffersByShopIDAction(shop_pk));
	};

	// const fetchMoreData = () => {
	//   // a fake async api call like which sends
	//   // 20 more records in 1.5 secs
	//   setTimeout(() => {
	//     console.log('FETCHED');
	//   }, 1500);
	// };

	return (
		<Box sx={{ minHeight: '450px' }}>
			{(offersDataState?.count as number) > 0 && (
				<>
					<Stack className={Styles.filterWrapper} flexDirection="row" justifyContent="space-between" gap={0}>
						<span className={Styles.filterText}>Filtrer</span>
						<ShopFilterSelect state={filter} setStateHandler={setFilter} activeHoverColor={props.activeColor} />
					</Stack>
					<InfiniteScroll
						dataLength={offersDataState?.count as number}
						next={() => loadMoreOffers()}
						inverse={false}
						hasMore={hasMoreState}
						loader={<h4>Loading...</h4>}
						scrollableTarget="scrollableParentBox"
						// // below props only if you need pull down functionality
						// refreshFunction={() => loadMoreOffers()}
						// pullDownToRefresh
						// pullDownToRefreshThreshold={50}
						// pullDownToRefreshContent={
						//   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
						// }
						// releaseToRefreshContent={
						//   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
						// }
					>
						<Grid container gap={2} wrap="wrap">
							{offersDataState?.results.map((offer: OfferGetMyOffersProductServiceType) => {
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
									<Link href={`${router.asPath}/offer/${encodeURIComponent(offer.pk)}/`} passHref key={offer.pk}>
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
															<span
																className={`${Styles.offerPrice} ${offer.solder_value !== null && Styles.oldPrice}`}
															>
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
					</InfiniteScroll>
				</>
			)}
		</Box>
	);
};

export default ShopTabContent;
