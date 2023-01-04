import React from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
import Styles from '../../../../styles/shop/shop_link/article/articleIndex.module.sass';
import OfferTypeCard from '../../../../components/groupedComponents/temp-offer/offerTypeCard/offerTypeCard';
import SellProductIcon from '../../../../public/assets/svgs/globalIcons/sell-product-icon.svg';
import SellServiceIcon from '../../../../public/assets/svgs/globalIcons/sell-service-icon.svg';
import SellLocationIcon from '../../../../public/assets/svgs/globalIcons/sell-location-icon.svg';
import { Stack } from '@mui/material';
import {
	REAL_OFFER_ADD_PRODUCT_CATEGORIES,
	REAL_OFFER_ADD_SERVICE_CATEGORIES,
	REAL_SHOP_ADD_SHOP_NAME
} from "../../../../utils/routes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import UserMainNavigationBar from "../../../../components/layouts/userMainNavigationBar/userMainNavigationBar";
import { Desktop, TabletAndMobile } from "../../../../utils/helpers";
import { setEmptyUserLocalOffer } from "../../../../store/actions/offer/offerActions";
import { useAppDispatch } from "../../../../utils/hooks";

const Index: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack
					direction="row"
					justifyContent="space-evenly"
					alignItems="center"
					spacing={3}
					className={Styles.flexWrapper}
				>
					<Desktop>
						<h2 className={Styles.header}>Choississez le type d&apos;offre que vous souhaitez vendre</h2>
					</Desktop>
					<TabletAndMobile>
						<h2 className={Styles.header}>Je souhaite...</h2>
					</TabletAndMobile>
					<Stack direction="column" spacing={2} className={Styles.cardsWrapper}>
						<OfferTypeCard
							title="Vendre"
							svgIcon={SellProductIcon}
							description="un produit, un bien immobilier, un véhicule…"
							nextPage={REAL_OFFER_ADD_PRODUCT_CATEGORIES(router.query.shop_link as string)}
							onClick={() => dispatch(setEmptyUserLocalOffer())}
						/>
						<OfferTypeCard
							title="Offrir un service"
							svgIcon={SellServiceIcon}
							description="de cours, de transport, de réparation…"
							nextPage={REAL_OFFER_ADD_SERVICE_CATEGORIES(router.query.shop_link as string)}
							onClick={() => dispatch(setEmptyUserLocalOffer())}
						/>
						<OfferTypeCard
							title="Location"
							svgIcon={SellLocationIcon}
							description="un produit, un bien immobilier, une salle des fêtes, un véhicule…"
						/>
					</Stack>
				</Stack>
			</main>
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const tokenCookies = getCookie('@tokenType', { req: context.req, res: context.res });
	if (typeof tokenCookies === 'undefined' || tokenCookies === null || tokenCookies === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: REAL_SHOP_ADD_SHOP_NAME,
			},
		};
	}
	return {
		props: {},
	}
}

export default Index;
