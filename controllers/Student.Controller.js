const db = require('../config/db.config')
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
            await Student.create({
                Frist_Name: req.body.Frist_Name,
                Last_Name: req.body.Last_Name,
                Image: req.body.Image,
                Adress: req.body.Adress,
                Brithday: req.body.Brithday,
                Note: req.body.Note,
                Code: req.body.Code,
                learnclassId: req.body.learnclassId
            }).then(newstudent => {
                res.json({
                    newstudent,
                    status: 200})
            }).catch(err => {
                res.send({ status: 500, "Error -> ": err });
            })
           
        }
        catch (err){
                res.status(500).send("Error -> " + err);
            }
    },

   async getAll(req, res) {
        try {
            let student;
            if (req.body.page) {
                student = await Student.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                student = await Student.findAll();
            }
            return res.json({ student: student, status: 200,success: true });
            
        }
        catch(err) {
            res.send("Error -> " + err);
        }
    },

    async getById(req, res) {
        const Id = req.params.id;
        try {
            let student;
            if (req.params.id) {
                 student = await Student.findOne(
                    {
                        where: {
                            id: Id
                        },
                      
                    }
                )
            }
            return res.json({ student: student, status: 200, success: true });
        }
        catch (err) {
            res.send('error  not data ' + Id + err);
        }
   
    },

    update(req, res) {
        try {
            const Id = req.params.id;
            Student.update(
                {
                    Frist_Name: req.body.Frist_Name,
                    Last_Name: req.body.Last_Name,
                    Image: req.body.Image,
                    Adress: req.body.Adress,
                    Brithday: req.body.Brithday,
                    Note: req.body.Note,
                    Code: req.body.Code,
                    learnclassId: req.body.learnclassId
                },
                { returning: true, where: { id: Id } }
            )
            return res.json({status: 200,Student}); 
        }
        catch (err) {
            res.send("can not delete " + err);
        }
    
    },
     
   async  delete(req, res) {
    try {
            
        await Student.destroy({ where: { id: req.params.id } })
        return res.json({ message: "delete subject successfully!", status: 200 });
    }
    catch (err) {
      return  res.send({ error, status: 400 })
    }

    },

    deleteAll(req, res) {
        try {
             Subject.destroy({
                where: {},
                truncate: true
            })
           return  res.send({  success: true, stauts: 200});
        }
        catch (err) {
            return res.send({ status: 500, "can not delete ": err });
        }

    },
    
};
