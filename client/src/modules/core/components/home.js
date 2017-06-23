import React from "react";

import Button from "material-ui/Button";
import {createStyleSheet, withStyles} from "material-ui/styles";
const styleSheet = createStyleSheet("nqm-home", () => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    content: {
      padding: 20,
    },
  };
});

const Home = ({classes}) => {
  const handleSignOut = () => {
    window.location = "/auth";
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>MINIMAL</div>
      <div>
        <Button color="primary" onClick={handleSignOut}>sign out</Button>
      </div>
    </div>
  );
};

Home.propTypes = {
  classes: React.PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Home);
