"use strict";
module.exports = function(router) {
const attendancesheet = require('../controllers/Attendancesheet.Controller');
  router
    .route("/attendancesheet")
    .get(attendancesheet.getAll)
    .post(attendancesheet.store)

  router
    .route("/attendancesheet/:id")
    .get(attendancesheet.getById)
    .put(attendancesheet.update)
    .delete(attendancesheet.delete)
};
