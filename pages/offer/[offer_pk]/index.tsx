import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { default as ImageFuture } from 'next/future/image';
import Styles from '../../../styles/offer/create/overview.module.sass';
// import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
// import { DropDownActionType } from '../../../types/ui/uiTypes';
// import EditGraySVG from '../../../public/assets/svgs/globalIcons/edit-gray.svg';
// import PinGraySVG from '../../../public/assets/svgs/globalIcons/pin-gray.svg';
// import SolderGraySVG from '../../../public/assets/svgs/globalIcons/solder-gray.svg';
// import PromoRefGraySVG from '../../../public/assets/svgs/globalIcons/promo-ref-gray.svg';
// import DuplicateGraySVG from '../../../public/assets/svgs/globalIcons/duplicate-gray.svg';
// import CloseBlackSVG from '../../../public/assets/svgs/globalIcons/close-black.svg';
import { Stack, ThemeProvider, ImageListItem, Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useRouter } from 'next/router';
import {
	getShopBgColorCode,
	getShopBorder,
	getShopColorCode,
	// getShopName,
	// getUserLocalOffer,
	// getSelectedOfferObj,
	getSelectedOfferPk,
	getSelectedOfferTitle,
	getSelectedOfferOfferType,
	getSelectedOfferOfferCategories,
	getSelectedOfferShopName,
	getSelectedOfferPicture1,
	getSelectedOfferPicture2,
	getSelectedOfferPicture3,
	getSelectedOfferPicture4,
	getSelectedOfferPicture1Thumb,
	getSelectedOfferPicture3Thumb,
	getSelectedOfferPicture2Thumb,
	getSelectedOfferPicture4Thumb,
	getSelectedOfferDescription,
	getSelectedOfferForWhom,
	getSelectedOfferPrice,
	getSelectedOfferPrixPar,
	getSelectedOfferQuantity,
	getSelectedOfferLongitude,
	getSelectedOfferLatitude,
	getSelectedOfferAddress,
	getSelectedOfferColors,
	getSelectedOfferSizes,
	getSelectedOfferDeliveries,
	getSelectedOfferPinned,
	getSelectedOfferSolderType,
	getSelectedOfferSolderValue,
} from '../../../store/selectors';
import {
	// DeliveriesFlatResponseType,
	// OfferCategoriesArray,
	// OfferCategoriesType,
	// OfferForWhomType,
	// OfferGetRootProductInterface,
	// OfferGetRootServiceInterface,
	// OfferProductColors,
	OfferProductPriceByType,
	// OfferProductSizes,
	// UserLocalOfferType,
} from '../../../types/offer/offerTypes';
// import { cookiesFetcher, cookiesPoster } from '../../../store/services/_init/_initAPI';
import Image from 'next/image';
import BlackStarSVG from '../../../public/assets/svgs/globalIcons/black-star.svg';
import GrayRatingSVG from '../../../public/assets/svgs/globalIcons/gray-rating.svg';
import DeliverySVG from '../../../public/assets/svgs/globalIcons/delivery-icon-white.svg';
import ClickAndCollectSVG from '../../../public/assets/svgs/globalIcons/click-and-collect-icon-white.svg';
import Chip from '@mui/material/Chip';
import {
	dayNames,
	getCategoriesDataArray,
	getColorsDataArray,
	getForWhomDataArray,
	getProductPriceByData,
	getSizesDataArray,
	monthNames,
} from '../../../utils/rawData';
import Link from 'next/link';
import { SHOP_EDIT_INDEX } from '../../../utils/routes';
import SharedStyles from '../../../styles/shop/create/shopCreateShared.module.sass';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Divider from '@mui/material/Divider';
import { OfferThumbnailsTheme } from '../../../utils/themes';
import { Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { offerGetMyOffersFirstPageAction, offerGetRootAction } from '../../../store/actions/offer/offerActions';
// import prix from '../product/create/prix';
// import description from '../product/create/description';
// import categoriesList from '../../../components/groupedComponents/offer/categoriesList/categoriesList';
import DesktopOfferDetailTopNavBar from '../../../components/desktop/navbars/desktopOfferDetailTopNavBar/desktopOfferDetailTopNavBar';
import DesktopTopSaveShareNavBar from '../../../components/desktop/navbars/desktopTopSaveShareNavBar/desktopTopSaveShareNavBar';
// import { END } from 'redux-saga';
import { wrapper } from '../../../store/store';
// import { AppTokensCookieType, NewShopCookieType } from '../../../types/_init/_initTypes';
// import {
// 	initAppAction,
// 	initAppCookieTokensAction,
// 	initNewShopBorderIconAction,
// } from '../../../store/actions/_init/_initActions';
// import { placesGetCitiesAction } from '../../../store/actions/places/placesActions';
// import { loadNewAddedShopAction, shopGetRootAction } from '../../../store/actions/shop/shopActions';

const noCommentsAvailableContent = () => {
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				className={Styles.noCommentsAvailableContent}
			>
				<span className={Styles.noAvailableComments}>Pas encore de commentaires</span>
				<span>
					<Stack direction="row">
						<Image src={GrayRatingSVG} width={20} height={20} alt="" />
						<Image src={GrayRatingSVG} width={20} height={20} alt="" />
						<Image src={GrayRatingSVG} width={20} height={20} alt="" />
						<Image src={GrayRatingSVG} width={20} height={20} alt="" />
						<Image src={GrayRatingSVG} width={20} height={20} alt="" />
						<span className={Styles.noAvailableRatings}>(0 notes)</span>
					</Stack>
				</span>
			</Stack>
			<p className={Styles.noComments}>Effectuez votre première vente pour obtenir un commentaire</p>
		</>
	);
};

type deliveriesObj = {
	delivery_city: string | null;
	all_cities: boolean | null;
	delivery_price: string | null;
	delivery_days: string | null;
};

// type PropsType = {
// 	selectedOffer: OfferGetRootProductInterface | OfferGetRootServiceInterface;
// };

const Index: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { offer_pk } = router.query;

	const pk = useAppSelector(getSelectedOfferPk);
	const title = useAppSelector(getSelectedOfferTitle);
	const offerType = useAppSelector(getSelectedOfferOfferType);
	const offerCategories = useAppSelector(getSelectedOfferOfferCategories);
	const offerShopName = useAppSelector(getSelectedOfferShopName);
	const offerPicture1 = useAppSelector(getSelectedOfferPicture1);
	const offerPicture2 = useAppSelector(getSelectedOfferPicture2);
	const offerPicture3 = useAppSelector(getSelectedOfferPicture3);
	const offerPicture4 = useAppSelector(getSelectedOfferPicture4);
	const offerPicture1Thumb = useAppSelector(getSelectedOfferPicture1Thumb);
	const offerPicture2Thumb = useAppSelector(getSelectedOfferPicture2Thumb);
	const offerPicture3Thumb = useAppSelector(getSelectedOfferPicture3Thumb);
	const offerPicture4Thumb = useAppSelector(getSelectedOfferPicture4Thumb);
	const offerDescription = useAppSelector(getSelectedOfferDescription);
	const offerForWhom = useAppSelector(getSelectedOfferForWhom);
	const offerPrice = useAppSelector(getSelectedOfferPrice);
	const offerPrixPar = useAppSelector(getSelectedOfferPrixPar);
	const offerQuantity = useAppSelector(getSelectedOfferQuantity);
	// const offerLongitude = useAppSelector(getSelectedOfferLongitude);
	// const offerLatitude = useAppSelector(getSelectedOfferLatitude);
	const offerAddress = useAppSelector(getSelectedOfferAddress);
	const offerColors = useAppSelector(getSelectedOfferColors);
	const offerSizes = useAppSelector(getSelectedOfferSizes);
	const offerDeliveries = useAppSelector(getSelectedOfferDeliveries);
	const offerPinned = useAppSelector(getSelectedOfferPinned);
	const offerSolderType = useAppSelector(getSelectedOfferSolderType);
	const offerSolderValue = useAppSelector(getSelectedOfferSolderValue);

	const bg_color_code = useAppSelector(getShopBgColorCode);
	const color_code = useAppSelector(getShopColorCode);
	const border = useAppSelector(getShopBorder);
	const [availableImages, setAvailableImages] = useState<Array<string>>([]);
	const [availableThumbs, setAvailableThumbs] = useState<Array<string>>([]);
	const [selectedImage, setSelectedImage] = useState<string>(offerPicture1 ? offerPicture1 : '');
	const [categoriesListString, setCategoriesListString] = useState<Array<string>>([]);
	const [colorsListString, setColorsListString] = useState<Array<string>>([]);
	const [forWhomListString, setForWhomListString] = useState<Array<string>>([]);
	const [sizesListString, setSizesListString] = useState<Array<string>>([]);
	const [deliveriesListString, setDeliveriesListString] = useState<Array<deliveriesObj>>([]);
	const [newPrice, setNewPrice] = useState<number | null>(null);
	// const [getApiCalled, setGetApiCalled] = useState<boolean>(false);
	const navigateToEditePage = () => {};
	const deleteOffer = () => {};

	// const dropDownActions: DropDownActionType = [
	// 	{
	// 		icon: EditGraySVG,
	// 		text: 'Modifier',
	// 		onClick: navigateToEditePage,
	// 	},
	// 	{
	// 		icon: PinGraySVG,
	// 		text: 'Épingler l’offre',
	// 		disabled: true,
	// 	},
	// 	{
	// 		icon: SolderGraySVG,
	// 		text: 'Référencer l’offre',
	// 		disabled: true,
	// 	},
	// 	{
	// 		icon: PromoRefGraySVG,
	// 		text: 'Solder cette offre',
	// 		disabled: true,
	// 	},
	// 	{
	// 		icon: PromoRefGraySVG,
	// 		text: 'Promouvoir',
	// 		disabled: true,
	// 	},
	// 	{
	// 		icon: DuplicateGraySVG,
	// 		text: 'Duppliquer',
	// 		disabled: true,
	// 	},
	// 	{
	// 		icon: CloseBlackSVG,
	// 		text: 'Supprimer',
	// 		onClick: deleteOffer,
	// 	},
	// ];

	useEffect(() => {
		const availableImages: Array<string> = [];
		if (offerPicture1) {
			availableImages.push(offerPicture1);
			setSelectedImage(offerPicture1);
		}
		if (offerPicture2) {
			availableImages.push(offerPicture2);
		}
		if (offerPicture3) {
			availableImages.push(offerPicture3);
		}
		if (offerPicture4) {
			availableImages.push(offerPicture4);
		}
		const availableThumbs: Array<string> = [];
		if (offerPicture1Thumb) {
			availableThumbs.push(offerPicture1Thumb);
		}
		if (offerPicture2Thumb) {
			availableThumbs.push(offerPicture2Thumb);
		}
		if (offerPicture3Thumb) {
			availableThumbs.push(offerPicture3Thumb);
		}
		if (offerPicture4Thumb) {
			availableThumbs.push(offerPicture4Thumb);
		}
		setAvailableThumbs(availableThumbs);
		// set images
		setAvailableImages(availableImages);

		let categoriesListString: Array<string> = [];
		if (offerCategories) {
			categoriesListString = getCategoriesDataArray(offerCategories);
			setCategoriesListString(categoriesListString);
		}
		// set colors
		let colorsArrayString: Array<string> = [];
		if (offerColors) {
			colorsArrayString = getColorsDataArray(offerColors);
			setColorsListString(colorsArrayString);
		}
		let forWhomArrayString: Array<string> = [];
		if (offerForWhom) {
			forWhomArrayString = getForWhomDataArray(offerForWhom);
			setForWhomListString(forWhomArrayString);
		}
		let sizesArrayString: Array<string> = [];
		if (offerSizes) {
			sizesArrayString = getSizesDataArray(offerSizes);
			setSizesListString(sizesArrayString);
		}
		const deliveriesObjList: Array<deliveriesObj> = [];
		if (offerDeliveries) {
			offerDeliveries.map((delivery) => {
				const deliveryObj: deliveriesObj = {
					delivery_city: null,
					delivery_days: null,
					delivery_price: null,
					all_cities: null,
				};
				deliveryObj.delivery_city = delivery.delivery_city.join(',');
				deliveryObj.all_cities = delivery.all_cities;
				deliveryObj.delivery_price = delivery.delivery_price.toString();
				deliveryObj.delivery_days = delivery.delivery_days.toString();
				deliveriesObjList.push(deliveryObj);
			});
			setDeliveriesListString(deliveriesObjList);
		}
		if (offerPrice) {
			if (offerSolderType !== null && offerSolderType && offerSolderValue !== null && offerSolderValue) {
				if (offerSolderType === 'F') {
					setNewPrice(parseFloat(offerPrice) - offerSolderValue);
				} else if (offerSolderType === 'P') {
					setNewPrice(parseFloat(offerPrice) - (parseFloat(offerPrice) * offerSolderValue) / 100);
				}
			}
		}
		// if (offer_pk && !getApiCalled) {
		// 	dispatch(offerGetRootAction(parseInt(offer_pk as string)));
		// 	setGetApiCalled(true);
		// }
	}, [
		offerCategories,
		offerColors,
		offerDeliveries,
		offerForWhom,
		offerPicture1,
		offerPicture1Thumb,
		offerPicture2,
		offerPicture2Thumb,
		offerPicture3,
		offerPicture3Thumb,
		offerPicture4,
		offerPicture4Thumb,
		offerPrice,
		offerSizes,
		offerSolderType,
		offerSolderValue,
	]);

	const showThumbnail = (src: string) => {
		setSelectedImage(src);
	};

	const getDate = (days: number) => {
		const startDate = new Date(Date.now());
		const endDate = new Date(Date.now());
		endDate.setDate(endDate.getDate() + days + 1);
		const startMonth = monthNames[startDate.getMonth()];
		const startDay = dayNames[startDate.getDay()];
		const endMonth = monthNames[endDate.getMonth()];
		const endDay = dayNames[endDate.getDay()];
		return `${startDay} ${startDate.getDate()} ${startMonth} - ${endDay} ${endDate.getDate()} ${endMonth}`;
	};

	const customTheme = OfferThumbnailsTheme(bg_color_code as string, color_code as string, border as string);
	return (
		<ThemeProvider theme={customTheme}>
			<main className={Styles.main}>
				{/* /!*both desktop and mobile *!/*/}
				{/*<DesktopPublishEditNavbar*/}
				{/*	dropDownText="Modifier"*/}
				{/*	actions={dropDownActions}*/}
				{/*	onClick={() => {*/}
				{/*		console.log('Clicked');*/}
				{/*	}}*/}
				{/*	menuID="desktop-validate-menu"*/}
				{/*	buttonID="desktop-validate-menu-btn"*/}
				{/*	buttonTitle="Valider"*/}
				{/*/>*/}
				<Container maxWidth="lg">
					<DesktopTopSaveShareNavBar onClickSave={() => {}} onClickShare={() => {}} onClickClose={() => {}} />
					<DesktopOfferDetailTopNavBar
						offer_pk={pk}
						epinglerActive={offerPinned}
						solderActive={newPrice !== null}
						referencerActive={false}
					/>
					<Box className={Styles.pageWrapper}>
						<Stack direction="row" spacing={10} className={Styles.imagesWrapper}>
							{/* DESKTOP Only */}
							<Stack direction="column" spacing={3} className={Styles.desktopOnly}>
								<Stack direction="row" spacing={3}>
									<Stack direction="column" spacing={1.8}>
										{availableThumbs.length > 0 &&
											availableThumbs.map((image, index) => (
												<ImageListItem key={index}>
													{image ? (
														<ImageFuture
															className={`${Styles.thumbnails} ${
																image === selectedImage
																	? Styles.selectedThumbnail
																	: null
															}`}
															unoptimized={true}
															src={image}
															width={80}
															height={80}
															onClick={() => showThumbnail(image)}
															alt=""
															loading="lazy"
															decoding="async"
														/>
													) : null}
												</ImageListItem>
											))}
									</Stack>
									{selectedImage ? (
										<ImageFuture
											className={Styles.selectedImage}
											src={selectedImage}
											unoptimized={true}
											width={500}
											height={500}
											alt=""
											loading="lazy"
											decoding="async"
										/>
									) : null}
								</Stack>
								{noCommentsAvailableContent()}
							</Stack>
							<div className={Styles.mobileOnly} style={{ display: 'block', marginLeft: '0' }}>
								<>
									<Swiper
										pagination={{
											clickable: true,
											enabled: true,
											bulletActiveClass: 'activekOfferBullet',
											clickableClass: 'paginationOfferBullet',
										}}
										modules={[Navigation, Pagination, Lazy]}
										scrollbar={{ enabled: false }}
										className={Styles.swiperSlide}
									>
										{availableImages.length > 0 &&
											availableImages.map((image, index) => {
												return (
													<SwiperSlide key={index}>
														<ImageFuture
															className={Styles.selectedImage}
															src={image}
															unoptimized={true}
															width={365}
															height={240}
															alt=""
														/>
													</SwiperSlide>
												);
											})}
									</Swiper>
								</>
							</div>
							<Stack direction="column" spacing={1} className={Styles.offerWrapper}>
								<h1 className={Styles.title}>{title}</h1>
								<Stack direction="row">
									<Image src={BlackStarSVG} width={20} height={20} alt="" />
									<span className={Styles.rating}>0 (0 notes)</span>
								</Stack>
								<Link href={SHOP_EDIT_INDEX} passHref prefetch={false} target="_blank" rel="noreferrer">
									<a target="_blank" rel="noreferrer">
										<span className={Styles.shopName}>{offerShopName}</span>
									</a>
								</Link>
								<Stack direction="row" flexWrap="wrap" gap={1}>
									{categoriesListString.map((category, index) => {
										return (
											<Chip
												key={index}
												label={category}
												variant="filled"
												className={Styles.chip}
											/>
										);
									})}
								</Stack>
								<Stack direction="column" spacing={1} className={Styles.descriptionWrapper}>
									<span className={Styles.descriptionTitle}>Description</span>
									<p className={Styles.descriptionBody}>{offerDescription}</p>
									{colorsListString.length > 0 ? (
										<p className={Styles.colorBody}>
											<span className={Styles.colorTitle}>Couleurs : </span>
											{colorsListString.join(', ')}
										</p>
									) : null}
									{sizesListString.length > 0 ? (
										<p className={Styles.sizesBody}>
											<span className={Styles.sizesTitle}>Taille : </span>
											{sizesListString.join(', ')}
										</p>
									) : null}
									{forWhomListString.length > 0 ? (
										<p className={Styles.forWhomBody}>
											<span className={Styles.forWhomTitle}>Pour : </span>
											{forWhomListString.join(',')}
										</p>
									) : null}
								</Stack>
								<Stack direction="column" className={Styles.priceWrapper}>
									<Stack direction="row" spacing={1}>
										<span
											className={`${Styles.price} ${
												offerSolderValue !== null && Styles.oldPrice
											}`}
										>
											{offerPrice + ' DH'}
										</span>
										<span className={Styles.solderPrice}>
											{offerSolderValue !== null ? newPrice + ' DH' : null}
										</span>
									</Stack>
									<Stack direction="row" justifyContent="space-between">
										<span className={Styles.priceBy}>
											par {getProductPriceByData(offerPrixPar as OfferProductPriceByType)}
										</span>
										<span className={Styles.quantity}>{offerQuantity} restant</span>
									</Stack>
								</Stack>
								<Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
									<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
										<PrimaryButton buttonText="Ajouter au panier" active={false} type="submit" />
									</div>
								</Stack>
								<Box className={Styles.clickAnddeliveriesWrapper}>
									<Stack
										direction="column"
										divider={
											<Divider orientation="horizontal" flexItem className={Styles.divider} />
										}
									>
										{offerAddress ? (
											<Stack
												direction="row"
												justifyContent="space-between"
												className={Styles.deliveryRow}
												alignItems="center"
											>
												<Stack direction="row" alignItems="center">
													<ImageFuture
														src={ClickAndCollectSVG}
														width={40}
														height={40}
														alt=""
														className={Styles.clickAndCollectSVG}
													/>
													<Stack direction="column">
														<span className={Styles.deliveriesTitle}>Click & collect</span>
														<span className={Styles.deliveryDetails}>Dès demain</span>
														<span className={Styles.deliveryDetails}>{offerAddress}</span>
													</Stack>
												</Stack>
												<span className={Styles.deliveryPrice}>Gratuite</span>
											</Stack>
										) : null}
										{deliveriesListString.length > 0
											? deliveriesListString.map((delivery, index) => {
													return (
														<Stack
															key={index}
															direction="row"
															justifyContent="space-between"
															className={Styles.deliveryRow}
															alignItems="center"
														>
															<Stack direction="row" alignItems="center">
																<ImageFuture
																	src={DeliverySVG}
																	width={40}
																	height={40}
																	alt=""
																	className={Styles.deliverySVG}
																/>
																<Stack direction="column">
																	<span className={Styles.deliveriesTitle}>
																		{delivery.all_cities
																			? 'Tout le Maroc'
																			: delivery.delivery_city
																					?.split(',')
																					.join(', ')}
																	</span>
																	<span className={Styles.deliveryDetails}>
																		{getDate(
																			parseInt(delivery.delivery_days as string),
																		)}
																	</span>
																</Stack>
															</Stack>
															<span className={Styles.deliveryPrice}>
																{delivery.delivery_price === '0'
																	? 'Gratuite'
																	: delivery.delivery_price + 'DH'}
															</span>
														</Stack>
													)})
											: null}
									</Stack>
								</Box>
								<Stack direction="column" spacing={3} className={Styles.mobileOnly}>
									<Divider orientation="horizontal" flexItem className={Styles.divider} />
									{noCommentsAvailableContent()}
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</Container>
			</main>
		</ThemeProvider>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	store.dispatch(offerGetRootAction(parseInt(context.params?.offer_pk as string)));
	// await store.sagaTask?.toPromise();
	return {
		props: {},
	};
});

export default Index;
