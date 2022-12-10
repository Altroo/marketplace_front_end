import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from './index.module.sass';
import UserMainNavigationBar from '../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Stack, Box } from '@mui/material';
import CustomFooter from '../../components/layouts/footer/customFooter';
import EmptyCartIlluSVG from '../../public/assets/images/cart_illu/empty-cart-illu.svg';
import Image from 'next/image';
import PrimaryButton from "../../components/htmlElements/buttons/primaryButton/primaryButton";
import { useRouter } from 'next/router';

const EmptyCartContent = () => {
	const router = useRouter();

	return (
		<Box className={Styles.emptyCartBox}>
			<Stack direction="column" spacing="32px" justifyContent="center" alignItems="center">
				<Image src={EmptyCartIlluSVG} alt="" width={199} height={334} sizes="100vw"/>
				<h2 className={Styles.emptyCartHeader}>Votre panier est vide</h2>
				<div className={Styles.primaryButtonWrapper}>
					<PrimaryButton buttonText="Rechercher" active onClick={() => router.push('/')} />
				</div>
			</Stack>
		</Box>
	);
};
const Index: NextPage = () => {
	// TODO needs to check if cart is full or empty
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<EmptyCartContent />
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	/*
	return {
		props: {},
	};
	 */
	/*
	return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	 */
}

export default Index;
