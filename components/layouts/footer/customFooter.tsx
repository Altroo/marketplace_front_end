import { Stack, Box } from '@mui/material';
import React from 'react';
import Styles from './customFooter.module.sass';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import InstagramMiniSVG from '../../../public/assets/svgs/globalIcons/instagram-mini-.svg';
import TikTokMiniSVG from '../../../public/assets/svgs/globalIcons/tiktok-mini.svg';
import Image from 'next/image';

const CustomFooter: React.FC = () => {
	return (
		<footer>
			<Box className={Styles.desktopFooter}>
				<Stack direction="column" spacing={5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Qaryb</span>
							<Link href="/" className={Styles.anchor}>
								Notre histoire
							</Link>
							<Link href="/" className={Styles.anchor}>
								Partenariat
							</Link>
							<Link href="/" className={Styles.anchor}>
								Carrière
							</Link>
							<Link href="/" className={Styles.anchor}>
								Nouveautés (bientôt)
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link href="/" className={Styles.anchor}>
								Créez votre boutique
							</Link>
							<Link href="/" className={Styles.anchor}>
								Les vendeurs Instagram
							</Link>
							<Link href="/" className={Styles.anchor}>
								Référencez vos articles
							</Link>
							<Link href="/" className={Styles.anchor}>
								Carte cadeaux
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<Stack direction="row" spacing={1}>
								<Link href="/">
									<Image
										src={InstagramMiniSVG}
										alt=""
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.miniIcon}
									/>
								</Link>
								<Link href="/">
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
							<Link href="/" className={Styles.anchor}>
								Des questions ? Contactez nous
							</Link>
							<Link href="/" className={Styles.anchor}>
								Faites votre shopping
							</Link>
							<Link href="/" className={Styles.anchor}>
								Blog
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link href="/" className={Styles.bottomAnchor}>
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
							<Link href="/" className={Styles.anchor}>
								Notre histoire
							</Link>
							<Link href="/" className={Styles.anchor}>
								Partenariat
							</Link>
							<Link href="/" className={Styles.anchor}>
								Carrière
							</Link>
							<Link href="/" className={Styles.anchor}>
								Nouveautés (bientôt)
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link href="/" className={Styles.anchor}>
								Créez votre boutique
							</Link>
							<Link href="/" className={Styles.anchor}>
								Les vendeurs Instagram
							</Link>
							<Link href="/" className={Styles.anchor}>
								Référencez vos articles
							</Link>
							<Link href="/" className={Styles.anchor}>
								Carte cadeaux
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={1}>
						<Stack direction="row" spacing={1}>
							<Link href="/">
								<Image
									src={InstagramMiniSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.miniIcon}
								/>
							</Link>
							<Link href="/">
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
						<Link href="/" className={Styles.anchor}>
							Des questions ? Contactez nous
						</Link>
						<Link href="/" className={Styles.anchor}>
							Faites votre shopping
						</Link>
						<Link href="/" className={Styles.anchor}>
							Blog
						</Link>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link href="/" className={Styles.bottomAnchor}>
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
