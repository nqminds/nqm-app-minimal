module.exports = (function() {
  "use strict";
  const Promise = require("bluebird");
  const minimist = require("minimist");
  const argv = minimist(process.argv.slice(2));
  const config = require("./server/settings")(argv.config);
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const nqmUtils = require("@nqminds/nqm-core-utils");
  const constants = nqmUtils.constants;
  const log = require("debug")("nqm:deploy");
  const fs = require("fs");
  const databotUtils = require("@nqminds/nqm-databot-utils");
  const request = require("request");
  const _ = require("lodash");

  async function checkResourceExists(api, resourceId) {
    try {
      await api.getResource(resourceId);
      return true;
    } catch (err) {
      if (err.name === "TDXApiError") {
        const errInfo = JSON.parse(err.message);
        if (errInfo.code === 404) {
          return false;
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    }
  }

  function getServerFolderId() {
    return nqmUtils.shortHash(constants.applicationServerDataFolderPrefix + config.applicationId);
  }

  function getDatabotFileId() {
    return `${getServerFolderId()}-databot-file`;
  }

  function getDatabotDefId() {
    return `${getServerFolderId()}-databot-def`;
  }

  function getDatabotInstanceId() {
    return `${getServerFolderId()}-databot-instance`;
  }

  async function createDatabotFile(api) {
    await api.addResource({
      id: getDatabotFileId(), basedOnSchema: "zip",
      parentId: getServerFolderId(), name: "application databot zip",
    }, true);
  }

  async function createDatabotDef(api) {
    await api.addResource({
      id: getDatabotDefId(), basedOnSchema: "databotDefinition",
      parentId: getServerFolderId(), name: "application databot definition",
      schema: {dataSchema: {settings: "object"}},
    }, true);
    await api.updateResource(getDatabotDefId(), {
      meta: {
        chunks: 1, definitionVersion: 1, packageType: "zip", package: getDatabotFileId(), packageParams: {},
      },
    });
  }

  async function uploadDatabotPackage(api) {
    log("INFO: Uploading databot file");
    return new Promise((resolve, reject) => {
      const databotZipFilePath = "./databot.zip";
      const sourceFileStream = fs.createReadStream(databotZipFilePath);
      const options = {};
      options.url = `${api.config.commandServer}/commandSync/resource/${getDatabotFileId()}/upload`;
      options.headers = {"Authorization": `Bearer ${api.accessToken}`};
      const baseName = "databot.zip";
      options.headers["Content-Disposition"] = `attachment; filename="${baseName}"`;
      options.headers["Content-Length"] = databotUtils.file.fileSize(databotZipFilePath);

      const req = request.post(options);

      // Receive response data, checking for errors and progress updates.
      let haveError = "";
      req.on("data", function(data) {
        data = data.toString();
        if (data.includes("error:")) {
          haveError = `${haveError}${data} | `;
        } else {
          const progress = data.toString().split("\n");
          _.forEach(progress, (p) => {
            if (p && p.length && !isNaN(parseInt(p))) {
              log(`INFO: Databot file ${parseInt(p)}% uploaded`);
            }
          });
        }
      });

      // Request has completed and response has ended.
      req.on("end", function() {
        if (haveError) {
          reject(new Error(haveError));
        } else {
          resolve();
        }
      });
      // Request failed.
      req.on("error", function(err) {
        reject(err);
      });
      // Pipe the source file to the request.
      sourceFileStream.pipe(req).on("error", reject);
    });
  }

  async function startApplication(api) {
    log("INFO: Starting application databot");
    await api.startDatabotInstance(
      getDatabotDefId(),
      {
        inputs: {settings: config},
        id: getDatabotInstanceId(),
        name: config.databotName || config.public.applicationTitle,
        overwriteExisting: getDatabotInstanceId(),
        schedule: {always: true},
        shareKeyId: config.applicationId,
        shareKeySecret: config.applicationSecret,
      }
    );
  }

  async function awaitAppReady(api, checkNumber = 0) {
    if (checkNumber === 6) {
      throw new Error("WARN: Databot pending for thirty seconds. Have you shared it with a host?");
    }
    await Promise.delay(5000);
    const {status} = await api.getDatabotInstanceStatus(getDatabotInstanceId());
    if (status === constants.errorDatabotStatus) {
      throw new Error("ERROR: Databot crashed");
    } else if (status !== constants.runningDatabotStatus) {
      log(`INFO: Still waiting for application to start, giving up in ${30 - checkNumber * 5} seconds`);
      return awaitAppReady(api, checkNumber + 1);
    }
  }

  async function fetchAppUrl(api) {
    const instance = await api.getDatabotInstance(getDatabotInstanceId());
    const urlProtocol = config.authServerURL.split(":")[0];
    const urlComponents = config.authServerURL.split(".");
    const url = `${urlProtocol}://${instance.subDomain}.${urlComponents.slice(1).join(".")}`;
    return url;
  }

  async function deployApplication() {
    try {
      config.production = true;
      const api = new TDXApi({tdxServer: config.authServerURL});
      await api.authenticate(config.applicationId, config.applicationSecret);
      const databotFileExists = await checkResourceExists(api, getDatabotFileId());
      if (!databotFileExists) {
        log("INFO: Creating databot file");
        await createDatabotFile(api);
      }
      const databotDefExists = await checkResourceExists(api, getDatabotDefId());
      if (!databotDefExists) {
        log("INFO: Creating databot definition");
        await createDatabotDef(api);
      }
      try {
        await api.stopDatabotInstance(getDatabotInstanceId(), constants.stopDatabotInstance);
      } catch (err) {
        log("WARN: Failed stopping databot. Was it running?");
      }
      await uploadDatabotPackage(api);
      await startApplication(api);
      await awaitAppReady(api);
      const appUrl = await fetchAppUrl(api);
      log(`INFO: Application running at ${appUrl}`);
      log("INFO: Check that you can access the above url and that it has been added to your app definition");
    } catch (err) {
      log(err.message);
    }
  }

  deployApplication();
}());
