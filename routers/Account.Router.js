"use strict";
module.exports = function(router) {
const account = require('../controllers/Account.Controller');
  router
    .route("/account")
    .get(account.getAll)
  router
    .route("/account/:id")
    .get(account.getById)
    .put(account.getById)
    .delete(account.delete)
};
