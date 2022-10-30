import * as Types from '../index';

// GET : /api/1.0.0/places/localisation/<longitude>/<latitude>/
export const placesGetGeolocalisationAction = (longitude: number, latitude: number) => {
	return {
		type: Types.PLACES_GET_LOCALISATION,
		longitude,
		latitude,
	};
};

// GET : /api/1.0.0/places/countries?all=true
export const placesGetCountriesAction = () => {
	return {
		type: Types.PLACES_GET_COUNTRIES,
	};
};

// GET : /api/1.0.0/places/cities?code=MA&q=Rabat or
// GET : /api/1.0.0/places/cities?code=MA&q=
export const placesGetCitiesAction = (code: string, q?: string) => {
	return {
		type: Types.PLACES_GET_CITIES,
		code,
		q,
	};
};

