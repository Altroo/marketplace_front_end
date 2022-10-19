import createSagaMiddleware, { Task } from 'redux-saga';
import { AnyAction, combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { rootSaga } from './sagas';
import _initReducer from './slices/_init/_initSlice';
import shopReducer from './slices/shop/shopSlice';
import offerReducer from './slices/offer/offerSlice';
import placesReducer from './slices/places/placesSlice';
import accountReducer from './slices/account/accountSlice';
import chatReducer from './slices/chat/chatSlice';
import versionReducer from './slices/version/versionSlice';
import cartReducer from './slices/cart/cartSlice';
import orderReducer from './slices/order/orderSlice';
import subscriptionReducer from './slices/subscription/subscriptionSlice';

const SagaMiddleware = createSagaMiddleware({});

const combinedReducers = combineReducers({
	_init: _initReducer,
	shop: shopReducer,
	offer: offerReducer,
	places: placesReducer,
	account: accountReducer,
	chat: chatReducer,
	cart: cartReducer,
	order: orderReducer,
	subscription: subscriptionReducer,
	// places: placesReducer,
	// rating: ratingReducer,
	version: versionReducer,
	// ws: wsReducer,
});

export interface SagaStore extends Store {
	sagaTask?: Task;
}

// export const makeStore = () => {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = configureStore({
//     reducer: reducers,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//             thunk: false,
//         }).prepend(sagaMiddleware),
//     devTools: process.env.NODE_ENV !== 'production'
//     });
//     (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
//     // 4: now return the store:
//     return store;
// };

// SagaMiddleware.run(rootSaga);

/* Reducers using Hydrate */
// const reducers: typeof combinedReducers = (state, action) => {
// 	if (action.type === HYDRATE) {
// 		const nextState = {
// 			...state, // use previous state
// 			...action.payload, // apply delta from hydration
// 		};
// 		if (state?._init) nextState._init = state._init;
// 		if (state?.account) nextState.account = state.account;
// 		if (state?.cart) nextState.cart = state.cart;
// 		if (state?.chat) nextState.chat = state.chat;
// 		if (state?.offer) nextState.offer = state.offer;
// 		if (state?.order) nextState.order = state.order;
// 		if (state?.places) nextState.places = state.places;
// 		if (state?.shop) nextState.shop = state.shop;
// 		if (state?.version) nextState.version = state.version;
// 		return state;
// 	} else {
// 		console.log('USING local state');
// 		return combinedReducers(state, action);
// 	}
// };

/* Reducers without Hydrate */
const reducers: typeof combinedReducers = (state, action) => {
   return combinedReducers(state, action);
};

/* Reducers using Hydrate */
// const reducers: typeof combinedReducers = (state, {type, payload}) => {
// 	if (type === HYDRATE) {
// 		return {
// 			...state,
// 			...payload,
// 		};
// 	} else {
// 		return combinedReducers(state, {type, payload});
// 	}
// };

export const store: SagaStore = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			thunk: true,
		}).prepend(SagaMiddleware),
		// .concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

store.sagaTask = SagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducers>;

export const wrapper = createWrapper(() => store,
	{
		debug: process.env.NODE_ENV !== 'production',
	}
);
