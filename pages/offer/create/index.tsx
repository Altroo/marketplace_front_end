import React from 'react';
import { NextPage } from 'next';
import Styles from '../../../styles/offer/create/offerCreateShared.module.sass';
import OfferTypeCard from '../../../components/groupedComponents/offer/offerTypeCard/offerTypeCard';
import SellProductIcon from '../../../public/assets/svgs/globalIcons/sell-product-icon.svg';
import SellServiceIcon from '../../../public/assets/svgs/globalIcons/sell-service-icon.svg';
import SellLocationIcon from '../../../public/assets/svgs/globalIcons/sell-location-icon.svg';
import { Stack } from '@mui/material';
import { OFFER_ADD_PRODUCT_CATEGORIES } from "../../../utils/routes";

const Index: NextPage = () => {
	return (
		<main className={Styles.main}>
			<Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={3} className={Styles.flexWrapper}>
				<h2 className={Styles.header}>Choississez le type d&apos;offre que vous souhaitez vendre</h2>
				<Stack direction="column" spacing={2} className={Styles.cardsWrapper}>
					<OfferTypeCard
						title="Vendre"
						svgIcon={SellProductIcon}
						description="un produit, un bien immobilier, un véhicule…"
						nextPage={OFFER_ADD_PRODUCT_CATEGORIES}
					/>
					<OfferTypeCard
						title="Offrir un service"
						svgIcon={SellServiceIcon}
						description="de cours, de transport, de réparation…"
						nextPage="#"
					/>
					<OfferTypeCard
						title="Location"
						svgIcon={SellLocationIcon}
						description="un produit, un bien immobilier, une salle des fêtes, un véhicule…"
					/>
				</Stack>
			</Stack>
		</main>
	);
};

export default Index;
