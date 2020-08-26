import React from "react";

import {NavLink} from "react-router-dom";

// material-ui
import {Typography} from "@material-ui/core";
import {Code, Cloud, Home} from "@material-ui/icons";
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

const routes = [
  {url: "", name: "Home", Icon: Home, associatedUrls: [""]},
  {url: "state-demo", name: "State Demo", Icon: Code, associatedUrls: ["state-demo"]},
  {url: "data-demo", name: "Data Demo", Icon: Cloud, associatedUrls: ["data-demo"]},
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
