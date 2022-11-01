import React, { useState, useEffect } from 'react';
import Styles from './userMainNavigationBar.module.sass';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Divider, Menu, MenuItem, Skeleton, Stack, ThemeProvider } from '@mui/material';
import { getDropDownMenuTheme, userMainNavigationBarTheme } from '../../../utils/themes';
import { default as ImageFuture } from 'next/future/image';
import QarybSVG from '../../../public/assets/images/logo.svg';
import ProfileSVG from '../../../public/assets/svgs/mainNavBarIcons/profile.svg';
import CreerVotreBoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique-purple.svg';
import EmptyCartSVG from '../../../public/assets/svgs/mainNavBarIcons/empty-cart.svg';
import DashboardSVG from '../../../public/assets/svgs/mainNavBarIcons/dashboard.svg';
import BoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique.svg';
import NotificationsSVG from '../../../public/assets/svgs/mainNavBarIcons/notification.svg';
import HambourgerMenuSVG from '../../../public/assets/svgs/mainNavBarIcons/hambourger-menu.svg';
import LogoutSVG from '../../../public/assets/svgs/mainNavBarIcons/logout.svg';
import HeartShapeSVG from '../../../public/assets/svgs/mainNavBarIcons/heart-shape.svg';
import { useSession, signOut } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
	getCheckUserHasShop,
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
	SITE_ROOT
} from "../../../utils/routes";
import { deleteRemoteCookiesAppToken } from '../../../utils/helpers';
import SideNavDrawer from '../../mobile/sideNavDrawer/sideNavDrawer';
import CloseSVG from '../../../public/assets/svgs/navigationIcons/close.svg';

const UserMainNavigationBar: React.FC = () => {
	const { data: session, status } = useSession();
	const avatar = useAppSelector(getUserProfilAvatar);
	const firstName = useAppSelector(getUserFirstName);
	const lastName = useAppSelector(getUserLastName);
	const userHasShop = useAppSelector(getCheckUserHasShop);
	const userShopUrl: string | boolean | undefined = useAppSelector(getUserShopUrl);
	const loading = status === 'loading';
	const [searchValue, setSearchValue] = useState<string>('');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [anchorMobileEl, setAnchorMobileEl] = React.useState<null | HTMLElement>(null);
	const openMobile = Boolean(anchorMobileEl);
	const handleMobileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorMobileEl(event.currentTarget);
	};
	const handleMobileClose = () => {
		setAnchorMobileEl(null);
	};

	const logOutHandler = () => {
		signOut({ redirect: true, callbackUrl: SITE_ROOT, }).then(() => {
			deleteRemoteCookiesAppToken();
		});
	};

	const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

	const ShopMenuItem = (props: { handleClose: () => void }) => {
		if (userHasShop && userShopUrl) {
			return (
				<MenuItem onClick={props.handleClose} className={Styles.menuItem}>
					<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string)} passHref>
						<a className={Styles.anchorWrapper}>
							<ImageFuture
								src={BoutiqueSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.subMenuIcons}
							/>
							<span>Ma boutique</span>
						</a>
					</Link>
				</MenuItem>
			);
		} else {
			return (
				<MenuItem onClick={props.handleClose} className={`${Styles.menuItem}`}>
					<Link href={REAL_SHOP_ADD_SHOP_NAME} passHref>
						<a className={`${Styles.purpleAnchorWrapperNoWidth}`}>
							<ImageFuture
								src={CreerVotreBoutiqueSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.subMenuIcons}
							/>
							<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
						</a>
					</Link>
				</MenuItem>
			);
		}
	};

	return (
		<ThemeProvider theme={userMainNavigationBarTheme()}>
			<Box className={Styles.desktopOnly}>
				<AppBar position="static" className={Styles.appBar}>
					<Toolbar>
						<ImageFuture src={QarybSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
						<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
							<ImageFuture
								src={SearchIconSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.searchIcon}
							/>
							<input
								value={searchValue}
								onChange={(e) => {
									setSearchValue(e.target.value);
								}}
								type="text"
								placeholder="Rechercher"
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
										aria-controls={open ? 'profile-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
										onClick={handleClick}
										size="large"
										color="inherit"
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge badgeContent={4} color="primary">*/}
										{!avatar ? (
											<Skeleton variant="circular" width={24} height={24} />
										) : (
											<ImageFuture
												src={avatar as string}
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
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{
												'aria-labelledby': 'my-profile-button',
											}}
											keepMounted
										>
											<MenuItem onClick={handleClose} className={Styles.menuItem}>
												<Link href={DASHBOARD} passHref>
													<a className={Styles.anchorWrapper}>
														<ImageFuture
															src={DashboardSVG}
															alt=""
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.subMenuIcons}
														/>
														<span>Mon dashboard</span>
													</a>
												</Link>
											</MenuItem>
											<ShopMenuItem handleClose={handleClose} />
											<Divider orientation="horizontal" flexItem />
											<MenuItem onClick={handleClose} className={Styles.fadedMenuItem}>
												<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
													<ImageFuture
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
									<IconButton
										aria-label="notifications of current user"
										id="notifications-button"
										onClick={() => {}}
										size="large"
										color="inherit"
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge badgeContent={4} color="primary">*/}
										<ImageFuture
											src={NotificationsSVG}
											alt=""
											width={24}
											height={24}
											sizes="100vw"
										/>
									</IconButton>
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
									<Link href={AUTH_LOGIN} passHref>
										<a className={Styles.anchorWrapper}>
											<ImageFuture
												src={ProfileSVG}
												alt=""
												width={24}
												height={24}
												sizes="100vw"
											/>
										</a>
									</Link>
								</IconButton>
							)}
							{/* Cart button */}
							<IconButton
								size="large"
								aria-label="cart of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
							>
								{/*<ThemeProvider theme={badgeTheme()}>*/}
								{/*	<Badge badgeContent={4} color="primary">*/}
								<ImageFuture
									src={EmptyCartSVG}
									alt=""
									width={24}
									height={24}
									sizes="100vw"
									className={Styles.navBarIcons}
								/>
								{/*</Badge>*/}
								{/*</ThemeProvider>*/}
							</IconButton>
						</Stack>
					</Toolbar>
				</AppBar>
				<Stack direction="row" spacing="32px" className={Styles.bottomStackAnchor} alignItems="center">
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Collections lifestyle</a>
					</Link>
					<Link href="/" passHref>
						{/*<a className={Styles.anchorText}>Boutique coup de </a>*/}
						<a>
							<Stack direction="row" alignItems="center">
								<span className={Styles.heartShapeAnchorText}>Boutique coup de</span>
								<ImageFuture alt="" width="0" height="0" sizes="100vw" src={HeartShapeSVG} />
							</Stack>
						</a>
					</Link>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Nos produits</a>
					</Link>
					<Stack direction="row" alignItems="center">
						<span className={Styles.disabledAnchorText}>Nos services</span>
						<span className={Styles.comingSoon}>Coming soon</span>
					</Stack>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Blog</a>
					</Link>
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
							<ImageFuture
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
									<ImageFuture
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
									<Link href="/" passHref>
										<a className={Styles.anchorText}>Collections lifestyle</a>
									</Link>
									<Link href="/" passHref>
										<a>
											<Stack direction="row" alignItems="center">
												<span className={Styles.heartShapeAnchorText}>Boutique coup de</span>
												<ImageFuture src={HeartShapeSVG} alt="" width={32} height={32} />
											</Stack>
										</a>
									</Link>
									<Link href="/" passHref>
										<a className={Styles.anchorText}>Nos produits</a>
									</Link>
									<Stack direction="row" alignItems="center">
										<span className={Styles.disabledAnchorText}>Nos services</span>
										<span className={Styles.comingSoon}>Coming soon</span>
									</Stack>
									<span className={Styles.miniDivider}>—</span>
									<Link href="/" passHref>
										<a className={Styles.anchorText}>Blog</a>
									</Link>
								</Stack>
								<Box paddingTop="16px" paddingBottom="16px" paddingX="40px">
									<Divider orientation="horizontal" flexItem className={Styles.divider} />
								</Box>
								<Box>
									{!loading && session ? (
										<Stack direction="column" paddingX="40px" paddingY="18px" paddingTop={0} spacing={2}>
											<Stack direction="row" spacing={2} alignItems="center">
												{!avatar ? (
													<Skeleton variant="circular" width={48} height={48} />
												) : (
													<ImageFuture
														src={avatar as string}
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
											<Link href={DASHBOARD} passHref>
												<a className={Styles.anchorWrapper}>
													<ImageFuture
														src={DashboardSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
													<span className={Styles.mobileAnchorSpan}>Mon dashboard</span>
												</a>
											</Link>
											{userHasShop && userShopUrl ? (
												<Link href={REAL_SHOP_BY_SHOP_LINK_ROUTE(userShopUrl as string)} passHref>
													<a className={Styles.anchorWrapper}>
														<ImageFuture
															src={BoutiqueSVG}
															alt=""
															width={24}
															height={24}
															sizes="100vw"
															className={Styles.subMenuDrawerIcons}
														/>
														<span className={Styles.mobileAnchorSpan}>Ma boutique</span>
													</a>
												</Link>
											) : (
												<Link href={REAL_SHOP_ADD_SHOP_NAME} passHref>
													<a className={`${Styles.purpleAnchorWrapper}`}>
														<ImageFuture
															src={CreerVotreBoutiqueSVG}
															alt=""
															width={24}
															height={24}
															sizes="100vw"
															className={Styles.subMenuDrawerIcons}
														/>
														<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
													</a>
												</Link>
											)}
											<Box paddingTop={1} paddingBottom={1}>
												<Divider orientation="horizontal" flexItem />
											</Box>
											<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
												<ImageFuture
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
											<Link href={REAL_SHOP_ADD_SHOP_NAME} passHref>
												<a className={Styles.purpleAnchorWrapper}>
													<ImageFuture
														src={CreerVotreBoutiqueSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
													<span className={`${Styles.mobileAnchorSpan}`}>Créez votre boutique</span>
												</a>
											</Link>
											<Link href={AUTH_LOGIN} passHref>
												<a className={Styles.anchorWrapper}>
													<ImageFuture
														src={ProfileSVG}
														alt=""
														width={24}
														height={24}
														sizes="100vw"
														className={Styles.subMenuDrawerIcons}
													/>
													<span className={Styles.mobileAnchorSpan}>Connexion</span>
												</a>
											</Link>
										</Stack>
									)}
								</Box>
							</Stack>
						</SideNavDrawer>
						{/* FIN MOBILE SIDE NAV DRAWER */}
						<Stack direction="row" justifySelf="center" className={Styles.mobileRootLogoStack}>
							<ImageFuture src={QarybSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
						</Stack>
						<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
							{!loading && session ? (
								<>
									<IconButton
										aria-label="profile of current user"
										id="my-profile-mobile-button"
										aria-controls={openMobile ? 'profile-mobile-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={openMobile ? 'true' : undefined}
										onClick={handleMobileClick}
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge badgeContent={4} color="primary">*/}
										{!avatar ? (
											<Skeleton variant="circular" width={24} height={24} />
										) : (
											<ImageFuture
												src={avatar as string}
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
											anchorEl={anchorMobileEl}
											open={openMobile}
											onClose={handleMobileClose}
											MenuListProps={{
												'aria-labelledby': 'my-profile-mobile-button',
											}}
										>
											<MenuItem onClick={handleMobileClose} className={Styles.menuItem}>
												<Link href={DASHBOARD} passHref>
													<a className={Styles.anchorWrapper}>
														<ImageFuture
															src={DashboardSVG}
															alt=""
															width="0"
															height="0"
															sizes="100vw"
															className={Styles.subMenuIcons}
														/>
														<span>Mon dashboard</span>
													</a>
												</Link>
											</MenuItem>
											<ShopMenuItem handleClose={handleMobileClose} />
											<Divider orientation="horizontal" flexItem />
											<MenuItem onClick={handleMobileClose} className={Styles.fadedMenuItem}>
												<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
													<ImageFuture
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
									<Link href={AUTH_LOGIN} passHref>
										<a className={Styles.anchorWrapper}>
											<ImageFuture
												src={ProfileSVG}
												alt=""
												width={24}
												height={24}
												sizes="100vw"
												className={Styles.mobileIcons}
											/>
										</a>
									</Link>
								</IconButton>
							)}
							<IconButton
								size="large"
								aria-label="cart of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								className={Styles.iconButton}
							>
								<ImageFuture
									src={EmptyCartSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.mobileIcons}
								/>
							</IconButton>
						</Stack>
					</Toolbar>
				</AppBar>
				<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
					<ImageFuture src={SearchIconSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.searchIcon} />
					<input
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						type="text"
						placeholder="Rechercher"
						className={Styles.searchInput}
					/>
				</Stack>
			</Box>
		</ThemeProvider>
	);
};

export default UserMainNavigationBar;
