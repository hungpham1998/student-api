const db = require('../config/db.config')
const Student = db.student;
const Subject = db.subject;
const Learnclass = db.learnclass;
const Learnyear = db.learnyear;
const Pointstudent = db.pointstudent;
const Specailized = db.specailized;
const Account = db.account;
const Attendancesheet = db.attendancesheet;
const { Op } = require("sequelize");
var moment = require('moment');

module.exports = {
    async store(req, res) {
        try {     
            await Student.create({
                Frist_Name: req.body.Frist_Name,
                Last_Name: req.body.Last_Name,
                Image: req.body.Image,
                Address: req.body.Address,
                Brithday: req.body.Brithday,
                Note: req.body.Note,
                Code: req.body.Code,
                learnclassId: req.body.learnclassId
            });
             Student.findAll({
                order: [
                    ['createdAt', 'DESC'],
                   ],
                 include: [
                    {
                            model: Learnclass,
                    
                    }]
                }).then((student) => {
                    return res.send({
                        student
                    }); 
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
                student = await Student.findAll({
                    include: [
                        {
                            model: Learnclass,
                            include: [
                                {
                                    model: Specailized,
                            
                                }]
                        }]
                });
            }
            return res.json({ student: student, status: 200,success: true });
            
        }
        catch(err) {
            res.send("Error -> " + err);
        }
    },

    async getById(req, res) {
        const Id = req.params.id;
        await Student.findAll({
            where: { Id: req.params.id }
        }).then(Student => {
            res.send(Student);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
   
    },

   async update(req, res) {
        try {
            const Id = req.params.id;
          await Student.update(
                {
                    Frist_Name: req.body.Frist_Name,
                    Last_Name: req.body.Last_Name,
                    Image: req.body.Image,
                    Address: req.body.Address,
                    Brithday: req.body.Brithday,
                    Note: req.body.Note,
                    Code: req.body.Code,
                    learnclassId: req.body.learnclassId
                },
                {
                    returning: true, where: { id: Id },
                    include: [
                    {
                            model: Learnclass,
                    
                    }]
                }
                
            )
            await Student.findAll({
                order: [
                    ['updatedAt', 'DESC'],
                ],
                include: [
                    {
                            model: Learnclass,
                    
                    }]
                }).then((student) => {
                        return res.send({
                            student
                        }); 
                    })
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

    async  getPointstudent(req, res)  {
        const Id = req.params.id;
        await Student.findAll({
            where: {
                Id: req.params.id,
            },
            include: [{ model: Learnclass},
                {
                    where:{studentId:Id},
                    model: Pointstudent,
                    include: [
                        {
                            model: Subject,
                        }, {
                            model: Learnyear,
                        }]
                }]
        }).then(Student => {
            res.send(Student);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    },

   async getAttendancesheet(req, res) {
        const Id = req.params.id;
        await Student.findAll({
            where: {
                Id: req.params.id,
            },
            include: [
                {
                    where:{studentId:Id},
                    model: Attendancesheet,
                    include: [
                        {
                            model: Subject,
                        }, {
                            model: Account,
                        }]
                }]
        }).then(Student => {
            res.send(Student);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
    }
    
};
