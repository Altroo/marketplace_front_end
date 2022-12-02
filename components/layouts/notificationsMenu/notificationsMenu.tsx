import React, {useCallback, useState, MouseEvent} from 'react';
import Styles from './notificationsMenu.module.sass';
import { Divider, Menu, MenuItem, Stack, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import ReactTimeAgo from 'react-time-ago';
import Image from 'next/image';
import NewNotificationBlueSVG from '../../../public/assets/svgs/mainNavBarIcons/new-notification-blue.svg';
import { NotificationsDropDownMenuTheme } from '../../../utils/themes';
import NotificationsSVG from '../../../public/assets/svgs/mainNavBarIcons/notification.svg';
import NewNotificationSVG from '../../../public/assets/svgs/mainNavBarIcons/new-notification-mixed.svg';
import IconButton from '@mui/material/IconButton';
import { getUserNewNotification, getUserNotifications } from "../../../store/selectors";
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { getNotificationLink } from '../../../utils/rawData';
import { notificationPatchRootAction } from '../../../store/actions/notification/notificationActions';

const notificationsMenuTheme = NotificationsDropDownMenuTheme();

type Props = {
	children?: React.ReactNode;
};

const NotificationsMenu: React.FC<Props> = (props: Props) => {
	// const router = useRouter();
	const dispatch = useAppDispatch();
	const userNotifications = useAppSelector(getUserNotifications);
	const newNotification = useAppSelector(getUserNewNotification);

	const [notificationsSubMenuEl, setNotificationsSubMenuEl] = useState<null | HTMLElement>(null);
	const openNotificationsSubMenu = Boolean(notificationsSubMenuEl);

	const handleNotificationsSubMenuClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		setNotificationsSubMenuEl(event.currentTarget);
	}, []);

	const handleNotificationsSubMenuClose = useCallback(() => {
		setNotificationsSubMenuEl(null);
	}, []);

	const handleNotificationOnClick = useCallback((pk: number, alreadyViewed: boolean) => {
		setNotificationsSubMenuEl(null);
		if (!alreadyViewed) {
			dispatch(notificationPatchRootAction(pk));
		}
	}, [dispatch]);

	return (
		<>
			<IconButton
				aria-label="notifications of current user"
				id="notifications-button"
				aria-controls={openNotificationsSubMenu ? 'notifications-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={openNotificationsSubMenu ? 'true' : undefined}
				onClick={handleNotificationsSubMenuClick}
				size="large"
				color="inherit"
				className={Styles.noPaddingMobile}
			>
				{newNotification ? (
					<Image src={NewNotificationSVG} alt="" width={32} height={32} sizes="100vw" />
				) : (
					<Image src={NotificationsSVG} alt="" width={24} height={26} sizes="100vw" />
				)}
			</IconButton>
			<ThemeProvider theme={notificationsMenuTheme}>
				<Menu
					id="notifications-menu"
					anchorEl={notificationsSubMenuEl}
					open={openNotificationsSubMenu}
					onClose={handleNotificationsSubMenuClose}
					MenuListProps={{
						'aria-labelledby': 'notifications-button',
					}}
					keepMounted
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<span className={Styles.notificationsMenuHeader}>Notifications</span>
					<Stack direction="column" maxHeight="300px" divider={<Divider orientation="horizontal" flexItem className={Styles.divider} />}>
						{userNotifications.map((notification) => {
							const notif_data = getNotificationLink(notification.type_);
							const created_date = new Date(notification.created_date);
							return (
								<MenuItem
									onClick={() => handleNotificationOnClick(notification.pk, notification.viewed)}
									key={notification.pk}
								>
									<Link href={notif_data.link} style={{ width: '100%' }}>
										<Stack direction="row" justifyContent="space-between" alignItems="center">
											<Stack direction="column" spacing={0}>
												<span className={Styles.notificationsMenuDate}>
													<ReactTimeAgo date={created_date} locale="fr" />
												</span>
												<span className={Styles.notificationsMenuTitle}>{notif_data.message}</span>
											</Stack>
											{!notification.viewed && (
												<Image src={NewNotificationBlueSVG} alt="" width="12" height="12" sizes="100vw" />
											)}
										</Stack>
									</Link>
								</MenuItem>
							);
						})}
					</Stack>
				</Menu>
			</ThemeProvider>
		</>
	);
};

export default NotificationsMenu;
