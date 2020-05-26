
// const student = require('../models/student');
const db = require('../config/db.config.js');
const student = db.student;
const learnclass = db.learnclass;
const { Op } = require("sequelize");
module.exports = {
    create: async (req, res) => {
        try {                    
            const student = await student.create({
                Frist_Name: req.body.Fristname,
                Last_Name: req.body.Lastname,
                Image: req.body.Image,
                Adress: req.body.Adress,
                Brithday: req.body.Brithday,
                Note: req.body.Note,
            });

            return res.status(200).send(student).redirect('/student');
        }
        catch {
            (err) => {
                res.status(500).send("Error -> " + err);
            }
        }
    },

    getAll: (req, res) => {
        student.findAndCountAll()
        .then(student => {
            res.json({
                student,
                status: 200,
            });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
            
    },

    getById: (req, res) => {
        if (req.params.Id) {
            return student.findById(req.parmas.Id).then((err, student) => {
                if (err) throw err;
                res.json(student);
            })
        }
        return res.send('error  not data ' + req.params.Id);
    },

    update: (req, res) => {
        let Id = req.params.Id;
        let Class_Id = req.params.Class_Id;
        if (Id) {
          return  student.update({ Frist_Name: req.body.firstname, Last_Name: req.body.lastname, Brithday: req.body.brithday, Image: req.body.Image, Adress: req.body.adress,Class_Id:Class_Id },
                { where: { Id: Id } }
            ).then(() => {
                res.status(200).send("updated successfully a student with id = " + Id);
            });
        }
        res.status(500).send("can not update " + Id);
    },
     
    delete: (req, res) => {
        const Id = req.params.Id;
        if (Id) {
           return  student.destroy({
                where: { Id: Id }
            }).then(() => {
                res.status(200).send('deleted successfully a customer with id = ' + Id);
            });
        }
        res.status(500).send("can not delete " + Id);


    }
};
