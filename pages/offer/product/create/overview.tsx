import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { default as ImageFuture } from 'next/future/image';
import Styles from '../../../../styles/offer/create/overview.module.sass';
import DesktopPublishEditNavbar from '../../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import { DropDownActionType } from '../../../../types/ui/uiTypes';
import EditGraySVG from '../../../../public/assets/svgs/globalIcons/edit-gray.svg';
import PinGraySVG from '../../../../public/assets/svgs/globalIcons/pin-gray.svg';
import SolderGraySVG from '../../../../public/assets/svgs/globalIcons/solder-gray.svg';
import PromoRefGraySVG from '../../../../public/assets/svgs/globalIcons/promo-ref-gray.svg';
import DuplicateGraySVG from '../../../../public/assets/svgs/globalIcons/duplicate-gray.svg';
import CloseBlackSVG from '../../../../public/assets/svgs/globalIcons/close-black.svg';
import { Stack, ThemeProvider, ImageListItem, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { useRouter } from 'next/router';
import { getShopObj, getUserLocalOffer } from '../../../../store/selectors';
import {
	OfferForWhomType,
	OfferProductColors,
	OfferProductPriceByType,
	OfferProductSizes,
	UserLocalOfferType,
} from '../../../../types/offer/offerTypes';
import { cookiesPoster } from '../../../../store/services/_init/_initAPI';
import Image from 'next/image';
import BlackStarSVG from '../../../../public/assets/svgs/globalIcons/black-star.svg';
import GrayRatingSVG from '../../../../public/assets/svgs/globalIcons/gray-rating.svg';
import DeliverySVG from '../../../../public/assets/svgs/globalIcons/delivery-icon-white.svg';
import ClickAndCollectSVG from '../../../../public/assets/svgs/globalIcons/click-and-collect-icon-white.svg';
import Chip from '@mui/material/Chip';
import {
	dayNames,
	getCategoriesDataArray,
	getColorsDataArray,
	getForWhomDataArray,
	getProductPriceByData,
	getSizesDataArray,
	monthNames,
} from '../../../../utils/rawData';
import Link from 'next/link';
import { SHOP_EDIT_INDEX } from '../../../../utils/routes';
import SharedStyles from '../../../../styles/shop/create/shopCreateShared.module.sass';
import PrimaryButton from '../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Divider from '@mui/material/Divider';
import { OfferThumbnailsTheme } from '../../../../utils/themes';
import { Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';

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

const Overview: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		title,
		forWhom,
		clickAndCollect,
		categoriesList,
		deliveries,
		description,
		prix,
		quantity,
		prix_par,
		colors,
		sizes,
		pictures,
		// picture_1,
		// picture_2,
		// picture_3,
		// picture_4,
	} = useAppSelector<UserLocalOfferType>(getUserLocalOffer);
	const { shop_name, bg_color_code, color_code, border } = useAppSelector(getShopObj);
	const [availableImages, setAvailableImages] = useState<Array<string>>([]);
	const [selectedImage, setSelectedImage] = useState<string>(pictures[0].dataURL as string);
	const [categoriesListString, setCategoriesListString] = useState<Array<string>>([]);
	const [colorsListString, setColorsListString] = useState<Array<string>>([]);
	const [forWhomListString, setForWhomListString] = useState<Array<string>>([]);
	const [sizesListString, setSizesListString] = useState<Array<string>>([]);
	const [deliveriesListString, setDeliveriesListString] = useState<Array<deliveriesObj>>([]);
	const navigateToEditePage = () => {};
	const deleteOffer = () => {};

	const dropDownActions: DropDownActionType = [
		{
			icon: EditGraySVG,
			text: 'Modifier',
			onClick: navigateToEditePage,
		},
		{
			icon: PinGraySVG,
			text: 'Épingler l’offre',
			disabled: true,
		},
		{
			icon: SolderGraySVG,
			text: 'Référencer l’offre',
			disabled: true,
		},
		{
			icon: PromoRefGraySVG,
			text: 'Solder cette offre',
			disabled: true,
		},
		{
			icon: PromoRefGraySVG,
			text: 'Promouvoir',
			disabled: true,
		},
		{
			icon: DuplicateGraySVG,
			text: 'Duppliquer',
			disabled: true,
		},
		{
			icon: CloseBlackSVG,
			text: 'Supprimer',
			onClick: deleteOffer,
		},
	];

	useEffect(() => {
		const availableImages: Array<string> = [];
		if (pictures.length >= 1){
			pictures.map((picture) => {
				if (picture.dataURL) {
					availableImages.push(picture.dataURL);
				}

			})
		}
		// if (picture_2) {
		// 	availableImages.push(picture_2);
		// }
		// if (picture_3) {
		// 	availableImages.push(picture_3);
		// }
		// if (picture_4) {
		// 	availableImages.push(picture_4);
		// }
		// set images
		setAvailableImages(availableImages);
		// set categories
		const categoriesListString: Array<string> = getCategoriesDataArray(categoriesList);
		setCategoriesListString(categoriesListString);
		// set colors
		let colorsArrayString: Array<string> = [];
		if (colors) {
			colorsArrayString = getColorsDataArray(colors.split(',') as Array<OfferProductColors>);
			setColorsListString(colorsArrayString);
		}
		let forWhomArrayString: Array<string> = [];
		if (forWhom) {
			forWhomArrayString = getForWhomDataArray(forWhom.split(',') as Array<OfferForWhomType>);
			setForWhomListString(forWhomArrayString);
		}
		let sizesArrayString: Array<string> = [];
		if (sizes) {
			sizesArrayString = getSizesDataArray(sizes.split(',') as Array<OfferProductSizes>);
			setSizesListString(sizesArrayString);
		}
		const deliveriesObjList: Array<deliveriesObj> = [];
		if (deliveries) {
			if (deliveries.delivery_city_1 !== '' || deliveries.all_cities_1 !== false) {
				const deliveryObj: deliveriesObj = {
					delivery_city: null,
					delivery_days: null,
					delivery_price: null,
					all_cities: null,
				};
				deliveryObj.delivery_city = deliveries.delivery_city_1;
				deliveryObj.all_cities = deliveries.all_cities_1;
				deliveryObj.delivery_price = deliveries.delivery_price_1;
				deliveryObj.delivery_days = deliveries.delivery_days_1;
				deliveriesObjList.push(deliveryObj);
			}
			if (deliveries.delivery_city_2 !== '' || deliveries.all_cities_2 !== false) {
				const deliveryObj: deliveriesObj = {
					delivery_city: null,
					delivery_days: null,
					delivery_price: null,
					all_cities: null,
				};
				deliveryObj.delivery_city = deliveries.delivery_city_2;
				deliveryObj.all_cities = deliveries.all_cities_2;
				deliveryObj.delivery_price = deliveries.delivery_price_2;
				deliveryObj.delivery_days = deliveries.delivery_days_2;
				deliveriesObjList.push(deliveryObj);
			}
			if (deliveries.delivery_city_3 !== '' || deliveries.all_cities_3 !== false) {
				const deliveryObj: deliveriesObj = {
					delivery_city: null,
					delivery_days: null,
					delivery_price: null,
					all_cities: null,
				};
				deliveryObj.delivery_city = deliveries.delivery_city_3;
				deliveryObj.all_cities = deliveries.all_cities_3;
				deliveryObj.delivery_price = deliveries.delivery_price_3;
				deliveryObj.delivery_days = deliveries.delivery_days_3;
				deliveriesObjList.push(deliveryObj);
			}
			setDeliveriesListString(deliveriesObjList);
		}
	}, [categoriesList, colors, deliveries, forWhom, pictures, sizes]);

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
				{/* both desktop and mobile */}
				<DesktopPublishEditNavbar
					dropDownText="Modifier"
					actions={dropDownActions}
					onClick={() => {
						console.log('Clicked');
					}}
					menuID="desktop-validate-menu"
					buttonID="desktop-validate-menu-btn"
					buttonTitle="Valider"
				/>
				<Box className={Styles.pageWrapper}>
					<Stack direction="row" spacing={10} className={Styles.imagesWrapper}>
						{/* DESKTOP Only */}
						<Stack direction="column" spacing={3} className={Styles.desktopOnly}>
							<Stack direction="row" spacing={3}>
								<Stack direction="column" spacing={1.8}>
									{availableImages.length > 0 &&
										availableImages.map((image, index) => (
											<ImageListItem key={index}>
												{image ? (
													<ImageFuture
														className={`${Styles.thumbnails} ${
															image === selectedImage ? Styles.selectedThumbnail : null
														}`}
														unoptimized={true}
														src={image}
														width={80}
														height={80}
														onClick={() => showThumbnail(image)}
													/>
												) : null}
											</ImageListItem>
										))}
								</Stack>
								<ImageFuture
									className={Styles.selectedImage}
									src={selectedImage}
									unoptimized={true}
									width={500}
									height={500}
								/>
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
									{availableImages.length > 0 && availableImages.map((image, index) => {
										return (
											<SwiperSlide key={index}>
												<ImageFuture
													className={Styles.selectedImage}
													src={image}
													unoptimized={true}
													width={365}
													height={240}
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
									<span className={Styles.shopName}>{shop_name}</span>
								</a>
							</Link>
							<Stack direction="row" flexWrap="wrap" gap={1}>
								{categoriesListString.map((category, index) => {
									return (
										<Chip key={index} label={category} variant="filled" className={Styles.chip} />
									);
								})}
							</Stack>
							<Stack direction="column" spacing={1} className={Styles.descriptionWrapper}>
								<span className={Styles.descriptionTitle}>Description</span>
								<p className={Styles.descriptionBody}>{description}</p>
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
								<span className={Styles.price}>{prix} DH</span>
								<Stack direction="row" justifyContent="space-between">
									<span className={Styles.priceBy}>
										par {getProductPriceByData(prix_par as OfferProductPriceByType)}
									</span>
									<span className={Styles.quantity}>{quantity} restant</span>
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
									divider={<Divider orientation="horizontal" flexItem className={Styles.divider} />}
								>
									{clickAndCollect ? (
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
													<span className={Styles.deliveryDetails}>
														{clickAndCollect.address_name}
													</span>
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
																		: delivery.delivery_city?.split(',').join(', ')}
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
												)}) : null}
								</Stack>
							</Box>
							<Stack direction="column" spacing={3} className={Styles.mobileOnly}>
								<Divider orientation="horizontal" flexItem className={Styles.divider} />
								{noCommentsAvailableContent()}
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</main>
		</ThemeProvider>
	);
};

export default Overview;
