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
            await Learnchedule.create({
                Title: req.body.Title,
                Semester: req.body.Semester,
                ClassRoom: req.body.ClassRoom,
                StartTime: req.body.StartTime,
                DuaDate: req.body.DuaDate,
                Class_Id: req.body.Class_Id,
                Subject_Id: req.body.Subject_Id,
                Acount_Id: req.body.Acount_Id,
                Student_Id: req.body.Student_Id,
                Year_Id: req.body.Year_Id,
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
            let learnchedule;
            if (req.body.page) {
                learnchedule = await Learnchedule.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                learnchedule = await Learnchedule.findAll();
            }
            return res.json({ learnchedule: Learnchedule, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Learnchedule.update(
                {
                    Title: req.body.Title,
                    Semester: req.body.Semester,
                    ClassRoom: req.body.ClassRoom,
                    StartTime: req.body.StartTime,
                    DuaDate: req.body.DuaDate,
                    Class_Id: req.body.Class_Id,
                    Subject_Id: req.body.Subject_Id,
                    Acount_Id: req.body.Acount_Id,
                    Student_Id: req.body.Student_Id,
                    Year_Id: req.body.Year_Id,
                    Note: req.body.Note
                },
                { returning: true, where: { id: Id } }
            )
            return res.json({ Learnchedule, staust: 200, "updated successfully a LearnYear with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Learnchedule, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Learnchedule.destroy({ where: { id: req.params.id } })
            return res.json({ message: "delete Learnchedule successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Learnchedule.destroy({
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
        Learnchedule.findOne({
            where: { id: req.params.id }
        }).then(Learnchedule => {
            res.send(Learnchedule);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
