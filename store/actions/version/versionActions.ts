import * as Types from '../index';

export const versionGetRootAction = () => { // <= used as export in saga
	return {
		type: Types.VERSION_GET_ROOT,
	};
};

export const versionPostNewsLetterAction = (email: string) => {
	return {
		type: Types.VERSION_POST_NEWS_LETTER,
		email,
	};
};