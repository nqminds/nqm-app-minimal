/*
 * NOTE
 *
 * These settings are obviously visible on the client - don't put anything sensitive here.
 *
 * Use ./server-settings for server-side stuff.
 *
 */
let profileId;

const getProfileId = function() {
  return profileId;
};

const setProfileId = function(id) {
  profileId = id;
};

const localServer = {
  ddpServer: "ws://localhost:2222",
  tdxServer: "localhost:4443",
  commandServer: "http://localhost:3103",
  queryServer: "http://localhost:3104",
};

const nqmindsServer = {
  ddpServer: "https://tbx.nqminds.com",
  tdxServer: "tdx.nqminds.com",
};

const settings = {
  getProfileId,
  setProfileId,
  tdxConfig: localServer,
};

export default settings;
