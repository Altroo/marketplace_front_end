import * as types from '../index';
import { NotificationsType } from '../../../types/notification/notificationTypes';
import { WS_FACTURE } from "../index";

export const notificationGetRootAction = () => {
	return {
		type: types.NOTIFICATION_GET_ROOT,
	};
};

export const notificationPatchRootAction = (pk: number) => {
	return {
		type: types.NOTIFICATION_PATCH_ROOT,
		pk,
	};
};

export const WSNotificationAction = (
	pk: number,
	body: string | null,
	type_: NotificationsType,
	viewed: boolean,
	created_date: string,
) => {
	return {
		type: types.WS_NOTIFICATION,
		pk,
		body,
		type_,
		viewed,
		created_date,
	};
};

export const WSFactureAction = (path: string) => {
	return {
		type: types.WS_FACTURE,
		path
	};
};