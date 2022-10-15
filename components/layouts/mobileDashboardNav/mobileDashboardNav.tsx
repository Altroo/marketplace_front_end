import { Stack, Divider, AccordionSummary, Accordion, ThemeProvider, Button } from '@mui/material';
import React, { useEffect } from 'react';
import Styles from './mobileDashboardNav.module.sass';
import MonProfilSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mon-profil.svg';
import AdresseLivraisonSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresses-de-livraison.svg';
import EvaluationSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/evaluation.svg';
import AdresseEmailSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresse-email.svg';
import MotDePasseSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mot-de-passe.svg';
import ComptesReliesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-relies.svg';
import GestionDesDonnesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/gestion-des-donnees.svg';
import CompteBloquesSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/comptes-bloques.svg';
import { default as ImageFuture } from 'next/future/image';
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
} from '../../../utils/routes';
import AccordionDropDownSVG from '../../../public/assets/svgs/globalIcons/filter-drop-down.svg';
import { FilterAccordionTheme } from '../../../utils/themes';
import MiniBackSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';

type SideNavElement = {
	icon: string;
	text: string;
	link: string;
	current: boolean;
	disabled: boolean;
	setContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNavElement: React.FC<SideNavElement> = (props: SideNavElement) => {
	const router = useRouter();
	const { current, setContent } = props;

	useEffect(() => {
		// console.log(current);
		// window.onpopstate = () => {
		// 	// router.push(/*route logic here*/)
		// 	if (current) {
		// 		setContent(false);
		// 	}
		// };
		// router.beforePopState(({ as }) => {
		// 	console.log(as);
		// 	console.log(router.asPath);
		// 	if (current) {
		// 		// Will run when leaving the current page; on back/forward actions
		// 		// Add your logic here, like toggling the modal state
		// 		setContent(false);
		// 		return false;
		// 	}
		// 	return true;
		// });
		// return () => {
		// 	router.beforePopState(() => true);
		// };
	}, [current, router, setContent]);

	return (
		<Stack direction="row" sx={{ width: '100%' }} className={`${props.disabled && Styles.disabledElement}`}>
			<Button className={`${props.disabled && Styles.disabledCursor} ${Styles.elementButton}`}
				onClick={() => {
					if (current) {
						setContent(prevState => !prevState);
					} else {
						router.replace(props.link, undefined, { shallow: true, scroll: false }).then();
					}
				}}
			>
				<Stack direction="row" spacing={2} alignItems="center">
					<ImageFuture src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />
					<span className={Styles.unselectedElement}>{props.text}</span>
				</Stack>
			</Button>
		</Stack>
	);
};

const AccordionElement: React.FC<Omit<SideNavElement, 'link'>> = (props: Omit<SideNavElement, 'link'>) => {
	return (
		<Stack direction="row" spacing={2} sx={{ width: '100%' }}>
			<ImageFuture src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />
			<span className={Styles.unselectedElement}>{props.text}</span>
		</Stack>
	);
};

type Props = {
	setContent: React.Dispatch<React.SetStateAction<boolean>>;
	backText: string;
	children?: React.ReactNode;
};

const MobileDashboardNav: React.FC<Props> = (props: Props) => {
	const router = useRouter();
	const profilNavElements: Array<SideNavElement> = [
		{
			text: 'Mon profil',
			link: DASHBOARD_EDIT_PROFILE,
			icon: MonProfilSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_EDIT_PROFILE),
			setContent: props.setContent,
		},
		{
			text: 'Adresses de livraison',
			link: DASHBOARD_DELIVERIES,
			icon: AdresseLivraisonSVG,
			current: router.pathname.endsWith(DASHBOARD_DELIVERIES),
			disabled: true,
			setContent: props.setContent,
		},
		{
			text: 'Évaluation',
			link: DASHBOARD_RATINGS,
			icon: EvaluationSVG,
			disabled: true,
			current: router.pathname.endsWith(DASHBOARD_RATINGS),
			setContent: props.setContent,
		},
	];
	const parametresNavElements: Array<SideNavElement> = [
		{
			text: 'Adresse email',
			link: DASHBOARD_ADRESSE_EMAIL,
			icon: AdresseEmailSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_ADRESSE_EMAIL),
			setContent: props.setContent,
		},
		{
			text: 'Mot de passe',
			link: DASHBOARD_PASSWORD,
			icon: MotDePasseSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_PASSWORD),
			setContent: props.setContent,
		},
		{
			text: 'Comptes reliés',
			link: DASHBOARD_LINKED_ACCOUNTS,
			icon: ComptesReliesSVG,
			disabled: true,
			current: router.pathname.endsWith(DASHBOARD_LINKED_ACCOUNTS),
			setContent: props.setContent,
		},
	];

	return (
		<Stack direction="column" className={Styles.sideBar} spacing={4}>
			{props.backText && (
				<Stack direction="column">
					<Stack direction="row" justifyContent="space-between">
						<Stack
							className={Styles.topBackNavigationStack}
							direction="row"
							spacing={1}
							onClick={() => router.back()}
							alignItems="center"
						>
							<ImageFuture
								src={MiniBackSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.backIcon}
							/>
							<span className={Styles.backText}>Retour</span>
						</Stack>
					</Stack>
					<span className={Styles.backHeader}>{props.backText}</span>
				</Stack>
			)}
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
									disabled={element.disabled}
									current={element.current}
									setContent={element.setContent}
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
									disabled={element.disabled}
									current={element.current}
									setContent={element.setContent}
								/>
							);
						})}
						<Stack direction="column" className={Styles.accordionStack}>
							<ThemeProvider theme={FilterAccordionTheme()}>
								<Accordion disableGutters square disabled>
									<AccordionSummary
										expandIcon={<ImageFuture src={AccordionDropDownSVG} alt="" width={16} height={16} />}
										sx={{ marginBottom: '0px !important' }}
									>
										<AccordionElement
											text="Gestion des données"
											// link={DASHBOARD_MANAGE_ACCOUNT}
											icon={GestionDesDonnesSVG}
											disabled={true}
											current={router.pathname.endsWith(DASHBOARD_MANAGE_ACCOUNT)}
											setContent={props.setContent}
										/>
									</AccordionSummary>
									{/*<AccordionDetails>*/}
									{/*	<Stack direction="column" spacing={2}>*/}
									{/*		/!*<SideNavElement*!/*/}
									{/*		/!*	text="Comptes bloqués"*!/*/}
									{/*		/!*	link={DASHBOARD_BLOCKED_ACCOUNTS}*!/*/}
									{/*		/!*	icon={CompteBloquesSVG}*!/*/}
									{/*		/!*	current={false}*!/*/}
									{/*		/!*	disabled={true}*!/*/}
									{/*		/! */}
									{/*		/!*<SideNavElement*!/*/}
									{/*		/!*	text="Comptes bloqués"*!/*/}
									{/*		/!*	link={DASHBOARD_BLOCKED_ACCOUNTS}*!/*/}
									{/*		/!*	icon={CompteBloquesSVG}*!/*/}
									{/*		/!*	current={false}*!/*/}
									{/*		/!*	disabled={true}*!/*/}
									{/*		/! */}
									{/*	</Stack>*/}
									{/*</AccordionDetails>*/}
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
					disabled={true}
					current={router.pathname.endsWith(DASHBOARD_BLOCKED_ACCOUNTS)}
					setContent={props.setContent}
				/>
			</Stack>
		</Stack>
	);
};

export default MobileDashboardNav;
