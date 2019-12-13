import {compose, merge, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import {createMuiTheme} from "@material-ui/core/styles";

import deepPurple from "@material-ui/core/colors/deepPurple";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightBlue from "@material-ui/core/colors/lightBlue";

import {emphasize} from "@material-ui/core/styles/colorManipulator";
import {withRouter} from "react-router-dom";
import ThemedApplication from "./themed-application-component";

export const depsMapper = ({store}) => {
  return {
    store,
  };
};

export const reduxMapper = (state) => {
  return {
    darkTheme: state.core.darkTheme,
  };
};

export const themeMapper = ({darkTheme}, onData) => {
  const colours = { // Extra theme colours may be added here
    public: {
      primary: deepPurple,
      secondary: blueGrey,
      text: lightBlue,
    },
  };

  const colour = colours.public; // Choose colour scheme here based off e.g. profile initialised in boot

  const palette = {
    background: {},
    primary: colour.primary,
    secondary: colour.secondary,
    text: {},
    type: darkTheme ? "dark" : "light",
  };

  const overrides = {
  };

  const theme = createMuiTheme({...overrides, palette});

  const themedPalette = theme.palette;
  themedPalette.background.appBar = darkTheme ? colour.primary[800] : colour.primary[600];
  themedPalette.background.default = emphasize(themedPalette.background.paper, darkTheme ? 0.07 : 0.025);
  themedPalette.text.hint = darkTheme ? colour.text[50] : colour.text[100];
  themedPalette.text.icon = darkTheme ? colour.text[300] : colour.text[600];
  themedPalette.text.primary = darkTheme ? colour.text[100] : colour.text[800];
  themedPalette.text.secondary = darkTheme ? colour.text[300] : colour.text[300];

  onData(null, {theme});
};

const Container = merge(
  compose(themeMapper, {propsToWatch: ["darkTheme"]}),
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(ThemedApplication);

export default withRouter(Container);
