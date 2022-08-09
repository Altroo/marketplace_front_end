import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionStateInterface } from '../../../types/version/versionTypes';
// import { HYDRATE } from "next-redux-wrapper";

const initialState: VersionStateInterface = {
	current_version: '',
    maintenance: null,
};

const versionSlice = createSlice({
	name: 'version',
	initialState: initialState,
	reducers: {
		setCurrentVersion: (state, action: PayloadAction<VersionStateInterface>) => {
			state = action.payload;
			return state;
		},
		setWSMaintenance: (state, action: PayloadAction<boolean>) => {
			state.maintenance = action.payload;
			return state;
		},
		initVersion: () => {
			return initialState;
		},
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.version };
	// 	},
	// },
});

export const {
	setCurrentVersion,
	initVersion,
	setWSMaintenance
} = versionSlice.actions;

export default versionSlice.reducer;