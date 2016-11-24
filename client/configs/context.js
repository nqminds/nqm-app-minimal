import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/kadira:flow-router";
import {Tracker} from "meteor/tracker";
import {createStore} from "redux";

// Create and return the application context
export default function ({framework, reducer}) {
  return {
    Meteor,
    FlowRouter,
    Tracker,
    connectionManager: framework.connectionManager,
    constants: framework.constants,
    store: createStore(reducer, {})
  };
}
