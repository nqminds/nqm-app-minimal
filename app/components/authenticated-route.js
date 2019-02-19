/**
 * A higher order component that can be used to redirect to login for
 * users that are not authenticated
 */

import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {utils} from "@nqminds/nqm-tdx-client";
import {signIn} from "../services/helper";
import api from "../services/api";

function AuthenticatedRoute({userInitialised, ...rest}) {
  if (!userInitialised ||
    api.getTdxApi().defaultTDX.user.accountType !== utils.constants.userAccountType) {
    return signIn();
  } else {
    return <Route {...rest} />;
  }
}

AuthenticatedRoute.propTypes = {
  userInitialised: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userInitialised: state.core.userInitialised,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
