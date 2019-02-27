import {createApp} from "nqm-mantra-core";
import {combineReducers} from "redux";
import initContext from "./configs/context";
import _ from "lodash";
import "./stylesheets/style.css";

// modules
// Any modules that use redux need to be loaded here
import coreModule from "./modules/core/index";

import {defaultCoreState} from "./modules/core/configs/reducers";

fetch("/nqm-setup-data")
  .then((res) => {
    return res.json();
  })
  .then((setupData) => {
    // reducers
    const reducers = combineReducers({
      ...coreModule.reducers,
    });
    // eslint-disable-next-line no-underscore-dangle
    const initialState = _.merge({core: defaultCoreState}, setupData.nqmApplicationState);

    // init context
    const context = initContext({
      initialState,
      reducers,
      // Inherit settings from session
      settings: setupData.nqmApplicationSettings, // eslint-disable-line no-underscore-dangle
    });

    // create app
    const app = createApp(context);

    // load modules
    app.loadModule(coreModule);

    // go
    app.init();
  });

