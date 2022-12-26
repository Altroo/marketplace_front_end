import { Stack, Button } from '@mui/material';
import React from 'react';
import Styles from './mobileDashboardNav.module.sass';
import MonProfilSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mon-profil.svg';
import AdresseEmailSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/adresse-email.svg';
import MotDePasseSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mot-de-passe.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	DASHBOARD_ADRESSE_EMAIL,
	DASHBOARD_PASSWORD,
	DASHBOARD_EDIT_PROFILE, SITE_ROOT
} from "../../../../utils/routes";
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';

export type MobileSideNavElementType = {
	icon: string;
	text: string;
	link: string;
	current: boolean;
	disabled: boolean;
	setContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileSideNavElement: React.FC<MobileSideNavElementType> = (props: MobileSideNavElementType) => {
	const router = useRouter();
	const { current, setContent } = props;

	return (
		<Stack direction="row" sx={{ width: '100%' }} className={`${props.disabled && Styles.disabledElement}`}>
			<Button className={`${props.disabled && Styles.disabledCursor} ${Styles.elementButton}`}
				onClick={() => {
					if (current) {
						setContent(prevState => !prevState);
					} else {
						router.replace({
							query: {
								direct: true,
							},
							pathname: props.link,
						}, props.link).then();
					}
				}}
			>
				<Stack direction="row" spacing={2} alignItems="center">
					<Image src={props.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.mainIcon} />
					<span className={Styles.unselectedElement}>{props.text}</span>
				</Stack>
			</Button>
		</Stack>
	);
};


type Props = {
	setContent: React.Dispatch<React.SetStateAction<boolean>>;
	backText?: string;
	children?: React.ReactNode;
};

const MobileDashboardNav: React.FC<Props> = (props: Props) => {
	const router = useRouter();
	const profilNavElements: Array<MobileSideNavElementType> = [
		{
			text: 'Mon profil',
			link: DASHBOARD_EDIT_PROFILE,
			icon: MonProfilSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_EDIT_PROFILE.replace(SITE_ROOT, '')),
			setContent: props.setContent,
		},
	];
	const parametresNavElements: Array<MobileSideNavElementType> = [
		{
			text: 'Adresse email',
			link: DASHBOARD_ADRESSE_EMAIL,
			icon: AdresseEmailSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_ADRESSE_EMAIL.replace(SITE_ROOT, '')),
			setContent: props.setContent,
		},
		{
			text: 'Mot de passe',
			link: DASHBOARD_PASSWORD,
			icon: MotDePasseSVG,
			disabled: false,
			current: router.pathname.endsWith(DASHBOARD_PASSWORD.replace(SITE_ROOT, '')),
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
							<Image
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
								<MobileSideNavElement
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
								<MobileSideNavElement
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
			</Stack>
		</Stack>
	);
};

export default MobileDashboardNav;
