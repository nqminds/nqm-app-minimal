import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ThemeIcon from "@material-ui/icons/Highlight";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/styles";
import CoreActions from "../../redux/core";
import Menu from "./menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
  },
  grow: {
    flexGrow: 1,
  },
}));

function Structure({children, toggleTheme}) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6" color="inherit" noWrap
            className={classes.grow}
          >
            NQM Minimal App
          </Typography>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
          >
            <ThemeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Menu />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Menu />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

Structure.propTypes = {
  children: PropTypes.object,
  toggleTheme: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: () => dispatch(CoreActions.toggleTheme()),
});

export default connect(null, mapDispatchToProps)(Structure);
