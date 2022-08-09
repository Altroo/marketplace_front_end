import { CitiesType, CountriesType } from '../../types/places/placesTypes';
import { AccountGenderType } from '../../types/account/accountTypes';

export class UserClass {
	constructor(
		public pk: number,
		public avatar: string | null,
		public avatar_thumbnail: string | null,
		public first_name: string,
		public last_name: string,
		public gender: AccountGenderType | null,
		public birth_date: Date | string | null,
		public city: CitiesType | null,
		public country: CountriesType | null,
		public date_joined: Date | string | null,
	) {}
}