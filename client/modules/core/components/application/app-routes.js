import React from "react";

import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "../authenticated-route";

import Home from "../home";
import StateDemo from "../state-demo";
import DataDemo from "../data-demo";

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/state-demo" component={StateDemo} />
      <AuthenticatedRoute exact path="/data-demo" component={DataDemo} />
    </Switch>
  );
}

export default AppRoutes;
