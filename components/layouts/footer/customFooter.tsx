import { Stack, Box } from '@mui/material';
import React from 'react';
import Styles from './customFooter.module.sass';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import InstagramMiniSVG from '../../../public/assets/svgs/globalIcons/instagram-mini-.svg';
import TikTokMiniSVG from '../../../public/assets/svgs/globalIcons/tiktok-mini.svg';
import Image from 'next/image';
import {
	CGU_PAGE,
	DASHBOARD_ADD_INDEX_OFFERS,
	DASHBOARD_INDEXED_OFFERS,
	NOT_FOUND_404,
	REAL_SHOP_ADD_SHOP_NAME
} from "../../../utils/routes";

const CustomFooter: React.FC = () => {
	return (
		<footer>
			<Box className={Styles.desktopFooter}>
				<Stack direction="column" spacing={5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Qaryb</span>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Notre histoire
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Partenariat
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Carrière
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Nouveautés (bientôt)
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link href={REAL_SHOP_ADD_SHOP_NAME} className={Styles.anchor}>
								Créez votre boutique
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Les vendeurs Instagram
							</Link>
							<Link href={DASHBOARD_ADD_INDEX_OFFERS} className={Styles.anchor}>
								Référencez vos articles
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Carte cadeaux
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<Stack direction="row" spacing={1}>
								<Link href={NOT_FOUND_404}>
									<Image
										src={InstagramMiniSVG}
										alt=""
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.miniIcon}
									/>
								</Link>
								<Link href={NOT_FOUND_404}>
									<Image
										src={TikTokMiniSVG}
										alt=""
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.miniIcon}
									/>
								</Link>
							</Stack>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Des questions ? Contactez nous
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Faites votre shopping
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Blog
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link href={CGU_PAGE} className={Styles.bottomAnchor}>
								Conditions générales d&apos;Utilisation
							</Link>
						</Stack>
					</Stack>
				</Stack>
			</Box>
			<Box className={Styles.mobileFooter}>
				<Stack direction="column" spacing={5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Qaryb</span>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Notre histoire
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Partenariat
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Carrière
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Nouveautés (bientôt)
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link href={REAL_SHOP_ADD_SHOP_NAME} className={Styles.anchor}>
								Créez votre boutique
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Les vendeurs Instagram
							</Link>
							<Link href={DASHBOARD_ADD_INDEX_OFFERS} className={Styles.anchor}>
								Référencez vos articles
							</Link>
							<Link href={NOT_FOUND_404} className={Styles.anchor}>
								Carte cadeaux
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={1}>
						<Stack direction="row" spacing={1}>
							<Link href={NOT_FOUND_404}>
								<Image
									src={InstagramMiniSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.miniIcon}
								/>
							</Link>
							<Link href={NOT_FOUND_404}>
								<Image
									src={TikTokMiniSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.miniIcon}
								/>
							</Link>
						</Stack>
						<Link href={NOT_FOUND_404} className={Styles.anchor}>
							Des questions ? Contactez nous
						</Link>
						<Link href={NOT_FOUND_404} className={Styles.anchor}>
							Faites votre shopping
						</Link>
						<Link href={NOT_FOUND_404} className={Styles.anchor}>
							Blog
						</Link>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link href={CGU_PAGE} className={Styles.bottomAnchor}>
								Conditions générales d&apos;Utilisation
							</Link>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</footer>
	);
};

export default CustomFooter;
