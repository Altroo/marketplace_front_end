import { Stack, Box } from '@mui/material';
import React from 'react';
import Styles from './customFooter.module.sass';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import InstagramMiniSVG from '../../../public/assets/svgs/globalIcons/instagram-mini-.svg';
import Image from 'next/image';
import {
	CGU_PAGE,
	LES_VENDEURS_INSTAGRAM_FOOTER_PAGE,
	CREER_VOTRE_BOUTIQUE_FOOTER_PAGE,
	DES_QUESTION_FOOTER_PAGE,
	PARTENARIAT_FOOTER_PAGE,
	CARRIERE_FOOTER_PAGE,
	NOTRE_MISSION_FOOTER_PAGE,
	REFERENCER_VOS_ARTICLES_FOOTER_PAGE
} from "../../../utils/routes";
import { Desktop, TabletAndMobile } from '../../../utils/helpers';

const FooterGtuContent = () => {
	return (
		<Stack direction="column" spacing={2}>
			<Divider orientation="horizontal" flexItem className={Styles.divider} />
			<Stack direction="row" justifyContent="space-between">
				<span className={Styles.bottomFooterSpan}>© 2023 Qaryb</span>
				<Link href={CGU_PAGE} className={Styles.bottomAnchor}>
					Conditions générales d&apos;Utilisation
				</Link>
			</Stack>
		</Stack>
	);
};

const FooterInstaLinks = () => {
	return (
		<Stack direction="column" spacing={1}>
			<Stack direction="row" spacing={1}>
				<Link href="https://instagram.com/qaryb.maroc" target="_blank" rel="noreferrer">
					<Stack direction="row" spacing={1} alignItems="center">
						<Image src={InstagramMiniSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.miniIcon} />
						<span>qaryb.maroc</span>
					</Stack>
				</Link>
			</Stack>
			<Link href={DES_QUESTION_FOOTER_PAGE} className={Styles.anchor}>
				Des questions ? Contactez nous
			</Link>
			<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
				<span className={Styles.disabledAnchorText}>Faites votre shopping</span>
				<span className={Styles.comingSoon}>Coming soon</span>
			</Stack>
		</Stack>
	);
};

const FooterFirstContent = () => {
	return (
		<Stack direction="column" spacing={1}>
			<span className={Styles.header}>Qaryb</span>
			<Link href={NOTRE_MISSION_FOOTER_PAGE} className={Styles.anchor}>
				Notre mission
			</Link>
			<Link href={PARTENARIAT_FOOTER_PAGE} className={Styles.anchor}>
				Partenariat
			</Link>
			<Link href={CARRIERE_FOOTER_PAGE} className={Styles.anchor}>
				Carrière
			</Link>
			<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
				<span className={Styles.disabledAnchorText}>Blog</span>
				<span className={Styles.comingSoon}>Coming soon</span>
			</Stack>
		</Stack>
	);
};

const FooterSecondContent = () => {
	return (
		<Stack direction="column" spacing={1}>
			<span className={Styles.header}>Pour les vendeurs</span>
			<Link href={CREER_VOTRE_BOUTIQUE_FOOTER_PAGE} className={Styles.anchor}>
				Créez votre boutique
			</Link>
			<Link href={LES_VENDEURS_INSTAGRAM_FOOTER_PAGE} className={Styles.anchor}>
				Les vendeurs Instagram
			</Link>
			<Link href={REFERENCER_VOS_ARTICLES_FOOTER_PAGE} className={Styles.anchor}>
				Référencez vos articles
			</Link>
			<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
				<span className={Styles.disabledAnchorText}>Carte cadeaux</span>
				<span className={Styles.comingSoon}>Coming soon</span>
			</Stack>
		</Stack>
	);
};
const FooterBlock = () => {
	return (
		<Stack direction="column" spacing={5}>
			<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
				<FooterFirstContent />
				<FooterSecondContent />
				<FooterInstaLinks />
			</Stack>
			<FooterGtuContent />
		</Stack>
	);
};
const CustomFooter: React.FC = () => {
	return (
		<footer>
			<Desktop>
				<Box className={Styles.desktopFooter}>
					<FooterBlock />
				</Box>
			</Desktop>
			<TabletAndMobile>
				<Box className={Styles.mobileFooter}>
					<Stack direction="column" spacing={5}>
						<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
							<FooterFirstContent />
							<FooterSecondContent />
						</Stack>
						<FooterInstaLinks />
						<FooterGtuContent />
					</Stack>
				</Box>
			</TabletAndMobile>
		</footer>
	);
};

export default CustomFooter;
