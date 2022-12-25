import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './index.module.sass';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../../utils/routes';
import { AxiosInstance } from 'axios';
import {
	Desktop,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	TabletAndMobile,
} from '../../../../../utils/helpers';
import { getApi } from '../../../../../store/services/_init/_initAPI';
import {
	OrderPostServiceRootWithCoordinates,
	OrdersGetDetailsResponseType,
	OrdersGetOrdersListType,
	OrderStatusType,
} from '../../../../../types/order/orderTypes';
import { Box, Divider, Stack, ThemeProvider } from '@mui/material';
import UserMainNavigationBar from '../../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../../../components/layouts/footer/customFooter';
import { getDateStringFromFormatedDate, getOrderStatus } from '../../../../../utils/rawData';
import { CartAccordionTheme, customOrderActionsModalTheme } from '../../../../../utils/themes';
import { AccordionCartContent } from '../../../../panier/[shop_pk]';
import Image from 'next/image';
import { CartPostProductRoot } from '../../../../../types/cart/cartTypes';
import PrimaryButton from '../../../../../components/htmlElements/buttons/primaryButton/primaryButton';
import ClickAndCollectBlackSVG from '../../../../../public/assets/svgs/globalIcons/click-and-collect-black.svg';
import DeliveryBlackSVG from '../../../../../public/assets/svgs/globalIcons/delivery-black.svg';
import LieuServiceBlackSVG from '../../../../../public/assets/svgs/globalIcons/lieu-service-black.svg';
import RemarqueBlackSVG from '../../../../../public/assets/svgs/globalIcons/remarque-black.svg';
import FactureBlackSVG from '../../../../../public/assets/svgs/globalIcons/facture-black.svg';
import { useAppDispatch } from '../../../../../utils/hooks';
import { useRouter } from 'next/router';
import CustomSwipeModal from '../../../../../components/desktop/modals/rightSwipeModal/customSwipeModal';
import { SagaCallBackResponseType } from "../../../../../types/_init/_initTypes";
import {
	orderPostAcceptOrderAction,
	orderPostCancelOrderAction
} from "../../../../../store/actions/order/orderActions";

type OrderSummaryBoxContentType = {
	totalPrice: number;
	total_delivery_price: number | null;
	onAcceptHandler: () => void;
	onCancelHandler: () => void;
	note: string | null;
	order_status: OrderStatusType;
};
const OrderSummaryBoxContent: React.FC<OrderSummaryBoxContentType> = (props: OrderSummaryBoxContentType) => {
	const { totalPrice, note, onCancelHandler, onAcceptHandler, total_delivery_price, order_status } = props;

	return (
		<Box className={Styles.orderSummaryBox}>
			<Stack direction="column" spacing="18px">
				<Stack direction="column" spacing="18px">
					{note && (
						<Stack direction="column" spacing="18px">
							<Stack direction="column" spacing="10px">
								<Stack direction="row" spacing="10px" alignItems="center">
									<Image src={RemarqueBlackSVG} alt="" width={21} height={18} />
									<span className={Styles.summaryBoxTitles}>Remarque</span>
								</Stack>
								<span className={Styles.note}>{note}</span>
							</Stack>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
						</Stack>
					)}
					<Stack direction="column" spacing="18px">
						<Stack direction="row" spacing="10px" alignItems="center">
							<Image src={FactureBlackSVG} alt="" width={21} height={18} />
							<span className={Styles.summaryBoxTitles}>Facture</span>
						</Stack>
						<Stack direction="row" justifyContent="space-between" className={Styles.priceDetails}>
							<span>Total des produit(s)</span>
							<span>{totalPrice} DH</span>
						</Stack>
						<Stack
							direction="row"
							justifyContent="space-between"
							className={`${
								total_delivery_price && total_delivery_price > 0
									? Styles.priceDetails
									: Styles.livraisonPriceGratuitDetails
							}`}
						>
							<span>Livraison</span>
							<span>
								{total_delivery_price && total_delivery_price > 0 ? `${total_delivery_price} DH` : 'GRATUITE'}
							</span>
						</Stack>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="column" justifyContent="center" alignItems="center" className={Styles.totalPrice}>
							<span>Total</span>
							<span>{total_delivery_price ? total_delivery_price + totalPrice : totalPrice} DH</span>
						</Stack>
					</Stack>
				</Stack>
				{order_status === 'IP' && (
					<Stack
						direction="column"
						justifyContent="center"
						spacing="18px"
						alignItems="center"
						className={Styles.orderBoxRootStack}
					>
						<PrimaryButton buttonText="Accepter commande" active={true} onClick={onAcceptHandler} />
						<PrimaryButton
							buttonText="Annuler commande"
							cssClass={Styles.cancelButton}
							active={true}
							onClick={onCancelHandler}
						/>
					</Stack>
				)}
			</Stack>
		</Box>
	);
};

type RowOrderDetailProductType = {
	offer_thumbnail: string;
	offer_title: string;
	picked_color: string | null;
	picked_size: string | null;
	picked_quantity: number;
	offer_total_price: number;
	order_status: OrderStatusType;
};

const RowOrderDetailProduct: React.FC<RowOrderDetailProductType> = (props: RowOrderDetailProductType) => {
	const { offer_thumbnail, offer_title, picked_size, picked_color, picked_quantity, offer_total_price, order_status } =
		props;
	const { text, color } = getOrderStatus(order_status);
	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
			<Stack direction="row" spacing="18px" alignItems="center" width="100%" minWidth="300px">
				<Image src={offer_thumbnail} alt={offer_title} width={96} height={96} className={Styles.offerPicture} />
				<TabletAndMobile>
					<Stack direction="column" spacing="5px">
						<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
							{text}
						</span>
						<Stack direction="column" spacing="0px">
							<h4 className={Styles.offerTitle}>{offer_title}</h4>
							<span className={Styles.offerPrice}>{offer_total_price} DH</span>
							{picked_color && <span className={Styles.offerDetails}>Couleur : {picked_color}</span>}
							{picked_size && <span className={Styles.offerDetails}>Taille : {picked_size}</span>}
							<span className={Styles.offerDetails}>Quantité : {picked_quantity}</span>
						</Stack>
					</Stack>
				</TabletAndMobile>
				<Desktop>
					<Stack direction="column" textAlign="start" alignItems="flex-start">
						<h4 className={Styles.offerTitle}>{offer_title}</h4>
						{picked_color && <span className={Styles.offerDetails}>Couleur : {picked_color}</span>}
						{picked_size && <span className={Styles.offerDetails}>Taille : {picked_size}</span>}
					</Stack>
				</Desktop>
			</Stack>
			<Desktop>
				<Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
					<Stack direction="row" alignItems="center" className={Styles.quantityStack}>
						<span className={Styles.offerQuantity}>{picked_quantity}</span>
					</Stack>
					<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
						{text}
					</span>
					<span className={Styles.offerPrice}>{offer_total_price} DH</span>
				</Stack>
			</Desktop>
		</Stack>
	);
};

type RowOrderDetailServiceType = {
	offer_thumbnail: string;
	offer_title: string;
	picked_hour: string | null;
	picked_date: Date | null;
	offer_total_price: number;
	order_status: OrderStatusType;
};
const RowOrderDetailService: React.FC<RowOrderDetailServiceType> = (props: RowOrderDetailServiceType) => {
	const { offer_total_price, offer_thumbnail, offer_title, picked_date, picked_hour, order_status } = props;

	const { text, color } = getOrderStatus(order_status);
	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
			<Stack direction="row" spacing="18px" alignItems="center" width="100%" minWidth="300px">
				<Image
					src={offer_thumbnail}
					alt={offer_title}
					width="96"
					height="96"
					sizes="100vw"
					className={Styles.offerPicture}
					loading="eager"
					priority={true}
				/>
				<Stack direction="column" spacing="5px">
					<TabletAndMobile>
						<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
							{text}
						</span>
					</TabletAndMobile>
					<Stack direction="column" spacing="0px">
						<h4 className={Styles.offerTitle}>{offer_title}</h4>
						<TabletAndMobile>
							<span className={Styles.offerPrice}>{offer_total_price} DH</span>
						</TabletAndMobile>
						{picked_date && (
							<span className={Styles.offerDetails}>Date : {getDateStringFromFormatedDate(picked_date)}</span>
						)}
						{picked_hour && <span className={Styles.offerDetails}>Heure : {picked_hour.slice(0, -3)}</span>}
					</Stack>
				</Stack>
			</Stack>
			<Desktop>
				<Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
					<Stack direction="row" alignItems="center" className={Styles.quantityStack}>
						<span></span>
					</Stack>
					<span className={Styles.orderStatus} style={{ backgroundColor: color }}>
						{text}
					</span>
					<span className={Styles.offerPrice}>{offer_total_price} DH</span>
				</Stack>
			</Desktop>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: OrdersGetOrdersListType;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [acceptModalState, setAcceptModalState] = useState<boolean>(false);
	const [cancelModalState, setCancelModalState] = useState<boolean>(false);

	const onAcceptHandleCloseModal = useCallback(() => {
		setAcceptModalState(false);
	}, []);

	const onCancelHandleCloseModal = useCallback(() => {
		setCancelModalState(false);
	}, []);

	const onAcceptHandlerShowModal = useCallback(() => {
		setAcceptModalState(true);
	}, []);

	const onCancelHandlerShowModal = useCallback(() => {
		setCancelModalState(true);
	}, []);

	const onAcceptHandler = useCallback((order_pk: number) => {
		const action = orderPostAcceptOrderAction(order_pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					router.replace(router.asPath).then(() => {
						setAcceptModalState(false);
					});
				}
			},
		});
	}, [dispatch, router]);

	const onCancelHandler = useCallback((order_pk: number) => {
		const action = orderPostCancelOrderAction(order_pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					router.replace(router.asPath).then(() => {
						setCancelModalState(false);
					});
				}
			},
		});
	}, [dispatch, router]);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="row" spacing="80px" justifyContent="space-between" className={Styles.orderStack}>
					<Stack direction="column" spacing="0px" width="100%" className={Styles.rootStack}>
						<Stack direction="column" spacing="0px">
							<h2 className={Styles.header}>{`${data.first_name} ${data.last_name}`}</h2>
							<Stack direction="row" spacing="5px" alignItems="center" className={Styles.orderTopStack}>
								<span>Commande N° {data.order_number}</span>
								<Desktop>
									<span>•</span>
								</Desktop>
								<span>{getDateStringFromFormatedDate(data.order_date)}</span>
							</Stack>
						</Stack>
						<ThemeProvider theme={CartAccordionTheme()}>
							<Stack direction="column" spacing="0px" width="100%">
								{data.order_details.map((order, index) => {
									const {
										offer_thumbnail,
										offer_title,
										offer_type,
										offer_details,
										picked_click_and_collect,
										click_and_collect,
										picked_delivery,
										delivery,
										offer_total_price,
									} = order;
									return (
										<Stack direction="column" key={index}>
											<AccordionCartContent title={''}>
												{offer_type === 'V' ? (
													<Stack direction="column" spacing="12px">
														<RowOrderDetailProduct
															picked_color={(offer_details as CartPostProductRoot).picked_color}
															picked_quantity={(offer_details as CartPostProductRoot).picked_quantity}
															offer_thumbnail={offer_thumbnail}
															offer_title={offer_title}
															offer_total_price={offer_total_price}
															order_status={data.order_status}
															picked_size={(offer_details as CartPostProductRoot).picked_size}
														/>
														<Divider orientation="horizontal" flexItem className={Styles.divider} />
														<Stack direction="column" spacing="10px">
															{picked_click_and_collect && click_and_collect ? (
																<Stack direction="row" spacing="18px">
																	<Image src={ClickAndCollectBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																	<Stack direction="column" spacing="10px">
																		<span className={Styles.orderDetailTitle}>Click & collect</span>
																		<span className={Styles.orderUserData}>{click_and_collect.product_address}</span>
																	</Stack>
																</Stack>
															) : (
																picked_delivery &&
																delivery && (
																	<Stack direction="row" spacing="18px">
																		<Image src={DeliveryBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																		<Stack direction="column" spacing="10px">
																			<Stack direction="column" spacing="0px">
																				<span className={Styles.orderUserDataHeader}>
																					{data.first_name} {data.last_name}
																				</span>
																				<span className={Styles.orderUserData}>{delivery.address}</span>
																				<span className={Styles.orderUserData}>{delivery.city}</span>
																				<span className={Styles.orderUserData}>{delivery.zip_code}</span>
																				<span className={Styles.orderUserData}>{delivery.country}</span>
																				<span className={Styles.orderUserData}>{delivery.phone}</span>
																			</Stack>
																		</Stack>
																	</Stack>
																)
															)}
														</Stack>
													</Stack>
												) : offer_type === 'S' ? (
													<Stack direction="column" spacing="12px">
														<RowOrderDetailService
															order_status={data.order_status}
															offer_thumbnail={offer_thumbnail}
															offer_total_price={offer_total_price}
															offer_title={offer_title}
															picked_hour={(offer_details as OrderPostServiceRootWithCoordinates).picked_hour}
															picked_date={(offer_details as OrderPostServiceRootWithCoordinates).picked_date}
														/>
														{offer_details && (
															<Stack direction="row" spacing="18px">
																<Image src={LieuServiceBlackSVG} alt="" width="24" height="24" sizes="100vw" />
																<Stack direction="column" spacing="10px">
																	<span className={Styles.orderDetailTitle}>Lieu</span>
																	<span className={Styles.orderUserData}>
																		{(offer_details as OrderPostServiceRootWithCoordinates).service_address}
																	</span>
																</Stack>
															</Stack>
														)}
													</Stack>
												) : null}
											</AccordionCartContent>
										</Stack>
									);
								})}
							</Stack>
						</ThemeProvider>
					</Stack>
					<OrderSummaryBoxContent
						onAcceptHandler={onAcceptHandlerShowModal}
						onCancelHandler={onCancelHandlerShowModal}
						total_delivery_price={data.highest_delivery_price}
						totalPrice={data.total_price}
						order_status={data.order_status}
						note={data.note}
					/>
				</Stack>
			</main>
			{/* Accept Modal */}
			<CustomSwipeModal
				open={acceptModalState}
				transition
				direction="up"
				handleClose={onAcceptHandleCloseModal}
				onBackdrop={onAcceptHandleCloseModal}
				showCloseIcon={false}
				fullScreen={false}
				theme={customOrderActionsModalTheme()}
				cssClasse={Styles.actionsModal}
			>
				<Stack direction="column" alignItems="center" justifyContent="center" className={Styles.modalRootStack}>
					<Stack direction="column" spacing="48px">
						<Stack direction="column" spacing="12px">
							<span className={Styles.modalTitle}>Accepter la commande</span>
							<span className={Styles.modalBody}>Êtes-vous prêt à traiter cette commande ?</span>
						</Stack>
						<Stack
							direction="column"
							justifyContent="center"
							spacing="18px"
							alignItems="center"
							className={Styles.modalActionsRootStack}
						>
							<PrimaryButton
								buttonText="Accepter"
                active={true}
								onClick={() => onAcceptHandler(data.pk)}
							/>
							<PrimaryButton
								cssClass={Styles.cancelAcceptButton}
								buttonText="Annuler"
								active={true}
								onClick={onAcceptHandleCloseModal}
							/>
						</Stack>
					</Stack>
				</Stack>
			</CustomSwipeModal>
			{/* Cancel Modal */}
			<CustomSwipeModal
				open={cancelModalState}
				transition
				direction="up"
				handleClose={onCancelHandleCloseModal}
				onBackdrop={onCancelHandleCloseModal}
				showCloseIcon={false}
				fullScreen={false}
				theme={customOrderActionsModalTheme()}
				cssClasse={Styles.actionsModal}
			>
				<Stack direction="column" alignItems="center" justifyContent="center" className={Styles.modalRootStack}>
					<Stack direction="column" spacing="48px">
						<Stack direction="column" spacing="12px">
							<span className={Styles.modalTitle}>Annuler la commande</span>
							<span className={Styles.modalBody}>
								En appuyant sur “Annuler la commande”, vous confirmez l’annulation et ne pourrez plus revenir en
								arrière.
							</span>
						</Stack>
						<Stack
							direction="column"
							justifyContent="center"
							spacing="18px"
							alignItems="center"
							className={Styles.modalActionsRootStack}
						>
							<PrimaryButton
								cssClass={Styles.cancelAcceptButtonInverted}
								buttonText="Annuler la commande"
								active={true}
								onClick={() => onCancelHandler(data.pk)}
							/>
							<PrimaryButton
								cssClass={Styles.keepOrderButton}
								buttonText="Garder la commande"
								active={true}
								onClick={onCancelHandleCloseModal}
							/>
						</Stack>
					</Stack>
				</Stack>
			</CustomSwipeModal>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { order_pk } = context.query;
	const url = `${process.env.NEXT_PUBLIC_ORDER_GET_ORDER_DETAILS}${order_pk}/`;
	const appToken = getServerSideCookieTokens(context);
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance: AxiosInstance = isAuthenticatedInstance(appToken.initStateToken);
			const response: OrdersGetDetailsResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
					},
				};
			}
		} else {
			// redirect to login page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default Index;
