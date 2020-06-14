const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const LearnYear = db.learnyear;
const Pointstudent = db.pointstudent;
const Department = db.department;
const Position = db.position;
const Specailize = db.specailize;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Pointstudent.create({
                PontCC: req.body.PontCC,
                PointKT1: req.body.PointKT1,
                PointKT2: req.body.PointKT2,
                PointGK: req.body.PointGK,
                PointT: req.body.PointT,
                subjectId: req.body.subjectId,
                studentId: req.body.studentId,
                learnyearId: req.body.learnyearId
            }).then(Pointstudent => {
                res.json({ Pointstudent, status: 200 })
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
                pointstudent = await Pointstudent.findAll();
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
          await Pointstudent.update(
                {
                    PontCC: req.body.PontCC,
                    PointKT1: req.body.PointKT1,
                    PointKT2: req.body.PointKT2,
                    PointGK: req.body.PointGK,
                    PointT: req.body.PointT,
                    subjectId: req.body.subjectId,
                    studentId: req.body.subjectId,
                    learnyearId: req.body.learnyearId
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ Pointstudent } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : LearnYear, "error": err });
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
            attributes: ['id','PontCC', 'PointKT1', 'PointKT2','PointGK','PointT'],
            include: [
                {
                    model: Student,
                    attributes: ['id','Last_Name', 'Note', 'Frist_Name','Address','Brithday'],   
                }, {
                    model: Subject,
                }],
        }).then(Pointstudent => {
            res.send(Pointstudent);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
