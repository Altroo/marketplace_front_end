import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionStateInterface } from '../../../types/version/versionTypes';
import { ApiErrorResponseType } from "../../../types/_init/_initTypes";
// import { HYDRATE } from "next-redux-wrapper";

const initialState: VersionStateInterface = {
	current_version: '',
	maintenance: null,
	api: {
		error: {
			status_code: null,
			message: null,
			details: null,
		},
		isAddInProgress: false,
		isFetchInProgress: false,
		isDeleteInProgress: false,
		isEditInProgress: false,
		promiseStatus: null,
	},
};

const versionSlice = createSlice({
	name: 'version',
	initialState: initialState,
	reducers: {
		setCurrentVersionIsLoading: (state) => {
			state.api.isFetchInProgress = true;
			state.api.promiseStatus = 'PENDING';
			return state;
		},
		setCurrentVersion: (state, action: PayloadAction<VersionStateInterface>) => {
			state.current_version = action.payload.current_version;
			state.maintenance = action.payload.maintenance;
			state.api.promiseStatus = 'RESOLVED';
			state.api.isFetchInProgress = false;
			return state;
		},
		setCurrentVersionError: (state, action: PayloadAction<ApiErrorResponseType>) => {
			state.api.error = action.payload.error;
			state.api.promiseStatus = 'REJECTED';
			state.api.isFetchInProgress = false;
			return state;
		},
		setWSMaintenance: (state, action: PayloadAction<boolean>) => {
			state.maintenance = action.payload;
			return state;
		},
		initVersion: () => {
			return initialState;
		},
		// set error states.
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.version };
	// 	},
	// },
});

export const {
	setCurrentVersionIsLoading,
	setCurrentVersion,
	setCurrentVersionError,
	initVersion,
	setWSMaintenance
} = versionSlice.actions;

export default versionSlice.reducer;
