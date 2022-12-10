import React, { useState, useEffect } from 'react';
import Styles from './categoriesList.module.sass';
import Image from 'next/image';
import ActiveCheckBlue from '../../../../public/assets/svgs/globalIcons/active-check-blue.svg';
import Divider from '@mui/material/Divider';
// import black icons
import AccessoireBlack from '../../../../public/assets/svgs/categoryIcons/accessoire-black.svg';
import AnimauxBlack from '../../../../public/assets/svgs/categoryIcons/animaux-black.svg';
import ArtisanatBlack from '../../../../public/assets/svgs/categoryIcons/artisanat-black.svg';
import BeauteBlack from '../../../../public/assets/svgs/categoryIcons/beaute-black.svg';
import CoursBlack from '../../../../public/assets/svgs/categoryIcons/cours-black.svg';
import DiversBlack from '../../../../public/assets/svgs/categoryIcons/divers-black.svg';
import EvenementBlack from '../../../../public/assets/svgs/categoryIcons/evenement-black.svg';
import ImmobilierBlack from '../../../../public/assets/svgs/categoryIcons/immobilier-black.svg';
import JardinBlack from '../../../../public/assets/svgs/categoryIcons/jardin-black.svg';
import LoisirsBlack from '../../../../public/assets/svgs/categoryIcons/loisir-black.svg';
import LivresBlack from '../../../../public/assets/svgs/categoryIcons/livres-black.svg';
import MaisonBlack from '../../../../public/assets/svgs/categoryIcons/maison-black.svg';
import ModeBlack from '../../../../public/assets/svgs/categoryIcons/mode-black.svg';
import MultimediaBlack from '../../../../public/assets/svgs/categoryIcons/multimedia-black.svg';
import MusiqueBlack from '../../../../public/assets/svgs/categoryIcons/musique-black.svg';
import FoodBlack from '../../../../public/assets/svgs/categoryIcons/food-black.svg';
import SanteBlack from '../../../../public/assets/svgs/categoryIcons/sante-black.svg';
import SportBlack from '../../../../public/assets/svgs/categoryIcons/sport-black.svg';
import VehiculeBlack from '../../../../public/assets/svgs/categoryIcons/vehicule-black.svg';
import VoyageBlack from '../../../../public/assets/svgs/categoryIcons/voyage-black.svg';
// import gray icons
import AccessoireGray from '../../../../public/assets/svgs/categoryIcons/accessoire-gray.svg';
import AnimauxGray from '../../../../public/assets/svgs/categoryIcons/animaux-gray.svg';
import ArtisanatGray from '../../../../public/assets/svgs/categoryIcons/artisanat-gray.svg';
import BeauteGray from '../../../../public/assets/svgs/categoryIcons/beaute-gray.svg';
import CoursGray from '../../../../public/assets/svgs/categoryIcons/cours-gray.svg';
import DiversGray from '../../../../public/assets/svgs/categoryIcons/divers-gray.svg';
import EvenementGray from '../../../../public/assets/svgs/categoryIcons/evenement-gray.svg';
import ImmobilierGray from '../../../../public/assets/svgs/categoryIcons/immobilier-gray.svg';
import JardinGray from '../../../../public/assets/svgs/categoryIcons/jardin-gray.svg';
import LoisirsGray from '../../../../public/assets/svgs/categoryIcons/loisir-gray.svg';
import LivresGray from '../../../../public/assets/svgs/categoryIcons/livres-gray.svg';
import MaisonGray from '../../../../public/assets/svgs/categoryIcons/maison-gray.svg';
import ModeGray from '../../../../public/assets/svgs/categoryIcons/mode-gray.svg';
import MultimediaGray from '../../../../public/assets/svgs/categoryIcons/multimedia-gray.svg';
import MusiqueGray from '../../../../public/assets/svgs/categoryIcons/musique-gray.svg';
import FoodGray from '../../../../public/assets/svgs/categoryIcons/food-gray.svg';
import SanteGray from '../../../../public/assets/svgs/categoryIcons/sante-gray.svg';
import SportGray from '../../../../public/assets/svgs/categoryIcons/sport-gray.svg';
import VehiculeGray from '../../../../public/assets/svgs/categoryIcons/vehicule-gray.svg';
import VoyageGray from '../../../../public/assets/svgs/categoryIcons/voyage-gray.svg';
import { Stack, Box } from '@mui/material';
import { OfferCategoriesType, OfferOfferTypeType } from "../../../../types/offer/offerTypes";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { setOfferProductCategories, setOfferServiceCategories } from "../../../../store/actions/offer/offerActions";
import { getLocalOfferProductCategories, getLocalOfferServiceCategories } from "../../../../store/selectors";
import { Desktop } from "../../../../utils/helpers";

type CategoriesObjProps = {
	code: OfferCategoriesType;
	title: string;
	blackIcon: string;
	grayIcon: string;
	offerType: OfferOfferTypeType,
};

const CategoryItemObj: React.FC<CategoriesObjProps> = (props: CategoriesObjProps) => {
	const dispatch = useAppDispatch();
	const pickedProductCategories: Array<OfferCategoriesType> = useAppSelector(getLocalOfferProductCategories);
	const pickedServiceCategories: Array<OfferCategoriesType> = useAppSelector(getLocalOfferServiceCategories);

	const [active, setActive] = useState<boolean>(false);
	const {code} = props;

	useEffect(() => {
		if (props.offerType === 'V'){
			if (pickedProductCategories.includes(code)){
				setActive(true);
			}
		}else if (props.offerType === 'S') {
			if (pickedServiceCategories.includes(code)){
				setActive(true);
			}
		}
	}, [code, pickedProductCategories, pickedServiceCategories, props.offerType]);

	const categoryItemClickHandler = () => {
		if (props.offerType === 'V') {
			dispatch(setOfferProductCategories(code));
		} else if (props.offerType === 'S') {
			dispatch(setOfferServiceCategories(code));
		}
		setActive((prevState) => !prevState);
	};

	return (
		<Box className={Styles.categoryItem}>
			<Stack
				direction="row"
				spacing={1}
				onClick={categoryItemClickHandler}
				className={Styles.categoryItemWrapper}
				alignItems="center"
				justifyContent="space-between"
			>
				<Stack direction="row" spacing={3} sx={{ height: '56px', alignItems: 'center' }}>
					<Image src={active ? props.blackIcon : props.grayIcon} alt="" />
					<span className={`${Styles.categoryTitle} ${active && Styles.active}`}>{props.title}</span>
				</Stack>
				<Stack direction="row" spacing={1}>
					{active && <Image src={ActiveCheckBlue} alt="" />}
				</Stack>
			</Stack>
			<Divider orientation="horizontal" flexItem className={Styles.divider} />
		</Box>
	);
};

type Props = {
	offerType: OfferOfferTypeType,
	children?: React.ReactNode;
};

const CategoriesList: React.FC<Props> = (props: Props) => {

	const categoriesLeftObj: Array<CategoriesObjProps> = [
		{
			code: 'AC',
			title: 'Accessoire',
			grayIcon: AccessoireGray,
			blackIcon: AccessoireBlack,
			offerType: props.offerType,
		},
		{
			code: 'AN',
			title: 'Animaux',
			grayIcon: AnimauxGray,
			blackIcon: AnimauxBlack,
			offerType: props.offerType,
		},
		{
			code: 'AR',
			title: 'Artisanat',
			grayIcon: ArtisanatGray,
			blackIcon: ArtisanatBlack,
			offerType: props.offerType,
		},
		{
			code: 'BE',
			title: 'Beauté',
			grayIcon: BeauteGray,
			blackIcon: BeauteBlack,
			offerType: props.offerType,
		},
		{
			code: 'CO',
			title: 'Cours',
			grayIcon: CoursGray,
			blackIcon: CoursBlack,
			offerType: props.offerType,
		},
		{
			code: 'DI',
			title: 'Divers',
			grayIcon: DiversGray,
			blackIcon: DiversBlack,
			offerType: props.offerType,
		},
		{
			code: 'EV',
			title: 'Évènement',
			grayIcon: EvenementGray,
			blackIcon: EvenementBlack,
			offerType: props.offerType,
		},
		{
			code: 'IM',
			title: 'Immobilier',
			grayIcon: ImmobilierGray,
			blackIcon: ImmobilierBlack,
			offerType: props.offerType,
		},
		{
			code: 'JA',
			title: 'Jardin',
			grayIcon: JardinGray,
			blackIcon: JardinBlack,
			offerType: props.offerType,
		},
		{
			code: 'LO',
			title: 'Loisirs',
			grayIcon: LoisirsGray,
			blackIcon: LoisirsBlack,
			offerType: props.offerType,
		},
	];
	const categoriesRightObj: Array<CategoriesObjProps> = [
		{
			code: 'LI',
			title: 'Livres',
			grayIcon: LivresGray,
			blackIcon: LivresBlack,
			offerType: props.offerType,
		},
		{
			code: 'MA',
			title: 'Maison',
			grayIcon: MaisonGray,
			blackIcon: MaisonBlack,
			offerType: props.offerType,
		},
		{
			code: 'MO',
			title: 'Mode',
			grayIcon: ModeGray,
			blackIcon: ModeBlack,
			offerType: props.offerType,
		},
		{
			code: 'MD',
			title: 'Multimédia',
			grayIcon: MultimediaGray,
			blackIcon: MultimediaBlack,
			offerType: props.offerType,
		},
		{
			code: 'MS',
			title: 'Musique',
			grayIcon: MusiqueGray,
			blackIcon: MusiqueBlack,
			offerType: props.offerType,
		},
		{
			code: 'NO',
			title: 'Nourriture & Alimentation',
			grayIcon: FoodGray,
			blackIcon: FoodBlack,
			offerType: props.offerType,
		},
		{
			code: 'SA',
			title: 'Santé & Bien être',
			grayIcon: SanteGray,
			blackIcon: SanteBlack,
			offerType: props.offerType,
		},
		{
			code: 'SP',
			title: 'Sport',
			grayIcon: SportGray,
			blackIcon: SportBlack,
			offerType: props.offerType,
		},
		{
			code: 'VE',
			title: 'Véhicule',
			grayIcon: VehiculeGray,
			blackIcon: VehiculeBlack,
			offerType: props.offerType,
		},
		{
			code: 'VO',
			title: 'Voyage',
			grayIcon: VoyageGray,
			blackIcon: VoyageBlack,
			offerType: props.offerType,
		},
	];

	return (
		<Stack direction="row" justifyContent="space-between" spacing={4} className={Styles.categoriesListWrapper}>
			<Box sx={{ width: '100%' }} className={Styles.categoriesFirstList}>
				{categoriesLeftObj.map((category, index) => {
					return (
						<CategoryItemObj
							title={category.title}
							blackIcon={category.blackIcon}
							grayIcon={category.grayIcon}
							code={category.code}
							offerType={props.offerType}
							key={index}
						/>
					);
				})}
			</Box>
			<Desktop>
				<Divider orientation="vertical" flexItem className={Styles.divider} />
			</Desktop>
			<Box sx={{ width: '100%' }} className={Styles.categoriesSecondList}>
				{categoriesRightObj.map((category, index) => {
					return (
						<CategoryItemObj
							title={category.title}
							blackIcon={category.blackIcon}
							grayIcon={category.grayIcon}
							code={category.code}
							offerType={props.offerType}
							key={index}
						/>
					);
				})}
			</Box>
		</Stack>
	);
};

export default CategoriesList;
