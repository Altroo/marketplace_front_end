import React from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Styles from '../../styles/panier/panierIndex.module.sass';
import UserMainNavigationBar from '../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Stack, Box, Divider } from '@mui/material';
import CustomFooter from '../../components/layouts/footer/customFooter';
import EmptyCartIlluSVG from '../../public/assets/images/cart_illu/empty-cart-illu.svg';
import Image from 'next/image';
import PrimaryButton from '../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import {
	CartGetAllResponseType,
	cartPaginationDetailsForProduct,
	cartPaginationDetailsForService,
	getAllMultiCartType,
} from '../../types/cart/cartTypes';
import TextAnchorButton from '../../components/htmlElements/buttons/textAnchorButton/textAnchorButton';
import ArrowRightSVG from '../../public/assets/svgs/navigationIcons/arrow-right.svg';
import {
	allowAnyInstance,
	Desktop,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	TabletAndMobile,
} from '../../utils/helpers';
import { PANIER_DETAILS_BY_SHOP_PK, REAL_OFFER_ROUTE } from '../../utils/routes';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { AxiosInstance } from 'axios';
import { getApi } from '../../store/services/_init/_initAPI';
import { getDateStringFromFormatedDate } from '../../utils/rawData';

const EmptyCartContent = () => {
	const router = useRouter();

	return (
		<Box className={Styles.emptyCartBox}>
			<Stack direction="column" spacing="32px" justifyContent="center" alignItems="center">
				<Image src={EmptyCartIlluSVG} alt="" width={199} height={334} sizes="100vw" />
				<h2 className={Styles.emptyCartHeader}>Votre panier est vide</h2>
				<div className={Styles.primaryButtonWrapper}>
					<PrimaryButton buttonText="Rechercher" active onClick={() => router.push('/')} />
				</div>
			</Stack>
		</Box>
	);
};

type IndexPropsType = {
	pageProps: {
		data: getAllMultiCartType | null;
		cart_unique_id: string | null;
	};
};
const Index: NextPage<IndexPropsType> = (props: IndexPropsType) => {
	const { data, cart_unique_id } = props.pageProps;
	const router = useRouter();

	if (!data || !cart_unique_id) {
		// Return empty cart page
		return (
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<EmptyCartContent />
				</main>
				<CustomFooter />
			</Stack>
		);
	} else {
		// multi case
		return (
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<Stack direction="column" spacing="25px">
						<h2 className={Styles.header}>
							Paniers <span>({data.shops_count})</span>
						</h2>
						<Desktop>
							<Stack direction="column" spacing="12px">
								{data.results.map((result, index) => {
									return (
										<Box
											key={index}
											className={Styles.multiRootBox}
											onClick={() => {
												router.push(PANIER_DETAILS_BY_SHOP_PK(result.shop_pk)).then();
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
																		src={result.shop_picture}
																		alt={result.desktop_shop_name}
																		width="0"
																		height="0"
																		sizes="100vw"
																		className={Styles.avatar}
																		loading="eager"
																		priority={true}
																	/>
																</div>
																{/*<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(result.shop_link)}>*/}
																<h3 className={Styles.shopName}>{result.desktop_shop_name}</h3>
																{/*</Link>*/}
																<span className={Styles.nbrArticle}>
																	{result.offers_count} {result.offers_count > 1 ? 'articles' : 'article'}
																</span>
															</Stack>
															<Desktop>
																<TextAnchorButton
																	buttonText="Voir le panier"
																	nextPage={`${PANIER_DETAILS_BY_SHOP_PK(result.shop_pk)}`}
																/>
															</Desktop>
														</Stack>
													</Stack>
													{result.cart_details.map((offer, index) => {
														return (
															<Stack direction="column" spacing="18px" key={index} className={Styles.rootArticleStack}>
																<Stack direction="row" alignItems="center" width="100%">
																	<Stack direction="row" spacing="18px" alignItems="center" width="100%">
																		<Image
																			src={offer.offer_picture}
																			alt={offer.offer_title}
																			width="64"
																			height="64"
																			sizes="100vw"
																			className={Styles.offerPicture}
																			loading="eager"
																			priority={true}
																		/>
																		<Stack direction="column">
																			<Link href={REAL_OFFER_ROUTE(result.shop_link, offer.offer_pk.toString())}>
																				<h4 className={Styles.offerTitle}>{offer.offer_title}</h4>
																			</Link>
																			{offer.offer_type === 'V' ? (
																				<Stack direction="column">
																					{(offer.offer_details as cartPaginationDetailsForProduct).picked_color && (
																						<span className={Styles.offerDetails}>
																							Couleur :{' '}
																							{(offer.offer_details as cartPaginationDetailsForProduct).picked_color}
																						</span>
																					)}
																					{(offer.offer_details as cartPaginationDetailsForProduct).picked_size && (
																						<span className={Styles.offerDetails}>
																							Taille :{' '}
																							{(offer.offer_details as cartPaginationDetailsForProduct).picked_size}
																						</span>
																					)}
																				</Stack>
																			) : (
																				<Stack direction="column">
																					{(offer.offer_details as cartPaginationDetailsForService).picked_date && (
																						<span className={Styles.offerDetails}>
																							Date :{' '}
																							{getDateStringFromFormatedDate(
																								(offer.offer_details as cartPaginationDetailsForService)
																									.picked_date as Date,
																							)}
																						</span>
																					)}
																					{(offer.offer_details as cartPaginationDetailsForService).picked_hour && (
																						<span className={Styles.offerDetails}>
																							Heure :{' '}
																							{(
																								offer.offer_details as cartPaginationDetailsForService
																							).picked_hour?.slice(0, -3)}
																						</span>
																					)}
																				</Stack>
																			)}
																		</Stack>
																	</Stack>
																	{offer.offer_type === 'V' &&
																		(offer.offer_details as cartPaginationDetailsForProduct).picked_quantity && (
																			<span className={Styles.offerQuantity}>
																				{(offer.offer_details as cartPaginationDetailsForProduct).picked_quantity}
																			</span>
																		)}
																	<span className={Styles.offerPrice}>{offer.offer_price} DH</span>
																</Stack>
																<Divider orientation="horizontal" flexItem className={Styles.divider} />
															</Stack>
														);
													})}
													<span className={Styles.totalPrice}>{result.offer_total_price} DH</span>
												</Stack>
												<Stack direction="column" justifyContent="center" alignItems="center">
													<Image src={ArrowRightSVG} width="24" height="24" alt="" sizes="100vw" />
												</Stack>
											</Stack>
										</Box>
									);
								})}
							</Stack>
						</Desktop>
						<TabletAndMobile>
							<Stack direction="column" spacing="12px">
								{data.results.map((result, index) => {
									return (
										<Box
											key={index}
											className={Styles.multiRootBox}
											onClick={() => {
												router.push(PANIER_DETAILS_BY_SHOP_PK(result.shop_pk)).then();
											}}
										>
											<Stack direction="row" justifyContent="space-between" alignItems="center" spacing="18px">
												<Stack direction="row" alignItems="center" spacing="18px">
													<div className={Styles.avatarSubWrapper}>
														<Image
															src={result.shop_picture}
															alt={result.desktop_shop_name}
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.avatar}
															loading="eager"
															priority={true}
														/>
													</div>
													<Stack direction="column" spacing="5px">
														{/*<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(result.shop_link)}>*/}
														<h3 className={Styles.shopName}>{result.desktop_shop_name}</h3>
														{/*</Link>*/}
														<span className={Styles.offerTitle}>{result.mobile_shop_name}</span>
														<span className={Styles.offerPrice}>{result.offer_total_price} DH</span>
													</Stack>
												</Stack>
												<Stack direction="column" justifyContent="center" alignItems="center">
													<Image src={ArrowRightSVG} width="24" height="24" alt="" sizes="100vw" />
												</Stack>
											</Stack>
										</Box>
									);
								})}
							</Stack>
						</TabletAndMobile>
					</Stack>
				</main>
				<CustomFooter />
			</Stack>
		);
	}
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const cart_unique_id = getCookie('@unique_id', { req: context.req, res: context.res });
// 	const emptyProps = {
// 		props: {
// 			data: null,
// 			cart_unique_id: null,
// 		},
// 	};
// 	if (cart_unique_id) {
// 		const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_LIST}${cart_unique_id}/`;
// 		const instance: AxiosInstance = allowAnyInstance();
// 		const response: CartGetAllResponseType = await getApi(url, instance);
// 		if (response.status === 200) {
// 			if (response.data.results.length > 0) {
// 				// redirect here if single
// 				if (response.data.cart_type === 'MULTI_SHOP') {
// 					return {
// 						props: {
// 							data: response.data,
// 							cart_unique_id: cart_unique_id,
// 						},
// 					};
// 				} else {
// 					return {
// 						// redirect to single page detail
// 						redirect: {
// 							permanent: false,
// 							destination: PANIER_DETAILS_BY_SHOP_PK(response.data.results[0].shop_pk),
// 						},
// 					};
// 				}
// 			} else {
// 				return emptyProps;
// 			}
// 		} else {
// 			return emptyProps;
// 		}
// 	} else {
// 		return emptyProps;
// 	}
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cart_unique_id = getCookie('@unique_id', { req: context.req, res: context.res });
	const emptyProps = {
		props: {
			data: null,
			cart_unique_id: null,
		},
	};
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_LIST}`;
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: CartGetAllResponseType = await getApi(url, instance);
			if (response.status === 200) {
				if (response.data.results.length > 0) {
					// redirect here if single
					if (response.data.cart_type === 'MULTI_SHOP') {
						return {
							props: {
								data: response.data,
								cart_unique_id: cart_unique_id,
							},
						};
					} else {
						return {
							// redirect to single page detail
							redirect: {
								permanent: false,
								destination: PANIER_DETAILS_BY_SHOP_PK(response.data.results[0].shop_pk),
							},
						};
					}
				} else {
					return emptyProps;
				}
			} else {
				return emptyProps;
			}
		} else {
			if (cart_unique_id) {
				const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_LIST}${cart_unique_id}/`;
				const instance: AxiosInstance = allowAnyInstance();
				const response: CartGetAllResponseType = await getApi(url, instance);
				if (response.status === 200) {
					if (response.data.results.length > 0) {
						// redirect here if single
						if (response.data.cart_type === 'MULTI_SHOP') {
							return {
								props: {
									data: response.data,
									cart_unique_id: cart_unique_id,
								},
							};
						} else {
							return {
								// redirect to single page detail
								redirect: {
									permanent: false,
									destination: PANIER_DETAILS_BY_SHOP_PK(response.data.results[0].shop_pk),
								},
							};
						}
					} else {
						return emptyProps;
					}
				} else {
					return emptyProps;
				}
			} else {
				return emptyProps;
			}
		}
	} catch (e) {
		return emptyProps;
	}
}

export default Index;
