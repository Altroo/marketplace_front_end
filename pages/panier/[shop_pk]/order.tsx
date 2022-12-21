import React, { useEffect, useCallback, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './order.module.sass';
import SharedStyles from './index.module.sass';
import { getCookie } from 'cookies-next';
import ClickAndCollectBlackSVG from '../../../public/assets/svgs/globalIcons/click-and-collect-black.svg';
import LieuServiceBlackSVG from '../../../public/assets/svgs/globalIcons/lieu-service-black.svg';
import DeliveryBlackSVG from '../../../public/assets/svgs/globalIcons/delivery-black.svg';
import {
	CGU_PAGE,
	PANIER,
	PANIER_ORDER_BY_SHOP_PK,
	PANIER_ORDER_COMPLETE,
	REAL_OFFER_ROUTE
} from "../../../utils/routes";
import {
	CartGetDetailsResponseType,
	CartGetDetailsType,
	cartOrderCoordonneeDataType,
	cartOrderDeliveriesDataType,
	cartPaginationDetailsForProduct,
	cartPaginationDetailsForService,
} from '../../../types/cart/cartTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { AxiosInstance } from 'axios';
import { allowAnyInstance, Desktop, TabletAndMobile } from '../../../utils/helpers';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
	getAvailableCountries,
	getUserLocalCartCoordonneeData,
	getUserLocalCartDeliveriesData,
	getUserLocalCartOder,
} from '../../../store/selectors';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Box, Divider, Stack, TextField, ThemeProvider } from '@mui/material';
import {
	CartAccordionTheme,
	CartQuantityFieldTheme,
	coordonneeTextInputTheme,
	offerForWhomDropdownTheme,
} from '../../../utils/themes';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Image from 'next/image';
import AlertBlackSVG from '../../../public/assets/svgs/globalIcons/alert-black.svg';
import { useFormik } from 'formik';
import { orderSSchema, orderVSchema } from '../../../utils/formValidationSchemas';
import { SagaCallBackResponseType } from '../../../types/_init/_initTypes';
import {
	cartGetCartCounterAction,
	cartPostOrderAction,
	cartSetLocalCartOrderCoordonneeDataAction,
	cartSetLocalCartOrderDeliveriesDataAction, initCartOrderAction
} from "../../../store/actions/cart/cartActions";
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomSingleCountrySelect from '../../../components/groupedComponents/offer/customSingleCountrySelect/customSingleCountrySelect';
import { placesGetCountriesAction } from '../../../store/actions/places/placesActions';
import ApiProgress from '../../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import shop_pk, { AccordionCartContent } from '.';
import Link from 'next/link';
import { getDateStringFromFormatedDate } from '../../../utils/rawData';
import { CGUCheckBox } from '../../../components/htmlElements/checkBoxes/checkBox';

const inputTheme = coordonneeTextInputTheme();

type RowArticleProductType = {
	offer_picture: string;
	offer_title: string;
	shop_link: string;
	offer_pk: number;
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: number;
	offer_max_quantity: number | null;
	offer_total_price: number;
};

const RowArticleProduct: React.FC<RowArticleProductType> = (props: RowArticleProductType) => {
	const {
		offer_picture,
		offer_title,
		shop_link,
		offer_pk,
		picked_size,
		picked_color,
		picked_quantity,
		offer_total_price,
		offer_max_quantity,
	} = props;

	const quantityTheme = CartQuantityFieldTheme();

	return (
		<Stack direction="column" spacing="12px">
			<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
				<Stack direction="row" spacing="18px" alignItems="center" width="100%" minWidth="300px">
					<Image src={offer_picture} alt={offer_title} width={96} height={96} className={SharedStyles.offerPicture} />
					<Stack direction="column" alignSelf="flex-start" width="inherit">
						<Link href={REAL_OFFER_ROUTE(shop_link, offer_pk.toString())}>
							<h4 className={SharedStyles.offerTitle}>{offer_title}</h4>
						</Link>
						<TabletAndMobile>
							<span className={SharedStyles.offerPrice}>{offer_total_price} DH</span>
						</TabletAndMobile>
						{picked_color && <span className={SharedStyles.offerDetails}>Couleur : {picked_color}</span>}
						{picked_size && <span className={SharedStyles.offerDetails}>Taille : {picked_size}</span>}
						<TabletAndMobile>
							<span className={SharedStyles.offerDetails}>Quantité : {picked_quantity}</span>
						</TabletAndMobile>
					</Stack>
				</Stack>
				<Desktop>
					<Stack direction="row" alignItems="center" className={SharedStyles.quantityStack}>
						<ThemeProvider theme={quantityTheme}>
							<TextField
								variant="outlined"
								value={picked_quantity}
								inputProps={{ min: 1, max: offer_max_quantity ? offer_max_quantity : 100 }}
								disabled
								color="primary"
							/>
						</ThemeProvider>
					</Stack>
				</Desktop>
				<Desktop>
					<span className={SharedStyles.offerPrice}>{offer_total_price} DH</span>
				</Desktop>
			</Stack>
		</Stack>
	);
};

type RowArticleServiceType = {
	offer_picture: string;
	offer_title: string;
	shop_link: string;
	offer_pk: number;
	picked_hour: string | null;
	picked_date: Date | null;
	offer_total_price: number;
};
const RowArticleService: React.FC<RowArticleServiceType> = (props: RowArticleServiceType) => {
	const { offer_pk, offer_total_price, offer_picture, offer_title, shop_link, picked_date, picked_hour } = props;

	return (
		<Stack direction="column" spacing="12px">
			<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
				<Stack direction="row" spacing="18px" alignItems="center" width="100%" minWidth="300px">
					<Image
						src={offer_picture}
						alt={offer_title}
						width="96"
						height="96"
						sizes="100vw"
						className={SharedStyles.offerPicture}
						loading="eager"
						priority={true}
					/>
					<Stack direction="column" alignSelf="flex-start">
						<Link href={REAL_OFFER_ROUTE(shop_link, offer_pk.toString())}>
							<h4 className={SharedStyles.offerTitle}>{offer_title}</h4>
						</Link>
						<TabletAndMobile>
							<span className={SharedStyles.offerPrice}>{offer_total_price} DH</span>
						</TabletAndMobile>
						{picked_date && (
							<span className={SharedStyles.offerDetails}>Date : {getDateStringFromFormatedDate(picked_date)}</span>
						)}
						{picked_hour && <span className={SharedStyles.offerDetails}>Heure : {picked_hour.slice(0, -3)}</span>}
					</Stack>
				</Stack>
				<Desktop>
					<span className={SharedStyles.offerPrice}>{offer_total_price} DH</span>
				</Desktop>
			</Stack>
		</Stack>
	);
};

type PaimentBoxContentType = {
	totalPrice: number;
	showGratuitDeliveryOne: boolean;
	deliveriesTotalPriceOne: number;
	showGratuitDeliveryTwo: boolean;
	deliveriesTotalPriceTwo: number;
	onSubmit: () => void;
	isSubmitValid: boolean;
};

const PaimentBoxContent: React.FC<PaimentBoxContentType> = (props: PaimentBoxContentType) => {
	const {
		totalPrice,
		showGratuitDeliveryOne,
		deliveriesTotalPriceOne,
		deliveriesTotalPriceTwo,
		showGratuitDeliveryTwo,
		isSubmitValid,
		onSubmit,
	} = props;

	return (
		<Box className={SharedStyles.paimentBox}>
			<Stack direction="column" spacing="22px">
				<Stack direction="column" spacing="50px">
					<Stack direction="column" spacing="18px">
						<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
							<span>Total des produit(s)</span>
							<span>{totalPrice} DH</span>
						</Stack>
						{showGratuitDeliveryOne && deliveriesTotalPriceOne === 0 && (
							<Stack
								direction="row"
								justifyContent="space-between"
								className={SharedStyles.livraisonPriceGratuitDetails}
							>
								<span>Livraison Lot 1</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{showGratuitDeliveryTwo && deliveriesTotalPriceTwo === 0 && (
							<Stack
								direction="row"
								justifyContent="space-between"
								className={SharedStyles.livraisonPriceGratuitDetails}
							>
								<span>Livraison Lot 2</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{deliveriesTotalPriceOne > 0 && (
							<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
								<span>Livraison Lot 1</span>
								<span>{deliveriesTotalPriceOne} DH</span>
							</Stack>
						)}
						{deliveriesTotalPriceTwo > 0 && (
							<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
								<span>Livraison Lot 2</span>
								<span>{deliveriesTotalPriceTwo} DH</span>
							</Stack>
						)}
						<Divider orientation="horizontal" flexItem className={SharedStyles.divider} />
						<Stack direction="column" justifyContent="center" alignItems="center" className={SharedStyles.totalPrice}>
							<span>Total</span>
							<span>{totalPrice + deliveriesTotalPriceOne + deliveriesTotalPriceTwo} DH</span>
						</Stack>
					</Stack>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						className={SharedStyles.paimentBoxRootStack}
					>
						<PrimaryButton buttonText="Continuer" active={isSubmitValid} onClick={onSubmit} type="submit" />
					</Stack>
				</Stack>
				<Stack direction="row" spacing="10px" alignItems="center">
					<Image src={AlertBlackSVG} alt="" sizes="100vw" width="24" height="24" />
					<span className={SharedStyles.fraisDuPort}>
						Les frais de ports sont calculés automatiquement. Le vendeur peut vous demandez un complément en cas de
						différence trop importante.
					</span>
				</Stack>
			</Stack>
		</Box>
	);
};

type RecapBoxContentType = {
	totalPrice: number | null;
	showGratuitDeliveryOne: boolean | null;
	deliveriesTotalPriceOne: number | null;
	showGratuitDeliveryTwo: boolean | null;
	deliveriesTotalPriceTwo: number | null;
	onSubmit: () => void;
	note: string;
	noteOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const RecapBoxContent: React.FC<RecapBoxContentType> = (props: RecapBoxContentType) => {
	const {
		totalPrice,
		showGratuitDeliveryOne,
		deliveriesTotalPriceOne,
		deliveriesTotalPriceTwo,
		showGratuitDeliveryTwo,
		onSubmit,
		note,
		noteOnChange,
	} = props;
	const [total_price, setTotal_price] = useState<number>(totalPrice ? totalPrice : 0);
	const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
	const [acceptConditions, setAcceptConditions] = useState<boolean>(false);

	useEffect(() => {
		if (deliveriesTotalPriceOne) {
			setTotal_price((prevState) => prevState + deliveriesTotalPriceOne);
		} else if (deliveriesTotalPriceTwo) {
			setTotal_price((prevState) => prevState + deliveriesTotalPriceTwo);
		}
		if (acceptConditions) {
			setIsSubmitActive(true);
		} else {
			setIsSubmitActive(false);
		}
	}, [acceptConditions, deliveriesTotalPriceOne, deliveriesTotalPriceTwo]);

	return (
		<Box className={Styles.paimentBox}>
			<Stack direction="column" spacing="22px">
				<Stack direction="column" spacing="50px">
					<Stack direction="column" spacing="18px">
						<CustomTextInput
							id="note"
							type="text"
							value={note}
							onChange={noteOnChange}
							fullWidth={false}
							size="medium"
							label="Ajouter une remarque"
							placeholder="C'est un cadeau !"
							theme={inputTheme}
						/>
						<Stack direction="row" justifyContent="space-between">
							<CGUCheckBox
								activeColor="#0274D7"
								checked={acceptConditions}
								active={true}
								text=""
								labelcssStyles={{
									alignItems: 'flex-start',
									height: '100%',
								}}
								onChange={setAcceptConditions}
							>
								<Stack direction="column" spacing="10px">
									<span className={Styles.cguCheckBoxText}>
										J&apos;ai lu et j&apos;accepte les{' '}
										<Link href={CGU_PAGE} className={Styles.cguUnderlineBlue} target="_blank" rel="noreferrer">
											Conditions générales d&apos;utilisation
										</Link>
										, notament la mention relative à la protection des données.
									</span>
									<p className={Styles.cguParagraphe}>
										Conformément à la loi 09-08, vous disposez d&apos;un droit d&apos;accès, de rectification et
										d&apos;opposition au traitement de vos données personnelles. Ce traitement a été autorisé par la
										CNDP sous le numéro D-GC-158/2016.
									</p>
								</Stack>
							</CGUCheckBox>
						</Stack>
					</Stack>
					<Stack direction="column" spacing="18px">
						<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
							<span>Total des produit(s)</span>
							<span>{totalPrice} DH</span>
						</Stack>
						{showGratuitDeliveryOne && deliveriesTotalPriceOne === 0 && (
							<Stack
								direction="row"
								justifyContent="space-between"
								className={SharedStyles.livraisonPriceGratuitDetails}
							>
								<span>Livraison Lot 1</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{showGratuitDeliveryTwo && deliveriesTotalPriceTwo === 0 && (
							<Stack
								direction="row"
								justifyContent="space-between"
								className={SharedStyles.livraisonPriceGratuitDetails}
							>
								<span>Livraison Lot 2</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{deliveriesTotalPriceOne !== null && deliveriesTotalPriceOne > 0 && (
							<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
								<span>Livraison Lot 1</span>
								<span>{deliveriesTotalPriceOne} DH</span>
							</Stack>
						)}
						{deliveriesTotalPriceTwo !== null && deliveriesTotalPriceTwo > 0 && (
							<Stack direction="row" justifyContent="space-between" className={SharedStyles.priceDetails}>
								<span>Livraison Lot 2</span>
								<span>{deliveriesTotalPriceTwo} DH</span>
							</Stack>
						)}
						<Divider orientation="horizontal" flexItem className={SharedStyles.divider} />
						<Stack direction="column" justifyContent="center" alignItems="center" className={SharedStyles.totalPrice}>
							<span>Total</span>
							<span>{total_price} DH</span>
						</Stack>
					</Stack>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						className={SharedStyles.paimentBoxRootStack}
					>
						<PrimaryButton buttonText="Continuer" active={isSubmitActive} onClick={onSubmit} type="submit" />
					</Stack>
				</Stack>
				<Stack direction="row" spacing="10px" alignItems="center"></Stack>
			</Stack>
		</Box>
	);
};

type OrderPropsType = {
	pageProps: {
		data: CartGetDetailsType;
		unique_id: string;
	};
};
const Order: NextPage<OrderPropsType> = (props: OrderPropsType) => {
	const { data, unique_id } = props.pageProps;
	const router = useRouter();
	const { recap } = router.query;
	const userLocalCart = useAppSelector(getUserLocalCartOder);
	const userLocalCartCoordonneeData = useAppSelector(getUserLocalCartCoordonneeData);
	const userLocalCartDeliveriesData = useAppSelector(getUserLocalCartDeliveriesData);
	const availableCountries = useAppSelector(getAvailableCountries);
	const dispatch = useAppDispatch();
	const [pickedClickAndCollect, setPickedClickAndCollect] = useState<string>('');
	const [pickedDeliveries, setPickedDeliveries] = useState<string>('');

	const formikLivraison = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			address: '',
			city: '',
			zip_code: '',
			country: '',
			phone: '',
			email: '',
			note: '',
		},
		enableReinitialize: true,
		validateOnMount: true,
		validationSchema: orderVSchema,
		onSubmit: async (values, { setSubmitting }) => {
			if (userLocalCart) {
				const { shop_pk, delivery_pk, picked_click_and_collect, picked_deliveries } = userLocalCart;
				const action = cartSetLocalCartOrderDeliveriesDataAction({
					first_name: values.first_name,
					last_name: values.last_name,
					address: values.address,
					city: values.city,
					zip_code: values.zip_code,
					country: values.country,
					phone: values.phone,
					email: values.email,
					note: values.note,
					delivery_pk: delivery_pk,
					shop_pk: shop_pk,
					picked_click_and_collect: picked_click_and_collect,
					picked_delivery: picked_deliveries,
					url: `${process.env.NEXT_PUBLIC_CART_ROOT_POST_ORDER}${unique_id}/`,
				});
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							router
								.replace(
									{
										query: {
											...router.query,
											recap: true,
										},
										pathname: PANIER_ORDER_BY_SHOP_PK(shop_pk),
									},
									PANIER_ORDER_BY_SHOP_PK(shop_pk),
								)
								.then();
						}
					},
				});
				setSubmitting(false);
			}
		},
	});

	const formikService = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			phone: '',
			email: '',
			note: '',
		},
		enableReinitialize: true,
		validateOnMount: true,
		validationSchema: orderSSchema,
		onSubmit: async (values, { setSubmitting }) => {
			if (userLocalCart) {
				const { shop_pk, delivery_pk, picked_click_and_collect, picked_deliveries } = userLocalCart;
				const action = cartSetLocalCartOrderCoordonneeDataAction({
					first_name: values.first_name,
					last_name: values.last_name,
					phone: values.phone,
					email: values.email,
					note: values.note,
					delivery_pk: delivery_pk,
					shop_pk: shop_pk,
					picked_click_and_collect: picked_click_and_collect,
					picked_delivery: picked_deliveries,
					url: `${process.env.NEXT_PUBLIC_CART_ROOT_POST_ORDER}${unique_id}/`,
				});
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							router
								.replace(
									{
										query: {
											...router.query,
											recap: true,
										},
										pathname: PANIER_ORDER_BY_SHOP_PK(shop_pk),
									},
									PANIER_ORDER_BY_SHOP_PK(shop_pk),
								)
								.then();
						}
					},
				});
				setSubmitting(false);
			}
		},
	});

	const noteOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (userLocalCart) {
				if (userLocalCart.whichFormik === 'V') {
					formikLivraison.handleChange('note')(e);
				} else if (userLocalCart.whichFormik === 'S') {
					formikService.handleChange('note')(e);
				}
			}
		},
		[formikLivraison, formikService, userLocalCart],
	);

	const onSubmitOrderHandler = useCallback(() => {
		let note = '';
		// let rest_of_data: cartOrderDeliveriesDataType | cartOrderCoordonneeDataType | null = null;
		if (userLocalCart) {
			if (userLocalCart.whichFormik === 'V' && userLocalCartDeliveriesData) {
				note = formikLivraison.values.note;
				const action = cartPostOrderAction({
					...userLocalCartDeliveriesData,
					lot_pks: userLocalCart.lot_pks,
					note: note,
				});
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							router.replace(PANIER_ORDER_COMPLETE(userLocalCartDeliveriesData.shop_pk)).then(() => {
								dispatch(cartGetCartCounterAction(unique_id));
								dispatch(initCartOrderAction());
							});
						}
					},
				});
			} else if (userLocalCart.whichFormik === 'S' && (userLocalCartDeliveriesData || userLocalCartCoordonneeData)) {
				note = formikService.values.note;
				if (userLocalCartDeliveriesData) {
					const action = cartPostOrderAction({
						...userLocalCartDeliveriesData,
						lot_pks: userLocalCart.lot_pks,
						note: note,
					});
					dispatch({
						...action,
						onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
							if (!error && !cancelled && data) {
								router.replace(PANIER_ORDER_COMPLETE(userLocalCartDeliveriesData.shop_pk)).then(() => {
								dispatch(cartGetCartCounterAction(unique_id));
								dispatch(initCartOrderAction());
							});
							}
						},
					});
				} else if (userLocalCartCoordonneeData) {
					const action = cartPostOrderAction({
						first_name: userLocalCartCoordonneeData.first_name,
						last_name: userLocalCartCoordonneeData.last_name,
						phone: userLocalCartCoordonneeData.phone,
						email: userLocalCartCoordonneeData.email,
						note: note,
						delivery_pk: userLocalCartCoordonneeData.delivery_pk,
						shop_pk: userLocalCartCoordonneeData.shop_pk,
						picked_click_and_collect: userLocalCartCoordonneeData.picked_click_and_collect,
						picked_delivery: userLocalCartCoordonneeData.picked_delivery,
						url: userLocalCartCoordonneeData.url,
						lot_pks: userLocalCart.lot_pks,
						zip_code: '',
						country: '',
						city: '',
						address: '',
					});
					dispatch({
						...action,
						onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
							if (!error && !cancelled && data) {
								router.replace(PANIER_ORDER_COMPLETE(userLocalCartCoordonneeData.shop_pk)).then(() => {
								dispatch(cartGetCartCounterAction(unique_id));
								dispatch(initCartOrderAction());
							});
							}
						},
					});
				}
			}
		}
	}, [dispatch, formikLivraison.values.note, formikService.values.note, router, unique_id, userLocalCart, userLocalCartCoordonneeData, userLocalCartDeliveriesData]);

	useEffect(() => {
		if (!userLocalCart) {
			router.replace(PANIER).then();
		} else {
			setPickedClickAndCollect(userLocalCart.picked_click_and_collect);
			setPickedDeliveries(userLocalCart.picked_deliveries);
		}
		if (availableCountries.length === 0) {
			dispatch(placesGetCountriesAction());
		}
	}, [router, userLocalCart, availableCountries.length, dispatch]);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={SharedStyles.main}>
				{userLocalCart && !recap ? (
					<Stack direction="row" spacing="80px" justifyContent="space-between" className={Styles.paimentStack}>
						<Stack direction="column" spacing="48px" width="100%" className={Styles.rootStack}>
							<Stack direction="column" spacing="10px">
								{userLocalCart.whichFormik === 'V' ? (
									<h2 className={Styles.header}>Adresse de livraison</h2>
								) : (
									<h2 className={Styles.header}>Coordonnées</h2>
								)}
								<span className={Styles.subHeader}>
									Afin que le vendeur puisse vous contacter et vous remettre votre commande
								</span>
							</Stack>
							<Stack
								direction="column"
								spacing="48px"
								onSubmit={(e) => e.preventDefault()}
								width="100%"
								component="form"
							>
								{userLocalCart.whichFormik === 'V' ? (
									<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
										<CustomTextInput
											id="first_name"
											type="text"
											value={formikLivraison.values.first_name}
											onChange={formikLivraison.handleChange('first_name')}
											onBlur={formikLivraison.handleBlur('first_name')}
											helperText={formikLivraison.touched.first_name ? formikLivraison.errors.first_name : ''}
											error={formikLivraison.touched.first_name && Boolean(formikLivraison.errors.first_name)}
											fullWidth={false}
											size="medium"
											label="Nom"
											placeholder="Nom"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="last_name"
											type="text"
											value={formikLivraison.values.last_name}
											onChange={formikLivraison.handleChange('last_name')}
											onBlur={formikLivraison.handleBlur('last_name')}
											helperText={formikLivraison.touched.last_name ? formikLivraison.errors.last_name : ''}
											error={formikLivraison.touched.last_name && Boolean(formikLivraison.errors.last_name)}
											fullWidth={false}
											size="medium"
											label="Prénom"
											placeholder="Prénom"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="address"
											type="text"
											value={formikLivraison.values.address}
											onChange={formikLivraison.handleChange('address')}
											onBlur={formikLivraison.handleBlur('address')}
											helperText={formikLivraison.touched.address ? formikLivraison.errors.address : ''}
											error={formikLivraison.touched.address && Boolean(formikLivraison.errors.address)}
											fullWidth={false}
											size="medium"
											label="Adresse"
											placeholder="Adresse"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="city"
											type="text"
											value={formikLivraison.values.city}
											onChange={formikLivraison.handleChange('city')}
											onBlur={formikLivraison.handleBlur('city')}
											helperText={formikLivraison.touched.city ? formikLivraison.errors.city : ''}
											error={formikLivraison.touched.city && Boolean(formikLivraison.errors.city)}
											fullWidth={false}
											size="medium"
											label="Ville"
											placeholder="Ville"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="zip_code"
											type="tel"
											value={formikLivraison.values.zip_code}
											onChange={formikLivraison.handleChange('zip_code')}
											onBlur={formikLivraison.handleBlur('zip_code')}
											helperText={formikLivraison.touched.zip_code ? formikLivraison.errors.zip_code : ''}
											error={formikLivraison.touched.zip_code && Boolean(formikLivraison.errors.zip_code)}
											fullWidth={false}
											size="medium"
											label="Code Postal"
											placeholder="Code Postal"
											theme={inputTheme}
										/>
										<CustomSingleCountrySelect
											error={formikLivraison.touched.country && Boolean(formikLivraison.errors.country)}
											helperText={formikLivraison.touched.country ? formikLivraison.errors.country : ''}
											onBlur={formikLivraison.handleBlur('country')}
											onChange={(e: SelectChangeEvent) => {
												formikLivraison.handleChange('country')(e.target.value);
											}}
											value={formikLivraison.values.country}
											id="country"
											label="Pays"
											items={availableCountries}
											theme={offerForWhomDropdownTheme()}
											disabled={false}
											cssClass={Styles.maxWidth}
										/>
										<Divider orientation="horizontal" flexItem className={Styles.divider} />
										<CustomTextInput
											id="phone"
											type="tel"
											value={formikLivraison.values.phone}
											onChange={formikLivraison.handleChange('phone')}
											onBlur={formikLivraison.handleBlur('phone')}
											helperText={formikLivraison.touched.phone ? formikLivraison.errors.phone : ''}
											error={formikLivraison.touched.phone && Boolean(formikLivraison.errors.phone)}
											fullWidth={false}
											size="medium"
											label="Téléphone"
											placeholder="Téléphone"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="email"
											type="text"
											value={formikLivraison.values.email}
											onChange={formikLivraison.handleChange('email')}
											onBlur={formikLivraison.handleBlur('email')}
											helperText={formikLivraison.touched.email ? formikLivraison.errors.email : ''}
											error={formikLivraison.touched.email && Boolean(formikLivraison.errors.email)}
											fullWidth={false}
											size="medium"
											label="Email"
											placeholder="Email"
											theme={inputTheme}
										/>
									</Stack>
								) : (
									<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
										<CustomTextInput
											id="first_name"
											type="text"
											value={formikService.values.first_name}
											onChange={formikService.handleChange('first_name')}
											onBlur={formikService.handleBlur('first_name')}
											helperText={formikService.touched.first_name ? formikService.errors.first_name : ''}
											error={formikService.touched.first_name && Boolean(formikService.errors.first_name)}
											fullWidth={false}
											size="medium"
											label="Nom"
											placeholder="Nom"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="last_name"
											type="text"
											value={formikService.values.last_name}
											onChange={formikService.handleChange('last_name')}
											onBlur={formikService.handleBlur('last_name')}
											helperText={formikService.touched.last_name ? formikService.errors.last_name : ''}
											error={formikService.touched.last_name && Boolean(formikService.errors.last_name)}
											fullWidth={false}
											size="medium"
											label="Prénom"
											placeholder="Prénom"
											theme={inputTheme}
										/>
										<Divider orientation="horizontal" flexItem className={Styles.divider} />
										<CustomTextInput
											id="phone"
											type="tel"
											value={formikService.values.phone}
											onChange={formikService.handleChange('phone')}
											onBlur={formikService.handleBlur('phone')}
											helperText={formikService.touched.phone ? formikService.errors.phone : ''}
											error={formikService.touched.phone && Boolean(formikService.errors.phone)}
											fullWidth={false}
											size="medium"
											label="Téléphone"
											placeholder="Téléphone"
											theme={inputTheme}
										/>
										<CustomTextInput
											id="email"
											type="text"
											value={formikService.values.email}
											onChange={formikService.handleChange('email')}
											onBlur={formikService.handleBlur('email')}
											helperText={formikService.touched.email ? formikService.errors.email : ''}
											error={formikService.touched.email && Boolean(formikService.errors.email)}
											fullWidth={false}
											size="medium"
											label="Email"
											placeholder="Email"
											theme={inputTheme}
										/>
									</Stack>
								)}
							</Stack>
						</Stack>
						{userLocalCart.whichFormik === 'V' ? (
							<PaimentBoxContent
								deliveriesTotalPriceOne={userLocalCart.deliveriesTotalPriceOne}
								showGratuitDeliveryTwo={userLocalCart.showGratuitDeliveryTwo}
								showGratuitDeliveryOne={userLocalCart.showGratuitDeliveryOne}
								totalPrice={userLocalCart.totalPrice}
								deliveriesTotalPriceTwo={userLocalCart.deliveriesTotalPriceTwo}
								isSubmitValid={formikLivraison.isValid && !formikLivraison.isSubmitting}
								onSubmit={formikLivraison.submitForm}
							/>
						) : (
							<PaimentBoxContent
								deliveriesTotalPriceOne={userLocalCart.deliveriesTotalPriceOne}
								showGratuitDeliveryTwo={userLocalCart.showGratuitDeliveryTwo}
								showGratuitDeliveryOne={userLocalCart.showGratuitDeliveryOne}
								totalPrice={userLocalCart.totalPrice}
								deliveriesTotalPriceTwo={userLocalCart.deliveriesTotalPriceTwo}
								isSubmitValid={formikService.isValid && !formikService.isSubmitting}
								onSubmit={formikService.submitForm}
							/>
						)}
					</Stack>
				) : userLocalCart && recap ? (
					<Stack direction="row" spacing="80px" justifyContent="space-between" className={Styles.paimentStack}>
						<Stack direction="column" spacing="48px" width="100%" className={Styles.rootStack}>
							<Stack direction="column" spacing="5px">
								<h2 className={Styles.header}>Récapitulatif</h2>
								<span className={Styles.subRecap}>de votre commande</span>
							</Stack>
							<ThemeProvider theme={CartAccordionTheme()}>
								<Stack direction="column" spacing="48px" width="100%">
									{data.results.map((result, rootIndex) => {
										let local_shop_name = '';
										const picked_click_and_collect = pickedClickAndCollect.split(',')[rootIndex];
										const picked_deliveries = pickedDeliveries.split(',')[rootIndex];
										return (
											<Stack direction="column" key={rootIndex}>
												<AccordionCartContent title={`Lot n°${rootIndex + 1}`}>
													<Stack direction="column" spacing="24px">
														<Stack direction="column" spacing="12px">
															{result.lot.cart_details.map((offer, lotIndex) => {
																const {
																	offer_pk,
																	offer_title,
																	offer_type,
																	offer_details,
																	offer_total_price,
																	offer_picture,
																	shop_link,
																	shop_name,
																} = offer;
																local_shop_name = shop_name;
																if (offer_type === 'V') {
																	const { picked_quantity, offer_max_quantity, picked_size, picked_color } =
																		offer_details as cartPaginationDetailsForProduct;
																	return (
																		<RowArticleProduct
																			key={lotIndex}
																			offer_max_quantity={offer_max_quantity}
																			offer_title={offer_title}
																			offer_picture={offer_picture}
																			offer_pk={offer_pk}
																			offer_total_price={offer_total_price}
																			picked_quantity={picked_quantity}
																			picked_color={picked_color}
																			picked_size={picked_size}
																			shop_link={shop_link}
																		/>
																	);
																} else if (offer_type === 'S') {
																	const { picked_hour, picked_date } = offer_details as cartPaginationDetailsForService;
																	return (
																		<RowArticleService
																			key={lotIndex}
																			offer_title={offer_title}
																			offer_picture={offer_picture}
																			offer_pk={offer_pk}
																			offer_total_price={offer_total_price}
																			picked_hour={picked_hour}
																			picked_date={picked_date}
																			shop_link={shop_link}
																		/>
																	);
																} else {
																	return null;
																}
															})}
														</Stack>
														<Divider orientation="horizontal" flexItem className={SharedStyles.divider} />
														{result.lot.global_offer_type === 'V' && userLocalCartDeliveriesData && (
															<Stack direction="column" spacing="10px">
																{picked_click_and_collect === '1' ? (
																	<Stack direction="row" spacing="18px">
																		<Image src={ClickAndCollectBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																		<Stack direction="column" spacing="10px">
																			<span className={Styles.orderDetailTitle}>Click & collect</span>
																			<Stack direction="column" spacing="0px">
																				<span className={Styles.orderUserDataHeader}>{local_shop_name}</span>
																				<span className={Styles.orderUserData}>
																					{result.lot.click_and_collect?.product_address}
																				</span>
																			</Stack>
																		</Stack>
																	</Stack>
																) : (
																	picked_deliveries === '1' && (
																		<Stack direction="row" spacing="18px">
																			<Image src={DeliveryBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																			<Stack direction="column" spacing="10px">
																				<span className={Styles.orderDetailTitle}>
																					Livraison{' '}
																					{userLocalCart.deliveriesTotalPriceOne +
																						userLocalCart.deliveriesTotalPriceTwo}{' '}
																					DH
																				</span>
																				<Stack direction="column" spacing="0px">
																					<span className={Styles.orderUserDataHeader}>
																						{userLocalCartDeliveriesData.first_name}{' '}
																						{userLocalCartDeliveriesData.last_name}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.address}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.city}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.zip_code}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.country}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.email}
																					</span>
																					<span className={Styles.orderUserData}>
																						{userLocalCartDeliveriesData.phone}
																					</span>
																				</Stack>
																			</Stack>
																		</Stack>
																	)
																)}
															</Stack>
														)}
														{result.lot.global_offer_type === 'S' && result.lot.service_coordonnee && (
															<Stack direction="row" spacing="18px">
																<Image src={LieuServiceBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																<Stack direction="column" spacing="10px">
																	<span className={Styles.orderDetailTitle}>Lieu</span>
																	<Stack direction="column" spacing="0px">
																		<span className={Styles.orderUserDataHeader}>{local_shop_name}</span>
																		<span className={Styles.orderUserData}>
																			{result.lot.service_coordonnee?.service_address}
																		</span>
																	</Stack>
																</Stack>
															</Stack>
														)}
													</Stack>
												</AccordionCartContent>
											</Stack>
										);
									})}
								</Stack>
							</ThemeProvider>
						</Stack>
						<RecapBoxContent
							deliveriesTotalPriceOne={userLocalCart.deliveriesTotalPriceOne}
							showGratuitDeliveryTwo={userLocalCart.showGratuitDeliveryTwo}
							showGratuitDeliveryOne={userLocalCart.showGratuitDeliveryOne}
							totalPrice={userLocalCart.totalPrice}
							deliveriesTotalPriceTwo={userLocalCart.deliveriesTotalPriceTwo}
							onSubmit={onSubmitOrderHandler}
							note={
								userLocalCart.whichFormik === 'V'
									? formikLivraison.values.note
									: userLocalCart.whichFormik === 'S'
									? formikService.values.note
									: ''
							}
							noteOnChange={noteOnChange}
						/>
					</Stack>
				) : (
					<ApiProgress
						cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
						backdropColor="#FFFFFF"
						circularColor="#0D070B"
					/>
				)}
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cart_unique_id = getCookie('@unique_id', { req: context.req, res: context.res });
	const { shop_pk } = context.query;
	const emptyRedirect = {
		redirect: {
			permanent: false,
			destination: PANIER,
		},
	};
	if (cart_unique_id && shop_pk) {
		const url = `${process.env.NEXT_PUBLIC_CART_GET_CART_DETAILS}${shop_pk}/${cart_unique_id}/`;
		const instance: AxiosInstance = allowAnyInstance();
		const response: CartGetDetailsResponseType = await getApi(url, instance);
		if (response.status === 200) {
			if (response.data.results.length > 0) {
				return {
					props: {
						data: response.data,
						unique_id: cart_unique_id,
					},
				};
			} else {
				return emptyRedirect;
			}
		} else {
			return emptyRedirect;
		}
	} else {
		return emptyRedirect;
	}
}

export default Order;
