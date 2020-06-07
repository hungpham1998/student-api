"use strict";
module.exports = function(router) {
const department = require('../controllers/Department.Controller');
  router
    .route("/department")
    .get(department.getAll)
    .post(department.store)
    .delete(department.deleteAll)
  router
    .route("/depfindtitle/:title")
    .get(department.findByTitle)
  router
    .route("/department/:id")
    .get(department.getById)
    .put(department.update)
    .delete(department.delete)
};
