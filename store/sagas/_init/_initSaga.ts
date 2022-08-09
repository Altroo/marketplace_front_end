import { put, call, fork, select } from 'typed-redux-saga/macro';
import * as Types from '../../actions';
import {
	InitStateInterface,
	InitStateToken,
	InitStateUniqueID,
	// TokenChoices
} from '../../../types/_init/_initTypes';
// import { emptyInitStateUniqueID, setInitState } from '../slices/_initSlice';
import { setInitState } from '../../slices/_init/_initSlice';
import { loadAppToken } from '../../../utils/helpers';
import { getInitStateToken, getInitStateUniqueID, getTokenType } from '../../selectors';
import { versionSaga } from '../version/versionSaga';
import { initAccount, setIsLoggedIn } from '../../slices/account/accountSlice';
import { initShop } from '../../slices/shop/shopSlice';
import { initOffer } from '../../slices/offer/offerSlice';
import { initPlaces } from '../../slices/places/placesSlice';
import { initVersion } from '../../slices/version/versionSlice';
import { initCart } from '../../slices/cart/cartSlice';
import { initChat } from '../../slices/chat/chatSlice';

// or use fork instead
// fork(initAppSaga, Types.INIT_APP)
// export function* monitorToken(selector: any, previousValue: TokenChoices, takePattern = "*") {
//     while (true) {
//         const nextValue = yield* select(selector);
//         if (nextValue !== previousValue) {
//             return nextValue;
//         }
//         yield* take(takePattern); // wait until action is dispatched
//     }
// }

/*
	Steps :
		step 1 : change initAppSaga from fork to takeLatest.
		step 2 : merge new logic codes with initAppSaga
			2.1 :
 */
/** TODO 5 : create saga generics that sets the tokens states **/
export function* initAppSaga() {
	// init version first.
	yield* call(() => versionSaga());
	const appToken: InitStateInterface<InitStateToken, InitStateUniqueID> = yield* call(loadAppToken);
	// const appToken: InitStateInterface<InitStateToken, InitStateUniqueID> = {
	// 	tokenType: 'TOKEN',
	// 	initStateToken: {
	// 		access_token:
	// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyODM0MjE4LCJpYXQiOjE2NTc2NTAyMTgsImp0aSI6ImEyZGFkMGJkNGQxNjRjODU5YzE2ZWI4ODZkMDkyNGY2IiwidXNlcl9pZCI6OX0.EA86MrJtfOaIuK0I6_ud6qN38ut90E87zGDX2yvH7KQ',
	// 		refresh_token:
	// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4OTE4NjIxOCwiaWF0IjoxNjU3NjUwMjE4LCJqdGkiOiI0ZThjMDNkYTVmNDU0NjJjYjllMGYxNGM3OGQ4Yzk4NyIsInVzZXJfaWQiOjl9.hyU0-uXvBoiMeQikB_gjIk2fgFcC2P4F5Fa00wi8t0g',
	// 		user: {
	// 			pk: 9,
	// 			email: 'test1@gmail.com',
	// 			first_name: 'Al',
	// 			last_name: 'Yooy',
	// 		},
	// 		access_token_expiration: '2022-09-10T18:23:38.274147Z',
	// 		refresh_token_expiration: '2023-07-12T18:23:38.274154Z',
	// 	},
	// 	initStateUniqueID: emptyInitStateUniqueID,
	// };
	// ///* TESTING Set localstorage -- localStorage is set on login */
	// yield* call(() => localStorage.setItem('@type', appToken.tokenType!));
	// yield* call(() => localStorage.setItem('@initStateToken', JSON.stringify(appToken.initStateToken)));
	// yield* call(() => localStorage.setItem('@initStateUniqueID', JSON.stringify(appToken.initStateUniqueID)));
	yield* put(setInitState(appToken));
	if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null){
		// set is logged in to true
		yield* put(setIsLoggedIn(true));
	}
	console.log('initAppSaga Called');
}

// User click Logout
export function* initEmptyStatesSaga(){
	yield* put(initShop());
	yield* put(initOffer());
	yield* put(initPlaces());
	yield* put(initVersion());
	yield* put(initAccount());
	yield* put(initCart());
	yield* put(initChat());
	// yield* put(initOrder());
	// yield* put(initRating());
}

export function* ctxAuthSaga() {
	return {
		tokenType: yield* select(getTokenType),
		initStateToken: yield* select(getInitStateToken),
		initStateUniqueID: yield* select(getInitStateUniqueID),
	};
}

export function* watchInit() {
	// using fork to let initAppSaga sets the token state
	// before proceeding to the rest of the watchers that needs the token state
	// yield* takeLatest(Types.INIT_APP, initAppSaga)
	// yield* fork(initAppSaga, Types.INIT_APP)
}
