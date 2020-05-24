
const  Student = require('../config/db.config').Student;
const Class = require('../config/db.config').Class;
const get403 = require('./error');
const { Op } = require("sequelize");
module.exports = {
    create: (req, res) => {
        var Student;
          Student.create({
            firs_tname: req.body.firstname,
            last_name: req.body.lastname,
            Image: req.body.Image,
            address: req.body.address,
            brithday: req.body.brithday,
            Id_Class: [req.body.Class.Id]
        },
            {
                include: [Class]
            }).then((err, res) => {
                if (err) throw err;
                res.status(200)
                res.send("create a Student Done !");
                res.send(Student);
            })
    },

     getAll:  (req, res) => {
        return  Class.findAll({
            attributes: [['Id', 'Id_Class'], 'Title'],
            include: [{
                model: Student,
                where: { Id_Class: db.Sequelize.col('Class.Id') },
                attributes: ['first_name', 'last_name', 'Image', 'address', 'brithday']
            }]
        }).then((err, student) => {
            if (err) throw err;
            res.json(student);
        });
    },

    getById: (req, res) => {
        if (req.params.Id) {
            return Student.findById(req.parmas.Id).then((err, student) => {
                if (err) throw err;
                res.json(student);
            })
        }
        return res.send('error  not data ' + req.params.Id);
    },

    update: (req, res) => {
        let Id = req.params.Id;
        if (Id) {
          return  Student.update({ first_name: req.body.firstname, last_name: req.body.lastname, brithday: req.body.brithday, Image: req.body.Image, address: req.body.address },
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
           return  Student.destroy({
                where: { Id: Id }
            }).then(() => {
                res.status(200).send('deleted successfully a customer with id = ' + Id);
            });
        }
        return get403();


    }
};
