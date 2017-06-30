import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import _ from "lodash";
import {browserHistory} from "react-router";

import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import * as ColorManipulator from "material-ui/utils/colorManipulator";

const styles = {
  itemStyle: {
    borderRight: "4px solid transparent",
  },
};

class AppMenu extends React.Component {
  static propTypes = {
    activeItem: PropTypes.string,
    go: PropTypes.func,
    setSidebarFloating: React.PropTypes.func.isRequired,
  }
  static menuData = [
    {
      text: "Home",
      icon: "home",
      route: "/",
    },
    {},
    {
      text: "Modal",
      icon: "help",
      route: "/modal",
    },
  ]
  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  }
  onMenuItem(route) {
    this.props.setSidebarFloating(false);
    browserHistory.push(route);
  }
  render() {
    const activeItemStyle = {
      backgroundColor: ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.1),
      fontWeight: "bold",
      borderRight: `4px solid ${this.context.muiTheme.palette.accent1Color}`,
    };
    const menuData = _.clone(AppMenu.menuData);

    const menuItems = _.map(menuData, (itemData, idx) => {
      if (itemData.text) {
        const active = this.context.router.isActive(itemData.route);
        const itemStyle = active ? activeItemStyle : styles.itemStyle;
        return (
          <ListItem
            key={idx}
            innerDivStyle={itemStyle}
            primaryText={itemData.text}
            rightIcon={<FontIcon className="material-icons">{itemData.icon}</FontIcon>}
            onTouchTap={this.onMenuItem.bind(this, itemData.route)}
          />
        );
      } else {
        return <Divider key={idx} />;
      }
    });

    const content = (
      <List style={{paddingTop: 0}}>
        {menuItems}
      </List>
    );

    return content;
  }
}

export default injectSheet(styles)(AppMenu);
