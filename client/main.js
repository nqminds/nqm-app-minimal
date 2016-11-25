import {createApp} from "mantra-core";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import framework from "nqm-app-framework";
import initContext from "./configs/context";

// modules
import frameworkModule from "nqm-app-framework/modules/core";
import coreModule from "./modules/core";

// reducers
const reducer = combineReducers({
  ...frameworkModule.reducers,
  ...coreModule.reducers,
  routing: routerReducer,
});

// init context
const context = initContext({framework, reducer});

// create app
const app = createApp(context);

// load modules
app.loadModule(frameworkModule);
app.loadModule(coreModule);

// go
app.init();
