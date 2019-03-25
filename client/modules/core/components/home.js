/**
 * An example landing page
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

const Home = ({classes}) => {
  // Placeholder text for now.
  return (
    <ContentMain className={classes.content}>
      <PageHeading>welcome - fast reloads!!</PageHeading>
      <p>hot potato</p>
    </ContentMain>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet, {name: "nqm-home"})(Home);
