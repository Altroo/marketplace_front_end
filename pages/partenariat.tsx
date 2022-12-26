import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/partenariat.module.sass';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooterTemplate from '../components/layouts/footer/customFooterTemplate';
import FooterHandHeartIllu from '../public/assets/images/footer_illu/hand-heart-illu.svg';
import FilledHeartPurpleSVG from '../public/assets/svgs/footerIcons/filled-heart-purple.svg';
import { Stack } from '@mui/material';
import PrimaryAnchorButton from '../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton';
import CustomFooter from '../components/layouts/footer/customFooter';
import Image from "next/image";

type Props = {
	text: string
}
const PartenariatCauseContent: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" spacing="12px" className={Styles.rootListStack} alignItems="center">
			<Image
				src={FilledHeartPurpleSVG}
				width="20"
				height="18"
				alt=""
				sizes="100vw"
			/>
			<h3 className={Styles.listItemText}>{props.text}</h3>
		</Stack>
	);
};

const Partenariat: NextPage = () => {
	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main} style={{ backgroundColor: '#D5CEEE' }}>
				<CustomFooterTemplate illustration={FooterHandHeartIllu} illustrationWidth={263} illustrationHeight={534}>
					<Stack direction="column" spacing="32px" alignSelf="flex-start">
						<h1 className={Styles.header}>
							<span>Devenez</span>
							<br />
							Partenaire
						</h1>
						<h2 className={Styles.subHeader}>Trois causes nous tiennent à coeur :</h2>
						<Stack direction="column" spacing="5px">
							<PartenariatCauseContent text="la valorisation du Made in Morocco" />
							<PartenariatCauseContent text="la promotion de l’entrepreunariat au Maroc" />
							<PartenariatCauseContent text="l’inclusion économique et sociales des jeunes et des femmes" />
						</Stack>
						<p className={Styles.paragraphe}>
							Si vous êtes une organisation publique, une ONG ou une entreprises désirant soutenir l’une de ces trois
							causes, Qaryb peut vous accompagner.
						</p>
						<PrimaryAnchorButton
							anchorcssClass={Styles.anchorButton}
							cssClass={Styles.primaryButton}
							buttonText="Devenez partenaire"
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

export default Partenariat;
