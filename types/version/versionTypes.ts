import { ResponseDataInterface } from "../_init/_initTypes";


//!- Version State
export interface VersionStateInterface {
	current_version: string;
	maintenance: boolean;
}

export type VersionGetRootResponseType = ResponseDataInterface<VersionStateInterface>;

export interface VirementDataType {
    email: string,
    domiciliation: string,
    numero_de_compte: string,
    titulaire_du_compte: string,
    numero_rib: string,
    identifiant_swift: string,
}

export type VirementDataResponseType = ResponseDataInterface<VirementDataType>;