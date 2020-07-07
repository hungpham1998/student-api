"use strict";
module.exports = function(router) {
const semester = require('../controllers/Semester.Controller');
  router
    .route("/semester")
    .get(semester.getAll)
    .post(semester.store)
    .delete(semester.deleteAll)
  router 
    .route("/semester/find")
    .get(semester.findByTitle)
router 
    .route("/semester/:id/subject")
    .get(semester.getBySubject)
  router
    .route("/semester/:id")
    .get(semester.getById)
    .put(semester.update)
    .delete(semester.delete)
};
