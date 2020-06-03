"use strict";
module.exports = function(router) {
const learnchedule = require('../controllers/LearnCheDule.Controller');
  router
    .route("/learnchedule")
    .get(learnchedule.getAll)
    .post(learnchedule.store)
    .delete(learnchedule.deleteAll)
  router
    .route("/learnchedule/:id")
    .get(learnchedule.getById)
    .put(learnchedule.update)
    .delete(learnchedule.delete)

};
