/* eslint-disable no-console */
import React from "react";
import {setDefaults, merge} from "nqm-react-komposer";
import {useDeps} from "nqm-react-simple-di";
import {Tracker} from "nqm-ddp-tdx";
import RedBox from "redbox-react";
import Promise from "bluebird";

export const noLoader = () => (null);
export const defaultError = (err) => (<RedBox error={err} />);

export const compose = setDefaults({
  errorHandler: defaultError,
  loadingHandler: noLoader,
  // The following is critical to good komposer performance
  // It prevents re-rendering of the component unless props have changed.
  pure: true,
});

export const trackerFactory = function(loaderFunc) {
  return (props, onData, env) => {
    let trackerCleanup = () => null;
    let cleanedUp = false;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        if (!cleanedUp) {
          // Store clean-up function if provided.
          trackerCleanup = loaderFunc(props, onData, env) || (() => null);
        } else {
          console.log("ignoring tracker factory subscribe - component cleaned up");
        }
      });
    });
    return () => {
      cleanedUp = true;
      trackerCleanup();
      return handler.stop();
    };
  };
};

export const reduxFactory = function(loaderFunc) {
  return (props, onData) => {
    const {store} = props;
    if (!store) {
      throw new Error("you must map 'store' in useDeps if using redux");
    }

    // Callback with initial state.
    onData(null, loaderFunc(store.getState(), props));

    // Need to keep track of cleaned up state - if a redux state change causes a component to
    // be unmounted, the unsubscribe will be called and the listener will be removed from the store.
    // However, the dispatch loop is already running and has a cached copy of the listeners and
    // will still call our listener, causing an error in react komposer, which checks the mounted
    // state of the component.
    let cleanedUp = false;

    // Subscribe to redux store changes.
    const cleanUp = store.subscribe(() => {
      // Only callback if haven't been cleaned up.
      if (!cleanedUp) {
        onData(null, loaderFunc(store.getState(), props));
      }
    });

    return () => {
      cleanedUp = true;
      cleanUp();
    };
  };
};

export const promiseFactory = function(promise, loadingProps) {
  return (props, onData) => {
    if (loadingProps !== undefined) {
      // Set loadingProps === null to prevent the inner component (or container) from rendering until the promise
      // has resolved, otherwise use it to set other props while waiting for the promise, e.g. {loading: true}
      onData(null, loadingProps);
    }

    let cleanedUp = false;
    Promise.method(promise)(props)
      .then((result) => {
        if (!cleanedUp) {
          onData(null, result);
        } else {
          console.log("throwing away response as component has unloaded: %j", result);
        }
        return null;
      })
      .catch((err) => {
        console.error("promise factory catch: [%s]", err.stack);
        onData(err);
        return null;
      });

    return () => {
      cleanedUp = true;
    };
  };
};

export {useDeps, merge};
