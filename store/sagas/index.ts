import { all, fork, spawn } from 'redux-saga/effects';
import { watchInit } from './_init/_initSaga';
import { watchShop } from './shop/shopSaga';
import { watchOffer } from './offer/offerSaga';
import { watchPlaces } from './places/placesSaga';
import { watchVersion } from './version/versionSaga';
import { watchAccount } from './account/accountSaga';
import { watchWS } from './ws/wsSaga';
import {watchSubscription} from './subscription/subscriptionSaga';
import {watchNotifications} from './notification/notificationSaga';

// spawn : whenever a watcher get's crashed somehow,
// we use spawn to respawn it back. (except it's unblocking)
// fork : for blocking calls.
export function* rootSaga() {
	// yield all([
	// 	// watchAccount(),
	// 	fork(watchInit),
	// 	fork(watchShop),
	// 	fork(watchOffer),
	// 	fork(watchPlaces),
	// 	fork(watchVersion),
	// 	fork(watchAccount),
	// 	fork(watchSubscription),
	// 	fork(watchNotifications),
	// 	// yield spawn(watchOrder),
	// 	// yield spawn(watchRating),
	// 	fork(watchWS),
	// ]);

	yield all([
		// watchAccount(),
		// @ts-ignore
		yield spawn(watchInit),
		// @ts-ignore
		yield spawn(watchShop),
		// @ts-ignore
		yield spawn(watchOffer),
		// @ts-ignore
		yield spawn(watchPlaces),
		// @ts-ignore
		yield spawn(watchVersion),
		// @ts-ignore
		yield spawn(watchAccount),
		// @ts-ignore
		yield spawn(watchSubscription),
		// @ts-ignore
		yield spawn(watchNotifications),
		// yield spawn(watchOrder),
		// yield spawn(watchRating),
		// @ts-ignore
		yield spawn(watchWS),
	]);
}
