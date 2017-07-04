import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import framework from "nqm-app-framework";
import {syncHistoryWithStore} from "react-router-redux";

// Application pages
import Home from "../core/components/home";
import Modal from "../core/components/modal";

// Application sidebar
import AppSideBar from "./components/app-side-bar";

// Get layout components from the framework
const Layout = framework.ui.Layout;
const ModalLayout = framework.ui.ModalLayout;

const title = function(title) {
  return () => <span>{title}</span>;
};

export default function(injectDeps, context) {
  const {store} = context;
  const history = syncHistoryWithStore(browserHistory, store);

  const RouterCtx = () => (
    <Router history={history}>
      <Route path="/" title="nqm-app-minimal" component={Layout}>
        <IndexRoute components={{content: Home, sideBarContent: AppSideBar, title: title("lorum ipsum")}} />
      </Route>
      <Route path="/modal" title="modal" component={ModalLayout}>
        <IndexRoute components={{content: Modal}} />
      </Route>
    </Router>
  );

  ReactDOM.render(
    React.createElement(injectDeps(RouterCtx)),
    document.getElementById("render-root")
  );
}
