import React, { useCallback, useEffect, useState } from 'react';
import Styles from './index.module.sass';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	IconButton,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';
import { CartAccordionTheme, CartQuantityFieldTheme } from '../../../utils/themes';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Image from 'next/image';
import AlertBlackSVG from '../../../public/assets/svgs/globalIcons/alert-black.svg';
import CartDropDownBlueSVG from '../../../public/assets/svgs/globalIcons/cart-drop-up-blue.svg';
import TrashBlackSVG from '../../../public/assets/svgs/globalIcons/trash-black.svg';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../utils/hooks';
import { GetServerSidePropsContext, NextPage } from "next";
import { getCookie } from 'cookies-next';
import { AxiosInstance } from 'axios';
import { allowAnyInstance, Desktop, TabletAndMobile } from '../../../utils/helpers';
import {
	CartClickAndCollectDeliveriesStateType,
	CartGetDetailsResponseType,
	CartGetDetailsType,
	cartPaginationDetailsForProduct,
	cartPaginationDetailsForService,
} from '../../../types/cart/cartTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { PANIER, PANIER_ORDER_BY_SHOP_PK, REAL_OFFER_ROUTE } from '../../../utils/routes';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import Link from 'next/link';
import MinusSVG from '../../../public/assets/svgs/globalIcons/minus-circular.svg';
import PlusSVG from '../../../public/assets/svgs/globalIcons/plus-circular.svg';
import ActiveCheckBlue from '../../../public/assets/svgs/dashboardIcons/mainIcons/checkbox-active-blue.svg';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import { getCitiesFromArray, getDateFromDayCountNumber, getDateStringFromFormatedDate } from '../../../utils/rawData';
import {
	cartDeleteAction,
	cartGetCartCounterAction,
	cartPatchCartQuantityAction,
	cartSetLocalCartOrderAction,
} from '../../../store/actions/cart/cartActions';
import { SagaCallBackResponseType } from '../../../types/_init/_initTypes';

const CustomMap = dynamic(() => import('../../../components/map/customMap'), {
	ssr: false,
});

type AccordionCartContentType = {
	title: string;
	children?: React.ReactNode;
};
export const AccordionCartContent: React.FC<AccordionCartContentType> = (props: AccordionCartContentType) => {
	const [accordionState, setAccordionState] = useState<boolean>(false);

	return (
		<Accordion disableGutters defaultExpanded onChange={() => setAccordionState((prevState) => !prevState)}>
			<AccordionSummary expandIcon={<Image src={CartDropDownBlueSVG} alt="" width="12" height="7" sizes="100vw" />}>
				<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
					<h2 className={Styles.lotTitle}>{props.title}</h2>
					<span className={Styles.accordionTitle}>Voir {accordionState ? 'plus' : 'moin'}</span>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>{props.children}</AccordionDetails>
		</Accordion>
	);
};

type RowArticleProductType = {
	offer_picture: string;
	offer_title: string;
	shop_link: string;
	offer_pk: number;
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: number;
	offer_max_quantity: number | null;
	offer_price: number;
	offer_total_price: number;
	cart_pk: number;
	onDelete: (cart_pk: number, offer_price: number) => void;
	resetTotalPriceHandler: (cart_pk: number, actionClicked: '-' | '+', price: number) => void;
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
		offer_price,
		offer_total_price,
		offer_max_quantity,
		cart_pk,
		onDelete,
		resetTotalPriceHandler,
	} = props;
	const [quantity, setQuantity] = useState<number>(picked_quantity);
	const [offerTotalPrice, setOfferTotalPrice] = useState<number>(offer_total_price);

	const quantityTheme = CartQuantityFieldTheme();

	return (
		<Stack direction="column" spacing="12px">
			<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
				<Stack direction="row" spacing="18px" alignItems="center" width="100%" minWidth="300px">
					<Image src={offer_picture} alt={offer_title} width={96} height={96} className={Styles.offerPicture} />
					<Stack direction="column" alignSelf="flex-start" width="inherit">
						<Link href={REAL_OFFER_ROUTE(shop_link, offer_pk.toString())}>
							<h4 className={Styles.offerTitle}>{offer_title}</h4>
						</Link>
						<TabletAndMobile>
							<span className={Styles.offerPrice}>{offerTotalPrice} DH</span>
						</TabletAndMobile>
						{picked_color && <span className={Styles.offerDetails}>Couleur : {picked_color}</span>}
						{picked_size && <span className={Styles.offerDetails}>Taille : {picked_size}</span>}
						<TabletAndMobile>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<Stack direction="row" alignItems="center" className={Styles.quantityStack}>
									<IconButton
										onClick={() => {
											setQuantity((prevState) => {
												if (prevState === 1) {
													setOfferTotalPrice(offer_price);
													return 1;
												} else {
													setOfferTotalPrice((prevState) => {
														return prevState - offer_price;
													});
													return prevState - 1;
												}
											});
											if (quantity > 1) {
												resetTotalPriceHandler(cart_pk, '-', offer_price);
											}
										}}
										className={Styles.iconButton}
									>
										<Image src={MinusSVG} alt="" width="32" height="32" sizes="100vw" />
									</IconButton>
									<ThemeProvider theme={quantityTheme}>
										<TextField
											variant="outlined"
											value={quantity}
											inputProps={{ min: 1, max: offer_max_quantity ? offer_max_quantity : 100 }}
											onChange={(e) => {
												if (e.target.value) {
													setQuantity(parseInt(e.target.value));
												} else {
													setQuantity(1);
												}
											}}
											disabled
											color="primary"
										/>
									</ThemeProvider>
									<IconButton
										onClick={() => {
											setQuantity((prevState) => prevState + 1);
											setOfferTotalPrice((prevState) => {
												return prevState + offer_price;
											});
											resetTotalPriceHandler(cart_pk, '+', offer_price);
										}}
										className={Styles.iconButton}
									>
										<Image src={PlusSVG} alt="" width="32" height="32" sizes="100vw" />
									</IconButton>
								</Stack>
								<Image
									src={TrashBlackSVG}
									width={14}
									height={18}
									alt=""
									className={Styles.icon}
									onClick={() => onDelete(cart_pk, offerTotalPrice)}
								/>
							</Stack>
						</TabletAndMobile>
					</Stack>
				</Stack>
				<Desktop>
					<Stack direction="row" alignItems="center" className={Styles.quantityStack}>
						<IconButton
							onClick={() => {
								setQuantity((prevState) => {
									if (prevState === 1) {
										setOfferTotalPrice(offer_price);
										return 1;
									} else {
										setOfferTotalPrice((prevState) => {
											return prevState - offer_price;
										});
										return prevState - 1;
									}
								});
								if (quantity > 1) {
									resetTotalPriceHandler(cart_pk, '-', offer_price);
								}
							}}
							className={Styles.iconButton}
						>
							<Image src={MinusSVG} alt="" width="40" height="40" sizes="100vw" />
						</IconButton>
						<ThemeProvider theme={quantityTheme}>
							<TextField
								variant="outlined"
								value={quantity}
								inputProps={{ min: 1, max: offer_max_quantity ? offer_max_quantity : 100 }}
								onChange={(e) => {
									if (e.target.value) {
										setQuantity(parseInt(e.target.value));
									} else {
										setQuantity(1);
									}
								}}
								disabled
								color="primary"
							/>
						</ThemeProvider>
						<IconButton
							onClick={() => {
								setQuantity((prevState) => prevState + 1);
								setOfferTotalPrice((prevState) => {
									return prevState + offer_price;
								});
								resetTotalPriceHandler(cart_pk, '+', offer_price);
							}}
							className={Styles.iconButton}
						>
							<Image src={PlusSVG} alt="" width="40" height="40" sizes="100vw" />
						</IconButton>
					</Stack>
				</Desktop>
				<Desktop>
					<span className={Styles.offerPrice}>{offerTotalPrice} DH</span>
				</Desktop>
			</Stack>
			<Desktop>
				<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing="15px">
					<Button onClick={() => onDelete(cart_pk, offerTotalPrice)} color="error" className={Styles.deleteButton}>
						<Image src={TrashBlackSVG} width={14} height={18} alt="" className={Styles.icon} />
						<span>Supprimer</span>
					</Button>
				</Stack>
			</Desktop>
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
	cart_pk: number;
	onDelete: (cart_pk: number, offer_price: number) => void;
};
const RowArticleService: React.FC<RowArticleServiceType> = (props: RowArticleServiceType) => {
	const {
		cart_pk,
		offer_pk,
		offer_total_price,
		offer_picture,
		offer_title,
		shop_link,
		picked_date,
		picked_hour,
		onDelete,
	} = props;

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
						className={Styles.offerPicture}
						loading="eager"
						priority={true}
					/>
					<Stack direction="column" alignSelf="flex-start">
						<Link href={REAL_OFFER_ROUTE(shop_link, offer_pk.toString())}>
							<h4 className={Styles.offerTitle}>{offer_title}</h4>
						</Link>
						<TabletAndMobile>
							<span className={Styles.offerPrice}>{offer_total_price} DH</span>
						</TabletAndMobile>
						{picked_date && (
							<span className={Styles.offerDetails}>Date : {getDateStringFromFormatedDate(picked_date)}</span>
						)}
						{picked_hour && <span className={Styles.offerDetails}>Heure : {picked_hour.slice(0, -3)}</span>}
					</Stack>
				</Stack>
				<Desktop>
					<span className={Styles.offerPrice}>{offer_total_price} DH</span>
				</Desktop>
			</Stack>
			<Desktop>
				<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing="15px">
					<Button onClick={() => onDelete(cart_pk, offer_total_price)} color="error" className={Styles.deleteButton}>
						<Image src={TrashBlackSVG} width={14} height={18} alt="" className={Styles.icon} />
						<span>Supprimer</span>
					</Button>
				</Stack>
			</Desktop>
			<TabletAndMobile>
				<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing="15px">
					<Image
						src={TrashBlackSVG}
						width={14}
						height={18}
						alt=""
						className={Styles.icon}
						onClick={() => onDelete(cart_pk, offer_total_price)}
					/>
				</Stack>
			</TabletAndMobile>
		</Stack>
	);
};

type NonDisponibleBoxContentType = {
	for: 'Click & collect' | 'Livraison';
};
const NonDisponibleBoxContent: React.FC<NonDisponibleBoxContentType> = (props: NonDisponibleBoxContentType) => {
	return (
		<Box className={Styles.disabledClickAndCollectBox}>
			<Stack direction="row" spacing="18px" alignItems="center" justifyContent="space-between" width="100%">
				<Stack direction="column" spacing="5px">
					<span className={Styles.deliveryHeader}>{props.for}</span>
					<Stack direction="row" justifyContent="space-between" className={Styles.deliveryStackRow}>
						<span>Non disponible</span>
					</Stack>
				</Stack>
				<Stack direction="row" alignSelf="center">
					<Box className={Styles.disabledCheckBox}></Box>
				</Stack>
			</Stack>
		</Box>
	);
};

type ClickAndCollectBoxContentType = {
	shop_name: string;
	product_latitude: number;
	product_longitude: number;
	product_address: string;
	onClickHandler: (index: number) => void;
	lotIndex: number;
	active: boolean;
	setLotStates: React.Dispatch<React.SetStateAction<Array<CartClickAndCollectDeliveriesStateType>>>;
};
const ClickAndCollectBoxContent: React.FC<ClickAndCollectBoxContentType> = (props: ClickAndCollectBoxContentType) => {
	const {
		product_latitude,
		product_longitude,
		shop_name,
		product_address,
		onClickHandler,
		active,
		setLotStates,
		lotIndex,
	} = props;

	const onBoxClickedHandler = useCallback(() => {
		setLotStates((prevState) => {
			const oldArray = prevState[lotIndex];
			oldArray.click_and_collects = !active;
			const oldDeliveriesLength = oldArray.deliveries.length;
			const newDeliveries: Array<boolean> = [];
			for (let i = 0; i < oldDeliveriesLength; i++) {
				newDeliveries.push(false);
			}
			oldArray.deliveries = newDeliveries;
			prevState[lotIndex] = oldArray;
			return prevState;
		});
		onClickHandler(lotIndex);
	}, [active, lotIndex, onClickHandler, setLotStates]);

	return (
		<Box className={Styles.clickAndDeliveriesBox} onClick={onBoxClickedHandler}>
			<Stack direction="row" spacing="18px" justifyContent="space-between" width="100%">
				<Stack direction="column" spacing="18px" width="100%">
					<TabletAndMobile>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="column" spacing="5px">
								<span className={Styles.deliveryHeader}>Click & collect</span>
								<Stack direction="row" justifyContent="space-between" className={Styles.deliveryStackRow}>
									<span>Dès demain</span>
									<span>Gratuit</span>
								</Stack>
							</Stack>
							{active ? (
								<Image src={ActiveCheckBlue} width="24" height="24" alt="" sizes="100vw" />
							) : (
								<Box className={Styles.disabledCheckBox}></Box>
							)}
						</Stack>
					</TabletAndMobile>
					<Desktop>
						<Stack direction="column" spacing="5px">
							<span className={Styles.deliveryHeader}>Click & collect</span>
							<Stack direction="row" justifyContent="space-between" className={Styles.deliveryStackRow}>
								<span>Dès demain</span>
								<span>Gratuit</span>
							</Stack>
						</Stack>
					</Desktop>
					<Stack direction="row" spacing="18px" className={Styles.miniMapStackWrapper}>
						<div className={Styles.miniMapWrapper}>
							<CustomMap
								readOnly={true}
								position={{
									lat: product_latitude,
									lng: product_longitude,
								}}
								zoneBy="A"
								kmRadius={13}
								hideLocalisationName={true}
							/>
						</div>
						<Stack direction="column" spacing="5px" className={Styles.miniMapAddress}>
							<span className={Styles.shopNameAddress}>{shop_name}</span>
							<span className={Styles.clickAndCollectAddress}>{product_address}</span>
						</Stack>
					</Stack>
				</Stack>
				<Desktop>
					<Stack direction="row" alignSelf="center">
						{active ? (
							<Image src={ActiveCheckBlue} width="24" height="24" alt="" sizes="100vw" />
						) : (
							<Box className={Styles.disabledCheckBox}></Box>
						)}
					</Stack>
				</Desktop>
			</Stack>
		</Box>
	);
};

type DeliveriesBoxContentType = {
	delivery_city: Array<{ pk: number; name: string }>;
	delivery_days: number;
	delivery_price: number;
	onClickHandler: (active: boolean, delivery_price: number, index: number, delivery_pk: number) => void;
	deliveryIndex: number;
	lotIndex: number;
	active: boolean;
	setLotStates: React.Dispatch<React.SetStateAction<Array<CartClickAndCollectDeliveriesStateType>>>;
	delivery_pk: number;
};
const DeliveriesBoxContent: React.FC<DeliveriesBoxContentType> = (props: DeliveriesBoxContentType) => {
	const {
		onClickHandler,
		delivery_city,
		delivery_price,
		delivery_days,
		lotIndex,
		setLotStates,
		deliveryIndex,
		active,
		delivery_pk,
	} = props;

	const onBoxClickedHandler = useCallback(() => {
		setLotStates((prevState) => {
			const oldArray = prevState[lotIndex];
			oldArray.click_and_collects = false;
			if (oldArray.deliveries) {
				const oldDeliveries: Array<boolean> = [];
				oldArray.deliveries.map((delivery, index) => {
					if (index === deliveryIndex) {
						oldDeliveries.push(!active);
					} else {
						oldDeliveries.push(false);
					}
				});
				oldArray.deliveries = oldDeliveries;
			}
			prevState[lotIndex] = oldArray;
			return prevState;
		});
		onClickHandler(!active, delivery_price, lotIndex, delivery_pk);
	}, [setLotStates, onClickHandler, active, delivery_price, delivery_pk, lotIndex, deliveryIndex]);

	return (
		<Box className={Styles.clickAndDeliveriesBox} onClick={onBoxClickedHandler}>
			<Stack direction="row" spacing="18px" justifyContent="space-between" width="100%">
				<Stack direction="column" spacing="18px" width="100%">
					<Stack direction="column" spacing="0">
						<span className={Styles.deliveryHeader}>{getCitiesFromArray(delivery_city).join(', ')}</span>
						<Stack direction="row" justifyContent="space-between" className={Styles.deliveryStackRow}>
							<span>{getDateFromDayCountNumber(delivery_days)}</span>
							<span>{delivery_price > 0 ? `${delivery_price} DH` : 'Gratuit'}</span>
						</Stack>
					</Stack>
				</Stack>
				<Stack direction="row" alignSelf="center">
					{active ? (
						<Image src={ActiveCheckBlue} width="24" height="24" alt="" sizes="100vw" />
					) : (
						<Box className={Styles.disabledCheckBox}></Box>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

type PaimentBoxContentType = {
	totalPrice: number;
	showGratuitDeliveryOne: boolean;
	deliveriesTotalPriceOne: number;
	showGratuitDeliveryTwo: boolean;
	deliveriesTotalPriceTwo: number;
	onSubmit: () => void;
	isSubmitActive: boolean;
};

const PaimentBoxContent: React.FC<PaimentBoxContentType> = (props: PaimentBoxContentType) => {
	const {
		totalPrice,
		showGratuitDeliveryOne,
		deliveriesTotalPriceOne,
		deliveriesTotalPriceTwo,
		showGratuitDeliveryTwo,
		isSubmitActive,
		onSubmit,
	} = props;

	return (
		<Box className={Styles.paimentBox}>
			<Stack direction="column" spacing="22px">
				<Stack direction="column" spacing="50px">
					<Stack direction="column" spacing="18px">
						<Stack direction="row" justifyContent="space-between" className={Styles.priceDetails}>
							<span>Total des produit(s)</span>
							<span>{totalPrice} DH</span>
						</Stack>
						{showGratuitDeliveryOne && deliveriesTotalPriceOne === 0 && (
							<Stack direction="row" justifyContent="space-between" className={Styles.livraisonPriceGratuitDetails}>
								<span>Livraison Lot 1</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{showGratuitDeliveryTwo && deliveriesTotalPriceTwo === 0 && (
							<Stack direction="row" justifyContent="space-between" className={Styles.livraisonPriceGratuitDetails}>
								<span>Livraison Lot 2</span>
								<span>GRATUITE</span>
							</Stack>
						)}
						{deliveriesTotalPriceOne > 0 && (
							<Stack direction="row" justifyContent="space-between" className={Styles.priceDetails}>
								<span>Livraison Lot 1</span>
								<span>{deliveriesTotalPriceOne} DH</span>
							</Stack>
						)}
						{deliveriesTotalPriceTwo > 0 && (
							<Stack direction="row" justifyContent="space-between" className={Styles.priceDetails}>
								<span>Livraison Lot 2</span>
								<span>{deliveriesTotalPriceTwo} DH</span>
							</Stack>
						)}
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.totalPrice}>
							<span>Total</span>
							<span>{totalPrice + deliveriesTotalPriceOne + deliveriesTotalPriceTwo} DH</span>
						</Stack>
					</Stack>
					<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.paimentBoxRootStack}>
						<PrimaryButton buttonText="Continuer" active={isSubmitActive} onClick={onSubmit} />
					</Stack>
				</Stack>
				<Stack direction="row" spacing="10px" alignItems="center">
					<Image src={AlertBlackSVG} alt="" sizes="100vw" width="24" height="24" />
					<span className={Styles.fraisDuPort}>
						Les frais de ports sont calculés automatiquement. Le vendeur peut vous demandez un complément en cas de
						différence trop importante.
					</span>
				</Stack>
			</Stack>
		</Box>
	);
};

type IndexPropsType = {
	pageProps: {
		data: CartGetDetailsType;
		unique_id: string;
	};
};

const Index: NextPage<IndexPropsType> = (props: IndexPropsType) => {
	const { data, unique_id } = props.pageProps;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [totalPrice, setTotalPrice] = useState<number>(data.total_price);
	const [onlyServices, setOnlyServices] = useState<boolean>(false);
	const [showGratuitDeliveryOne, setShowGratuitDeliveryOne] = useState<boolean>(false);
	const [showGratuitDeliveryTwo, setShowGratuitDeliveryTwo] = useState<boolean>(false);
	const [deliveriesTotalPriceOne, setDeliveriesTotalPriceOne] = useState<number>(0);
	const [deliveriesTotalPriceTwo, setDeliveriesTotalPriceTwo] = useState<number>(0);
	const [deliveryPk, setDeliveryPk] = useState<number | null>(null);
	const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
	const [lotStates, setLotStates] = useState<Array<CartClickAndCollectDeliveriesStateType>>([]);

	const resetTotalPriceHandler = useCallback(
		(cart_pk: number, actionClicked: '-' | '+', price: number) => {
			if (actionClicked === '+') {
				const action = cartPatchCartQuantityAction(cart_pk, unique_id, '+');
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							setTotalPrice((prevState) => prevState + price);
						}
					},
				});
			} else {
				const action = cartPatchCartQuantityAction(cart_pk, unique_id, '-');
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							setTotalPrice((prevState) => prevState - price);
						}
					},
				});
			}
		},
		[dispatch, unique_id],
	);

	const areAllTrue = useCallback((arr: Array<boolean>) => {
		return arr.every((element) => element);
	}, []);

	const reloadData = useCallback(() => {
		if (data.results.length > 0 && data.results.length > lotStates.length) {
			const servicesList: Array<boolean> = [];
			data.results.map((result) => {
				const cart_pks: Array<number> = [];
				const click_and_collects = false;
				const deliveries: Array<boolean> = [];
				if (result.lot.global_offer_type === 'S') {
					servicesList.push(true);
				} else {
					servicesList.push(false);
				}
				result.lot.cart_details.map((article) => {
					cart_pks.push(article.cart_pk);
				});
				if (result.lot.deliveries) {
					result.lot.deliveries.map((_) => {
						(deliveries as Array<boolean>).push(false);
					});
				}
				setLotStates((prevState) => {
					return [
						...prevState,
						{
							cart_pks: cart_pks,
							click_and_collects: click_and_collects,
							deliveries: deliveries,
						},
					];
				});
			});
			setOnlyServices(areAllTrue(servicesList));
		}
		if (onlyServices) {
			setIsSubmitActive(true);
		} else {
			if (lotStates.length === 1) {
				if (showGratuitDeliveryOne || deliveriesTotalPriceOne > 0) {
					setIsSubmitActive(true);
				} else {
					setIsSubmitActive(false);
				}
			} else if (
				lotStates.length === 2 &&
				(lotStates[0].deliveries.length === 0 || lotStates[1].deliveries.length === 0)
			) {
				if (showGratuitDeliveryOne || deliveriesTotalPriceOne > 0) {
					setIsSubmitActive(true);
				} else {
					setIsSubmitActive(false);
				}
			} else if (lotStates.length >= 3) {
				if (
					(showGratuitDeliveryOne || deliveriesTotalPriceOne > 0) &&
					(showGratuitDeliveryTwo || deliveriesTotalPriceTwo > 0)
				) {
					setIsSubmitActive(true);
				} else {
					setIsSubmitActive(false);
				}
			}
		}
	}, [
		areAllTrue,
		data.results,
		deliveriesTotalPriceOne,
		deliveriesTotalPriceTwo,
		lotStates,
		onlyServices,
		showGratuitDeliveryOne,
		showGratuitDeliveryTwo,
	]);

	const onDeleteHandler = useCallback(
		(cart_pk: number, offer_price: number) => {
			const action = cartDeleteAction(cart_pk, unique_id);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
					if (!error && !cancelled && data) {
						dispatch(cartGetCartCounterAction(unique_id));
						setTotalPrice((prevState) => prevState - offer_price);
						// refreshPageData();
						setShowGratuitDeliveryOne(false);
						setDeliveriesTotalPriceOne(0);
						setShowGratuitDeliveryTwo(false);
						setDeliveriesTotalPriceTwo(0);
						// router.replace(router.asPath, undefined, { shallow: false }).then();
						router.replace(router.asPath).then(() => {
							setLotStates([]);
						});
					}
				},
			});
		},
		[dispatch, router, unique_id],
	);

	const onDeliveryClickedHandler = useCallback(
		(active: boolean, delivery_price: number, index: number, delivery_pk: number) => {
			if (index === 0) {
				setShowGratuitDeliveryOne(false);
				if (active) {
					setDeliveryPk(delivery_pk);
					setDeliveriesTotalPriceOne(delivery_price);
				} else {
					setDeliveriesTotalPriceOne((prevState) => prevState - delivery_price);
				}
			} else if (index === 1) {
				setShowGratuitDeliveryTwo(false);
				if (active) {
					setDeliveryPk(delivery_pk);
					setDeliveriesTotalPriceTwo(delivery_price);
				} else {
					setDeliveriesTotalPriceTwo((prevState) => prevState - delivery_price);
				}
			}
		},
		[],
	);

	const onClickAndCollectClickedHandler = useCallback((index: number) => {
		if (index === 0) {
			setDeliveriesTotalPriceOne(0);
			setShowGratuitDeliveryOne((prevState) => !prevState);
		} else if (index === 1) {
			setDeliveriesTotalPriceTwo(0);
			setShowGratuitDeliveryTwo((prevState) => !prevState);
		}
	}, []);

	useEffect(() => {
		reloadData();
	}, [reloadData]);

	const onSubmitHandler = useCallback(() => {
		const shop_pk = router.query.shop_pk as string;
		let picked_click_and_collect = '';
		let picked_deliveries = '';
		const lot_pks: Array<number> = [];
		lotStates.map((lot) => {
			lot.cart_pks.map((pk) => {
				lot_pks.push(pk);
				if (lot.click_and_collects) {
					picked_click_and_collect += '1,';
					picked_deliveries += '0,';
				} else {
					if (lot.deliveries.length >= 1) {
						picked_click_and_collect += '0,';
						picked_deliveries += '1,';
					} else {
						picked_click_and_collect += '0,';
						picked_deliveries += '0,';
					}
				}
			});
		});
		const action = cartSetLocalCartOrderAction({
			shop_pk: parseInt(shop_pk),
			delivery_pk: deliveryPk,
			picked_click_and_collect: picked_click_and_collect.slice(0, -1),
			picked_deliveries: picked_deliveries.slice(0, -1),
			whichFormik: data.formik,
			showGratuitDeliveryOne: showGratuitDeliveryOne,
			deliveriesTotalPriceOne: deliveriesTotalPriceOne,
			deliveriesTotalPriceTwo: deliveriesTotalPriceTwo,
			showGratuitDeliveryTwo: showGratuitDeliveryTwo,
			totalPrice: totalPrice,
			lot_pks: lot_pks,
		});
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					router.push(PANIER_ORDER_BY_SHOP_PK(parseInt(shop_pk))).then();
				}
			},
		});
	}, [data.formik, deliveriesTotalPriceOne, deliveriesTotalPriceTwo, deliveryPk, dispatch, lotStates, router, showGratuitDeliveryOne, showGratuitDeliveryTwo, totalPrice]);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="row" spacing="80px" justifyContent="space-between" className={Styles.paimentStack}>
					<Stack direction="column" spacing="48px" width="100%" className={Styles.rootStack}>
						<h2 className={Styles.header}>
							Mon panier <span>({data.offers_count})</span>
						</h2>
						<ThemeProvider theme={CartAccordionTheme()}>
							<Stack direction="column" spacing="48px" width="100%">
								{data.results.map((result, rootIndex) => {
									let local_shop_name = '';
									return (
										<Stack direction="column" key={rootIndex}>
											<AccordionCartContent title={`Lot n°${rootIndex + 1}`}>
												<Stack direction="column" spacing="24px">
													<Stack direction="column" spacing="12px">
														{result.lot.cart_details.map((offer, lotIndex) => {
															const {
																cart_pk,
																offer_pk,
																offer_title,
																offer_type,
																offer_details,
																offer_price,
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
																		cart_pk={cart_pk}
																		onDelete={onDeleteHandler}
																		resetTotalPriceHandler={resetTotalPriceHandler}
																		offer_price={offer_price}
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
																		cart_pk={cart_pk}
																		onDelete={onDeleteHandler}
																	/>
																);
															} else {
																return null;
															}
														})}
													</Stack>
													{result.lot.global_offer_type === 'V' && (
														<Stack direction="column" spacing="12px">
															{result.lot.click_and_collect &&
															result.lot.click_and_collect.product_longitude &&
															result.lot.click_and_collect.product_address &&
															result.lot.click_and_collect.product_latitude ? (
																<ClickAndCollectBoxContent
																	onClickHandler={onClickAndCollectClickedHandler}
																	product_address={result.lot.click_and_collect.product_address}
																	product_latitude={result.lot.click_and_collect.product_latitude}
																	product_longitude={result.lot.click_and_collect.product_longitude}
																	shop_name={local_shop_name}
																	lotIndex={rootIndex}
																	setLotStates={setLotStates}
																	active={lotStates.length > 0 ? lotStates[rootIndex].click_and_collects : false}
																/>
															) : (
																<NonDisponibleBoxContent for="Click & collect" />
															)}
															{result.lot.deliveries ? (
																<Stack direction="column" spacing="12px">
																	{result.lot.deliveries.map((delivery, deliveriesIndex) => {
																		return (
																			<DeliveriesBoxContent
																				key={deliveriesIndex}
																				delivery_pk={delivery.pk}
																				onClickHandler={onDeliveryClickedHandler}
																				delivery_price={delivery.delivery_price}
																				delivery_days={delivery.delivery_days}
																				delivery_city={delivery.delivery_city}
																				lotIndex={rootIndex}
																				deliveryIndex={deliveriesIndex}
																				setLotStates={setLotStates}
																				active={
																					lotStates.length > 0
																						? lotStates[rootIndex].deliveries[deliveriesIndex]
																						: false
																				}
																			/>
																		);
																	})}
																</Stack>
															) : (
																<NonDisponibleBoxContent for="Livraison" />
															)}
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
					<PaimentBoxContent
						deliveriesTotalPriceOne={deliveriesTotalPriceOne}
						deliveriesTotalPriceTwo={deliveriesTotalPriceTwo}
						totalPrice={totalPrice}
						isSubmitActive={isSubmitActive}
						showGratuitDeliveryOne={showGratuitDeliveryOne}
						showGratuitDeliveryTwo={showGratuitDeliveryTwo}
						onSubmit={onSubmitHandler}
					/>
				</Stack>
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

export default Index;
