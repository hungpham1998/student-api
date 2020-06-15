"use strict";
module.exports = function(router) {
const position = require('../controllers/Position.Controller');
  router
    .route("/position")
    .get(position.getAll)
    .post(position.store)
    .delete(position.deleteAll)
  router
    .route("/position/find")
    .get(position.findByTitle)
  router
    .route("/position/:id")
    .get(position.getById)
    .put(position.update)
    .delete(position.delete)
};
