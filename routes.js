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
  const chedule = require('./routers/Chedule.Router')(router);
  const login = require('./routers/Login.Router')(router);
  const role = require('./routers/Role.Router')(router);
  const attendencesheet = require('./routers/Attendancesheet.Router')(router);
  const semester = require('./routers/Semester.Router')(router);
  return router;
}

module.exports = eRoutes;
