const express = require("express");

function eRoutes() {
  const router = express.Router();
  let student = require("./routers/Student.Router")(router);
  //let error = require('./routers/404page')(router);
  return router;
}

module.exports = eRoutes;