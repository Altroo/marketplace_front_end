import React, { useState, useEffect, MouseEvent, useCallback } from 'react';
import Styles from './userMainNavigationBar.module.sass';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Divider, Menu, MenuItem, Skeleton, Stack, ThemeProvider, Badge } from '@mui/material';
import {
	subMenuBadgeTheme,
	badgeTheme,
	getDropDownMenuTheme,
	userMainNavigationBarTheme,
	miniBadgeTheme,
} from '../../../utils/themes';
import Image from 'next/image';
import QarybSVG from '../../../public/assets/images/logo.svg';
import ProfileSVG from '../../../public/assets/svgs/mainNavBarIcons/profile.svg';
import CreerVotreBoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique-purple.svg';
import DashboardSVG from '../../../public/assets/svgs/mainNavBarIcons/dashboard.svg';
import BoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique.svg';
import HambourgerMenuSVG from '../../../public/assets/svgs/mainNavBarIcons/hambourger-menu.svg';
import LogoutSVG from '../../../public/assets/svgs/mainNavBarIcons/logout.svg';
import HeartShapeSVG from '../../../public/assets/svgs/mainNavBarIcons/heart-shape.svg';
import { useSession, signOut } from 'next-auth/react';
import { useAppSelector } from '../../../utils/hooks';
import {
	getCheckUserHasShop,
	getShopAvatar,
	getUserFirstName,
	getUserLastName,
	getUserNewNotification,
	getUserProfilAvatar,
	getUserShopUrl,
} from '../../../store/selectors';
import Link from 'next/link';
import {
	AUTH_LOGIN,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	DASHBOARD,
	REAL_SHOP_ADD_SHOP_NAME,
	SITE_ROOT,
} from '../../../utils/routes';
import SideNavDrawer from '../../mobile/sideNavDrawer/sideNavDrawer';
import CloseSVG from '../../../public/assets/svgs/navigationIcons/close.svg';
import { bulkCookiesDeleter } from '../../../store/services/_init/_initAPI';
import { useRouter } from 'next/router';
import NotificationsMenu from '../notificationsMenu/notificationsMenu';

type Props = {
	hideMobileSearch?: boolean;
};

const UserMainNavigationBar: React.FC<Props> = (props: Props) => {
	const { hideMobileSearch } = props;
	const { data: session, status } = useSession();
	const router = useRouter();
	const stateAvatar = useAppSelector(getUserProfilAvatar);
	const stateShopAvatar = useAppSelector(getShopAvatar);
	const [navBarPicture, setNavBarPicture] = useState<string | null>(null);
	const firstName = useAppSelector(getUserFirstName);
	const lastName = useAppSelector(getUserLastName);
	const userHasShop = useAppSelector(getCheckUserHasShop);
	const userShopUrl: string | boolean | undefined = useAppSelector(getUserShopUrl);
	const newNotification = useAppSelector(getUserNewNotification);
	const loading = status === 'loading';
	// const [searchValue, setSearchValue] = useState<string>('');

	useEffect(() => {
		if (stateAvatar || stateShopAvatar) {
			setNavBarPicture(stateShopAvatar ? stateShopAvatar : stateAvatar);
		}
	}, [stateAvatar, stateShopAvatar]);

	const [profileSubMenuEl, setProfileSubMenuEl] = useState<null | HTMLElement>(null);
	const openProfileSubMenu = Boolean(profileSubMenuEl);
	const [profileSubMenuMobileEl, setProfileSubMenuMobileEl] = useState<null | HTMLElement>(null);
	const openProfileSubMenuMobile = Boolean(profileSubMenuMobileEl);

	const handleProfileSubMenuClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		setProfileSubMenuEl(event.currentTarget);
	}, []);

	const handleProfileSubMenuClose = useCallback(() => {
		setProfileSubMenuEl(null);
	}, []);

	const handleProfileSubMenuMobileClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		setProfileSubMenuMobileEl(event.currentTarget);
	}, []);

	const handleProfileSubMenuMobileClose = useCallback(() => {
		setProfileSubMenuMobileEl(null);
	}, []);

	const logOutHandler = useCallback(async () => {
		await bulkCookiesDeleter('/cookie/delete');
		await signOut({ redirect: true, callbackUrl: SITE_ROOT });
	}, []);

	const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

	const ShopMenuItem = useCallback(
		(props: { handleClose: () => void }) => {
			if (userHasShop && userShopUrl) {
				return (
					<MenuItem onClick={props.handleClose} className={Styles.menuItem}>
						<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string)} className={Styles.anchorWrapper}>
							<Image src={BoutiqueSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.subMenuIcons} />
							<span>Ma boutique</span>
						</Link>
					</MenuItem>
				);
			} else {
				return (
					<MenuItem onClick={props.handleClose} className={`${Styles.menuItem}`}>
						<Link href={REAL_SHOP_ADD_SHOP_NAME} className={`${Styles.purpleAnchorWrapperNoWidth}`}>
							<Image
								src={CreerVotreBoutiqueSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.subMenuIcons}
							/>
							<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
						</Link>
					</MenuItem>
				);
			}
		},
		[userHasShop, userShopUrl],
	);

	const ShopDesktopItem = useCallback(() => {
		if (userHasShop && userShopUrl) {
			return (
				<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string)} className={Styles.anchorWrapper}>
					<Image src={BoutiqueSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.subMenuIcons} />
					<span className={Styles.desktopSpan}>Ma boutique</span>
				</Link>
			);
		} else {
			return (
				<Link href={REAL_SHOP_ADD_SHOP_NAME} className={`${Styles.purpleAnchorWrapperDesktop}`}>
					<Image
						src={CreerVotreBoutiqueSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.subMenuIcons}
					/>
					<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
				</Link>
			);
		}
	}, [userHasShop, userShopUrl]);

	return (
		<ThemeProvider theme={userMainNavigationBarTheme()}>
			<Box className={Styles.desktopOnly}>
				<AppBar position="static" className={Styles.appBar}>
					<Toolbar>
						<Stack direction="row" justifyContent="space-between" width="100%">
							<Image
								src={QarybSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.logo}
								onClick={() => {
									router.push(SITE_ROOT).then();
								}}
								style={{ cursor: 'pointer' }}
							/>
							<Stack direction="row" spacing={1}>
								{!loading && session ? (
									<>
										{/* Avatar button (loggedIn) */}
										<IconButton
											aria-label="profile of current user"
											id="my-profile-button"
											aria-controls={openProfileSubMenu ? 'profile-menu' : undefined}
											aria-haspopup="true"
											aria-expanded={openProfileSubMenu ? 'true' : undefined}
											onClick={handleProfileSubMenuClick}
											size="large"
											color="inherit"
										>
											{!navBarPicture ? (
												<Skeleton variant="circular" width={30} height={30} />
											) : (
												<Image
													src={navBarPicture as string}
													alt=""
													width="30"
													height="30"
													sizes="100vw"
													className={Styles.avatarButton}
												/>
											)}
										</IconButton>
										{/* profil sub Menu */}
										<ThemeProvider theme={getDropDownMenuTheme()}>
											<Menu
												id="profile-menu"
												anchorEl={profileSubMenuEl}
												open={openProfileSubMenu}
												onClose={handleProfileSubMenuClose}
												MenuListProps={{
													'aria-labelledby': 'my-profile-button',
												}}
												keepMounted
											>
												<MenuItem onClick={handleProfileSubMenuClose} className={Styles.menuItem}>
													<Link href={DASHBOARD} className={Styles.anchorWrapper}>
														<Image
															src={DashboardSVG}
															alt=""
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.subMenuIcons}
														/>
														<span>Mon dashboard</span>
													</Link>
												</MenuItem>
												<ShopMenuItem handleClose={handleProfileSubMenuClose} />
												<Divider orientation="horizontal" flexItem />
												<MenuItem onClick={handleProfileSubMenuClose} className={Styles.fadedMenuItem}>
													<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
														<Image
															src={LogoutSVG}
															alt=""
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.subMenuIcons}
														/>
														<span>Se déconnecter</span>
													</Box>
												</MenuItem>
											</Menu>
										</ThemeProvider>
										{/* Notification button */}
										<NotificationsMenu />
									</>
								) : (
									// Avatar button (user not connected)
									<IconButton
										size="large"
										aria-label="user not connected"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										color="inherit"
									>
										<Link href={AUTH_LOGIN} className={Styles.anchorWrapper}>
											<Image src={ProfileSVG} alt="" width={30} height={30} sizes="100vw" />
										</Link>
									</IconButton>
								)}
							</Stack>
							</Stack>
					</Toolbar>
				</AppBar>
				<Stack direction="row" spacing="22px" className={Styles.bottomStackAnchor} alignItems="center">
					<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
						<span className={Styles.disabledAnchorText}>Collections lifestyle</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
						<span className={Styles.disabledAnchorText}>Boutique coup de</span>
						<Image alt="" width="0" height="0" sizes="100vw" src={HeartShapeSVG} />
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
						<span className={Styles.disabledAnchorText}>Nos produits</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
						<span className={Styles.disabledAnchorText}>Nos services</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Stack direction="row" alignItems="center" flexWrap="wrap" columnGap="6px">
						<span className={Styles.disabledAnchorText}>Blog</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<ShopDesktopItem />
				</Stack>
			</Box>
			{/* Mobile version */}
			<Box className={Styles.mobileOnly}>
				<AppBar position="static" className={Styles.appBar}>
					<Toolbar className={Styles.toolbar}>
						<IconButton
							edge="start"
							size="large"
							color="inherit"
							aria-label="open drawer"
							className={Styles.hambourgerIconWrapper}
							onClick={() => setOpenMobileDrawer(true)}
						>
							{newNotification ? (
								<ThemeProvider theme={badgeTheme()}>
									<Badge
										color="primary"
										variant="dot"
										overlap="circular"
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
									>
										<Image
											src={HambourgerMenuSVG}
											alt=""
											width={24}
											height={24}
											sizes="100vw"
											className={Styles.mobileIcons}
										/>
									</Badge>
								</ThemeProvider>
							) : (
								<Image
									src={HambourgerMenuSVG}
									alt=""
									width={24}
									height={24}
									sizes="100vw"
									className={Styles.mobileIcons}
								/>
							)}
						</IconButton>
						{/* MOBILE SIDE NAV DRAWER */}
						<SideNavDrawer open={openMobileDrawer} handleClose={() => setOpenMobileDrawer(false)} keepMounted={true}>
							<Stack direction="column" spacing={2}>
								<Stack direction="row" justifyContent="flex-end" paddingX={2} paddingY={2} paddingBottom={0}>
									<Image
										src={CloseSVG}
										width={0}
										height={0}
										sizes="100vw"
										className={Styles.mobileCloseButton}
										alt=""
										onClick={() => setOpenMobileDrawer(false)}
									/>
								</Stack>
								<Stack direction="column" paddingX="40px" paddingY="18px" paddingTop={0} paddingBottom={0} spacing={1}>
									<Stack direction="row" alignItems="center" flexWrap="wrap">
										<span className={Styles.disabledAnchorText}>Collections lifestyle</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<Stack direction="row" alignItems="center" flexWrap="wrap">
										<span className={Styles.disabledAnchorText}>Boutique coup de</span>
										<Image alt="" width={32} height={32} sizes="100vw" src={HeartShapeSVG} />
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<Stack direction="row" alignItems="center" flexWrap="wrap">
										<span className={Styles.disabledAnchorText}>Nos produits</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<Stack direction="row" alignItems="center" flexWrap="wrap">
										<span className={Styles.disabledAnchorText}>Nos services</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<span className={Styles.miniDivider}>—</span>
									<Stack direction="row" alignItems="center" flexWrap="wrap">
										<span className={Styles.disabledAnchorText}>Blog</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
								</Stack>
								<Box paddingTop="16px" paddingBottom="16px" paddingX="40px">
									<Divider orientation="horizontal" flexItem className={Styles.divider} />
								</Box>
								<Box>
									{!loading && session ? (
										<Stack direction="column" paddingX="40px" paddingY="18px" paddingTop={0} spacing={2}>
											<Stack direction="row" spacing={2} alignItems="center">
												{!navBarPicture ? (
													<Skeleton variant="circular" width={48} height={48} />
												) : (
													<Image
														src={navBarPicture as string}
														alt=""
														width={48}
														height={48}
														sizes="100vw"
														className={Styles.avatarDrawerButton}
													/>
												)}
												<span className={Styles.mobileProfileName}>
													{firstName} {lastName}
												</span>
											</Stack>
											<Link href={DASHBOARD} className={Styles.anchorWrapper}>
												{newNotification ? (
													<ThemeProvider theme={miniBadgeTheme()}>
														<Badge
															color="primary"
															variant="dot"
															overlap="circular"
															anchorOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
														>
															<Image
																src={DashboardSVG}
																alt=""
																width={24}
																height={24}
																sizes="100vw"
																className={Styles.subMenuDrawerIcons}
															/>
														</Badge>
													</ThemeProvider>
												) : (
													<Image
														src={DashboardSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
												)}
												<span className={Styles.mobileAnchorSpan}>Mon dashboard</span>
											</Link>
											{userHasShop && userShopUrl ? (
												<Link
													href={REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string)}
													className={Styles.anchorWrapper}
												>
													<Image
														src={BoutiqueSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
													<span className={Styles.mobileAnchorSpan}>Ma boutique</span>
												</Link>
											) : (
												<Link href={REAL_SHOP_ADD_SHOP_NAME} className={`${Styles.purpleAnchorWrapper}`}>
													<Image
														src={CreerVotreBoutiqueSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
													<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
												</Link>
											)}
											<Box paddingTop={1} paddingBottom={1}>
												<Divider orientation="horizontal" flexItem />
											</Box>
											<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
												<Image
													src={LogoutSVG}
													alt=""
													width={24}
													height={24}
													sizes="100vw"
													className={Styles.subMenuDrawerIcons}
												/>
												<span className={Styles.mobileAnchorGraySpan}>Se déconnecter</span>
											</Box>
										</Stack>
									) : (
										<Stack direction="column" paddingX="40px" paddingY="18px" paddingTop={0} spacing={2}>
											<Link href={REAL_SHOP_ADD_SHOP_NAME} className={Styles.purpleAnchorWrapper}>
												<Image
													src={CreerVotreBoutiqueSVG}
													alt=""
													width={24}
													height={24}
													sizes="100vw"
													className={Styles.subMenuDrawerIcons}
												/>
												<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
											</Link>
											<Link href={AUTH_LOGIN} className={Styles.anchorWrapper}>
												<Image
													src={ProfileSVG}
													alt=""
													width={24}
													height={24}
													sizes="100vw"
													className={Styles.subMenuDrawerIcons}
												/>
												<span className={Styles.mobileAnchorSpan}>Connexion</span>
											</Link>
										</Stack>
									)}
								</Box>
							</Stack>
						</SideNavDrawer>
						{/* FIN MOBILE SIDE NAV DRAWER */}
						{/* Mobile top nav bar */}
						<Stack direction="row" justifySelf="center" className={Styles.mobileRootLogoStack}>
							<Image
								src={QarybSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.logo}
								onClick={() => {
									router.push(SITE_ROOT).then();
								}}
							/>
						</Stack>
						<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
							{!loading && session ? (
								<>
									<IconButton
										aria-label="profile of current user"
										id="my-profile-mobile-button"
										aria-controls={openProfileSubMenuMobile ? 'profile-mobile-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={openProfileSubMenuMobile ? 'true' : undefined}
										onClick={handleProfileSubMenuMobileClick}
									>
										{!navBarPicture ? (
											<Skeleton variant="circular" width={30} height={30} />
										) : (
											<>
												{newNotification ? (
													<ThemeProvider theme={badgeTheme()}>
														<Badge
															color="primary"
															variant="dot"
															overlap="circular"
															anchorOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
														>
															<Image
																src={navBarPicture as string}
																alt=""
																width="30"
																height="30"
																sizes="100vw"
																className={Styles.avatarButton}
															/>
														</Badge>
													</ThemeProvider>
												) : (
													<Image
														src={navBarPicture as string}
														alt=""
														width="30"
														height="30"
														sizes="100vw"
														className={Styles.avatarButton}
													/>
												)}
											</>
										)}
									</IconButton>
									<ThemeProvider theme={getDropDownMenuTheme()}>
										<Menu
											id="profile-mobile-menu"
											anchorEl={profileSubMenuMobileEl}
											open={openProfileSubMenuMobile}
											onClose={handleProfileSubMenuMobileClose}
											MenuListProps={{
												'aria-labelledby': 'my-profile-mobile-button',
											}}
										>
											<MenuItem onClick={handleProfileSubMenuMobileClose} className={Styles.menuItem}>
												<Link href={DASHBOARD} className={Styles.anchorWrapper}>
													{newNotification ? (
														<ThemeProvider theme={subMenuBadgeTheme()}>
															<Badge
																color="primary"
																variant="dot"
																overlap="circular"
																anchorOrigin={{
																	vertical: 'top',
																	horizontal: 'right',
																}}
															>
																<Image
																	src={DashboardSVG}
																	alt=""
																	width="0"
																	height="0"
																	sizes="100vw"
																	className={Styles.subMenuIcons}
																/>
															</Badge>
														</ThemeProvider>
													) : (
														<Image
															src={DashboardSVG}
															alt=""
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.subMenuIcons}
														/>
													)}
													<span>Mon dashboard</span>
												</Link>
											</MenuItem>
											<ShopMenuItem handleClose={handleProfileSubMenuMobileClose} />
											<Divider orientation="horizontal" flexItem />
											<MenuItem onClick={handleProfileSubMenuMobileClose} className={Styles.fadedMenuItem}>
												<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
													<Image
														src={LogoutSVG}
														alt=""
														width="0"
														height="0"
														sizes="100vw"
														className={Styles.subMenuIcons}
													/>
													<span>Se déconnecter</span>
												</Box>
											</MenuItem>
										</Menu>
									</ThemeProvider>
								</>
							) : (
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									color="inherit"
									className={Styles.iconButton}
								>
									<Link href={AUTH_LOGIN} className={Styles.anchorWrapper}>
										<Image
											src={ProfileSVG}
											alt=""
											width={24}
											height={24}
											sizes="100vw"
											className={Styles.mobileIcons}
										/>
									</Link>
								</IconButton>
							)}
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</ThemeProvider>
	);
};

export default UserMainNavigationBar;
