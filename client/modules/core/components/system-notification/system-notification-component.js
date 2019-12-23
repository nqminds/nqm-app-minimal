/**
 * A generalised snackbar component for presenting feedback to the user
 */
import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import green from "@material-ui/core/colors/green";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({palette, spacing}) => ({
  failure: {
    backgroundColor: palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  messageIcon: {
    marginRight: spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  success: {
    backgroundColor: green[600],
  },
}));

const SystemNotification = ({feedback, hideFeedback, isFeedbackOpen}) => {
  const classes = useStyles();
  const className = feedback.success ? classes.success : classes.failure;
  const successIcon = <CheckCircleIcon className={classes.messageIcon} />;
  const failureIcon = <ErrorIcon className={classes.messageIcon} />;
  const icon = feedback.success ? successIcon : failureIcon;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isFeedbackOpen}
      autoHideDuration={6000}
      onClose={hideFeedback}
    >
      <SnackbarContent
        className={className}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {icon}
            {feedback.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={hideFeedback}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

SystemNotification.propTypes = {
  feedback: PropTypes.object.isRequired,
  hideFeedback: PropTypes.func.isRequired,
  isFeedbackOpen: PropTypes.bool.isRequired,
};

export default SystemNotification;
