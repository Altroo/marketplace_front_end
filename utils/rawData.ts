import {
	OfferCategoriesType,
	OfferForWhomType,
	OfferProductColors,
	OfferProductPriceByType,
	OfferProductSizes,
	OfferServiceAvailabilityDaysArray,
	OfferServicePriceByType
} from "../types/offer/offerTypes";
import { AccountGenderCodeValueType, AccountGenderType } from "../types/account/accountTypes";

export const monthItemsList = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juill', 'août', 'sept', 'oct', 'nov', 'déc'];
export const dayItemsList = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
export const forWhomItemsList = ['Tout le monde', 'Enfant', 'Femme', 'Homme'];
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
/*
('', 'Unset'),
('M', 'Male'),
('F', 'Female'),
 */
export const getGenderData = (gender: AccountGenderType) => {
	switch (gender) {
		case 'M':
			return 'Homme';
		case 'F':
			return 'Femme';
	}
}
export const getCategoriesDataArray = (categoryCodes: Array<OfferCategoriesType>) => {
	const categoryArray: Array<string> = [];
	categoryCodes.map((categoryCode) => {
		switch (categoryCode) {
			case 'AC':
				categoryArray.push('Accessoire');
				break;
			case 'AN':
				categoryArray.push("Animaux");
				break;
			case 'AR':
				categoryArray.push("Artisanat");
				break;
			case 'BE':
				categoryArray.push("Beauté");
				break;
			case 'CO':
				categoryArray.push("Cours");
				break;
			case 'DI':
				categoryArray.push("Divers");
				break;
			case 'EV':
				categoryArray.push("Évènement");
				break;
			case 'IM':
				categoryArray.push("Immobilier");
				break;
			case 'JA':
				categoryArray.push("Jardin");
				break;
			case 'LO':
				categoryArray.push("Loisirs");
				break;
			case 'LI':
				categoryArray.push("Livres");
				break;
			case 'MA':
				categoryArray.push("Maison");
				break;
			case 'MO':
				categoryArray.push("Mode");
				break;
			case 'MD':
				categoryArray.push("Multimédia");
				break;
			case 'MS':
				categoryArray.push("Musique");
				break;
			case 'NO':
				categoryArray.push("Nourriture & Alimentation");
				break;
			case 'SA':
				categoryArray.push("Santé & Bien être");
				break;
			case 'SP':
				categoryArray.push("Sport");
				break;
			case 'VE':
				categoryArray.push("Véhicule");
				break;
			case 'VO':
				categoryArray.push("Voyage");
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
				colorsArray.push('Multicolore');
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
			case 'T':
				if (!excludeAll) {
					forWhomArray.push('Tout le monde');
				}
				break;
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
			return 'litre'
	}
}

export const getServicePriceByData = (priceBy: OfferServicePriceByType) => {
	switch (priceBy) {
		case 'H':
			return 'heur';
		case 'J':
			return 'jour';
		case 'S':
			return 'semaine';
		case 'M':
			return 'mois'
		case 'P':
			return 'prestation'
	}
}

export const getServiceAvailabilityDaysArray = (availabilityDays: OfferServiceAvailabilityDaysArray) => {
	const daysArray: Array<string> = [];
	availabilityDays.map((day) => {
		switch (day.code_day) {
			case 'AL':
				daysArray.push('Tout les jours');
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