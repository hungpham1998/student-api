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
            await Department.create({
                Title: req.body.Title,
                Note: req.body.Note,
                IdParmanet: req.body.IdParmanet
            }).then(Department => {
                res.json({ Department, status: 200 })
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
            let department;
            if (req.body.page) {
                department = await Department.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                department = await Department.findAll();
            }
            return res.json({ department: department, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Department.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note,
                    IdParmanet: req.body.IdParmanet
                },
                { returning: true, where: { id: Id } }
            )
            return res.json({ Department, staust: 200, "updated successfully a Student with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Subject, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Department.destroy({ where: { id: req.params.id } })
            return res.json({ message: "delete subject successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Department.destroy({
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
        const Id = req.params.id
        Department.findOne({
            where: { id: Id },
            include: [{
                model: Account, as: 'Employees',
                duplicating: false,
                required: true,
                attributes: ['UserName', 'Maill', 'Image', 'Adress',],
                where: { Department_Id: db.Sequelize.col('departments.id') },
                include: [
                    {
                        model: Position, as: 'postions',
                        duplicating: false,
                        required: true,
                        where: {
                            Position_Id: db.Sequelize.col('positions.id')
                        },
                        attributes: ['Title', 'Note'], 
                    }
                ]
            }]
        }).then(Department => {
            res.send(Department);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    },

};
