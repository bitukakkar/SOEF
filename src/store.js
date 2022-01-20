import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import createRootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import { watchRecordsCancellable } from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchRecordsCancellable);

export default store;
