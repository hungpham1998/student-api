"use strict";
module.exports = function(router) {
let student = require('../controllers/Student.Controller');
 router 
    .route("/student")
    .get(student.getAll)
    .post(student.create);

  router
    .route("/student/:Id")
    .get(student.getById)
    .put(student.update)
    .delete(student.delete);
};
