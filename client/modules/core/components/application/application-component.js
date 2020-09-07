/*
 * ApplicationRoot
 *
 * Injects the application-wide styles into the component context.
 */
import React from "react";
import PropTypes from "prop-types";

import AppTitle from "../app-title";
import AppMenu from "../app-menu";
import AppRoutes from "./app-routes";
import Initialisation from "./initialisation";

import SystemNotification from "../system-notification";

// material-ui
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(({breakpoints}) => {
  return {
    applicationRoot: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    content: {
      display: "flex",
      flex: 1,
      overflow: "hidden",
      [breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
        justifyContent: "space-between",
      },
    },
    page: {
      overflow: "auto",
    },
  };
});

function Application({
  accessToken, appInitialiseProgress, appInitialised,
  authenticationError, userInitialised,
}) {
  const classes = useStyles();
  // Decide the content to render based on the authentication status.
  let page;
  if (accessToken && !userInitialised && !appInitialised) {
    page = (
      <Initialisation
        appInitialiseProgress={appInitialiseProgress} authenticationError={authenticationError}
      />
    );
  } else {
    // There is no access token (nobody is signed in => 'public' mode), or there is a token and the app
    // has processed it and is initialised.
    page = <AppRoutes />;
  }

  return (
    <div className={classes.applicationRoot}>
      <AppTitle />
      <div className={classes.content}>
        <AppMenu />
        <div className={classes.page}>
          {page}
        </div>
      </div>
      <SystemNotification />
    </div>
  );
}

Application.propTypes = {
  accessToken: PropTypes.string,
  appInitialiseProgress: PropTypes.string,
  appInitialised: PropTypes.bool.isRequired,
  authenticationError: PropTypes.string,
  userInitialised: PropTypes.bool.isRequired,
};

export default Application;
