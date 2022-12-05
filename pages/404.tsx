import React from "react";
import { NextPage } from "next";
import Styles from "./404.module.sass";
import Image from 'next/image';
import NotFoundIlluSVG from '../public/assets/images/404.svg';
import { Stack } from "@mui/material";
import PrimaryAnchorButton from "../components/htmlElements/buttons/primaryAnchorButton/primaryAnchorButton";
import UserMainNavigationBar
	from "../components/layouts/userMainNavigationBar/userMainNavigationBar";
import CustomFooter from "../components/layouts/footer/customFooter";
import { SITE_ROOT } from "../utils/routes";

const NotFoundPage: NextPage = () => {

	return (
		<>
			<Stack direction="column">
				<UserMainNavigationBar/>
				<main className={Styles.main}>
					<Stack direction="row" justifyContent="space-around" spacing={4} className={Styles.rootStack}>
						<Image src={NotFoundIlluSVG} alt="" className={Styles.illustration} />
						<Stack direction="column" spacing={4} className={Styles.rootContent}>
							<Stack direction="column" spacing={1} className={Styles.header}>
								<span>Ooops...</span>
								<span>Vous semblez perdu</span>
							</Stack>
							<Stack direction="column" spacing={0} className={Styles.paragraphe}>
								<span>La page que vous cherchez ne se trouve pas ici.</span>
								<span>Code 404.</span>
							</Stack>
							<div className={Styles.primaryButtonWrapper}>
								<PrimaryAnchorButton buttonText="Retour à l'acceuil" active={true} nextPage={SITE_ROOT}/>
							</div>
						</Stack>
					</Stack>
				</main>
				<CustomFooter/>
			</Stack>
		</>
	);
};

export default NotFoundPage;