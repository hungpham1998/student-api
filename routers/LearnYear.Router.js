"use strict";
module.exports = function(router) {
const learnyear = require('../controllers/LearnYear.Controller');
  router
    .route("/learnyear")
    .get(learnyear.getAll)
    .post(learnyear.store)
    .delete(learnyear.deleteAll)
  router
    .route("/learnyear/:id")
    .get(learnyear.getById)
    .put(learnyear.update)
    .delete(learnyear.delete)
};
