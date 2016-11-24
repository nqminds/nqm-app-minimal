import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import framework from "nqm-app-framework";
import {syncHistoryWithStore} from 'react-router-redux';

// Application pages
import Home from "../core/components/home";
import Modal from "../core/containers/modal";

// Application sidebar
import AppSideBar from "./components/app-side-bar";

// Get layout components from the framework
const Layout = framework.ui.Layout;
const ModalLayout = framework.ui.ModalLayout;

export default function(injectDeps, context, actions) {   // eslint-disable-line no-unused-vars
  const {store} = context;
  const history = syncHistoryWithStore(browserHistory, store);

  const LayoutCtx = injectDeps(Layout);
  const ModalLayoutCtx = injectDeps(ModalLayout);

  const RouterCtx = () => (
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router>
  );

  const BoundRoutes = injectDeps(RouterCtx);

  ReactDOM.render(
    <BoundRoutes />,
    document.body
  );
}


// import React from "react";
// import {mount} from "react-mounter";
// import framework from "nqm-app-framework";

// // Application pages
// import Home from "../core/components/home";
// import Modal from "../core/containers/modal";

// // Application sidebar
// import AppSideBar from "./components/app-side-bar";

// // Get layout components from the framework
// const Layout = framework.ui.Layout;
// const ModalLayout = framework.ui.ModalLayout;

// export default function(injectDeps, context, actions) {   // eslint-disable-line no-unused-vars
//   const {FlowRouter} = context;
//   const LayoutCtx = injectDeps(Layout);
//   const ModalLayoutCtx = injectDeps(ModalLayout);

//   FlowRouter.route("/", {
//     name: "root",
//     action() {
//       mount(LayoutCtx, {
//         title: "home",
//         content: (contentStyle) => (<Home title="HOME PAGE" style={contentStyle} />),
//         sideBarContent: AppSideBar,
//       });
//     },
//   });

//   FlowRouter.route("/modal", {
//     name: "modal",
//     action() {
//       mount(ModalLayoutCtx, {
//         content: () => (<Modal title="about" />),
//       });
//     },
//   });
// }
