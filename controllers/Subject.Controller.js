const db = require('../config/db.config.js');
const Student = db.student;
const Chedule = db.chedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Department = db.department;
const Position = db.position;
const Specailize = db.specailize;
const Learnyear = db.learnyear;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Subject.create({
                Title: req.body.Title,
                CreaditNumber: req.body.CreaditNumber,
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
            let subject;
            if (req.body.page) {
                subject = await Subject.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                subject = await Subject.findAll();
            }
            return res.json({ subject: subject, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Subject.update(
                {
                    Title: req.body.Title,
                    CreaditNumber: req.body.CreaditNumber,
                    Note: req.body.Note,
                    Code: req.body.Code
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ Subject, staust: 200, "updated successfully a Student with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Subject, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Subject.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete subject successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Subject.destroy({
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
        Subject.findAll({
            where: { Id: req.params.id },
            
            include: [{
                model: Chedule,
                include: [{
                    model: Student,
                    attributes: ['id','Last_Name', 'Note', 'Frist_Name','Address','Brithday'],   
                }, {
                    model: Subject,
                        attributes: ['id', 'Note', 'Title', 'Code'],
                        include: [{ model: Learnyear, }]
                    }, {
                    model: Account,
                    }, {
                    model: Learnclass
                }],
            }],
        }).then(Subject => {
            res.send(Subject);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
    findByTitle(req, res) {
        const title = req.params.title; 
        Subject.findAll({
            where: {Title: title }
        }).then(Subject => {
            res.json({ Subject: Subject, status: 200, success: true });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    }

};
