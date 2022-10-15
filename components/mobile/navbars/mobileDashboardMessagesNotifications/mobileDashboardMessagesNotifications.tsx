import React from 'react';
import Styles from './mobileDashboardMessagesNotifications.module.sass';
import IconButton from '@mui/material/IconButton';
import { default as ImageFuture } from 'next/future/image';
import { Stack } from '@mui/material';

type Props = {
	messageIcon: string;
	notificationIcon: string;
	children?: React.ReactNode;
};

const MobileDashboardMessagesNotifications: React.FC<Props> = (props: Props) => {
	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			rowGap="12px"
			className={`${Styles.mobileOnly} ${Styles.mobileMsgNotifRootStack}`}
		>
			<IconButton onClick={() => {}} size="large" color="inherit" className={Styles.mobileMessageIconButton}>
				<ImageFuture src={props.messageIcon} alt="" width={32} height={32} sizes="100vw" />
			</IconButton>
			<IconButton onClick={() => {}} size="large" color="inherit" className={Styles.mobileNotificationIconButton}>
				<ImageFuture src={props.notificationIcon} alt="" width={25} height={25} sizes="100vw" />
			</IconButton>
		</Stack>
	);
};

export default MobileDashboardMessagesNotifications;