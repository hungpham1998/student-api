
// const Student = require('../models/student');
const db = require('../config/db.config.js');
const Student = db.student;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        console.log(req.body)
        try {     
            //let Code = `${req.body.Brithday.moment().format('YYYYMMDD')} + ${Last_Name}`
            const newstudent = await Student.create({
                Frist_Name: req.body.Frist_Name,
                Last_Name: req.body.Last_Name,
                Image: req.body.Image,
                Adress: req.body.Adress,
                Brithday: req.body.Brithday,
                Note: req.body.Note,
                Code:  req.body.Code
            })
         .then((newstudent) => {
                console.log(newstudent);
             res.json({ newstudent })
            });
             
        }
        catch (err){
                res.status(500).send("Error -> " + err);
            }
    },

    getAll(req, res) {
        try {
            Student.findAndCountAll()
                .then(Student => {
                    res.json({
                        Student,
                        status: 200,
                    });
                })
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

    getById(req, res) {
        try {
            if (req.params.Id) {
                Student.findById(req.parmas.Id).then((err, Student) => {
                    if (err) throw err;
                    res.json(Student);
                })
            }
        }
        catch (err) {
            res.send('error  not data ' + req.params.Id + err);
        }
    },

    update(req, res) {
        const Id = req.params.Id;
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
                { returning: true, where: { id: id } }
            )
                .then((result) => {
                    console.log("data was Updated");
                    res.status(200).send("updated successfully a Student with id = " + Id).json(result)
                })
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

    }
};
