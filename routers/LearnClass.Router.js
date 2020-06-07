"use strict";
module.exports = function(router) {
const learnclass = require('../controllers/LearnClass.Controller');
  router
    .route("/learnclass")
    .get(learnclass.getAll)
    .post(learnclass.store)
    .delete(learnclass.deleteAll)
  router 
    .route("/learnclass/find")
    .get(learnclass.findByTitle)
  router
    .route("/learnclass/:id")
    .get(learnclass.getById)
    .put(learnclass.update)
    .delete(learnclass.delete)
//   router
//     .route("/learnclass/findbytitle")
//     .get(learnclass.getByTitle)
    
};
