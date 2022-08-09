import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { InitStateInterface, InitStateToken, InitStateUniqueID } from "../types/_init/_initTypes";
// import { initAppAction } from "../store/actions/_init/_initActions";
import { emptyInitStateToken, emptyInitStateUniqueID } from "../store/slices/_init/_initSlice";
// import { loadNewAddedShopAction, shopGetRootAction } from "../store/actions/shop/shopActions";
import { shopGetRootAction } from "../store/actions/shop/shopActions";
import { accountGetCheckAccountAction, accountGetProfilAction } from "../store/actions/account/accountActions";
import { cartGetAllAction } from "../store/actions/cart/cartActions";
import useSWR from "swr";

/*
    Steps :
        step 1 : Get token values from params.
        step 2 : Set reducer tokens via actions that requires token payload.
        step 3 : Dispatch actions local side only.
 */

/*
		Next Step (dynamic) [Case middleware redirect] :
			step 1 : Call next backend API to set cookie (Runs on final action)
				step 1.1 : multiple check in the api handler to set each cookie separatly.
			step 2 :
 */

const InitContext = createContext<InitStateInterface<InitStateToken, InitStateUniqueID>>({
	tokenType: null,
	initStateToken: emptyInitStateToken,
	initStateUniqueID: emptyInitStateUniqueID
});

const fetcher = async (url: string) =>
	fetch(url, {
		method: 'GET',
	}).then((res: Response) => res.text());

/*** Note Runs Third **/
export const InitContextProvider = (props: PropsWithChildren<Record<string, unknown>>) => {
	const dispatch = useAppDispatch();
	const userHasShop = useAppSelector(state => state.account.check_account.has_shop);
	const type = useAppSelector((state) => state._init.tokenType);
	const token = useAppSelector((state) => state._init.initStateToken);
	const uniqueID = useAppSelector((state) => state._init.initStateUniqueID);
	const { data, error } = useSWR('/api/cookies', fetcher);

	useEffect(() => {
		/** TODO 4 : Dispatch action which calls next backend server to set cookie **/
		/*setCookie("cookie_from_context_two", "cookie_from_context_value_two", {
			httpOnly: false, sameSite: "lax", secure: true
		});*/
		console.log('FROM INIT CONTEXT');
		console.log(data);
		console.log(error);

		if (data) {
			const dataObj = JSON.parse(data);
			console.log(dataObj.cookies);
		}
		if (error) {
			console.log(error);
		}

		// Initialise states
		// dispatch(initAppAction());
		// dispatch(placesGetCountriesAction());
		// case user didn't complete temporary shop creation
		// or refreshed the page in the middle of the process
		// dispatch(loadNewAddedShopAction());
		if (type === "TOKEN" && token !== null) {
			dispatch(accountGetProfilAction());
			dispatch(accountGetCheckAccountAction());
			dispatch(cartGetAllAction());
			if (userHasShop) {
				dispatch(shopGetRootAction());
			}
		} else if (type === "UNIQUE_ID" && uniqueID !== null) {
			// try to get unique ID shop if exists.
			dispatch(shopGetRootAction());
		}
	}, [dispatch, type, token, uniqueID, userHasShop, data, error]);

	const contextValue: InitStateInterface<InitStateToken, InitStateUniqueID> = {
		tokenType: type,
		initStateToken: token,
		initStateUniqueID: uniqueID
	};

	return <InitContext.Provider value={contextValue}>{props.children}</InitContext.Provider>;
};
