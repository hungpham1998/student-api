"use strict";
module.exports = function(router) {
const pointpractice = require('../controllers/PointPractice.Controller');
  router
    .route("/pointpractice")
    .get(pointpractice.getAll)
    .post(pointpractice.store)
    .delete(pointpractice.deleteAll)
  router
    .route("/pointpractice/:id")
    .get(pointpractice.getById)
    .put(pointpractice.update)
    .delete(pointpractice.delete)

};
