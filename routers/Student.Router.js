"use strict";
module.exports = function(router) {
const student = require('../controllers/Student.Controller');
  router
    .route("/student")
    .get(student.getAll)
    .post(student.store)
    // .post([authJwt.verifyToken, authJwt.isPmOrAdmin], student.store)
    // .delete([authJwt.verifyToken, authJwt.isAdmin], student.deleteAll)
  router
    .route("/student/:id/attendancesheet")
    .get(student.getAttendancesheet)
  router
    .route("/student/:id/point")
    .get(student.getPointstudent)
  router
    .route("/student/:id")
    .get(student.getById)
    .put(student.update)
    .delete(student.delete)
    
};
