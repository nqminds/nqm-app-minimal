/**
 * An example landing page
 */
import React from "react";

import {Typography} from "@material-ui/core";

import {Paper} from "@nqminds/ui-components";

function Home() {
  return (
    <Paper>
      <Typography variant="h6">Welcome to <strong>nquiring</strong>minds' minimal react app</Typography>
      <Typography component="p">
        This app uses react, webpack, and express. Routing is provided by react-router and state by redux.
      </Typography>
      <Typography component="p">You can deploy this app straight to a TDX using the npm "deploy" script.</Typography>
    </Paper>
  );
}

export default Home;
