import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import {
	Desktop,
	generatePageQueryParams,
	getBackendNextPageNumber,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	TabletAndMobile,
} from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, DASHBOARD_ORDER_DETAIL, NOT_FOUND_404 } from "../../../../utils/routes";
import { Stack, Box, ThemeProvider, Button } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import Image from 'next/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import DesktopUSDSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/desktop-usd.svg';
import { fullMonthItemsList, getDateStringFromFormatedDate } from "../../../../utils/rawData";
import ColoredOrdersIlluSVG from '../../../../public/assets/images/dashboard_illu/colored-orders.svg';
import { useRouter } from 'next/router';
import { OrderGetChiffreAffaireResponseType, OrderGetChiffreAffaire } from '../../../../types/order/orderTypes';
import { Iterables } from 'langx-js';
import { PaginationResponseType, SagaCallBackResponseType } from '../../../../types/_init/_initTypes';
import { useAppDispatch } from '../../../../utils/hooks';
import ApiProgress from '../../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { orderGetChiffreAffaireAction } from '../../../../store/actions/order/orderActions';
import EyeSeenGraySVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/eye-seen-gray.svg';
import { getDefaultTheme } from '../../../../utils/themes';
import SeoAnchorWrapper from '../../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import Link from 'next/link';

type chiffreAffaireLinkedHashMapType = {
	count: number;
	nextPage: string | null;
	chiffreAffaireMap: Iterables.LinkedHashMap<number, OrderGetChiffreAffaire> | null;
};

type PageContentType = {
	data: AccountGetDashboardType;
	orderData: PaginationResponseType<OrderGetChiffreAffaire> | null;
};
const PageContent: React.FC<PageContentType> = (props: PageContentType) => {
	const { total_sells_count, total_sells_pourcentage, total_sells_month } = props.data;
	const { orderData } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [totalSellsPourcentageCSS, setTotalSellsPourcentageCSS] = useState<string>(Styles.dashboardNeutralePourcentage);
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [chiffreAffaireLinkedHashMap, setChiffreAffaireLinkedHashMap] = useState<chiffreAffaireLinkedHashMapType>({
		count: 0,
		nextPage: null,
		chiffreAffaireMap: null,
	});

	useEffect(() => {
		if (total_sells_pourcentage.startsWith('+')) {
			setTotalSellsPourcentageCSS(Styles.dashboardPositivePourcentage);
		} else if (total_sells_pourcentage.startsWith('-')) {
			setTotalSellsPourcentageCSS(Styles.dashboardNegativePourcentage);
		}
		if (orderData) {
			if (orderData.count > chiffreAffaireLinkedHashMap.count) {
				const map = new Iterables.LinkedHashMap<number, OrderGetChiffreAffaire>();
				orderData.results.map((order) => {
					map.put(order.pk, order);
				});
				const result = {
					count: orderData.count,
					nextPage: getBackendNextPageNumber(orderData.next),
					chiffreAffaireMap: map,
				};
				setChiffreAffaireLinkedHashMap(result);
				setFirstPageLoaded(true);
				setIsLoadingNextPageInProgress(false);
				setIsLoadingInitInProgress(false);
			}
		}
		const getChiffreAffaire = (isReset = false) => {
			const { count, nextPage, chiffreAffaireMap } = chiffreAffaireLinkedHashMap;
			// is reset = false.
			// offers map is full
			// count > 0
			// offers map size >= count
			if (!isReset && chiffreAffaireMap !== null && count > 0 && chiffreAffaireMap.size() >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_ORDER_GET_CHIFFRE_AFFAIRE_LIST}`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generatePageQueryParams(nextPage);
				url += queryParams;
			} else {
				queryParams = generatePageQueryParams();
				url += queryParams;
			}
			const action = orderGetChiffreAffaireAction(url);
			dispatch({
				...action,
				onComplete: ({
					error,
					cancelled,
					data,
				}: SagaCallBackResponseType<PaginationResponseType<OrderGetChiffreAffaire>>) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, OrderGetChiffreAffaire>;
						if (chiffreAffaireMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, OrderGetChiffreAffaire>();
						} else {
							map = chiffreAffaireMap;
						}
						data.results.map((order) => {
							map.put(order.pk, order);
						});
						const result = {
							count: data.count,
							nextPage: getBackendNextPageNumber(data.next),
							chiffreAffaireMap: map,
						};
						setChiffreAffaireLinkedHashMap(result);
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
			getChiffreAffaire(true);
		};
		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
		}
		// load more pressed
		if (loadMoreState) {
			if (chiffreAffaireLinkedHashMap.chiffreAffaireMap) {
				const isReset = chiffreAffaireLinkedHashMap.chiffreAffaireMap.size() >= chiffreAffaireLinkedHashMap.count;
				getChiffreAffaire(isReset);
			}
			setLoadMoreState(false);
		}
	}, [
		chiffreAffaireLinkedHashMap,
		chiffreAffaireLinkedHashMap.count,
		dispatch,
		firstPageLoaded,
		loadMoreState,
		orderData,
		total_sells_pourcentage,
	]);

	return (
		<>
			{(isLoadingInitInProgress || isLoadingNextPageInProgress) && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			<Stack direction="column" spacing={3} className={Styles.dashboardRightContentMarginLeft}>
				<Stack direction="column">
					<h2 className={Styles.userShopTitle}>Chiffre d&apos;affaires</h2>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center" className={Styles.dashboardSellsDesktopCard}>
					<Image src={DesktopUSDSVG} alt="" width="40" height="40" sizes="100vw" />
					<Stack direction="column" sx={{ width: '100%' }}>
						<span className={Styles.dashboardMiniCardCounter}>
							{total_sells_count} DH
						</span>
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.dashboardMiniCardSubHeader}>
								Mois de {fullMonthItemsList[total_sells_month - 1]}
							</span>
							<span className={`${Styles.dashboardMiniCardPourcentage} ${totalSellsPourcentageCSS}`}>
								{total_sells_pourcentage}
							</span>
						</Stack>
					</Stack>
				</Stack>
				<Stack direction="column" spacing={2}>
					<Stack direction="row" justifyContent="space-between">
						<span className={Styles.dashboardShopName}>Mes commandes</span>
					</Stack>
					{!chiffreAffaireLinkedHashMap.chiffreAffaireMap?.isEmpty() && firstPageLoaded ? (
						// add list here
						<Stack direction="column">
							{chiffreAffaireLinkedHashMap.chiffreAffaireMap
								?.entrySet()
								.toArray()
								.map((data) => {
									if (data.value) {
										const { articles_count, order_number, order_date, total_price, pk } = data.value;
										return (
											<Link href={DASHBOARD_ORDER_DETAIL(pk)} key={data.key}>
												<Box className={Styles.dashboardChiffreAffaireBox}>
													<Desktop>
														<Stack direction="column">
															<Stack
																direction="row"
																justifyContent="space-between"
																alignItems="center"
																sx={{ width: '100%' }}
															>
																<span className={Styles.orderNumber}>Commande N° {order_number}</span>
																<span className={Styles.orderSpan}>{getDateStringFromFormatedDate(order_date)}</span>
																<span className={Styles.orderSpan}>
																	{articles_count === 1 ? `${articles_count} article` : `${articles_count} articles`}
																</span>
																<span className={Styles.orderSpan}>{total_price} DH</span>
																<Image src={EyeSeenGraySVG} alt="" width="42" height="42" sizes="100vw" />
															</Stack>
														</Stack>
													</Desktop>
													<TabletAndMobile>
														<Stack direction="column">
															<Stack
																direction="row"
																justifyContent="space-between"
																alignItems="center"
																sx={{ width: '100%' }}
															>
																<Stack direction="column" spacing="0px">
																	<span className={Styles.orderNumber}>Commande N° {order_number}</span>
																	<span className={Styles.orderSpan}>{total_price} DH</span>
																</Stack>
																<Image src={EyeSeenGraySVG} alt="" width="42" height="42" sizes="100vw" />
															</Stack>
														</Stack>
													</TabletAndMobile>
												</Box>
											</Link>
										);
									}
								})}
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								className={Styles.offerVuesloadMoreStack}
							>
								{chiffreAffaireLinkedHashMap.nextPage && (
									<ThemeProvider theme={getDefaultTheme()}>
										<SeoAnchorWrapper
											href={{
												query: {
													...router.query,
													page: chiffreAffaireLinkedHashMap.nextPage,
												},
											}}
											replace={true}
											scroll={false}
											shallow={true}
										>
											<Button
												variant="text"
												color="primary"
												className={Styles.offerVuesloadMoreButton}
												onClick={() => {
													setLoadMoreState(true);
													setIsLoadingNextPageInProgress(true);
												}}
											>
												Charger plus d&apos;articles
											</Button>
										</SeoAnchorWrapper>
									</ThemeProvider>
								)}
							</Stack>
						</Stack>
					) : (
						!isLoadingInitInProgress && (
							<Stack className={Styles.dashboardSellsDesktopBox} direction="column" alignItems="center">
								<Image src={ColoredOrdersIlluSVG} alt="" width="140" height="108" sizes="100vw" />
								<Stack direction="column" alignItems="center">
									<span className={Styles.dashboardShopName}>C&apos;est bien vide ici...</span>
									<span className={Styles.dashboardSellsDesktopBoxContent}>
										Vous n&apos;avez reçu aucune commande sur cette période
									</span>
								</Stack>
							</Stack>
						)
					)}
				</Stack>
			</Stack>
		</>
	);
};
type IndexProps = {
	pageProps: {
		data: AccountGetDashboardType;
		first_name: string;
		last_name: string;
		orderData: PaginationResponseType<OrderGetChiffreAffaire> | null;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, orderData } = props.pageProps;
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Desktop>
					<Stack direction="row" className={Styles.flexRootStack}>
						<DesktopMyBusinessSideNav backText="My business" data={data} />
						<Box sx={{ width: '100%' }}>
							<PageContent data={data} orderData={orderData} />
						</Box>
					</Stack>
				</Desktop>
				<TabletAndMobile>
					<Stack>
						{!mobileElementClicked ? (
							<MobileMyBusinessNav setContent={setMobileElementClicked} backText="My business" data={data} />
						) : (
							<Box sx={{ width: '100%', height: '100%' }}>
								<Stack direction="column">
									<Stack direction="row" justifyContent="space-between">
										<Stack
											className={Styles.topBackNavigationStack}
											direction="row"
											spacing={1}
											onClick={() => setMobileElementClicked(false)}
											alignItems="center"
										>
											<Image src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
											<span className={Styles.backText}>Retour</span>
										</Stack>
									</Stack>
								</Stack>
								<PageContent data={data} orderData={orderData} />
							</Box>
						)}
					</Stack>
				</TabletAndMobile>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// has shop proceed to audience page
					const chiffre_affaire_url = `${process.env.NEXT_PUBLIC_ORDER_GET_CHIFFRE_AFFAIRE_LIST}`;
					const response_chiffre_affaire: OrderGetChiffreAffaireResponseType = await getApi(
						chiffre_affaire_url,
						instance,
					);
					if (response_chiffre_affaire.status === 200) {
						return {
							props: {
								data: response_shop.data,
								first_name: response.data.first_name,
								last_name: response.data.last_name,
								orderData: response_chiffre_affaire.data,
							},
						};
					} else {
						return {
							props: {
								data: response_shop.data,
								first_name: response.data.first_name,
								last_name: response.data.last_name,
								orderData: null,
							},
						};
					}
					// doesn't own a shop
				} else {
					return {
						redirect: {
							permanent: false,
							destination: NOT_FOUND_404,
						},
					};
				}
				// fall back error
			} else {
				return {
					redirect: {
						permanent: false,
						destination: NOT_FOUND_404,
					},
				};
			}
		} else {
			// redirect to login page
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
		// redirect to 404
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
