const db = require('../config/db.config.js');
const Student = db.student;
const Subject = db.subject;
const Pointstudent = db.pointstudent;
const Semester = db.semester;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            let pointtp = req.body.PointKT1 + req.body.PointKT2 + req.body.PointGK + req.body.PointCC;
            let pointtb = pointtp / 4.0;
            console.log(pointtb)
            let PointTK = ( pointtb * 3 + req.body.PointT *7 ) / 10.0;
            console.log(PointTK)
            await Pointstudent.create({
                PointCC: req.body.PointCC,
                PointKT1: req.body.PointKT1,
                PointKT2: req.body.PointKT2,
                PointGK: req.body.PointGK,
                PointT: req.body.PointT,
                subjectId: req.body.subjectId,
                studentId: req.body.studentId,
                PointTK: PointTK,
            });
             Pointstudent.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: Student
               }, {
                   model: Subject
               }]
            }).then(Pointstudent => {
                res.json({ Pointstudent})
            }).catch(err => {
                res.send({ status: 500, "Error -> ": err });
            })
            
        }
        catch (err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getAll(req, res) {
        try {
            let pointstudent;
            if (req.body.page) {
                pointstudent = await Pointstudent.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                pointstudent = await Pointstudent.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                    include: [{
                         model: Student
                    }, {
                        model: Subject
                    }]
                        //{
                    //      model: Subject
                    //     }, 
                    //      {
                    //      //   model: Semester
                    //     }]
                });
            }
            return res.json({ pointstudent: pointstudent, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
           let pointtp = req.body.PointKT1 + req.body.PointKT2 + req.body.PointGK + req.body.PointCC;
           let PointTK = (pointtp / 4.0) * 0.3 + (req.body.PointT * 0.7);
          await Pointstudent.update(
                {
                    PointCC: req.body.PointCC,
                    PointKT1: req.body.PointKT1,
                    PointKT2: req.body.PointKT2,
                    PointGK: req.body.PointGK,
                    PointT:req.body.PointT,
                    subjectId: req.body.subjectId,
                    studentId: req.body.studentId,
                    PointTK: PointTK.toFixed(1),
                    // semesterId: req.body.semesterId
                },
              {
                  returning: true, where: { Id: Id },
                  include: [{
                    model: Student
               }, {
                   model: Subject
               }]
              }
           )
           Pointstudent.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [{
                   model: Student
                },{
                 model: Subject
                }]
           }).then((pointstudent) => {
              return res.json({ pointstudent } ); 
           })
            .catch((err) => {
               res.send({err})
           })
        }
        catch (err) {
            res.send({status: 500, "can not update " : Pointstudent, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Pointstudent.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Pointstudent successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Pointstudent.destroy({
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
        Pointstudent.findAll({
            where: { Id: req.params.id },
            include: [
                {
                    model: Student
                }, {
                    model: Subject,
                }],
        }).then(Pointstudent => {
            res.send(Pointstudent);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },


    // getpointStudent(req, res) {
    //     Pointstudent.findAll({
    //         where: { Id: req.params.id },
    //         include: [
    //             {
    //                 model: Student
    //             }, {
    //                 model: Subject,
    //             }],
    //     }).then(Pointstudent => {
    //         res.send(Pointstudent);
    //     }).catch(err => {
    //         res.status(500).send("Error -> " + err);
    //     })
    // }

};
