const db = require('../config/db.config.js');
const Student = db.student;
const Chedule = db.chedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Department = db.department;
const Position = db.position;
const Specailized = db.specailized;
const { Op } = require("sequelize");
// const sqs = require('sequelize-querystring')
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Learnclass.create({
                Title: req.body.Title,
                Note: req.body.Note,
                SpecailizedId: req.body.SpecailizedId
            }).then(Learnclass => {
                res.json({ learnclass:Learnclass, status: 200 })
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
            let learnclass;
            if (req.body.page) {
                learnclass = await Learnclass.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                learnclass = await Learnclass.findAndCountAll({
                    include: [
                        {
                            model: Specailized,
                           
                        }],
                }
                );
            }
            return res.json({ learnclass: learnclass, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           let learnclass = req.body;
           const Id = req.params.id;
          await Learnclass.update(
                {
                  Title: req.body.Title,
                  Note: req.body.Note,
                  Specailize_Id: req.body.SpecailizeId
                },
                { returning: true, where: { Id: Id } }
            )
            return res.json({ learnclass: learnclass} ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : learnclass, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Learnclass.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Learnclass successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Learnclass.destroy({
                where: {},
                truncate: true
            })
            return res.send({  success: true,    stauts: 200,});
        }
        catch (err) {
           return  res.status(500).send("can not delete " + err);
        }

    },

    getstudentById(req, res) {
        Learnclass.findAll({
            where: { Id: req.params.id },
            attributes: ['id','Title', 'Note', 'specailizedId'], 
            include: [
            {
                model: Student,
                attributes: ['id','Last_Name', 'Note', 'Frist_Name','Address','Brithday'],   
            }],
                
        }).then(Learnclass => {
            res.send(Learnclass);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

    async findByTitle(req, res) {
        let data;
        try {
            const title = req.query.Title; 
            if (title.length === 0 || title === '' || title === null) {
            
                    data = await Learnclass.findAndCountAll({})
            }
            else {
                data = await Learnclass.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    }
                })
            }
            return   res.json({ Learnclass: data, status: 200, success: true });
            
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

   getById(req, res) {
        Learnclass.findAll({
            where: { Id: req.params.id }
        }).then(Department => {
            res.send(Department);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
};
