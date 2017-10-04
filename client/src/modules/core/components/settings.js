/**
 * Another authenticated route, this one has been passed in the application settings
 * possibly to display some of them to the user
 */
import React from "react";
import PropTypes from "prop-types";

// internal
import {ContentMain, PageHeading} from "./page-components";

import {withStyles} from "material-ui/styles";
const styleSheet = () => {
  return {
    content: {
      textAlign: "justify",
    },
  };
};

const Settings = ({classes, settings}) => {
  // Placeholder text for now.
  return (
    <ContentMain className={classes.content}>
      <PageHeading>User settings</PageHeading>
      <p>This is a route that only authenticated users can see.</p>
    </ContentMain>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withStyles(styleSheet, {name: "nqm-user-settings"})(Settings);
