import React from "react";
import PropTypes from "prop-types";
import careshareStyleSheet from "./stylesheet";

import ServerPendingModal from "../containers/server-pending-modal";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createPalette from "material-ui/styles/palette";
import createMuiTheme from "material-ui/styles/theme";
import * as Colors from "material-ui/styles/colors";
import Button from "material-ui/Button";
import {createStyleSheet} from "jss-theme-reactor";

export let appClasses;

const CareshareFrame = ({
  appInitialiseProgress,
  appInitialised,
  authenticationError,
  authenticated,
  darkTheme,
  children,
  signIn,
}) => {
  const palette = createPalette({
    primary: Colors.blue,
    accent: Colors.pink,
    type: darkTheme ? "dark" : "light",
  });

  palette.background.appBar = Colors.lightBlue[500];

  const overrides = {
    MuiFormControl: {
      root: {
        margin: "10px 0",
      },
    },
  };

  const {styleManager, theme} = MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({overrides, palette}),
  });

  // Set the document background to the palette colour.
  document.body.style.background = palette.background.default;
  document.body.style.color = palette.text.primary;

  // Global app styles.
  const appStyleSheet = createStyleSheet("nqm-careshare-app", careshareStyleSheet);
  appClasses = styleManager.render(appStyleSheet);

  const styleSheet = createStyleSheet("nqm-careshare-frame", ({palette}) => {
    return {
      container: {
        backgroundImage: "url(/images/careshare-transparent.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100px",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        padding: "120px 60px 60px 60px",
        height: "100%",
      },
      contentContainer: {
        height: "100%",
      },
      initialisationProgress: {
        padding: 10,
        margin: "10px auto 10px auto",
        width: "70vw",
        backgroundColor: palette.accent[400],
        color: palette.getContrastText(palette.accent[400]),
        textAlign: "center",
      },
    };
  });
  const classes = styleManager.render(styleSheet);

  const handleSignIn = () => {
    signIn();
  };

  let content;
  if (!authenticated || !appInitialised) {
    let inner;
    if (!authenticated) {
      inner = (<div>{authenticationError}<Button onClick={handleSignIn}>SIGN IN</Button></div>);
    } else if (!appInitialised) {
      inner = `initialising ${appInitialiseProgress}`;
    }
    content = (
      <div className={classes.container}>
        <div className={classes.initialisationProgress}>
          {inner}
        </div>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <div className={classes.contentContainer}>
        {content}
        <ServerPendingModal />
      </div>
    </MuiThemeProvider>
  );
};

CareshareFrame.propTypes = {
  appInitialiseProgress: PropTypes.string,
  appInitialised: PropTypes.bool,
  authenticated: PropTypes.bool,
  authenticationError: PropTypes.string,
  children: PropTypes.any,
  darkTheme: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
};

export default CareshareFrame;
