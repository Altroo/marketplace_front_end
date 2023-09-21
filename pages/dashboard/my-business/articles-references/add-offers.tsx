import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import SharedStyles from '../../../../styles/dashboard/dashboard.module.sass';
import Styles from '../../../../styles/dashboard/indexedArticles.module.sass';
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
	AccountGetDashboardType,
} from '../../../../types/account/accountTypes';
import {
	Desktop,
	generatePageQueryParams,
	getBackendNextPageNumber,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	TabletAndMobile,
} from '../../../../utils/helpers';
import { getApi } from '../../../../store/services/_init/_initAPI';
import {
	subscriptionGetIndexedOffersPaginatedType,
	subscriptionGetIndexedOffersResponseType,
	subscriptionGetIndexedOffersType,
} from '../../../../types/subscription/subscriptionTypes';
import { AUTH_LOGIN, DASHBOARD_INDEXED_OFFERS, NOT_FOUND_404 } from '../../../../utils/routes';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Box, Button, Checkbox, Divider, Skeleton, Stack, ThemeProvider } from '@mui/material';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import Image from 'next/image';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import { Iterables } from 'langx-js';
import { useAppDispatch } from '../../../../utils/hooks';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import { CheckBoxSVG } from '../../../../components/htmlElements/checkBoxes/checkBox';
import ApiProgress from '../../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import {
	subscriptionGetAvailableArticlesAction,
	subscriptionPostIndexArticlesAction,
} from '../../../../store/actions/subscription/subscriptionActions';
import { SagaCallBackOnCompleteBoolType, SagaCallBackResponseType } from '../../../../types/_init/_initTypes';
import Link from 'next/link';
import CloseSVG from '../../../../public/assets/svgs/navigationIcons/close.svg';
import SelectMultipleGraySVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/select-multiple-gray.svg';
import SelectMultipleBlueSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/select-multiple-blue.svg';
import { checkBoxTheme, getDefaultTheme } from '../../../../utils/themes';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SeoAnchorWrapper from '../../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import { useRouter } from 'next/router';
import AddWhiteSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/add-white.svg';
import CustomToast from '../../../../components/portals/customToast/customToast';
import Portal from '../../../../contexts/Portal';

const CheckboxIcon = CheckBoxSVG('#0274D7', 24, 24);

type indexedDataLinkedHashMapType = {
	count: number;
	nextPage: string | null;
	offersDataMap: Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType> | null;
};

type AvailableOffersToIndexContentType = {
	availableSlots: number;
	offersData: subscriptionGetIndexedOffersPaginatedType | null;
	setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const BackButton = () => {
	return (
		<>
			<Desktop>
				<Box>
					<Link href={DASHBOARD_INDEXED_OFFERS}>
						<Button color="primary" className={Styles.availableArticlesBackButton}>
							<Stack direction="row" spacing="7px" alignItems="center">
								<span>Annuler</span>
								<Image src={CloseSVG} width="32" height="32" sizes="100vw" alt="" />
							</Stack>
						</Button>
					</Link>
				</Box>
			</Desktop>
		</>
	);
};

const AvailableOffersToIndexContent: React.FC<AvailableOffersToIndexContentType> = (
	props: AvailableOffersToIndexContentType,
) => {
	const { offersData, availableSlots, setShowToast } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const itemsRef = useRef<Array<HTMLInputElement | null>>([]);
	const [itemIDS, setItemIDS] = useState<Array<number>>([]);
	const [availableSlotsState, setAvailableSlotsState] = useState<number>(availableSlots);
	const [itemsCheckList, setItemsCheckList] = useState<Array<boolean>>([]);
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [offersDataLinkedHashMap, setOffersDataLinkedHashMap] = useState<indexedDataLinkedHashMapType>({
		count: 0,
		nextPage: null,
		offersDataMap: null,
	});
	const [selectAllState, setSelectAllState] = useState<boolean>(false);

	const getOffersData = useCallback(
		(isReset = false) => {
			const { count, nextPage, offersDataMap } = offersDataLinkedHashMap;
			if (!isReset && offersDataMap !== null && count > 0 && offersDataMap.size() >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_GET_AVAILABLE_ARTICLES}`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generatePageQueryParams(nextPage);
				url += queryParams;
			} else {
				queryParams = generatePageQueryParams();
				url += queryParams;
			}
			const action = subscriptionGetAvailableArticlesAction(url);
			dispatch({
				...action,
				onComplete: ({
					error,
					cancelled,
					data,
				}: SagaCallBackResponseType<subscriptionGetIndexedOffersPaginatedType>) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>;
						let checkBoxList: Array<boolean>;
						if (offersDataMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>();
							checkBoxList = [];
						} else {
							map = offersDataMap;
							checkBoxList = itemsCheckList;
						}
						let result: indexedDataLinkedHashMapType = {
							count: 0,
							nextPage: null,
							offersDataMap: null,
						};
						if (data.results.length > 0) {
							data.results.map((data) => {
								map.put(data.pk, data);
								checkBoxList.push(false);
							});
							result = {
								count: data.count,
								nextPage: getBackendNextPageNumber(data.next),
								offersDataMap: map,
							};
						}
						setOffersDataLinkedHashMap(result);
						setItemsCheckList(checkBoxList);
						setIsLoadingNextPageInProgress(false);
						if (isReset) {
							setIsLoadingInitInProgress(false);
							setFirstPageLoaded(true);
						}
					}
				},
			});
		},
		[dispatch, offersDataLinkedHashMap, itemsCheckList],
	);

	useEffect(() => {
		if (offersData && !firstPageLoaded) {
			if (offersData.count > offersDataLinkedHashMap.count) {
				const map = new Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>();
				const checkBoxList: Array<boolean> = [];
				offersData.results.map((data) => {
					map.put(data.pk, data);
					checkBoxList.push(false);
				});
				const result = {
					count: offersData.count,
					nextPage: getBackendNextPageNumber(offersData.next),
					offersDataMap: map,
				};
				setItemsCheckList(checkBoxList);
				setOffersDataLinkedHashMap(result);
				setFirstPageLoaded(true);
				setIsLoadingNextPageInProgress(false);
				setIsLoadingInitInProgress(false);
			} else {
				setFirstPageLoaded(true);
				setIsLoadingInitInProgress(false);
			}
		}

		const loadFirstPage = () => {
			getOffersData(true);
		};
		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
		}
		// load more pressed
		if (loadMoreState) {
			if (offersDataLinkedHashMap.offersDataMap) {
				const isReset = offersDataLinkedHashMap.offersDataMap.size() >= offersDataLinkedHashMap.count;
				getOffersData(isReset);
			}
			setLoadMoreState(false);
		}
	}, [firstPageLoaded, getOffersData, offersData, offersDataLinkedHashMap, isLoadingInitInProgress, loadMoreState]);

	const setAllCheckHandler = (checked: boolean) => {
		const checkedList = itemsCheckList.map((_) => {
			return checked;
		});
		if (checked) {
			const allItemsIDS: Array<number> = [];
			itemsRef.current.map((item) => {
				if (item) {
					allItemsIDS.push(parseInt(item.value));
				}
			});
			setItemIDS(allItemsIDS);
		} else {
			setItemIDS([]);
		}
		setItemsCheckList(checkedList);
	};

	const selectAllClickHandler = () => {
		setSelectAllState((prevState) => {
			setAllCheckHandler(!prevState);
			return !prevState;
		});
	};

	const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, pk: number) => {
		const checkedList = itemsCheckList.map((item, itemIndex) => {
			if (index === itemIndex) {
				if (event.target.checked && !itemIDS.includes(pk)) {
					setItemIDS((prevState) => [...prevState, pk]);
				} else if (!event.target.checked && itemIDS.includes(pk)) {
					setItemIDS((prevState) => {
						const index = prevState.indexOf(pk);
						if (index !== -1) {
							prevState.splice(index, 1);
						}
						return prevState;
					});
				}
				return event.target.checked;
			} else {
				return item;
			}
		});
		setItemsCheckList(checkedList);
		if (checkedList.every((item) => item)) {
			setSelectAllState(true);
		} else {
			setSelectAllState(false);
		}
	};

	const indexNewOffersHandler = (pk: number | string) => {
		const action = subscriptionPostIndexArticlesAction(pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
				if (!error && !cancelled && data) {
					getOffersData(true);
					setItemIDS((prevState) => {
						if (typeof pk === 'number') {
							const index = prevState.indexOf(pk);
							if (index !== -1) {
								prevState.splice(index, 1);
							}
						} else {
							const pksList = pk.split(',');
							pksList.map((pk) => {
								const index = prevState.indexOf(parseInt(pk));
								if (index !== -1) {
									prevState.splice(index, 1);
								}
							});
						}
						return prevState;
					});
					if (typeof pk === 'number') {
						setAvailableSlotsState((prevState) => prevState - 1);
					} else {
						const pksList = pk.split(',');
						setAvailableSlotsState((prevState) => prevState - pksList.length);
					}
					setShowToast(true);
				}
			},
		});
	};

	return (
		<>
			{(isLoadingInitInProgress || isLoadingNextPageInProgress) && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			<Stack direction="column" spacing="32px" className={SharedStyles.dashboardRightContentMarginLeft}>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<h2 className={SharedStyles.userShopTitle}>Référencer des articles</h2>
					<BackButton />
				</Stack>
				<span className={Styles.allAvailableArticles}>
					Tous vos articles ({offersDataLinkedHashMap.count ? offersDataLinkedHashMap.count : 0})
				</span>
				{offersDataLinkedHashMap.offersDataMap &&
				!offersDataLinkedHashMap.offersDataMap.isEmpty() &&
				firstPageLoaded ? (
					<Stack direction="column" spacing="18px">
						<Stack direction="row" justifyContent="space-between">
							<Button
								color="primary"
								className={Styles.indexedArticlesSelectAllButton}
								onClick={selectAllClickHandler}
								disabled={itemIDS.length === availableSlotsState}
								sx={{ opacity: `${itemIDS.length === availableSlotsState ? '.5' : '1'}` }}
							>
								<Stack direction="row" spacing="8px" alignItems="center">
									<Image
										src={!selectAllState ? SelectMultipleGraySVG : SelectMultipleBlueSVG}
										width="24"
										height="24"
										sizes="100vw"
										alt=""
									/>
									<span>Tout</span>
								</Stack>
							</Button>
							{itemsCheckList.includes(true) && (
								<Button
									color="primary"
									className={Styles.indexOffersAddActionButton}
									onClick={() => indexNewOffersHandler(itemIDS.join(','))}
									disabled={itemIDS.length > availableSlotsState}
									sx={{ opacity: `${itemIDS.length > availableSlotsState ? '.5' : '1'}` }}
								>
									<Stack direction="row" spacing="9px" alignItems="center">
										<Image src={AddWhiteSVG} width="14" height="14" sizes="100vw" alt="" />
										<span>Ajouter {`${itemIDS.length}/${availableSlotsState}`}</span>
									</Stack>
								</Button>
							)}
						</Stack>
						<Box className={SharedStyles.dashboardVuesBox}>
							{offersDataLinkedHashMap.offersDataMap
								?.entrySet()
								.toArray()
								.map((data, index) => {
									if (data.value) {
										return (
											<Stack direction="column" key={data.key} className={SharedStyles.offerVuesTopArticlesRootList}>
												<Stack
													direction="row"
													alignItems="center"
													justifyContent="space-between"
													sx={{
														width: '100%',
														opacity: `${!itemsCheckList[index] && itemIDS.length === availableSlotsState ? '.5' : '1'}`,
													}}
												>
													<Stack direction="row" spacing="12px" alignItems="center">
														<ThemeProvider theme={checkBoxTheme('#0274d7')}>
															<Checkbox
																checked={itemsCheckList[index]}
																disabled={!itemsCheckList[index] && itemIDS.length === availableSlotsState}
																icon={<RadioButtonUncheckedIcon />}
																checkedIcon={CheckboxIcon}
																size="medium"
																onChange={(e) => handleCheckChange(e, index, data.key)}
																value={data.key}
																inputRef={(el) => {
																	if (itemsRef.current) {
																		return (itemsRef.current[index] = el);
																	}
																}}
															/>
														</ThemeProvider>
														{!data.value.thumbnail ? (
															<Skeleton
																variant="rectangular"
																width={54}
																height={54}
																className={SharedStyles.offerVuesThumbnail}
															/>
														) : (
															<Image
																src={data.value.thumbnail}
																alt=""
																width="54"
																height="54"
																sizes="100vw"
																className={SharedStyles.offerVuesThumbnail}
															/>
														)}
														<span className={SharedStyles.offerVuesOfferTitle}>{data.value.title}</span>
													</Stack>
												</Stack>
												<Divider orientation="horizontal" flexItem className={SharedStyles.divider} />
											</Stack>
										);
									}
								})}
						</Box>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							className={SharedStyles.offerVuesloadMoreStack}
						>
							{offersDataLinkedHashMap.nextPage && (
								<ThemeProvider theme={getDefaultTheme()}>
									<SeoAnchorWrapper
										href={{
											query: {
												...router.query,
												page: offersDataLinkedHashMap.nextPage,
											},
										}}
										replace={true}
										scroll={false}
										shallow={true}
									>
										<Button
											variant="text"
											color="primary"
											className={SharedStyles.offerVuesloadMoreButton}
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
				) : null}
			</Stack>
		</>
	);
};

type ReferencerDesArticlesProps = {
	pageProps: {
		data: AccountGetDashboardType;
		offersData: subscriptionGetIndexedOffersPaginatedType | null;
	};
};
const ReferencerDesArticles: NextPage<ReferencerDesArticlesProps> = (props: ReferencerDesArticlesProps) => {
	const { data, offersData } = props.pageProps;
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	const [showToast, setShowToast] = useState<boolean>(false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${SharedStyles.main} ${SharedStyles.fixMobile}`}>
				<Desktop>
					<Stack direction="row" className={SharedStyles.flexRootStack}>
						<DesktopMyBusinessSideNav backText="My business" data={data} />
						<Box sx={{ width: '100%' }}>
							<AvailableOffersToIndexContent
								offersData={offersData}
								availableSlots={data.remaining_slots_count}
								setShowToast={setShowToast}
							/>
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
											className={SharedStyles.topBackNavigationStack}
											direction="row"
											spacing={1}
											onClick={() => {
												router
													.replace(
														{
															query: {
																direct: true,
															},
															pathname: DASHBOARD_INDEXED_OFFERS,
														},
														DASHBOARD_INDEXED_OFFERS,
													)
													.then();
											}}
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
								</Stack>
								<AvailableOffersToIndexContent
									offersData={offersData}
									availableSlots={data.remaining_slots_count}
									setShowToast={setShowToast}
								/>
							</Box>
						)}
					</Stack>
				</TabletAndMobile>
				<Portal id="snackbar_portal">
					<CustomToast type="success" message="Article(s) référencés." setShow={setShowToast} show={showToast} />
				</Portal>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200 && response.data.is_subscribed) {
					// has shop proceed to indexed articles page
					const offers_url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_GET_AVAILABLE_ARTICLES}`;
					// using same interface as indexed offers
					const response_offers: subscriptionGetIndexedOffersResponseType = await getApi(offers_url, instance);
					if (response_offers.status === 200) {
						return {
							props: {
								data: response_shop.data,
								offersData: response_offers.data,
							},
						};
					} else {
						return {
							props: {
								data: response_shop.data,
								indexedData: null,
							},
						};
					}
					// doesn't own a shop || not subscribed
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

export default ReferencerDesArticles;
