import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateInterface, InitStateToken, InitStateUniqueID } from '../../../types/_init/_initTypes';

export const apiErrorInitialState = {
	error: {
		status_code: null,
		message: null,
		details: null,
	},
	isFetchInProgress: false,
	isDeleteInProgress: false,
	isEditInProgress: false,
	isAddInProgress: false,
	addPromiseStatus: null,
	fetchPromiseStatus: null,
	deletePromiseStatus: null,
	editPromiseStatus: null,
};

export const paginationInitial = {
	next: null,
	previous: null,
	count: 0,
	results: []
};

export const emptyInitStateToken = {
	access_token: null,
	refresh_token: null,
	user: {
		pk: null,
		email: null,
		first_name: null,
		last_name: null,
	},
	access_token_expiration: null,
	refresh_token_expiration: null,
};
export const emptyInitStateUniqueID = {
	unique_id: null,
	unique_id_expiration: null,
};

export const initialState: InitStateInterface<InitStateToken, InitStateUniqueID> = {
	tokenType: null,
	initStateToken: emptyInitStateToken,
	initStateUniqueID: emptyInitStateUniqueID,
};

const _initSlice = createSlice({
	name: '_init',
	initialState: initialState,
	reducers: {
		setInitState: (state, action: PayloadAction<InitStateInterface<InitStateToken, InitStateUniqueID>>) => {
			state.tokenType = action.payload.tokenType;
			state.initStateToken = action.payload.initStateToken;
			state.initStateUniqueID = action.payload.initStateUniqueID;
			// return state;
		},
		setTokenState: (state, action: PayloadAction<InitStateToken>) => {
			state.tokenType = 'TOKEN';
			state.initStateToken = action.payload;
			// return state;
		},
		setFbEmailInInit: (state, action: PayloadAction<{email : string}>) => {
			state.initStateToken.user.email = action.payload.email;
		},
		setBoutiqueCoupDeCoeur: (state, action: PayloadAction<string>) => {
			state.boutiqueCoupDeCoeur = action.payload;
		},
		initToken: () => {
			return initialState;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload._init };
	// 	}
	// },
});

export const { setInitState, setTokenState, setFbEmailInInit, initToken, setBoutiqueCoupDeCoeur } = _initSlice.actions;

export default _initSlice.reducer;