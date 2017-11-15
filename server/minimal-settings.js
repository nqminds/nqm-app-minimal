module.exports = {
  "applicationId": "S1xUo2puJz",
  "applicationSecret": "password",
  "appProtocol": "http",
  "appPort": 8082,
  // "authServerURL": "http://localhost:4443",
  // "authServerURL": "https://tdx.nqminds.com",
  "authServerURL": "https://cs-tdx.nqminds.com",
  "public": {
    "applicationTitle": "app minimal",
    "dateFormat": "MMMM Do YYYY",
    "tdxConfig": {
      // "commandServer": "https://cmd.nqminds.com",
      // "ddpServer": "https://ddp.nqminds.com",
      // "queryServer": "https://q.nqminds.com",
      // "tdxServer": "https://tdx.nqminds.com",
      //
      "commandServer": "https://cs-cmd.nqminds.com",
      "ddpServer": "https://cs-ddp.nqminds.com",
      "queryServer": "https://cs-q.nqminds.com",
      "tdxServer": "https://cs-tdx.nqminds.com",
      //
      // "commandServer": "http://localhost:3103",
      // "ddpServer": "http://localhost:2224",
      // "queryServer": "http://localhost:3104",
      // "tdxServer": "http://localhost:4443",
      "accessTokenTTL": 31622400,
    },
  },
  "publicShareKeyId": "SkergcaOyG",
  "publicShareKeySecret": "password",
};
