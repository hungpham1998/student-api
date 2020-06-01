const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Department = db.department;
const Position = db.position;
const Specailize = db.specailize;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Specailize.create({
                Title: req.body.Title,
                Code: req.body.Code,
                Note: req.body.Note,
            }).then(subject => {
                res.json({ subject, status: 200 })
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
            let specailize;
            if (req.body.page) {
                specailize = await Specailize.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                specailize = await Specailize.findAll();
            }
            return res.json({ specailize: specailize, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Specailize.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note,
                    Code: req.body.Code
                },
                { returning: true, where: { id: Id } }
            )
            return res.json({ Subject, staust: 200, "updated successfully a Specailize with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Specailize, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Specailize.destroy({ where: { id: req.params.id } })
            return res.json({ message: "delete Specailize successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Specailize.destroy({
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
        Specailize.findOne({
            where: { id: req.params.id }
        }).then(Specailize => {
            res.send(Specailize);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
