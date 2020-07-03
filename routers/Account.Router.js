"use strict";
module.exports = function (router) {
  
const account = require('../controllers/Account.Controller');
  router
    .route("/account")
    .get(account.getAll)
    .post(account.store)

  router
    .route("/account/:id")
    .get(account.getById)
    .put(account.update)
    .delete(account.delete)
};
