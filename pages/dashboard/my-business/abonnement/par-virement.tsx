import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import SharedStyles from '../../../../styles/dashboard/dashboard.module.sass';
import Styles from '../../../../styles/dashboard/subscription.module.sass';
import {
	defaultInstance,
	getServerSideCookieTokens,
	getServerSideVirementData,
	isAuthenticatedInstance
} from "../../../../utils/helpers";
import {
	AccountGetCheckAccountResponseType,
	AccountGetDashboardResponseType,
} from '../../../../types/account/accountTypes';
import { getApi } from '../../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../../utils/routes';
import { VirementDataResponseType, VirementDataType } from '../../../../types/version/versionTypes';
import { Stack, Box } from '@mui/material';
import UserMainNavigationBar from '../../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import Link from 'next/link';

type ParVirementProps = {
	pageProps: {
		data: VirementDataType;
		reference_number: string;
		total_paid: number;
	};
};

const ParVirement: NextPage<ParVirementProps> = (props: ParVirementProps) => {
	const { data, reference_number, total_paid } = props.pageProps;

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${SharedStyles.fixMobile}`}>
				<Stack direction="row" justifyContent="space-between" className={Styles.mobileStack}>
					<Stack direction="column" spacing="48px" className={Styles.desktopStack}>
						<Stack direction="column" spacing="24px">
							<h1 className={Styles.hOneHeader}>Vous y êtes presque !</h1>
							<Stack direction="column" spacing="45px">
								<span className={Styles.parVirementSubHeader}>
									Afin de valider votre commande, procédez au virement en suivant les instructions :
								</span>
								<Stack direction="column" spacing="34px">
									<Stack direction="column" spacing="20px">
										<span className={Styles.parVirementListItem}>
											1 ) Indiquez la référence suivante sur votre note de virement
										</span>
										<Box className={Styles.parVirementListItemBox}>
											<span>{reference_number}</span>
										</Box>
									</Stack>
									<Stack direction="column" spacing="20px">
										<span className={Styles.parVirementListItem}>2 ) Le montant TTC</span>
										<Box className={Styles.parVirementListItemBox}>
											<span>{total_paid} MAD</span>
										</Box>
									</Stack>
									<Stack direction="column" spacing="20px">
										<span className={Styles.parVirementListItem}>
											3 ) Envoyez votre reçu avec la référence dans l&apos;objet de l&apos;email à
										</span>
										<Box className={Styles.parVirementListItemBox}>
											<Link href={`mailto:${data.email}`} target="_blank" rel="noreferrer" className={Styles.parVirementListEmailItem}>
												{data.email}
											</Link>
										</Box>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Box className={Styles.parVirementBox}>
						<Stack direction="column" spacing="38px">
							<span className={Styles.parVirementBoxHeader}>Coordonnées bancaires</span>
							<Stack direction="column" spacing="24px">
								<Stack direction="column" spacing="6px">
									<span className={Styles.parVirementBoxItem}>Domiciliation</span>
									<Box className={Styles.parVirementBoxRoot}>
										<span>{data.domiciliation}</span>
									</Box>
								</Stack>
								<Stack direction="column" spacing="6px">
									<span className={Styles.parVirementBoxItem}>Numéro de compte</span>
									<Box className={Styles.parVirementBoxRoot}>
										<span>{data.numero_de_compte}</span>
									</Box>
								</Stack>
								<Stack direction="column" spacing="6px">
									<span className={Styles.parVirementBoxItem}>Titulaire de compte</span>
									<Box className={Styles.parVirementBoxRoot}>
										<span>{data.titulaire_du_compte}</span>
									</Box>
								</Stack>
								<Stack direction="column" spacing="6px">
									<span className={Styles.parVirementBoxItem}>Numéro RIB</span>
									<Box className={Styles.parVirementBoxRoot}>
										<span>{data.numero_rib}</span>
									</Box>
								</Stack>
								<Stack direction="column" spacing="6px">
									<span className={Styles.parVirementBoxItem}>Identifiant SWIFT</span>
									<Box className={Styles.parVirementBoxRoot}>
										<span>{data.identifiant_swift}</span>
									</Box>
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</main>
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_CHECK_ACCOUNT}`;
	const appToken = getServerSideCookieTokens(context);
	const { reference_number, total_paid } = getServerSideVirementData(context);

	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetCheckAccountResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const dashboard_url = `${process.env.NEXT_PUBLIC_ACCOUNT_GET_DASHBOARD}`;
				const response_shop: AccountGetDashboardResponseType = await getApi(dashboard_url, instance);
				if (response.data.has_shop && response_shop.status === 200) {
					// checking params reference_number & total_paid
					if (!reference_number || !total_paid) {
						// show subscribe now content
						return {
							redirect: {
								permanent: false,
								destination: NOT_FOUND_404,
							},
						};
					} else {
						// send virement data to view
						const url = `${process.env.NEXT_PUBLIC_BACKEND_VIREMENT_DATA}`;
						const base_url = `${process.env.NEXT_PUBLIC_ROOT_API_URL_FOR_VERSION}`;
						const default_instance = defaultInstance(base_url);
						const response: VirementDataResponseType = await getApi(url, default_instance);
						if (response.status === 200) {
							return {
								props: {
									data: response.data,
									reference_number: reference_number,
									total_paid: total_paid,
								},
							};
						} else {
							// error getting the response
							return {
								redirect: {
									permanent: false,
									destination: NOT_FOUND_404,
								},
							};
						}
					}
					// doesn't own a shop
				} else {
					return {
						redirect: {
							permanent: false,
							destination: NOT_FOUND_404,
						},
					};
				}
				// fall back error
			} else {
				return {
					redirect: {
						permanent: false,
						destination: NOT_FOUND_404,
					},
				};
			}
		} else {
			// redirect to login page
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
		// redirect to 404
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default ParVirement;
