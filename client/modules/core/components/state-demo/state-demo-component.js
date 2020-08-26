import React, {useState} from "react";
import PropTypes from "prop-types";

import {Button, FormControlLabel, FormGroup, Switch, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {Paper} from "@nqminds/ui-components";

const useStyles = makeStyles(() => {
  return {
    content: {
      display: "flex",
      flexDirection: "column",
    },
  };
});

function StateDemo({setFeedback}) { // setFeedback is a redux action mapped in the container
  const classes = useStyles();
  const [success, setSuccess] = useState(false); // Use state takes the default state value as an argument
  const [message, setMessage] = useState(""); // and returns a tuple containing the state value and the update function

  return (
    <Paper className={classes.content}>
      <Typography variant="body1">
          This page demonstrates using local state as well as using a redux action
        </Typography>
      <TextField label="feedback message" onChange={(evt) => setMessage(evt.target.value)} value={message} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch checked={success} onChange={(evt) => setSuccess(evt.target.checked)} value="feedbackSuccess" />
          }
          label="Feedback Success"
        />
      </FormGroup>
      <Button onClick={() => setFeedback({success, message})}>Set feedback</Button>
    </Paper>
  );
}

StateDemo.propTypes = {
  setFeedback: PropTypes.func.isRequired,
};

export default StateDemo;
