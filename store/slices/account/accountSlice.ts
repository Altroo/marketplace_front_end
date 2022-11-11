import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AccountCheckAccountType,
	AccountStateInterface,
} from '../../../types/account/accountTypes';
import { UserClass } from '../../../models/account/UserClass';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import { apiErrorInitialState } from "../_init/_initSlice";

// Extra reducers actions
export const profileGETApiErrorAction = createAction<ApiErrorResponseType>('profileGETApiErrorAction');
export const check_accountGETApiErrorAction = createAction<ApiErrorResponseType>('check_accountGETApiErrorAction');



const initialState: AccountStateInterface = {
	profil: {},
	profilApi: apiErrorInitialState,
	isLoggedIn: false,
	check_account: {},
	check_accountApi: apiErrorInitialState,
	verifiedAccount: false,
	verificationCodeSent: false,
	passwordChanged: false,
	passwordResetCodeSent: false,
	emailChanged: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState: initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		setProfil: (state, action: PayloadAction<UserClass>) => {
			state.profil = action.payload;
			state.profilApi.fetchPromiseStatus = 'RESOLVED';
			state.profilApi.isFetchInProgress = false;
		},
		setCheckAccountGETLoading: (state) => {
			state.check_accountApi.isFetchInProgress = true;
			state.check_accountApi.fetchPromiseStatus = 'PENDING';
			state.check_accountApi.error = apiErrorInitialState.error;
		},
		setCheckAccount: (state, action: PayloadAction<AccountCheckAccountType>) => {
			state.check_account = action.payload;
		},
		setResendVerification: (state, action: PayloadAction<boolean>) => {
			state.verificationCodeSent = action.payload;
		},
		setPasswordChanged: (state, action: PayloadAction<boolean>) => {
			state.passwordChanged = action.payload;
		},
		setPasswordResetSent: (state, action: PayloadAction<boolean>) => {
			state.passwordResetCodeSent = action.payload;
		},
		setEmailChanged: (state, action: PayloadAction<{ new_email: string; changed: boolean }>) => {
			state.emailChanged = action.payload.changed;
			state.verifiedAccount = false;
			state.check_account.email = action.payload.new_email;
			state.check_account.verified = false;
			state.check_account.has_password = true;
		},
		setFbEmailSet: (state, action: PayloadAction<{email: string}>) => {
			state.verifiedAccount = false;
			state.check_account.email = action.payload.email;
			state.check_account.verified = false;
		},
		setWSUserAvatar: (state, action: PayloadAction<{avatar: string}>) => {
			// payload has user_avatar
			state.profil.avatar = action.payload.avatar;
			state.check_account.picture = action.payload.avatar;
		},
		initAccount: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(profileGETApiErrorAction, (state, action) => {
				state.profilApi.error = action.payload.error;
				state.profilApi.fetchPromiseStatus = 'REJECTED';
				state.profilApi.isFetchInProgress = false;
			})
			.addCase(check_accountGETApiErrorAction, (state, action) => {
				state.check_accountApi.error = action.payload.error;
				state.check_accountApi.fetchPromiseStatus = 'REJECTED';
				state.check_accountApi.isFetchInProgress = false;
			});
	},
});

export const {
	setIsLoggedIn,
	setProfil,
	setCheckAccountGETLoading,
	setCheckAccount,
	setResendVerification,
	setPasswordChanged,
	setPasswordResetSent,
	setEmailChanged,
	setFbEmailSet,
	setWSUserAvatar,
	initAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
