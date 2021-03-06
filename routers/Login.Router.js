"use strict";
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
module.exports = function(router) {
const account = require('../controllers/Account.Controller');
  router
    .route("/auth/signin")
    .post(account.signin);
  router
    .route("/auth/signup")
    .post( account.signup);
};
// [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted],
