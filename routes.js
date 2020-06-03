const express = require("express");

function eRoutes() {
  const router = express.Router();
  const student = require("./routers/Student.Router")(router);
  const subject = require('./routers/Subject.Router')(router);
  const account = require('./routers/Account.Router')(router);
  const department = require('./routers/Department.Router')(router);
  const specailized = require('./routers/Specailized.Router')(router);
  const position = require('./routers/Position.Router')(router);
  const learnyear = require('./routers/LearnYear.Router')(router);
  const learnclass = require('./routers/LearnClass.Router')(router);
  const pointstudent = require('./routers/PointStudent.Router')(router);
  const pointpractice = require('./routers/PointPractice.Router')(router);
  const learnchudule = require('./routers/LearnChudule.Router')(router);
  return router;
}

module.exports = eRoutes;
