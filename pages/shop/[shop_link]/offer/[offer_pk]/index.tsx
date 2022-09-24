import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { default as ImageFuture } from 'next/future/image';
import Styles from '../../../../../styles/temp-offer/create/overview.module.sass';
import { Stack, ThemeProvider, ImageListItem, Box } from '@mui/material';
import { useRouter } from 'next/router';
import {
	DetailsOfferProductType,
	OfferGetRootProductInterface,
	OfferGetRootProductResponseType,
	OfferGetRootServiceInterface,
	OfferGetRootServiceResponseType,
	OfferProductPriceByType,
} from '../../../../../types/offer/offerTypes';
import Image from 'next/image';
import CreatorIlluSVG from '../../../../../public/assets/images/creator-illu.svg';
import CreatorBgIlluSVG from '../../../../../public/assets/images/creator-bg-illu.svg';
import CreatorIconSVG from '../../../../../public/assets/svgs/globalIcons/creator.svg';
import BlackStarSVG from '../../../../../public/assets/svgs/globalIcons/black-star.svg';
import GrayRatingSVG from '../../../../../public/assets/svgs/globalIcons/gray-rating.svg';
import DeliverySVG from '../../../../../public/assets/svgs/globalIcons/delivery-icon-white.svg';
import DeliveryDisabledSVG from '../../../../../public/assets/svgs/globalIcons/delivery-icon-gray.svg';
import ClickAndCollectSVG from '../../../../../public/assets/svgs/globalIcons/click-and-collect-icon-white.svg';
import ClickAndCollectDisabledSVG from '../../../../../public/assets/svgs/globalIcons/click-and-collect-icon-gray.svg';
import Chip from '@mui/material/Chip';
import {
	dayNames,
	getCategoriesDataArray,
	getColorsDataArray,
	getForWhomDataArray,
	getProductPriceByData,
	getSizesDataArray,
	monthNames,
} from '../../../../../utils/rawData';
import Link from 'next/link';
import { NOT_FOUND_404 } from '../../../../../utils/routes';
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Divider from '@mui/material/Divider';
import { OfferReadOnlyTheme } from '../../../../../utils/themes';
import { Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { defaultInstance } from '../../../../../utils/helpers';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import UserMainNavigationBar from '../../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../../../components/layouts/footer/customFooter';
import ReactCountryFlag from 'react-country-flag';
import CloseSVG from '../../../../../public/assets/svgs/navigationIcons/close.svg';

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

type PropsType = {
	pageProps: {
		data: OfferGetRootProductInterface | OfferGetRootServiceInterface;
	};
};

const Index: NextPage<PropsType> = (props: PropsType) => {
	const router = useRouter();
	const { data } = props.pageProps;
	// const { offer_pk } = router.query;
	const {
		title,
		description,
		offer_categories,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		details_offer,
		price,
		solder_type,
		solder_value,
		shop_name,
		deliveries,
		for_whom,
		creator_label,
		made_in_label,
	} = data as OfferGetRootProductInterface;
	const [availableImages, setAvailableImages] = useState<Array<string>>([]);
	const [selectedImage, setSelectedImage] = useState<string>(picture_1 ? picture_1 : '');
	const [categoriesListString, setCategoriesListString] = useState<Array<string>>([]);
	const [colorsListString, setColorsListString] = useState<Array<string>>([]);
	const [forWhomListString, setForWhomListString] = useState<Array<string>>([]);
	const [sizesListString, setSizesListString] = useState<Array<string>>([]);
	const [deliveriesListString, setDeliveriesListString] = useState<Array<deliveriesObj>>([]);
	const [newPrice, setNewPrice] = useState<number | null>(null);

	// Altroo solder can get improved if moved to getServerSideProps or api backend
	useEffect(() => {
		const availableImages: Array<string> = [];
		if (picture_1) {
			availableImages.push(picture_1);
			setSelectedImage(picture_1);
		}
		if (picture_2) {
			availableImages.push(picture_2);
		}
		if (picture_3) {
			availableImages.push(picture_3);
		}
		if (picture_4) {
			availableImages.push(picture_4);
		}
		// set images
		setAvailableImages(availableImages);

		let categoriesListString: Array<string> = [];
		if (offer_categories) {
			categoriesListString = getCategoriesDataArray(offer_categories);
			setCategoriesListString(categoriesListString);
		}
		// set colors
		let colorsArrayString: Array<string> = [];
		const { product_colors, product_sizes } = details_offer as DetailsOfferProductType;
		if (product_colors) {
			colorsArrayString = getColorsDataArray(product_colors);
			setColorsListString(colorsArrayString);
		}
		let forWhomArrayString: Array<string> = [];
		if (for_whom) {
			forWhomArrayString = getForWhomDataArray(for_whom);
			setForWhomListString(forWhomArrayString);
		}
		let sizesArrayString: Array<string> = [];
		if (product_sizes) {
			sizesArrayString = getSizesDataArray(product_sizes);
			setSizesListString(sizesArrayString);
		}
		const deliveriesObjList: Array<deliveriesObj> = [];
		if (deliveries) {
			deliveries.map((delivery) => {
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
		if (price) {
			if (solder_type !== null && solder_type && solder_value !== null && solder_value) {
				if (solder_type === 'F') {
					setNewPrice((price as number) - solder_value);
				} else if (solder_type === 'P') {
					setNewPrice((price as number) - ((price as number) * solder_value) / 100);
				}
			}
		}
	}, [
		deliveries,
		details_offer,
		for_whom,
		offer_categories,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		price,
		solder_type,
		solder_value,
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

	const customTheme = OfferReadOnlyTheme();
	return (
		<ThemeProvider theme={customTheme}>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<Box className={Styles.pageWrapper}>
						<Stack direction="row" spacing={10} className={Styles.imagesWrapper} justifyContent="center">
							{/* DESKTOP Only */}
							<Stack direction="column" spacing={5} sx={{maxWidth: '55%'}} className={Styles.desktopOnly}>
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
															alt=""
															loading="lazy"
															decoding="async"
														/>
													) : null}
												</ImageListItem>
											))}
									</Stack>
									{selectedImage ? (
										<Box className={Styles.mainImageWrapper}>
											<ImageFuture
												className={Styles.selectedImage}
												src={selectedImage}
												unoptimized={true}
												width={500}
												height={500}
												sizes="100vw"
												alt=""
												loading="lazy"
												decoding="async"
											/>
											{creator_label && (
												<ImageFuture
													className={Styles.creatorImageTag}
													src={CreatorIconSVG}
													alt="creator"
													width="0"
													height="0"
													sizes="100vw"
												/>
											)}
										</Box>
									) : null}
								</Stack>
								{/* Desktop creator banner goes here */}
								{creator_label && (
									<Box
										sx={{
											background: `url(${CreatorBgIlluSVG.src}) center center no-repeat scroll #0D070B`,
											msFilter: `progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${CreatorBgIlluSVG.src}', 
										sizingMethod='scale')`,
											backgroundSize: 'contain',
										}}
										className={Styles.creatorBannerWrapper}
									>
										<Stack direction="column" spacing={4}>
											<Stack direction="column" spacing={2}>
												<ImageFuture
													className={Styles.creatorImage}
													src={CreatorIlluSVG}
													alt="creator"
													width="105"
													height="56"
													sizes="100vw"
												/>
												<span className={Styles.creatorText}>
													Parce que soutenir l’économie locale est une des valeurs chères à notre cœur, Qaryb a créé un
													label pour permettre aux créateurs de notre pays d’être valorisé.
												</span>
											</Stack>
										</Stack>
									</Box>
								)}
								{noCommentsAvailableContent()}
							</Stack>
							{/* Mobile Only */}
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
														<Box className={Styles.mainImageWrapper}>
															<ImageFuture
																className={Styles.selectedImage}
																src={image}
																unoptimized={true}
																width={365}
																height={240}
																sizes="100vw"
																alt=""
															/>
															{creator_label && (
																<ImageFuture
																	className={Styles.creatorImageTag}
																	src={CreatorIconSVG}
																	alt="creator"
																	width="0"
																	height="0"
																	sizes="100vw"
																/>
															)}
														</Box>
													</SwiperSlide>
												);
											})}
									</Swiper>
								</>
							</div>
							<Stack direction="column" spacing={1} className={Styles.offerWrapper}>
								<Stack direction="column" spacing={4}>
									<Stack direction="column" spacing={2}>
										<Stack direction="column">
											<h1 className={Styles.title}>{title}</h1>
											<Stack direction="row">
												<Image src={BlackStarSVG} width={20} height={20} alt="" />
												<span className={Styles.rating}>0 (0 notes)</span>
											</Stack>
											<Link
												href={`${router.asPath.split('/offer')[0]}`}
												passHref
												prefetch={false}
												target="_blank"
												rel="noreferrer"
											>
												<a target="_blank" rel="noreferrer">
													<span className={Styles.shopName}>{shop_name}</span>
												</a>
											</Link>
										</Stack>
										<Stack direction="column" spacing={1}>
											<Stack direction="row" flexWrap="wrap" gap={1}>
												{categoriesListString.map((category, index) => {
													return <Chip key={index} label={category} variant="filled" className={Styles.chip} />;
												})}
											</Stack>
											{creator_label && made_in_label && (
												<Stack direction="row" spacing={1} alignItems="center">
													<ReactCountryFlag
														svg
														aria-label={made_in_label.name}
														className={Styles.madeInFlag}
														countryCode={made_in_label.code}
													/>
													<span className={Styles.madeInSpan}>Fabriqué au {made_in_label.name}</span>
												</Stack>
											)}
										</Stack>
									</Stack>
									<Stack direction="column" spacing={2} className={Styles.descriptionWrapper}>
										<Stack direction="column" spacing={1}>
											<span className={Styles.descriptionTitle}>Description</span>
											<p className={Styles.descriptionBody}>{description}</p>
										</Stack>
										<Stack direction="column" spacing={1}>
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
									</Stack>
									<Stack direction="column" className={Styles.priceWrapper}>
										<Stack direction="row" spacing={1}>
											<span className={`${Styles.price} ${solder_value !== null && Styles.oldPrice}`}>
												{price + ' DH'}
											</span>
											<span className={Styles.solderPrice}>{solder_value !== null ? newPrice + ' DH' : null}</span>
										</Stack>
										<Stack direction="row" justifyContent="space-between">
											<span className={Styles.priceBy}>
												par {getProductPriceByData(details_offer.product_price_by as OfferProductPriceByType)}
											</span>
											<span className={Styles.quantity}>{details_offer.product_quantity} restant</span>
										</Stack>
									</Stack>
								</Stack>
								<Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
									<div className={`${Styles.primaryButtonWrapper} ${Styles.primaryButton}`}>
										<PrimaryButton buttonText="Ajouter au panier" active={true} type="submit" />
									</div>
									<Box className={Styles.clickAnddeliveriesWrapper}>
										<Stack
											direction="column"
											divider={<Divider orientation="horizontal" flexItem className={Styles.divider} />}
										>
											{details_offer.product_address ? (
												<Stack
													direction="row"
													justifyContent="space-between"
													className={Styles.deliveryRow}
													alignItems="center"
												>
													<Stack direction="row" alignItems="center">
														<ImageFuture src={ClickAndCollectSVG} width={40} height={40} alt="" />
														<Stack direction="column">
															<span className={Styles.deliveriesTitle}>Click & collect</span>
															<span className={Styles.deliveryDetails}>Dès demain</span>
															<span className={Styles.deliveryDetails}>{details_offer.product_address}</span>
														</Stack>
													</Stack>
													<span className={Styles.deliveryPrice}>Gratuite</span>
												</Stack>
											) : (
												<Stack
													direction="row"
													justifyContent="space-between"
													className={Styles.deliveryNotFoundRow}
													alignItems="center"
												>
													<Stack direction="row" alignItems="center">
														<ImageFuture src={ClickAndCollectDisabledSVG} width={40} height={40} alt="" />
														<Stack direction="column">
															<span className={Styles.deliveriesTitleNotFound}>Click & collect</span>
															<span className={Styles.deliveryDetailsNotFound}>Non disponible</span>
														</Stack>
													</Stack>
												</Stack>
											)}
											{deliveriesListString.length > 0 ? (
												deliveriesListString.map((delivery, index) => {
													return (
														<Stack
															key={index}
															direction="row"
															justifyContent="space-between"
															className={Styles.deliveryRow}
															alignItems="center"
														>
															<Stack direction="row" alignItems="center">
																<ImageFuture src={DeliverySVG} width={40} height={40} alt="" />
																<Stack direction="column">
																	<span className={Styles.deliveriesTitle}>
																		{delivery.all_cities
																			? 'Tout le Maroc'
																			: delivery.delivery_city?.split(',').join(', ')}
																	</span>
																	<span className={Styles.deliveryDetails}>
																		{getDate(parseInt(delivery.delivery_days as string))}
																	</span>
																</Stack>
															</Stack>
															<span className={Styles.deliveryPrice}>
																{delivery.delivery_price === '0' ? 'Gratuite' : delivery.delivery_price + 'DH'}
															</span>
														</Stack>
													);
												})
											) : (
												<Stack
													direction="row"
													justifyContent="space-between"
													className={Styles.deliveryNotFoundRow}
													alignItems="center"
												>
													<Stack direction="row" alignItems="center">
														<ImageFuture src={DeliveryDisabledSVG} width={40} height={40} alt="" />
														<Stack direction="column">
															<span className={Styles.deliveriesTitleNotFound}>Livraison</span>
															<span className={Styles.deliveryDetailsNotFound}>Non disponible</span>
														</Stack>
													</Stack>
												</Stack>
											)}
										</Stack>
									</Box>
								</Stack>
								<Stack direction="column" spacing={3} className={Styles.mobileOnly}>
									<Divider orientation="horizontal" flexItem className={Styles.divider} />
									{/* mobile creator banner goes here */}
									{creator_label && (
										<Box
											sx={{
												background: `url(${CreatorBgIlluSVG.src}) center center no-repeat scroll #0D070B`,
												msFilter: `progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${CreatorBgIlluSVG.src}', 
										sizingMethod='scale')`,
												backgroundSize: 'contain',
											}}
											className={Styles.creatorBannerWrapper}
										>
											<Stack direction="column" spacing={4}>
												<Stack direction="column" spacing={2}>
													<ImageFuture
														className={Styles.creatorImage}
														src={CreatorIlluSVG}
														alt=""
														width="105"
														height="56"
														sizes="100vw"
													/>
													<span className={Styles.creatorText}>
														Parce que soutenir l’économie locale est une des valeurs chères à notre cœur, Qaryb a créé
														un label pour permettre aux créateurs de notre pays d’être valorisé.
													</span>
												</Stack>
											</Stack>
										</Box>
									)}
									{noCommentsAvailableContent()}
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</main>
				<CustomFooter />
			</Stack>
		</ThemeProvider>
	);
};

// export async function getStaticPaths() {
// 	return {
// 		// false : return 404 if id requested isn't found in paths list of params
// 		// true : generates a missing page by most visited ones.
// 		// 'blocking': will not return 404 if next can't find the page immediately
// 		fallback: false,
// 		paths: [
// 			{
// 				params: {
// 					offer_pk: '44',
// 				},
// 			},
// 			{
// 				params: {
// 					offer_pk: '38',
// 				},
// 			},
// 			{
// 				params: {
// 					offer_pk: '25',
// 				},
// 			},
// 			{
// 				params: {
// 					offer_pk: '26',
// 				},
// 			},
// 		],
// 	};
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/${context.params?.shop_link}/${context.params?.offer_pk}/`;
	try {
		const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL}`;
		const instance = defaultInstance(base_url);

		const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = await getApi(url, instance);
		if (response.status === 200) {
			return {
				props: {
					data: response.data,
				},
			};
		}
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
			props: {},
		};
	}
}

export default Index;
