import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import ThemedApplication from "./components/themed-application";

export default function(injectDeps, context, actions) { // eslint-disable-line no-unused-vars
  const Routes = () => (
    <BrowserRouter>
      <ThemedApplication />
    </BrowserRouter>
  );

  const BoundRoutes = injectDeps(Routes);

  const MOUNT_NODE = document.getElementById("render-root");
  const render = () => {
    ReactDOM.render(
      <BoundRoutes />,
      MOUNT_NODE,
    );
  };
  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(["modules/core/components/themed-application"], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  }

  render();
}
