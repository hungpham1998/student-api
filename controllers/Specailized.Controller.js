const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Specailized = db.specailized;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Specailized.create({
                Title: req.body.Title,
                Code: req.body.Code,
                Note: req.body.Note,
            });
             Specailized.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then(specailized => {
                res.json({ specailized })
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
            let specailized;
            if (req.body.page) {
                specailized = await Specailized.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                specailized = await Specailized.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            }
            return res.json({ specailized, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Specailized.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note,
                    Code: req.body.Code
                },
                { returning: true, where: { Id: Id } }
            )
            await Specailized.findAll({
                }).then((specailized) => {
                return res.send({
                    specailized
                }); 
                    })
        }
        catch (err) {
            res.send({status: 500, "can not update " : Specailize, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Specailized.destroy({
                where: { Id: req.params.id }
            })
            return res.json({ message: "delete Specailize successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Specailized.destroy({
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
        Specailized.findAll({
            where: { Id: req.params.id },
        }).then(Specailized=> {
            res.send(Specailized);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
    
    async findByTitle(req, res) {
        let data;
        try {
            const title = req.query.Title; 
            if (title.length === 0 || title === '' || title === null) {
            
                    data = await Specailized.findAndCountAll({})
            }
            else {
                data = await Specailized.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    }
                })
            }
                return   res.json({ Specailized: data });
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    }
};
