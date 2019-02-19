/**
 * Create the store with dynamic reducers
 */

import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createReducer from "./createReducer";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" && typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
      compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(history),
    {},
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;

  // Make reducers hot reloadable
  if (module.hot) {
    module.hot.accept("./createReducer", () => {
      store.replaceReducer(createReducer(history));
    });
  }

  return store;
}
