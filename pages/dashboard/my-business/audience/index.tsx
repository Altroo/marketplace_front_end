import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import {
	generatePageQueryParams,
	getBackendNextPageNumber,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
} from '../../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../utils/routes';
import { Stack, Box, Divider, ThemeProvider, Button } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import { default as ImageFuture } from 'next/future/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import QuestionMarkSVG from '../../../../public/assets/svgs/globalIcons/question-mark.svg';
import DesktopArticlesTotalCountSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/desktop-articles-total-count.svg';
import MiniVuesSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mini-articles-vue-count.svg';
import { fullMonthItemsList } from '../../../../utils/rawData';
import ColoredVuesIlluSVG from '../../../../public/assets/images/dashboard_illu/colored-vues.svg';
import { OfferGetVues, OfferGetVuesResponseType, OfferGetVuesType } from '../../../../types/offer/offerTypes';
import { Iterables } from 'langx-js';
import { useRouter } from 'next/router';
import { offerGetVuesAction } from '../../../../store/actions/offer/offerActions';
import { useAppDispatch } from '../../../../utils/hooks';
import { SagaCallBackType } from '../../../../types/_init/_initTypes';
import ApiProgress from '../../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { getDefaultTheme } from '../../../../utils/themes';
import SeoAnchorWrapper from '../../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';

type offerLinkedHashMapType = {
	total_vues: number;
	this_month: number;
	pourcentage: string;
	count: number;
	nextPage: string | null;
	vuesMap: Iterables.LinkedHashMap<number, OfferGetVues> | null;
};

type PageContentType = {
	data: AccountGetDashboardType;
	vuesData: OfferGetVuesType | null;
};

const PageContent: React.FC<PageContentType> = (props: PageContentType) => {
	const { data, vuesData } = props;
	const { total_vue_month, total_vue_pourcentage, total_offers_vue_count } = data;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [totalVuePourcentageCSS, setTotalVuePourcentageCSS] = useState<string>(Styles.dashboardNeutralePourcentage);
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [offerVuesLinkedHashMap, setOfferVuesLinkedHashMap] = useState<offerLinkedHashMapType>({
		total_vues: 0,
		this_month: 0,
		pourcentage: '0',
		count: 0,
		nextPage: null,
		vuesMap: null,
	});

	useEffect(() => {
		if (total_vue_pourcentage.startsWith('+')) {
			setTotalVuePourcentageCSS(Styles.dashboardPositivePourcentage);
		} else if (total_vue_pourcentage.startsWith('-')) {
			setTotalVuePourcentageCSS(Styles.dashboardNegativePourcentage);
		}
		if (vuesData) {
			if (vuesData.count > offerVuesLinkedHashMap.count) {
				const map = new Iterables.LinkedHashMap<number, OfferGetVues>();
				vuesData.results.map((offer_vue) => {
					map.put(offer_vue.pk, offer_vue);
				});
				const result = {
					total_vues: vuesData.total_vues,
					this_month: vuesData.this_month,
					pourcentage: vuesData.pourcentage,
					count: vuesData.count,
					nextPage: getBackendNextPageNumber(vuesData.next),
					vuesMap: map,
				};
				setOfferVuesLinkedHashMap(result);
				setFirstPageLoaded(true);
				setIsLoadingNextPageInProgress(false);
				setIsLoadingInitInProgress(false);
			}
		}

		const getVues = (isReset = false) => {
			const { count, nextPage, vuesMap } = offerVuesLinkedHashMap;
			// is reset = false.
			// offers map is full
			// count > 0
			// offers map size >= count
			if (!isReset && vuesMap !== null && count > 0 && vuesMap.size() >= count) {
				return;
			}
			let vues_url = `${process.env.NEXT_PUBLIC_OFFER_VUES}`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generatePageQueryParams(nextPage);
				vues_url += queryParams;
			} else {
				queryParams = generatePageQueryParams();
				vues_url += queryParams;
			}
			const action = offerGetVuesAction(vues_url);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackType<OfferGetVuesType>) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, OfferGetVues>;
						if (vuesMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, OfferGetVues>();
						} else {
							map = vuesMap;
						}
						data.results.map((offer_vue) => {
							map.put(offer_vue.pk, offer_vue);
						});
						const result = {
							total_vues: data.total_vues,
							this_month: data.this_month,
							pourcentage: data.pourcentage,
							count: data.count,
							nextPage: getBackendNextPageNumber(data.next),
							vuesMap: map,
						};
						setOfferVuesLinkedHashMap(result);
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
			getVues(true);
		};
		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
		}
		// load more pressed
		if (loadMoreState) {
			if (offerVuesLinkedHashMap.vuesMap) {
				const isReset = offerVuesLinkedHashMap.vuesMap.size() >= offerVuesLinkedHashMap.count;
				getVues(isReset);
			}
			setLoadMoreState(false);
		}
	}, [total_vue_pourcentage, offerVuesLinkedHashMap, router.query, firstPageLoaded, loadMoreState, dispatch, vuesData]);

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
					<h2 className={Styles.userShopTitle}>Audience</h2>
					<Stack direction="row" gap="3px" alignItems="center">
						<ImageFuture src={QuestionMarkSVG} width={18} height={18} alt="" sizes="100vw" />
						<span className={Styles.myBusinessQuestion}>Comment booster ses ventes</span>
					</Stack>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center" className={Styles.dashboardVuesDesktopCard}>
					<ImageFuture src={DesktopArticlesTotalCountSVG} alt="" width="40" height="40" sizes="100vw" />
					<Stack direction="column" sx={{ width: '100%' }}>
						<span className={Styles.dashboardMiniCardCounter}>{total_offers_vue_count}</span>
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.dashboardMiniCardSubHeader}>{fullMonthItemsList[total_vue_month]}</span>
							<span className={`${Styles.dashboardMiniCardPourcentage} ${totalVuePourcentageCSS}`}>
								{total_vue_pourcentage}
							</span>
						</Stack>
					</Stack>
				</Stack>
				<Stack direction="column" spacing={2}>
					<Stack direction="row" justifyContent="space-between">
						<span className={Styles.dashboardShopName}>Top articles</span>
					</Stack>
					{!offerVuesLinkedHashMap.vuesMap?.isEmpty() && firstPageLoaded ? (
						// add list here
						<Stack direction="column">
							<Box className={Styles.dashboardVuesBox}>
								{offerVuesLinkedHashMap.vuesMap
									?.entrySet()
									.toArray()
									.map((data) => {
										if (data.value) {
											return (
												<Stack
													direction="column"
													key={data.key}
													className={Styles.offerVuesTopArticlesRootList}
												>
													<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
														<Stack direction="row" spacing="12px" alignItems="center">
															<ImageFuture
																src={data.value.thumbnail}
																alt=""
																width="54"
																height="54"
																sizes="100vw"
																className={Styles.offerVuesThumbnail}
															/>
															<span className={Styles.offerVuesOfferTitle}>{data.value.title}</span>
														</Stack>
														<Stack direction="row" spacing="8px" alignItems="center">
															<span className={Styles.offerVuesNumber}>{data.value.nbr_total_vue}</span>
															<ImageFuture
																src={MiniVuesSVG}
																alt=""
																width="18"
																height="18"
																sizes="100vw"
																className={Styles.vuesThumbnail}
															/>
														</Stack>
													</Stack>
													<Divider
														orientation="horizontal"
														flexItem
														className={Styles.divider}
														sx={{ width: '100%' }}
													/>
												</Stack>
											);
										}
									})}
							</Box>
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								className={Styles.offerVuesloadMoreStack}
							>
								{offerVuesLinkedHashMap.nextPage && (
									<ThemeProvider theme={getDefaultTheme()}>
										<SeoAnchorWrapper
											href={{
												query: {
													...router.query,
													page: offerVuesLinkedHashMap.nextPage,
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
							<Box className={Styles.dashboardEmptyVuesDesktopBox}>
								<ImageFuture src={ColoredVuesIlluSVG} alt="" width="173" height="110" sizes="100vw" />
								<Stack direction="column" alignItems="center">
									<span className={Styles.dashboardShopName}>Aucune vue</span>
									<span className={Styles.dashboardSellsDesktopBoxContent}>
										Vous n&apos;avez pas encore de vue sur votre boutique. Revenez ici un peu plus tard.
									</span>
								</Stack>
							</Box>
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
		vuesData: OfferGetVuesType | null;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, vuesData } = props.pageProps;
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Stack direction="row" className={`${Styles.desktopOnly} ${Styles.flexRootStack}`}>
					<DesktopMyBusinessSideNav backText="My business" data={data} />
					<Box sx={{ width: '100%' }}>
						<PageContent data={data} vuesData={vuesData} />
					</Box>
				</Stack>
				<Stack className={Styles.mobileOnly}>
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
										<ImageFuture
											src={MiniBackSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.backIcon}
										/>
										<span className={Styles.backText}>Retour</span>
									</Stack>
								</Stack>
							</Stack>
							<PageContent data={data} vuesData={vuesData} />
						</Box>
					)}
				</Stack>
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
					const vues_url = `${process.env.NEXT_PUBLIC_OFFER_VUES}`;
					const response_vues: OfferGetVuesResponseType = await getApi(vues_url, instance);
					if (response_vues.status === 200) {
						return {
							props: {
								data: response_shop.data,
								first_name: response.data.first_name,
								last_name: response.data.last_name,
								vuesData: response_vues.data,
							},
						};
					} else {
						return {
							props: {
								data: response_shop.data,
								first_name: response.data.first_name,
								last_name: response.data.last_name,
								vuesData: null,
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
