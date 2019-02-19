/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ThemeProvider, withStyles} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

import HomePage from "containers/HomePage/";
import NotFoundPage from "containers/NotFoundPage/";
import createTheme from "../../themes";
import AuthenticatedRoute from "../../components/authenticated-route";
import CoreActions from "redux/core";
import Structure from "./structure";
import {Profile} from "../Profile";

const styles = () => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialState();
  }

  render() {
    const {
      accessToken,
      fetchingInitialState,
      classes,
      isDark,
      userInitialised,
      appInitialised,
      authenticationError,
    } = this.props;

    let content;

    if (fetchingInitialState) {
      content = (
        <div className={classes.centered}>
          <CircularProgress />
        </div>
      );
    } else if (accessToken && !userInitialised && !appInitialised) {
      // We have an accessToken, but the application is not initialised yet.
      let inner;
      if (authenticationError) {
        // There has been an error during authentication.
        inner = authenticationError;
      } else {
        // No error => must be in the process of initialising, so display progress.
        inner = <CircularProgress />;
      }
      // Show the progress/error.
      content = <div className={classes.centered}>{inner}</div>;
    } else {
      //
      // There is no access token (nobody is signed in => 'public' mode), or there is a token and the app
      // has processed it and is initialised.
      //
      // Define the top-level routes.
      // Add routes here for your application, the route /user is an example of sub routes
      content = (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthenticatedRoute
            path="/profile"
            render={(route) => (<Profile {...route} />)}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
      );
    }

    return (
      <ThemeProvider theme={createTheme(isDark)}>
        <CssBaseline />
        <Structure>
          {content}
        </Structure>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  accessToken: PropTypes.string,
  appInitialised: PropTypes.bool.isRequired,
  authenticationError: PropTypes.string,
  classes: PropTypes.object.isRequired,
  fetchInitialState: PropTypes.func.isRequired,
  fetchingInitialState: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
  userInitialised: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  accessToken: state.core.accessToken,
  appInitialised: state.core.appInitialised,
  authenticationError: state.core.authenticationError,
  fetchingInitialState: state.core.fetchingInitialState,
  isDark: state.core.darkTheme,
  userInitialised: state.core.userInitialised,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialState: () => dispatch(CoreActions.fetchInitialState()),
});

const AppWithStyles = withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(AppWithStyles);
