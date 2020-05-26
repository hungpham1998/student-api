"use strict";
module.exports = function(router) {
const student = require('../controllers/Student.Controller');
  router
    .route("/student")
    .get(student.getAll)
    .post(student.store)
  router
    .route("/student/:Id")
    .get(student.getById)
    .put(student.update)
    .delete(student.delete)
};
