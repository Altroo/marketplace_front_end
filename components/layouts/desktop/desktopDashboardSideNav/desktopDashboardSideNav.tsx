import {
	Stack,
	Divider,
	AccordionSummary,
	AccordionDetails,
	Accordion,
	ThemeProvider,
} from "@mui/material";
import React from 'react';
import Styles from './desktopDashboardSideNav.module.sass';
import ArrowActiveSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/arrow-active.svg';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MonProfilSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mon-profil.svg';
import AdresseLivraisonSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresses-de-livraison.svg';
import EvaluationSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/evaluation.svg';
import AdresseEmailSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresse-email.svg';
import MotDePasseSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mot-de-passe.svg';
import ComptesReliesSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-relies.svg';
import GestionDesDonnesSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/gestion-des-donnees.svg';
import CompteBloquesSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-bloques.svg';
import { default as ImageFuture } from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	DASHBOARD_ADRESSE_EMAIL,
	DASHBOARD_BLOCKED_ACCOUNTS,
	DASHBOARD_DELIVERIES,
	DASHBOARD_LINKED_ACCOUNTS,
	DASHBOARD_MANAGE_ACCOUNT,
	DASHBOARD_PASSWORD,
	DASHBOARD_EDIT_PROFILE,
	DASHBOARD_RATINGS,
} from '../../../../utils/routes';
import AccordionDropDownSVG from "../../../../public/assets/svgs/globalIcons/filter-drop-down.svg";
import { FilterAccordionTheme } from "../../../../utils/themes";

export type DesktopSideNavElementType = {
	icon: string;
	text: string;
	current: boolean;
	link: string;
	disabled: boolean;
};

export const DesktopSideNavElement: React.FC<DesktopSideNavElementType> = (props: DesktopSideNavElementType) => {
	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" className={`${props.disabled && Styles.disabledElement}`}>
			<Link href={props.link} passHref>
				<a className={`${props.disabled && Styles.disabledCursor}`}>
					<Stack direction="row" spacing={2} alignItems="center">
						<ImageFuture src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />
						<span className={`${props.current ? Styles.selectedElement : Styles.unselectedElement}`}>{props.text}</span>
					</Stack>
				</a>
			</Link>
			{props.current && (
				<ImageFuture src={ArrowActiveSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.arrowIcon} />
			)}
		</Stack>
	);
};

const AccordionElement: React.FC<Omit<DesktopSideNavElementType, 'link'>> = (props: Omit<DesktopSideNavElementType, 'link'>) => {
	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center">
			<Stack direction="row" spacing={2} alignItems="center">
				<ImageFuture src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />
				<span className={`${props.current ? Styles.selectedElement : Styles.unselectedElement}`}>{props.text}</span>
			</Stack>
			{props.current && (
				<ImageFuture src={ArrowActiveSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.arrowIcon} />
			)}
		</Stack>
	);
};

type Props = {
	backText?: string;
	children?: React.ReactNode;
};

const DesktopDashboardSideNav: React.FC<Props> = (props: Props) => {
	const router = useRouter();
	const profilNavElements: Array<DesktopSideNavElementType> = [
		{
			text: 'Mon profil',
			link: DASHBOARD_EDIT_PROFILE,
			icon: MonProfilSVG,
			current: router.pathname.endsWith(DASHBOARD_EDIT_PROFILE),
			disabled: false,
		},
		{
			text: 'Adresses de livraison',
			link: DASHBOARD_DELIVERIES,
			icon: AdresseLivraisonSVG,
			current: router.pathname.endsWith(DASHBOARD_DELIVERIES),
			disabled: true,
		},
		{
			text: 'Évaluation',
			link: DASHBOARD_RATINGS,
			icon: EvaluationSVG,
			current: router.pathname.endsWith(DASHBOARD_RATINGS),
			disabled: true,
		},
	];
	const parametresNavElements: Array<DesktopSideNavElementType> = [
		{
			text: 'Adresse email',
			link: DASHBOARD_ADRESSE_EMAIL,
			icon: AdresseEmailSVG,
			current: router.pathname.endsWith(DASHBOARD_ADRESSE_EMAIL),
			disabled: false,
		},
		{
			text: 'Mot de passe',
			link: DASHBOARD_PASSWORD,
			icon: MotDePasseSVG,
			current: router.pathname.endsWith(DASHBOARD_PASSWORD),
			disabled: false,
		},
		{
			text: 'Comptes reliés',
			link: DASHBOARD_LINKED_ACCOUNTS,
			icon: ComptesReliesSVG,
			current: router.pathname.endsWith(DASHBOARD_LINKED_ACCOUNTS),
			disabled: true,
		},
	];

	return (
		<Stack direction="column" className={Styles.sideBar}>
			<Stack direction="column" spacing={4}>
				{props.backText && <Stack direction="column">
					<Stack direction="row" justifyContent="space-between">
						<Stack
							className={Styles.topBackNavigationStack}
							direction="row"
							spacing={1}
							onClick={() => router.back()}
							alignItems="center"
						>
							<ImageFuture src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
							<span className={Styles.backText}>Retour</span>
						</Stack>
					</Stack>
					<span className={Styles.backHeader}>{props.backText}</span>
				</Stack>}
				<Stack direction="column" spacing={4}>
					<Stack direction="column" spacing={2}>
						<span className={Styles.header}>Profil</span>
						<Stack direction="column" spacing={2}>
							{profilNavElements.map((element, index) => {
								return (
									<DesktopSideNavElement
										text={element.text}
										key={index}
										link={element.link}
										icon={element.icon}
										current={element.current}
										disabled={element.disabled}
									/>
								);
							})}
						</Stack>
					</Stack>
					<Stack direction="column" spacing={2}>
						<span className={Styles.header}>Paramètres</span>
						<Stack direction="column" spacing={2}>
							{parametresNavElements.map((element, index) => {
								return (
									<DesktopSideNavElement
										text={element.text}
										key={index}
										link={element.link}
										icon={element.icon}
										current={element.current}
										disabled={element.disabled}
									/>
								);
							})}
							<Stack direction="column" className={Styles.accordionStack}>
								<ThemeProvider theme={FilterAccordionTheme()}>
									<Accordion disableGutters square disabled>
										<AccordionSummary
											expandIcon={<ImageFuture src={AccordionDropDownSVG} alt="" width={16} height={16} />}
											sx={{marginBottom: '0px !important'}}
										>
											<AccordionElement
												text="Gestion des données"
												icon={GestionDesDonnesSVG}
												current={router.pathname.endsWith(DASHBOARD_MANAGE_ACCOUNT)}
												disabled={true}
											/>
										</AccordionSummary>
										<AccordionDetails>
											<Stack direction="column" spacing={2}>
												{/*<SideNavElement*/}
												{/*	text="Comptes bloqués"*/}
												{/*	link={DASHBOARD_BLOCKED_ACCOUNTS}*/}
												{/*	icon={CompteBloquesSVG}*/}
												{/*	current={false}*/}
												{/*	disabled={true}*/}
												{/*/>*/}
												{/*<SideNavElement*/}
												{/*	text="Comptes bloqués"*/}
												{/*	link={DASHBOARD_BLOCKED_ACCOUNTS}*/}
												{/*	icon={CompteBloquesSVG}*/}
												{/*	current={false}*/}
												{/*	disabled={true}*/}
												{/*/>*/}
											</Stack>
										</AccordionDetails>
									</Accordion>
								</ThemeProvider>
							</Stack>
						</Stack>
					</Stack>
					<Divider orientation="horizontal" flexItem />
					<DesktopSideNavElement
						text="Comptes bloqués"
						link={DASHBOARD_BLOCKED_ACCOUNTS}
						icon={CompteBloquesSVG}
						current={router.pathname.endsWith(DASHBOARD_BLOCKED_ACCOUNTS)}
						disabled={true}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DesktopDashboardSideNav;