import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "material-ui/styles";

// HoC to be used to inject application wide props into component context
const withApp = (Component) => class WithAppContainer extends React.Component {
  static contextTypes = {
    appClasses: PropTypes.object.isRequired, // Application wide styles
    // An example where your application exposes a showMessage function on context for feedback to user
    // showMessage: PropTypes.func.isRequired,
  };

  render() {
    return <Component {...this.props} appClasses={this.context.appClasses} />;
  }
};

const withAppAndStyle = (styleSheet, Component) => {
  return withStyles(styleSheet)(withApp(Component));
};

export default withAppAndStyle;
