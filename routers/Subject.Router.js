"use strict";
module.exports = function(router) {
const subject = require('../controllers/Subject.Controller');
  router
    .route("/subject")
    .get(subject.getAll)
    .post(subject.store)
  router
    .route('/subject/:id')
    .get(subject.getById)
    .put(subject.update)
    .delete(subject.delete)
};
