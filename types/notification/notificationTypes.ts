// SA = subscription activated
import { ResponseDataInterface } from "../_init/_initTypes";

export type NotificationsType = 'SA';

//!- Notification State
export interface NotificationStateInterface {
	notifications: Array<NotificationGetRootType>;
	new_notification: boolean;
}


export interface NotificationGetRootType {
	pk: number,
	body: string | null,
	type_: NotificationsType,
	viewed: boolean,
	created_date: string,
}

export type NotificationsGetRootResponseType = ResponseDataInterface<Array<NotificationGetRootType>>;