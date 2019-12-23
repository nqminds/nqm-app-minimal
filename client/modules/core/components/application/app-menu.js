import React from "react";

import {NavLink} from "react-router-dom";

// material-ui
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(({breakpoints, palette, spacing}) => ({
  appMenu: {
    background: palette.background.paper,
    padding: spacing(2),
    minWidth: 150,
    [breakpoints.down("sm")]: {
      minWidth: "auto",
    },
    [breakpoints.down("xs")]: {
      height: 50,
      display: "flex",
      justifyContent: "center",
      padding: spacing(1),
    },
  },
  menuActive: {
    color: palette.primary.light,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: spacing(2),
    [breakpoints.down("xs")]: {
      marginBottom: 0,
      flex: 1,
      justifyContent: "center",
    },
  },
  menuLabel: {
    marginLeft: spacing(2),
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
import HomeIcon from "@material-ui/icons/Home";
import StateIcon from "@material-ui/icons/Code";
import CloudIcon from "@material-ui/icons/Cloud";
import {Typography} from "@material-ui/core";

const routes = [
  {url: "", name: "Home", Icon: HomeIcon, associatedUrls: [""]},
  {url: "state-demo", name: "State Demo", Icon: StateIcon, associatedUrls: ["state-demo"]},
  {url: "data-demo", name: "Data Demo", Icon: CloudIcon, associatedUrls: ["data-demo"]},
];

function AppMenu() {
  const classes = useStyles();
  return (
    <div className={classes.appMenu}>
      {routes.map(({associatedUrls, Icon, name, url}) => (
        <NavLink
          key={url}
          activeClassName={classes.menuActive}
          className={classes.menuItem}
          exact
          to={`/${url}`}
          isActive={(match, location) => [url, ...associatedUrls].includes(location.pathname.substring(1))}
        >
          <Icon />
          <Typography className={classes.menuLabel} variant="subtitle1">{name}</Typography>
        </NavLink>
      ))}
    </div>
  );
}

export default AppMenu;
