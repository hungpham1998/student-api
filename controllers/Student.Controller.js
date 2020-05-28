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
            //let Code = `${req.body.Brithday.moment().format('YYYYMMDD')} + ${Last_Name}`
            await Student.create({
                Frist_Name: req.body.Frist_Name,
                Last_Name: req.body.Last_Name,
                Image: req.body.Image,
                Adress: req.body.Adress,
                Brithday: req.body.Brithday,
                Note: req.body.Note,
                Code: req.body.Code
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
    //     try {
    //         let student;
    //         if (req.params.id) {
    //              student = await Student.findById(
    //                 {
    //                     where: {
    //                         id: req.parmas.id
    //                     },
    //                     attributes: ['id','Title', 'Note', 'Department_Id'],
	// 	                include: [{
    //                         model: Learnchedule, as: 'learnchedule',
    //                         duplicating: false,
    //                         required: true,
    //                         where: {
    //                             Student_Id: req.parmas.id
    //                         },
    //                         attributes: ['Semester', 'Title', 'ClassRoom', 'StartTime', 'DuaDate'],
    //                         include: [
    //                             {
    //                             model: Account,as: 'teachers',
    //                             duplicating: false,
    //                             required: true,
    //                             attributes: ['UserName','Maill','Image'],
    //                             include: [
    //                             {
    //                                 model: Department,as:'despartments',
    //                                 duplicating: false,
    //                                 required: true,
    //                                 where: {
    //                                     Department_Id: db.Sequelize.col('departments.id')
    //                                 },
    //                                 attributes: ['Title','Note'],
    //                             },
    //                             {
    //                                 model: Position, as: 'postions',
    //                                 duplicating: false,
    //                                 required: true,
    //                                 where: {
    //                                     Position_Id: db.Sequelize.col('departments.id')
    //                                 },
    //                                 attributes: ['Title','Note'],
                                    
    //                                 }
    //                             ]
    //                             },
    //                             {
    //                                 model: Subject, as: 'trainings',
    //                                 duplicating: false,
    //                                 required: true,
    //                                 where:{Subject_Id : db.Sequelize.col('subjects.id')},
    //                                 attributes: ['Title','Note','Code','CreaditNumber'],
    //                                 include: [{
    //                                     model: Pointstudent, as: 'tablepoints',
    //                                     duplicating: false,
    //                                     required: true,
    //                                     where: { Subject_Id: db.Sequelize.col('pointstudents.id') },
    //                                     attributes: ['PontCC','PointKT1','PointKT2','PointGK','PointT']
    //                                 }]
    //                             },
    //                             {
    //                                 model: Learnclass, as: 'classlearns',
    //                                 duplicating: false,
    //                                 required: true,
    //                                 where: {
    //                                     Class_Id: db.Sequelize.col('learnclasses.id')
    //                                 },
    //                                 attributes: ['Code', 'Title', 'Note'],
    //                                 include:[{
    //                                     model: Specailize, as: 'specailizes',
    //                                     duplicating: false,
    //                                     required: true,
    //                                     where: {
    //                                         Specailize_Id: db.Sequelize.col('specailizes.id')
    //                                     },
    //                                     attributes: ['Code', 'Title', 'Note'],
    //                                 }]
                                    
                            
                                
    //                         }]
    //                     }
    //                     ],
    //                 }
    //             )
    //         }
    //         return res.json({
    //             student:student,
    //             status: 200,
    //             success:true
    //             })
    //     }
    //     catch (err) {
    //         res.send('error  not data ' + req.params.id + err);
    //     }
        await Student.findById({
            where: {
                id: req.pramas.id
            }
        }
     ).then(Student => {
        res.send(Student);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
    },

    update(req, res) {
        const id = req.pramas.id;
        try {
            Student.update(
                {
                    Frist_Name: req.body.Frist_Name,
                    Last_Name: req.body.Last_Name,
                    Image: req.body.Image,
                    Adress: req.body.Adress,
                    Brithday: req.body.Brithday,
                    Note: req.body.Note,
                    Code: req.body.Code
                },
                { returning: true, where: { id: req.params.id } }
            )
            return res.status(200).send("updated successfully a Student with id = " + Id).json(Student); 
        }
        catch (err) {
            res.send("can not delete " + err);
        }
    
    },
     
    delete(req, res) {
        const Id = req.params.Id;
        try {
            if (Id) {
                Student.destroy({
                    where: { Id: Id }
                }).then(() => {
                    res.status(200).send('deleted successfully a customer with id = ' + Id);
                });
            }
        }
        catch (err) {
            res.status(500).send("can not delete " + err);
        }

    },

    deleteAll(req, res) {
        try {
             Subject.destroy({
                where: {},
                truncate: true
            })
            .then(() => {
                res.send({
                    success: true,
                    stauts: 200,
                })
            })
            .catch((err)=>{
                res.send(err);
            })
           
        }
        catch (err) {
            res.status(500).send("can not delete " + err);
        }

    }
};
