import React, { useCallback } from 'react';
import Styles from '../../../styles/panier/shop_pk/order-complete.module.sass';
import SuccessIlluSVG from '../../../public/assets/images/success-illu.svg';
import Image from 'next/image';
import { Stack } from '@mui/material';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import { SITE_ROOT } from "../../../utils/routes";
import { NextPage } from "next";

const OrderComplete: NextPage = () => {
	const router = useRouter();

	const onClickHandler = useCallback(() => {
		router.replace(SITE_ROOT).then();
	}, [router]);

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="column" textAlign="center" justifyContent="center">
					<Stack direction="column" spacing="24px" className={Styles.rootStack}>
						<Stack direction="column" spacing="50px" alignItems="center">
							<Image src={SuccessIlluSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
							<Stack direction="column" spacing="18px">
								<h2 className={Styles.header}>Merci pour votre commande !</h2>
								<p className={Styles.subHeader}>
									Vous recevrez bientôt une confirmation du vendeur pour la réservation de votre commande. <br />
									Nous vous avons envoyer un récapitulatif de votre commande. <br />
									Veuillez vérifier vos email indésirable.
								</p>
							</Stack>
						</Stack>
						<div className={Styles.primaryButtonWrapper}>
							<PrimaryButton buttonText="Continuer mes achats" active={true} onClick={onClickHandler} />
						</div>
					</Stack>
				</Stack>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default OrderComplete;
