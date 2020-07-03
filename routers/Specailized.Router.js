"use strict";
module.exports = function(router) {
const specailized = require('../controllers/Specailized.Controller');
  router
    .route("/specailized")
    .get(specailized.getAll)
    .post(specailized.store)
    .delete(specailized.deleteAll)
  router
    .route("/specailized/find")
    .get(specailized.findByTitle)
  router
    .route("/specailized/:id/learnclass")
    .get(specailized.findByLearnclass)
  router
    .route("/specailized/:id")
    .get(specailized.getById)
    .put(specailized.update)
    .delete(specailized.delete)
};
