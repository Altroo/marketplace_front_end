import * as Types from '../index';

export const versionGetRootAction = () => { // <= used as export in saga
	return {
		type: Types.VERSION_GET_ROOT,
	};
};
