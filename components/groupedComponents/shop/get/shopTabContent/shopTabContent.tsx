import React, { useEffect, useState } from 'react';
import Styles from './shopTabContent.module.sass';
import ShopFilterSelect from '../../../temp-shop/edit/shopFilterSelect/shopFilterSelect';
import { Box, Grid, Stack } from '@mui/material';
import {
	PaginationResponseType,
} from '../../../../../types/_init/_initTypes';
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
	const dispatch = useAppDispatch();
	const [offersDataState, setOffersDataState] = useState<PaginationResponseType<
		OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface
	> | null>(null);
	const [hasMoreState, setHasMoreState] = useState<boolean>(false);

	useEffect(() => {
		if (offersData) {
			setOffersDataState(offersData);
			if (offersData.next) {
				setHasMoreState(true);
			}
		}
	}, [offersData]);

	const loadMoreOffers = () => {
		if (offersDataState) {
			const action = offerGetOffersByShopIDAction(shop_pk, offersDataState.next);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: GetOffersSagaCallBackOnCompleteDataType) => {
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
					}
				},
			});
		}
	};

	return (
		<Box sx={{ minHeight: '450px' }}>
			{(offersDataState?.count as number) > 0 && (
				<>
					<Stack className={Styles.filterWrapper} flexDirection="row" justifyContent="space-between" gap={0}>
						<span className={Styles.filterText}>Filtrer</span>
						<ShopFilterSelect state={filter} setStateHandler={setFilter} activeHoverColor={props.activeColor} />
					</Stack>
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
					{/*</Stack>*/}
				</>
			)}
		</Box>
	);
};

export default ShopTabContent;
