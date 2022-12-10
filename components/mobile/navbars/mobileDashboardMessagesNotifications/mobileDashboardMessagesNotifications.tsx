import React from 'react';
import Styles from './mobileDashboardMessagesNotifications.module.sass';
import { Stack } from '@mui/material';
import NotificationsMenu from "../../../layouts/notificationsMenu/notificationsMenu";
import { TabletAndMobile } from "../../../../utils/helpers";

type Props = {
	messageIcon: string;
	notificationIcon: string;
	children?: React.ReactNode;
};

const MobileDashboardMessagesNotifications: React.FC<Props> = (props: Props) => {
	return (
		<TabletAndMobile>
			<Stack
			direction="row"
			justifyContent="flex-end"
			className={Styles.mobileMsgNotifRootStack}
		>
			<NotificationsMenu/>
		</Stack>
		</TabletAndMobile>
	);
};

export default MobileDashboardMessagesNotifications;
