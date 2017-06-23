import React from "react";
import PropTypes from "prop-types";
import applicationStyleSheet from "./application-style";

import ServerPendingModal from "../containers/server-pending-modal";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createPalette from "material-ui/styles/palette";
import createMuiTheme from "material-ui/styles/theme";
import * as Colors from "material-ui/styles/colors";
import {createStyleSheet} from "material-ui/styles";

export let appClasses;

class ApplicationFrame extends React.Component {
  componentDidMount() {
    const {accessToken, authenticating, setAuthToken, signIn} = this.props;
    if (!authenticating) {
      if (accessToken) {
        setAuthToken(accessToken);
      } else {
        signIn();
      }
    }
  }
  render() {
    const {
      accessToken,
      appInitialiseProgress,
      appInitialised,
      authenticationError,
      darkTheme,
      children,
    } = this.props;

    const palette = createPalette({
      primary: Colors.blue,
      accent: Colors.amber,
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
    const appStyleSheet = createStyleSheet("nqm-app", applicationStyleSheet);
    appClasses = styleManager.render(appStyleSheet);

    const styleSheet = createStyleSheet("nqm-application-frame", ({palette}) => {
      return {
        container: {
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

    let content;
    if (!accessToken || !appInitialised) {
      let inner;
      if (!accessToken) {
        inner = (
          <div>
            <div>{authenticationError}</div>
            <div>loading</div>
          </div>
        );
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
  }
}

ApplicationFrame.propTypes = {
  accessToken: React.PropTypes.string,
  appInitialiseProgress: PropTypes.string,
  appInitialised: PropTypes.bool,
  authenticating: React.PropTypes.bool,
  authenticationError: PropTypes.string,
  children: PropTypes.any,
  darkTheme: PropTypes.bool,
  setAuthToken: React.PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default ApplicationFrame;
