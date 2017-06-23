import React from "react";

import Dialog from "material-ui/Dialog";
import Button from "material-ui/Button";
import {createStyleSheet, withStyles} from "material-ui/styles";

export const styleSheet = createStyleSheet("nqm-server-pending-modal", ({palette}) => {
  return {
    root: {
    },
    content: {
      padding: 10,
    },
    errorContent: {
      color: palette.error[500],
      padding: 10,
    },
    pendingContent: {
      color: palette.text.primary,
      padding: 10,
    },
  };
});

const succeeded = "succeeded";
const closeTimeout = 500;

class ServerPendingModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.closeTimer = null;
    this.state = {
      open: !!props.serverPending,
      serverError: props.serverError,
      serverPending: props.serverPending,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.killCloseTimer();

    if (nextProps.serverPending || nextProps.serverError) {
      this.setState({
        open: true,
        serverError: nextProps.serverError,
        serverPending: nextProps.serverPending,
      });
    } else if (!nextProps.serverPending && this.state.open) {
      this.setState({serverPending: succeeded});
      this.setCloseTimer();
    }
  }
  componentWillUnmount() {
    this.killCloseTimer();
  }
  setCloseTimer() {
    this.closeTimer = setTimeout(() => {
      this.setState({open: false});
    }, closeTimeout);
  }
  killCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
  render() {
    const {classes, setServerIdle} = this.props;

    const handleRequestClose = () => {
      this.killCloseTimer();
      setServerIdle();
      this.setState({open: false});
    };

    let content;
    if (this.state.serverError) {
      content = (
        <div>
          <div className={classes.errorContent}>[{this.state.serverError.failure.code}]</div>
          <div className={classes.errorContent}>{this.state.serverError.failure.message}</div>
          <Button className={classes.dialogButton} onClick={handleRequestClose}>OK</Button>
        </div>
      );
    } else if (this.state.serverPending) {
      content = (
        <div className={classes.pendingContent}>
          <h3>{this.state.serverPending === succeeded ? "info" : "working..."}</h3>
          <p>{this.state.serverPending}</p>
        </div>
      );
    }

    return (
      <Dialog
        onRequestClose={handleRequestClose}
        hideOnEscapeKeyUp={!!this.state.serverError}
        hideOnBackdropClick={!!this.state.serverError}
        open={this.state.open}
      >
        <div className={classes.content}>
          {content}
        </div>
      </Dialog>
    );
  }
}

ServerPendingModal.propTypes = {
  classes: React.PropTypes.object,
  serverError: React.PropTypes.object,
  serverPending: React.PropTypes.string,
  setServerIdle: React.PropTypes.func,
};

export default withStyles(styleSheet)(ServerPendingModal);
