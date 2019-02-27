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
      <PageHeading>welcome!</PageHeading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, tempor incididunt ut labore et.</p>
      <h1>how it works</h1>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum .</p>
      <p>&nbsp;</p>
    </ContentMain>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet, {name: "nqm-home"})(Home);
