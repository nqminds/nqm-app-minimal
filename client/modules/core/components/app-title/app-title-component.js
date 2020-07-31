import React from "react";
import PropTypes from "prop-types";

// material-ui
import ThemeIcon from "@material-ui/icons/Palette";
import AppsIcon from "@material-ui/icons/Dashboard";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import SignInIcon from "@material-ui/icons/AccountCircle";
import {IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(({palette, spacing}) => ({
  appTitle: {
    alignItems: "center",
    background: palette.background.appBar,
    display: "flex",
    justifyContent: "space-between",
    height: 50,
    padding: spacing(1),
    width: "100%",
  },
  titleText: {
    marginLeft: spacing(1),
  },
}));

function AppTitle({appTitle, goToDashboard, signIn, signOut, toggleTheme, user, history}) {
  const classes = useStyles();

  function signUserOut() {
    history.push("/");
    signOut();
  }

  return (
    <div className={classes.appTitle}>
      <Typography className={classes.titleText} variant="h6" component="h1">{appTitle}</Typography>
      <div>
        <IconButton onClick={toggleTheme}><ThemeIcon /></IconButton>
        <IconButton onClick={goToDashboard}><AppsIcon /></IconButton>
        <IconButton onClick={user ? signUserOut : signIn}>{user ? <SignOutIcon /> : <SignInIcon />}</IconButton>
      </div>
    </div>
  );
}

AppTitle.propTypes = {
  appTitle: PropTypes.string.isRequired,
  goToDashboard: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default withRouter(AppTitle);
