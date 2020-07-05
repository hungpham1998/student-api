"use strict";
const multer = require('multer')
const upload = multer({
  dest: './uploads',
  limits: {
    fileSize: 10*1024*1024
  }
})
module.exports = function(router) {
const student = require('../controllers/Student.Controller');
  router
    .route("/student")
    .get(student.getAll)
    .post(upload.single('Image'),student.store)
    // .post([authJwt.verifyToken, authJwt.isPmOrAdmin], student.store)
    // .delete([authJwt.verifyToken, authJwt.isAdmin], student.deleteAll)
  router
    .route("/student/find")
    .get(student.findBy)
  router
    .route("/student/:id/attendancesheet")
    .get(student.getAttendancesheet)
  router
    .route("/student/:id/point")
    .get(student.getPointstudent)
  router
    .route("/student/:id")
    .get(student.getById)
    .put(upload.single('Image'),student.update)
    .delete(student.delete)
    
};
