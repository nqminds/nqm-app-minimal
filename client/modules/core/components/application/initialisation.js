import React from "react";
import PropTypes from "prop-types";

// material-ui
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(({palette}) => ({
  applicationRoot: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  initialisationProgress: {
    padding: 10,
    margin: "10px auto 10px auto",
    width: "70vw",
    backgroundColor: palette.background.appBar,
    color: palette.getContrastText(palette.background.appBar),
    textAlign: "center",
  },
}));

function Initialisation({appInitialiseProgress, authenticationError}) {
  const classes = useStyles();
  if (authenticationError) {
    return <div className={classes.initialisationProgress}>{authenticationError}</div>;
  } else {
    return <div className={classes.initialisationProgress}>initialising {appInitialiseProgress}</div>;
  }
}


Initialisation.propTypes = {
  appInitialiseProgress: PropTypes.string,
  authenticationError: PropTypes.string,
};

export default Initialisation;
