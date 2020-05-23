"use strict";
module.exports = function(router) {
    const student = require('../controllers/Student.Controller');
    router 
        .route("/student")
        .get(student.getAll)
    //.post(subject.store);

//   router
//     .route("/subject/:Id")
//     .get(subject.detail)
//     .put(subject.update)
//     .delete(subject.delete);
};
