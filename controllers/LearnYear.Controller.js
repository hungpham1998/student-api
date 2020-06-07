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
            await LearnYear.create({
                Title: req.body.Title,
                Note: req.body.Note
            }).then(LearnYear => {
                res.json({ LearnYear, status: 200 })
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
            let LearnYear;
            if (req.body.page) {
                LearnYear = await LearnYear.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                LearnYear = await LearnYear.findAll();
            }
            return res.json({ LearnYear: LearnYear, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await LearnYear.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ LearnYear, staust: 200, "updated successfully a LearnYear with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : LearnYear, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await LearnYear.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete LearnYear successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await LearnYear.destroy({
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
        LearnYear.findOne({
            where: { Id: req.params.id }
        }).then(LearnYear => {
            res.send(LearnYear);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
