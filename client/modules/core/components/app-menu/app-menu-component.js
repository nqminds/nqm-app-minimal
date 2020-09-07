import React from "react";
import PropTypes from "prop-types";

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

// To add a route with permission requirements add the property permReq as
// an array to a route. Then put the schema name of the account set or sets
// as strings into that array. E.g.
// {url: "", name: "Developers Only", Icon: HomeIcon, associatedUrls: [""], permReq: ["developers"]},
// Likewise a route can be excluded from showing for users with certain pemrissions using the permExc
// property, also passed as an array
const routes = [
  {url: "", name: "Home", Icon: Home, associatedUrls: [""]},
  {url: "state-demo", name: "State Demo", Icon: Code, associatedUrls: ["state-demo"]},
  {url: "data-demo", name: "Data Demo", Icon: Cloud, associatedUrls: ["data-demo"]},
];

function AppMenu({isPermitted}) {
  const classes = useStyles();

  const userRoutes = routes.filter(({permExc = [], permReq = []}) => {
    if (!permExc.length && !permReq.length) {
      return true;
    }
    const hasRequired = isPermitted(permReq, false); // Include or exclude if any permissions match
    const excluded = isPermitted(permExc, false);
    return hasRequired && !excluded;
  });
  return (
    <div className={classes.appMenu}>
      {userRoutes.map(({associatedUrls, Icon, name, url}) => (
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

AppMenu.propTypes = {
  isPermitted: PropTypes.func.isRequired,
};

export default AppMenu;
