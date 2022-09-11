import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { VersionStateInterface } from '../../../types/version/versionTypes';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
// import { HYDRATE } from "next-redux-wrapper";

// Extra reducers actions
export const SetGETVersionApiError = createAction<ApiErrorResponseType>('SetGETVersionApiError');


const initialState: VersionStateInterface = {
	current_version: '',
	maintenance: null,
	api: {
		error: {
			status_code: null,
			message: null,
			details: null,
		},
		isFetchInProgress: false,
		fetchPromiseStatus: null,
	},
};

const versionSlice = createSlice({
	name: 'version',
	initialState: initialState,
	reducers: {
		setCurrentVersionIsLoading: (state) => {
			state.api.isFetchInProgress = true;
			state.api.fetchPromiseStatus = 'PENDING';
			state.api.error = {
				details: null,
				status_code: null,
				message: null,
			};
			// return state;
		},
		setCurrentVersion: (state, action: PayloadAction<VersionStateInterface>) => {
			state.current_version = action.payload.current_version;
			state.maintenance = action.payload.maintenance;
			state.api.fetchPromiseStatus = 'RESOLVED';
			state.api.isFetchInProgress = false;
			// return state;
		},
		setWSMaintenance: (state, action: PayloadAction<boolean>) => {
			state.maintenance = action.payload;
			// return state;
		},
		initVersion: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(SetGETVersionApiError, (state, action) => {
			state.api.error = action.payload.error;
			state.api.fetchPromiseStatus = 'REJECTED';
			state.api.isFetchInProgress = false;
			// return state;
		});
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
	initVersion,
	setWSMaintenance
} = versionSlice.actions;

export default versionSlice.reducer;
