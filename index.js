const express = require("express");
const PATH = require("path");

const app = express();
const port = 4200;
const db = require("./config/mongoose");
const List = require("./models/list");
const Logger = require("./logger");
global.logger = Logger.logger();

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));

const myLogger = function (req, res, next) {
  logger.info(
    `REQUEST: ${req.method.toUpperCase()} URL: ${
      req.url
    } Query: ${JSON.stringify(req.query)} Params: ${JSON.stringify(req.params)}`
  );
  next();
};

app.use(myLogger);
app.use("/", require("./routes"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
