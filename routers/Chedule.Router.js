"use strict";
module.exports = function(router) {
const learnchedule = require('../controllers/Chedule.Controller');
  router
    .route("/chedule")
    .get(learnchedule.getAll)
    .post(learnchedule.store)
    .delete(learnchedule.deleteAll)
  router
    .route("/chedule/:id")
    .get(learnchedule.getById)
    .put(learnchedule.update)
    .delete(learnchedule.delete)

};
