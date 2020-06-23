"use strict";
module.exports = function (router) {
    const role = require('../controllers/Role.Controller');
    router
        .route("/role")
        .get(role.getAll)
};
