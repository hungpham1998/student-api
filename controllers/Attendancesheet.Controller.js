const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const LearnYear = db.learnyear;
const Attendancesheet = db.attendancesheet;
const Account = db.account;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Attendancesheet.create({
                Times: req.body.Times,
                TimesDate: req.body.TimesDate,
                Note: req.body.Note,
                accountId: req.body.accountId.length > 0 ? req.body.accountId : null,
                subjectId: req.body.subjectId.length > 0 ? req.body.subjectId :  null,
                studentId: req.body.studentId.length > 0 ? req.body.studentId : null
            });
            Attendancesheet.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: Student
                 },{
                     model: Subject
                 }, 
                  {
                     model: Account
                 }]
            }).then(attendencesheet => {
                res.json({ attendencesheet})
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
            let attendancesheet;
            if (req.body.page) {
                attendancesheet = await Attendancesheet.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
               return  res.json({ attendancesheet })
            }
            else {
                attendancesheet = Attendancesheet.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                    include: [{
                        model: Student
                    }, {
                        model: Subject
                    },
                    {
                        model: Account
                    }]
                }).then((attendancesheet) => {
                    return   res.json({ attendancesheet });
                })
            }
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Attendancesheet.update(
                {
                    Times: req.body.Times,
                    TimesDate: req.body.TimesDate,
                    Note: req.body.Note,
                    accountId: req.body.accountId,
                    subjectId: req.body.subjectId,
                    studentId: req.body.studentId
                },
              {
                  returning: true, where: { Id: Id },
                  include: [{
                    model: Student
                 },{
                     model: Subject
                 }, 
                  {
                     model: Account
                 }]
              }
           )
           Attendancesheet.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [{
                model: Student
             },{
                 model: Subject
             }, 
              {
                 model: Account
             }]
           }).then((attendancesheet) => {
              return res.json({ attendancesheet } ); 
           })
            .catch((err) => {
               res.send({err})
           })
        }
        catch (err) {
            res.send({status: 500, "can not update " : Attendancesheet, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Attendancesheet.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete Pointstudent successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

//  deleteAll(req, res) {
//         try {
//              await Attendancesheet.destroy({
//                 where: {},
//                 truncate: true
//             })
//             return res.send({  success: true,    stauts: 200,});
//         }
//         catch (err) {
//            return  res.status(500).send("can not delete " + err);
//         }

//     },

    getById(req, res) {
        Attendancesheet.findAll({
            where: { Id: req.params.id }
        }).then(attendancesheet => {
            res.send(attendancesheet);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

};
