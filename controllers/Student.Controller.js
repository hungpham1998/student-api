const db = require('../config/db.config')
const Student = db.student;
const Subject = db.subject;
const Learnclass = db.learnclass;
const Learnyear = db.learnyear;
const Pointstudent = db.pointstudent;
const Specailized = db.specailized;
const Account = db.account;
const Attendancesheet = db.attendancesheet;
const Semester = db.semester;
const { Op } = require("sequelize");
var moment = require('moment');

module.exports = {
    async store(req, res) {
        try {     
            await Student.create({
                Frist_Name: req.body.Frist_Name,
                Last_Name: req.body.Last_Name,
                Image: req.file.filename,
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
            where: { Id: Id }
        }).then(student => {
            let Student = [];
            student.forEach((element) => {
                Student.push({
                    ...element,
                    ...element.Image = '/uploads/'+ element.Image
                })
            });
            res.json({student});
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
                    Image: req.file.filename,
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
        let pointtb;
        let countPoint = 0;
        let countCreaditNumber = 0;
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
                            include: [
                                {
                                    model: Semester,
                                }
                            ]
                            
                        }]
                }]
        }).then(student => {
            let Student;
            student[0].pointstudents.forEach((item) => {
                if (item.PointTK < 4) {
                    pointtb = item.subject.CreaditNumber * 0;
                }
                if (4.0 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 5.0) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 1.0;
                }
                if (5.0 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 5.5) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 1.5;
                }
                if (5.5 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 6.5) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 2.0;
                }
                if (6.5 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 7.0) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 2.5;
                }
                if (7.0 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 8.0) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 3.0;
                }
                if (8.0 <= item.PointTK.toFixed(1) && item.PointTK.toFixed(1) < 8.5) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 3.5;
                }
                if (8.5 <= item.PointTK.toFixed(1)) {
                    pointtb = item.subject.CreaditNumber.toFixed(1) * 4.0;
                }
                return countPoint = countPoint + pointtb, countCreaditNumber = item.subject.CreaditNumber + countCreaditNumber;
            });
            let accumulation = (countPoint / countCreaditNumber).toFixed(2);
            Student = {
                student,
                countCreaditNumber: countCreaditNumber,
                accumulation: accumulation
            }
            res.send({Student});
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
    },
   
    async findBy(req, res) {
        const Frist_Name = req.query.Frist_Name;
        const Last_Name = req.query.Last_Name;
        const Title = req.query.Title;
        const Address = req.query.Address;
        const Code = req.query.Code;
        let student;

        const where = {}
        const where_join = {}
        // if (!Title) {
        //     where.Title = Title;
        // }
        if (Last_Name) {
            where.Last_Name = Last_Name;
        }
        try {
          
       console.log(Last_Name)
            student =   await Student.findAndCountAll({
                where,
                returning: true,
                // include: [
                //     {
                //         where: {
                //             $or: [{ Title: { $like: Title } },
                //                   { Title: { $like: null } }]
                //         },
                //         model: Learnclass,
                //     }]
            })
            return res.json({ student });
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
   }
    
};
