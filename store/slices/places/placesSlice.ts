import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesType, CountriesType, LocalisationType, PlacesStateInterface } from '../../../types/places/placesTypes';
import { apiErrorInitialState } from '../_init/_initSlice';
import { ApiErrorResponseType } from "../../../types/_init/_initTypes";
// import { HYDRATE } from 'next-redux-wrapper';

// Extra reducers actions
export const placesGETApiErrorAction = createAction<ApiErrorResponseType>('userShopGETApiErrorAction');

const initialState: PlacesStateInterface = {
	localisation_name: null,
	placesApi: apiErrorInitialState,
	countries: [],
	cities: [],
};

const placesSlice = createSlice({
	name: 'places',
	initialState: initialState,
	reducers: {
		setGetPlacesIsLoading: (state) => {
			state.placesApi.isFetchInProgress = true;
			state.placesApi.fetchPromiseStatus = 'PENDING';
			state.placesApi.error = apiErrorInitialState.error;
			return state;
		},
		setGetLocalisation: (state, action: PayloadAction<LocalisationType>) => {
			state.localisation_name = action.payload.localisation_name;
			state.placesApi.fetchPromiseStatus = 'RESOLVED';
			state.placesApi.isFetchInProgress = false;
			return state;
		},
		setGetCountries: (state, action: PayloadAction<Array<CountriesType>>) => {
			state.countries = action.payload;
			return state;
		},
		setGetCities: (state, action: PayloadAction<Array<string>>) => {
			state.cities = action.payload;
			return state;
		},
		initPlaces: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(placesGETApiErrorAction, (state, action) => {
			state.placesApi.error = action.payload.error;
			state.placesApi.fetchPromiseStatus = 'REJECTED';
			state.placesApi.isFetchInProgress = false;
			state.localisation_name = null;
			return state;
		});
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.places };
	// 	},
	// },
});
// setGetPlacesIsLoading, placesGETApiErrorAction
export const {
	setGetPlacesIsLoading,
	setGetLocalisation,
	setGetCities,
	setGetCountries,
	initPlaces,
} = placesSlice.actions;

export default placesSlice.reducer;
