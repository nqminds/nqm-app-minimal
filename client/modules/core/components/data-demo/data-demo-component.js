import React, {useState} from "react";
import PropTypes from "prop-types";

import {
  Button, List, ListItem, ListItemText, ListSubheader, Paper, Slide, TextField, Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(({spacing}) => {
  return {
    content: {
      display: "flex",
      flexWrap: "wrap",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      margin: spacing(2),
      padding: spacing(2),
    },
    messagePaper: {
      margin: spacing(2),
    },
  };
});

function DataDemo({api, data, exampleDatasetId, percentage, setFeedback}) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  async function addMessage() {
    try {
      await api.addData(exampleDatasetId, {timestamp: Date.now(), message});
      setMessage("");
    } catch (err) {
      setFeedback({success: false, message: err.message});
    }
  }
  return (
    <Slide in timeout={300}>
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <Typography variant="p">This page demonstrates subscriptions and using the TDX Api</Typography>
          <TextField label="Your message" onChange={(evt) => setMessage(evt.target.value)} value={message} />
          <Button disabled={!message} onClick={addMessage}>Add message</Button>
        </Paper>
        <Paper className={classes.messagePaper}>
          <List subheader={<ListSubheader>Showing {percentage}% of messages</ListSubheader>}>
            {data.map(({message, timestamp}) => (
              <ListItem key={`${message}-${timestamp}`}>
                <ListItemText primary={message} secondary={new Date(timestamp).toDateString()} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </Slide>
  );
}

DataDemo.propTypes = {
  api: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  exampleDatasetId: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  setFeedback: PropTypes.func.isRequired,
};

export default DataDemo;
