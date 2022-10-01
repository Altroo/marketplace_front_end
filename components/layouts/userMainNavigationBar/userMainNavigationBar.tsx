import React, { useState } from 'react';
import Styles from './userMainNavigationBar.module.sass';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, Button, Divider, Menu, MenuItem, Stack, ThemeProvider } from '@mui/material';
import { badgeTheme, getDropDownMenuTheme, userMainNavigationBarTheme } from '../../../utils/themes';
import { default as ImageFuture } from 'next/future/image';
import QarybSVG from '../../../public/assets/images/logo.svg';
import ProfileSVG from '../../../public/assets/svgs/mainNavBarIcons/profile.svg';
import EmptyCartSVG from '../../../public/assets/svgs/mainNavBarIcons/empty-cart.svg';
import DashboardSVG from '../../../public/assets/svgs/mainNavBarIcons/dashboard.svg';
import BoutiqueSVG from '../../../public/assets/svgs/mainNavBarIcons/boutique.svg';
import NotificationsSVG from '../../../public/assets/svgs/mainNavBarIcons/notification.svg';
import HambourgerMenuSVG from '../../../public/assets/svgs/mainNavBarIcons/hambourger-menu.svg';
import LogoutSVG from '../../../public/assets/svgs/mainNavBarIcons/logout.svg';
import { useSession, signOut } from 'next-auth/react';
import { useAppSelector } from '../../../utils/hooks';
import { getCheckUserHasShop, getUserProfilAvatar, getUserShopUrl } from '../../../store/selectors';
import SearchIconSVG from '../../../public/assets/svgs/globalIcons/search.svg';
import Link from 'next/link';
import { AUTH_LOGIN, AUTH_SHOP_LINK_ROUTE, DASHBOARD, TEMP_SHOP_ADD_SHOP_NAME } from "../../../utils/routes";
import { deleteRemoteCookiesAppToken } from '../../../utils/helpers';
// import CustomBadge from '../../../htmlElements/customBadge[not-working]/customBadge';

type Props = {
	children?: React.ReactNode;
};

const UserMainNavigationBar: React.FC<Props> = (props: Props) => {
	const { data: session, status } = useSession();
	const avatar = useAppSelector(getUserProfilAvatar);
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

	const logOutHandler = () => {
		signOut().then(() => {
			deleteRemoteCookiesAppToken();
		});
	};

	return (
		<ThemeProvider theme={userMainNavigationBarTheme()}>
			<Box className={Styles.desktopOnly}>
				<AppBar position="static" className={Styles.appBar}>
					<Toolbar>
						<ImageFuture src={QarybSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
						<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
							<ImageFuture src={SearchIconSVG} alt="" className={Styles.searchIcon} />
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
									<Button
										id="my-profile-button"
										aria-controls={open ? 'profile-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
										onClick={handleClick}
										className={Styles.avatarButton}
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge variant="dot" color="primary">*/}
										<Avatar alt="" src={avatar as string} className={Styles.navBarIcons} />
										{/*</Badge>*/}
										{/*</ThemeProvider>*/}
									</Button>
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
										>
											<MenuItem onClick={handleClose} className={Styles.menuItem}>
												<Link href={DASHBOARD} passHref>
													<a className={Styles.anchorWrapper}>
														<ImageFuture src={DashboardSVG} alt="" className={Styles.subMenuIcons} />
														<span>Mon dashboard</span>
													</a>
												</Link>
											</MenuItem>
											<MenuItem onClick={handleClose} className={Styles.menuItem}>
												<Link
													href={userHasShop && userShopUrl ? AUTH_SHOP_LINK_ROUTE(userShopUrl as string) : TEMP_SHOP_ADD_SHOP_NAME}
													passHref
												>
													<a className={Styles.anchorWrapper}>
														<ImageFuture src={BoutiqueSVG} alt="" className={Styles.subMenuIcons} />
														<span>Ma boutique</span>
													</a>
												</Link>
											</MenuItem>
											<Divider orientation="horizontal" flexItem />
											<MenuItem onClick={handleClose} className={Styles.fadedMenuItem}>
												<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
													<ImageFuture src={LogoutSVG} alt="" className={Styles.subMenuIcons} />
													<span>Se déconnecter</span>
												</Box>
											</MenuItem>
										</Menu>
									</ThemeProvider>
									<Button
										id="notifications-button"
										// aria-controls={open ? 'basic-menu' : undefined}
										// aria-haspopup="true"
										// aria-expanded={open ? 'true' : undefined}
										onClick={() => {}}
										className={Styles.avatarButton}
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge variant="dot" color="primary">*/}
										<ImageFuture src={NotificationsSVG} alt="" className={Styles.navBarIcons} />
										{/*</Badge>*/}
										{/*</ThemeProvider>*/}
									</Button>
								</>
							) : (
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
												width="0"
												height="0"
												sizes="100vw"
												className={Styles.navBarIcons}
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
							>
								{/*<ThemeProvider theme={badgeTheme()}>*/}
								{/*	<Badge badgeContent={4} color="primary">*/}
								<ImageFuture
									src={EmptyCartSVG}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									className={Styles.navBarIcons}
								/>
								{/*</Badge>*/}
								{/*</ThemeProvider>*/}
							</IconButton>
						</Stack>
					</Toolbar>
				</AppBar>
				<Stack direction="row" spacing={3} className={Styles.bottomStackAnchor} alignItems="center">
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Creators</a>
					</Link>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Nos collections</a>
					</Link>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Sport & hobbies</a>
					</Link>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Art & collections</a>
					</Link>
					<Link href="/" passHref>
						<a className={Styles.anchorText}>Mode & beauté</a>
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
						>
							<ImageFuture src={HambourgerMenuSVG} alt="" />
						</IconButton>
						<ImageFuture src={QarybSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.logo} />
						<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
							{!loading && session ? (
								<>
									<Button
										id="my-profile-button"
										aria-controls={open ? 'profile-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
										onClick={handleClick}
										// className={Styles.avatarButton}
										className={Styles.iconButton}
									>
										{/*<ThemeProvider theme={badgeTheme()}>*/}
										{/*	<Badge variant="dot" color="primary">*/}
										<Avatar alt="" src={avatar as string} className={Styles.navBarIcons} />
										{/*</Badge>*/}
										{/*</ThemeProvider>*/}
									</Button>
									<ThemeProvider theme={getDropDownMenuTheme()}>
										<Menu
											id="profile-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{
												'aria-labelledby': 'my-profile-button',
											}}
										>
											<MenuItem onClick={handleClose} className={Styles.menuItem}>
												<Link href={DASHBOARD} passHref>
													<a className={Styles.anchorWrapper}>
														<ImageFuture src={DashboardSVG} alt="" className={Styles.subMenuIcons} />
														<span>Mon dashboard</span>
													</a>
												</Link>
											</MenuItem>
											<MenuItem onClick={handleClose} className={Styles.menuItem}>
												<Link
													href={userHasShop && userShopUrl ? AUTH_SHOP_LINK_ROUTE(userShopUrl as string) : TEMP_SHOP_ADD_SHOP_NAME}
													passHref
												>
													<a className={Styles.anchorWrapper}>
														<ImageFuture src={BoutiqueSVG} alt="" className={Styles.subMenuIcons} />
														<span>Ma boutique</span>
													</a>
												</Link>
											</MenuItem>
											<Divider orientation="horizontal" flexItem />
											<MenuItem onClick={handleClose} className={Styles.fadedMenuItem}>
												<Box onClick={logOutHandler} className={Styles.anchorWrapper}>
													<ImageFuture src={LogoutSVG} alt="" className={Styles.subMenuIcons} />
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
												width="0"
												height="0"
												sizes="100vw"
												className={Styles.navBarIcons}
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
									className={Styles.navBarIcons}
								/>
							</IconButton>
						</Stack>
					</Toolbar>
				</AppBar>
				<Stack alignItems="center" className={Styles.searchWrapper} direction="row">
					<ImageFuture src={SearchIconSVG} alt="" className={Styles.searchIcon} />
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
