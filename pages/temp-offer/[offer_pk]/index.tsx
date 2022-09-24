import React, { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { default as ImageFuture } from 'next/future/image';
import Styles from '../../../styles/temp-offer/create/overview.module.sass';
import EditBlackSVG from '../../../public/assets/svgs/globalIcons/edit-black.svg';
import SolderEditActiveSVG from '../../../public/assets/svgs/globalIcons/solder-edit-active.svg';
import SolderEditInactiveSVG from '../../../public/assets/svgs/globalIcons/solder-edit-inactive.svg';
import EpinglerActiveSVG from '../../../public/assets/svgs/globalIcons/epingler-active.svg';
import EpinglerInactiveSVG from '../../../public/assets/svgs/globalIcons/epingler-inactive.svg';
import SupprimerSVG from '../../../public/assets/svgs/globalIcons/close-black.svg';
import { Stack, ThemeProvider, ImageListItem, Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useRouter } from 'next/router';
import {
	getLocalOfferTitle,
	getOfferOfferApi,
	getShopBgColorCode,
	getShopBorder,
	getShopColorCode,
} from '../../../store/selectors';
import {
	DeliveriesFlatResponseType,
	DetailsOfferProductType,
	OfferGetRootProductInterface,
	OfferGetRootProductResponseType,
	OfferGetRootServiceInterface,
	OfferGetRootServiceResponseType,
	OfferOfferTypeType,
	OfferProductPriceByType,
	OfferSolderByType,
} from '../../../types/offer/offerTypes';
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
import {
	TEMP_OFFER_ADD_PRODUCT_CATEGORIES,
	TEMP_SHOP_ADD_SHOP_NAME,
	TEMP_SHOP_EDIT_INDEX,
} from '../../../utils/routes';
import SharedStyles from '../../../styles/temp-shop/create/shopCreateShared.module.sass';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Divider from '@mui/material/Divider';
import {
	doubleTabNavigationTheme,
	OfferThumbnailsTheme,
	SolderPourcentageChipTheme,
	solderPourcentageCustomInputTheme,
} from '../../../utils/themes';
import { Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { allowAnyInstance, getServerSideCookieTokens, isAuthenticatedInstance } from '../../../utils/helpers';
import { getApi } from '../../../store/services/_init/_initAPI';
import { DropDownActionType } from '../../../types/ui/uiTypes';
import DesktopPublishEditNavbar from '../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar';
import {
	offerDeleteRootAction,
	offerDeleteSolderAction,
	offerPatchSolderAction,
	offerPostPinAction,
	offerPostSolderAction,
	setEmptyUserLocalOffer,
	setOfferToEdit,
} from '../../../store/actions/offer/offerActions';
import { ImageListType as ImageUploadingType } from 'react-images-uploading/dist/typings';
import ActionModals from '../../../components/htmlElements/modals/actionModal/actionModals';
import ApiLoadingResponseOrError from '../../../components/formikElements/apiLoadingResponseOrError/apiLoadingResponseOrError';
import RightSwipeModal from '../../../components/desktop/modals/rightSwipeModal/rightSwipeModal';
import HelperDescriptionHeader from '../../../components/headers/helperDescriptionHeader/helperDescriptionHeader';
import TopBarSaveClose from '../../../components/groupedComponents/temp-shop/edit/renseignerMesInfos-Modals/topBar-Save-Close/topBarSaveClose';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import CurrencyInput from 'react-currency-input-field';
import Button from '@mui/material/Button';
import { getCookie } from 'cookies-next';
import ClickAndCollectDisabledSVG from '../../../public/assets/svgs/globalIcons/click-and-collect-icon-gray.svg';
import DeliveryDisabledSVG from '../../../public/assets/svgs/globalIcons/delivery-icon-gray.svg';
import ApiProgress from "../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress";

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
		offer_type: OfferOfferTypeType;
		data: OfferGetRootProductInterface | OfferGetRootServiceInterface;
	};
};

const Index: NextPage<PropsType> = (props: PropsType) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	// const { offer_pk } = router.query;
	// const { offer_type } = props.pageProps;
	const {
		pk,
		title,
		description,
		offer_categories,
		// offer_type,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		// picture_1_thumb,
		// picture_2_thumb,
		// picture_3_thumb,
		// picture_4_thumb,
		pinned,
		details_offer,
		price,
		solder_type,
		solder_value,
		shop_name,
		deliveries,
		for_whom,
		tags,
	} = props.pageProps.data as OfferGetRootProductInterface;
	const bg_color_code = useAppSelector(getShopBgColorCode);
	const color_code = useAppSelector(getShopColorCode);
	const border = useAppSelector(getShopBorder);
	const [availableImages, setAvailableImages] = useState<Array<string>>([]);
	// const [availableThumbs, setAvailableThumbs] = useState<Array<string>>([]);
	const [selectedImage, setSelectedImage] = useState<string>(picture_1 ? picture_1 : '');
	const [categoriesListString, setCategoriesListString] = useState<Array<string>>([]);
	const [colorsListString, setColorsListString] = useState<Array<string>>([]);
	const [forWhomListString, setForWhomListString] = useState<Array<string>>([]);
	const [sizesListString, setSizesListString] = useState<Array<string>>([]);
	const [deliveriesListString, setDeliveriesListString] = useState<Array<deliveriesObj>>([]);
	const [newPrice, setNewPrice] = useState<number | null>(null);

	const editOfferHandler = () => {
		const pictures: ImageUploadingType = [];
		if (picture_1) {
			pictures.push({
				dataURL: picture_1,
			});
		}
		if (picture_2) {
			pictures.push({
				dataURL: picture_2,
			});
		}
		if (picture_3) {
			pictures.push({
				dataURL: picture_3,
			});
		}
		if (picture_4) {
			pictures.push({
				dataURL: picture_4,
			});
		}
		const deliveriesObjList: {
			delivery_city_1: string;
			all_cities_1: boolean;
			delivery_price_1: string;
			delivery_days_1: string;
			delivery_city_2: string;
			all_cities_2: boolean;
			delivery_price_2: string;
			delivery_days_2: string;
			delivery_city_3: string;
			all_cities_3: boolean;
			delivery_price_3: string;
			delivery_days_3: string;
		} = {
			delivery_city_1: '',
			all_cities_1: false,
			delivery_price_1: '',
			delivery_days_1: '',
			delivery_city_2: '',
			all_cities_2: false,
			delivery_price_2: '',
			delivery_days_2: '',
			delivery_city_3: '',
			all_cities_3: false,
			delivery_price_3: '',
			delivery_days_3: '',
		};
		if (deliveries.length === 1) {
			if (deliveries[0].delivery_city) {
				deliveriesObjList.delivery_city_1 = deliveries[0].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_1 = deliveries[0].all_cities;
			deliveriesObjList.delivery_price_1 = deliveries[0].delivery_price.toString();
			deliveriesObjList.delivery_days_1 = deliveries[0].delivery_days.toString();
		} else if (deliveries.length === 2) {
			if (deliveries[0].delivery_city) {
				deliveriesObjList.delivery_city_1 = deliveries[0].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_1 = deliveries[0].all_cities;
			deliveriesObjList.delivery_price_1 = deliveries[0].delivery_price.toString();
			deliveriesObjList.delivery_days_1 = deliveries[0].delivery_days.toString();

			if (deliveries[1].delivery_city) {
				deliveriesObjList.delivery_city_2 = deliveries[1].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_2 = deliveries[1].all_cities;
			deliveriesObjList.delivery_price_2 = deliveries[1].delivery_price.toString();
			deliveriesObjList.delivery_days_2 = deliveries[1].delivery_days.toString();
		} else if (deliveries.length === 3) {
			if (deliveries[0].delivery_city) {
				deliveriesObjList.delivery_city_1 = deliveries[0].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_1 = deliveries[0].all_cities;
			deliveriesObjList.delivery_price_1 = deliveries[0].delivery_price.toString();
			deliveriesObjList.delivery_days_1 = deliveries[0].delivery_days.toString();

			if (deliveries[1].delivery_city) {
				deliveriesObjList.delivery_city_2 = deliveries[1].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_2 = deliveries[1].all_cities;
			deliveriesObjList.delivery_price_2 = deliveries[1].delivery_price.toString();
			deliveriesObjList.delivery_days_2 = deliveries[1].delivery_days.toString();

			if (deliveries[2].delivery_city) {
				deliveriesObjList.delivery_city_3 = deliveries[2].delivery_city.join(',');
			}
			deliveriesObjList.all_cities_3 = deliveries[2].all_cities;
			deliveriesObjList.delivery_price_3 = deliveries[2].delivery_price.toString();
			deliveriesObjList.delivery_days_3 = deliveries[2].delivery_days.toString();
		}
		dispatch(
			setOfferToEdit({
				pk: pk,
				categoriesList: offer_categories,
				title: title,
				description: description,
				pictures: pictures,
				forWhom: for_whom.join(','),
				colors: details_offer.product_colors.join(','),
				sizes: details_offer.product_sizes.join(','),
				quantity: details_offer.product_quantity,
				tags: tags.join(','),
				prix: price as string,
				prix_par: details_offer.product_price_by,
				clickAndCollect: {
					longitude: details_offer.product_longitude ? parseFloat(details_offer.product_longitude) : null,
					latitude: details_offer.product_latitude ? parseFloat(details_offer.product_latitude) : null,
					address_name: details_offer.product_address,
				},
				deliveries: deliveriesObjList,
			}),
		);
		router.push(TEMP_OFFER_ADD_PRODUCT_CATEGORIES).then();
	};
	const offerApi = useAppSelector(getOfferOfferApi);

	const togglePinOfferHandler = () => {
		dispatch(offerPostPinAction(pk));
		router.replace(router.asPath).then();
	};
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const deleteOfferHandler = () => {
		dispatch(offerDeleteRootAction(pk, router));
		setShowDeleteModal(false);
	};

	const deleteModalActions = [
		{
			active: true,
			text: 'Oui',
			onClick: deleteOfferHandler,
		},
		{
			active: false,
			text: 'Non',
			onClick: () => setShowDeleteModal(false),
		},
	];

	const showDeleteOfferModal = () => {
		setShowDeleteModal(true);
	};
	const customPourcentageInput = useRef<HTMLInputElement>(null);
	const [customPourcentageState, setCustomPourcentageState] = useState<string>('');
	const [openSolderModal, setOpenSolderModal] = useState<boolean>(false);
	const [solderByState, setSolderByState] = useState<OfferSolderByType>(solder_type ? solder_type : 'F');
	const [newSolderValue, setNewSolderValue] = useState<string>(
		typeof solder_value === 'number' ? solder_value.toString() : '0.00',
	);
	const [isSolderValid, setIsSolderValid] = useState<boolean>(false);
	const [fivePourcentSolder, setFivePourcentSolder] = useState<boolean>(false);
	const [tenPourcentSolder, setTenPourcentSolder] = useState<boolean>(false);
	const [twentyPourcentSolder, setTwentyPourcentSolder] = useState<boolean>(false);
	const [thirtyPourcentSolder, setThirtyPourcentSolder] = useState<boolean>(false);
	const [fiftyPourcentSolder, setFiftyPourcentSolder] = useState<boolean>(false);
	const [seventyPourcentSolder, setSeventyPourcentSolder] = useState<boolean>(false);
	const [solderPourcentageForApi, setSolderPourcentageForApi] = useState<string | null>(null);
	const [newSolderPourcentageValue, setNewSolderPourcentageValue] = useState<string>('0.00');

	const setSolderPourcentageInput = (value: string) => {
		if (typeof price === 'number') {
			const newValue = price - (price * parseFloat(value)) / 100;
			setNewSolderPourcentageValue(newValue.toString());
		}
		setSolderPourcentageForApi(value);
		switch (value) {
			case '5':
				setFivePourcentSolder((prevState) => !prevState);
				setTenPourcentSolder(false);
				setTwentyPourcentSolder(false);
				setThirtyPourcentSolder(false);
				setFiftyPourcentSolder(false);
				setSeventyPourcentSolder(false);
				break;
			case '10':
				setTenPourcentSolder((prevState) => !prevState);
				setFivePourcentSolder(false);
				setTwentyPourcentSolder(false);
				setThirtyPourcentSolder(false);
				setFiftyPourcentSolder(false);
				setSeventyPourcentSolder(false);
				break;
			case '20':
				setTwentyPourcentSolder((prevState) => !prevState);
				setFivePourcentSolder(false);
				setTenPourcentSolder(false);
				setThirtyPourcentSolder(false);
				setFiftyPourcentSolder(false);
				setSeventyPourcentSolder(false);
				break;
			case '30':
				setThirtyPourcentSolder((prevState) => !prevState);
				setFivePourcentSolder(false);
				setTenPourcentSolder(false);
				setTwentyPourcentSolder(false);
				setFiftyPourcentSolder(false);
				setSeventyPourcentSolder(false);
				break;
			case '50':
				setFiftyPourcentSolder((prevState) => !prevState);
				setFivePourcentSolder(false);
				setTenPourcentSolder(false);
				setTwentyPourcentSolder(false);
				setThirtyPourcentSolder(false);
				setSeventyPourcentSolder(false);
				break;
			case '70':
				setSeventyPourcentSolder((prevState) => !prevState);
				setFivePourcentSolder(false);
				setTenPourcentSolder(false);
				setTwentyPourcentSolder(false);
				setThirtyPourcentSolder(false);
				setFiftyPourcentSolder(false);
				break;
		}
	};

	const showSolderOfferNav = () => {
		setOpenSolderModal(true);
	};

	const solderTabHandleChange = (event: React.SyntheticEvent, solderBy: OfferSolderByType) => {
		setSolderByState(solderBy);
	};

	const handleSaveSolder = () => {
		let valueToSend = '0.00';
		if (solderPourcentageForApi && solderByState === 'P') {
			valueToSend = solderPourcentageForApi;
		}
		if (!solder_value) {
			// dispatch post
			dispatch(offerPostSolderAction(pk, solderByState, parseFloat(valueToSend), router));
		} else {
			// dispatch patch
			dispatch(offerPatchSolderAction(pk, solderByState, parseFloat(valueToSend), router));
		}
		setOpenSolderModal(false);
	};

	const deleteSolderHandler = () => {
		// dispatch delete
		dispatch(offerDeleteSolderAction(pk, router));
		setOpenSolderModal(false);
		setNewSolderValue('0.00');
	};

	const dropDownActions: DropDownActionType = [
		{
			icon: EditBlackSVG,
			text: 'Modifier',
			onClick: editOfferHandler,
		},
		{
			icon: pinned ? EpinglerActiveSVG : EpinglerInactiveSVG,
			text: 'Épingler',
			onClick: togglePinOfferHandler,
		},
		{
			icon: solder_value !== null ? SolderEditActiveSVG : SolderEditInactiveSVG,
			text: 'Solder',
			onClick: showSolderOfferNav,
		},
		{
			icon: SupprimerSVG,
			text: 'Supprimer',
			onClick: showDeleteOfferModal,
		},
	];

	const localOfferTitle = useAppSelector(getLocalOfferTitle);

	useEffect(() => {
		// check solder values
		if (
			fivePourcentSolder ||
			tenPourcentSolder ||
			twentyPourcentSolder ||
			thirtyPourcentSolder ||
			fiftyPourcentSolder ||
			seventyPourcentSolder
		) {
			if (fivePourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			} else if (tenPourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			} else if (twentyPourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			} else if (thirtyPourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			} else if (fiftyPourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			} else if (seventyPourcentSolder) {
				setNewSolderValue(newSolderPourcentageValue.toString());
				setIsSolderValid(true);
			}
		} else {
			setNewSolderValue('0.00');
			setIsSolderValid(false);
		}
		// empty selected offer to reduce state size
		if (localOfferTitle) {
			dispatch(setEmptyUserLocalOffer());
		}
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
		// const availableThumbs: Array<string> = [];
		// if (picture_1_thumb) {
		// 	availableThumbs.push(picture_1_thumb);
		// }
		// if (picture_2_thumb) {
		// 	availableThumbs.push(picture_2_thumb);
		// }
		// if (picture_3_thumb) {
		// 	availableThumbs.push(picture_3_thumb);
		// }
		// if (picture_4_thumb) {
		// 	availableThumbs.push(picture_4_thumb);
		// }
		// setAvailableThumbs(availableThumbs);
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
		dispatch,
		fiftyPourcentSolder,
		fivePourcentSolder,
		for_whom,
		localOfferTitle,
		newSolderPourcentageValue,
		offer_categories,
		picture_1,
		picture_2,
		picture_3,
		picture_4,
		price,
		seventyPourcentSolder,
		solder_type,
		solder_value,
		tenPourcentSolder,
		thirtyPourcentSolder,
		twentyPourcentSolder,
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
	const navigationTheme = doubleTabNavigationTheme();
	const customPourcentageTheme = solderPourcentageCustomInputTheme();
	return (
		<ThemeProvider theme={customTheme}>
			<main className={Styles.main}>
				{/*both desktop and mobile */}
				<DesktopPublishEditNavbar
					dropDownText="Modifier"
					actions={dropDownActions}
					onClick={() => {
						router.back();
					}}
					menuID="desktop-validate-menu"
					buttonID="desktop-validate-menu-btn"
					buttonTitle="Valider"
				/>
				{/*<DesktopTopSaveShareNavBar onClickSave={() => {}} onClickShare={() => {}} onClickClose={() => {}} />*/}
				{/*<DesktopOfferDetailTopNavBar*/}
				{/*	offer_pk={pk}*/}
				{/*	epinglerActive={pinned}*/}
				{/*	solderActive={newPrice !== null}*/}
				{/*	referencerActive={false}*/}
				{/*/>*/}
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
										// loader={<ApiProgress/>}
										css={{width: 'auto !important'}}
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
														sizes="100vw"
														alt=""
													/>
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
										<Link href={TEMP_SHOP_EDIT_INDEX} passHref prefetch={false} target="_blank" rel="noreferrer">
											<a target="_blank" rel="noreferrer">
												<span className={Styles.shopName}>{shop_name}</span>
											</a>
										</Link>
									</Stack>
									<Stack direction="row" flexWrap="wrap" gap={1}>
										{categoriesListString.map((category, index) => {
											return <Chip key={index} label={category} variant="filled" className={Styles.chip} />;
										})}
									</Stack>
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
									<span className={`${Styles.price} ${solder_value !== null && Styles.oldPrice}`}>{price + ' DH'}</span>
									<span className={Styles.solderPrice}>{solder_value !== null ? newPrice + ' DH' : null}</span>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<span className={Styles.priceBy}>
										par {getProductPriceByData(details_offer.product_price_by as OfferProductPriceByType)}
									</span>
									<span className={Styles.quantity}>{details_offer.product_quantity} restant</span>
								</Stack>
							</Stack>
							<Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
								<div className={`${SharedStyles.primaryButtonWrapper} ${Styles.primaryButton}`}>
									<PrimaryButton buttonText="Ajouter au panier" active={false} type="submit" />
								</div>
							</Stack>
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
																{delivery.all_cities ? 'Tout le Maroc' : delivery.delivery_city?.split(',').join(', ')}
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
							<Stack direction="column" spacing={3} className={Styles.mobileOnly}>
								<Divider orientation="horizontal" flexItem className={Styles.divider} />
								{noCommentsAvailableContent()}
							</Stack>
						</Stack>
					</Stack>
				</Box>
				{showDeleteModal ? <ActionModals title="Supprimer cette offre ?" actions={deleteModalActions} /> : null}
				<ApiLoadingResponseOrError
					inProgress={offerApi.isDeleteInProgress}
					promiseStatus={offerApi.deletePromiseStatus}
					error={offerApi.error}
				/>
				{/* Solder modal */}
				<RightSwipeModal open={openSolderModal} handleClose={() => setOpenSolderModal(false)}>
					<Stack
						direction="column"
						justifyContent="space-between"
						alignContent="space-between"
						columnGap={0.5}
						rowGap={0}
						sx={{ height: '100%' }}
					>
						<TopBarSaveClose
							buttonText="Terminer"
							handleClose={() => setOpenSolderModal(false)}
							handleSubmit={handleSaveSolder}
							isValid={isSolderValid}
							cssClasses={Styles.topContainer}
						/>
						<HelperDescriptionHeader
							header="Solder une offre"
							HelpText="Apprendre à définir son prix"
							headerClasses={Styles.header}
							descriptionClasses={Styles.description}
							cssClasses={Styles.topContainer}
						/>
						<Stack direction="column" justifyContent="space-around" className={Styles.doubleTabWrapper}>
							<ThemeProvider theme={navigationTheme}>
								<BottomNavigation value={solderByState} onChange={solderTabHandleChange} showLabels>
									<BottomNavigationAction label="Prix Fixe" value="F" />
									<BottomNavigationAction label="Pourcentage" value="P" />
								</BottomNavigation>
							</ThemeProvider>
							{solderByState === 'F' ? (
								<Stack
									direction="column"
									spacing={1}
									sx={{ margin: '12px 32px 12px', height: '100%' }}
									justifyContent="space-between"
								>
									<Stack direction="column" spacing={1} alignItems="center">
										<CurrencyInput
											className={Styles.priceInputField}
											id="solder-fix"
											name="solder-fix"
											placeholder="0.00"
											value={newSolderValue}
											decimalsLimit={2}
											onValueChange={(value) => {
												if (value) {
													if (price) {
														if ((price as number) <= parseFloat(value)) {
															return;
														}
													}
													setNewSolderValue(value);
												} else {
													setNewSolderValue('0.00');
												}
												setIsSolderValid(true);
											}}
										/>
										{price ? (
											<>
												<p className={Styles.oldSolderValue}>{price} DH</p>
												<p className={Styles.oldSolderText}>ancien prix</p>
											</>
										) : null}
									</Stack>
									{solder_value ? (
										<Button onClick={deleteSolderHandler} color="primary" className={Styles.cancelButton}>
											Annuler la réduction
										</Button>
									) : null}
								</Stack>
							) : (
								<Stack
									direction="column"
									spacing={1}
									sx={{ margin: '12px 32px 12px', height: '100%' }}
									justifyContent="space-between"
								>
									<Stack direction="column" spacing={1} alignItems="center">
										<CurrencyInput
											className={Styles.priceInputField}
											id="solder-pourcentage"
											name="solder-pourcentage"
											readOnly={true}
											placeholder="0.00"
											value={newSolderValue}
											decimalsLimit={2}
										/>
										{price ? (
											<>
												<p className={Styles.oldSolderValue}>{price} DH</p>
												<p className={Styles.oldSolderText}>ancien prix</p>
											</>
										) : null}
										<ThemeProvider theme={SolderPourcentageChipTheme()}>
											<Grid
												container
												columnGap={2}
												rowSpacing={2}
												wrap="wrap"
												justifyContent="center"
												alignItems="center"
											>
												<Grid item xs="auto">
													<Chip
														label="-5 %"
														variant={fivePourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															// setDeliveryPriceState('0');
															setSolderPourcentageInput('5');
														}}
														size="medium"
													/>
												</Grid>
												<Grid item xs="auto">
													<Chip
														label="-10 %"
														variant={tenPourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															setSolderPourcentageInput('10');
														}}
													/>
												</Grid>
												<Grid item xs="auto">
													<Chip
														label="-20 %"
														variant={twentyPourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															setSolderPourcentageInput('20');
														}}
													/>
												</Grid>
												<Grid item xs="auto">
													<Chip
														label="-30 %"
														variant={thirtyPourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															setSolderPourcentageInput('30');
														}}
													/>
												</Grid>
												<Grid item xs="auto">
													<Chip
														label="-50 %"
														variant={fiftyPourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															setSolderPourcentageInput('50');
														}}
													/>
												</Grid>
												<Grid item xs="auto">
													<Chip
														label="-70 %"
														variant={seventyPourcentSolder ? 'filled' : 'outlined'}
														onClick={() => {
															setSolderPourcentageInput('70');
														}}
													/>
												</Grid>
											</Grid>
										</ThemeProvider>
										{/*<Stack direction="row" justifyContent="center" sx={{ marginTop: '2rem !important' }}>*/}
										{/*	<ThemeProvider theme={customPourcentageTheme}>*/}
										{/*		<TextField*/}
										{/*			inputMode="numeric"*/}
										{/*			inputProps={{ min: 1, max: 99 }}*/}
										{/*			ref={customPourcentageInput}*/}
										{/*			color="primary"*/}
										{/*			placeholder="Autre"*/}
										{/*			value={customPourcentageState}*/}
										{/*			onChange={(e) => {*/}
										{/*				let value = parseInt(e.target.value, 10);*/}
										{/*				if (value > 99) value = 99;*/}
										{/*				if (value < 1) value = 1;*/}
										{/*				setCustomPourcentageState(value.toString());*/}
										{/*				setSolderPourcentageInput(value.toString());*/}
										{/*			}}*/}
										{/*			// variant="standard"*/}
										{/*			fullWidth={false}*/}
										{/*			size="medium"*/}
										{/*			type="number"*/}
										{/*			className={Styles.customField}*/}
										{/*			disabled={*/}
										{/*				fivePourcentSolder ||*/}
										{/*				tenPourcentSolder ||*/}
										{/*				twentyPourcentSolder ||*/}
										{/*				thirtyPourcentSolder ||*/}
										{/*				fiftyPourcentSolder ||*/}
										{/*				seventyPourcentSolder*/}
										{/*			}*/}
										{/*		/>*/}
										{/*	</ThemeProvider>*/}
										{/*</Stack>*/}
									</Stack>
									{solder_value ? (
										<Button onClick={deleteSolderHandler} color="primary" className={Styles.cancelButton}>
											Annuler la réduction
										</Button>
									) : null}
								</Stack>
							)}
						</Stack>
					</Stack>
				</RightSwipeModal>
			</main>
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
	// note needs a new routing /products/id & /services/id [waiting services]
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_ADD_SHOP_NAME,
			},
		};
	}
	const url = `${process.env.NEXT_PUBLIC_OFFER_ROOT}/${context.params?.offer_pk}/`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data as OfferGetRootProductInterface,
						offer_type: response.data.offer_type,
					},
				};
			}
		} else {
			const instance = allowAnyInstance();
			const response: OfferGetRootProductResponseType | OfferGetRootServiceResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data as OfferGetRootProductInterface,
						offer_type: response.data.offer_type,
					},
				};
			}
		}
	} catch (e) {
		// Redirect to 404
		return {
			redirect: {
				permanent: false,
				destination: TEMP_SHOP_EDIT_INDEX,
			},
			props: {},
		};
	}
}

export default Index;
