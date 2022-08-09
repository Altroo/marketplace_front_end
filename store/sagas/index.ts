import { all, spawn } from 'typed-redux-saga/macro';
import { watchInit } from './_init/_initSaga';
import { watchShop } from './shop/shopSaga';
import { watchOffer } from './offer/offerSaga';
import { watchPlaces } from './places/placesSaga';
import { watchVersion } from './version/versionSaga';
import { watchAccount } from './account/accountSaga';
import { watchChat } from './chat/chatSaga';
import { watchWS } from './ws/wsSaga';
import { watchCart } from './cart/cartSaga';
import { watchOrder } from './order/orderSaga';

// spawn : whenever a watcher get's crashed somehow,
// we use spawn to respawn it back.
export function* rootSaga() {
	yield* all([
		// watchAccount(),
		yield* spawn(watchInit),
		yield* spawn(watchShop),
		yield* spawn(watchOffer),
		yield* spawn(watchPlaces),
		yield* spawn(watchVersion),
		yield* spawn(watchAccount),
		yield* spawn(watchChat),
		yield* spawn(watchCart),
		yield* spawn(watchOrder),
		// yield* spawn(watchOrder),
		// yield* spawn(watchRating),
		yield* spawn(watchWS),
	]);
}
