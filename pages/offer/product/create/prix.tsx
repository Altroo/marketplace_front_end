// Altroo :
// 1) Set currency input field as a component to be used in services & in edit.
// 2) Missing two way binding for back button.
// 3) Missing the formik & it's validation.
// 4) Missing back buttons.
// 5) Missing loading t'ill dispatch

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import OfferStyles from '../../../../styles/offer/create/offerCreateShared.module.sass';
import ShopStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import LeftSideBar from '../../../../components/groupedComponents/shared/leftSideBar/leftSideBar';
import Styles from '../../../../styles/offer/create/price.module.sass';
// import DesktopTopNavigationBar from '../../../../components/desktop/navbars/desktopTopNavigationBar/desktopTopNavigationBar';
// import { OFFER_ADD_PRODUCT_DESCRIPTION } from '../../../../utils/routes';
// import MobileTopNavigationBar from '../../../../components/mobile/navbars/mobileTopNavigationBar/mobileTopNavigationBar';
import MobileStepsBar from '../../../../components/mobile/navbars/mobileStepsBar/mobileStepsBar';
import { Box, Stack, ThemeProvider } from '@mui/material';
import HelperH1Header from '../../../../components/headers/helperH1Header/helperH1Header';
import Chip from '@mui/material/Chip';
import { OfferChipTheme } from '../../../../utils/themes';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import CurrencyInput from 'react-currency-input-field';
import { useAppDispatch } from "../../../../utils/hooks";
import { setOfferPricePage } from "../../../../store/actions/offer/offerActions";
import { useRouter } from "next/router";

const Prix: NextPage = () => {
	const activeStep = '3';
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [submitActive, setSubmitActive] = useState<boolean>(false);
	const [price, setPrice] = useState<string | number>('');
	const [unity, setUnity] = useState<boolean>(true);
	const [kg, setKg] = useState<boolean>(false);
	const [liter, setLiter] = useState<boolean>(false);

	const handleSubmit = () => {
		let price_by: "L" | "U" | "K" = 'U';
		if (unity) {
			price_by = 'U';
		}
		if (kg) {
			price_by = 'K';
		}
		if (liter) {
			price_by = 'L'
		}
		dispatch(setOfferPricePage(price as string, price_by, router));
	};

	useEffect(() => {
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
	}, [kg, liter, price, unity]);

	const chipTheme = OfferChipTheme();
	return (
		<>
			<LeftSideBar step={activeStep} which="PRODUCT" />
			<main className={ShopStyles.main}>
				<Box sx={{ width: '100%', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
					{/*<DesktopTopNavigationBar backHref={OFFER_ADD_PRODUCT_DESCRIPTION} returnButton />*/}
					{/*<MobileTopNavigationBar backHref={OFFER_ADD_PRODUCT_DESCRIPTION} returnButton />*/}
					<MobileStepsBar activeStep={activeStep} />
					<HelperH1Header
						header="Fixer un prix"
						HelpText="Apprendre à définir son prix"
						headerClasses={OfferStyles.topHeader}
					/>
					<Stack direction="column" justifyContent="space-between" sx={{ height: '90%' }}>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							sx={{ marginTop: '2rem' }}
						>
							<CurrencyInput
									className={Styles.priceInputField}
									id="prix-input"
									name="prix-input"
									placeholder="0.00"
									value={price}
									decimalsLimit={2}
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
										gap={2}
										alignItems="center"
										sx={{ marginTop: '6px' }}
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
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
							<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
								<PrimaryButton
									buttonText="Continuer"
									active={submitActive}
									onClick={handleSubmit}
									type="submit"
								/>
							</div>
						</Stack>
					</Stack>
				</Box>
			</main>
		</>
	);
};

export default Prix;
