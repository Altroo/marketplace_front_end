import {
	Stack,
	Divider,
	AccordionSummary,
	AccordionDetails,
	Accordion,
	ThemeProvider,
	IconButton,
	Button
} from "@mui/material";
import React from 'react';
import Styles from './desktopDashboardLeftSideNav.module.sass';
import ArrowActiveSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/arrow-active.svg';
import MiniBackSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MonProfilSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mon-profil.svg';
import AdresseLivraisonSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresses-de-livraison.svg';
import EvaluationSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/evaluation.svg';
import AdresseEmailSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresse-email.svg';
import MotDePasseSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mot-de-passe.svg';
import ComptesReliesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-relies.svg';
import GestionDesDonnesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/gestion-des-donnees.svg';
import CompteBloquesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-bloques.svg';
import CloseSVG from "../../../public/assets/svgs/navigationIcons/close.svg";
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
	DASHBOARD_PROFILE,
	DASHBOARD_RATINGS,
} from '../../../utils/routes';
import AccordionDropDownSVG from "../../../public/assets/svgs/globalIcons/filter-drop-down.svg";
import { FilterAccordionTheme } from "../../../utils/themes";

type SideNavElement = {
	icon: string;
	text: string;
	current: boolean;
	link: string;
	disabled: boolean;
	// onClose?: () => void;
};

const SideNavElement: React.FC<SideNavElement> = (props: SideNavElement) => {
	const router = useRouter();

	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" className={`${props.disabled && Styles.disabledElement}`}>
			{/*<Button className={`${props.disabled && Styles.disabledCursor} ${Styles.elementButton}`} onClick={() => {*/}
			{/*	if (props.onClose) {*/}
			{/*		props.onClose();*/}
			{/*	}*/}
			{/*	router.replace(props.link).then();*/}
			{/*}}>*/}
			{/*	<Stack direction="row" spacing={2} alignItems="center">*/}
			{/*			<ImageFuture src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />*/}
			{/*			<span className={`${props.current ? Styles.selectedElement : Styles.unselectedElement}`}>{props.text}</span>*/}
			{/*		</Stack>*/}
			{/*</Button>*/}
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

const AccordionElement: React.FC<Omit<SideNavElement, 'link'>> = (props: Omit<SideNavElement, 'link'>) => {
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
	// mobile?: boolean;
	// onClose?: () => void;
	backText?: string;
	children?: React.ReactNode;
};

const DesktopDashboardLeftSideNav: React.FC<Props> = (props: Props) => {
	const router = useRouter();
	const profilNavElements: Array<SideNavElement> = [
		{
			text: 'Mon profil',
			link: DASHBOARD_PROFILE,
			icon: MonProfilSVG,
			current: router.pathname.endsWith(DASHBOARD_PROFILE),
			disabled: false,
			// onClose: props.onClose,
		},
		{
			text: 'Adresses de livraison',
			link: DASHBOARD_DELIVERIES,
			icon: AdresseLivraisonSVG,
			current: router.pathname.endsWith(DASHBOARD_DELIVERIES),
			disabled: true,
			// onClose: props.onClose,
		},
		{
			text: 'Évaluation',
			link: DASHBOARD_RATINGS,
			icon: EvaluationSVG,
			current: router.pathname.endsWith(DASHBOARD_RATINGS),
			disabled: true,
			// onClose: props.onClose,
		},
	];
	const parametresNavElements: Array<SideNavElement> = [
		{
			text: 'Adresse email',
			link: DASHBOARD_ADRESSE_EMAIL,
			icon: AdresseEmailSVG,
			current: router.pathname.endsWith(DASHBOARD_ADRESSE_EMAIL),
			disabled: false,
			// onClose: props.onClose,
		},
		{
			text: 'Mot de passe',
			link: DASHBOARD_PASSWORD,
			icon: MotDePasseSVG,
			current: router.pathname.endsWith(DASHBOARD_PASSWORD),
			disabled: false,
			// onClose: props.onClose,
		},
		{
			text: 'Comptes reliés',
			link: DASHBOARD_LINKED_ACCOUNTS,
			icon: ComptesReliesSVG,
			current: router.pathname.endsWith(DASHBOARD_LINKED_ACCOUNTS),
			disabled: true,
			// onClose: props.onClose,
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
						{/*{props.onClose && (*/}
						{/*	<IconButton*/}
						{/*		onClick={props.onClose}*/}
						{/*		size="large"*/}
						{/*		color="inherit"*/}
						{/*		>*/}
						{/*		<ImageFuture*/}
						{/*			src={CloseSVG}*/}
						{/*			alt=""*/}
						{/*			width="0"*/}
						{/*			height="0"*/}
						{/*			sizes="100vw"*/}
						{/*			className={Styles.mainIcon}*/}
						{/*		/>*/}
						{/*	</IconButton>*/}
						{/*)}*/}
					</Stack>
					<span className={Styles.backHeader}>{props.backText}</span>
				</Stack>}
				<Stack direction="column" spacing={4}>
					<Stack direction="column" spacing={2}>
						<span className={Styles.header}>Profil</span>
						<Stack direction="column" spacing={2}>
							{profilNavElements.map((element, index) => {
								return (
									<SideNavElement
										text={element.text}
										key={index}
										link={element.link}
										icon={element.icon}
										current={element.current}
										disabled={element.disabled}
										// onClose={element.onClose}
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
									<SideNavElement
										text={element.text}
										key={index}
										link={element.link}
										icon={element.icon}
										current={element.current}
										disabled={element.disabled}
										// onClose={element.onClose}
									/>
								);
							})}
							{/* gestion des données */}
							{/*<SideNavElement*/}
							{/*	text="Gestion des données"*/}
							{/*	link={DASHBOARD_MANAGE_ACCOUNT}*/}
							{/*	icon={GestionDesDonnesSVG}*/}
							{/*	current={router.pathname.endsWith(DASHBOARD_MANAGE_ACCOUNT)}*/}
							{/*	disabled={true}*/}
							{/*/>*/}
							<Stack direction="column" className={Styles.accordionStack}>
								<ThemeProvider theme={FilterAccordionTheme()}>
									<Accordion disableGutters square disabled>
										<AccordionSummary
											expandIcon={<ImageFuture src={AccordionDropDownSVG} alt="" width={16} height={16} />}
											sx={{marginBottom: '0px !important'}}
										>
											<AccordionElement
												text="Gestion des données"
												// link={DASHBOARD_MANAGE_ACCOUNT}
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
					<SideNavElement
						text="Comptes bloqués"
						link={DASHBOARD_BLOCKED_ACCOUNTS}
						icon={CompteBloquesSVG}
						current={router.pathname.endsWith(DASHBOARD_BLOCKED_ACCOUNTS)}
						disabled={true}
						// onClose={props.onClose}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DesktopDashboardLeftSideNav;
