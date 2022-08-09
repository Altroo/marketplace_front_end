import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateInterface, InitStateToken, InitStateUniqueID } from '../../../types/_init/_initTypes';
// import { HYDRATE } from "next-redux-wrapper";

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
			return action.payload;
		},
		setTokenState: (state, action: PayloadAction<InitStateToken>) => {
			state.tokenType = 'TOKEN';
			state.initStateToken = action.payload;
			return state;
		},
		setEmptyUniqueIDState: (state) => {
			state.initStateUniqueID = emptyInitStateUniqueID;
			return state;
		},
		initToken: () => {
			return initialState;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload._init };
	// 	},
	// },
});

export const { setInitState, setTokenState, setEmptyUniqueIDState, initToken } = _initSlice.actions;

export default _initSlice.reducer;
