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
var moment = require('moment');
const position = require('../models/position.js');
module.exports = {
    async store(req, res) {
        try {
            await Position.create({
                Title: req.body.Title,
                Note: req.body.Note
            });
            Position.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then(position => {
                res.json({ position })
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
            let position;
            if (req.body.page) {
                position = await Position.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                position = await Position.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                       ],
                });
            }
            return res.json({ position });
            
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
           );
           Position.findAll({
            order: [
                ['updatedAt', 'DESC'],
               ],
           }).then((position) => {
               return res.json({ position });
           })
            .catch((err) => {
                res.send({
                err
            })
           })
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
        Position.findOne({
            where: { Id: req.params.id }
            // include: [{
            //     model: Account
            // }]
        }).then(Position => {
            res.send(Position);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

    async findByTitle(req, res) {
        let data;
        const title = req.query.Title; 
        try {
            if (title.length === 0 || title === '' || title === null) {
            
                data = await Position.findAndCountAll({})
            }
            else {
                data = await Position.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    }
                })
            }
              return   res.json({ Position: data });
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    }
};
