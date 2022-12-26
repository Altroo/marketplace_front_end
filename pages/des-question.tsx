import React from "react";
import { NextPage } from "next";
import Styles from "../styles/index/des-question.module.sass";
import FooterLikeHandIllu from '../public/assets/images/footer_illu/hand-like-illu.svg';
import UserMainNavigationBar from "../components/layouts/userMainNavigationBar/userMainNavigationBar";
import { Stack } from '@mui/material';
import CustomFooter from "../components/layouts/footer/customFooter";
import CustomFooterTemplate from "../components/layouts/footer/customFooterTemplate";
import PrimaryAnchorButton from "../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton";
import Link from "next/link";

const DesQuestion: NextPage = () => {

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main} style={{backgroundColor: '#F8F2DA'}}>
				<CustomFooterTemplate illustration={FooterLikeHandIllu} illustrationHeight={530} illustrationWidth={390}>
					<Stack direction="column" spacing="40px" alignSelf="flex-start">
						<h1 className={Styles.header}>
							<span>Des questions ?</span>
							<br/>On est là pour<br/>vous aider !
						</h1>
						<h2 className={Styles.subHeader}>
							Vous désirez vendre sur Qaryb et avez des questions, prenez rendez vous. Un membre de notre équipe se fera un plaisir de répondre à toutes vos questions par visio conférence.
						</h2>
						<PrimaryAnchorButton
							anchorcssClass={Styles.anchorButton}
							cssClass={Styles.primaryButton}
							buttonText="Prendre un rendez-vous"
							active={true}
							nextPage={"mailto:order@qaryb.com"}
						/>
						<p className={Styles.paragraphe}>
							Pour toute question liée à votre compte ou à votre expérience sur notre plateforme envoyez nous un mail à
							<Link href={"mailto:order@qaryb.com"} target="_blank" rel="noreferrer" className={Styles.link}>
								{' '}order@qaryb.com
							</Link>
							, on vous répondra dans les plus brefs délais.
						</p>
					</Stack>
				</CustomFooterTemplate>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default DesQuestion;