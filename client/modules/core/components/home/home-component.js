/**
 * An example landing page
 */
import React from "react";

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(({spacing}) => {
  return {
    content: {
      margin: spacing(2),
      padding: spacing(2),
    },
  };
});
import {Paper, Typography} from "@material-ui/core";

function Home() {
  const classes = useStyles();
  return (

    <Paper className={classes.content}>
      <Typography variant="h6">Welcome to <strong>nquiring</strong>minds' minimal react app</Typography>
      <Typography component="p">
        This app uses react, webpack, and express. Routing is provided by react-router and state by redux.
      </Typography>
      <Typography component="p">You can deploy this app straight to a TDX using the npm "deploy" script.</Typography>
    </Paper>
  );
}

export default Home;
