import { Stack, Box } from '@mui/material';
import React from 'react';
import Styles from './customFooter.module.sass';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import InstagramMiniSVG from '../../../public/assets/svgs/globalIcons/instagram-mini-.svg';
import Image from 'next/image';
import { CGU_PAGE, DASHBOARD_INDEXED_OFFERS, NOT_FOUND_404, REAL_SHOP_ADD_SHOP_NAME } from '../../../utils/routes';

const FooterGtuContent = () => {
	return (
		<Stack direction="column" spacing={2}>
			<Divider orientation="horizontal" flexItem className={Styles.divider} />
			<Stack direction="row" justifyContent="space-between">
				<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
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
				<Link href="https://instagram.com/qaryb.ma" target="_blank" rel="noreferrer">
					<Stack direction="row" spacing={1} alignItems="center">
						<Image src={InstagramMiniSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.miniIcon} />
						<span>qaryb.ma</span>
					</Stack>
				</Link>
				<Link href="https://instagram.com/imly.ma" target="_blank" rel="noreferrer">
					<Stack direction="row" spacing={1} alignItems="center">
						<Image src={InstagramMiniSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.miniIcon} />
						<span>imly.ma</span>
					</Stack>
				</Link>
			</Stack>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Des questions ? Contactez nous (coming soon)
			</Link>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Faites votre shopping (coming soon)
			</Link>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Blog (coming soon)
			</Link>
		</Stack>
	);
};

const FooterFirstContent = () => {
	return (
		<Stack direction="column" spacing={1}>
			<span className={Styles.header}>Qaryb</span>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Notre mission (coming soon)
			</Link>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Partenariat (coming soon)
			</Link>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Carrière (coming soon)
			</Link>
			<Link href={NOT_FOUND_404} className={Styles.anchor}>
				Blog (coming soon)
			</Link>
		</Stack>
	);
};

const FooterSecondContent = () => {
	return (
		<Stack direction="column" spacing={1}>
					<span className={Styles.header}>Pour les vendeurs</span>
					<Link href={REAL_SHOP_ADD_SHOP_NAME} className={Styles.anchor}>
						Créez votre boutique
					</Link>
					<Link href={NOT_FOUND_404} className={Styles.anchor}>
						Les vendeurs Instagram (coming soon)
					</Link>
					<Link href={DASHBOARD_INDEXED_OFFERS} className={Styles.anchor}>
						Référencez vos articles
					</Link>
					<Link href={NOT_FOUND_404} className={Styles.anchor}>
						Carte cadeaux (coming soon)
					</Link>
				</Stack>
	);
};
const FooterBlock = () => {
	return (
		<Stack direction="column" spacing={5}>
			<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
				<FooterFirstContent/>
				<FooterSecondContent/>
				<FooterInstaLinks />
			</Stack>
			<FooterGtuContent />
		</Stack>
	);
};
const CustomFooter: React.FC = () => {
	return (
		<footer>
			<Box className={Styles.desktopFooter}>
				<FooterBlock />
			</Box>
			<Box className={Styles.mobileFooter}>
				<Stack direction="column" spacing={5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<FooterFirstContent/>
						<FooterSecondContent/>
					</Stack>
					<FooterInstaLinks />
					<FooterGtuContent />
				</Stack>
			</Box>
		</footer>
	);
};

export default CustomFooter;
