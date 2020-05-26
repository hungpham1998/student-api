const express = require("express");

function eRoutes() {
  const router = express.Router();
  let student = require("./routers/Student.Router")(router);

  return router;
}

module.exports = eRoutes;
