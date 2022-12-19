import React, { useEffect, useCallback, useState } from "react";
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './order.module.sass';
import { getCookie } from 'cookies-next';
import { PANIER } from '../../../utils/routes';
import { CartGetDetailsResponseType, CartGetDetailsType, userLocalCartOrderType } from "../../../types/cart/cartTypes";
import { getApi } from '../../../store/services/_init/_initAPI';
import { AxiosInstance } from 'axios';
import { allowAnyInstance, setFormikAutoErrors } from "../../../utils/helpers";
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { getAvailableCountries, getUserLocalCartOder } from "../../../store/selectors";
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Box, Divider, Stack, ThemeProvider } from '@mui/material';
import { CartAccordionTheme, coordonneeTextInputTheme, offerForWhomDropdownTheme } from "../../../utils/themes";
import CustomFooter from '../../../components/layouts/footer/customFooter';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import Image from 'next/image';
import AlertBlackSVG from '../../../public/assets/svgs/globalIcons/alert-black.svg';
import { useFormik } from "formik";
import {
	orderSSchema,
	orderVSchema,
} from "../../../utils/formValidationSchemas";
import { SagaCallBackResponseType } from "../../../types/_init/_initTypes";
import {
	cartSetLocalCartOrderCoordonneeDataAction,
	cartSetLocalCartOrderDeliveriesDataAction
} from "../../../store/actions/cart/cartActions";
import CustomTextInput from "../../../components/formikElements/customTextInput/customTextInput";
import PhoneCircularSVG from "../../../public/assets/svgs/globalIcons/phone-circular.svg";
import CustomStackIconTextInput
	from "../../../components/formikElements/customStackIconTextInput/customStackIconTextInput";
import { SelectChangeEvent } from "@mui/material/Select";
import CustomSingleCountrySelect
	from "../../../components/groupedComponents/offer/customSingleCountrySelect/customSingleCountrySelect";
import { placesGetCountriesAction } from "../../../store/actions/places/placesActions";

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
						<PrimaryButton buttonText="Continuer" active={isSubmitValid} onClick={onSubmit} />
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

type FormikContentType = {
	onSubmitHandler: () => void;
	userLocalCart: userLocalCartOrderType;
	setIsSubmitValid: React.Dispatch<React.SetStateAction<boolean>>;
	unique_id: string;
}
const LivraisonProduitFormikContent: React.FC<FormikContentType> = (props: FormikContentType) => {
	const {shop_pk, delivery_pk, picked_click_and_collect, picked_deliveries} = props.userLocalCart;
	const {unique_id, setIsSubmitValid} = props;
	const dispatch = useAppDispatch();
	const availableCountries = useAppSelector(getAvailableCountries);
	const router = useRouter();
	const formik = useFormik({
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
		onSubmit: async (values, { setSubmitting, setFieldError }) => {
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
						router.push(PANIER).then();
					}
					if (error) {
						setFormikAutoErrors({
							e: error,
							setFieldError,
						});
					}
				},
			});
			setSubmitting(false);
		},
	});

	useEffect(() => {
		if (formik.isValid && !formik.isSubmitting) {
			setIsSubmitValid(true);
		} else {
			setIsSubmitValid(false);
		}
		if (availableCountries.length === 0) {
			dispatch(placesGetCountriesAction());
		}
	}, [availableCountries.length, dispatch, formik.isSubmitting, formik.isValid, setIsSubmitValid]);

	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
			<CustomTextInput
				id="first_name"
				type="text"
				value={formik.values.first_name}
				onChange={formik.handleChange('first_name')}
				onBlur={formik.handleBlur('first_name')}
				helperText={formik.touched.first_name ? formik.errors.first_name : ''}
				error={formik.touched.first_name && Boolean(formik.errors.first_name)}
				fullWidth={false}
				size="medium"
				label="Nom"
				placeholder="Nom"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="last_name"
				type="text"
				value={formik.values.last_name}
				onChange={formik.handleChange('last_name')}
				onBlur={formik.handleBlur('last_name')}
				helperText={formik.touched.last_name ? formik.errors.last_name : ''}
				error={formik.touched.last_name && Boolean(formik.errors.last_name)}
				fullWidth={false}
				size="medium"
				label="Prénom"
				placeholder="Prénom"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="address"
				type="text"
				value={formik.values.address}
				onChange={formik.handleChange('address')}
				onBlur={formik.handleBlur('address')}
				helperText={formik.touched.address ? formik.errors.address : ''}
				error={formik.touched.address && Boolean(formik.errors.address)}
				fullWidth={false}
				size="medium"
				label="Adresse"
				placeholder="Adresse"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="city"
				type="text"
				value={formik.values.city}
				onChange={formik.handleChange('city')}
				onBlur={formik.handleBlur('city')}
				helperText={formik.touched.city ? formik.errors.city : ''}
				error={formik.touched.city && Boolean(formik.errors.city)}
				fullWidth={false}
				size="medium"
				label="Ville"
				placeholder="Ville"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="zip_code"
				type="tel"
				value={formik.values.zip_code}
				onChange={formik.handleChange('zip_code')}
				onBlur={formik.handleBlur('zip_code')}
				helperText={formik.touched.zip_code ? formik.errors.zip_code : ''}
				error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
				fullWidth={false}
				size="medium"
				label="Code Postal"
				placeholder="Code Postal"
				theme={inputTheme}
			/>
			<CustomSingleCountrySelect
				error={formik.touched.country && Boolean(formik.errors.country)}
				helperText={formik.touched.country ? formik.errors.country : ''}
				onBlur={formik.handleBlur('country')}
				onChange={(e: SelectChangeEvent) => {
					formik.handleChange('country')(e.target.value);
				}}
				value={formik.values.country}
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
				value={formik.values.phone}
				onChange={formik.handleChange('phone')}
				onBlur={formik.handleBlur('phone')}
				helperText={formik.touched.phone ? formik.errors.phone : ''}
				error={formik.touched.phone && Boolean(formik.errors.phone)}
				fullWidth={false}
				size="medium"
				label="Téléphone"
				placeholder="Téléphone"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="email"
				type="text"
				value={formik.values.email}
				onChange={formik.handleChange('email')}
				onBlur={formik.handleBlur('email')}
				helperText={formik.touched.email ? formik.errors.email : ''}
				error={formik.touched.email && Boolean(formik.errors.email)}
				fullWidth={false}
				size="medium"
				label="Email"
				placeholder="Email"
				theme={inputTheme}
			/>
		</Stack>
	);
};

const CoordonneeServiceFormikContent: React.FC<FormikContentType> = (props: FormikContentType) => {
	const {shop_pk, delivery_pk, picked_click_and_collect, picked_deliveries} = props.userLocalCart;
	const {unique_id, setIsSubmitValid} = props;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const formik = useFormik({
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
						router.push(PANIER).then();
					}
				},
			});
			setSubmitting(false);
		},
	});

	useEffect(() => {
		if (formik.isValid && !formik.isSubmitting) {
			setIsSubmitValid(true);
		} else {
			setIsSubmitValid(false);
		}
	}, [formik.isSubmitting, formik.isValid, setIsSubmitValid]);

	const inputTheme = coordonneeTextInputTheme();

	return (
		<Stack direction="column" spacing="18px" className={Styles.inputsMaxWidth}>
			<CustomTextInput
				id="first_name"
				type="text"
				value={formik.values.first_name}
				onChange={formik.handleChange('first_name')}
				onBlur={formik.handleBlur('first_name')}
				helperText={formik.touched.first_name ? formik.errors.first_name : ''}
				error={formik.touched.first_name && Boolean(formik.errors.first_name)}
				fullWidth={false}
				size="medium"
				label="Nom"
				placeholder="Nom"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="last_name"
				type="text"
				value={formik.values.last_name}
				onChange={formik.handleChange('last_name')}
				onBlur={formik.handleBlur('last_name')}
				helperText={formik.touched.last_name ? formik.errors.last_name : ''}
				error={formik.touched.last_name && Boolean(formik.errors.last_name)}
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
				value={formik.values.phone}
				onChange={formik.handleChange('phone')}
				onBlur={formik.handleBlur('phone')}
				helperText={formik.touched.phone ? formik.errors.phone : ''}
				error={formik.touched.phone && Boolean(formik.errors.phone)}
				fullWidth={false}
				size="medium"
				label="Téléphone"
				placeholder="Téléphone"
				theme={inputTheme}
			/>
			<CustomTextInput
				id="email"
				type="text"
				value={formik.values.email}
				onChange={formik.handleChange('email')}
				onBlur={formik.handleBlur('email')}
				helperText={formik.touched.email ? formik.errors.email : ''}
				error={formik.touched.email && Boolean(formik.errors.email)}
				fullWidth={false}
				size="medium"
				label="Email"
				placeholder="Email"
				theme={inputTheme}
			/>
		</Stack>
	);
};


type OrderPropsType = {
	pageProps: {
		data: CartGetDetailsType;
		unique_id: string;
	};
};
const Order: NextPage<OrderPropsType> = (props: OrderPropsType) => {
	// data for recap page
	const { data, unique_id } = props.pageProps;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userLocalCart = useAppSelector(getUserLocalCartOder);
	const [isSubmitValid, setIsSubmitValid] = useState<boolean>(false);

	const onSubmitHandler = useCallback(() => {

	}, []);

	useEffect(() => {
		if (!userLocalCart) {
			router.replace(PANIER).then();
		}
	}, [router, userLocalCart]);

	if (!userLocalCart) {
		return null;
	} else {
		return (
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<Stack direction="row" spacing="80px" justifyContent="space-between" className={Styles.paimentStack}>
						<Stack direction="column" spacing="48px" width="100%" className={Styles.rootStack}>
							<Stack direction="column" spacing="10px">
							{userLocalCart.whichFormik === 'V' ? (
								<h2 className={Styles.header}>Adresse de livraison</h2>
							) : (
								<h2 className={Styles.header}>Coordonnées</h2>
							)}
								<span className={Styles.subHeader}>Afin que le vendeur puisse vous contacter et vous remettre votre commande</span>
							</Stack>
							<ThemeProvider theme={CartAccordionTheme()}>
								<Stack direction="column" spacing="48px" onSubmit={(e) => e.preventDefault()} width="100%" component="form">
									{userLocalCart.whichFormik === 'V' ? (
										<LivraisonProduitFormikContent userLocalCart={userLocalCart} setIsSubmitValid={setIsSubmitValid} onSubmitHandler={onSubmitHandler} unique_id={unique_id} />
									) : (
										<CoordonneeServiceFormikContent userLocalCart={userLocalCart} setIsSubmitValid={setIsSubmitValid} onSubmitHandler={onSubmitHandler} unique_id={unique_id} />
									)}
								</Stack>
							</ThemeProvider>
						</Stack>
						<PaimentBoxContent
							deliveriesTotalPriceOne={userLocalCart.deliveriesTotalPriceOne}
							showGratuitDeliveryTwo={userLocalCart.showGratuitDeliveryTwo}
							showGratuitDeliveryOne={userLocalCart.showGratuitDeliveryOne}
							totalPrice={userLocalCart.totalPrice}
							deliveriesTotalPriceTwo={userLocalCart.deliveriesTotalPriceTwo}
							isSubmitValid={isSubmitValid}
							onSubmit={onSubmitHandler}
						/>
					</Stack>
				</main>
				<CustomFooter />
			</Stack>
		);
	}
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
