import {all, call, put, takeLatest} from "redux-saga/effects";
import {TDXConnections, utils} from "@nqminds/nqm-tdx-client";
import api from "../services/api";
import debug from "debug";

/* ------------- Types ------------- */

import CoreActions, {CoreTypes} from "../redux/core";

/* ------------- Sagas ------------- */

const log = debug("nqm-app:boot");
let tdxConnections;

function* initApp(dispatch) {
  const setupData = yield call(api.getNqmSetupData);
  const {accessToken, userDataFolderId, settings} = setupData.data;
  tdxConnections = new TDXConnections(settings.public.tdxConfig);
  api.setTdxApi(tdxConnections);
  yield put(CoreActions.fetchInitialStateSuccess(accessToken, userDataFolderId, settings));
  tdxConnections.on("user", (connection) => {
    log("connected to tdx at %s", connection.tdx.tdxServer);
    dispatch(CoreActions.resetApp());
    // Don't initialise user until we have a real user account, e.g. ignore the application account, which may be used
    // to initialise the ddp connection until a real user signs in.
    if (connection.user.accountType === utils.constants.userAccountType) {
      log("initialising user %s", connection.user.username);
      // Do any user initialisation here.
      // For example, make sure a profile dataset exists for the current user.
      dispatch(CoreActions.appUserInitialised(true));
    } else {
      dispatch(CoreActions.appInitialised(true));
    }
  });
  if (accessToken && accessToken.length > 0) {
    api.setAuthToken(accessToken);
    tdxConnections.setToken(accessToken)
      .then(() => {
        dispatch(CoreActions.authenticated(!!accessToken));
      })
      .catch((err) => {
        dispatch(CoreActions.authenticationError(err));
      });
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root(dispatch) {
  yield all([
    takeLatest(CoreTypes.FETCH_INITIAL_STATE, initApp, dispatch),
  ]);
}
