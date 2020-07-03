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
                specailizedId: req.body.specailizedId
            })
            await Learnclass.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [
                    {
                        model: Specailized,
                    
                    }]
                }).then((learnclass) => {
                    return res.send({
                        learnclass
                    }); 
                })
        }
            
        catch (err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getAll(req, res) {
        try {
            let learnclass;
            if (req.query.page) {
                learnclass = await Learnclass.findAndCountAll({
                    offset: 10 * (req.query.page - 1),
                    limit:  10,  
                    include: [
                        {
                            model: Specailized,      
                        }],
                });
            }
            else {
                learnclass = await Learnclass.findAll({
                    include: [
                        {
                            model: Specailized,      
                        }],
                });
            }
            return res.json({ learnclass });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
        try {
            const Id = req.params.id;
          await Learnclass.update(
                {  Title: req.body.Title,
                    Note: req.body.Note,
                    specailizedId: req.body.specailizedId
                },
                {
                    returning: true, where: { id: Id },
                    include: [
                    {
                            model: Specailized,
                    
                    }]
                }
                
            )
            await Learnclass.findAll({
                order: [
                    ['updatedAt', 'DESC'],
                ],
                include: [
                    {
                        model: Specailized,
                    
                    }]
                }).then((learnclass) => {
                        return res.send({
                            learnclass
                        }); 
                    })
        }
        catch (err) {
            res.send("can not delete " + err);
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
            attributes: ['Id','Title', 'Note', 'specailizedId'], 
            include: [
            {
                model: Student,
                attributes: ['Id','Last_Name','Note', 'Frist_Name','Address','Brithday','Image'],   
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
            where: { Id: req.params.id },
            include: [
                {
                    model: Student,
                    attributes: ['Id','Last_Name', 'Code', 'Frist_Name','Address','Brithday'],   
                }],
        }).then(Department => {
            res.send(Department);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
};
