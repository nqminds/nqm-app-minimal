/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import "./bootstrap";
// Needed for redux-saga es6 generator support
import "@babel/polyfill";
// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import App from "containers/App";
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import "!file-loader?name=[name].[ext]!./images/favicon.ico";
import "file-loader?name=.htaccess!./.htaccess";
import configureStore from "./redux/configureStore";
import rootSaga from "./sagas";
/* eslint-enable import/no-unresolved, import/extensions */

const history = createBrowserHistory();

// Create redux store with history
const store = configureStore(history);

// Start saga
store.runSaga(rootSaga, store.dispatch);

const MOUNT_NODE = document.getElementById("app");

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(["containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
