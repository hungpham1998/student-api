"use strict";

const authJwt = require('./verifyJwtToken');
module.exports = function(router) {
const subject = require('../controllers/Subject.Controller');
  router
    .route("/subject")
    .get(subject.getAll)
    .post(subject.store)
    // .post([authJwt.verifyToken, authJwt.isPmOrAdmin], subject.store)
    // .delete([authJwt.verifyToken, authJwt.isPmOrAdmin], subject.deleteAll)
  router
    .route("/subject/find")
    .get(subject.findByTitle)
  router
    .route("/subject/:id/chedule")
    .get(subject.getByChedule)

  router
    .route('/subject/:id')
    .get(subject.getById)
    .put(subject.update)
    .delete(subject.delete)
  
};
