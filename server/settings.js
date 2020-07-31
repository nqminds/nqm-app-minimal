module.exports = (function(config) {
  "use strict";
  const log = require("debug")("nqm-app:deploy");

  const settings = {
    default: {
      "applicationId": "SJxyvI--3W",
      "applicationSecret": "password",
      "appProtocol": "http",
      "appPort": 8082,
      "authServerURL": "https://tdx.nqminds.com",
      "databotName": "minimal",
      "public": {
        "applicationTitle": "app minimal",
        "dateFormat": "HH:mm DD/MM/YYYY",
        "tdxConfig": {
          "commandServer": "https://cmd.nqminds.com",
          "ddpServer": "https://ddp.nqminds.com",
          "queryServer": "https://q.nqminds.com",
          "tdxServer": "https://tdx.nqminds.com",
          "accessTokenTTL": 31622400,
        },
      },
    },
    production: {
      "applicationId": "SJxyvI--3W",
      "applicationSecret": "password",
      "appProtocol": "https",
      "appPort": 8082,
      "authServerURL": "https://tdx.nqminds.com",
      "databotName": "minimal",
      "failOffline": true,
      "notifyList": ["ivan@nquiringminds.com"],
      "public": {
        "applicationTitle": "app minimal",
        "dateFormat": "HH:mm DD/MM/YYYY",
        "tdxConfig": {
          "commandServer": "https://cmd.nqminds.com",
          "ddpServer": "https://ddp.nqminds.com",
          "queryServer": "https://q.nqminds.com",
          "tdxServer": "https://tdx.nqminds.com",
          "accessTokenTTL": 31622400,
        },
      },
      "production": true,
      "schedule": {
        always: true,
        cron: "",
      },
    },
  };

  if (process.env.NODE_ENV === "production" && !config) {
    log("Using production settings");
    return settings.production;
  } if (!config) {
    log("Using default settings");
    return settings.default;
  } else {
    if (process.env.NODE_ENV === "production") {
      log("Running in production mode, if you are deploying your application verify app protocol is correct");
    }
    if (!settings[config]) {
      throw new Error(`No settings for requested config ${config}`);
    } else {
      log(`Using ${config} settings`);
      return settings[config];
    }
  }
});
