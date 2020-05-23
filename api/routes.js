const express = require("express");

function eRoutes() {
  // let router = express.Router();
  // let employees = require("./routers/Employees.Router")(router);
  // let jobs = require("../api/routers/Jobs.Router")(router);
 let subject = require("../api/routers/Subject.Router")(router);
 let error = require("./routers/404page")(router);
  return router;
}

module.exports = eRoutes;
