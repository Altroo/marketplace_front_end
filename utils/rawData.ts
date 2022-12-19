import {
	OfferCategoriesType,
	OfferForWhomType,
	OfferProductColors,
	OfferProductPriceByType,
	OfferProductSizes,
	OfferServiceAvailabilityDaysArray,
	OfferServicePriceByType,
} from '../types/offer/offerTypes';
import { AccountGenderCodeValueType } from '../types/account/accountTypes';
import { NotificationsType } from '../types/notification/notificationTypes';
import { DASHBOARD_SUBSCRIPTION } from './routes';
import { useCallback } from 'react';

export const monthItemsList = [
	'janv',
	'févr',
	'mars',
	'avr',
	'mai',
	'juin',
	'juill',
	'août',
	'sept',
	'oct',
	'nov',
	'déc',
];
export const fullMonthItemsList = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juilliet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
];
export const dayItemsList = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
// export const forWhomItemsList = ['Tout le monde', 'Enfant', 'Femme', 'Homme'];
export const forWhomItemsList = ['Enfant', 'Femme', 'Homme'];
export const genderItemsList: Array<AccountGenderCodeValueType> = [
	{
		code: 'M',
		value: 'Homme',
	},
	{
		code: 'F',
		value: 'Femme',
	},
];

export const getCategoriesDataArray = (categoryCodes: Array<OfferCategoriesType>) => {
	const categoryArray: Array<string> = [];
	categoryCodes.map((categoryCode) => {
		switch (categoryCode) {
			case 'AC':
				categoryArray.push('Accessoire');
				break;
			case 'AN':
				categoryArray.push('Animaux');
				break;
			case 'AR':
				categoryArray.push('Artisanat');
				break;
			case 'BE':
				categoryArray.push('Beauté');
				break;
			case 'CO':
				categoryArray.push('Cours');
				break;
			case 'DI':
				categoryArray.push('Divers');
				break;
			case 'EV':
				categoryArray.push('Évènement');
				break;
			case 'IM':
				categoryArray.push('Immobilier');
				break;
			case 'JA':
				categoryArray.push('Jardin');
				break;
			case 'LO':
				categoryArray.push('Loisirs');
				break;
			case 'LI':
				categoryArray.push('Livres');
				break;
			case 'MA':
				categoryArray.push('Maison');
				break;
			case 'MO':
				categoryArray.push('Mode');
				break;
			case 'MD':
				categoryArray.push('Multimédia');
				break;
			case 'MS':
				categoryArray.push('Musique');
				break;
			case 'NO':
				categoryArray.push('Nourriture & Alimentation');
				break;
			case 'SA':
				categoryArray.push('Santé & Bien être');
				break;
			case 'SP':
				categoryArray.push('Sport');
				break;
			case 'VE':
				categoryArray.push('Véhicule');
				break;
			case 'VO':
				categoryArray.push('Voyage');
				break;
		}
	});
	return categoryArray;
};

export const getColorsDataArray = (colorCodes: Array<OfferProductColors>) => {
	const colorsArray: Array<string> = [];
	colorCodes.map((colorCode) => {
		switch (colorCode) {
			case 'BK':
				colorsArray.push('Noir');
				break;
			case 'WT':
				colorsArray.push('Blanc');
				break;
			case 'BR':
				colorsArray.push('Marron');
				break;
			case 'BL':
				colorsArray.push('Bleu');
				break;
			case 'GN':
				colorsArray.push('Vert');
				break;
			case 'PR':
				colorsArray.push('Violet');
				break;
			case 'OR':
				colorsArray.push('Orange');
				break;
			case 'PI':
				colorsArray.push('Rose');
				break;
			case 'YE':
				colorsArray.push('Jaune');
				break;
			case 'GR':
				colorsArray.push('Gris');
				break;
			case 'MC':
				colorsArray.push('Multi');
				break;
			case 'RD':
				colorsArray.push('Rouge');
				break;
		}
	});
	return colorsArray;
};

export const getForWhomDataArray = (forWhom: Array<OfferForWhomType>, excludeAll?: boolean) => {
	const forWhomArray: Array<string> = [];
	forWhom.map((forWho) => {
		switch (forWho) {
			// case 'T':
			// 	if (!excludeAll) {
			// 		forWhomArray.push('Tout le monde');
			// 	}
			// 	break;
			case 'E':
				forWhomArray.push('Enfant');
				break;
			case 'F':
				forWhomArray.push('Femme');
				break;
			case 'H':
				forWhomArray.push('Homme');
				break;
		}
	});
	return forWhomArray;
};

// export const getForWhomDataArray = (forWhom: Array<OfferForWhomType>) => {
// 	const forWhomArray: Array<string> = [];
// 	forWhom.map((forWho) => {
// 		switch (forWho) {
// 			case 'T':
// 				forWhomArray.push('Tout le monde');
// 				break;
// 			case 'E':
// 				forWhomArray.push('Enfant');
// 				break;
// 			case 'F':
// 				forWhomArray.push('Femme');
// 				break;
// 			case 'H':
// 				forWhomArray.push('Homme');
// 				break;
// 		}
// 	});
// 	return forWhomArray;
// };

export const getSizesDataArray = (sizes: Array<OfferProductSizes>) => {
	const sizesArray: Array<string> = [];
	sizes.map((size) => {
		switch (size) {
			case 'XS':
				sizesArray.push('XSmall');
				break;
			case 'S':
				sizesArray.push('Small');
				break;
			case 'M':
				sizesArray.push('Medium');
				break;
			case 'L':
				sizesArray.push('Large');
				break;
			case 'X':
				sizesArray.push('XLarge');
				break;
			case 'XL':
				sizesArray.push('XXLarge');
		}
	});
	return sizesArray;
};

export const getProductPriceByData = (priceBy: OfferProductPriceByType) => {
	switch (priceBy) {
		case 'U':
			return 'unité';
		case 'K':
			return 'kg';
		case 'L':
			return 'litre';
	}
};

export const getServicePriceByData = (priceBy: OfferServicePriceByType) => {
	switch (priceBy) {
		case 'H':
			return 'heur';
		case 'J':
			return 'jour';
		case 'S':
			return 'semaine';
		case 'M':
			return 'mois';
		case 'P':
			return 'prestation';
	}
};

export const getServiceAvailabilityDaysArray = (availabilityDays: OfferServiceAvailabilityDaysArray) => {
	const daysArray: Array<string> = [];
	availabilityDays.map((day) => {
		switch (day.code_day) {
			case 'AL':
				daysArray.push('Tous les jours');
				break;
			case 'MO':
				daysArray.push('Lundi');
				break;
			case 'TU':
				daysArray.push('Mardi');
				break;
			case 'WE':
				daysArray.push('Mercredi');
				break;
			case 'TH':
				daysArray.push('Jeudi');
				break;
			case 'FR':
				daysArray.push('Vendredi');
				break;
			case 'SA':
				daysArray.push('Samedi');
				break;
			case 'SU':
				daysArray.push('Dimanche');
				break;
		}
	});
	return daysArray;
};

export const getSliderData = (newValue: number) => {
	switch (newValue) {
		case 10:
			return 1;
		case 20:
			return 2;
		case 30:
			return 3;
		case 40:
			return 4;
		case 50:
			return 5;
		case 60:
			return 6;
		case 70:
			return 7;
		case 80:
			return 8;
		case 90:
			return 9;
		case 100:
			return 10;
		case 110:
			return 20;
		case 120:
			return 30;
		case 130:
			return 40;
		case 140:
			return 50;
		case 150:
			return 60;
		case 160:
			return 70;
		case 170:
			return 80;
		case 180:
			return 90;
		case 190:
			return 100;
		case 200:
			return 110;
	}
};

export const constructDate = (hour: string) => {
	const today = new Date();
	const hours = hour.split(':')[0];
	const minutes = hour.split(':')[1];
	today.setHours(parseInt(hours));
	today.setMinutes(parseInt(minutes));
	return today;
};

export const getNotificationLink = (type: NotificationsType) => {
	switch (type) {
		case 'SA':
			return {
				link: DASHBOARD_SUBSCRIPTION,
				message: 'Votre abonnement est activé',
			};
	}
};

export const getDateFromDayCountNumber = (days: number) => {
	const startDate = new Date(Date.now());
	const endDate = new Date(Date.now());
	endDate.setDate(endDate.getDate() + days + 1);
	const startMonth = monthItemsList[startDate.getMonth()];
	const startDay = dayItemsList[startDate.getDay()];
	const endMonth = monthItemsList[endDate.getMonth()];
	const endDay = dayItemsList[endDate.getDay()];
	return `${startDay} ${startDate.getDate()} ${startMonth} - ${endDay} ${endDate.getDate()} ${endMonth}`;
};

export const getDateStringFromFormatedDate = (dateString: Date) => {
	const date = new Date(dateString);
	const value = date.toLocaleDateString("fr-FR", {weekday: 'long', day: 'numeric', month: 'long'});
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export const getCitiesFromArray = (citiesArray: Array<{ pk: number; name: string }>) => {
	const cities: Array<string> = [];
	citiesArray.map((city) => {
		cities.push(city.name);
	});
	return cities;
};
