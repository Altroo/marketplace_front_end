import * as Types from '../index';
// import { AxiosErrorDefaultType } from "../../../types/_init/_initTypes";

export const versionGetRootAction = () => {
	return {
		type: Types.VERSION_GET_ROOT,
	};
};

// export const versionGetRootActionSetError = (error: AxiosErrorDefaultType) => {
// 	return {
// 		type: Types.VERSION_GET_ROOT_ERROR,
// 		error,
// 	};
// };