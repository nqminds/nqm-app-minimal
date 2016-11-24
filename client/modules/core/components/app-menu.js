import React from "react";
import injectSheet from "react-jss";
import _ from "lodash";

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
    activeItem: React.PropTypes.string,
    go: React.PropTypes.func,
  }
  static menuData = [
    {
      text: "Home",
      icon: "home",
      route: "root",
    },
    {},
    {
      text: "Modal",
      icon: "help",
      route: "modal",
    },
  ]
  static contextTypes = {
    muiTheme: React.PropTypes.object,
  }
  onMenuItem(route) {
    this.props.go(route);
  }
  render() {
    const activeItemStyle = {
      backgroundColor: ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.1),
      fontWeight: "bold",
      borderRight: `4px solid ${this.context.muiTheme.palette.accent1Color}`,
    };

    const menuItems = _.map(AppMenu.menuData, (itemData, idx) => {
      const active = itemData.route === this.props.activeItem;
      const itemStyle = active ? activeItemStyle : styles.itemStyle;
      if (itemData.text) {
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
