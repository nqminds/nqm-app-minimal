import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route} from "react-router-dom";

// Application pages
import ApplicationFrame from "./containers/application-frame";
import Home from "./components/home";

export default function(injectDeps, context, actions) {   // eslint-disable-line no-unused-vars
  const Routes = () => (
    <ApplicationFrame>
      <BrowserRouter>
        <div id="router-root">
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    </ApplicationFrame>
);

  const BoundRoutes = injectDeps(Routes);

  ReactDOM.render(
    <BoundRoutes />,
    document.getElementById("render-root")
  );
}
