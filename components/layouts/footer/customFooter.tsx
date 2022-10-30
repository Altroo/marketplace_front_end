import { Stack, Box } from '@mui/material';
import React from 'react';
import Styles from './customFooter.module.sass';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import InstagramMiniSVG from '../../../public/assets/svgs/globalIcons/instagram-mini-.svg';
import TikTokMiniSVG from '../../../public/assets/svgs/globalIcons/tiktok-mini.svg';
import { default as ImageFuture } from 'next/future/image';

const CustomFooter: React.FC = () => {
	return (
		<footer>
			<Box className={Styles.desktopFooter}>
				<Stack direction="column" spacing={5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Qaryb</span>
							<Link passHref href="/">
								<a className={Styles.anchor}>Notre histoire</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Partenariat</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Carrière</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Nouveautés (bientôt)</a>
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link passHref href="/">
								<a className={Styles.anchor}>Créez votre boutique</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Les vendeurs Instagram</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Référencez vos articles</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Carte cadeaux</a>
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<Stack direction="row" spacing={1}>
								<Link passHref href="/">
									<a>
										<ImageFuture
											src={InstagramMiniSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.miniIcon}
										/>
									</a>
								</Link>
								<Link passHref href="/">
									<a>
										<ImageFuture
											src={TikTokMiniSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.miniIcon}
										/>
									</a>
								</Link>
							</Stack>
							<Link passHref href="/">
								<a className={Styles.anchor}>Des questions ? Contactez nous</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Faites votre shopping</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Blog</a>
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link passHref href="/">
								<a className={Styles.bottomAnchor}>Conditions générales d&apos;Utilisation</a>
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
							<Link passHref href="/">
								<a className={Styles.anchor}>Notre histoire</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Partenariat</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Carrière</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Nouveautés (bientôt)</a>
							</Link>
						</Stack>
						<Stack direction="column" spacing={1}>
							<span className={Styles.header}>Pour les vendeurs</span>
							<Link passHref href="/">
								<a className={Styles.anchor}>Créez votre boutique</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Les vendeurs Instagram</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Référencez vos articles</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.anchor}>Carte cadeaux</a>
							</Link>
						</Stack>
					</Stack>
					<Stack direction="column" spacing={1}>
						<Stack direction="row" spacing={1}>
							<Link passHref href="/">
								<a>
									<ImageFuture
										src={InstagramMiniSVG}
										alt=""
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.miniIcon}
									/>
								</a>
							</Link>
							<Link passHref href="/">
								<a>
									<ImageFuture
										src={TikTokMiniSVG}
										alt=""
										width="0"
										height="0"
										sizes="100vw"
										className={Styles.miniIcon}
									/>
								</a>
							</Link>
						</Stack>
						<Link passHref href="/">
							<a className={Styles.anchor}>Des questions ? Contactez nous</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Faites votre shopping</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Blog</a>
						</Link>
					</Stack>
					<Stack direction="column" spacing={2}>
						<Divider orientation="horizontal" flexItem className={Styles.divider} />
						<Stack direction="row" justifyContent="space-between">
							<span className={Styles.bottomFooterSpan}>© 2022 Qaryb</span>
							<Link passHref href="/">
								<a className={Styles.bottomAnchor}>Conditions générales d&apos;Utilisation</a>
							</Link>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</footer>
	);
};

export default CustomFooter;
