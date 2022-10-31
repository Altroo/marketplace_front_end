import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	LocalOfferProductDescriptionPageType,
	LocalOfferServiceDescriptionPageType,
	OfferCategoriesType,
	OfferGetMyOffersProductInterface,
	OfferGetMyOffersServiceInterface,
	OfferPinType,
	OfferProductInterface,
	OfferProductLocalisation,
	OfferServiceInterface,
	OfferServiceLocalisation,
	OfferSolderInterface,
	OfferStateInterface,
	OfferTagsType
} from "../../../types/offer/offerTypes";
import { ApiErrorResponseType, PaginationResponseType } from '../../../types/_init/_initTypes';
import { apiErrorInitialState, paginationInitial } from '../_init/_initSlice';
import { ShopZoneByType } from '../../../types/shop/shopTypes';

export const myOffersListGETApiErrorAction = createAction<ApiErrorResponseType>('myOffersListGETApiErrorAction');
export const offersPUTApiErrorAction = createAction<ApiErrorResponseType>('offersPUTApiErrorAction');
export const offersPOSTApiErrorAction = createAction<ApiErrorResponseType>('offersPOSTApiErrorAction');
export const offersDELETEApiErrorAction = createAction<ApiErrorResponseType>('offersDELETEApiErrorAction');

const clickAndCollectInitial = {
	longitude: null,
	latitude: null,
	address_name: null,
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
	delivery_days_3: null,
};

const userLocalProductInitial = {
	pk: null,
	categoriesList: [],
	title: null,
	description: null,
	pictures: [],
	forWhom: null,
	colors: null,
	sizes: null,
	quantity: null,
	made_in: null,
	creator: false,
	tags: null,
	prix: null,
	prix_par: null,
	clickAndCollect: clickAndCollectInitial,
	deliveries: deliveriesInitial,
};
const userLocalServiceInitial = {
	pk: null,
	categoriesList: [],
	title: null,
	description: null,
	pictures: [],
	forWhom: null,
	service_availability_days: [],
	service_morning_hour_from: null,
	service_morning_hour_to: null,
	service_afternoon_hour_from: null,
	service_afternoon_hour_to: null,
	service_zone_by: null,
	service_longitude: null,
	service_latitude: null,
	service_address: null,
	service_km_radius: null,
	tags: null,
	price: null,
	service_price_by: null,
};

const initialState: OfferStateInterface = {
	userOffers: [],
	userOffersList: paginationInitial,
	selectedOffer: null,
	selectedTags: [],
	lastUsedLocalisation: {},
	// local states
	userLocalProduct: userLocalProductInitial,
	userLocalService: userLocalServiceInitial,
	offerApi: apiErrorInitialState,
};

const OfferSlice = createSlice({
	name: 'offer',
	initialState: initialState,
	reducers: {
		appendPostOfferIsLoading: (state) => {
			state.offerApi.isAddInProgress = true;
			state.offerApi.addPromiseStatus = 'PENDING';
			state.offerApi.error = apiErrorInitialState.error;
		},
		appendPostOfferState: (state, action: PayloadAction<OfferProductInterface | OfferServiceInterface>) => {
			state.userOffers.push(action.payload);
			state.offerApi.addPromiseStatus = 'RESOLVED';
			state.offerApi.isAddInProgress = false;
		},
		setSelectedOfferTags: (state, action: PayloadAction<OfferTagsType>) => {
			state.selectedTags = action.payload;
		},
		setOfferLastUsedLocalisation: (
			state,
			action: PayloadAction<OfferProductLocalisation | OfferServiceLocalisation>,
		) => {
			state.lastUsedLocalisation = action.payload;
		},
		setMyOffersFirstPageListIsLoading: (state) => {
			state.offerApi.isFetchInProgress = true;
			state.offerApi.fetchPromiseStatus = 'PENDING';
			state.offerApi.error = apiErrorInitialState.error;
		},
		setMyOffersFirstPageList: (
			state,
			action: PayloadAction<
				PaginationResponseType<OfferGetMyOffersProductInterface | OfferGetMyOffersServiceInterface>
			>,
		) => {
			const { next, previous, count, results } = action.payload;
			state.userOffersList.count = count;
			state.userOffersList.next = next;
			state.userOffersList.previous = previous;
			state.userOffersList.results = results;
			state.offerApi.fetchPromiseStatus = 'RESOLVED';
			state.offerApi.isFetchInProgress = false;
		},
		setPutOfferIsLoading: (state) => {
			state.offerApi.isEditInProgress = true;
			state.offerApi.editPromiseStatus = 'PENDING';
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
			}
			state.userOffers.sort((a, b) => Number(b.pinned) - Number(a.pinned));
			state.offerApi.editPromiseStatus = 'RESOLVED';
			state.offerApi.isEditInProgress = false;
			// return state;
		},
		setDeleteOfferIsLoading: (state) => {
			state.offerApi.isDeleteInProgress = true;
			state.offerApi.deletePromiseStatus = 'PENDING';
			state.offerApi.error = apiErrorInitialState.error;
		},
		deleteUserOffer: (state, action: PayloadAction<{ offer_pk: number }>) => {
			// update userOffers
			state.userOffers = state.userOffers.filter((item) => item.pk !== action.payload.offer_pk);
			// update userOffersList results
			state.userOffersList.results = state.userOffersList.results.filter((item) => item.pk !== action.payload.offer_pk);
			state.offerApi.deletePromiseStatus = 'RESOLVED';
			state.offerApi.isDeleteInProgress = false;
		},
		setSolderOffer: (state, action: PayloadAction<OfferSolderInterface>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].solder_type = action.payload.solder_type;
				state.userOffers[userOffersindex].solder_value = action.payload.solder_value;
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex((item) => item.pk === action.payload.offer);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].solder_type = action.payload.solder_type;
				state.userOffersList.results[userOffersListIndex].solder_value = action.payload.solder_value;
			}
		},
		deleteSolderOffer: (state, action: PayloadAction<{ offer_pk: number }>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].solder_type = null;
				state.userOffers[userOffersindex].solder_value = null;
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].solder_type = null;
				state.userOffersList.results[userOffersListIndex].solder_value = null;
			}
		},
		setWSOfferThumbnail: (state, action: PayloadAction<{ offer_pk: number; offer_thumbnail: string }>) => {
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].picture_1_thumb = action.payload.offer_thumbnail;
			}
			const userOffersListIndex = state.userOffersList.results.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].thumbnail = action.payload.offer_thumbnail;
			}
			if (state.selectedOffer) {
				if (state.selectedOffer.pk === action.payload.offer_pk) {
					state.selectedOffer.picture_1_thumb = action.payload.offer_thumbnail;
				}
			}
		},
		setLocalOfferProductToEditPk: (state, action: PayloadAction<number>) => {
			state.userLocalProduct.pk = action.payload;
		},
		setLocalOfferServiceToEditPk: (state, action: PayloadAction<number>) => {
			state.userLocalService.pk = action.payload;
		},
		setLocalOfferProductCategories: (state, action: PayloadAction<OfferCategoriesType>) => {
			if (!state.userLocalProduct.categoriesList.includes(action.payload)) {
				state.userLocalProduct.categoriesList.push(action.payload);
			} else {
				const index = state.userLocalProduct.categoriesList.indexOf(action.payload);
				if (index !== -1) {
					state.userLocalProduct.categoriesList.splice(index, 1);
				}
			}
		},
		setLocalOfferServiceCategories: (state, action: PayloadAction<OfferCategoriesType>) => {
			if (!state.userLocalService.categoriesList.includes(action.payload)) {
				state.userLocalService.categoriesList.push(action.payload);
			} else {
				const index = state.userLocalService.categoriesList.indexOf(action.payload);
				if (index !== -1) {
					state.userLocalService.categoriesList.splice(index, 1);
				}
			}
		},
		setLocalOfferServiceLocalisation: (
			state,
			action: PayloadAction<{
				service_zone_by: ShopZoneByType | null;
				service_longitude: number | null;
				service_latitude: number | null;
				service_address: string | null;
				service_km_radius: number | null;
			}>,
		) => {
			state.userLocalService.service_zone_by = action.payload.service_zone_by;
			state.userLocalService.service_longitude = action.payload.service_longitude;
			state.userLocalService.service_latitude = action.payload.service_latitude;
			state.userLocalService.service_address = action.payload.service_address;
			state.userLocalService.service_km_radius = action.payload.service_km_radius;
		},
		setLocalOfferProductMultiCategories: (state, action: PayloadAction<Array<OfferCategoriesType>>) => {
			action.payload.map((category) => {
				if (!state.userLocalProduct.categoriesList.includes(category)) {
					state.userLocalProduct.categoriesList.push(category);
				} else {
					const index = state.userLocalProduct.categoriesList.indexOf(category);
					if (index !== -1) {
						state.userLocalProduct.categoriesList.splice(index, 1);
					}
				}
			});
		},
		setLocalOfferServiceMultiCategories: (state, action: PayloadAction<Array<OfferCategoriesType>>) => {
			action.payload.map((category) => {
				if (!state.userLocalService.categoriesList.includes(category)) {
					state.userLocalService.categoriesList.push(category);
				} else {
					const index = state.userLocalService.categoriesList.indexOf(category);
					if (index !== -1) {
						state.userLocalService.categoriesList.splice(index, 1);
					}
				}
			});
		},
		setLocalOfferProductDescription: (
			state,
			action: PayloadAction<Omit<LocalOfferProductDescriptionPageType, 'router' | 'type'>>,
		) => {
			state.userLocalProduct.title = action.payload.title;
			state.userLocalProduct.description = action.payload.description;
			state.userLocalProduct.pictures = action.payload.pictures;
			state.userLocalProduct.forWhom = action.payload.for_whom;
			state.userLocalProduct.colors = action.payload.product_colors;
			state.userLocalProduct.sizes = action.payload.product_sizes;
			state.userLocalProduct.quantity = action.payload.product_quantity;
			state.userLocalProduct.made_in = action.payload.made_in;
			state.userLocalProduct.creator = action.payload.creator;
			// state.userLocalProduct.tags = action.payload.tags;
		},
		setLocalOfferServiceDescription: (
			state,
			action: PayloadAction<LocalOfferServiceDescriptionPageType>,
		) => {
			state.userLocalService.title = action.payload.title;
			state.userLocalService.description = action.payload.description;
			state.userLocalService.pictures = action.payload.pictures;
			state.userLocalService.forWhom = action.payload.for_whom;
			state.userLocalService.service_availability_days = action.payload.service_availability_days;
			state.userLocalService.service_morning_hour_from = action.payload.service_morning_hour_from;
			state.userLocalService.service_morning_hour_to = action.payload.service_morning_hour_to;
			state.userLocalService.service_afternoon_hour_from = action.payload.service_afternoon_hour_from;
			state.userLocalService.service_afternoon_hour_to = action.payload.service_afternoon_hour_to;
			// state.userLocalService.tags = action.payload.tags;
		},
		setLocalOfferProductPrice: (state, action: PayloadAction<{ price: string; price_by: 'U' | 'K' | 'L' }>) => {
			state.userLocalProduct.prix = action.payload.price;
			state.userLocalProduct.prix_par = action.payload.price_by;
		},
		setLocalOfferServicePrice: (state, action: PayloadAction<{ price: string; service_price_by: "H" | "J" | "S" | "M" | "P" }>) => {
			state.userLocalService.price = action.payload.price;
			state.userLocalService.service_price_by = action.payload.service_price_by;
		},
		setLocalOfferClickAndCollect: (
			state,
			action: PayloadAction<{ longitude: number | null; latitude: number | null; address_name: string | null }>,
		) => {
			state.userLocalProduct.clickAndCollect.longitude = action.payload.longitude;
			state.userLocalProduct.clickAndCollect.latitude = action.payload.latitude;
			state.userLocalProduct.clickAndCollect.address_name = action.payload.address_name;
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
			}>,
		) => {
			state.userLocalProduct.deliveries = { ...action.payload };
		},
		emptyLocalOfferDeliveryClickAndCollect: (state) => {
			state.userLocalProduct.clickAndCollect = clickAndCollectInitial;
		},
		emptyLocalOfferDeliveries: (state, action: PayloadAction<'1' | '2' | '3'>) => {
			if (action.payload === '1') {
				state.userLocalProduct.deliveries.delivery_city_1 = null;
				state.userLocalProduct.deliveries.all_cities_1 = null;
				state.userLocalProduct.deliveries.delivery_price_1 = null;
				state.userLocalProduct.deliveries.delivery_days_1 = null;
			} else if (action.payload === '2') {
				state.userLocalProduct.deliveries.delivery_city_2 = null;
				state.userLocalProduct.deliveries.all_cities_2 = null;
				state.userLocalProduct.deliveries.delivery_price_2 = null;
				state.userLocalProduct.deliveries.delivery_days_2 = null;
			} else {
				state.userLocalProduct.deliveries.delivery_city_3 = null;
				state.userLocalProduct.deliveries.all_cities_3 = null;
				state.userLocalProduct.deliveries.delivery_price_3 = null;
				state.userLocalProduct.deliveries.delivery_days_3 = null;
			}
		},
		emptyUserLocalOffer: (state) => {
			state.userLocalProduct = userLocalProductInitial;
		},
		setPinOffer: (state, action: PayloadAction<OfferPinType>) => {
			// update userOffers
			const userOffersindex = state.userOffers.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersindex >= 0) {
				state.userOffers[userOffersindex].pinned = action.payload.pinned;
				state.userOffers.sort((a, b) => Number(b.pinned) - Number(a.pinned));
			}
			// update userOffersList results
			const userOffersListIndex = state.userOffersList.results.findIndex((item) => item.pk === action.payload.offer_pk);
			if (userOffersListIndex >= 0) {
				state.userOffersList.results[userOffersListIndex].pinned = action.payload.pinned;
				state.userOffersList.results.sort((a, b) => Number(b.pinned) - Number(a.pinned));
			}
		},
		initOffer: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(myOffersListGETApiErrorAction, (state, action) => {
				state.offerApi.error = action.payload.error;
				state.offerApi.fetchPromiseStatus = 'REJECTED';
				state.offerApi.isFetchInProgress = false;
				state.userOffersList = paginationInitial;
				// return state;
			})
			.addCase(offersPUTApiErrorAction, (state, action) => {
				state.offerApi.error = action.payload.error;
				state.offerApi.editPromiseStatus = 'REJECTED';
				state.offerApi.isEditInProgress = false;
			})
			.addCase(offersPOSTApiErrorAction, (state, action) => {
				state.offerApi.error = action.payload.error;
				state.offerApi.addPromiseStatus = 'REJECTED';
				state.offerApi.isAddInProgress = false;
			})
			.addCase(offersDELETEApiErrorAction, (state, action) => {
				state.offerApi.error = action.payload.error;
				state.offerApi.deletePromiseStatus = 'REJECTED';
				state.offerApi.isDeleteInProgress = false;
			});
	},
});

export const {
	appendPostOfferIsLoading,
	appendPostOfferState,
	setSelectedOfferTags,
	setMyOffersFirstPageListIsLoading,
	setPutOfferIsLoading,
	setOfferLastUsedLocalisation,
	setMyOffersFirstPageList,
	setPutOffer,
	setDeleteOfferIsLoading,
	deleteUserOffer,
	setSolderOffer,
	deleteSolderOffer,
	initOffer,
	setWSOfferThumbnail,
	setLocalOfferProductCategories,
	setLocalOfferServiceCategories,
	setLocalOfferServiceLocalisation,
	setLocalOfferProductToEditPk,
	setLocalOfferServiceToEditPk,
	setLocalOfferProductMultiCategories,
	setLocalOfferServiceMultiCategories,
	setLocalOfferProductDescription,
	setLocalOfferServiceDescription,
	setLocalOfferProductPrice,
	setLocalOfferServicePrice,
	setLocalOfferClickAndCollect,
	setLocalOfferDeliveries,
	emptyLocalOfferDeliveryClickAndCollect,
	emptyLocalOfferDeliveries,
	emptyUserLocalOffer,
	setPinOffer,
} = OfferSlice.actions;

export default OfferSlice.reducer;
