"use strict";
module.exports = function(router) {
const pointstudent = require('../controllers/PointStudent.Controller');
  router
    .route("/pointstudent")
    .get(pointstudent.getAll)
    .post(pointstudent.store)
    .delete(pointstudent.deleteAll)
  router
    .route("/pointstudent/:id")
    .get(pointstudent.getById)
    .put(pointstudent.update)
    .delete(pointstudent.delete)  
};
