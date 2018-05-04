import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducer';
import appSaga from './saga';
// Initializing Sagas middleware
const sagaMiddleware = createSagaMiddleware();

// Load middleware
let middleware = [sagaMiddleware];

if (__DEV__) {
	// Dev-only middleware
	middleware = [
		...middleware,
		createLogger(), // Adding redux logs in dev console
	];
}

const store = createStore(
	appReducer,
	compose(
		applyMiddleware(...middleware)
	)
);

sagaMiddleware.run(...appSaga);

export default store;
