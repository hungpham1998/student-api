
const student = require('../models/student').student;
const learnclass = require('../models/learnclass').learnclass;
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

      getAll:  (req, res) => {
        learnclass.findAll({
            attributes: ['Id','Code','Title'],
            include: [{
                model: student,
                where: { Id_Class: db.Sequelize.col('learnclass.Id') },
                attributes: ['first_name', 'last_name', 'Image', 'address', 'brithday']
            }]
        }).then(student => {
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
