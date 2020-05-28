"use strict";
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
module.exports = function(router) {
const account = require('../controllers/Account.Controller');
  router
    .route("/auth/signin")
    .post(account.signin);
  router
    .route("/api/auth/signup")
    .post([verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], account.signup);
};
