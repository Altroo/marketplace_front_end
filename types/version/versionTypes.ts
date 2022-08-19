import { GlobalApiPromiseError, ResponseDataInterface } from "../_init/_initTypes";


export type VersionApiErrorResponseType = Pick<GlobalApiPromiseError, 'isFetchInProgress' | 'fetchPromiseStatus' | 'error'>;
//!- Version State
export interface VersionStateInterface {
	current_version: string;
	maintenance: boolean | null;
	api: VersionApiErrorResponseType,
}

export type VersionGetRootResponseType = ResponseDataInterface<VersionStateInterface>;
