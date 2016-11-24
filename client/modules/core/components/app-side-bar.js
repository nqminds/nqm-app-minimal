import React from "react";
import framework from "nqm-app-framework";

// Side bar panels
import AppMenu from "../containers/app-menu";

// Sidebar framework
const SideBarContent = framework.ui.SideBarContent;
const SideBarPanel = framework.ui.SideBarPanel;

const AppSideBar = () => {
  return (
    <SideBarContent>
      <SideBarPanel title="menu" value="menu" icon="apps">
        <AppMenu />
      </SideBarPanel>
      <SideBarPanel title="options" value="options" icon="settings">
        <div>options go here</div>
      </SideBarPanel>
    </SideBarContent>
  );
};

export default AppSideBar;
