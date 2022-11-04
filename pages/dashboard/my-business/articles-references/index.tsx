import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import SharedStyles from '../../../../styles/dashboard/dashboard.module.sass';
import Styles from '../../../../styles/dashboard/indexedArticles.module.sass';
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
import {
	AUTH_LOGIN,
	DASHBOARD_ADD_INDEX_OFFERS,
	DASHBOARD_SUBSCRIPTION,
	NOT_FOUND_404,
} from '../../../../utils/routes';
import { Stack, Box, Button, IconButton, Divider, Checkbox, ThemeProvider, Skeleton, AlertColor } from "@mui/material";
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import DesktopMyBusinessSideNav from '../../../../components/layouts/desktop/desktopMyBusinessSideNav/desktopMyBusinessSideNav';
import Image from 'next/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import JumelleIlluSVG from '../../../../public/assets/images/jumelle-illu.svg';
import EmptyIndexedArticlesSVG from '../../../../public/assets/images/dashboard_illu/empty-indexed-articles.svg';
import AddWhiteSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/add-white.svg';
import DeleteRedSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/delete-red.svg';
import CloseSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/close.svg';
import SelectMultipleGraySVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/select-multiple-gray.svg';
import SelectMultipleBlueSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/select-multiple-blue.svg';
import MobileMyBusinessNav from '../../../../components/layouts/mobile/mobileMyBusinessNav/mobileMyBusinessNav';
import CustomFooter from '../../../../components/layouts/footer/customFooter';
import PrimaryAnchorButton from '../../../../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import OutlineButton from '../../../../components/htmlElements/buttons/outlineButton/outlineButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	subscriptionGetIndexedOffersPaginatedType,
	subscriptionGetIndexedOffersResponseType,
	subscriptionGetIndexedOffersType,
} from '../../../../types/subscription/subscriptionTypes';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { checkBoxTheme, getDefaultTheme } from '../../../../utils/themes';
import { CheckBoxSVG } from '../../../../components/htmlElements/checkBoxes/checkBox';
import { Iterables } from 'langx-js';
import { SagaCallBackOnCompleteBoolType, SagaCallBackType } from '../../../../types/_init/_initTypes';
import { useAppDispatch } from '../../../../utils/hooks';
import {
	subscriptionDeleteSingleIndexedArticleAction,
	subscriptionGetIndexedArticlesAction,
} from '../../../../store/actions/subscription/subscriptionActions';
import ApiProgress from '../../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import SeoAnchorWrapper from '../../../../components/htmlElements/buttons/seoAnchorWrapper/seoAnchorWrapper';
import CustomToast from "../../../../components/portals/customToast/customToast";
import Portal from "../../../../contexts/Portal";

type EmptyIndexedContentType = {
	all_slots_count: number;
	indexed_articles_count: number;
};

const IndexedArticlesCountBox: React.FC<EmptyIndexedContentType> = (props: EmptyIndexedContentType) => {
	const { all_slots_count, indexed_articles_count } = props;
	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing="10px"
			className={Styles.indexedArticlesBox}
		>
			<span>{indexed_articles_count}</span>
			<span>/{all_slots_count} articles</span>
		</Stack>
	);
};

const EmptyIndexedContent: React.FC<EmptyIndexedContentType> = (props: EmptyIndexedContentType) => {
	const { all_slots_count, indexed_articles_count } = props;
	return (
		<Stack direction="column" spacing="32px" className={SharedStyles.dashboardRightContentMarginLeft}>
			<Stack direction="column">
				<h2 className={SharedStyles.userShopTitle}>Articles référencés</h2>
			</Stack>
			<IndexedArticlesCountBox indexed_articles_count={indexed_articles_count} all_slots_count={all_slots_count} />
			<Stack direction="column" spacing="18px">
				<Stack direction="column" className={Styles.emptyIndexedHeaderContent}>
					<span>Vos client sont</span>
					<span>sur les moteurs de recherche.</span>
					<span>Et vous?</span>
				</Stack>
				<Box className={SharedStyles.desktopOnly}>
					<Stack direction="row" spacing="120px" className={Styles.emptyIndexedParagraphe}>
						<span>
							L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien
							référencé, abonnez vous pour toucher plus de gens.
						</span>
						<Box sx={{ position: 'relative', width: '100%' }}>
							<Image
								src={JumelleIlluSVG}
								alt=""
								width="273"
								height="178"
								sizes="100vw"
								className={Styles.desktopJumelleIllu}
							/>
						</Box>
					</Stack>
				</Box>
				<Box className={SharedStyles.mobileOnly}>
					<Stack direction="column" spacing="24px" className={Styles.emptyIndexedParagraphe}>
						<Image
							src={JumelleIlluSVG}
							alt=""
							width="273"
							height="178"
							sizes="100vw"
							style={{ alignSelf: 'flex-end' }}
						/>
						<span>
							L’acte d’achat a plus souvent lieu sur Google que sur Instagram. Si vous n’avez pas de site web bien
							référencé, abonnez vous pour toucher plus de gens.
						</span>
					</Stack>
				</Box>
				<Box className={Styles.emptyIndexedPrimaryButtonBox}>
					<PrimaryAnchorButton
						buttonText="S'abonner"
						active={true}
						nextPage={DASHBOARD_SUBSCRIPTION}
						cssClass={Styles.emptyIndexedPrimaryButton}
					/>
				</Box>
			</Stack>
		</Stack>
	);
};

const BlueAddButton = () => {
	return (
		<Link href={DASHBOARD_ADD_INDEX_OFFERS}>
			<Button color="primary" className={Styles.indexedArticlesAddActionButton}>
				<Stack direction="row" spacing="9px" alignItems="center">
					<Image src={AddWhiteSVG} width="14" height="14" sizes="100vw" alt="" />
					<span>Ajouter</span>
				</Stack>
			</Button>
		</Link>
	);
};

// ids: Array<number>
type DeleteButtonType = {
	ids: Array<number>;
	onClick: (ids: string) => void;
};
const RedDeleteButton: React.FC<DeleteButtonType> = (props: DeleteButtonType) => {
	const { ids, onClick } = props;
	const idsToDelete = ids.join(',');

	return (
		<Button color="primary" className={Styles.indexedArticlesDeleteActionButton} onClick={() => onClick(idsToDelete)}>
			<Stack direction="row" spacing="9px" alignItems="center">
				<Image src={DeleteRedSVG} width="12" height="12" sizes="100vw" alt="" />
				<span>Supprimer</span>
			</Stack>
		</Button>
	);
};

type indexedDataLinkedHashMapType = {
	count: number;
	nextPage: string | null;
	indexedDataMap: Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType> | null;
};

type IndexedArticlesContentType = {
	data: AccountGetDashboardType;
	indexedData: subscriptionGetIndexedOffersPaginatedType | null;
	setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const IndexedArticlesContent: React.FC<IndexedArticlesContentType> = (props: IndexedArticlesContentType) => {
	const { data, indexedData, setShowToast } = props;
	const { all_slots_count, indexed_articles_count } = data;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const itemsRef = useRef<Array<HTMLInputElement | null>>([]);
	const [indexedArticlesCount, setIndexedArticlesCount] = useState<number>(indexed_articles_count);
	const [itemIDS, setItemIDS] = useState<Array<number>>([]);
	const [itemsCheckList, setItemsCheckList] = useState<Array<boolean>>([]);
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [firstPageLoaded, setFirstPageLoaded] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [indexedDataLinkedHashMap, setIndexedDataLinkedHashMap] = useState<indexedDataLinkedHashMapType>({
		count: 0,
		nextPage: null,
		indexedDataMap: null,
	});
	const [selectAllState, setSelectAllState] = useState<boolean>(false);

	const addNewSlotsClickHandler = () => {
		router
			.push(
				{
					pathname: DASHBOARD_SUBSCRIPTION,
					query: {
						renderBack: true,
					},
				},
				DASHBOARD_SUBSCRIPTION,
			)
			.then();
	};

	const getIndexedData = useCallback(
		(isReset = false) => {
			const { count, nextPage, indexedDataMap } = indexedDataLinkedHashMap;
			if (!isReset && indexedDataMap !== null && count > 0 && indexedDataMap.size() >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_INDEXED_ARTICLES_ROOT}`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generatePageQueryParams(nextPage);
				url += queryParams;
			} else {
				queryParams = generatePageQueryParams();
				url += queryParams;
			}
			const action = subscriptionGetIndexedArticlesAction(url);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackType<subscriptionGetIndexedOffersPaginatedType>) => {
					if (!error && !cancelled && data) {
						let map: Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>;
						let checkBoxList: Array<boolean>;
						if (indexedDataMap === null || isReset) {
							map = new Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>();
							checkBoxList = [];
						} else {
							map = indexedDataMap;
							checkBoxList = itemsCheckList;
						}
						let result: indexedDataLinkedHashMapType = {
							count: 0,
							nextPage: null,
							indexedDataMap: null,
						};
						if (data.results.length > 0) {
							data.results.map((data) => {
								map.put(data.pk, data);
								checkBoxList.push(false);
							});
							result = {
								count: data.count,
								nextPage: getBackendNextPageNumber(data.next),
								indexedDataMap: map,
							};
						}
						setIndexedDataLinkedHashMap(result);
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
		[dispatch, indexedDataLinkedHashMap, itemsCheckList],
	);

	useEffect(() => {
		if (indexedData && !firstPageLoaded) {
			if (indexedData.count > indexedDataLinkedHashMap.count) {
				const map = new Iterables.LinkedHashMap<number, subscriptionGetIndexedOffersType>();
				const checkBoxList: Array<boolean> = [];
				indexedData.results.map((data) => {
					map.put(data.pk, data);
					checkBoxList.push(false);
				});
				const result = {
					count: indexedData.count,
					nextPage: getBackendNextPageNumber(indexedData.next),
					indexedDataMap: map,
				};
				setItemsCheckList(checkBoxList);
				setIndexedDataLinkedHashMap(result);
				setFirstPageLoaded(true);
				setIsLoadingNextPageInProgress(false);
				setIsLoadingInitInProgress(false);
			} else {
				setFirstPageLoaded(true);
				setIsLoadingInitInProgress(false);
			}
		}

		const loadFirstPage = () => {
			getIndexedData(true);
		};
		// on page first load
		if (!firstPageLoaded) {
			loadFirstPage();
		}
		// load more pressed
		if (loadMoreState) {
			if (indexedDataLinkedHashMap.indexedDataMap) {
				const isReset = indexedDataLinkedHashMap.indexedDataMap.size() >= indexedDataLinkedHashMap.count;
				getIndexedData(isReset);
			}
			setLoadMoreState(false);
		}
	}, [firstPageLoaded, getIndexedData, indexedData, indexedDataLinkedHashMap, isLoadingInitInProgress, loadMoreState]);

	const selectAllClickHandler = () => {
		setSelectAllState((prevState) => {
			setAllCheckHandler(!prevState);
			return !prevState;
		});
	};

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

	const deleteItemsHandler = (pk: number | string) => {
		const action = subscriptionDeleteSingleIndexedArticleAction(pk.toString());
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
				if (!error && !cancelled && data) {
					getIndexedData(true);
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
						setIndexedArticlesCount((prevState) => prevState - 1);
					} else {
						const pksList = pk.split(',');
						setIndexedArticlesCount((prevState) => prevState - pksList.length);
					}
					setShowToast(true);
				}
			},
		});
	};

	const CheckboxIcon = CheckBoxSVG('#0274D7', 24, 24);

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
				<Stack direction="column">
					<h2 className={SharedStyles.userShopTitle}>Articles référencés</h2>
				</Stack>
				<Stack direction="column" spacing="24px">
					<Stack direction="row" spacing="12px" className={Styles.indexedArticlesAddSlotStack}>
						<IndexedArticlesCountBox indexed_articles_count={indexedArticlesCount} all_slots_count={all_slots_count} />
						<Box className={Styles.indexedArticlesAddSlotBox}>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<Stack direction="column" className={Styles.indexedArticlesBoxContent}>
									<span>Pas assez de slots ?</span>
									<span className={SharedStyles.desktopOnly}>
										Passer au niveau supérieur, augementez vos <br /> nombre d&apos;articles référencés
									</span>
									<span className={SharedStyles.mobileOnly}>
										Passer au niveau supérieur, augementez vos nombre d&apos;articles référencés
									</span>
								</Stack>
								<OutlineButton
									buttonText="Ajouter"
									active={true}
									type="button"
									backgroundColor="#FFFFFF"
									cssClass={Styles.indexedArticlesAddBoxButton}
									onClick={addNewSlotsClickHandler}
								/>
							</Stack>
						</Box>
					</Stack>
					{indexedDataLinkedHashMap.indexedDataMap &&
					!indexedDataLinkedHashMap.indexedDataMap.isEmpty() &&
					firstPageLoaded ? (
						<Stack direction="column" spacing="18px">
							<Stack direction="row" justifyContent="space-between">
								<Button
									color="primary"
									className={Styles.indexedArticlesSelectAllButton}
									onClick={selectAllClickHandler}
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
								{!itemsCheckList.includes(true) ? (
									<BlueAddButton />
								) : (
									<RedDeleteButton ids={itemIDS} onClick={deleteItemsHandler} />
								)}
							</Stack>
							<Box className={SharedStyles.dashboardVuesBox}>
								{indexedDataLinkedHashMap.indexedDataMap
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
														sx={{ width: '100%' }}
													>
														<Stack direction="row" spacing="12px" alignItems="center">
															<ThemeProvider theme={checkBoxTheme('#0274d7')}>
																<Checkbox
																	checked={itemsCheckList[index]}
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
														<IconButton onClick={() => deleteItemsHandler(data.key)} size="large" color="inherit">
															<Image src={CloseSVG} alt="" width={19} height={19} sizes="100vw" />
														</IconButton>
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
								{indexedDataLinkedHashMap.nextPage && (
									<ThemeProvider theme={getDefaultTheme()}>
										<SeoAnchorWrapper
											href={{
												query: {
													...router.query,
													page: indexedDataLinkedHashMap.nextPage,
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
					) : (
						!isLoadingInitInProgress && (
							<>
								<Stack direction="row" justifyContent="flex-end">
									<BlueAddButton />
								</Stack>
								<Box className={Styles.emptyIndexedBox}>
									<Stack direction="column" alignItems="center" spacing="20px">
										<Image src={EmptyIndexedArticlesSVG} alt="" width="140" height="119" sizes="100vw" />
										<Stack direction="column" alignItems="center" className={Styles.emptyIndexedBoxContent}>
											<span>Pas d&apos;article référencé</span>
											<span>Commencez dès maintenant à référencer vos articles pour plus de visibilité !</span>
										</Stack>
									</Stack>
								</Box>
							</>
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
		indexedData: subscriptionGetIndexedOffersPaginatedType | null;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, indexedData } = props.pageProps;
	const { indexed_articles_count, all_slots_count } = data;
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	const [showToast, setShowToast] = useState<boolean>(false);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${SharedStyles.main} ${SharedStyles.fixMobile}`}>
				{!data.is_subscribed ? (
					<>
						<Stack direction="row" className={`${SharedStyles.desktopOnly} ${SharedStyles.flexRootStack}`}>
							<DesktopMyBusinessSideNav backText="My business" data={data} />
							<Box sx={{ width: '100%' }}>
								<EmptyIndexedContent
									indexed_articles_count={indexed_articles_count}
									all_slots_count={all_slots_count}
								/>
							</Box>
						</Stack>
						<Stack className={SharedStyles.mobileOnly}>
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
												onClick={() => setMobileElementClicked(false)}
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
									<EmptyIndexedContent
										indexed_articles_count={indexed_articles_count}
										all_slots_count={all_slots_count}
									/>
								</Box>
							)}
						</Stack>
					</>
				) : (
					<>
						<Stack direction="row" className={`${SharedStyles.desktopOnly} ${SharedStyles.flexRootStack}`}>
							<DesktopMyBusinessSideNav backText="My business" data={data} />
							<Box sx={{ width: '100%' }}>
								<IndexedArticlesContent data={data} indexedData={indexedData} setShowToast={setShowToast} />
							</Box>
						</Stack>
						<Stack className={SharedStyles.mobileOnly}>
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
												onClick={() => setMobileElementClicked(false)}
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
									<IndexedArticlesContent data={data} indexedData={indexedData} setShowToast={setShowToast} />
								</Box>
							)}
						</Stack>
					</>
				)}
				<Portal id="snackbar_portal">
          <CustomToast type="success" message="Article(s) retirer." setShow={setShowToast} show={showToast}/>
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
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// has shop proceed to indexed articles page
					const indexed_url = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_INDEXED_ARTICLES_ROOT}`;
					const response_indexed: subscriptionGetIndexedOffersResponseType = await getApi(indexed_url, instance);
					if (response_indexed.status === 200) {
						return {
							props: {
								data: response_shop.data,
								indexedData: response_indexed.data,
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
