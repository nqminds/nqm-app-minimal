import React from "react";
import PropTypes from "prop-types";

// material-ui
import {
  Palette as ThemeIcon, Dashboard as AppsIcon, ExitToApp as SignOutIcon, AccountCircle as SignInIcon,
} from "@material-ui/icons";
import {IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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

function AppTitle({appTitle, goToDashboard, signIn, signOut, toggleTheme, user}) {
  const classes = useStyles();
  return (
    <div className={classes.appTitle}>
      <Typography className={classes.titleText} variant="h6" component="h1">{appTitle}</Typography>
      <div>
        <IconButton onClick={toggleTheme}><ThemeIcon /></IconButton>
        <IconButton onClick={goToDashboard}><AppsIcon /></IconButton>
        <IconButton onClick={user ? signOut : signIn}>{user ? <SignOutIcon /> : <SignInIcon />}</IconButton>
      </div>
    </div>
  );
}

AppTitle.propTypes = {
  appTitle: PropTypes.string.isRequired,
  goToDashboard: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default AppTitle;
