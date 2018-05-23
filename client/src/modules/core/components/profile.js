/**
 * An example of an authenticated route showing some text
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

const Profile = ({classes}) => {
  // Placeholder text for now.
  return (
    <ContentMain className={classes.content}>
      <PageHeading>User settings</PageHeading>
      <p>This is a route that only authenticated users can see.</p>
    </ContentMain>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet, {name: "nqm-user-profile"})(Profile);
