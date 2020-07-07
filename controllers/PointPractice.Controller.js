const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const LearnYear = db.learnyear;
const Pointstudent = db.pointstudent;
const Pointpractice = db.pointpractice;
const Department = db.department;
const Position = db.position;
const Specailize = db.specailize;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Pointpractice.create({
                Peactice: req.body.Peactice,
                studentId: req.body.studentId,
                semesterId: req.body.semesterId,
                Note: req.body.Note
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
            let pointpracite;
            if (req.body.page) {
                pointpracite = await Pointpractice.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                pointpracite = await Pointpractice.findAll();
            }
            return res.json({ pointpracite: pointpracite, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Pointpractice.update(
                {
                    Peactice: req.body.Peactice,
                    studentId: req.body.studentId,
                    semesterId: req.body.semesterId,
                    Note: req.body.Note
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ Pointpractice, staust: 200, "updated successfully a Pointpractice with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Pointpractice, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Pointpractice.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Pointpractice successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Pointpractice.destroy({
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
        Pointpractice.findOne({
            where: { Id: req.params.id }
        }).then(Pointpractice => {
            res.send(Pointpractice);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
