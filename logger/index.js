const bunyan = require("bunyan");
const PATH = require("path");
const fs = require("fs-extra");

module.exports = {
  logger: () => {
    //Make sure log directory is created outside the deploymnet folders
    let name = "logs";
    let filename = "app.log";
    let logDir = PATH.join(name);

    fs.ensureDirSync(logDir);

    let streams = [{ type: "rotating-file", path: logDir + "/" + filename }];

    streams.push({ stream: process.stdout });

    let bunyanLog = bunyan.createLogger({ name, streams });
    bunyanLog.on("error", err => {
      console.error("Bunyan log error", err);
    });
    return bunyanLog;
  }
};
