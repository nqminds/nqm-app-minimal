/**
 * An example of a component wrapped by a container
 */
import React from "react";
import PropTypes from "prop-types";

// internal
import {ContentMain, PageHeading} from "./page-components";

import {withStyles} from "@material-ui/core/styles";
const styleSheet = () => {
  return {
    content: {
      textAlign: "justify",
    },
  };
};

const Data = ({classes, data}) => {
  // Placeholder text for now.
  return (
    <ContentMain className={classes.content}>
      <PageHeading>Displays some data from the TDX</PageHeading>
      <p>This is an authenticated route, only for logged in users</p>
    </ContentMain>
  );
};

Data.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styleSheet, {name: "nqm-data"})(Data);
