/**
 * An example of a set of authenticated sub route: users, which has two possible paths
 * settings and profile
 */
import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";

import Profile from "./profile";

const User = ({match, settings}) => {
  return (
    <Switch>
      <Route path={`${match.url}/profile`} component={Profile} />
    </Switch>
  );
};

User.propTypes = {
  match: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default User;
