// Needed for es6 generator support
import "@babel/polyfill";
import "./stylesheets/style.css";
// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";

import Home from "./components/home";

const MOUNT_NODE = document.getElementById("app");

const render = () => {
  ReactDOM.render(
    <Home />,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["components/home"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
