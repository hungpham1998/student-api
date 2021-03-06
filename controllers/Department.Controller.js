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
                IdPartment: req.body.IdPartment
            });
            await Department.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then(Department => {
                res.json({ Department })
            }).catch(err => {
                res.send({ status: 500, "Error -> ": err });
            })
            
        }
        catch (err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getAll(req, res) {
        let department;
        try {
          
            if (req.body.page) {
                department=  await Department.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                })
                res.json({ department: department, status: 200, success: true });
            }
            else {
                department= await Department.findAndCountAll()
                // ).then(department => {
                //     res.json({ department: department, status: 200, success: true });
                // })                
            }
            return res.json({ department: department, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
    async update(req, res) {
        try {
           let department = req.body;
           const Id = req.params.id;
            await Department.update(
                {
                    Title: req.body.Title,
                    Note: req.body.Note,
                    IdPartment: req.body.IdPartment
                },
                { returning: true, where: { id: Id } }
            );
            await Department.findAll({
                order: [
                    ['updatedAt', 'DESC'],
                ],
            }).then((department) => {
                return res.json({ department: department } ); 
            })
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

    getAccountById(req, res) {
        const Id = req.params.id
        Department.findAll({
            where: { Id: Id },
            include: [{
                model: Account
            }]
        }).then(Department => {
            const departmentObj  = Department.map(department => {
              
                return Object.assign(
                    {},
                    {
                        Id: department.Id,
                        IdParmanet: department.IdParmanet,
                        Title: department.Title,
                        Note: department.Note,
                        Accounts: department.accounts.map(account => {
                            return Object.assign(
                                {},
                                {
                                  
                                    Id: account.Id,
                                    Account: account.Account,
                                    Image: account.Image,
                                    Mail: account.Mail,
                                    Address: account.Address,
                                    Department_Id: account.Department_Id,

                                }
                            )
                        })
                    })
            })
            res.json({ department: departmentObj, status: 200, success: true });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    },

    async findByTitle(req, res) {
        let data;
        try {
            const title = req.query.Title; 
            if (title.length === 0 || title === '' || title === null) {
            
                    data = await Department.findAndCountAll({})
            }
            else {
                data = await Department.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    }
                })
            }
            
         
            return   res.json({ Department: data, status: 200, success: true });
            
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

    getById(req, res) {
        Department.findAll({
            where: { Id: req.params.id }
        }).then(Department => {
            res.send(Department);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
