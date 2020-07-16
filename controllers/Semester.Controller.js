const db = require('../config/db.config.js');
const LearnYear = db.learnyear;
const Semester = db.semester;
const Subject = db.subject;
const Pointstudent = db.pointstudent;
const Attendancesheet = db.attendancesheet;
const Student = db.student;
const Account = db.account;
const { Op } = require("sequelize");
var moment = require('moment');

module.exports = {
    async store(req, res) {
        try {
            await Semester.create({
                Title: req.body.Title,
                Note: req.body.Note,
                Code: req.body.Code,
                learnyearId: req.body.learnyearId
            });

            Semester.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{ model: LearnYear }]
            }).then((semester) => {
                res.json({ semester})
            })
            .catch(err => {
                res.send({ status: 500, "Error -> ": err });
            })
            
        }
        catch (err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getAll(req, res) {
        try {
            let semester;
            if (req.body.page) {
                semester = await Semester.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15,
                    include: [{ model: LearnYear }]
                });
            }
            else {
                semester = await Semester.findAndCountAll({
                    include: [{ model: LearnYear }]
                });
            }
            return res.json({ semester });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
           await Semester.update(
               {
                   Title: req.body.Title,
                   Note: req.body.Note,
                   Code: req.body.Code,
                   learnyearId: req.body.learnyearId
               },
               { returning: true, where: { Id: Id } }
           );
           await Semester.findAll({
            order: [
                ['updatedAt', 'DESC'],
               ],
               include: [{
                   model: LearnYear
               }]
           }).then((semester) => {
            return res.json({ semester} );
           }) 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Semester, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Semester.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Semester successfully!"});
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Semester.destroy({
                where: {},
                truncate: true
            })
            return res.send({  success: true,    stauts: 200,});
        }
        catch (err) {
           return  res.status(500).send("can not delete " + err);
        }

    },

    getById(req, res) {
        Semester.findOne({
            where: { Id: req.params.id }
        }).then(semester => {
            res.send(semester);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

    async findByTitle(req, res) {
        let semester;
        try {
            const title = req.query.Title; 
            if (title.length === 0 || title === '' || title === null) {
            
                semester = await Semester.findAndCountAll({
                    include: [{
                        model: LearnYear
                    }]
                })
            }
            else {
                semester = await Semester.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    },
                    include: [{
                        model: LearnYear
                    }]
                })
            }
            return  res.json({ semester});
            
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getBySubject(req, res) {
        //const Id = req.params.id;
        let studentId = req.query.studentid;
        let semester;
        try {
            semester = await Semester.findAll({
                // where: { Id: Id },
                include: [{
                    model: LearnYear
                }, {
                        model: Subject,
                        include: [{
                            model: Pointstudent,
                            where: {studentId:studentId }
                            // include: [{
                            //     model: Semester,
                            // }]
                        }]
                }
              ]
            }).then(Semester => {
                let pointstudent=0;
                let semester = {};
                Semester.forEach(item => {
                    item.subjects.forEach(point => {
                        pointstudent = pointstudent + point.pointstudents[0].PointTK
                    })
                    
                }) 
                semester = {
                    Semester,
                    pointstudent
                }
                res.send({ Semester });
                // res.send({
                //     "Student": {
                //         "student": [
                    
                // ]} });
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            })

         }
        catch (err) {
            res.send(err);
        }
    },
    async getByIdIdSubject(req, res) {
        const Id = req.params.id;
        let studentId = req.query.studentid;
        let semester;
        try {
            semester = await Semester.findAll({
                where: { Id: Id },
                include: [{
                    model: LearnYear
                }, {
                        model: Subject,
                        include: [{
                            model: Pointstudent,
                            where: {studentId:studentId },
                            include: [{
                                model: Subject,
                            }]
                        }]
                }
              ]
            }).then(semester => {
                let pointstudent=0;
                let Semester = [];
                semester.forEach(item => {
                    item.subjects.forEach(point => {
                        point.pointstudents.map(data => {
                            Semester.push(data)
                        })
                    })
                    
                }) 
                semester = {
                    Semester,
                    pointstudent
                }
                res.send({ Semester });
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            })

         }
        catch (err) {
            res.send(err);
        }
    },

    async getAttendancesheet(req, res) {
        const Id = req.query.studentId;
        await Semester.findAll({
            include: [
                {
                    model: Subject,
                    include: [
                        {
                            where:{studentId: Id},
                            model: Attendancesheet,
                            include: [{ model: Account}]
                        }]
                }]
        }).then(Semester => {
            let  attendancesheets =[]
            // Student.forEach((item) => {
            //     attendancesheets.push(item.attendancesheets)
            // })
            console.log(Semester)
            res.send(Semester);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    },
};
