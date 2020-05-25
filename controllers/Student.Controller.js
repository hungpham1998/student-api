
// const student = require('../models/student');
const db = require('../config/db.config.js');
const student = db.student;
const { Op } = require("sequelize");
module.exports = {
    create: (req, res) => {
        student.create({
            firs_tname: req.body.firstname,
            last_name: req.body.lastname,
            Image: req.body.Image,
            address: req.body.address,
            brithday: req.body.brithday,
            Id_Class: req.body.learnclass.Id
            },
            {
                include: [learnclass]
              }).then(book => {
                // Send created book to client
                res.status(200)
                res.send("create a Student Done !");
                res.send(Student);
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            })
    },

    getAll: (req, res) => {
    //     student.findAll({
    //         attributes: ['first_name', 'last_name', 'Image', 'address', 'brithday'],
    //         // include: [{
    //         //     model: learnclass,
    //         //     where: { Id_Class: db.Sequelize.col('learnclass.Id') },
    //         //     attributes: ['Id','Code','Title','Note']
    //         // }]
    //    })
       student.findAndCountAll()
        .then(student => {
            // Send created book to client
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
        if (Id) {
          return  student.update({ first_name: req.body.firstname, last_name: req.body.lastname, brithday: req.body.brithday, Image: req.body.Image, address: req.body.address },
                { where: { Id: Id } }
            ).then(() => {
                res.status(200).send("updated successfully a customer with id = " + Id);
            });
        }
        return get403();
    },
     
    delete: (req, res) => {
        const Id = req.body.Id;
        if (Id) {
           return  student.destroy({
                where: { Id: Id }
            }).then(() => {
                res.status(200).send('deleted successfully a customer with id = ' + Id);
            });
        }
        return get403();


    }
};
