import React from "react";
import {mount} from "react-mounter";
import framework from "nqm-app-framework";

// Application pages
import Home from "../core/components/home";
import Modal from "../core/components/modal";

// Application sidebar
import AppSideBar from "./components/app-side-bar";

// Get layout components from the framework
const Layout = framework.ui.Layout;
const ModalLayout = framework.ui.ModalLayout;

export default function(injectDeps, {FlowRouter}) {
  const LayoutCtx = injectDeps(Layout);
  const ModalLayoutCtx = injectDeps(ModalLayout);

  FlowRouter.route("/", {
    name: "root",
    action() {
      mount(LayoutCtx, {
        title: "home",
        content: (contentStyle) => (<Home title="HOME PAGE" style={contentStyle} />),
        sideBarContent: AppSideBar,
      });
    },
  });

  FlowRouter.route("/modal", {
    name: "modal",
    action() {
      mount(ModalLayoutCtx, {
        content: () => (<Modal title="about" />),
      });
    },
  });
}
