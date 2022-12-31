import React, { useState, useEffect, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import LeftSideBar from '../../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import Styles from './prix.module.sass';
import DesktopTopNavigationBar from '../../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
import {
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	REAL_OFFER_ADD_PRODUCT_DELIVERIES,
	REAL_OFFER_ADD_PRODUCT_DESCRIPTION,
	REAL_SHOP_ADD_SHOP_NAME,
	AUTH_LOGIN,
} from '../../../../../utils/routes';
import MobileTopNavigationBar from '../../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import { Box, Stack, ThemeProvider } from '@mui/material';
import HelperH1Header from '../../../../../components/headers/helperH1Header/helperH1Header';
import Chip from '@mui/material/Chip';
import { SizesChipTheme } from "../../../../../utils/themes";
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import CurrencyInput from 'react-currency-input-field';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { setOfferProductPricePage } from '../../../../../store/actions/offer/offerActions';
import { useRouter } from 'next/router';
import {
	getLocalOfferProductPrice,
	getLocalOfferProductPriceBy,
	getLocalOfferProductTitle
} from "../../../../../store/selectors";
import { getServerSideCookieTokens, isAuthenticatedInstance } from '../../../../../utils/helpers';
import { AccountGetCheckAccountResponseType } from '../../../../../types/account/accountTypes';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import { ApiErrorResponseType } from '../../../../../types/_init/_initTypes';

const chipTheme = SizesChipTheme();
const Prix: NextPage = () => {
	const activeStep = '3';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [submitActive, setSubmitActive] = useState<boolean>(false);
	const pickedPriceBy = useAppSelector(getLocalOfferProductPriceBy);
	const pickedPrice = useAppSelector(getLocalOfferProductPrice);
	const pickedTitle = useAppSelector(getLocalOfferProductTitle);
	const [price, setPrice] = useState<string | number>(pickedPrice ? pickedPrice : '');
	const [unity, setUnity] = useState<boolean>(pickedPrice ? !!(pickedPriceBy && pickedPriceBy === 'U') : true);
	const [kg, setKg] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'K'));
	const [liter, setLiter] = useState<boolean>(!!(pickedPriceBy && pickedPriceBy === 'L'));

	const handleSubmit = useCallback(() => {
		let price_by: 'L' | 'U' | 'K' = 'U';
		if (unity) {
			price_by = 'U';
		}
		if (kg) {
			price_by = 'K';
		}
		if (liter) {
			price_by = 'L';
		}
		const action = setOfferProductPricePage(price as string, price_by);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: { error: ApiErrorResponseType; cancelled: boolean; data: boolean }) => {
				if (!error && !cancelled && data) {
					router.push(REAL_OFFER_ADD_PRODUCT_DELIVERIES(router.query.shop_link as string)).then();
				}
			},
		});
	}, [dispatch, kg, liter, price, router, unity]);

	useEffect(() => {
		if(!pickedTitle){
			router.replace(REAL_OFFER_ADD_PRODUCT_DESCRIPTION(router.query.shop_link as string)).then();
		}
		if (price === '' && (!unity || !kg || !liter)) {
			setSubmitActive(false);
		} else {
			if (typeof price === 'string') {
				if (parseFloat(price) !== 0 && (unity || kg || liter)) {
					setSubmitActive(true);
				} else {
					setSubmitActive(false);
				}
			} else {
				if (price !== 0 && (unity || kg || liter)) {
					setSubmitActive(true);
				} else {
					setSubmitActive(false);
				}
			}
		}
	}, [kg, liter, pickedTitle, price, router, unity]);

	return (
		<>
			<main className={Styles.main}>
				<LeftSideBar step={activeStep} which="PRODUCT" />
				<Box className={Styles.rootBox}>
					<DesktopTopNavigationBar
						backHref={REAL_OFFER_ADD_PRODUCT_DESCRIPTION(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_SHOP_BY_SHOP_LINK_ROUTE(router.query.shop_link as string)}
					/>
					<MobileTopNavigationBar
						backHref={REAL_OFFER_ADD_PRODUCT_DESCRIPTION(router.query.shop_link as string)}
						returnButton
						closeButtonHref={REAL_SHOP_BY_SHOP_LINK_ROUTE(router.query.shop_link as string)}
					/>
					<MobileStepsBar activeStep={activeStep} />
					<Box className={Styles.marginLeft}>
						<HelperH1Header
							header="Fixer un prix"
							headerClasses={Styles.topHeader}
						/>
					</Box>
					<Stack direction="column" className={Styles.stackWrapper} justifyContent="space-between">
						<Stack direction="column" spacing="12px" alignItems="center">
							<CurrencyInput
								allowDecimals={false}
								className={Styles.priceInputField}
								id="prix-input"
								name="prix-input"
								placeholder="0"
								value={price}
								onValueChange={(value) => {
									if (value) {
										setPrice(value);
									} else {
										setPrice('');
									}
								}}
							/>
							<Stack direction="row">
								<ThemeProvider theme={chipTheme}>
									<Stack
										direction="row"
										flexWrap="wrap"
										alignItems="center"
										className={Styles.stackRow}
									>
										<span className={Styles.priceLabel}>DH par</span>
										<Chip
											label="Unité"
											variant={unity ? 'filled' : 'outlined'}
											onClick={() => {
												setUnity(!unity);
												setLiter(false);
												setKg(false);
											}}
										/>
										<Chip
											label="Kg"
											variant={kg ? 'filled' : 'outlined'}
											onClick={() => {
												setKg(!kg);
												setLiter(false);
												setUnity(false);
											}}
										/>
										<Chip
											label="Litre"
											variant={liter ? 'filled' : 'outlined'}
											onClick={() => {
												setLiter(!liter);
												setKg(false);
												setUnity(false);
											}}
										/>
									</Stack>
								</ThemeProvider>
							</Stack>
						</Stack>
						<div className={Styles.primaryButtonWrapper}>
							<PrimaryButton buttonText="Continuer" active={submitActive} onClick={handleSubmit} />
						</div>
					</Stack>
				</Box>
			</main>
		</>
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
				// user has shop - proceed to add offer
				if (response.data.has_shop) {
					return {
						props: {},
					};
				} else {
					// user don't own a shop - proceed to create one.
					return {
						redirect: {
							permanent: false,
							destination: REAL_SHOP_ADD_SHOP_NAME,
						},
					};
				}
			} else {
				// user not authenticated
				return {
					redirect: {
						permanent: false,
						destination: AUTH_LOGIN,
					},
				};
			}
		} else {
			// user not authenticated
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		// fall back error
		return {
			redirect: {
				permanent: false,
				destination: AUTH_LOGIN,
			},
		};
	}
}

export default Prix;
