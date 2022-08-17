import { ApiPromise, ResponseDataInterface } from "../_init/_initTypes";

//!- Version State
export interface VersionStateInterface {
	current_version: string;
	maintenance: boolean | null;
	api: ApiPromise,
}

export type VersionGetRootResponseType = ResponseDataInterface<VersionStateInterface>;
