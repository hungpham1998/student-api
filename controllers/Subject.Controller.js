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
   
    update(req, res) {
        try {
            Subject.update(
                {
                    Title: req.body.Title,
                    CreaditNumber: req.body.CreaditNumber,
                    Code: req.body.Code,
                    Note: req.body.Note,
                },
                { returning: true, where: { id: req.params.id } }
            )
            return res.json({ Subject, success: true, stauts: 200 });
        }
        catch (err) {
            res.send("can not delete " + err);
        }
    
    },
     
    delete(req, res) {
        const Id = req.params.Id;
        try {
            if (Id) {
                Subject.destroy({
                    where: { id: req.params.id }
                }).then(() => {
                    res.json({
                        success: true,
                        stauts: 200,
                    })
                });
            }
        }
        catch (err) {
            res.status(500).send("can not delete " + err);
        }

    },

    deleteAll(req, res) {
        try {
             Subject.destroy({
                where: {},
                truncate: true
            })
            .then(() => {
                res.send({
                    success: true,
                    stauts: 200,
                })
            })
            .catch((err)=>{
                res.send(err);
            })
           
        }
        catch (err) {
            res.status(500).send("can not delete " + err);
        }

    },

    getById(req, res) {
        Subject.findById(req.params.id).then(Subject => {
            res.send(Subject);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    }
};
