import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionStateInterface } from '../../../types/version/versionTypes';

const initialState: VersionStateInterface = {
	current_version: '',
	maintenance: false,
};

const versionSlice = createSlice({
	name: 'version',
	initialState: initialState,
	reducers: {
		setCurrentVersion: (state, action: PayloadAction<VersionStateInterface>) => {
			state.current_version = action.payload.current_version;
			state.maintenance = action.payload.maintenance;
		},
		setWSMaintenance: (state, action: PayloadAction<boolean>) => {
			state.maintenance = action.payload;
		},
		initVersion: () => {
			return initialState;
		},
	},
});

export const {
	setCurrentVersion,
	initVersion,
	setWSMaintenance
} = versionSlice.actions;

export default versionSlice.reducer;
