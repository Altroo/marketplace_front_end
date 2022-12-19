import createSagaMiddleware, { Task } from 'redux-saga';
import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
// import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
import { rootSaga } from './sagas';
import _initReducer from './slices/_init/_initSlice';
import shopReducer from './slices/shop/shopSlice';
import offerReducer from './slices/offer/offerSlice';
import placesReducer from './slices/places/placesSlice';
import accountReducer from './slices/account/accountSlice';
import versionReducer from './slices/version/versionSlice';
import subscriptionReducer from './slices/subscription/subscriptionSlice';
import notificationReducer from './slices/notification/notificationSlice';
import cartReducer from './slices/cart/cartSlice';

const SagaMiddleware = createSagaMiddleware({});

const combinedReducers = combineReducers({
	_init: _initReducer,
	shop: shopReducer,
	offer: offerReducer,
	places: placesReducer,
	account: accountReducer,
	subscription: subscriptionReducer,
	notification: notificationReducer,
	cart: cartReducer,
	version: versionReducer,
});

export interface SagaStore extends Store {
	sagaTask?: Task;
}

const reducers: typeof combinedReducers = (state, action) => {
   return combinedReducers(state, action);
};

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
