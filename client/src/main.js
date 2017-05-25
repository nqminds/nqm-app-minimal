import {createApp} from "nqm-mantra-core";
import {combineReducers} from "redux";
import initContext from "./configs/context";

// modules
import coreModule from "./modules/core/index";

// reducers
const reducers = combineReducers({
  ...coreModule.reducers,
});

// init context
const context = initContext({reducers});

// create app
const app = createApp(context);

// load modules
app.loadModule(coreModule);

// go
app.init();
