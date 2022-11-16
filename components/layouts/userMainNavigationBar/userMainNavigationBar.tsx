import React, { useState, useEffect, MouseEvent } from 'react';
import Styles from './userMainNavigationBar.module.sass';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Badge, Divider, Menu, MenuItem, Skeleton, Stack, ThemeProvider } from '@mui/material';
import {
	getDropDownMenuTheme,
	NotificationsDropDownMenuTheme,
	userMainNavigationBarTheme,
} from '../../../utils/themes';
import Image from 'next/image';
import QarybSVG from '../../../public/assets/images/logo.svg';
import ProfileSVG from '../../../public/assets/svgs/mainNavBarIcons/profile.svg';
import CreerVotreBoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique-purple.svg';
// import EmptyCartSVG from '../../../public/assets/svgs/mainNavBarIcons/empty-cart.svg';
import DashboardSVG from '../../../public/assets/svgs/mainNavBarIcons/dashboard.svg';
import BoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique.svg';
import NotificationsSVG from '../../../public/assets/svgs/mainNavBarIcons/notification.svg';
import NewNotificationPinkSVG from '../../../public/assets/svgs/mainNavBarIcons/new-notification-pink.svg';
import NewNotificationBlueSVG from '../../../public/assets/svgs/mainNavBarIcons/new-notification-blue.svg';
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
	getUserProfilAvatar,
	getUserShopUrl,
} from '../../../store/selectors';
import SearchIconSVG from '../../../public/assets/svgs/globalIcons/search.svg';
import Link from 'next/link';
import {
	AUTH_LOGIN,
	REAL_SHOP_BY_SHOP_LINK_ROUTE,
	DASHBOARD,
	REAL_SHOP_ADD_SHOP_NAME,
	SITE_ROOT,
	NOT_FOUND_404,
} from '../../../utils/routes';
import SideNavDrawer from '../../mobile/sideNavDrawer/sideNavDrawer';
import CloseSVG from '../../../public/assets/svgs/navigationIcons/close.svg';
import { bulkCookiesDeleter } from '../../../store/services/_init/_initAPI';
import { useRouter } from 'next/router';
import NotificationsMenu from "../notificationsMenu/notificationsMenu";

const notificationsMenuTheme = NotificationsDropDownMenuTheme();

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
	const loading = status === 'loading';
	const [searchValue, setSearchValue] = useState<string>('');

	useEffect(() => {
		if (stateAvatar || stateShopAvatar) {
			setNavBarPicture(stateShopAvatar ? stateShopAvatar : stateAvatar);
		}
	}, [stateAvatar, stateShopAvatar]);

	const [profileSubMenuEl, setProfileSubMenuEl] = useState<null | HTMLElement>(null);
	const openProfileSubMenu = Boolean(profileSubMenuEl);
	const [profileSubMenuMobileEl, setProfileSubMenuMobileEl] = useState<null | HTMLElement>(null);
	const openProfileSubMenuMobile = Boolean(profileSubMenuMobileEl);
	const [notificationsSubMenuEl, setNotificationsSubMenuEl] = useState<null | HTMLElement>(null);
	const openNotificationsSubMenu = Boolean(notificationsSubMenuEl);

	const handleProfileSubMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
		setProfileSubMenuEl(event.currentTarget);
	};
	const handleProfileSubMenuClose = () => {
		setProfileSubMenuEl(null);
	};

	const handleProfileSubMenuMobileClick = (event: MouseEvent<HTMLButtonElement>) => {
		setProfileSubMenuMobileEl(event.currentTarget);
	};

	const handleProfileSubMenuMobileClose = () => {
		setProfileSubMenuMobileEl(null);
	};

	const handleNotificationsSubMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
		setNotificationsSubMenuEl(event.currentTarget);
	};
	const handleNotificationsSubMenuClose = () => {
		setNotificationsSubMenuEl(null);
	};

	const logOutHandler = async () => {
		await bulkCookiesDeleter('/cookie/delete');
		await signOut({ redirect: true, callbackUrl: SITE_ROOT });
	};

	const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

	const ShopMenuItem = (props: { handleClose: () => void }) => {
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
	};

	const ShopDesktopItem = () => {
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
	};

	return (
		<ThemeProvider theme={userMainNavigationBarTheme()}>
			<Box className={Styles.desktopOnly}>
				<AppBar position="static" className={Styles.appBar}>
					<Toolbar>
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
						<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
							<Image src={SearchIconSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.searchIcon} />
							<input
								value={searchValue}
								onChange={(e) => {
									setSearchValue(e.target.value);
								}}
								type="text"
								placeholder="Rechercher"
								disabled
								className={Styles.searchInput}
							/>
						</Stack>
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
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge badgeContent={4} color="primary">*/}
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
									<NotificationsMenu/>
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
										<Image src={ProfileSVG} alt="" width={24} height={24} sizes="100vw" />
									</Link>
								</IconButton>
							)}
							{/* Cart button */}
							{/*<IconButton*/}
							{/*	size="large"*/}
							{/*	aria-label="cart of current user"*/}
							{/*	aria-controls="menu-appbar"*/}
							{/*	aria-haspopup="true"*/}
							{/*	color="inherit"*/}
							{/*>*/}
							{/*	/!*<ThemeProvider theme={badgeTheme()}>*!/*/}
							{/*	/!*	<Badge badgeContent={4} color="primary">*!/*/}
							{/*	<Image src={EmptyCartSVG} alt="" width={24} height={24} sizes="100vw" className={Styles.navBarIcons} />*/}
							{/*	/!*</Badge>*!/*/}
							{/*	/!*</ThemeProvider>*!/*/}
							{/*</IconButton>*/}
						</Stack>
					</Toolbar>
				</AppBar>
				<Stack direction="row" spacing="32px" className={Styles.bottomStackAnchor} alignItems="center">
					<Link href={NOT_FOUND_404} className={Styles.anchorText}>
						Collections lifestyle
					</Link>
					<Link href={NOT_FOUND_404}>
						{/*<a className={Styles.anchorText}>Boutique coup de </a>*/}
						<Stack direction="row" alignItems="center">
							<span className={Styles.heartShapeAnchorText}>Boutique coup de</span>
							<Image alt="" width="0" height="0" sizes="100vw" src={HeartShapeSVG} />
						</Stack>
					</Link>
					<Link href={NOT_FOUND_404} className={Styles.anchorText}>
						Nos produits
					</Link>
					<Stack direction="row" alignItems="center">
						<span className={Styles.disabledAnchorText}>Nos services</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Link href={NOT_FOUND_404} className={Styles.anchorText}>
						Blog
					</Link>
					<ShopDesktopItem />
				</Stack>
			</Box>
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
							<Image
								src={HambourgerMenuSVG}
								alt=""
								width={24}
								height={24}
								sizes="100vw"
								className={Styles.mobileIcons}
							/>
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
									<Link href={NOT_FOUND_404} className={Styles.anchorText}>
										Collections lifestyle
									</Link>
									<Link href={NOT_FOUND_404}>
										<Stack direction="row" alignItems="center">
											<span className={Styles.heartShapeAnchorText}>Boutique coup de</span>
											<Image src={HeartShapeSVG} alt="" width={32} height={32} />
										</Stack>
									</Link>
									<Link href={NOT_FOUND_404} className={Styles.anchorText}>
										Nos produits
									</Link>
									<Stack direction="row" alignItems="center">
										<span className={Styles.disabledAnchorText}>Nos services</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<span className={Styles.miniDivider}>—</span>
									<Link href={NOT_FOUND_404} className={Styles.anchorText}>
										Blog
									</Link>
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
												<Image
													src={DashboardSVG}
													alt=""
													width={24}
													height={24}
													sizes="100vw"
													className={Styles.subMenuDrawerIcons}
												/>
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
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge badgeContent={4} color="primary">*/}
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
							{/*<IconButton*/}
							{/*	size="large"*/}
							{/*	aria-label="cart of current user"*/}
							{/*	aria-controls="menu-appbar"*/}
							{/*	aria-haspopup="true"*/}
							{/*	color="inherit"*/}
							{/*	className={Styles.iconButton}*/}
							{/*>*/}
							{/*	<Image src={EmptyCartSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.mobileIcons} />*/}
							{/*</IconButton>*/}
						</Stack>
					</Toolbar>
				</AppBar>
				{!hideMobileSearch && (
					<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
						<Image src={SearchIconSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.searchIcon} />
						<input
							value={searchValue}
							onChange={(e) => {
								setSearchValue(e.target.value);
							}}
							type="text"
							placeholder="Rechercher"
							disabled
							className={Styles.searchInput}
						/>
					</Stack>
				)}
			</Box>
		</ThemeProvider>
	);
};

export default UserMainNavigationBar;
