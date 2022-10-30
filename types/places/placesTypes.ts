import { GlobalApiPromiseError, ResponseDataInterface } from "../_init/_initTypes";

type PlacesType = {
	pk: number,
	name: string,
}

export interface CountriesType extends PlacesType{
	code: string,
}

//!- Places State
export interface PlacesStateInterface {
	localisation_name: string | null;
	placesApi: GlobalApiPromiseError;
	countries: Array<CountriesType>;
	cities: Array<string>;
}

export type LocalisationType = { localisation_name: string };

export type PlacesGetLocalisationResponseType = ResponseDataInterface<LocalisationType>;

export type PlacesGetCountriesResponseType = ResponseDataInterface<Array<CountriesType>>;

export type PlacesGetCitiesResponseType = ResponseDataInterface<Array<string>>;