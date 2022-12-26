import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/carriere.module.sass';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooterTemplate from '../components/layouts/footer/customFooterTemplate';
import FooterChairIllu from '../public/assets/images/footer_illu/chair-illu.svg';
import { Stack } from '@mui/material';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import Link from 'next/link';
import CustomFooter from '../components/layouts/footer/customFooter';
import Image from 'next/image';
import LikeOutlineBlueSVG from '../public/assets/svgs/footerIcons/like-outline-blue.svg';
import ComputerOutlineBlueSVG from '../public/assets/svgs/footerIcons/computer-outline-blue.svg';
import HeartOutlineBlueSVG from '../public/assets/svgs/footerIcons/heart-outline-blue.svg';
import Divider from '@mui/material/Divider';

type Props = {
	icon: string;
	text: string;
	children?: React.ReactNode;
};
const CarriereCauseContent: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" spacing="12px" className={Styles.rootListStack} alignItems="center">
			<Image src={props.icon} width="21" height="19" alt="" sizes="100vw" />
			{props.children ? (
				<Stack direction="column">
					<h3 className={Styles.listItemText}>{props.text}</h3>
					{props.children}
				</Stack>
			) : (
				<h3 className={Styles.listItemText}>{props.text}</h3>
			)}
		</Stack>
	);
};

const Carriere: NextPage = () => {
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main} style={{ backgroundColor: '#DBE8FA' }}>
				<CustomFooterTemplate
					addSpacing
					alignTop
					illustration={FooterChairIllu}
					illustrationHeight={457}
					illustrationWidth={288}
				>
					<Stack direction="column" spacing="32px" alignSelf="flex-start">
						<h1 className={Styles.header}>
							<span>Postulez,</span>
							<br />
							on recrute !
						</h1>
						<h2 className={Styles.subHeader}>Avant de déposez votre candidature, voici quelques points à savoir</h2>
						<Stack direction="column" spacing="5px">
							<CarriereCauseContent icon={LikeOutlineBlueSVG} text="Chez Qaryb, on se tutoie mais on se respecte." />
							<CarriereCauseContent
								icon={ComputerOutlineBlueSVG}
								text="On est ouvert au travail en distanciel, le plus important est d’atteindre vos objectifs. "
							/>
							<CarriereCauseContent icon={HeartOutlineBlueSVG} text="On a UNE valeur : empathie">
								<ul>
									<li className={Styles.li}>
										Empathie car on se met à la place de nos vendeurs pour leur offrir les meilleurs outils de vente.
									</li>
									<li className={Styles.li}>
										Empathie car on se met à la place de nos acheteurs pour leur offrir la meilleure expérience d’achat.
									</li>
								</ul>
							</CarriereCauseContent>
						</Stack>
						<Stack direction="column" spacing="24px">
							<p className={Styles.paragrapheOne}>
								Si tu es toujours en train de lire ce message, voici les profils que nous recrutons:
							</p>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
							<h3 className={Styles.profiles}>Développeur(se) en React</h3>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
							<h3 className={Styles.profiles}>Chef(fe) de projet</h3>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
							<h3 className={Styles.profiles}>Ingénieur(e) logistique</h3>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
							<h3 className={Styles.profiles}>Assistant(e) administrative</h3>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
							<h3 className={Styles.profiles}>Assistant(e) commercial(e)</h3>
							<Divider orientation="horizontal" flexItem className={Styles.divider} />
						</Stack>
						<Stack direction="column" spacing="15px">
							<h4 className={Styles.paragrapheTwoHeader}>Voici comment tu dois postuler:</h4>
							<span className={Styles.paragrapheTwo}>Inscrire le titre du poste dans l’objet de l’email.</span>
							<p className={Styles.paragrapheTwo}>
								Dans le corps du message, parle nous de deux choses: <br/>
								- que vas-tu nous apporter ? <br/>
								- qu’attends-tu de nous ? <br/>
								(rémunération, distanciel, intérêts
								professionnels...)
							</p>
							<span className={Styles.paragrapheTwo}>N’oubliez pas d’insérer votre CV.</span>
						</Stack>
						<PrimaryAnchorButton
							anchorcssClass={Styles.anchorButton}
							cssClass={Styles.primaryButton}
							buttonText="Postule !"
							active={true}
							nextPage={'mailto:order@qaryb.com'}
						/>
					</Stack>
				</CustomFooterTemplate>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default Carriere;
