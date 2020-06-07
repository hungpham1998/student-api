const db = require('../config/db.config.js');
const Student = db.student;
const Chedule = db.chedule;
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
            await Chedule.create({
                Title: req.body.Title,
                Semester: req.body.Semester,
                ClassRoom: req.body.ClassRoom,
                StartTime: req.body.StartTime,
                DuaDate: req.body.DuaDate,
                learnclassId: req.body.learnclassId,
                subjectId: req.body.subjectId,
                accountId: req.body.accountId,
                studentId: req.body.studentId,
                Note: req.body.Note
            }).then(Learnchedule => {
                res.json({ Learnchedule, status: 200 })
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
            let Chedule;
            if (req.body.page) {
                Chedule = await Chedule.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                Chedule = await Chedule.findAndCountAll();
            }
            return res.json({ Chedule: Chedule, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Chedule.update(
                {
                    Title: req.body.Title,
                    Semester: req.body.Semester,
                    ClassRoom: req.body.ClassRoom,
                    StartTime: req.body.StartTime,
                    DuaDate: req.body.DuaDate,
                    learnclassId: req.body.learnclassId,
                    subjectId: req.body.subjectId,
                    accountId: req.body.accountId,
                    studentId: req.body.studentId,
                    Note: req.body.Note
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ Chedule, staust: 200, "updated successfully a Chedule with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Chedule, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Chedule.destroy({ where: { Id: req.params.Id } })
            return res.json({ message: "delete Chedule successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Chedule.destroy({
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
        Chedule.findAll({
            where: { Id: req.params.Id },
            include: [
                {
                    model: Student,
                    attributes: ['id', 'Last_Name', 'Note', 'Frist_Name', 'Address', 'Brithday'],
                }, {
                    model: Subject,
                    attributes: ['Title', 'Code','Note']
                }],
            
        }).then(Chedule => {
            res.send(Chedule);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
