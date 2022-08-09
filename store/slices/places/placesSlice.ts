import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesType, CountriesType, LocalisationType, PlacesStateInterface } from '../../../types/places/placesTypes';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState: PlacesStateInterface = {
	localisation_name: null,
	countries: [],
	cities: [],
};

const placesSlice = createSlice({
	name: 'places',
	initialState: initialState,
	reducers: {
		setGetLocalisation: (state, action: PayloadAction<LocalisationType>) => {
			state.localisation_name = action.payload.localisation_name;
			return state;
		},
		setGetCountries: (state, action: PayloadAction<Array<CountriesType>>) => {
			state.countries = action.payload;
			return state;
		},
		setGetCities: (state, action: PayloadAction<Array<CitiesType>>) => {
			state.cities = action.payload;
			return state;
		},
		initPlaces: () => {
			return initialState;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.places };
	// 	},
	// },
});

export const { setGetLocalisation, setGetCities, setGetCountries, initPlaces } = placesSlice.actions;

export default placesSlice.reducer;
