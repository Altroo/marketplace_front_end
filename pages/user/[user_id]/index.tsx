import React, { useEffect, useState } from 'react';
import Styles from '../../../styles/user/userIndex.module.sass';
import { GetServerSidePropsContext, NextPage } from 'next';
import {
	DASHBOARD_EDIT_PROFILE,
	NOT_FOUND_404,
	REAL_OFFER_ROUTE,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
} from '../../../utils/routes';
import {
	defaultInstance,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
} from '../../../utils/helpers';
import {
	AccountGetCheckAccountResponseType,
	AccountGetProfilByUserIDResponseType,
	AccountGetProfilByUserIDType,
} from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { getDefaultTheme, OfferReadOnlyTheme } from '../../../utils/themes';
import { Box, Divider, Grid, Skeleton, Stack, ThemeProvider } from '@mui/material';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import Image from 'next/image';
import Link from 'next/link';
import EditBlackSVG from '../../../public/assets/svgs/globalIcons/edit-transparent.svg';
import { getCategoriesDataArray } from '../../../utils/rawData';
import Chip from '@mui/material/Chip';
import BlackStarSVG from '../../../public/assets/svgs/globalIcons/black-star.svg';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import CreateYourShop from '../../../components/layouts/callToActionCards/createYourShop/createYourShop';

type UserInfoContentType = {
	avatar: string;
	first_name: string;
	last_name: string;
	city: string | null;
	country: string | null;
	date_joined: string;
	permission?: 'OWNER' | 'NOT_OWNER';
};
const UserInfoContent: React.FC<UserInfoContentType> = (props: UserInfoContentType) => {
	const { first_name, last_name, date_joined, avatar, country, city, permission } = props;
	const country_city: Array<string> = [];
	if (city) {
		country_city.push(city);
	}
	if (country) {
		country_city.push(country);
	}

	return (
		<Stack direction="column" className={Styles.userCardStack} spacing={1}>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={1.5}
				className={Styles.userCardStackContent}
			>
				<Box>
					<div className={Styles.dashboardAvatarSubWrapper}>
						{!avatar ? (
							<Skeleton variant="circular" width={98} height={98} />
						) : (
							<Image
								src={avatar}
								alt={`${first_name} ${last_name}`}
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.dashboardAvatar}
								loading="eager"
								priority={true}
							/>
						)}
					</div>
				</Box>
				<Stack direction="row" justifyContent="center" alignItems="center" flexWrap="wrap" columnGap={1}>
					<span className={Styles.userShopName}>{first_name}</span>
					<span className={Styles.userShopName}>{last_name}</span>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="center">
					{country_city.length > 0 && (
						<span className={Styles.dashboardCreateShopSubTitle}>{country_city.join(', ')}</span>
					)}
					<span className={Styles.userMembreDepuis}>Membre depuis {date_joined}</span>
				</Stack>
			</Stack>
			<Stack direction="column" justifyContent="center" alignItems="center" spacing="18px">
				<Divider
					orientation="horizontal"
					flexItem
					className={Styles.divider}
					sx={{ marginTop: '30px', marginBottom: '15px' }}
				/>
				{permission === 'OWNER' && (
					<Link href={DASHBOARD_EDIT_PROFILE}>
						<Stack direction="row" spacing={1} alignItems="center">
							<Image src={EditBlackSVG} alt="" width="17" height="17" sizes="100vw" />
							<span>Modifier mon profil</span>
						</Stack>
					</Link>
				)}
			</Stack>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: AccountGetProfilByUserIDType;
		permission: 'OWNER' | 'NOT_OWNER';
		has_shop: boolean;
	};
};

const UserIndex: NextPage<IndexProps> = (props: IndexProps) => {
	const { data, permission, has_shop } = props.pageProps;
	const {
		avatar,
		first_name,
		last_name,
		city,
		country,
		date_joined,
		shop_name,
		shop_pk,
		shop_link,
		available_services,
		available_categories,
		offers,
	} = data;

	const [categoriesListString, setCategoriesListString] = useState<Array<string>>([]);

	useEffect(() => {
		let categoriesListString: Array<string> = [];
		if (available_categories) {
			categoriesListString = getCategoriesDataArray(available_categories);
			if (available_services) {
				categoriesListString.push('Services');
			}
			setCategoriesListString(categoriesListString);
		}
	}, [available_categories, available_services]);

	return (
		<ThemeProvider theme={getDefaultTheme()}>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={`${Styles.dashboardIndexMain} ${Styles.fixMobile}`}>
					<Stack
						direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
						spacing={{ xs: '0px', sm: '0px', md: '148px', lg: '148px', xl: '148px' }}
						width="100%"
					>
						{shop_pk === null ? (
							<UserInfoContent
								avatar={avatar}
								last_name={last_name}
								first_name={first_name}
								city={city}
								date_joined={date_joined}
								country={country}
								permission={permission}
							/>
						) : (
							<UserInfoContent
								avatar={avatar}
								last_name={last_name}
								first_name={first_name}
								city={city}
								date_joined={date_joined}
								country={country}
							/>
						)}
						{has_shop ? (
							<Stack direction="column" spacing={5}>
								<Stack direction="column" spacing={1}>
									<h2 className={Styles.userShopTitle}>Boutique</h2>
									<Stack direction="column" spacing={1}>
										<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(shop_link as string)}>
											<span className={Styles.userShopLink}>{shop_name}</span>
										</Link>
										<Grid container gap="8px" wrap="wrap">
											<ThemeProvider theme={OfferReadOnlyTheme()}>
												{categoriesListString.map((category, index) => {
													return (
														<Grid item xs="auto" key={index}>
															<Chip label={category} variant="filled" className={Styles.chip} />
														</Grid>
													);
												})}
											</ThemeProvider>
										</Grid>
									</Stack>
								</Stack>
								<Stack
									direction="row"
									spacing={{ xs: '12px', sm: '12px', md: '0px', lg: '0px', xl: '0px' }}
									gap={{ xs: '0px', sm: '0px', md: '12px', lg: '12px', xl: '12px' }}
									flexWrap={{ md: 'wrap', lg: 'wrap', xl: 'wrap' }}
									overflow={{ xs: 'scroll', sm: 'scroll'}}
								>
									{offers.map((offer) => {
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
											<Link href={REAL_OFFER_ROUTE(shop_link as string, encodeURIComponent(offer.pk))} key={offer.pk}>
												<span className={Styles.userCardOfferWrapper}>
													<Grid item xs="auto">
														<Stack direction="column" spacing={2} width="min-content">
															<Image
																src={offer.thumbnail}
																alt=""
																width="0"
																height="0"
																sizes="100vw"
																className={Styles.userOfferThumb}
															/>
															<Stack direction="column" spacing={1}>
																<span className={Styles.userOfferTitle}>{offer.title}</span>
																{/*<Stack direction="row">*/}
																{/*	<Image src={BlackStarSVG} alt="" width="20" height="20" sizes="100vw" />*/}
																{/*	<span className={Styles.userOfferRating}>0 (0 notes)</span>*/}
																{/*</Stack>*/}
																<Stack direction="row" spacing={1}>
																	<span
																		className={`${Styles.userOfferPrice} ${
																			offer.solder_value !== null && Styles.userOldPrice
																		}`}
																	>
																		{offer.price + ' DH'}
																	</span>
																	<span className={Styles.userSolderPrice}>
																		{offer.solder_value !== null ? newPrice + ' DH' : null}
																	</span>
																</Stack>
															</Stack>
														</Stack>
													</Grid>
												</span>
											</Link>
										);
									})}
								</Stack>
								{has_shop ? (
									<Stack direction="column" spacing={1}>
										<h2 className={Styles.userShopTitle}>Evaluation</h2>
										<Stack direction="row" alignItems="center">
											<Image src={BlackStarSVG} alt="" width="24" height="24" sizes="100vw" />
											<span className={Styles.userNoAvailableComments}>0 sur 5</span>
										</Stack>
										<span className={Styles.paragrapheContent}>Cette boutique n&apos;a pas encore été évaluée</span>
									</Stack>
								) : (
									<Stack direction="column" spacing={1}>
										<h2 className={Styles.userShopTitle}>Evaluation</h2>
										<Stack direction="row" alignItems="center">
											<Image src={BlackStarSVG} alt="" width="24" height="24" sizes="100vw" />
											<span className={Styles.userNoAvailableComments}>0 sur 5</span>
										</Stack>
										<span className={Styles.paragrapheContent}>Ce profil n&apos;a pas encore été évalué</span>
									</Stack>
								)}
							</Stack>
						) : (
							<Stack direction="column" spacing="32px" sx={{ width: '100%' }}>
								{permission === 'OWNER' && (
									<Stack direction="column" spacing={2}>
										<h2 className={Styles.userShopTitle}>Boutique</h2>
										<CreateYourShop />
									</Stack>
								)}
								<Stack direction="column" spacing={1}>
									<h2 className={Styles.userShopTitle}>Evaluation</h2>
									<Stack direction="row" alignItems="center">
										<Image src={BlackStarSVG} alt="" width="24" height="24" sizes="100vw" />
										<span className={Styles.userNoAvailableComments}>0 sur 5</span>
									</Stack>
									<span className={Styles.paragrapheContent}>Ce profil n&apos;a pas encore été évalué</span>
								</Stack>
							</Stack>
						)}
					</Stack>
				</main>
				<CustomFooter />
			</Stack>
		</ThemeProvider>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const user_id = context.params?.user_id as string;
	const not_found_redirect = {
		redirect: {
			permanent: false,
			destination: NOT_FOUND_404,
		},
	};
	if (user_id) {
		const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_PROFIL}${user_id}`;
		const appToken = getServerSideCookieTokens(context);
		// case connected - check if owner - not owner or not found.
		try {
			if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access !== null) {
				const instance = isAuthenticatedInstance(appToken.initStateToken);
				const response: AccountGetProfilByUserIDResponseType = await getApi(url, instance);
				const check_account_url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
				const response_checkAccount: AccountGetCheckAccountResponseType = await getApi(check_account_url, instance);
				if (response.status === 200 && response_checkAccount.status === 200) {
					// if (shop_response.data.user === response.data.pk) {
					if (response_checkAccount.data.pk.toString() === user_id) {
						return {
							props: {
								data: response.data,
								permission: 'OWNER',
								has_shop: !!response.data.shop_pk,
							},
						};
					} else {
						return {
							props: {
								data: response.data,
								permission: 'NOT_OWNER',
								has_shop: !!response.data.shop_pk,
							},
						};
					}
				} else {
					return not_found_redirect;
				}
				// case not connected
			} else {
				const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
				const url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_PROFIL}${user_id}`;
				const instance = defaultInstance(base_url);
				const response: AccountGetProfilByUserIDResponseType = await getApi(url, instance);
				if (response.status === 200) {
					return {
						props: {
							data: response.data,
							permission: 'NOT_OWNER',
							has_shop: !!response.data.shop_pk,
						},
					};
				} else {
					return not_found_redirect;
				}
			}
		} catch (e) {
			return not_found_redirect;
		}
	}
}

export default UserIndex;
