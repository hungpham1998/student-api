"use strict";
const multer = require('multer')
const upload = multer({
  dest: './uploads',
  limits: {
    fileSize: 10*1024*1024
  }
})

module.exports = function (router) {
  const account = require('../controllers/Account.Controller');
  router
    .route("/account")
    .get(account.getAll)
    .post(upload.single('Image'), account.store)
  router
    .route("/account/:id")
    .get(account.getById)
    .put(account.update)
    .delete(account.delete)
};
