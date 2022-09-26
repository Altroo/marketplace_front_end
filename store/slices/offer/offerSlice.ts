import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	LocalOfferDescriptionPageType,
	OfferCategoriesType,
	OfferDeliveries,
	OfferGetMyOffersProductInterface,
	OfferGetMyOffersServiceInterface,
	OfferGetRootProductInterface,
	OfferGetRootServiceInterface,
	OfferGetVuesType,
	OfferPinType,
	OfferProductInterface,
	OfferProductLocalisation,
	OfferServiceInterface,
	OfferServiceLocalisation,
	OfferSolderInterface,
	OfferStateInterface,
	OfferTagsType
} from "../../../types/offer/offerTypes";
import { ApiErrorResponseType, PaginationResponseType } from "../../../types/_init/_initTypes";
import { apiErrorInitialState, paginationInitial } from "../_init/_initSlice";
import { HYDRATE } from "next-redux-wrapper";
// import { HYDRATE } from "next-redux-wrapper";

export const myOffersListGETApiErrorAction = createAction<ApiErrorResponseType>("myOffersListGETApiErrorAction");
export const offersPUTApiErrorAction = createAction<ApiErrorResponseType>("offersPUTApiErrorAction");
export const offersPOSTApiErrorAction = createAction<ApiErrorResponseType>("offersPOSTApiErrorAction");
export const offersDELETEApiErrorAction = createAction<ApiErrorResponseType>("offersDELETEApiErrorAction");

const clickAndCollectInitial = {
	longitude: null,
	latitude: null,
	address_name: null
};

const deliveriesInitial = {
	delivery_city_1: null,
	all_cities_1: null,
	delivery_price_1: null,
	delivery_days_1: null,
	delivery_city_2: null,
	all_cities_2: null,
	delivery_price_2: null,
	delivery_days_2: null,
	delivery_city_3: null,
	all_cities_3: null,
	delivery_price_3: null,
	delivery_days_3: null
};

const userLocalOfferInitial = {
	pk: null,
	categoriesList: [],
	title: null,
	description: null,
	pictures: [],
	forWhom: null,
	colors: null,
	sizes: null,
	quantity: null,
	tags: null,
	prix: null,
	prix_par: null,
	clickAndCollect: clickAndCollectInitial,
	deliveries: deliveriesInitial
};

const initialState: OfferStateInterface = {
	userOffers: [],
	userOffersList: paginationInitial,
	offerVuesList: {
		...paginationInitial,
		total_vues: null,
		this_month: null,
		pourcentage: null
	},
	selectedOffer: null,
	selectedSolder: {},
	selectedTags: [],
	lastUsedLocalisation: {},
	lastUsedDeliveries: {},
	// local states
	userLocalOffer: userLocalOfferInitial,
	offerApi: apiErrorInitialState
};
/*
setDeleteOfferIsLoading()
		offersDELETEApiErrorAction()
 */
const OfferSlice = createSlice({
	name: "offer",
	initialState: initialState,
	reducers: {
		appendPostOfferIsLoading: (state) => {
			state.offerApi.isAddInProgress = true;
			state.offerApi.addPromiseStatus = "PENDING";
			state.offerApi.error = apiErrorInitialState.error;
		},
		appendPostOfferState: (state, action: PayloadAction<OfferProductInterface | OfferServiceInterface>) => {
			state.userOffers.push(action.payload);
			state.offerApi.addPromiseStatus = "RESOLVED";
			state.offerApi.isAddInProgress = false;
			// return state;
		},
		setSelectedOffer: (
			state,
			action: PayloadAction<OfferGetRootProductInterface | OfferGetRootServiceInterface>
		) => {
			state.selectedOffer = action.payload;
			// return state;
		},
		setSelectedOfferTags: (state, action: PayloadAction<OfferTagsType>) => {
			state.selectedTags = action.payload;
			// return state;
		},
		setOfferLastUsedLocalisation: (
			state,
			action: PayloadAction<OfferProductLocalisation | OfferServiceLocalisation>
		) => {
			state.lastUsedLocalisation = action.payload;
			// return state;
		},
		setOfferLastThreeUsedDeliveries: (state, action: PayloadAction<OfferDeliveries>) => {
			state.lastUsedDeliveries = action.payload.deliveries;
			// return state;
		},
		setMyOffersList: (
			state,
			action: PayloadAction<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>
		) => {
			const { next, previous, count, results } = action.payload;
			state.userOffersList.count = count;
			state.userOffersList.next = next;
			state.userOffersList.previous = previous;
			for (let i = 0; i < results.length; i++) {
				state.userOffersList.results.push(results[i]);
			}
			// return state;
		},
		setMyOffersFirstPageListIsLoading: (state) => {
			state.offerApi.isFetchInProgress = true;
			state.offerApi.fetchPromiseStatus = "PENDING";
			state.offerApi.error = apiErrorInitialState.error;
			// return state;
		},
		setMyOffersFirstPageList: (
			state,
			action: PayloadAction<PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>>
		) => {
			const { next, previous, count, results } = action.payload;
			state.userOffersList.count = count;
			state.userOffersList.next = next;
			state.userOffersList.previous = previous;
			state.userOffersList.results = results;
			state.offerApi.fetchPromiseStatus = "RESOLVED";
			state.offerApi.isFetchInProgress = false;
			// return state;
		},
		setMyOffersFirstPageListError: (state, action: PayloadAction<ApiErrorResponseType>) => {
			state.offerApi.error = action.payload.error;
			state.offerApi.fetchPromiseStatus = "REJECTED";
			state.offerApi.isFetchInProgress = false;
			state.userOffersList = paginationInitial;
			// return state;
		},
		setPutOfferIsLoading: (state) => {
			state.offerApi.isEditInProgress = true;
			state.offerApi.editPromiseStatus = "PENDING";
			state.offerApi.error = apiErrorInitialState.error;
		},
		setPutOffer: (state, action: PayloadAction<OfferProductInterface | OfferServiceInterface>) => {
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex] = action.payload;
			}
			const userOffersListIndex = state.userOffersList.results.findIndex((item) => item.pk === action.payload.pk);
			const updatedOffer = state.userOffersList.results[userOffersListIndex];
			if (userOffersListIndex >= 0) {
				updatedOffer.title = action.payload.title;
				//*** thumbnail will be updated via ws
				// updatedOffer.thumbnail = action.payload.picture_1_thumb
				updatedOffer.price = parseInt(action.payload.price as string);
				// const detailsOffer = updatedOffer.details_offer;
				// check if it's a product
				// if (
				// 	action.payload.offer_type === 'V' &&
				// 	'product_quantity' in detailsOffer &&
				// 	'product_quantity' in action.payload
				// ) {
				// 	detailsOffer.product_quantity = action.payload.product_quantity;
				// 	detailsOffer.product_price_by = action.payload.product_price_by;
				// 	detailsOffer.product_longitude = action.payload.product_longitude;
				// 	detailsOffer.product_latitude = action.payload.product_latitude;
				// 	detailsOffer.product_address = action.payload.product_address;
				// 	detailsOffer.product_colors = action.payload.product_colors;
				// 	detailsOffer.product_sizes = action.payload.product_sizes;
				// 	// check if it's a service
				// } else if (
				// 	action.payload.offer_type === 'S' &&
				// 	'service_availability_days' in detailsOffer &&
				// 	'service_availability_days' in action.payload
				// ) {
				// 	detailsOffer.service_availability_days = action.payload.service_availability_days;
				// 	detailsOffer.service_morning_hour_from = action.payload.service_morning_hour_from;
				// 	detailsOffer.service_morning_hour_to = action.payload.service_morning_hour_to;
				// 	detailsOffer.service_afternoon_hour_from = action.payload.service_afternoon_hour_from;
				// 	detailsOffer.service_afternoon_hour_to = action.payload.service_afternoon_hour_to;
				// 	detailsOffer.service_zone_by = action.payload.service_zone_by;
				// 	detailsOffer.service_price_by = action.payload.service_price_by;
				// 	detailsOffer.service_longitude = action.payload.service_longitude;
				// 	detailsOffer.service_latitude = action.payload.service_latitude;
				// 	detailsOffer.service_address = action.payload.service_address;
				// 	detailsOffer.service_km_radius = action.payload.service_km_radius;
				// }
			}
			state.offerApi.editPromiseStatus = "RESOLVED";
			state.offerApi.isEditInProgress = false;
			// return state;
		},
		setDeleteOfferIsLoading: (state) => {
			state.offerApi.isDeleteInProgress = true;
			state.offerApi.deletePromiseStatus = "PENDING";
			state.offerApi.error = apiErrorInitialState.error;
		},
		deleteUserOffer: (state, action: PayloadAction<{ offer_pk: number }>) => {
			// update userOffers
			state.userOffers = state.userOffers.filter((item) => item.pk !== action.payload.offer_pk);
			// update userOffersList results
			state.userOffersList.results = state.userOffersList.results.filter(
				(item) => item.pk !== action.payload.offer_pk
			);
			state.offerApi.deletePromiseStatus = "RESOLVED";
			state.offerApi.isDeleteInProgress = false;
			// return state;
		},
		setSolderOffer: (state, action: PayloadAction<OfferSolderInterface>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].solder_type = action.payload.solder_type;
				state.userOffers[userOffersindex].solder_value = action.payload.solder_value;
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex(
				(item) => item.pk === action.payload.offer
			);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].solder_type = action.payload.solder_type;
				state.userOffersList.results[userOffersListIndex].solder_value = action.payload.solder_value;
			}
			// return state;
		},
		setGetSolderOffer: (state, action: PayloadAction<OfferSolderInterface>) => {
			state.selectedSolder = action.payload;
			// return state;
		},
		deleteSolderOffer: (state, action: PayloadAction<{ offer_pk: number }>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].solder_type = null;
				state.userOffers[userOffersindex].solder_value = null;
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex(
				(item) => item.pk === action.payload.offer_pk
			);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].solder_type = null;
				state.userOffersList.results[userOffersListIndex].solder_value = null;
			}
			//? update selectedSolder ?
			// return state;
		},
		setOfferVuesList: (state, action: PayloadAction<OfferGetVuesType>) => {
			const { next, previous, count, results, total_vues, pourcentage, this_month } = action.payload;
			state.offerVuesList.count = count;
			state.offerVuesList.next = next;
			state.offerVuesList.previous = previous;
			state.offerVuesList.total_vues = total_vues;
			state.offerVuesList.pourcentage = pourcentage;
			state.offerVuesList.this_month = this_month;
			for (let i = 0; i < results.length; i++) {
				state.offerVuesList.results.push(results[i]);
			}
			// return state;
		},
		setWSOfferThumbnail: (state, action: PayloadAction<{ offer_pk: number; offer_thumbnail: string }>) => {
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].picture_1_thumb = action.payload.offer_thumbnail;
			}
			const userOffersListIndex = state.userOffersList.results.findIndex(
				(item) => item.pk === action.payload.offer_pk
			);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].thumbnail = action.payload.offer_thumbnail;
			}
			if (state.selectedOffer) {
				if (state.selectedOffer.pk === action.payload.offer_pk) {
					state.selectedOffer.picture_1_thumb = action.payload.offer_thumbnail;
				}
				// return state;
			}
		},
		setExistsInCart: (state, action: PayloadAction<{ offer_pk: number; exists_in_cart: boolean }>) => {
			if (state.selectedOffer) {
				if (state.selectedOffer.pk === action.payload.offer_pk) {
					state.selectedOffer.exists_in_cart = action.payload.exists_in_cart;
				}
			}
			// return state;
		},
		setLocalOfferToEditPk: (state, action: PayloadAction<number>) => {
			state.userLocalOffer.pk = action.payload;
		},
		setLocalOfferCategories: (state, action: PayloadAction<OfferCategoriesType>) => {
			if (!state.userLocalOffer.categoriesList.includes(action.payload)) {
				state.userLocalOffer.categoriesList.push(action.payload);
			} else {
				const index = state.userLocalOffer.categoriesList.indexOf(action.payload);
				if (index !== -1) {
					state.userLocalOffer.categoriesList.splice(index, 1);
				}
			}
			// return state;
		},
		setLocalOfferMultiCategories: (state, action: PayloadAction<Array<OfferCategoriesType>>) => {
			action.payload.map((category) => {
				if (!state.userLocalOffer.categoriesList.includes(category)) {
					state.userLocalOffer.categoriesList.push(category);
				} else {
					const index = state.userLocalOffer.categoriesList.indexOf(category);
					if (index !== -1) {
						state.userLocalOffer.categoriesList.splice(index, 1);
					}
				}
			});
		},
		setLocalOfferDescription: (state, action: PayloadAction<Omit<LocalOfferDescriptionPageType, "router">>) => {
			state.userLocalOffer.title = action.payload.title;
			state.userLocalOffer.description = action.payload.description;
			state.userLocalOffer.pictures = action.payload.pictures;
			// state.userLocalOffer.picture_1 = action.payload.picture_1;
			// state.userLocalOffer.picture_2 = action.payload.picture_2;
			// state.userLocalOffer.picture_3 = action.payload.picture_3;
			// state.userLocalOffer.picture_4 = action.payload.picture_4;
			state.userLocalOffer.forWhom = action.payload.for_whom;
			state.userLocalOffer.colors = action.payload.product_colors;
			state.userLocalOffer.sizes = action.payload.product_sizes;
			state.userLocalOffer.quantity = action.payload.product_quantity;
			state.userLocalOffer.tags = action.payload.tags;
			// return state;
		},
		setLocalOfferPrice: (state, action: PayloadAction<{ price: string; price_by: "U" | "K" | "L" }>) => {
			state.userLocalOffer.prix = action.payload.price;
			state.userLocalOffer.prix_par = action.payload.price_by;
			// return state;
		},
		setLocalOfferClickAndCollect: (
			state,
			action: PayloadAction<{ longitude: number | null; latitude: number | null; address_name: string | null }>
		) => {
			state.userLocalOffer.clickAndCollect.longitude = action.payload.longitude;
			state.userLocalOffer.clickAndCollect.latitude = action.payload.latitude;
			state.userLocalOffer.clickAndCollect.address_name = action.payload.address_name;
			// return state;
		},
		setLocalOfferDeliveries: (
			state,
			action: PayloadAction<{
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
			}>
		) => {
			state.userLocalOffer.deliveries = { ...action.payload };
			// return state;
		},
		emptyLocalOfferDeliveryClickAndCollect: (state) => {
			state.userLocalOffer.clickAndCollect = clickAndCollectInitial;
			// return state;
		},
		emptyLocalOfferDeliveries: (state, action: PayloadAction<"1" | "2" | "3">) => {
			if (action.payload === "1") {
				state.userLocalOffer.deliveries.delivery_city_1 = null;
				state.userLocalOffer.deliveries.all_cities_1 = null;
				state.userLocalOffer.deliveries.delivery_price_1 = null;
				state.userLocalOffer.deliveries.delivery_days_1 = null;
			} else if (action.payload === "2") {
				state.userLocalOffer.deliveries.delivery_city_2 = null;
				state.userLocalOffer.deliveries.all_cities_2 = null;
				state.userLocalOffer.deliveries.delivery_price_2 = null;
				state.userLocalOffer.deliveries.delivery_days_2 = null;
			} else {
				state.userLocalOffer.deliveries.delivery_city_3 = null;
				state.userLocalOffer.deliveries.all_cities_3 = null;
				state.userLocalOffer.deliveries.delivery_price_3 = null;
				state.userLocalOffer.deliveries.delivery_days_3 = null;
			}
			// return state;
		},
		emptyUserLocalOffer: (state) => {
			state.userLocalOffer = userLocalOfferInitial;
		},
		setPinOffer: (state, action: PayloadAction<OfferPinType>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].pinned = action.payload.pinned;
				state.userOffers.sort((a, b) => Number(b.pinned) - Number(a.pinned));
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex(
				(item) => item.pk === action.payload.offer_pk
			);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].pinned = action.payload.pinned;
				state.userOffersList.results.sort((a, b) => Number(b.pinned) - Number(a.pinned));
			}
			// return state;
		},
		// setEmptySelectedOfferState: (state) => {
		// 	state.selectedOffer = null;
		// 	return state;
		// },
		initOffer: () => {
			return initialState;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(myOffersListGETApiErrorAction, (state, action) => {
			state.offerApi.error = action.payload.error;
			state.offerApi.fetchPromiseStatus = "REJECTED";
			state.offerApi.isFetchInProgress = false;
			state.userOffersList = paginationInitial;
			// return state;
		}).addCase(offersPUTApiErrorAction, (state, action) => {
			state.offerApi.error = action.payload.error;
			state.offerApi.editPromiseStatus = "REJECTED";
			state.offerApi.isEditInProgress = false;
		}).addCase(offersPOSTApiErrorAction, (state, action) => {
			state.offerApi.error = action.payload.error;
			state.offerApi.addPromiseStatus = "REJECTED";
			state.offerApi.isAddInProgress = false;
		}).addCase(offersDELETEApiErrorAction, (state, action) => {
			state.offerApi.error = action.payload.error;
			state.offerApi.deletePromiseStatus = "REJECTED";
			state.offerApi.isDeleteInProgress = false;
		});
	}
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.offer };
	// 	},
	// },
});

export const {
	appendPostOfferIsLoading,
	appendPostOfferState,
	setSelectedOffer,
	setSelectedOfferTags,
	setMyOffersFirstPageListIsLoading,
	setMyOffersFirstPageListError,
	setPutOfferIsLoading,
	setOfferLastUsedLocalisation,
	setOfferLastThreeUsedDeliveries,
	setMyOffersFirstPageList,
	setMyOffersList,
	setPutOffer,
	setDeleteOfferIsLoading,
	deleteUserOffer,
	setSolderOffer,
	setGetSolderOffer,
	deleteSolderOffer,
	setOfferVuesList,
	initOffer,
	setWSOfferThumbnail,
	setExistsInCart,
	setLocalOfferCategories,
	setLocalOfferToEditPk,
	setLocalOfferMultiCategories,
	setLocalOfferDescription,
	setLocalOfferPrice,
	setLocalOfferClickAndCollect,
	setLocalOfferDeliveries,
	emptyLocalOfferDeliveryClickAndCollect,
	emptyLocalOfferDeliveries,
	emptyUserLocalOffer,
	setPinOffer
} = OfferSlice.actions;

export default OfferSlice.reducer;
