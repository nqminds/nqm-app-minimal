import React from "react";
import injectSheet from "react-jss";
import framework from "nqm-app-framework";

const ModalPageBase = framework.ui.ModalPageBase;

const styles = {
  content: {
    margin: "0px 4px 0px 10px",
  },
};

class Modal extends React.Component {
  static propTypes = {
    goBack: React.PropTypes.func,
    title: React.PropTypes.string,
  }
  handleClose() {
    this.props.goBack();
  }
  render() {
    return (
      <ModalPageBase title={this.props.title} onClose={this.handleClose.bind(this)}>
        <div>MODAL PAGE</div>
      </ModalPageBase>
    );
  }
}

export default injectSheet(styles)(Modal);
