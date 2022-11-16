import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationGetRootType, NotificationStateInterface } from '../../../types/notification/notificationTypes';

const initialState: NotificationStateInterface = {
	notifications: [],
	new_notification: false,
};

const notificationSlice = createSlice({
	name: 'slice',
	initialState: initialState,
	reducers: {
		setNotificationsState: (state, action: PayloadAction<Array<NotificationGetRootType>>) => {
			state.notifications = action.payload;
			state.new_notification = action.payload.some(function (notification) {
				return !notification.viewed;
			});
		},
		setNotificationVueState: (state, action: PayloadAction<number>) => {
			state.notifications.map((notification) => {
				if (notification.pk === action.payload && !notification.viewed) {
					notification.viewed = true;
				}
			});
			state.new_notification = state.notifications.some(function (notification) {
				return !notification.viewed;
			});
		},
		prependNotificationsState: (state, action: PayloadAction<NotificationGetRootType>) => {
			const {pk, body, type_, viewed, created_date} = action.payload;
			const notification: NotificationGetRootType = {
				pk,
				body,
				type_,
				viewed,
				created_date
			};
			state.notifications.unshift(notification);
			state.new_notification = state.notifications.some(function (notification) {
				return !notification.viewed;
			});
		},
	},
});

export const {
	setNotificationsState,
	setNotificationVueState,
	prependNotificationsState,
} = notificationSlice.actions;

export default notificationSlice.reducer;