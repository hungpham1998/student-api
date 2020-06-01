"use strict";
module.exports = function(router) {
const specailize = require('../controllers/Specailize.Controller');
  router
    .route("/specailize")
    .get(specailize.getAll)
    .post(specailize.store)
    .delete(specailize.deleteAll)
  router
    .route("/specailize/:id")
    .get(specailize.getById)
    .put(specailize.update)
    .delete(specailize.delete)
};
