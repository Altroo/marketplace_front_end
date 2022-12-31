import React, { useState, useCallback, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/orders/ordersList.module.sass';
import {
	Desktop,
	generateOrdersFilterQueryParams,
	getBackendNextPageNumber,
	getServerSideCookieTokens, isAuthenticatedInstance,
	TabletAndMobile
} from "../../../../utils/helpers";
import { AUTH_LOGIN, DASHBOARD_ORDER_DETAIL, NOT_FOUND_404 } from '../../../../utils/routes';
import {
	OrdersGetOrdersListResponseType,
	OrdersGetOrdersListType,
	OrderStatusType
} from "../../../../types/order/orderTypes";
import { Box, Button, Divider, Stack, ThemeProvider } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import Image from 'next/image';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import { PaginationResponseType, SagaCallBackResponseType } from '../../../../types/_init/_initTypes';
import TextButton from '../../../../components/htmlElements/buttons/textButton/textButton';
import { Iterables } from 'langx-js';
import { useAppDispatch } from '../../../../utils/hooks';
import { useRouter } from 'next/router';
import ApiProgress from '../../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import ColoredOrdersIlluSVG from '../../../../public/assets/images/dashboard_illu/colored-orders.svg';
import { orderGetOrdersListAction } from '../../../../store/actions/order/orderActions';
import TextAnchorButton from '../../../../components/htmlElements/buttons/textAnchorButton/textAnchorButton';
import { cartPaginationDetailsForProduct, cartPaginationDetailsForService } from '../../../../types/cart/cartTypes';
import { getDateStringFromFormatedDate, getOrderStatus } from '../../../../utils/rawData';
import ArrowRightSVG from '../../../../public/assets/svgs/navigationIcons/arrow-right.svg';
import Link from 'next/link';
import { getDefaultTheme } from '../../../../utils/themes';
import SeoAnchorWrapper from '../../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import { ParsedUrlQueryInput } from 'querystring';
import { getApi } from "../../../../store/services/_init/_initAPI";
import { AxiosInstance } from "axios";
import SharedStyles from "../../../../styles/dashboard/dashboard.module.sass";
import MiniBackSVG from "../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg";

type ordersLinkedHashMapType = {
	count: number;
	nextPage: string | null;
	ordersMap: Iterables.LinkedHashMap<number, OrdersGetOrdersListType> | null;
};

type IndexProps = {
	pageProps: {
		data: PaginationResponseType<OrdersGetOrdersListType>;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [applyFiltersClicked, setApplyFiltersClicked] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [ordersLinkedHashMap, setOrdersLinkedHashMap] = useState<ordersLinkedHashMapType>({
		count: 0,
		nextPage: null,
		ordersMap: null,
	});

	useEffect(() => {
		if (!firstPageLoaded) {
			const map = new Iterables.LinkedHashMap<number, OrdersGetOrdersListType>();
			data.results.map((order) => {
				map.put(order.pk, order);
			});
			const result = {
				count: data.count,
				nextPage: getBackendNextPageNumber(data.next),
				ordersMap: map,
			};
			setOrdersLinkedHashMap(result);
			setFirstPageLoaded(true);
			setIsLoadingNextPageInProgress(false);
			setIsLoadingInitInProgress(false);
		}

		const getOrders = (isReset = false) => {
			const { count, nextPage, ordersMap } = ordersLinkedHashMap;
			if (!isReset && ordersMap !== null && count > 0 && ordersMap.size() >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_ORDER_ROOT}/`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generateOrdersFilterQueryParams(router.query, nextPage);
				url += queryParams;
			} else {
				queryParams = generateOrdersFilterQueryParams(router.query);
				url += queryParams;
			}
			const action = orderGetOrdersListAction(url);
			dispatch({
				...action,
				onComplete: ({
					error,
					cancelled,
					data,
				}: SagaCallBackResponseType<PaginationResponseType<OrdersGetOrdersListType>>) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, OrdersGetOrdersListType>;
						if (ordersMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, OrdersGetOrdersListType>();
						} else {
							map = ordersMap;
						}
						data.results.map((orders) => {
							map.put(orders.pk, orders);
						});
						const result = {
							count: data.count,
							nextPage: getBackendNextPageNumber(data.next),
							ordersMap: map,
						};
						setOrdersLinkedHashMap(result);
						setIsLoadingNextPageInProgress(false);
						if (isReset) {
							setFirstPageLoaded(true);
						}
					}
				},
			});
			setIsLoadingInitInProgress(false);
		};
		const loadFirstPage = () => {
			getOrders(true);
		};
		// on page first load
		// if (!firstPageLoaded) {
		// 	loadFirstPage();
		// }
		// load more pressed
		if (loadMoreState) {
			if (ordersLinkedHashMap.ordersMap) {
				const isReset = ordersLinkedHashMap.ordersMap.size() >= ordersLinkedHashMap.count;
				getOrders(isReset);
			}
			setLoadMoreState(false);
		}
		if (applyFiltersClicked) {
			loadFirstPage();
			setApplyFiltersClicked(false);
		}
	}, [applyFiltersClicked, data.count, data.next, data.results, dispatch, firstPageLoaded, loadMoreState, ordersLinkedHashMap, router.query]);

	const applyFilterHandler = useCallback(
		(orderStatus: OrderStatusType) => {
			const queryParams: ParsedUrlQueryInput = {
				...router.query,
			};
			const options = { shallow: true, scroll: false };
			router.replace({ query: { ...queryParams, order_status: orderStatus } }, undefined, options).then(() => {
				setApplyFiltersClicked(true);
			});
		},
		[router],
	);

	return (
		<>
			{(isLoadingInitInProgress || isLoadingNextPageInProgress) && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<TabletAndMobile>
						<Stack direction="row" justifyContent="space-between">
							<Stack
								className={SharedStyles.topBackNavigationStack}
								direction="row"
								spacing={1}
								onClick={() => router.back()}
								alignItems="center"
							>
								<Image
									src={MiniBackSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={SharedStyles.backIcon}
								/>
								<span className={SharedStyles.backText}>Retour</span>
							</Stack>
						</Stack>
					</TabletAndMobile>
					<Stack direction="column" spacing="32px">
						<h2 className={Styles.header}>Commandes</h2>
						<Stack direction="row" spacing="6px">
							<TextButton
								buttonText="En cours..."
								onClick={() => applyFilterHandler('IP')}
								cssClass={Styles.filterEnCours}
							/>
							<TextButton
								buttonText="Terminer"
								onClick={() => applyFilterHandler('CM')}
								cssClass={Styles.filterTerminer}
							/>
							<TextButton
								buttonText="Annulée"
								onClick={() => applyFilterHandler('CA')}
								cssClass={Styles.filterAnnuler}
							/>
						</Stack>
						{!ordersLinkedHashMap.ordersMap?.isEmpty() && firstPageLoaded ? (
							<Stack
								direction="column"
								className={Styles.rootStack}
								spacing={{ xs: '0px', sm: '0px', md: '12px', lg: '12px', xl: '12px' }}
							>
								{ordersLinkedHashMap.ordersMap
									?.entrySet()
									.toArray()
									.map((data) => {
										if (data.value) {
											const {
												pk,
												articles_count,
												first_name,
												last_name,
												avatar,
												total_price,
												order_date,
												order_status,
												order_number,
												order_details,
											} = data.value;
											const { text, color } = getOrderStatus(order_status);
											return (
												<Stack key={data.key} direction="column" spacing="20px">
													<Desktop>
														<Box
															className={Styles.orderRootBox}
															onClick={() => {
																router.push(DASHBOARD_ORDER_DETAIL(pk)).then();
															}}
														>
															<Stack direction="row" justifyContent="space-between" spacing="18px">
																<Stack direction="column" spacing="18px" width="100%">
																	<Stack direction="row" justifyContent="space-between">
																		<Stack
																			direction="row"
																			justifyContent="space-between"
																			alignItems="center"
																			sx={{ width: '100%' }}
																		>
																			<Stack direction="row" spacing="12px" alignItems="center">
																				<div className={Styles.avatarSubWrapper}>
																					<Image
																						src={avatar}
																						alt=""
																						width="0"
																						height="0"
																						sizes="100vw"
																						className={Styles.avatar}
																						loading="eager"
																						priority={true}
																					/>
																				</div>
																				<h3 className={Styles.buyerName}>{`${first_name} ${last_name}`}</h3>
																				<span className={Styles.nbrArticle}>
																					{articles_count} {articles_count > 1 ? 'articles' : 'article'}
																				</span>
																				<span className={Styles.orderNumber}>Commande N° {order_number}</span>
																				<span className={Styles.orderNumber}>•</span>
																				<span className={Styles.orderNumber}>
																					{getDateStringFromFormatedDate(order_date)}
																				</span>
																			</Stack>
																			<Desktop>
																				<TextAnchorButton
																					buttonText="Voir la commande"
																					nextPage={`${DASHBOARD_ORDER_DETAIL(pk)}`}
																				/>
																			</Desktop>
																		</Stack>
																	</Stack>
																	{order_details.map((order, index) => {
																		return (
																			<Stack
																				direction="column"
																				spacing="18px"
																				key={index}
																				className={Styles.rootArticleStack}
																			>
																				<Stack direction="row" alignItems="center" width="100%">
																					<Stack direction="row" spacing="18px" alignItems="center" width="100%">
																						<Image
																							src={order.offer_thumbnail}
																							alt={order.offer_title}
																							width="64"
																							height="64"
																							sizes="100vw"
																							className={Styles.offerPicture}
																							loading="eager"
																							priority={true}
																						/>
																						<Stack direction="column">
																							<h4 className={Styles.offerTitle}>{order.offer_title}</h4>
																							{order.offer_type === 'V' ? (
																								<Stack direction="column">
																									{(order.offer_details as cartPaginationDetailsForProduct)
																										.picked_color && (
																										<span className={Styles.offerDetails}>
																											Couleur :{' '}
																											{
																												(order.offer_details as cartPaginationDetailsForProduct)
																													.picked_color
																											}
																										</span>
																									)}
																									{(order.offer_details as cartPaginationDetailsForProduct)
																										.picked_size && (
																										<span className={Styles.offerDetails}>
																											Taille :{' '}
																											{
																												(order.offer_details as cartPaginationDetailsForProduct)
																													.picked_size
																											}
																										</span>
																									)}
																								</Stack>
																							) : (
																								<Stack direction="column">
																									{(order.offer_details as cartPaginationDetailsForService)
																										.picked_date && (
																										<span className={Styles.offerDetails}>
																											Date :{' '}
																											{getDateStringFromFormatedDate(
																												(order.offer_details as cartPaginationDetailsForService)
																													.picked_date as Date,
																											)}
																										</span>
																									)}
																									{(order.offer_details as cartPaginationDetailsForService)
																										.picked_hour && (
																										<span className={Styles.offerDetails}>
																											Heure :{' '}
																											{(
																												order.offer_details as cartPaginationDetailsForService
																											).picked_hour?.slice(0, -3)}
																										</span>
																									)}
																								</Stack>
																							)}
																						</Stack>
																					</Stack>
																					{order.offer_type === 'V' &&
																						(order.offer_details as cartPaginationDetailsForProduct)
																							.picked_quantity && (
																							<span className={Styles.offerQuantity}>
																								{
																									(order.offer_details as cartPaginationDetailsForProduct)
																										.picked_quantity
																								}
																							</span>
																						)}
																					{order.offer_type === 'S' && <span className={Styles.offerQuantity}></span>}
																					<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
																						{text}
																					</span>
																					<span className={Styles.offerPrice}>{order.offer_price} DH</span>
																				</Stack>
																				<Divider orientation="horizontal" flexItem className={Styles.divider} />
																			</Stack>
																		);
																	})}
																	<span className={Styles.totalPrice}>{total_price} DH</span>
																</Stack>
																<Stack direction="column" justifyContent="center" alignItems="center">
																	<Image src={ArrowRightSVG} width="24" height="24" alt="" sizes="100vw" />
																</Stack>
															</Stack>
														</Box>
													</Desktop>
													<TabletAndMobile>
														<Link href={DASHBOARD_ORDER_DETAIL(pk)} className={Styles.hover}>
															<Stack
																direction="row"
																alignItems="center"
																spacing="18px"
																className={Styles.orderRootStack}
															>
																<Image
																	src={avatar}
																	alt=""
																	width="48"
																	height="48"
																	sizes="100vw"
																	className={Styles.buyerAvatar}
																/>
																<Stack direction="column" spacing="6px" width="85%">
																	<Stack direction="row" justifyContent="space-between" width="100%">
																		<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
																			{text}
																		</span>
																		<span className={Styles.orderDate}>
																			{getDateStringFromFormatedDate(order_date)}
																		</span>
																	</Stack>
																	<span className={Styles.buyerName}>
																		{first_name} {last_name}
																	</span>
																	<span className={Styles.buyerProductPrice}>
																		{articles_count === 1 ? `${articles_count} article` : `${articles_count} articles`}{' '}
																		• {total_price} DH
																	</span>
																</Stack>
															</Stack>
															<Divider orientation="horizontal" flexItem className={Styles.divider} />
														</Link>
													</TabletAndMobile>
													{ordersLinkedHashMap.nextPage && (
														<ThemeProvider theme={getDefaultTheme()}>
															<SeoAnchorWrapper
																href={{
																	query: {
																		...router.query,
																		page: ordersLinkedHashMap.nextPage,
																	},
																}}
																replace={true}
																scroll={false}
																shallow={true}
																anchorCssClass={Styles.loadMoreAnchor}
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
														</ThemeProvider>
													)}
												</Stack>
											);
										}
									})}
							</Stack>
						) : (
							!isLoadingInitInProgress && (
								<Stack
									direction="column"
									spacing="12px"
									className={Styles.maxHeight}
									justifyContent="center"
									textAlign="center"
								>
									<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
										<Image src={ColoredOrdersIlluSVG} alt="" width="199" height="150" sizes="100vw" />
									</Box>
									<span className={Styles.dashboardNoContentHeader}>Aucune commande</span>
									<span className={Styles.dashboardNoContentText}>
										C&apos;est ici qu&apos;apparaîtront vos futurs
										<br /> commandes
									</span>
								</Stack>
							)
						)}
					</Stack>
				</main>
				<CustomFooter />
			</Stack>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ORDER_ROOT}/`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance: AxiosInstance = isAuthenticatedInstance(appToken.initStateToken);
			const response: OrdersGetOrdersListResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
					},
				};
			}
		} else {
			// redirect to login page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
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
