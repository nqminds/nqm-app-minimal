import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LoginIcon from "@material-ui/icons/ExitToApp";
import RegisterIcon from "@material-ui/icons/PersonAdd";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ProfileIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import {makeStyles} from "@material-ui/styles";
import {NavLink} from "react-router-dom";
import {signIn, signUp} from "../../services/helper";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  cleanLink: {
    textDecoration: "none",
    color: theme.palette.action.active,
  },
}));

function Menu({userInitialised}) {
  const classes = useStyles();
  let menu;

  if (userInitialised) {
    menu = (
      <React.Fragment>
        <List>
          <NavLink to="/" className={classes.cleanLink}>
            <ListItem button >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
          <NavLink to="/profile" className={classes.cleanLink}>
            <ListItem button >
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => window.location = "/sign-out"} >
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </React.Fragment>
    );
  } else {
    menu = (
      <React.Fragment>
        <List>
          <NavLink to="/" className={classes.cleanLink}>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={signIn} >
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={signUp} >
            <ListItemIcon><RegisterIcon /></ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {menu}
    </div>
  );
}

Menu.propTypes = {
  userInitialised: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userInitialised: state.core.userInitialised,
});

export default connect(mapStateToProps)(Menu);
