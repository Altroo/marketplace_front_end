import React from 'react';
import Styles from './startYourShopContent.module.sass';
import CenteredInfoAction from '../../create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../../htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import ActivatedAddIconSVG from '../../../../../public/assets/svgs/globalIcons/blue-add.svg';
import PinActiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-active.svg';
import PinInactiveIconSVG from '../../../../../public/assets/svgs/globalIcons/pin-inactive.svg';
import { TEMP_OFFER_ADD_INDEX, TEMP_OFFER_ROUTE } from "../../../../../utils/routes";
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import {
	getMyOffersList,
	// getShopBgColorCode,
	// getShopBorder,
	// getShopColorCode,
	// getShopIconColor,
} from '../../../../../store/selectors';
import { Stack, Grid, Box } from '@mui/material';
import LargeBorderIconAnchorButton from '../../../../htmlElements/buttons/largeBorderIconAnchorButton/largeBorderIconAnchorButton';
import Link from 'next/link';
import { default as ImageFuture } from 'next/future/image';
import { OfferGetMyOffersProductServiceType } from '../../../../../types/offer/offerTypes';
import Image from 'next/image';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
// import MobileFilterWhiteSVG from '../../../../../public/assets/svgs/globalIcons/mobile-filter-white.svg';
// import MobileFilterBlackSVG from '../../../../../public/assets/svgs/globalIcons/mobile-filter-black.svg';
import { offerPostPinAction } from '../../../../../store/actions/offer/offerActions';
// import MobileOffersFilterButton from '../../../../mobile/buttons/mobileOffersFilterButton/mobileOffersFilterButton';

type Props = {
	children?: React.ReactNode;
};

const StartYourShopContent: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const userOffersList = useAppSelector(getMyOffersList);
	// const border = useAppSelector(getShopBorder);
	// const color_code = useAppSelector(getShopColorCode);
	// const bg_color_code = useAppSelector(getShopBgColorCode);
	// const icon_color = useAppSelector(getShopIconColor);

	// useEffect(() => {
	// 	console.log(userOffersList);
	// }, [userOffersList]);

	const togglePinHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, pk: number) => {
		e.preventDefault();
		dispatch(offerPostPinAction(pk));
	};

	// Publish your first offer button
	return userOffersList.length === 0 ? (
		<div className={Styles.shopAddOfferWrapper}>
			<div className={Styles.addOfferContainer}>
				<div className={Styles.centeredInfoActionWrapper}>
					<CenteredInfoAction
						header="Démarrer votre boutique"
						subHeader="Ajoutez votre premier article !"
						cssHeaderClass={Styles.infoHeader}
						cssSubHeaderClass={Styles.infoSubHeader}
					/>
					<BorderIconAnchorButton
						buttonText="Ajouter un article"
						svgIcon={ActivatedAddIconSVG}
						active={true}
						nextPage={TEMP_OFFER_ADD_INDEX}
					/>
				</div>
			</div>
		</div>
	) : (
		// Show available offers list.
		<Grid container gap={2} wrap="wrap">
			<Grid item xs="auto" className={Styles.gridButtonAddAnOfferWrapper}>
				<LargeBorderIconAnchorButton
					buttonText="Ajouter un article"
					svgIcon={ActivatedAddIconSVG}
					active={true}
					nextPage={TEMP_OFFER_ADD_INDEX}
				/>
			</Grid>
			{userOffersList.map((userOffer: OfferGetMyOffersProductServiceType) => {
				const { price, solder_type, solder_value } = userOffer;
				let newPrice = 0;
				if (solder_type !== null && solder_value !== null) {
					if (solder_type === 'F') {
						newPrice = price - solder_value;
					} else if (solder_type === 'P') {
						newPrice = price - (price * solder_value) / 100;
					}
				}
				return (
					<Link href={`${TEMP_OFFER_ROUTE}/${encodeURIComponent(userOffer.pk)}/`} passHref key={userOffer.pk}>
						<a className={Styles.gridCardOfferWrapper}>
							<Grid item xs="auto">
								<Stack direction="column" spacing={2}>
									<Box className={Styles.thumbnailWrapper}>
										{userOffer.pinned ? (
											<ImageFuture
												src={PinActiveIconSVG}
												alt=""
												width={32}
												height={32}
												className={Styles.thumbnailActionIcon}
												loading="lazy"
												onClick={(e) => togglePinHandler(e, userOffer.pk)}
											/>
										) : (
											<ImageFuture
												src={PinInactiveIconSVG}
												alt=""
												width={32}
												height={32}
												className={Styles.thumbnailActionIcon}
												loading="lazy"
												onClick={(e) => togglePinHandler(e, userOffer.pk)}
											/>
										)}
										<ImageFuture
											src={userOffer.thumbnail}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.offerThumb}
											loading="lazy"
										/>
									</Box>
									<Stack direction="column" spacing={1}>
										<span className={Styles.offerTitle}>
											{userOffer.title.length >= 25
												? userOffer.title.substring(0, 25) + '...'
												: userOffer.title}
										</span>
										<Stack direction="row">
											<Image src={BlackStarSVG} width={20} height={20} alt="" />
											<span className={Styles.offerRating}>0 (0 notes)</span>
										</Stack>
										<Stack direction="row" spacing={1}>
											<span
												className={`${Styles.offerPrice} ${
													userOffer.solder_value !== null && Styles.oldPrice
												}`}
											>
												{userOffer.price + ' DH'}
											</span>
											<span className={Styles.solderPrice}>
												{userOffer.solder_value !== null ? newPrice + ' DH' : null}
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
	);
};

/*
	// {/*<Stack direction="column">
	// {/*<Stack justifyContent="center" alignItems="center" className={Styles.mobileFilterButton}>
	// {/*	<MobileOffersFilterButton
	// {/*		buttonText="Filtrer"
	// {/*		svgIcon={MobileFilterWhiteSVG}
	// {/*		textColor={color_code}
	// {/*		backgroundColor={bg_color_code}
	// {/*		border={border}
	// onClick={() => {}}
	// />
	// </Stack>
	// </Stack>
 */

export default StartYourShopContent;
