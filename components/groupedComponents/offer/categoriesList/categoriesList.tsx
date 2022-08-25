import React, { useState } from 'react';
import Styles from './categoriesList.module.sass';
import { default as ImageFuture } from 'next/future/image';
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
import { OfferCategoriesType } from '../../../../types/offer/offerTypes';
import { useAppDispatch } from '../../../../utils/hooks';
import { setOfferCategories } from "../../../../store/actions/offer/offerActions";

type CategoriesObjProps = {
	code: OfferCategoriesType;
	title: string;
	blackIcon: string;
	grayIcon: string;
};

const CategoryItemObj: React.FC<CategoriesObjProps> = (props: CategoriesObjProps) => {
	const dispatch = useAppDispatch();
	const [active, setActive] = useState<boolean>(false);

	const categoryItemClickHandler = () => {
		dispatch(setOfferCategories(props.code));
		setActive((prevState) => !prevState);
	};

	return (
		<>
			<Stack
				direction="row"
				spacing={1}
				onClick={categoryItemClickHandler}
				className={Styles.categoryItemWrapper}
				alignItems="center"
				justifyContent="space-between"
			>
				<Stack direction="row" spacing={3} sx={{ height: '56px', alignItems: 'center' }}>
					<ImageFuture src={active ? props.blackIcon : props.grayIcon} alt="" />
					<span className={`${Styles.categoryTitle} ${active && Styles.active}`}>{props.title}</span>
				</Stack>
				<Stack direction="row" spacing={1}>
					{active && <ImageFuture src={ActiveCheckBlue} alt="" />}
				</Stack>
			</Stack>
			<Divider orientation="horizontal" flexItem className={Styles.divider} />
		</>
	);
};

type Props = {
	children?: React.ReactNode;
};

const CategoriesList: React.FC<Props> = (props: Props) => {
	const categoriesLeftObj: Array<CategoriesObjProps> = [
		{
			code: 'AC',
			title: 'Accessoire',
			grayIcon: AccessoireGray,
			blackIcon: AccessoireBlack,
		},
		{
			code: 'AN',
			title: 'Animaux',
			grayIcon: AnimauxGray,
			blackIcon: AnimauxBlack,
		},
		{
			code: 'AR',
			title: 'Artisanat',
			grayIcon: ArtisanatGray,
			blackIcon: ArtisanatBlack,
		},
		{
			code: 'BE',
			title: 'Beauté',
			grayIcon: BeauteGray,
			blackIcon: BeauteBlack,
		},
		{
			code: 'CO',
			title: 'Cours',
			grayIcon: CoursGray,
			blackIcon: CoursBlack,
		},
		{
			code: 'DI',
			title: 'Divers',
			grayIcon: DiversGray,
			blackIcon: DiversBlack,
		},
		{
			code: 'EV',
			title: 'Évènement',
			grayIcon: EvenementGray,
			blackIcon: EvenementBlack,
		},
		{
			code: 'IM',
			title: 'Immobilier',
			grayIcon: ImmobilierGray,
			blackIcon: ImmobilierBlack,
		},
		{
			code: 'JA',
			title: 'Jardin',
			grayIcon: JardinGray,
			blackIcon: JardinBlack,
		},
		{
			code: 'LO',
			title: 'Loisirs',
			grayIcon: LoisirsGray,
			blackIcon: LoisirsBlack,
		},
	];
	const categoriesRightObj: Array<CategoriesObjProps> = [
		{
			code: 'LI',
			title: 'Livres',
			grayIcon: LivresGray,
			blackIcon: LivresBlack,
		},
		{
			code: 'MA',
			title: 'Maison',
			grayIcon: MaisonGray,
			blackIcon: MaisonBlack,
		},
		{
			code: 'MO',
			title: 'Mode',
			grayIcon: ModeGray,
			blackIcon: ModeBlack,
		},
		{
			code: 'MD',
			title: 'Multimédia',
			grayIcon: MultimediaGray,
			blackIcon: MultimediaBlack,
		},
		{
			code: 'MS',
			title: 'Musique',
			grayIcon: MusiqueGray,
			blackIcon: MusiqueBlack,
		},
		{
			code: 'NO',
			title: 'Nourriture & Alimentation',
			grayIcon: FoodGray,
			blackIcon: FoodBlack,
		},
		{
			code: 'SA',
			title: 'Santé & Bien être',
			grayIcon: SanteGray,
			blackIcon: SanteBlack,
		},
		{
			code: 'SP',
			title: 'Sport',
			grayIcon: SportGray,
			blackIcon: SportBlack,
		},
		{
			code: 'VE',
			title: 'Véhicule',
			grayIcon: VehiculeGray,
			blackIcon: VehiculeBlack,
		},
		{
			code: 'VO',
			title: 'Voyage',
			grayIcon: VoyageGray,
			blackIcon: VoyageBlack,
		},
	];

	return (
		<Stack direction="row" justifyContent="space-between" spacing={4} className={Styles.categoriesListWrapper}>
			<Box sx={{ width: '100%' }}>
				{categoriesLeftObj.map((category, index) => {
					return (
						<CategoryItemObj
							title={category.title}
							blackIcon={category.blackIcon}
							grayIcon={category.grayIcon}
							code={category.code}
							key={index}
						/>
					);
				})}
			</Box>
			<Divider orientation="vertical" flexItem className={`${Styles.divider} ${Styles.mobileHidden}`} />
			<Box sx={{ width: '100%' }} className={Styles.categoriesSecondList}>
				{categoriesRightObj.map((category, index) => {
					return (
						<CategoryItemObj
							title={category.title}
							blackIcon={category.blackIcon}
							grayIcon={category.grayIcon}
							code={category.code}
							key={index}
						/>
					);
				})}
			</Box>
		</Stack>
	);
};

export default CategoriesList;
