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
            await Position.create({
                Title: req.body.Title,
                Note: req.body.Note
            }).then(Position => {
                res.json({ Position, status: 200 })
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
            let Position;
            if (req.body.page) {
                Position = await Position.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                Position = await Position.findAll();
            }
            return res.json({ Position: Position, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Position.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ Position, staust: 200, "updated successfully a Position with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Position, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Position.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Position successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Position.destroy({
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
            where: { Id: req.params.id },
            include: [{
                model: Account
            }]
        }).then(Specailize => {
            res.send(Specailize);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
    getBiTitle(req, res) {
        const title = req.params.title; 
        Specailize.findAll({
            where: {Title: title }
        }).then(Specailize => {
            
            res.json({ Specailize: Specailize, status: 200, success: true });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    }

};
