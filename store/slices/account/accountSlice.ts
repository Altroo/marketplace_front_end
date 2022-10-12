import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AccountAddress,
	AccountBlockType,
	AccountCheckAccountType,
	AccountGetSocialsType,
	AccountStateInterface,
} from '../../../types/account/accountTypes';
import { UserClass } from '../../../models/account/UserClass';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import { apiErrorInitialState } from "../_init/_initSlice";
// import { HYDRATE } from "next-redux-wrapper";

// Extra reducers actions
export const profileGETApiErrorAction = createAction<ApiErrorResponseType>('profileGETApiErrorAction');
export const check_accountGETApiErrorAction = createAction<ApiErrorResponseType>('check_accountGETApiErrorAction');



const initialState: AccountStateInterface = {
	// email: null,
	profil: {},
	profilApi: apiErrorInitialState,
	selectedProfil: {},
	socials: [],
	email_exists: false,
	isLoggedIn: false,
	blockedList: [],
	check_account: {},
	check_accountApi: apiErrorInitialState,
	addresses: [],
	selectedAddress: {},
	verifiedAccount: false,
	verificationCodeSent: false,
	passwordChanged: false,
	passwordResetCodeSent: false,
	passwordResetValidCode: false,
	emailChanged: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState: initialState,
	reducers: {
		setEmailExistsStatus: (state, action: PayloadAction<boolean>) => {
			state.email_exists = action.payload;
			// return state;
		},
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
			// return state;
		},
		setProfilGETLoading: (state) => {
			state.profilApi.isFetchInProgress = true;
			state.profilApi.fetchPromiseStatus = 'PENDING';
			state.profilApi.error = apiErrorInitialState.error;
			// return state;
		},
		setProfil: (state, action: PayloadAction<UserClass>) => {
			state.profil = action.payload;
			state.profilApi.fetchPromiseStatus = 'RESOLVED';
			state.profilApi.isFetchInProgress = false;
			// return state;
		},
		setSelectedProfil: (state, action: PayloadAction<UserClass>) => {
			state.selectedProfil = action.payload;
			// return state;
		},
		setSocials: (state, action: PayloadAction<AccountGetSocialsType>) => {
			state.socials = action.payload;
			// return state;
		},
		setBlockedList: (state, action: PayloadAction<AccountBlockType>) => {
			state.blockedList = action.payload;
			// return state;
		},
		setCheckAccountGETLoading: (state) => {
			state.check_accountApi.isFetchInProgress = true;
			state.check_accountApi.fetchPromiseStatus = 'PENDING';
			state.check_accountApi.error = apiErrorInitialState.error;
			// return state;
		},
		setCheckAccount: (state, action: PayloadAction<AccountCheckAccountType>) => {
			state.check_account = action.payload;
			// state.email = action.payload.email;
			// return state;
		},
		setAddresses: (state, action: PayloadAction<Array<AccountAddress>>) => {
			state.addresses = action.payload;
			// return state;
		},
		appendPostAddress: (state, action: PayloadAction<AccountAddress>) => {
			state.addresses.push(action.payload);
			// return state;
		},
		setPatchAddress: (state, action: PayloadAction<AccountAddress>) => {
			const addressindex = state.addresses.findIndex((item) => item.pk === action.payload.pk);
			if (addressindex >= 0) {
				state.addresses[addressindex] = action.payload;
			}
			// return state;
		},
		setSelectedAddress: (state, action: PayloadAction<AccountAddress>) => {
			state.selectedAddress = action.payload;
			// return state;
		},
		setVerifiedAccount: (state, action: PayloadAction<boolean>) => {
			state.verifiedAccount = action.payload;
			state.check_account.verified = action.payload;
			// return state;
		},
		setResendVerification: (state, action: PayloadAction<boolean>) => {
			state.verificationCodeSent = action.payload;
			// return state;
		},
		setPasswordChanged: (state, action: PayloadAction<boolean>) => {
			state.passwordChanged = action.payload;
			// return state;
		},
		setPasswordResetSent: (state, action: PayloadAction<boolean>) => {
			state.passwordResetCodeSent = action.payload;
			// return state;
		},
		setPasswordResetValidCode: (state, action: PayloadAction<boolean>) => {
			state.passwordResetValidCode = action.payload;
			// return state;
		},
		setEmailChanged: (state, action: PayloadAction<{ new_email: string; changed: boolean }>) => {
			state.emailChanged = action.payload.changed;
			state.verifiedAccount = false;
			state.check_account.email = action.payload.new_email;
			state.check_account.verified = false;
			state.check_account.has_password = true;
			// return state;
		},
		setFbEmailSet: (state, action: PayloadAction<{email: string}>) => {
			state.verifiedAccount = false;
			state.check_account.email = action.payload.email;
			state.check_account.verified = false;
		},
		setWSUserAvatar: (state, action: PayloadAction<string>) => {
			// payload has user_avatar
			state.profil.avatar = action.payload;
			// return state;
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
				// return state;
			})
			.addCase(check_accountGETApiErrorAction, (state, action) => {
				state.check_accountApi.error = action.payload.error;
				state.check_accountApi.fetchPromiseStatus = 'REJECTED';
				state.check_accountApi.isFetchInProgress = false;
				// return state;
			});
	},
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload.account };
	// 	},
	// },
});

export const {
	setEmailExistsStatus,
	setIsLoggedIn,
	setProfilGETLoading,
	setProfil,
	setSelectedProfil,
	setSocials,
	setBlockedList,
	setCheckAccountGETLoading,
	setCheckAccount,
	setAddresses,
	appendPostAddress,
	setPatchAddress,
	setSelectedAddress,
	setVerifiedAccount,
	setResendVerification,
	setPasswordChanged,
	setPasswordResetSent,
	setPasswordResetValidCode,
	setEmailChanged,
	setFbEmailSet,
	setWSUserAvatar,
	initAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
