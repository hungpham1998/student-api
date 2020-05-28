const express = require("express");

function eRoutes() {
  const router = express.Router();
  const student = require("./routers/Student.Router")(router);
  const subject = require('./routers/Subject.Router')(router);
  const account = require('./routers/Account.Router')(router);
  const department = require('./routers/Department.Router')(router);
  
  return router;
}

module.exports = eRoutes;
