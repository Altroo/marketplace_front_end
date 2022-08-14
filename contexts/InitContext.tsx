import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import {
	AppTokensCookieType,
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID, NewShopCookieType
} from "../types/_init/_initTypes";
import {
	initAppAction,
	initAppCookieTokensAction,
	initNewShopBorderIconAction
} from "../store/actions/_init/_initActions";
import { emptyInitStateToken, emptyInitStateUniqueID } from '../store/slices/_init/_initSlice';
import { loadNewAddedShopAction, shopGetRootAction } from '../store/actions/shop/shopActions';
import { accountGetCheckAccountAction, accountGetProfilAction } from '../store/actions/account/accountActions';
import { cartGetAllAction } from '../store/actions/cart/cartActions';
import { cookiesFetcher } from '../store/services/_init/_initAPI';

const InitContext = createContext<InitStateInterface<InitStateToken, InitStateUniqueID>>({
	tokenType: null,
	initStateToken: emptyInitStateToken,
	initStateUniqueID: emptyInitStateUniqueID,
});

export const InitContextProvider = (props: PropsWithChildren<Record<string, unknown>>) => {
	const dispatch = useAppDispatch();
	const userHasShop = useAppSelector((state) => state.account.check_account.has_shop);
	const tokenType = useAppSelector((state) => state._init.tokenType);
	const token = useAppSelector((state) => state._init.initStateToken);
	const uniqueID = useAppSelector((state) => state._init.initStateUniqueID);
	const [appTokenCookiesLoaded, setAppTokenCookiesLoaded] = useState(false);
	const [newShopCookiesLoaded, setNewShopCookiesLoaded] = useState(false);

	useEffect(() => {
		// init app tokens from cookies
		if (!appTokenCookiesLoaded) {
			cookiesFetcher('/cookies').then((value: { data: { cookies: AppTokensCookieType }; status: number }) => {
				if (value.status === 200) {
					dispatch(initAppCookieTokensAction(value.data.cookies));
					setAppTokenCookiesLoaded(true);
				}
			});
		}
		// init new shop border & icon_color from cookies
		if (!newShopCookiesLoaded) {
			cookiesFetcher('/cookies').then((value: {data: {cookies: NewShopCookieType}; status: number }) => {
				if (value.status === 200) {
					dispatch(initNewShopBorderIconAction(value.data.cookies));
					setNewShopCookiesLoaded(true);
				}
			});
		}
		// Initialise states
		dispatch(initAppAction());
		// case user didn't complete temporary shop creation
		// or refreshed the page in the middle of the process
		dispatch(loadNewAddedShopAction());
		if (tokenType === 'TOKEN' && token !== null) {
			dispatch(accountGetProfilAction());
			dispatch(accountGetCheckAccountAction());
			dispatch(cartGetAllAction());
			if (userHasShop) {
				dispatch(shopGetRootAction());
			}
		} else if (tokenType === 'UNIQUE_ID' && uniqueID !== null) {
			// try to get unique ID shop if exists.
			dispatch(shopGetRootAction());
		}
	}, [dispatch, tokenType, token, uniqueID, userHasShop, appTokenCookiesLoaded, newShopCookiesLoaded]);

	const contextValue: InitStateInterface<InitStateToken, InitStateUniqueID> = {
		tokenType: tokenType,
		initStateToken: token,
		initStateUniqueID: uniqueID,
	};

	return <InitContext.Provider value={contextValue}>{props.children}</InitContext.Provider>;
};

export default InitContext;
